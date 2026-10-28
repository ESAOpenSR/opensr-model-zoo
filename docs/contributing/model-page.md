# Add a model page

Start with the [copyable template](templates/model-page.md.in) and the
[SEN2SR Lite page](../models/sen2sr-lite.md) as a finished example. Keep one page
per model; put inference profiles or scale variants on that page.

## Required sections

| Section | Content |
| --- | --- |
| Overview | Two sentences explaining how the model reconstructs an image. |
| Input summary | One line: bands, scale, supported devices, and any patch limits. |
| Results | One input/prediction slider per recipe, with reference switching and an image-record link. |
| Use | A short `load_model` example using the exact recipe ID and a supported device. |
| Links | Source code, recipe JSON, and the upstream paper or project. |

Keep architecture internals, preprocessing, hashes, and validation records in
the code, recipe, and provenance files. Link to them from the page.

## 1. Copy and fill the template

Run from the repository root:

```bash
cp docs/contributing/templates/model-page.md.in docs/models/my-model.md
```

Replace every `{{...}}` marker. `ASSET_SLUG` is the recipe ID with `/` and `@`
replaced by `_`: `opensr/my-model-x4@1` becomes `opensr_my-model-x4_1`.
Set `IMAGE_SIZE` to the exported panel width; the current panels are square.

The template's raw HTML paths start with `../../assets/` because a model page
is served at `/models/my-model/`. Markdown links use `../`. Keep the view buttons
inside their `.comparison` container. For variants, wrap each viewer in a native
`<details>` element, as on the [LDSR-S2 page](../models/ldsr-s2.md).

## 2. Export an observed comparison

For a completed SEN2NEON run with saved predictions:

```bash
uv run --no-sync opensr-zoo maintain docs gallery \
  --run benchmark-results/my-run \
  --output docs/assets/models/opensr_my-model-x4_1 \
  --recipe-id opensr/my-model-x4@1 \
  --sample-id 2022_HARV_7__4_3.tif --seed 0 --panels-only
```

This writes `input.webp`, `prediction.webp`, `reference.webp`, and
`provenance.json`. Use fresh output paths. Rendered RGB models need a separate,
declared image protocol; see the [asset guide](../assets/README.md).

## 3. Connect the page and results

- Add the page under **Models** in `mkdocs.yml`.
- Add its page slug, recipe IDs, name, and input summary to `CARD_DEFINITIONS` in
  `src/opensr_model_zoo/maintenance/catalog_docs.py`, then regenerate the catalog.
- Add a card per recipe to `docs/performance.md`, copying an existing card.
  Use the same three panels, `data-model-result="ASSET_SLUG"`, a link to the new
  page, and `../assets/` HTML paths. Keep a single viewer for each recipe.
- Add its name and page to `modelPages` in `docs/assets/site.js` for results-table
  links. Update catalog coverage checks when adding recipes.

```bash
uv run --no-sync opensr-zoo maintain docs catalog \
  --schema build/model-schema.json --catalog docs/models/catalog.md
uv run --no-sync opensr-zoo maintain docs gallery --index-only \
  --asset-root docs/assets/models --output build/model-comparisons-index.json
cp build/model-comparisons-index.json docs/assets/models/index.json
```

## 4. Check the finished page

Run `uv run --no-sync mkdocs build --strict`, then preview with
`uv run --no-sync mkdocs serve`. Check the model and Results pages at desktop and
mobile widths: images load, dragging and arrow keys move the split, Reference
switches the image, and model links resolve. Keep the neutral palette and use
the slider as the comparison image.
