# Native model integration

A native integration keeps model code inside the zoo package and exposes one
builder:

```python
def build_model(spec, artifacts: Mapping[str, Path]) -> torch.nn.Module:
    """Construct on CPU; the registry owns placement."""
```

The builder loads only verified local artifacts and returns a module whose
forward output is float32 BCHW with the recipe's output bands. Do not import an
upstream training package at runtime or download executable Python source.

## Required integration details

- preserve source and implementation revisions in the recipe;
- declare RGB or RGB-NIR conditioning, grids, units, patch limits, padding, and
  predicted versus passthrough bands;
- expose inference defaults through `inference` and list caller-overridable
  keys in `supported_options`;
- keep optional CUDA/Mamba imports lazy and fail clearly when their runtime is
  absent;
- add contract tests, artifact checks, and frozen-input parity evidence;
- keep unverified ports `experimental` and document their limitations.

Use the [model scaffold](model-onboarding.md), then run the full contract suite
before proposing a catalog revision.
