# Checkpoints

The repository keeps checkpoint metadata in Git and the large weight files in
ignored local artifact stores. Download records include file sizes, SHA-256
hashes, and source provenance.

## Local artifact directories

| Path | Contents | Use |
| --- | --- | --- |
| `artifacts/cache/` | Original-source downloads and content-addressed cache entries | Resolve pinned upstream artifacts |
| `artifacts/huggingface-model-zoo/` | Prepared model-zoo tree, including available weight files, recipes, checksums and cards | Offline loading and Hub review |
| `artifacts/curated/` | Conversion outputs prepared for selected recipes | Inspect or assemble curated artifacts |

Local checkpoint files are stored under `artifacts/`, for
example `artifacts/huggingface-model-zoo/models/sen2sr/checkpoints/` and
`artifacts/huggingface-model-zoo/models/ldsr-s2/checkpoints/`. The package
contains the Hub layout and two small publication templates under
`src/opensr_model_zoo/artifacts/hub_templates/`; the complete metadata tree is
generated into `build/huggingface-model-zoo/` when staging a publication.
The installed catalog and `catalog/provenance/` records remain authoritative
when a checkpoint is metadata-only or redistribution rights are unresolved.

The available prepared files in this workspace are:

| Model | Weight file | Size |
| --- | --- | --- |
| LDSR-S2, both inference profiles | `artifacts/huggingface-model-zoo/models/ldsr-s2/checkpoints/canonical-v1/weights.safetensors` | 1.13 GB |
| SEN2SRLite | `artifacts/huggingface-model-zoo/models/sen2sr/checkpoints/lite-rgbn-x4-v1/model.safetensors` | 2.31 MB |
| SEN2SR Mamba | `artifacts/huggingface-model-zoo/models/sen2sr/checkpoints/mamba-rgbn-x4-v1/model.safetensors` | 55.19 MB |

The SEN2SR directories also contain the required 1.05 MB hard-constraint tensor.
The original checkpoint sets for all **11 pretrained recipes** have been
verified offline in `artifacts/cache/`. Their exact existing paths are listed
in the ignored local `artifacts/downloaded-models.json`. Evoland uses ONNX
files, Swin2-MoSE uses its released ZIP, and SR4RS uses verified TensorFlow
checkpoint tensor slices read by the native Python implementation.

Print and verify the exact paths again without network access:

```bash
uv run opensr-zoo download --all --cache-dir artifacts/cache --local-files-only
```

## Downloads and offline bundles

```bash
uv run opensr-zoo download --all --cache-dir artifacts/cache
uv run opensr-zoo export-bundle opensr/sen2sr-lite-rgbn-x4@1 \
  artifacts/offline/sen2sr-lite --cache-dir artifacts/cache
```

```python
from opensr_model_zoo import load_model

model = load_model(
    "opensr/sen2sr-lite-rgbn-x4@1",
    device="cuda",
    artifact_dir="artifacts/offline/sen2sr-lite",
    local_files_only=True,
)
```

Each checkpoint directory has provenance, architecture metadata and a checksum
file. A recipe's artifact record is authoritative for the required filenames,
size and SHA-256. Do not infer availability from a README alone: inspect the
directory and verify its checksums before an offline run.

See [weight licenses](models/weight-licenses.md) for redistribution status and
[Hugging Face artifacts](huggingface.md) for the prepared publication layout.
