# Model onboarding

The current release admits RGB-NIR SISR recipes. An RGB-only contribution is
allowed only when the upstream model is inherently RGB-only; declare that
conditioning in its recipe and benchmark configuration. Ten-band, SWIR,
multistage, and other multispectral pipelines are outside the current release
scope and should remain an issue for a future catalog revision.

1. Generate a scaffold with `opensr-zoo maintain scaffold` and choose an immutable
   namespaced recipe ID such as `acme/model-x4@1`.
2. Implement `build_model(spec, artifacts: Mapping[str, Path])` in the native
   module. Construct on CPU and load only supplied local artifacts; the registry
   handles placement.
3. Fill every recipe field: channel order, units, native and tensor
   resolutions, predicted and passthrough bands, patch behavior, runtime,
   source and implementation revisions, and inference defaults.
   If callers may override inference behavior, list each key in
   `supported_options` and provide its default in `inference`; unknown options
   are rejected by the common wrapper.
4. Convert weights with `opensr-zoo maintain convert pytorch`, inspect provenance, and add
   SHA-256, size, format, revision, and license. Weight redistribution needs
   explicit permission where the upstream license does not grant it.
5. Run `opensr-zoo maintain docs site --docs-dir docs` to generate the catalog
   entry, model page, Python usage example, and source links. Images and
   featured placement are optional; follow the [model-page guide](model-page.md)
   to add them later. Record training data, limitations, and overlap in the
   recipe/provenance. Add contract tests and frozen-input parity evidence.
6. Keep status `experimental` until parity, artifact, license, and runtime
   checks pass. Promote only then.

For a new family shipped in this wheel, add its trusted module/function path to
`registry._builtin_builders`. Existing-family variants normally need only a new
manifest and tests. Local development can use `register_model(spec, builder)`
for a new recipe ID, without modifying the public API. Implementation-only
scaffolds are built directly in their unit tests until released weight metadata
is available; `load_model` refuses to present random initialization as pretrained.

Recipes reference exact component revisions when composition is eventually
supported. Never import upstream packages at runtime or download executable
Python source with weights.

Prepare a reviewable project Hub artifact directory without uploading it:

```bash
opensr-zoo maintain hub prepare opensr/sen2sr-lite-rgbn-x4@1 /tmp/sen2sr-lite-hub
```

This writes safetensors, architecture/inference JSON, a model card, and source
checksums. Legacy LDSR-S2 conversion retains every tensor and inference buffer.
Preparation refuses undocumented weight redistribution rights; SRGAN therefore
remains pinned to its upstream artifact until those rights are documented.
Publication must record the resulting full Hub commit and file checksums in a
new recipe before users switch to the project mirror.

Add new checkpoint sets and recipe paths to `src/opensr_model_zoo/artifacts/hub-layout.json` and build
the shared upload tree with `opensr-zoo maintain hub stage`. Follow the
[hosting guide](../huggingface.md) for post-upload commit binding. Checkpoint
availability, redistribution rights, and runtime support are separate fields;
publishing a file does not certify a model.
