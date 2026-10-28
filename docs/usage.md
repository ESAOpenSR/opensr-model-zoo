# Python API

The package has two layers. The catalog describes an immutable recipe; the
Python API validates a named `SRInput` and returns an `SRResult` with output
metadata and provenance.

## Recipe lookup

```python
from opensr_model_zoo import get_model_spec, list_models

for spec in list_models(status="maintained"):
    print(spec.recipe_id, spec.input_bands, spec.scale)

spec = get_model_spec("opensr/sen2sr-lite-rgbn-x4@1")
print(spec.patch_size, spec.devices, spec.input_units)
```

`ModelSpec` declares band order, units, grid resolutions, patch limits, runtime,
device support, and artifacts. See the [catalog](models/catalog.md) for the
recipe list.

## Input tensor requirements

For the RGB-NIR recipes, prepare a crop with these properties:

| Field | Expected value |
| --- | --- |
| `data` | Float32 tensor shaped `(1, 4, height, width)` |
| `bands` | B04, B03, B02, and B08, named in the tensor's actual order |
| `units` | `"reflectance"` |
| `resolution_m` | `10` for the observed Sentinel-2 input |
| `valid_mask` | Optional boolean tensor shaped `(1, 1, height, width)` |

Use the source metadata to convert integer reflectance encodings into physical
reflectance. For a product encoded as reflectance × 10,000, divide by 10,000.
Preserve the source mask and grid when extracting a crop.

This standalone tensor demonstrates the input contract. Replace it with an
observed L2A crop for a scientific run.

```python
import torch
from opensr_model_zoo import SRInput

torch.manual_seed(0)
synthetic_smoke = SRInput(
    data=torch.rand(1, 4, 128, 128, dtype=torch.float32),
    bands=("B08", "B02", "B04", "B03"),
    resolution_m=10,
    units="reflectance",
    processing_level="L2A",
)
```

The band tuple may arrive in any order. `predict` reorders it to the recipe's
declared order and checks the tensor shape, dtype, units, resolution, and
processing level. Supply `valid_mask` when pixels are invalid or masked; the
result carries the propagated mask.

## Prediction and provenance

```python
from opensr_model_zoo import load_model

model = load_model("opensr/bilinear-x4@1", device="cpu")
result = model.predict(synthetic_smoke, seed=0)

print(result.data.shape)
print(result.resolution_m, result.units)
print(result.provenance["recipe_id"])
```

`seed` makes stochastic recipes repeatable for a documented run. Use
`model(tensor)` only when the tensor already follows the recipe's exact
band order and has been moved to the model device. `predict` is the safer API
for application code.

## Checkpoint loading and offline inference

```python
from opensr_model_zoo import download_weights

download_weights(
    "opensr/sen2sr-lite-rgbn-x4@1",
    cache_dir="artifacts/cache",
)
```

Pass `local_files_only=True` to `download_weights` or `load_model` for an
offline run. Artifacts are checked against their catalog size and SHA-256. The
[checkpoint guide](checkpoints.md) explains source caches, offline bundles,
and the current publication boundary.

## Raster integration

Use the optional `opensr-utils` bridge for georeferenced raster tiling and
metadata. Prepare an L2A crop upstream, preserve its grid and masks, and pass
the resulting tensor through the same `SRInput` contract. See [runtime](runtime.md)
for device and patch guidance.

For an observed-data workflow, follow the [SEN2NEON benchmark guide](benchmarks-sen2neon.md).
Synthetic tensors are useful for API checks and remain separate from measured
quality evidence.
