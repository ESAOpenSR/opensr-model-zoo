---
hide:
  - navigation
  - toc
---

<div class="home-hero">
  <div class="hero-copy">
    <p class="eyebrow">OpenSR Model Zoo</p>
    <h1>Sentinel-2 single-image<br>super-resolution</h1>
    <p>Explore pretrained models for sharper Sentinel-2 imagery. Compare the results, choose a model, and run it in Python.</p>
    <div class="hero-actions">
      <a href="models/catalog/">Explore models</a>
      <a href="quickstart/">Get started</a>
    </div>
    <div class="hero-facts">
      <span><strong>15</strong> versioned recipes</span>
      <span><strong>2× / 4×</strong> output grids</span>
      <span><strong>RGB + NIR</strong> inputs</span>
    </div>
  </div>
  <figure class="hero-visual sr-figure">
    <div class="comparison" data-before-after>
      <div class="before-after">
        <img src="assets/gallery/2021_OSBS_6__3_1.input.webp" alt="Observed Sentinel-2 crop with lakes, forest and a road at OSBS, enlarged from 10 m pixels" width="512" height="512" fetchpriority="high">
        <img class="before-after-after" src="assets/gallery/2021_OSBS_6__3_1.prediction.webp" alt="SEN2SR Lite prediction for the same OSBS crop on a 2.5 m grid" width="512" height="512" fetchpriority="high">
        <div class="comparison-labels"><span>Sentinel-2 · 10 m</span><span>SR · 2.5 m</span></div>
      </div>
      <label class="comparison-control">Move the comparison split
        <input type="range" min="0" max="100" value="50" aria-label="Comparison split for the OSBS lake scene">
      </label>
    </div>
    <figcaption><a href="models/sen2sr-lite/">SEN2SR Lite</a> · OSBS, Sentinel-2 · <a href="examples/">More scenes</a></figcaption>
  </figure>
</div>

<div class="start-grid" markdown>

<div class="start-card" markdown>
### Models

Usage examples for every model, with image comparisons for featured models.

[Find a model →](models/catalog.md)
</div>

<div class="start-card" markdown>
### Results

Compare predictions and explore the measured results.

[View results →](performance.md)
</div>

<div class="start-card" markdown>
### Get started

Install with `uv` and run super-resolution from Python.

[Quickstart →](quickstart.md) · [Python examples](python-examples.md)
</div>

</div>

OpenSR Model Zoo is a research package in development. Learned models are
experimental. [Release status](release-status.md) · [GitHub](https://github.com/ESAOpenSR/opensr-model-zoo)
