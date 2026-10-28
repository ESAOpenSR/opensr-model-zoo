# OpenSR-Test pilot

Six SEN2NEON sites, seed 0: **84 evaluations** on 27 October 2026. All seven
OpenSR-Test metrics were finite. Training overlap is unknown; this is a small
pilot, not a model ranking.

**Registration warning:** Evoland Sen2Venus on SOAP. Check the
[per-sample results](reports/opensr-test/pilot-v1/x2/per_sample.csv) before using
that model's harmonized correctness scores.

[Visual comparisons](performance.md) · [Full evidence](reports/opensr-test/README.md)

## Results

Means across six sites. PSNR scores the raw prediction; the other columns use
OpenSR-Test's harmonization. Hallucination and improvement are fractions.

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

## Evaluation setup

| | 4× | 2× |
| --- | --- | --- |
| Sites | HARV, JORN, KONZ, MLBS, OSBS, SOAP | Same six sites |
| Input | 128 × 128 at 10 m | 64 × 64 at 10 m |
| Reference | 512 × 512 at 2.5 m | 128 × 128 at 5 m |
| Excluded border | 64 output pixels | 16 output pixels |

RGB-NIR reflectance · RTX 3090 · float32 · `opensr-test==1.3.3`.
Satlas uses rendered RGB and is excluded. The earlier
[three-tile benchmark](performance.md#measured-results) uses a separate protocol.

[4× run record](reports/opensr-test/pilot-v1/x4/manifest.json) ·
[2× run record](reports/opensr-test/pilot-v1/x2/manifest.json) ·
[Run an evaluation](benchmarks-sen2neon.md)
