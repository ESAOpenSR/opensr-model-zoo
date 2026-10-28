# Contributing

Contributions include model ports, artifact checks, benchmark protocols,
documentation, and bug fixes. Read the repository
[contributor policy](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/CONTRIBUTING.md),
[AGENTS.md](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/AGENTS.md), and
[current status](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/STATUS.md)
before making a change.

## Development environment and checks

```bash
uv sync --locked --group dev --group docs --extra opensr-test
uv run --no-sync pytest -q
uv run --no-sync ruff check src tests examples
uv run --no-sync ruff format --check src tests examples
uv run --no-sync mkdocs build --strict
```

Keep temporary experiments in ignored `scratch/`. Reusable code belongs under
`src/`, maintained teaching examples under `examples/`, and evidence under the
documented benchmark or report locations.

## Documentation builds

Follow [Installation](../installation.md) for a fresh checkout. In a prepared
environment, run `uv run --no-sync mkdocs serve` and open the local address
printed in the terminal. Edit pages under `docs/`, then check the finished site
with `uv run --no-sync mkdocs build --strict`.

Use headings that name the API, operation, requirement, or result described in
the section. Describe behavior and limitations directly; avoid slogans and
promotional claims. Use short, runnable examples and link to validation records.
Image contributions need observed inputs, saved predictions, a reference, and
provenance; the [asset guide](../assets/README.md) shows how
to export them.

## Integration and release requirements

- [Model-page recipe and template](model-page.md) defines the required sections,
  comparison slider, and catalog/results integration for a new model.
- [Model onboarding](model-onboarding.md) covers recipe scaffolding, native
  builders, artifact metadata, licenses, and parity evidence.
- [Native integration](native-integration.md) describes the builder contract
  and runtime boundaries.
- [Release gates](release.md) lists the checks required before publication.
- [Hugging Face artifacts](../huggingface.md) explains local staging and
  immutable source revisions.
- [Documentation assets](../assets/README.md) records attribution and image
  provenance requirements.

## Validation records and recipe revisions

A smoke inference confirms that code runs. It does not establish numerical
parity, representative benchmark quality, or permission to redistribute a
checkpoint. Record the command, environment, input provenance, recipe ID, and
limitations beside any measured result. Public recipe revisions are immutable;
changes to weights, preprocessing, architecture, or numerical behavior need a
new revision.
