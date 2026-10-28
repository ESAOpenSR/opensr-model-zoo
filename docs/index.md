---
hide:
  - navigation
  - toc
---

<div class="home-hero">
  <div class="hero-copy">
    <p class="eyebrow">OpenSR Model Zoo</p>
    <h1>Sentinel-2 single-image<br>super-resolution</h1>
    <p>Python implementations of pretrained models and interpolation baselines, with versioned inference recipes, verified checkpoints, and per-prediction metadata.</p>
    <div class="hero-actions">
      <a href="installation/">Installation</a>
      <a href="quickstart/">CPU inference example</a>
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
    <figcaption>SEN2SR Lite · SEN2NEON OSBS · seed 0<br><a href="examples/#display-settings-and-provenance">Display settings and reference</a></figcaption>
  </figure>
</div>

## Installation and examples

<div class="start-grid" markdown>

<div class="start-card" markdown>
### Environment

Set up Python 3.12 and the locked environment with `uv`. The supported platform is Linux x86_64.

[Installation →](installation.md)
</div>

<div class="start-card" markdown>
### CPU inference

Run the bilinear interpolation recipe on a synthetic tensor without downloading checkpoints.

[Quickstart →](quickstart.md)
</div>

<div class="start-card" markdown>
### SEN2NEON comparisons

Observed Sentinel-2 inputs, saved SEN2SR Lite predictions, and aligned NEON references for three scenes.

[Image gallery →](examples.md)
</div>

</div>

## Model recipes and input requirements

The catalog includes SEN2SR, LDSR-S2, SRGAN, SR4RS, Evoland, Swin2-MoSE,
Satlas, and interpolation baselines. Each recipe records its input bands,
physical units, output grid, inference settings, and verified weight sources.
Predictions retain masks and provenance for later inspection.

Most recipes use Sentinel-2 RGB-NIR reflectance. Satlas uses rendered RGB TCI.
Use [the catalog](models/catalog.md) to check a model's input and device support,
and [the data guide](usage.md) to prepare your own crop.

## Evaluation protocol and results

The [held-out benchmark](closed-benchmark.md) provides a common RGB-NIR 128→512
task for understanding model strengths and trade-offs. Its leaderboard preview
will share category and overall indices after scoring calibration is complete.

The [SEN2NEON workflow](benchmarks-sen2neon.md) prepares observed Sentinel-2
inputs and aligned NEON references. The evaluation tools save per-sample scores,
timings, seeds, and runtime metadata. The
[benchmark results](performance.md) and [OpenSR-Test pilot](validation.md)
document the evaluated cohorts, metrics, and limitations.

## Development status

OpenSR maintains this research package. Version `0.1.0.dev0` is a development
release, with eleven experimental learned recipes. See
[release status](release-status.md) for validation coverage and publication plans.
This is an OpenSR project, not an official ESA product.
