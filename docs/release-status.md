# Release status

Updated **28 October 2026**. `0.1.0.dev0` is a development version;
all eleven learned recipes remain experimental. Four interpolation references
bring the installed catalog to fifteen recipes.

The complete implemented/missing feature list, exact recipe/device table, and
numerical-reference comparisons and their limitations are maintained in
[STATUS.md](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/STATUS.md).
The [machine-readable release record](release-status.json) captures runtime,
validation, publication, and hosting state.

## Local validation results

- Default suite: **70 passed, 18 optional checks skipped**, no failures, rerun
  on 28 October. Six dependency deprecation warnings remain visible.
  [Suite report and skip reasons](reports/image-selection.json).
- All eleven pretrained recipes have recorded installed-wheel offline GPU
  inference on RTX 3090. Optional reference tests are tracked separately.
- Frozen upstream comparisons exist for every admitted family on the documented
  inputs/environments. SEN2SR Mamba's complete CUDA wrapper matched exactly on
  two inputs; this is narrower than full runtime certification.
- Installed-wheel command/resource checks pass outside the checkout, including
  conversion, staging, the native benchmark, and OpenSR-Test evaluation.
- The earlier SEN2NEON benchmark contains 126 recipe/seed observations from three
  adjacent tiles. The separate [OpenSR-Test pilot](validation.md)
  adds 84 evaluations over six sites; all seven metrics are finite, with recorded
  SOAP/Evoland registration warnings.
- Strict MkDocs compilation passes. The GitHub Pages workflow now includes
  deployment, with canonical URL **https://models.opensr.eu/**.
- The [image gallery](examples.md) presents three pilot scenes with
  comparison sliders and six-panel Matplotlib figures. Local Chromium checks
  cover four screen sizes, keyboard/pointer/touch controls, mobile navigation,
  figure tabs, filtering, and JavaScript-disabled comparisons.
- The [image selection audit](reports/image-selection.json) accepts eight of
  nine cached pairs with finite source values and complete RGB-NIR masks.
  Current additional examples use HARV; gallery close-ups show 160 m windows
  at 8× enlargement. Historical numerical results retain their original inputs.

The observed-data and GPU evidence was collected on 27 October. The default
suite rerun does not rerun optional GPU/reference checks. These datasets do not
establish geographically representative quality, and training overlap is unknown.

## Outstanding release requirements

- Checkpoint redistribution review for source-only artifacts and Swin2-MoSE
  attribution/license review.
- Complete runtime/release certification, representative SEN2NEON evaluation,
  and training-overlap audit.
- Project Hugging Face mirror publication, immutable release binding, and PyPI
  publication. Existing recipes continue using their frozen original sources.
- Owner-managed [GitHub Pages and STRATO setup](hosting.md), first successful
  hosted deployment, HTTPS verification, cross-browser review, and a full
  accessibility audit.
- Repository branch-protection, required code-owner reviews, and DCO enforcement.

Documentation deploys only for `main` changes to its source/configuration or a
manual run on `main`. Model validation remains an explicit local Python/uv
operation; no recurring benchmark or checkpoint-download workflow is configured.
