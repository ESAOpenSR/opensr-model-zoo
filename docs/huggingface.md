# Hugging Face artifact publication

The proposed public model repository is `opensr/opensr-model-zoo`. It is a
planned destination, not a repository that this checkout claims to own or have
published. Uploading requires an authorized Hugging Face account, a completed
weight-license review, release-gate results, and an explicit maintainer
publication step.

## Repository layout

Keep one public Model repository so users and tooling have one stable endpoint.
The canonical package inputs are `src/opensr_model_zoo/artifacts/hub-layout.json`
and the two templates in `src/opensr_model_zoo/artifacts/hub_templates/`.
Complete generated uploads are staged in the ignored
`build/huggingface-model-zoo/` directory.

```text
opensr/opensr-model-zoo/
├── index.json
├── README.md
├── LICENSES.md
└── models/
    ├── ldsr-s2/
    │   ├── README.md
    │   ├── checkpoints/canonical-v1/
    │   │   ├── README.md
    │   │   ├── weights.safetensors
    │   │   ├── architecture.json
    │   │   ├── provenance.json
    │   │   ├── weights.conversion.json
    │   │   ├── SHA256SUMS
    │   │   └── LICENSE
    │   └── recipes/
    │       ├── rgbn-x4/r2/{README.md,recipe.json}
    │       └── rgbn-x4-ddim100-histogram/r2/{README.md,recipe.json}
    ├── sen2sr/
    │   ├── README.md
    │   ├── checkpoints/
    │   │   ├── lite-rgbn-x4-v1/
    │   │   └── mamba-rgbn-x4-v1/
    │   └── recipes/
    │       ├── lite-rgbn-x4/r2/{README.md,recipe.json}
    │       └── rgbn-x4/r2/{README.md,recipe.json}
    └── srgan/
        ├── README.md
        ├── checkpoints/rgbn-x4-v1/  # Metadata only until rights are documented
        └── recipes/rgbn-x4/r2/{README.md,recipe.json}
```

Recipes are stored inside their owning family directory so short names cannot
collide. The complete planned paths are:

- LDSR-S2: `models/ldsr-s2/checkpoints/canonical-v1/`, with recipes
  `models/ldsr-s2/recipes/rgbn-x4/r2/` and
  `models/ldsr-s2/recipes/rgbn-x4-ddim100-histogram/r2/`.
- SEN2SR: `models/sen2sr/checkpoints/lite-rgbn-x4-v1/` and
  `models/sen2sr/checkpoints/mamba-rgbn-x4-v1/`, with corresponding
  `models/sen2sr/recipes/lite-rgbn-x4/r2/` and
  `models/sen2sr/recipes/rgbn-x4/r2/`.
- SRGAN: `models/srgan/checkpoints/rgbn-x4-v1/` and
  `models/srgan/recipes/rgbn-x4/r2/`; its checkpoint remains unavailable until its weight
  redistribution license is cleared.

The LDSR-S2 checkpoint is stored once and referenced by both recipes. Each
checkpoint directory has architecture metadata, provenance, SHA-256 checksums,
and either a checkpoint-specific `LICENSE` or `LICENSE_STATUS.md`. Prepared
directories additionally hold the actual safetensors. LDSR uses
`weights.safetensors`; SEN2SR uses
`model.safetensors` and `hard_constraint.safetensors`. Do not copy an upstream
code license onto a weight when the weight license is unknown.

`index.json` distinguishes `metadata-only` (documented, no binaries), `prepared`
(binaries present and verified), and `source-only` (redistribution unresolved).
Preparation is independent of numerical or GPU certification. The installed
catalog records support status and the full immutable Hub commit after release.

Checkpoint directories and recipe revisions are append-only: use a new path
when their contents change. `r2` is a planned migration from the existing `@1`
recipes because their artifact pins change. Two inference recipes may share a
checkpoint; their samplers and corrections remain separate. Interpolation
baselines need no checkpoint directory.

## Release binding

The current local preparation commands are:

```bash
opensr-zoo maintain hub prepare opensr/ldsrs2-rgbn-x4@1 build/curated/ldsr
opensr-zoo maintain hub prepare opensr/sen2sr-lite-rgbn-x4@1 build/curated/lite
opensr-zoo maintain hub prepare opensr/sen2sr-rgbn-x4@1 build/curated/mamba
opensr-zoo maintain hub stage \
  --output build/huggingface-model-zoo \
  --prepared ldsr-canonical-v1=build/curated/ldsr \
  --prepared sen2sr-lite-v1=build/curated/lite \
  --prepared sen2sr-mamba-v1=build/curated/mamba
```

The repository assembler also supports SEN2SR prepared directories; omitted
prepared arguments intentionally produce metadata-only/source-only entries.
These commands do not upload anything. Output directories must be new.
`src/opensr_model_zoo/artifacts/hub-layout.json` assigns checkpoint IDs and recipe paths. The assembler
verifies source identities, copies each shared checkpoint once, and writes the
index and cards. Without `--prepared`, it generates just the metadata tree.

After license/runtime review, a maintainer creates the Model repository under
the authorized organization. The following separate publication step uploads
the prepared tree and returns its actual commit:

```python
from huggingface_hub import HfApi

commit = HfApi().upload_folder(
    repo_id="opensr/opensr-model-zoo",
    repo_type="model",
    folder_path="build/huggingface-model-zoo",
    commit_message="Add curated RGB-NIR SISR artifacts",
)
print(commit.oid)
```

Then bind the final commit (replace the placeholder with that full SHA):

```bash
opensr-zoo maintain hub bind build/huggingface-model-zoo \
  --revision FULL_40_CHARACTER_COMMIT_SHA --output build/hub-catalog
```

Binding reads back the remote checkpoint files and verifies their hashes by
default. `--offline-draft` generates local review candidates without that
verification. The tool never edits the package catalog. Review its candidate
JSON files, test clean downloads/offline inference, add the new revisions to the
catalog, and update aliases in the next package release. Existing `@1` recipes
remain immutable.

Hub-relative `recipe.json` files are binding templates, not directly loadable
`ModelSpec` manifests. They cannot embed the SHA of their own future commit.
The post-upload package catalog supplies that SHA, without a self-reference or
runtime execution of remote code. See the official
[upload guide](https://huggingface.co/docs/huggingface_hub/guides/upload).

## User downloads

`load_model("sen2sr-lite")` resolves verified upstream artifacts.
After the mirror and its package catalog are released, the same API can select
the new immutable recipe. Users do not clone the Hub or the research repository:

```python
from opensr_model_zoo import load_model

# Requires the future catalog release containing this @2 recipe.
model = load_model("opensr/sen2sr-lite-rgbn-x4@2", device="cpu")
```

To download one checkpoint set into a chosen folder for offline use, take the
pin from that installed recipe. Keep the repository-relative directory tree:

```python
from huggingface_hub import snapshot_download
from opensr_model_zoo import get_model_spec, load_model

spec = get_model_spec("opensr/sen2sr-lite-rgbn-x4@2")  # Future catalog release
artifact = spec.artifacts[0]
root = snapshot_download(
    repo_id=artifact.repo_id,
    revision=artifact.revision,
    allow_patterns=["models/sen2sr/checkpoints/lite-rgbn-x4-v1/*", "LICENSES.md"],
    local_dir="./checkpoints",
)
model = load_model(spec.recipe_id, artifact_dir=root, local_files_only=True)
```

Pass the download **root** as `artifact_dir`, not the leaf checkpoint folder.
The zoo verifies the declared sizes and hashes. For a portable offline bundle,
use the existing `opensr-zoo export-bundle` command instead. Full revisions and
filtered downloads are supported by the official
[download API](https://huggingface.co/docs/huggingface_hub/guides/download).

## Hub indexing and repository structure

One central repository gives users one address and maintainers one release
process. Hugging Face presents the root README as its model card; nested READMEs
document subfolders and do not create separate model entries. If independent
search results, cards, or permissions become important, split families into
separate Model repositories and collect them in an OpenSR collection. The zoo
already supports per-artifact repository IDs. See
[Hub model cards](https://huggingface.co/docs/hub/model-cards).
