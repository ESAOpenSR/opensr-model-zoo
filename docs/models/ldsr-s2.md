---
hide:
  - toc
---

# LDSR-S2

A diffusion model builds detail by gradually denoising a compressed image, guided by the Sentinel-2 input. Different random seeds can produce different reconstructions.

RGB-NIR · 4× · CPU or CUDA · 100–128 pixel input dimensions

<details class="model-variant" open>
<summary>Default</summary>
<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/opensr_ldsrs2-rgbn-x4_1/prediction.webp" data-reference-src="../../assets/models/opensr_ldsrs2-rgbn-x4_1/reference.webp" data-reference-alt="Reference for LDSR-S2">
  <div class="before-after">
    <img src="../../assets/models/opensr_ldsrs2-rgbn-x4_1/input.webp" alt="Observed input for LDSR-S2" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/opensr_ldsrs2-rgbn-x4_1/prediction.webp" alt="LDSR-S2 prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="LDSR-S2 comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/opensr_ldsrs2-rgbn-x4_1/provenance.json">Image record</a></figcaption>
</figure>
</details>

<details class="model-variant">
<summary>DDIM / histogram profile</summary>
<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/prediction.webp" data-reference-src="../../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/reference.webp" data-reference-alt="Reference for LDSR-S2">
  <div class="before-after">
    <img src="../../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/input.webp" alt="Observed input for LDSR-S2" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/prediction.webp" alt="LDSR-S2 prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="LDSR-S2 comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/provenance.json">Image record</a></figcaption>
</figure>
</details>

```python
from opensr_model_zoo import load_model

model = load_model("opensr/ldsrs2-rgbn-x4@1", device="cpu")
```

[Quickstart](../quickstart.md) · [Source](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/src/opensr_model_zoo/models/ldsr_s2) · [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/ldsr-rgbn-x4.json)
