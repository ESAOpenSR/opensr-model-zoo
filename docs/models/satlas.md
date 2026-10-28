---
hide:
  - toc
---

# Satlas

An adversarially trained residual network reconstructs detail from a rendered Sentinel-2 colour image. It was trained using aerial imagery and produces RGB rather than reflectance or NIR.

Rendered TCI RGB · 4× · CPU or CUDA · 32 × 32 input patches

<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/satlas_esrgan-rgb-tci-x4_1/prediction.webp" data-reference-src="../../assets/models/satlas_esrgan-rgb-tci-x4_1/reference.webp" data-reference-alt="Reference for Satlas">
  <div class="before-after">
    <img src="../../assets/models/satlas_esrgan-rgb-tci-x4_1/input.webp" alt="Observed input for Satlas" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/satlas_esrgan-rgb-tci-x4_1/prediction.webp" alt="Satlas prediction" width="128" height="128" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Satlas comparison split">
  </label>
</div>
<figcaption>Satlas validation example · Sentinel-2 TCI / NAIP · <a href="../../assets/models/satlas_esrgan-rgb-tci-x4_1/provenance.json">Image record</a></figcaption>
</figure>

```python
from opensr_model_zoo import load_model

model = load_model("satlas/esrgan-rgb-tci-x4@1", device="cpu")
```

[Quickstart](../quickstart.md) · [Source](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/src/opensr_model_zoo/models/satlas) · [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/satlas-esrgan-rgb-tci-x4.json)
