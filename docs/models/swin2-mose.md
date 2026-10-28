---
hide:
  - toc
---

# Swin2-MoSE

Windowed attention combines nearby image features, while a mixture of experts adapts the reconstruction to different content. This model was trained on paired Sentinel-2 and VENµS imagery.

RGB-NIR · 2× · CPU or CUDA · 64 × 64 input patches

<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/prediction.webp" data-reference-src="../../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/reference.webp" data-reference-alt="Reference for Swin2-MoSE">
  <div class="before-after">
    <img src="../../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/input.webp" alt="Observed input for Swin2-MoSE" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/prediction.webp" alt="Swin2-MoSE prediction" width="128" height="128" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Swin2-MoSE comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/provenance.json">Image record</a></figcaption>
</figure>

```python
from opensr_model_zoo import load_model

model = load_model("implab/swin2-mose-sen2venus-rgbn-x2@1", device="cpu")
```

[Quickstart](../quickstart.md) · [Source](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/src/opensr_model_zoo/models/swin2_mose) · [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/swin2-mose-rgbn-x2.json)
