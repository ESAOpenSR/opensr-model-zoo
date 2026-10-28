---
hide:
  - toc
---

# Evoland WorldStrat 4×

An ESRGAN convolutional network learns to reconstruct finer detail from paired satellite images. This model uses the WorldStrat training data and enlarges all four bands by four.

RGB-NIR · 4× · CPU or CUDA

<figure class="model-result">
<div class="comparison" data-before-after data-prediction-src="../../assets/models/evoland_wsx4-rgbn-x4_1/prediction.webp" data-reference-src="../../assets/models/evoland_wsx4-rgbn-x4_1/reference.webp" data-reference-alt="Reference for Evoland WorldStrat 4×">
  <div class="before-after">
    <img src="../../assets/models/evoland_wsx4-rgbn-x4_1/input.webp" alt="Observed input for Evoland WorldStrat 4×" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../../assets/models/evoland_wsx4-rgbn-x4_1/prediction.webp" alt="Evoland WorldStrat 4× prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Evoland WorldStrat 4× comparison split">
  </label>
</div>
<figcaption>HARV · Sentinel-2 / NEON · <a href="../../assets/models/evoland_wsx4-rgbn-x4_1/provenance.json">Image record</a></figcaption>
</figure>

```python
from opensr_model_zoo import load_model

model = load_model("evoland/wsx4-rgbn-x4@1", device="cpu")
```

[Quickstart](../quickstart.md) · [Source](https://github.com/ESAOpenSR/opensr-model-zoo/tree/main/src/opensr_model_zoo/models/evoland) · [Recipe](https://github.com/ESAOpenSR/opensr-model-zoo/blob/main/src/opensr_model_zoo/catalog/evoland-wsx4-rgbn.json)

[Upstream models](https://github.com/Evoland-Land-Monitoring-Evolution/sentinel2_superresolution/blob/cc5dec8c9c6b4917b99172a02d86659278334642/README.org#additional-models)
