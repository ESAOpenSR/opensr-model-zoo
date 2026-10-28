# OpenSR-Test pilot validation

The first observed-imagery pilot completed on **27 October 2026** with
`opensr-test==1.3.3`: **84 model/sample evaluations**, comprising nine 4× recipes
and five 2× recipes over six validation tiles. Every evaluation returned finite
values for all seven metrics. The 2× cohort records a registration warning for
Evoland Sen2Venus on the SOAP tile; inspect that case before interpreting its
harmonized correctness scores.

This is a bounded pilot with one seed (`0`), not a representative full-dataset
evaluation or a model ranking. Training overlap remains unknown. The earlier
three-tile examples on the performance page use a separate protocol.

## Data and metric protocol

The frozen selection is in
[`src/opensr_model_zoo/benchmark/data/sen2neon-pilot.json`](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/benchmark/data/sen2neon-pilot.json).
It uses the SEN2NEON revision
`9f076b4f652aa0253127d382dcb6e611250b2e67`, with observed Sentinel-2 L2A inputs
and canonical NEON references. The six sites are HARV, JORN, KONZ, MLBS, OSBS,
and SOAP. All prepared input/reference pixels are valid. One initial HARV
candidate was excluded after raster mask inspection found holes.

| Cohort | LR crop | Reference | Border excluded | Cases |
| --- | --- | --- | --- | --- |
| 4× | 128×128 at 10 m | 512×512 at 2.5 m | 64 output pixels | 54 |
| 2× | 64×64 at 10 m | 128×128 at 5 m, area averaged from 2.5 m | 16 output pixels | 30 |

Models run in float32 on RTX 3090 GPUs; metric computation runs on CPU. Every
model's tensors are reordered to B04/B03/B02/B08 for evaluation. Satlas consumes
rendered TCI and is excluded from these reflectance cohorts.

The evaluator passes `Config` to `Metrics(params=...)`.
It uses the upstream pixel aggregation, PCC registration, L1 reflectance and
synthesis distances, SAD spectral distance, normalized-difference correctness,
and softmin correctness normalization. Spectral and spatial harmonization are
enabled explicitly in the recorded effective configuration. Unknown settings,
partially invalid masks, nonfinite tensors, and missing/nonfinite metric values
fail validation. Registration and numerical warnings remain in the CSV and
manifest; no alternative metric or registration method is substituted.

`spectral` is in degrees; the native benchmark's SAM is in radians. `spatial`
measures displacement on the LR grid. Correctness `ha_metric`, `om_metric`, and
`im_metric` are the upstream hallucination, omission, and improvement fractions.
PSNR/SSIM/SAM score the raw model predictions; OpenSR-Test's synthesis and
correctness metrics use its harmonization procedure. Their values answer
different questions and should be interpreted together.

## Six-site results

The tables report means across six sites in recipe-ID order. Full values,
population standard deviations, individual cases, timing, warning diagnostics,
source hashes, effective settings, and runtime versions are in the
[saved evidence](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/docs/reports/opensr-test/pilot-v1).
Large tensors and prediction files remain in ignored local storage.

### 4× cohort

| Recipe | PSNR (dB) | Reflectance L1 | Spectral (°) | Hallucination | Improvement |
| --- | --- | --- | --- | --- | --- |
| `evoland/wsx4-rgbn-x4@1` | 30.527 | 0.00751 | 2.346 | 0.183 | 0.474 |
| `opensr/bicubic-x4@1` | 31.962 | 0.00306 | 0.711 | 0.100 | 0.443 |
| `opensr/bilinear-x4@1` | 32.334 | 0.00445 | 0.991 | 0.098 | 0.431 |
| `opensr/ldsrs2-rgbn-x4-ddim100-histogram@1` | 31.718 | 0.00397 | 1.259 | 0.175 | 0.472 |
| `opensr/ldsrs2-rgbn-x4@1` | 31.337 | 0.00208 | 0.531 | 0.140 | 0.470 |
| `opensr/sen2sr-lite-rgbn-x4@1` | 31.626 | 0.00193 | 0.570 | 0.114 | 0.456 |
| `opensr/sen2sr-rgbn-x4@1` | 31.735 | 0.00342 | 1.142 | 0.112 | 0.446 |
| `opensr/srgan-rgbn-x4@1` | 31.908 | 0.00495 | 1.205 | 0.218 | 0.481 |
| `remicres/sr4rs-rgbn-x4@1` | 28.590 | 0.02005 | 4.282 | 0.324 | 0.458 |


### 2× cohort

| Recipe | PSNR (dB) | Reflectance L1 | Spectral (°) | Hallucination | Improvement |
| --- | --- | --- | --- | --- | --- |
| `evoland/s2v2x2-rgbn-x2@1` | 31.053 | 0.00463 | 1.145 | 0.080 | 0.540 |
| `evoland/wsx2-rgbn-x2@1` | 30.961 | 0.00653 | 1.623 | 0.106 | 0.543 |
| `implab/swin2-mose-sen2venus-rgbn-x2@1` | 31.393 | 0.00849 | 2.229 | 0.089 | 0.550 |
| `opensr/bicubic-x2@1` | 31.139 | 0.00354 | 0.758 | 0.079 | 0.534 |
| `opensr/bilinear-x2@1` | 31.480 | 0.00520 | 1.062 | 0.078 | 0.523 |

## Local reproduction commands

```bash
uv sync --locked --group dev --extra opensr-test
uv run opensr-zoo sen2neon pilot data/validation-raw \
  data/validation-prepared --download
uv run opensr-zoo download --all --cache-dir artifacts/cache
for cohort in x4 x2; do
  OMP_NUM_THREADS=2 MPLCONFIGDIR=/tmp/opensr-matplotlib \
  uv run --no-sync opensr-zoo evaluate \
    data/validation-prepared/$cohort/benchmark.json \
    benchmark-results/opensr-test/$cohort \
    --device cuda --cache-dir artifacts/cache --local-files-only
done
```

Preparation and evaluation require fresh output directories. Reuse the pinned
raw download by omitting `--download` when preparing another output directory.
The result directory contains OpenSR-Test CSVs and its manifest, plus
`inference/` with the native benchmark, actual predictions, and timing records.
The evaluation identity hashes the resolved data/recipe protocol, library
version, effective metric settings, band order, mask policy, and evaluator
source. Each row carries that identity.

## Validation triggers and runtime coverage

Run this validation locally when a dataset or recipe changes, recording the
data and recipe revisions. Hosted CI does not run GPU evaluation. The local
Mamba run matched exactly on two supported full patches; see the
[parity evidence](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/docs/reports/parity/sen2sr-mamba.json).
Other model/runtime parity checks remain separate release requirements.
