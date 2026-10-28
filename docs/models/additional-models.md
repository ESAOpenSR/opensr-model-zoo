# Additional SISR models

All implementations execute natively in PyTorch. Their source checkpoints are
pinned by SHA-256 and byte count. New ports remain experimental; reference
parity establishes implementation fidelity, rather than scientific accuracy.

| Recipe alias | Input and scale | Reference evidence |
| --- | --- | --- |
| `satlas` | Rendered TCI RGB / 255; 4× | Frozen SSR_RRDBNet, `params_ema`; exact CPU and CUDA parity |
| `sr4rs` | B04/B03/B02/B08 reflectance; 4× | France-2020 SavedModel, CPU maximum absolute error 1.61e-6 |
| `swin2-mose` | B02/B03/B04/B08 reflectance; 2×; 64×64 patches | v1.1 checkpoint; exact CPU expert-routing parity and CUDA smoke |
| `evoland-x4` | B02/B03/B04/B08 reflectance; 4× | Native tensor graph compared with original ONNX |
| `evoland-x2`, `evoland-s2v2` | Same four bands; 2× | Native tensor graph compared with original ONNX |

## Satlas

Use explicit `TCI-R`, `TCI-G`, `TCI-B` bands, `units="rendered_rgb"` and
`processing_level="L1C-TCI"`. Conversion from reflectance to TCI is not inferred.
The checkpoint is the **single-image** variant; no temporal models are admitted.
Training used US NAIP and Web-Mercator chips. Retain grid provenance when using
geospatial imagery. Its RGB color-domain outputs cannot enter the SEN2NEON
reflectance cohort without a separately declared data protocol.

## SR4RS conversion

The recipe automatically downloads the pinned original checkpoint index and
data shard from its public source mirror. A bundled offset/shape map is bound
to that exact shard SHA-256; native code reads only the generator tensor slices
and strictly loads them. No TensorFlow, arbitrary graph execution or source
clone is required. Local converted safetensors remain useful for maintainer
reference checks; see `src/opensr_model_zoo/catalog/provenance/sr4rs.json` for conversion and numerical evidence.
The original generator accepts reflectance internally. Its published deployment
crops a border from each output tile; the common 4× demo metric border is
64 output pixels. Larger raster workflows must retain sufficient halo context.

## Swin2-MoSE

The implementation uses a permissive Swin2SR backbone and a native
top-2 expert router and merger; the upstream GPL reference was consulted. See the family NOTICE for provenance and pending license review.
The upstream checkpoint is read from the exact ZIP member with restricted tensor
loading; the archive is never extracted. Published Sen2Venus LR/HR statistics are
preserved, including inverse scaling back to reflectance. Converted safetensors
remain local pending license review.

## Evoland

ONNX is used as a data-only graph and tensor format. The package parses a fixed
set of supported operators once, registers tensors as buffers and executes the
native Torch graph on the selected device. ONNX Runtime is used only for
reference tests. Embedded radiometric operations remain intact. The upstream
130-pixel context margin concerns raster stitching; the tensor API returns the
full model output. Large rasters should use the geospatial tiling bridge with
appropriate context, rather than stitching independent tiny patches.

See the machine-readable catalog and `docs/reports/` evidence for exact source
revisions, normalization, hashes, licenses and measured errors.
