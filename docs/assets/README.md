# Documentation assets

The OpenSR logo is the authentic upstream image from
[`opensr-model`](https://github.com/ESAOpenSR/opensr-model/blob/9c6bb2fecad7b93f3949248c2d1c5b20f264a4db/resources/images/opensr_logo.png)
(MIT). The favicon is its globe crop. The site uses navy and neutral gray.

Model comparisons use observed inputs, predictions, and references. Provenance,
source hashes, display settings, and runtime records live beside the images:

- [Model comparisons](models/index.json): fourteen SEN2NEON examples and a
  separate Satlas RGB/NAIP example.
- [Scene gallery](gallery/index.json): three SEN2SR Lite scenes.
- [Earlier example exports](examples/index.json): retained asset records.

Reflectance panels share a per-channel 1–99% stretch from valid input pixels;
inputs are enlarged with nearest-neighbour resampling. Satlas keeps the source
rendered RGB colours. Display clipping affects previews only.

Rebuild a model comparison from a saved run:

```bash
uv run --no-sync opensr-zoo maintain docs gallery \
  --run benchmark-results/my-run --output build/my-model \
  --recipe-id opensr/sen2sr-lite-rgbn-x4@1 \
  --sample-id 2022_HARV_7__4_3.tif --seed 0 --panels-only
```

The exporter rejects synthetic inputs and incomplete masks. Historical figures
and numerical reports remain available in their original asset folders.
