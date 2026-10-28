# Validation reports

These compact records describe the inputs, settings, versions, and outcomes of
local checks. They support the documentation and are not runtime model code.

- [image-selection.json](image-selection.json): current suite, cached-pair
  filtering audit, clean examples, and enlarged gallery details.
- [documentation-refresh.json](documentation-refresh.json): initial docs refresh,
  gallery provenance checks, responsive browser review, and wheel validation.
- `tests.json`: earlier CPU-sandbox suite results and skipped resource checks.
- `opensr-test/pilot-v1/`: measured six-site 4×/2× results and protocol manifests.
- `parity/`: comparisons against frozen upstream implementations.
- `conversions/`: checkpoint-format conversion and integrity evidence.

Model source metadata lives inside the package at
`src/opensr_model_zoo/catalog/provenance/`, beside the authoritative runtime
catalog. Older one-off build, browser, and runtime snapshots remain in ignored
local `artifacts/validation-history/`. Large weights and predictions stay in
ignored local artifact and benchmark storage.
