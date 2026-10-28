---
hide:
  - toc
---

# SRGAN

A network of densely connected residual blocks reconstructs finer textures. Adversarial training encourages sharp-looking detail, which can also introduce features absent from the scene.

RGB-NIR · 4× · CPU or CUDA

<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/opensr_srgan-rgbn-x4_1/prediction.webp" data-reference-src="../../assets/models/opensr_srgan-rgbn-x4_1/reference.webp" data-reference-alt="Reference for SRGAN">
  <div class="before-after">
    <img src="../../assets/models/opensr_srgan-rgbn-x4_1/input.webp" alt="Observed input for SRGAN" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/opensr_srgan-rgbn-x4_1/prediction.webp" alt="SRGAN prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="SRGAN comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/opensr_srgan-rgbn-x4_1/provenance.json">Image record</a></figcaption>
</figure>

```python
from opensr_model_zoo import load_model

model = load_model("opensr/srgan-rgbn-x4@1", device="cpu")
```

[Quickstart](../quickstart.md) · [Source](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/src/opensr_model_zoo/models/srgan) · [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/srgan.json)
