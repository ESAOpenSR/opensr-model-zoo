---
hide:
  - toc
---

# SEN2SR Mamba

Mamba layers carry information across the image to combine local detail with wider scene context. A Fourier constraint ties the result back to the original Sentinel-2 image.

RGB-NIR · 4× · CUDA · 128 × 128 input patches

<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/opensr_sen2sr-rgbn-x4_1/prediction.webp" data-reference-src="../../assets/models/opensr_sen2sr-rgbn-x4_1/reference.webp" data-reference-alt="Reference for SEN2SR Mamba">
  <div class="before-after">
    <img src="../../assets/models/opensr_sen2sr-rgbn-x4_1/input.webp" alt="Observed input for SEN2SR Mamba" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/opensr_sen2sr-rgbn-x4_1/prediction.webp" alt="SEN2SR Mamba prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="SEN2SR Mamba comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/opensr_sen2sr-rgbn-x4_1/provenance.json">Image record</a></figcaption>
</figure>

```python
from opensr_model_zoo import load_model

model = load_model("opensr/sen2sr-rgbn-x4@1", device="cuda")
```

[Quickstart](../quickstart.md) · [Source](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/src/opensr_model_zoo/models/sen2sr) · [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/sen2sr-1.json)
