# OpenSR Model Zoo

<p align="center">
  <img src="docs/assets/opensr_logo.png" alt="OpenSR" width="325">
</p>

OpenSR Model Zoo provides versioned Sentinel-2 single-image super-resolution
recipes through a common Python API. The current scope is RGB-NIR reflectance, with
rendered RGB for models whose upstream architecture requires it. Temporal,
ten-band, and fusion models are outside this release.


## Installation

The supported environment is Linux x86_64, Python 3.12, PyTorch 2.6, and
NVIDIA CUDA 12.6. The package is currently installed from a source checkout.

```bash
git clone https://github.com/ESAOpenSR/opensr-model-zoo.git
cd opensr-model-zoo
uv sync --locked --group dev --group docs --extra opensr-test
```

See the [installation guide](docs/installation.md) for the optional
`opensr-utils` bridge and [runtime notes](docs/runtime.md) for device support.

## Python inference example

This deterministic CPU example uses the versioned interpolation recipe and
needs no checkpoint or network access after installation:

```python
import torch

from opensr_model_zoo import SRInput, load_model

torch.manual_seed(0)
model = load_model("opensr/bilinear-x4@1", device="cpu")
synthetic_smoke = SRInput(
    data=torch.rand(1, 4, 16, 16, dtype=torch.float32),
    bands=("B04", "B03", "B02", "B08"),
    resolution_m=10,
    units="reflectance",
)
result = model.predict(synthetic_smoke, seed=0)
print(result.data.shape)  # torch.Size([1, 4, 64, 64])
print(result.provenance["recipe_id"])
```

The tensor is a synthetic contract smoke test. Use observed L2A Sentinel-2
reflectance for scientific work. The [quickstart](docs/quickstart.md) expands
this example, and the [usage guide](docs/usage.md) covers masks, provenance,
weights, and raster integration.

Learned inference uses the same API after its artifact and runtime are
available, for example `load_model("opensr/sen2sr-lite-rgbn-x4@1", device="cuda")`.
Check the [model catalog](docs/models/catalog.md) for exact recipe IDs, bands,
patch sizes, devices, and current status.

## SEN2NEON examples and evaluation

The [image examples](docs/examples.md) include source-derived SEN2NEON previews
with per-image provenance, comparison sliders, and aligned NEON references.

For data preparation and evaluation, follow the [SEN2NEON guide](docs/benchmarks-sen2neon.md)
and keep dataset revision, masks, recipe ID, seed, artifact hashes, and runtime
with the output. The [performance page](docs/performance.md) and
[validation reports](docs/validation.md) record the current evidence and its
geographic and training-overlap limits.

## Development

The project is a development release (`0.1.0.dev0`). Pretrained recipes remain
experimental while publication, redistribution review, and complete runtime
certification proceed. See [STATUS.md](STATUS.md) and the
[release status page](docs/release-status.md).

For local changes, run the focused checks from the prepared environment:

```bash
uv run --no-sync ruff check src tests examples
uv run --no-sync ruff format --check src tests examples
uv run --no-sync pytest -q
uv run --no-sync mkdocs build --strict
```

The [contributor guide](CONTRIBUTING.md) and [contributing pages](docs/contributing/index.md)
cover model onboarding, native integrations, artifact handling, release gates,
and documentation. Keep temporary experiments in ignored `scratch/`.

## Licensing, citation, and documentation

New project code is Apache-2.0. Third-party model code and weights retain their
respective licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md), the
[weight license register](docs/models/weight-licenses.md), and the model cards.
Please cite the project using [CITATION.cff](CITATION.cff) and cite the
upstream paper or implementation for each recipe you use.

Documentation is built with MkDocs Material and is intended for
`https://models.opensr.eu/`; hosted deployment and DNS setup remain release
administration steps. See the [hosting guide](docs/hosting.md).
