---
hide:
  - navigation
  - toc
---

# Results

Drag to compare each model with its input. Select **Reference** to inspect the
target image in the same viewer.

The RGB-NIR examples use the same HARV scene from SEN2NEON, seed 0. Satlas uses
its own rendered RGB example with a NAIP reference.
[Image records](assets/models/index.json)

<div class="benchmark-controls" markdown>
<label>Find a model <input id="benchmark-filter" type="search" placeholder="Model name…"></label>
</div>

<div class="scene-grid">

<article class="scene-card" data-model-result="opensr_sen2sr-lite-rgbn-x4_1">
  <div class="scene-heading"><h2><a href="../models/sen2sr-lite/">SEN2SR Lite</a></h2></div>
  <p class="scene-meta">4×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_sen2sr-lite-rgbn-x4_1/prediction.webp" data-reference-src="../assets/models/opensr_sen2sr-lite-rgbn-x4_1/reference.webp" data-reference-alt="Reference for SEN2SR Lite">
  <div class="before-after">
    <img src="../assets/models/opensr_sen2sr-lite-rgbn-x4_1/input.webp" alt="Observed input for SEN2SR Lite" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_sen2sr-lite-rgbn-x4_1/prediction.webp" alt="SEN2SR Lite prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="SEN2SR Lite comparison split">
  </label>
</div>
</article>

<article class="scene-card" data-model-result="opensr_sen2sr-rgbn-x4_1">
  <div class="scene-heading"><h2><a href="../models/sen2sr/">SEN2SR Mamba</a></h2></div>
  <p class="scene-meta">4×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_sen2sr-rgbn-x4_1/prediction.webp" data-reference-src="../assets/models/opensr_sen2sr-rgbn-x4_1/reference.webp" data-reference-alt="Reference for SEN2SR Mamba">
  <div class="before-after">
    <img src="../assets/models/opensr_sen2sr-rgbn-x4_1/input.webp" alt="Observed input for SEN2SR Mamba" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_sen2sr-rgbn-x4_1/prediction.webp" alt="SEN2SR Mamba prediction" width="512" height="512" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="opensr_ldsrs2-rgbn-x4_1">
  <div class="scene-heading"><h2><a href="../models/ldsr-s2/">LDSR-S2</a></h2></div>
  <p class="scene-meta">Default</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_ldsrs2-rgbn-x4_1/prediction.webp" data-reference-src="../assets/models/opensr_ldsrs2-rgbn-x4_1/reference.webp" data-reference-alt="Reference for LDSR-S2">
  <div class="before-after">
    <img src="../assets/models/opensr_ldsrs2-rgbn-x4_1/input.webp" alt="Observed input for LDSR-S2" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_ldsrs2-rgbn-x4_1/prediction.webp" alt="LDSR-S2 prediction" width="512" height="512" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="opensr_ldsrs2-rgbn-x4-ddim100-histogram_1">
  <div class="scene-heading"><h2><a href="../models/ldsr-s2/">LDSR-S2</a></h2></div>
  <p class="scene-meta">DDIM / histogram profile</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/prediction.webp" data-reference-src="../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/reference.webp" data-reference-alt="Reference for LDSR-S2">
  <div class="before-after">
    <img src="../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/input.webp" alt="Observed input for LDSR-S2" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_ldsrs2-rgbn-x4-ddim100-histogram_1/prediction.webp" alt="LDSR-S2 prediction" width="512" height="512" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="opensr_srgan-rgbn-x4_1">
  <div class="scene-heading"><h2><a href="../models/srgan/">SRGAN</a></h2></div>
  <p class="scene-meta">4×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_srgan-rgbn-x4_1/prediction.webp" data-reference-src="../assets/models/opensr_srgan-rgbn-x4_1/reference.webp" data-reference-alt="Reference for SRGAN">
  <div class="before-after">
    <img src="../assets/models/opensr_srgan-rgbn-x4_1/input.webp" alt="Observed input for SRGAN" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_srgan-rgbn-x4_1/prediction.webp" alt="SRGAN prediction" width="512" height="512" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="remicres_sr4rs-rgbn-x4_1">
  <div class="scene-heading"><h2><a href="../models/sr4rs/">SR4RS</a></h2></div>
  <p class="scene-meta">4×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/remicres_sr4rs-rgbn-x4_1/prediction.webp" data-reference-src="../assets/models/remicres_sr4rs-rgbn-x4_1/reference.webp" data-reference-alt="Reference for SR4RS">
  <div class="before-after">
    <img src="../assets/models/remicres_sr4rs-rgbn-x4_1/input.webp" alt="Observed input for SR4RS" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/remicres_sr4rs-rgbn-x4_1/prediction.webp" alt="SR4RS prediction" width="512" height="512" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="satlas_esrgan-rgb-tci-x4_1">
  <div class="scene-heading"><h2><a href="../models/satlas/">Satlas</a></h2></div>
  <p class="scene-meta">4× · TCI RGB / NAIP</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/satlas_esrgan-rgb-tci-x4_1/prediction.webp" data-reference-src="../assets/models/satlas_esrgan-rgb-tci-x4_1/reference.webp" data-reference-alt="Reference for Satlas">
  <div class="before-after">
    <img src="../assets/models/satlas_esrgan-rgb-tci-x4_1/input.webp" alt="Observed input for Satlas" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/satlas_esrgan-rgb-tci-x4_1/prediction.webp" alt="Satlas prediction" width="128" height="128" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="evoland_wsx4-rgbn-x4_1">
  <div class="scene-heading"><h2><a href="../models/evoland-x4/">Evoland WorldStrat 4×</a></h2></div>
  <p class="scene-meta">4×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/evoland_wsx4-rgbn-x4_1/prediction.webp" data-reference-src="../assets/models/evoland_wsx4-rgbn-x4_1/reference.webp" data-reference-alt="Reference for Evoland WorldStrat 4×">
  <div class="before-after">
    <img src="../assets/models/evoland_wsx4-rgbn-x4_1/input.webp" alt="Observed input for Evoland WorldStrat 4×" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/evoland_wsx4-rgbn-x4_1/prediction.webp" alt="Evoland WorldStrat 4× prediction" width="512" height="512" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="evoland_wsx2-rgbn-x2_1">
  <div class="scene-heading"><h2><a href="../models/evoland-x2/">Evoland WorldStrat 2×</a></h2></div>
  <p class="scene-meta">2×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/evoland_wsx2-rgbn-x2_1/prediction.webp" data-reference-src="../assets/models/evoland_wsx2-rgbn-x2_1/reference.webp" data-reference-alt="Reference for Evoland WorldStrat 2×">
  <div class="before-after">
    <img src="../assets/models/evoland_wsx2-rgbn-x2_1/input.webp" alt="Observed input for Evoland WorldStrat 2×" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/evoland_wsx2-rgbn-x2_1/prediction.webp" alt="Evoland WorldStrat 2× prediction" width="128" height="128" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Evoland WorldStrat 2× comparison split">
  </label>
</div>
</article>

<article class="scene-card" data-model-result="evoland_s2v2x2-rgbn-x2_1">
  <div class="scene-heading"><h2><a href="../models/evoland-s2v2/">Evoland Sen2Venus</a></h2></div>
  <p class="scene-meta">2×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/evoland_s2v2x2-rgbn-x2_1/prediction.webp" data-reference-src="../assets/models/evoland_s2v2x2-rgbn-x2_1/reference.webp" data-reference-alt="Reference for Evoland Sen2Venus">
  <div class="before-after">
    <img src="../assets/models/evoland_s2v2x2-rgbn-x2_1/input.webp" alt="Observed input for Evoland Sen2Venus" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/evoland_s2v2x2-rgbn-x2_1/prediction.webp" alt="Evoland Sen2Venus prediction" width="128" height="128" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Evoland Sen2Venus comparison split">
  </label>
</div>
</article>

<article class="scene-card" data-model-result="implab_swin2-mose-sen2venus-rgbn-x2_1">
  <div class="scene-heading"><h2><a href="../models/swin2-mose/">Swin2-MoSE</a></h2></div>
  <p class="scene-meta">2×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/prediction.webp" data-reference-src="../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/reference.webp" data-reference-alt="Reference for Swin2-MoSE">
  <div class="before-after">
    <img src="../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/input.webp" alt="Observed input for Swin2-MoSE" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/implab_swin2-mose-sen2venus-rgbn-x2_1/prediction.webp" alt="Swin2-MoSE prediction" width="128" height="128" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="opensr_bilinear-x4_1">
  <div class="scene-heading"><h2><a href="../models/bilinear/">Bilinear interpolation</a></h2></div>
  <p class="scene-meta">4×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_bilinear-x4_1/prediction.webp" data-reference-src="../assets/models/opensr_bilinear-x4_1/reference.webp" data-reference-alt="Reference for Bilinear interpolation">
  <div class="before-after">
    <img src="../assets/models/opensr_bilinear-x4_1/input.webp" alt="Observed input for Bilinear interpolation" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_bilinear-x4_1/prediction.webp" alt="Bilinear interpolation prediction" width="512" height="512" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Bilinear interpolation comparison split">
  </label>
</div>
</article>

<article class="scene-card" data-model-result="opensr_bilinear-x2_1">
  <div class="scene-heading"><h2><a href="../models/bilinear/">Bilinear interpolation</a></h2></div>
  <p class="scene-meta">2×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_bilinear-x2_1/prediction.webp" data-reference-src="../assets/models/opensr_bilinear-x2_1/reference.webp" data-reference-alt="Reference for Bilinear interpolation">
  <div class="before-after">
    <img src="../assets/models/opensr_bilinear-x2_1/input.webp" alt="Observed input for Bilinear interpolation" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_bilinear-x2_1/prediction.webp" alt="Bilinear interpolation prediction" width="128" height="128" loading="lazy" decoding="async">
    <div class="comparison-labels"><span>Input</span><span data-comparison-label>Prediction</span></div>
  </div>
  <div class="comparison-views" role="group" aria-label="Comparison view">
    <button type="button" data-comparison-view="prediction" aria-pressed="true">Prediction</button>
    <button type="button" data-comparison-view="reference" aria-pressed="false">Reference</button>
  </div>
  <label class="comparison-control">Drag to compare
    <input type="range" min="0" max="100" value="50" aria-label="Bilinear interpolation comparison split">
  </label>
</div>
</article>

<article class="scene-card" data-model-result="opensr_bicubic-x4_1">
  <div class="scene-heading"><h2><a href="../models/bicubic/">Bicubic interpolation</a></h2></div>
  <p class="scene-meta">4×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_bicubic-x4_1/prediction.webp" data-reference-src="../assets/models/opensr_bicubic-x4_1/reference.webp" data-reference-alt="Reference for Bicubic interpolation">
  <div class="before-after">
    <img src="../assets/models/opensr_bicubic-x4_1/input.webp" alt="Observed input for Bicubic interpolation" width="512" height="512" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_bicubic-x4_1/prediction.webp" alt="Bicubic interpolation prediction" width="512" height="512" loading="lazy" decoding="async">
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
</article>

<article class="scene-card" data-model-result="opensr_bicubic-x2_1">
  <div class="scene-heading"><h2><a href="../models/bicubic/">Bicubic interpolation</a></h2></div>
  <p class="scene-meta">2×</p>
  <div class="comparison" data-before-after data-prediction-src="../assets/models/opensr_bicubic-x2_1/prediction.webp" data-reference-src="../assets/models/opensr_bicubic-x2_1/reference.webp" data-reference-alt="Reference for Bicubic interpolation">
  <div class="before-after">
    <img src="../assets/models/opensr_bicubic-x2_1/input.webp" alt="Observed input for Bicubic interpolation" width="128" height="128" loading="lazy" decoding="async">
    <img class="before-after-after" src="../assets/models/opensr_bicubic-x2_1/prediction.webp" alt="Bicubic interpolation prediction" width="128" height="128" loading="lazy" decoding="async">
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
</article>

</div>

## Measured results

The table covers three adjacent MLBS tiles, with separate 2× and 4× protocols.
Training overlap is unknown; this small cohort does not establish a model ranking.
See the [six-site OpenSR-Test pilot](validation.md) for a wider comparison and its
recorded registration warning.

<div id="benchmark-table" class="benchmark-table" data-columns="summary" markdown>

[4× results (CSV)](assets/benchmarks/x4/aggregate.csv) · [2× results (CSV)](assets/benchmarks/x2/aggregate.csv)

</div>

RTX 3090 · float32 · three tiles · three seeds. Repeated seeds are not independent
sites. The 2× and 4× groups use different output grids and evaluation borders.

[4× run record](assets/benchmarks/x4/manifest.json) ·
[2× run record](assets/benchmarks/x2/manifest.json) ·
[Protocol](benchmarks.md)
