---
hide:
  - toc
---

# Bicubic interpolation

Each new pixel combines a larger neighbourhood with cubic interpolation. It often preserves sharper transitions than bilinear interpolation and needs no learned weights.

RGB-NIR · 2× or 4× · CPU or CUDA

<details class="model-variant" open>
<summary>4×</summary>
<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/opensr_bicubic-x4_1/prediction.webp" data-reference-src="../../assets/models/opensr_bicubic-x4_1/reference.webp" data-reference-alt="Reference for Bicubic interpolation">
  <div class="before-after">
    <img src="../../assets/models/opensr_bicubic-x4_1/input.webp" alt="Observed input for Bicubic interpolation" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/opensr_bicubic-x4_1/prediction.webp" alt="Bicubic interpolation prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Bicubic interpolation comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/opensr_bicubic-x4_1/provenance.json">Image record</a></figcaption>
</figure>
</details>

<details class="model-variant">
<summary>2×</summary>
<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/opensr_bicubic-x2_1/prediction.webp" data-reference-src="../../assets/models/opensr_bicubic-x2_1/reference.webp" data-reference-alt="Reference for Bicubic interpolation">
  <div class="before-after">
    <img src="../../assets/models/opensr_bicubic-x2_1/input.webp" alt="Observed input for Bicubic interpolation" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/opensr_bicubic-x2_1/prediction.webp" alt="Bicubic interpolation prediction" width="128" height="128" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Bicubic interpolation comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/opensr_bicubic-x2_1/provenance.json">Image record</a></figcaption>
</figure>
</details>

```python
from opensr_model_zoo import load_model

model = load_model("opensr/bicubic-x4@1", device="cpu")
```

[Quickstart](../quickstart.md) · [Source](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/src/opensr_model_zoo/models/baselines) · [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/bicubic.json)
