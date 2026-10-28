# SEN2SR, LDSR-S2, and SRGAN model cards

The recipes below consume RGB-NIR reflectances in order B04, B03, B02, B08
and generate those four bands at 4× the input tensor size. The reference input
grid is 10 m and output grid is 2.5 m. This is SISR; finer output sampling does
not establish that generated detail is physically observed.

| Family | Intended use and limitations | Provenance |
| --- | --- | --- |
| SEN2SRLite | Published CNNSR/SPAN inference with the original Fourier constraint. Exactly 128×128 LR patches. The original parallel-block and fused-convolution behavior is preserved. | [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/sen2sr-0.json), [CPU parity](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/tests/parity/sen2sr_lite_rgbn_parity.json) |
| SEN2SR Mamba | RGB-NIR model with a CUDA extension and exactly 128×128 LR patches. Offline inference and full upstream CUDA parity passed; two deterministic full patches matched exactly. | [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/sen2sr-1.json) |
| LDSR-S2 | Stochastic latent diffusion using canonical v1 weights. Each LR dimension must be 100–128. Latent conditioning is stochastic too, so record seeds. Back-projection and histogram profiles are separate immutable recipes. Generated detail and uncertainty are not ground truth. | [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/ldsr-rgbn-x4.json), [both profile checks](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/docs/reports/parity/ldsr-s2.json) |
| SRGAN | Published RGB-NIR RRDB preset with the original histogram correction, regular weights (EMA disabled in the preset). Flexible patch size. Adversarial detail may introduce unsupported features. Original-owner downloads only until weight redistribution rights are documented. | [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/srgan.json), [CPU parity](srgan-parity-evidence.json) |

These are inference ports of released checkpoints, not retrained models. Training
corpora, geographic coverage, and preprocessing are inherited from the original
papers and model cards; consult each recipe citation. Benchmark overlap must be
reported as unknown unless a contributor establishes its relation to training.
No catalog entry implies a guaranteed unseen evaluation set.

## OpenSR-Utils and OpenSR-Test integration

```python
from opensr_model_zoo import load_model
from opensr_model_zoo.integrations.utils import adapt_model

model = load_model("sen2sr-lite")
tiled_model = adapt_model(model, model.spec)
# Pass tiled_model to opensr_utils.super_resolve(...).
```

The adapter exposes the band, patch, scale, and normalized-unit metadata used by
`opensr-utils`, while the zoo retains model loading and provenance. The optional
`integrations.test.evaluate_with_opensr_test(lr, sr, hr, config)` uses the public
`opensr_test.Config` and `Metrics.compute` API. Both integrations are optional;
the zoo does not implement a second raster pipeline or benchmark dataset.
