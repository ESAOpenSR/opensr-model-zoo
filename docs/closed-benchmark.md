---
hide:
  - toc
---

# Held-out benchmark

This held-out benchmark supports a shared understanding of model strengths and
trade-offs in RGB-NIR single-image super-resolution. All models receive the
same task: **128 × 128 pixels at 10 m → 512 × 512 pixels at 2.5 m**.
A fixed collection supports consistent comparisons as new model recipes are
added. The curators maintain evaluation scenes and detailed results privately.

<div class="closed-summary" markdown>

**Four predicted bands** · Red, green, blue and near-infrared

**One output grid** · Every eligible model is evaluated at 2.5 m

**Index-only publication** · Fidelity, Consistency, Detail quality and Overall

</div>

!!! info "Preview — calibration in progress"
    The preview lists compatible catalog recipes alphabetically. Category and
    overall indices remain **Pending** until calibration and evaluation are
    complete.

## Leaderboard preview

<label for="closed-filter">Filter recipes</label>
<input id="closed-filter" type="search" placeholder="Recipe name or adaptation" />

<div id="closed-leaderboard" markdown>

| Recipe type | Overall | Fidelity | Consistency | Detail quality | Evaluation adaptation |
| --- | --- | --- | --- | --- | --- |
| Native 4× | Pending | Pending | Pending | Pending | Direct |
| Smaller-patch 2× | Pending | Pending | Pending | Pending | Stitched; upsampled to 2.5 m |
| Larger-patch model | Pending | Pending | Pending | Pending | Reflect-padded; cropped |

</div>

The [public index export](assets/closed-benchmark/index.json) contains only
recipe identities, native scale, adaptation notes, publication status and
category/overall indices. Detailed results are not included.

## Shared task and model support

The evaluation supports registered recipes that accept 10 m RGB-NIR reflectance
and predict all four bands, using pretrained weights or interpolation. Newly
registered compatible recipes can use the same fixed collection. This shared
four-band task includes reconstruction of near-infrared as well as visible bands.

Native 4× outputs retain their 2.5 m grid. Native 2× outputs are upsampled and
outputs above 4× are downsampled to the common grid; these adaptations are shown
beside each recipe. Smaller input patches are joined with overlapping blending.
Models requiring larger inputs receive reflected padding, which is cropped away
before evaluation. Every model receives the same observed 128 × 128 footprint.

## Sharing results

Results will be shared through Fidelity, Consistency and Detail quality indices,
along with an overall index. Higher values indicate stronger results for that
category within the same evaluation and scoring version. Indices support
comparison within a version; a changed version needs its own interpretation.
Indices are shared after a complete evaluation. The curators retain detailed
diagnostics to help review results and investigate issues.

The held-out benchmark complements the [public comparisons](performance.md).
Collection coverage and possible training overlap limit how broadly results
apply. Model certification is reviewed separately.
