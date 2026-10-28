# Model pages and results

A model can join the catalog without contributing images or benchmark results.
Register its recipe, then run:

```bash
uv run --no-sync opensr-zoo maintain docs site --docs-dir docs
uv run --no-sync mkdocs build --strict
```

The generator creates its model page, catalog card, Python prediction example,
and links from result tables. Band names, units, grids, devices, patch limits,
and recipe IDs come from the recipe. New pages are reachable from **Models →
All models** without editing navigation or JavaScript. Commit the generated
Markdown and JSON alongside the recipe changes.

## Standard and featured pages

| Page | Required work | Optional additions |
| --- | --- | --- |
| Standard | Register a complete recipe and regenerate docs. | Short overview, display title, grouped variants, measured comparison. |
| Featured | Maintainer selects `featured: true` in presentation settings. | Observed comparisons appear on the model page and Results. |

SEN2SR Lite, SEN2SR Mamba, and LDSR-S2 are featured initially. Featured placement
is an editorial choice; experimental status, runtime validation, and measured
metrics remain separate. A featured page can exist without images. A standard
page can opt into a comparison without becoming featured.

## Optional title, overview, and grouping

Presentation settings live outside immutable recipe manifests in
[`maintenance/model_pages.json`](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/maintenance/model_pages.json).
For a custom title or shared page for variants, append an entry to its `pages`
list. The [copyable settings template](templates/model-page.json.in) contains:

```json
{
  "slug": "my-model",
  "title": "My model",
  "recipe_ids": ["acme/my-model-x4@1"],
  "overview": "A short explanation of the model and its intended input.",
  "featured": false,
  "comparisons": []
}
```

All fields here describe the page. Input constraints and inference settings
belong in the recipe, rather than a second hand-maintained table. Group scales
or inference profiles with `recipe_ids`; the generator includes each profile's
usage and constraints. Use a unique lowercase page slug. A recipe without an
entry still gets its own standard page.

Generated pages include a comment identifying the generation command. Edit
the recipe or presentation settings, then regenerate; direct page edits will
be replaced. The generator refuses to overwrite a custom page. When migrating
the previous manually authored pages, use `--replace-existing` once after
reviewing the model-page, catalog, Results, and index files it will replace.

## Optional observed comparison

Start with a completed public benchmark run that saved predictions. Export a
bundle into a fresh directory under `docs/assets/models/`:

```bash
uv run --no-sync opensr-zoo maintain docs gallery \
  --run benchmark-results/my-run \
  --output docs/assets/models/acme_my-model-x4_1 \
  --recipe-id acme/my-model-x4@1 \
  --sample-id 2022_HARV_7__4_3.tif --seed 0 --panels-only
```

This writes `input.webp`, `prediction.webp`, `reference.webp`, and
`provenance.json`. Add the exact recipe ID to that page's `comparisons` list,
then rerun `docs site`. The generator discovers and checks the bundles and
creates the slider HTML and asset index. There is no separate Results card,
HTML template, JavaScript mapping, or image path to copy.

An absent bundle simply leaves the page without a comparison. A damaged bundle
fails validation; preserve the failure and repair or replace the export.
The [asset guide](../assets/README.md) explains observed-data requirements and
the separate rendered RGB protocol. Synthetic smoke fixtures must never be
published as measured comparisons.

## Optional measured results

Images and metric tables are independent. Export completed compatible runs
with the existing benchmark exporter:

```bash
uv run --no-sync opensr-zoo export-results docs/assets/benchmarks \
  benchmark-results/run-x4 benchmark-results/run-x2
uv run --no-sync opensr-zoo maintain docs site --docs-dir docs
```

Include all public runs that should remain in the export. The exporter keeps
different protocol hashes separate; it does not infer comparable protocols
from a shared scale. Result rows link to generated model pages automatically,
including standard models without images. Keep cohort descriptions, geographic
limits, training-overlap disclosures, and protocol links with new measurements.

## Review

Run the strict build, then preview with `uv run --no-sync mkdocs serve`. Check
the catalog and the generated Python examples. For an optional comparison,
check dragging, arrow keys, Reference switching, image records, and mobile
layout. Documentation generation reads saved metadata and assets; it never
runs model inference or downloads checkpoints.
