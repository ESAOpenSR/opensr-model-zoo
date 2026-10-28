# Installation

OpenSR Model Zoo is currently distributed from source. The supported setup is
Linux x86_64 with Python 3.12 and `uv`. The lockfile contains PyTorch 2.6 and
the CUDA 12.6 runtime used by the GPU validation environment. CPU inference is
available for the interpolation recipes and for learned recipes that declare
CPU support.

## Environment setup

Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/) first,
then clone the repository and enter it:

```bash
git clone https://github.com/ESAOpenSR/opensr-model-zoo.git
cd opensr-model-zoo
```

Create the standard development environment:

```bash
uv sync --locked --group dev --group docs --extra opensr-test
```

This installs the package in editable mode together with the test, lint, and
documentation tools, plus the OpenSR-Test evaluation bridge. Add the optional
raster and tiling bridge to the same first-time command when needed:

```bash
uv sync --locked --group dev --group docs --extra opensr-test --extra geo
```

Keep an existing prepared environment intact when adding a single check. Use
`uv run --no-sync ...` so `uv` does not remove separately installed reference
or conversion dependencies.

## Installation verification

```bash
uv run --no-sync opensr-zoo list
uv run --no-sync python -c "import opensr_model_zoo as zoo; print(zoo.__version__)"
```

The catalog contains interpolation references and experimental pretrained
recipes. Use the exact recipe IDs printed by `opensr-zoo list` in scripts and
reports; short names are aliases where the catalog provides them.

## CUDA requirements

Use `device="cuda"` only on a machine with a compatible NVIDIA driver and the
locked CUDA 12.6 environment. Full SEN2SR Mamba requires the pinned CUDA Mamba
runtime. Start with the CPU quickstart to check the API, then use the model
catalog to confirm a recipe's devices, patch limits, units, and input bands.

The project has no separate PyPI release yet. Checkpoint publication and full
runtime certification are also still release gates; see [release status](release-status.md).
