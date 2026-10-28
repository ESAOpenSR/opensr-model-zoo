---
hide:
  - navigation
  - toc
---

# Image gallery

The comparisons below use saved **SEN2SR Lite** predictions for three SEN2NEON
scenes from the observed-data pilot. Inputs are Sentinel-2 L2A crops at 10 m;
predictions use a 2.5 m output grid.

Drag across an image or move its slider. You can also focus the slider and use
the arrow keys. The detailed figures below include the aligned NEON reference.

<div class="scene-grid">

  <article class="scene-card">
    <div class="scene-heading"><h2>OSBS · 2021</h2></div>
    <p class="scene-meta">OSBS · 2021 · 4× SR</p>
    <div class="comparison" data-before-after>
      <div class="before-after">
        <img src="../assets/gallery/2021_OSBS_6__3_1.input.webp" alt="Observed Sentinel-2 input showing lake edges, a road and forest, enlarged from 10 m pixels" width="512" height="512" loading="lazy" decoding="async">
        <img class="before-after-after" src="../assets/gallery/2021_OSBS_6__3_1.prediction.webp" alt="SEN2SR Lite prediction showing lake edges, a road and forest on a 2.5 m grid" width="512" height="512" loading="lazy" decoding="async">
        <div class="comparison-labels"><span>Observed · 10 m</span><span>SR · 2.5 m</span></div>
      </div>
      <label class="comparison-control">Move the comparison split
        <input type="range" min="0" max="100" value="50" aria-label="Comparison split for OSBS · 2021">
      </label>
    </div>
    <p class="scene-description">The crop contains lake shorelines, roads, and forest.</p>
    <a class="scene-source" href="../assets/gallery/2021_OSBS_6__3_1.provenance.json">Scene provenance <span aria-hidden="true">↗</span></a>
  </article>

  <article class="scene-card">
    <div class="scene-heading"><h2>HARV · 2022</h2></div>
    <p class="scene-meta">HARV · 2022 · 4× SR</p>
    <div class="comparison" data-before-after>
      <div class="before-after">
        <img src="../assets/gallery/2022_HARV_7__4_3.input.webp" alt="Observed Sentinel-2 input showing tree canopy, clearings and small buildings, enlarged from 10 m pixels" width="512" height="512" loading="lazy" decoding="async">
        <img class="before-after-after" src="../assets/gallery/2022_HARV_7__4_3.prediction.webp" alt="SEN2SR Lite prediction showing tree canopy, clearings and small buildings on a 2.5 m grid" width="512" height="512" loading="lazy" decoding="async">
        <div class="comparison-labels"><span>Observed · 10 m</span><span>SR · 2.5 m</span></div>
      </div>
      <label class="comparison-control">Move the comparison split
        <input type="range" min="0" max="100" value="50" aria-label="Comparison split for HARV · 2022">
      </label>
    </div>
    <p class="scene-description">The crop contains forest canopy, clearings, and buildings.</p>
    <a class="scene-source" href="../assets/gallery/2022_HARV_7__4_3.provenance.json">Scene provenance <span aria-hidden="true">↗</span></a>
  </article>

  <article class="scene-card">
    <div class="scene-heading"><h2>KONZ · 2024</h2></div>
    <p class="scene-meta">KONZ · 2024 · 4× SR</p>
    <div class="comparison" data-before-after>
      <div class="before-after">
        <img src="../assets/gallery/2024_KONZ_9__6_2.input.webp" alt="Observed Sentinel-2 input showing open fields, winding tracks and vegetation, enlarged from 10 m pixels" width="512" height="512" loading="lazy" decoding="async">
        <img class="before-after-after" src="../assets/gallery/2024_KONZ_9__6_2.prediction.webp" alt="SEN2SR Lite prediction showing open fields, winding tracks and vegetation on a 2.5 m grid" width="512" height="512" loading="lazy" decoding="async">
        <div class="comparison-labels"><span>Observed · 10 m</span><span>SR · 2.5 m</span></div>
      </div>
      <label class="comparison-control">Move the comparison split
        <input type="range" min="0" max="100" value="50" aria-label="Comparison split for KONZ · 2024">
      </label>
    </div>
    <p class="scene-description">The crop contains fields, tracks, and vegetation boundaries.</p>
    <a class="scene-source" href="../assets/gallery/2024_KONZ_9__6_2.provenance.json">Scene provenance <span aria-hidden="true">↗</span></a>
  </article>

</div>

## Input, prediction, and reference panels

The top row shows the input, prediction, and reference over the same 1.28 km
crop. Gold boxes mark a 160 m detail window, enlarged 8× below. Select a scene,
then open its figure for a larger view.


=== "OSBS · Lake edges & roads"

    <figure class="sr-panel">
      <a href="../assets/gallery/2021_OSBS_6__3_1.png" aria-label="Open the full-size six-panel OSBS figure">
        <img src="../assets/gallery/2021_OSBS_6__3_1.webp" alt="Six-panel comparison of lake edges, a road and forest: observed input, SEN2SR Lite prediction, and NEON reference above; matching enlarged details below" width="2438" height="1438" loading="lazy" decoding="async">
      </a>
      <figcaption>Lake edges & roads · <code>2021_OSBS_6__3_1.tif</code> · seed 0</figcaption>
    </figure>

    [Full-size PNG](assets/gallery/2021_OSBS_6__3_1.png) · [Provenance](assets/gallery/2021_OSBS_6__3_1.provenance.json)

    <div class="detail-grid">
      <figure class="detail-card">
        <figcaption>8× detail · observed input and SR · 160 m window</figcaption>
        <div class="comparison" data-before-after>
          <div class="before-after">
            <img src="../assets/gallery/2021_OSBS_6__3_1.input.detail.webp" alt="Enlarged observed Sentinel-2 detail at OSBS, showing the original 10 m pixels" width="64" height="64" loading="lazy">
            <img class="before-after-after" src="../assets/gallery/2021_OSBS_6__3_1.prediction.detail.webp" alt="The same OSBS detail predicted by SEN2SR Lite on a 2.5 m grid" width="64" height="64" loading="lazy">
            <div class="comparison-labels"><span>Observed · 10 m</span><span>SR · 2.5 m</span></div>
          </div>
          <label class="comparison-control">Inspect the enlarged detail
            <input type="range" min="0" max="100" value="50" aria-label="Detail comparison split for OSBS">
          </label>
        </div>
      </figure>
      <figure class="detail-card">
        <figcaption>NEON reference · the same 160 m window</figcaption>
        <img class="detail-reference" src="../assets/gallery/2021_OSBS_6__3_1.reference.detail.webp" alt="Enlarged aligned NEON reference for the same 160 m OSBS detail" width="64" height="64" loading="lazy">
      </figure>
    </div>


=== "HARV · Forest & settlement"

    <figure class="sr-panel">
      <a href="../assets/gallery/2022_HARV_7__4_3.png" aria-label="Open the full-size six-panel HARV figure">
        <img src="../assets/gallery/2022_HARV_7__4_3.webp" alt="Six-panel comparison of tree canopy, clearings and small buildings: observed input, SEN2SR Lite prediction, and NEON reference above; matching enlarged details below" width="2438" height="1438" loading="lazy" decoding="async">
      </a>
      <figcaption>Forest & settlement · <code>2022_HARV_7__4_3.tif</code> · seed 0</figcaption>
    </figure>

    [Full-size PNG](assets/gallery/2022_HARV_7__4_3.png) · [Provenance](assets/gallery/2022_HARV_7__4_3.provenance.json)

    <div class="detail-grid">
      <figure class="detail-card">
        <figcaption>8× detail · observed input and SR · 160 m window</figcaption>
        <div class="comparison" data-before-after>
          <div class="before-after">
            <img src="../assets/gallery/2022_HARV_7__4_3.input.detail.webp" alt="Enlarged observed Sentinel-2 detail at HARV, showing the original 10 m pixels" width="64" height="64" loading="lazy">
            <img class="before-after-after" src="../assets/gallery/2022_HARV_7__4_3.prediction.detail.webp" alt="The same HARV detail predicted by SEN2SR Lite on a 2.5 m grid" width="64" height="64" loading="lazy">
            <div class="comparison-labels"><span>Observed · 10 m</span><span>SR · 2.5 m</span></div>
          </div>
          <label class="comparison-control">Inspect the enlarged detail
            <input type="range" min="0" max="100" value="50" aria-label="Detail comparison split for HARV">
          </label>
        </div>
      </figure>
      <figure class="detail-card">
        <figcaption>NEON reference · the same 160 m window</figcaption>
        <img class="detail-reference" src="../assets/gallery/2022_HARV_7__4_3.reference.detail.webp" alt="Enlarged aligned NEON reference for the same 160 m HARV detail" width="64" height="64" loading="lazy">
      </figure>
    </div>


=== "KONZ · Open fields & tracks"

    <figure class="sr-panel">
      <a href="../assets/gallery/2024_KONZ_9__6_2.png" aria-label="Open the full-size six-panel KONZ figure">
        <img src="../assets/gallery/2024_KONZ_9__6_2.webp" alt="Six-panel comparison of open fields, winding tracks and vegetation: observed input, SEN2SR Lite prediction, and NEON reference above; matching enlarged details below" width="2438" height="1438" loading="lazy" decoding="async">
      </a>
      <figcaption>Open fields & tracks · <code>2024_KONZ_9__6_2.tif</code> · seed 0</figcaption>
    </figure>

    [Full-size PNG](assets/gallery/2024_KONZ_9__6_2.png) · [Provenance](assets/gallery/2024_KONZ_9__6_2.provenance.json)

    <div class="detail-grid">
      <figure class="detail-card">
        <figcaption>8× detail · observed input and SR · 160 m window</figcaption>
        <div class="comparison" data-before-after>
          <div class="before-after">
            <img src="../assets/gallery/2024_KONZ_9__6_2.input.detail.webp" alt="Enlarged observed Sentinel-2 detail at KONZ, showing the original 10 m pixels" width="64" height="64" loading="lazy">
            <img class="before-after-after" src="../assets/gallery/2024_KONZ_9__6_2.prediction.detail.webp" alt="The same KONZ detail predicted by SEN2SR Lite on a 2.5 m grid" width="64" height="64" loading="lazy">
            <div class="comparison-labels"><span>Observed · 10 m</span><span>SR · 2.5 m</span></div>
          </div>
          <label class="comparison-control">Inspect the enlarged detail
            <input type="range" min="0" max="100" value="50" aria-label="Detail comparison split for KONZ">
          </label>
        </div>
      </figure>
      <figure class="detail-card">
        <figcaption>NEON reference · the same 160 m window</figcaption>
        <img class="detail-reference" src="../assets/gallery/2024_KONZ_9__6_2.reference.detail.webp" alt="Enlarged aligned NEON reference for the same 160 m KONZ detail" width="64" height="64" loading="lazy">
      </figure>
    </div>


## Display settings and provenance

RGB uses B04/B03/B02. Inference uses those bands plus B08 (NIR), with float32
reflectance inputs. Within each scene, every panel shares a per-channel 1–99%
stretch computed from valid input pixels. The input is enlarged with nearest
neighbour resampling. Display values are clipped for viewing; the saved
reflectance tensors remain the measurement record.

The reference comes from SEN2NEON's aligned, linearized NEON product. Output
grid spacing does not establish the spatial resolution of reconstructed detail.
Differences in colour, registration, and texture should be assessed against the
reference. The [pilot results](validation.md) document the six-site evaluation,
including registration warnings and unknown training overlap.

Recipe: `opensr/sen2sr-lite-rgbn-x4@1`, seed 0. Dataset:
[`isp-uv-es/SEN2NEON`](https://huggingface.co/datasets/isp-uv-es/SEN2NEON/tree/9f076b4f652aa0253127d382dcb6e611250b2e67),
revision `9f076b4f652aa0253127d382dcb6e611250b2e67`.
The [gallery manifest](assets/gallery/index.json) records source and asset hashes,
weight identities, runtime, RGB stretch, and detail coordinates. The
[additional model examples](assets/examples/index.json) use a clean HARV pair;
all displayed inputs and references have finite values and complete RGB-NIR masks.

## Figure export

Follow the [SEN2NEON guide](benchmarks-sen2neon.md) to prepare data and run a
benchmark with `--save-predictions`. The requested sample must be present in the
run; the scenes shown here come from the [six-site pilot](validation.md).
Export figures from a completed run into a fresh directory:

```bash
uv run --no-sync opensr-zoo maintain docs gallery \
  --run benchmark-results/my-run \
  --output build/my-gallery \
  --recipe-id opensr/sen2sr-lite-rgbn-x4@1 \
  --sample-id 2021_OSBS_6__3_1.tif \
  --seed 0 \
  --detail-size 64
```

The command uses Matplotlib from the `docs` dependency group. It writes a
six-panel figure, lossless browser images, and provenance for each selected
scene. The gallery on this page reuses the saved pilot predictions; no new
inference or scores were produced for the documentation refresh.

For a small CPU benchmark exercise, run the maintained synthetic fixture:

```bash
uv run --no-sync python examples/create_benchmark.py /tmp/opensr-example
uv run --no-sync opensr-zoo benchmark /tmp/opensr-example/benchmark.json \
  /tmp/opensr-results --device cpu
```

This fixture checks the API with synthetic data. For the first Python prediction,
start with the [quickstart](quickstart.md).
