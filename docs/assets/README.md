# Documentation assets

`opensr_logo.png` is reused from the OpenSR `opensr-model` repository at
`resources/images/opensr_logo.png`, frozen source revision
`9c6bb2fecad7b93f3949248c2d1c5b20f264a4db` (MIT; retain upstream attribution).
The gold accent `#d49f0c` follows the documentation theme in
the upstream [SEN2SR theme](https://github.com/ESAOpenSR/SEN2SR/blob/3986620793736da6efcdc92771f76a63127cae66/mkdocs.yml).
Navy backgrounds are a complementary site choice, not an official ESA style guide.
`opensr-globe.png` is the globe cropped directly from `opensr_logo.png`, using
pixel bounds `(8, 8, 108, 108)`, and serves as the favicon.

Examples use observed SEN2NEON benchmark crops and saved model outputs,
with dataset/recipe/sample/seed provenance alongside each set. They share a
per-channel stretch estimated from valid LR pixels. No AI-generated imagery is
used as scientific evidence. The dataset release's applicable attribution and
use terms continue to apply; see its model card and the recorded revision.

## SEN2NEON gallery assets

The [image gallery](../examples.md) contains OSBS lake edges and roads, HARV
forest and settlement, and KONZ open fields and tracks. These are visual
selections from the saved six-site pilot, using
`opensr/sen2sr-lite-rgbn-x4@1`, seed 0. Selection emphasises different surfaces;
it does not define an evaluation cohort or ranking.

`gallery/` contains Matplotlib figures with three full-scene panels and three
matching detail panels. The 64×64 output-pixel windows cover 160 m and are
enlarged 8× relative to the full crop. Separate close-up sliders and reference
views keep those details readable on mobile. Lossless WebP panels support the browser comparison
sliders, and PNG figures provide larger downloads. The input, prediction, and
reference share the same RGB display stretch. Display clipping affects only
the rendered assets.

Each scene's provenance and the [gallery manifest](gallery/index.json) identify
the frozen dataset, source tensors, artifact hashes, recipe, runtime, and detail
crop. Rebuild with `opensr-zoo maintain docs gallery --detail-size 64`; see the
[reproduction commands](../examples.md#figure-export).

The current `examples/` exports use the clean HARV pair. The earlier MLBS
reference contained extensive masked NoData encoded as finite zeros. New
example exports reject nonfinite tensors and incomplete masks. Raw-pair
selection checks all bands for NaN/Inf and RGB-NIR masks for complete coverage;
see the [selection audit](../reports/image-selection.json). Historical numerical
reports retain their original sample identities and results.
