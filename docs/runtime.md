# Runtime and devices

The supported environment is **Linux x86_64, Python 3.12, PyTorch 2.6, and CUDA
12.6**, recorded in `uv.lock`. Follow [Installation](installation.md) to create
the environment. Compatible recipes can run on CPU within this same installation.

## Device selection

Use `device="cpu"` for the quickstart and interpolation references. Learned
recipes declare their supported devices in the [catalog](models/catalog.md).
Full SEN2SR Mamba requires CUDA and the pinned Mamba runtime.

```python
from opensr_model_zoo import get_model_spec

spec = get_model_spec("opensr/sen2sr-lite-rgbn-x4@1")
print(spec.devices, spec.patch_size)
```

Patch size, batch size, and model family determine memory use. Begin with the
recipe's documented patch limits. If a run exhausts GPU memory, reduce batch
size while keeping the recipe settings fixed.

## Runtime metadata

Record the package version, recipe revision, runtime lock, and input provenance.
Benchmark manifests capture hardware, precision, CUDA runtime, TF32 settings,
seeds, and artifact hashes. The [reproducibility guide](reproducibility.md)
specifies the metadata required to reproduce a result.

```bash
uv run --no-sync python -VV
uv run --no-sync python -c "import torch; print(torch.__version__, torch.version.cuda)"
```

Weights come from verified local artifacts or pinned upstream sources. Use
`local_files_only=True` to load a prepared cache or bundle offline; see
[checkpoints](checkpoints.md). Local validation covers the environments listed
in [release status](release-status.md).
