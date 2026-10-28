# Command-line reference

`opensr-zoo` provides model, dataset, and evaluation commands.
Use `opensr-zoo --help` or a subcommand's `--help` for the complete option
list.

## Models, datasets, and evaluation

These commands operate on datasets, models, and benchmark results:

`opensr-zoo closed --help` dispatches to the separately installed private
benchmark project. Its `prepare`, `review`, `freeze`, `run`, and `export`
commands use a private profile; that project is not required for public model
inference, tests, or documentation. See the [held-out benchmark](closed-benchmark.md)
for its public task and publication status.

```bash
opensr-zoo list
opensr-zoo info opensr/bilinear-x4@1
opensr-zoo download --all --cache-dir artifacts/cache
opensr-zoo sen2neon download data/sen2neon --max-samples 3
opensr-zoo sen2neon filter --root data/sen2neon --output data/sen2neon-clean
opensr-zoo sen2neon prepare --root data/sen2neon --output data/sen2neon-x4
opensr-zoo benchmark config.json results/ --device cuda
opensr-zoo evaluate config.json results/ --device cuda
opensr-zoo export-results docs/assets/benchmarks results/
```

The synthetic fixture in [Examples](examples.md) checks the API. It
does not measure model quality.

## Maintenance commands

Contributor and release preparation commands are grouped under
`opensr-zoo maintain`. They are reusable package modules, but are not needed
to load a model or run an ordinary benchmark:

```bash
opensr-zoo maintain scaffold --help
opensr-zoo maintain convert pytorch --help
opensr-zoo maintain hub prepare --help
opensr-zoo maintain hub stage --help
opensr-zoo maintain verify --help
opensr-zoo maintain docs catalog --help
opensr-zoo maintain docs gallery --help
```

Use `opensr-zoo maintain --help` to see the grouped commands. The package also
exposes these modules for use in automation.

## Source organization

| Location | Purpose |
| --- | --- |
| `src/opensr_model_zoo/benchmark/` | Reusable benchmark runners, dataset preparation, and result export |
| `src/opensr_model_zoo/artifacts/` | Checkpoint conversion, preparation, and Hub staging |
| `src/opensr_model_zoo/models/<family>/conversion.py` | Reusable conversion for a model family's upstream weights |
| `src/opensr_model_zoo/maintenance/` | Contributor checks, scaffolding, and documentation generation |
| `examples/` | Maintained, runnable teaching examples |
| `scratch/` | Ignored local experiments and temporary or one-off scripts; create as needed |

Package code, tests, documentation, and workflows must not depend on `scratch/`.
Move a reusable experiment into the appropriate package module when it matures.
