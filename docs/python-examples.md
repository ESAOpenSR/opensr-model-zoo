# Python examples

These examples use the public API and operate on one independent patch at a
time. The package accepts a float32 BCHW tensor and keeps the Sentinel-2 band
names, grid, units, validity mask, and prediction provenance with the result.
It does not silently convert digital numbers, clip reflectance, or choose a
different grid.

## Discover a compatible recipe

Use the catalog before loading a model. This example asks for pretrained
RGB-NIR recipes that produce a 2.5 m grid and prints the exact immutable recipe
IDs available in the installation:

```python
from opensr_model_zoo import list_models

for spec in list_models(
    bands=("B04", "B03", "B02", "B08"),
    resolution=2.5,
    pretrained=True,
):
    print(
        spec.recipe_id,
        f"{spec.input_resolution_m:g} -> {spec.output_resolution_m:g} m",
        spec.devices,
        spec.status,
    )
```

Inspect a listed learned recipe with `get_model_spec` before loading it. For
an initial prediction without a checkpoint download, choose the separate
bilinear interpolation recipe:

```python
from opensr_model_zoo import get_model_spec, load_model

recipe_id = "opensr/bilinear-x4@1"
spec = get_model_spec(recipe_id)
print(spec.input_bands, spec.input_units, spec.patch_size, spec.max_size)

model = load_model(recipe_id, device="cpu")
```

Interpolation recipes are useful for a small smoke test. Learned recipes need
their declared checkpoint and runtime; use the recipe's `devices`, `runtime`,
and artifact information to choose a supported environment. A normal
`load_model` call resolves and downloads missing artifacts. Use
`local_files_only=True` when the verified files are already in a cache or an
offline bundle. A loaded checkpoint still does not imply that all release gates
are complete.

## Predict a Sentinel-2 reflectance patch

For RGB-NIR recipes, the usual observed input is an L2A 10 m crop with bands
B04, B03, B02, and B08. The values below are already physical reflectance in
float32. If a source stores integer reflectance scaled by 10,000, divide by
10,000 explicitly after checking that product's metadata. Do not apply that
conversion twice.

```python
import torch

from opensr_model_zoo import SRInput, load_model

bands = ("B04", "B03", "B02", "B08")
reflectance = torch.from_numpy(observed_chw).unsqueeze(0).to(torch.float32)
valid_mask = torch.from_numpy(observed_valid).to(torch.bool)[None, None]

sample = SRInput(
    data=reflectance,
    bands=bands,
    resolution_m=10,
    units="reflectance",
    processing_level="L2A",
    valid_mask=valid_mask,
)

model = load_model("opensr/bilinear-x4@1", device="cpu")
result = model.predict(sample, seed=0)

print(result.data.shape)       # (1, 4, height * 4, width * 4)
print(result.bands)            # the recipe's declared output order
print(result.resolution_m)     # 2.5
print(result.provenance)       # recipe, settings, seed, device, and hashes
```

`observed_chw` must have one channel per name in `bands`; `observed_valid` is
an H×W boolean array. The model uses names to arrange the channels required by
the recipe, then propagates the validity mask to the output grid. Nonfinite
values are accepted only when an explicit mask marks them invalid; valid
pixels must still be finite. A model's input size, multiple, and maximum patch
size come from `ModelSpec`. If a patch does not fit, use the separate
`opensr-utils` tiling integration described in [Runtime](runtime.md), rather
than treating a direct model call as full-scene tiling.

## Run a learned model and keep the baseline

SEN2SR Lite is a learned RGB-NIR recipe with a strict 128×128 input patch. The
following uses the observed `sample` constructed above, downloads its two
verified artifacts into a project cache when needed, and then loads from that
cache without network access. It runs on CPU, which is a declared device for
this recipe; use `device="cuda"` in an environment with a supported CUDA
runtime if desired.

```python
from pathlib import Path

from opensr_model_zoo import download_weights, get_model_spec, load_model

recipe_id = "opensr/sen2sr-lite-rgbn-x4@1"
cache_dir = Path("artifacts/cache")
spec = get_model_spec(recipe_id)
if spec.patch_size != (128, 128):
    raise ValueError(f"Unexpected patch contract: {spec.patch_size}")
if tuple(sample.data.shape[-2:]) != spec.patch_size:
    raise ValueError("SEN2SR Lite requires an observed 128×128 input patch")

# This step downloads missing, hash-checked artifacts.
download_weights(recipe_id, cache_dir=cache_dir)

# This step is offline and uses only the cache populated above.
learned = load_model(
    recipe_id,
    device="cpu",
    cache_dir=cache_dir,
    local_files_only=True,
)
learned_result = learned.predict(sample, seed=0)
print(learned_result.data.shape)  # (1, 4, 512, 512) for a 128×128 input
print(learned_result.provenance["artifacts"])
```

For a fully offline run, omit the download step and keep
`local_files_only=True`; missing or incorrectly hashed files fail loudly.
The bilinear result from the previous example is a useful baseline on the same
`sample`:

```python
baseline = load_model("opensr/bilinear-x4@1", device="cpu").predict(sample, seed=0)
print(baseline.data.shape, baseline.resolution_m)
```

The learned prediction and baseline are comparable only when they use the same
input crop, band order, mask, seed, and output grid. The example does not
claim a quality ranking without a reference image and a documented metric.

## Read and write a GeoTIFF with rasterio

`rasterio` handles application I/O outside the model API. The example below
assumes that the input is an L2A 10 m patch whose band descriptions identify the channels and
whose integer values use an explicitly verified scale factor. It selects the
four required channels by name, preserves the source mask, and writes a new
GeoTIFF at the model's declared output resolution:

```python
import json
from pathlib import Path

import torch
from opensr_model_zoo import SRInput, get_model_spec, load_model

import rasterio
from rasterio.transform import Affine

input_path = Path("sentinel2_l2a_patch.tif")
output_path = Path("sentinel2_sr_patch.tif")
recipe_id = "opensr/bilinear-x4@1"
scale_factor = 10_000.0  # verified from this product's metadata
required_bands = ("B04", "B03", "B02", "B08")

with rasterio.open(input_path) as src:
    available = tuple(src.descriptions)
    if any(name is None for name in available):
        raise ValueError("Input GeoTIFF must provide band descriptions")
    indexes = [available.index(name) + 1 for name in required_bands]
    if src.crs is None or not src.crs.is_projected or src.crs.linear_units != "metre":
        raise ValueError("Input must use a projected CRS in metres")
    if abs(src.transform.b) > 1e-9 or abs(src.transform.d) > 1e-9:
        raise ValueError("Rotated input grids are not handled by this example")
    if abs(abs(src.transform.a) - 10.0) > 1e-6 or abs(abs(src.transform.e) - 10.0) > 1e-6:
        raise ValueError("This example expects 10 m pixels in both axes")
    raw = src.read(indexes)
    observed_chw = torch.from_numpy(raw).to(torch.float32) / scale_factor
    observed_valid = torch.from_numpy(src.read_masks(indexes).all(axis=0))
    profile = src.profile.copy()
    transform = src.transform

spec = get_model_spec(recipe_id)
if tuple(required_bands) != tuple(spec.input_bands):
    raise ValueError(f"This example selected {required_bands}, but the recipe requires {spec.input_bands}")
model = load_model(recipe_id, device="cpu")
result = model.predict(
    SRInput(
        data=observed_chw[None],
        bands=required_bands,
        resolution_m=10,
        units="reflectance",
        processing_level="L2A",
        valid_mask=observed_valid[None, None],
    ),
    seed=0,
)

output = result.data[0].cpu().numpy()
output_mask = result.valid_mask[0, 0].cpu().numpy().astype("uint8") * 255
profile.update(
    count=output.shape[0],
    height=output.shape[1],
    width=output.shape[2],
    dtype="float32",
    nodata=None,
    transform=transform * Affine.scale(1 / spec.scale, 1 / spec.scale),
)
with rasterio.open(output_path, "w", **profile) as dst:
    dst.write(output)
    dst.write_mask(output_mask)
    dst.descriptions = result.bands

provenance_path = output_path.with_suffix(output_path.suffix + ".provenance.json")
provenance_path.write_text(json.dumps(result.provenance, indent=2) + "\n")
print(f"wrote {output_path} and {provenance_path}")
```

The scale factor, band descriptions, CRS, affine transform, and per-band masks
are part of the input provenance and must be checked for each product. The
snippet writes reflectance values in float32, clears the inherited integer
`nodata` value, and stores invalid pixels in the GeoTIFF mask. It does not
convert reflectance back to an integer product encoding. The JSON sidecar is
the model provenance record for this prediction.

## A deterministic CPU smoke test

For an install check without a checkpoint or download, run:

```bash
uv run --no-sync python examples/predict_patch.py
```

The script labels its generated ramp as synthetic, supplies an explicit mask,
and prints the output shape and provenance. Its result is an API smoke test,
not measured model evidence. Replace the fixture with an observed L2A patch
before interpreting a prediction scientifically.
