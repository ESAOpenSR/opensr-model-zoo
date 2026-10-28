# Quickstart

This example runs deterministic bilinear interpolation on a synthetic tensor
to check the input and output contracts. It provides no image-quality evidence.

## CPU inference

After [installing the package](installation.md), save this as `quickstart.py`
or paste it into a Python session:

```python
import torch

from opensr_model_zoo import SRInput, load_model

torch.manual_seed(0)
model = load_model("opensr/bilinear-x4@1", device="cpu")
sample = SRInput(
    data=torch.rand(1, 4, 16, 16, dtype=torch.float32),
    bands=("B04", "B03", "B02", "B08"),
    resolution_m=10,
    units="reflectance",
)
result = model.predict(sample, seed=0)

print(result.data.shape)  # torch.Size([1, 4, 64, 64])
print(result.bands)       # ('B04', 'B03', 'B02', 'B08')
print(result.provenance["recipe_id"])
```

Run the saved file with:

```bash
uv run --no-sync python quickstart.py
```

`SRInput` carries the band names, grid resolution, units, and optional validity
mask. The wrapper uses those names to arrange channels for the selected recipe
and records the resolved recipe and settings in `SRResult.provenance`.

## Recipe selection

Discover the catalog from the command line:

```bash
uv run --no-sync opensr-zoo list
uv run --no-sync opensr-zoo info opensr/bilinear-x4@1
```

The interpolation recipes need no checkpoint. A learned recipe needs its
declared artifact and runtime; `load_model` resolves verified weights and gives
an error when a required optional dependency is missing. For a
learned GPU example, replace the recipe and device after checking the catalog:

```python
model = load_model("opensr/sen2sr-lite-rgbn-x4@1", device="cuda")
```

Use a real L2A Sentinel-2 crop with float32 reflectance for scientific work.
The [SEN2NEON guide](benchmarks-sen2neon.md) describes observed-data preparation,
and [Examples](examples.md) explains the provenance required for image previews.

## Checkpoint caching and offline inference

```python
from opensr_model_zoo import download_weights, load_model

download_weights(
    "opensr/sen2sr-lite-rgbn-x4@1",
    cache_dir="artifacts/cache",
)
model = load_model(
    "opensr/sen2sr-lite-rgbn-x4@1",
    device="cuda",
    cache_dir="artifacts/cache",
    local_files_only=True,
)
```

Read [Usage](usage.md) for masks, direct tensor calls, provenance, and the
optional raster integration.
