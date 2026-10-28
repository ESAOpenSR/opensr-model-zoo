---
hide:
  - toc
---

# SR4RS

A convolutional generator uses residual blocks to refine and enlarge the four Sentinel-2 bands. This checkpoint was trained on imagery from France.

RGB-NIR · 4× · CPU or CUDA

<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/remicres_sr4rs-rgbn-x4_1/prediction.webp" data-reference-src="../../assets/models/remicres_sr4rs-rgbn-x4_1/reference.webp" data-reference-alt="Reference for SR4RS">
  <div class="before-after">
    <img src="../../assets/models/remicres_sr4rs-rgbn-x4_1/input.webp" alt="Observed input for SR4RS" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/remicres_sr4rs-rgbn-x4_1/prediction.webp" alt="SR4RS prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="SR4RS comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/remicres_sr4rs-rgbn-x4_1/provenance.json">Image record</a></figcaption>
</figure>

```python
from opensr_model_zoo import load_model

model = load_model("remicres/sr4rs-rgbn-x4@1", device="cpu")
```

[Quickstart](../quickstart.md) · [Source](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/src/opensr_model_zoo/models/sr4rs) · [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/sr4rs-rgbn-x4.json)
