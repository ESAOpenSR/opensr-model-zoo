# Installation

Requires **Linux x86_64, Python 3.12, and [uv](https://docs.astral.sh/uv/getting-started/installation/)**.
Install from source:

```bash
git clone https://github.com/ESAOpenSR/opensr-model-zoo.git
cd opensr-model-zoo
uv sync --locked --group dev --group docs --extra opensr-test
```

The lockfile includes PyTorch 2.6 and CUDA 12.6. Most models also run on CPU;
SEN2SR Mamba requires CUDA and a compatible NVIDIA driver. Add `--extra geo` to
the setup command if you need raster tiling.

Check the installation:

```bash
uv run --no-sync opensr-zoo list
```

Use `uv run --no-sync` in a prepared environment to preserve separately installed
reference dependencies.

[Run your first prediction →](quickstart.md)
