# SEN2NEON data preparation and evaluation

The preparation workflow uses **observed Sentinel-2 L2A at 10 m** from
`s2_l2a_10m/` and the canonical `neon_2.5m_linearized/` reference. The historical
NEON-derived 10 m product is not an observed Sentinel-2 input. See the
[dataset source](https://github.com/ESAOpenSR/SEN2NEON).

The frozen Hugging Face dataset is
[`isp-uv-es/SEN2NEON`](https://huggingface.co/datasets/isp-uv-es/SEN2NEON/tree/9f076b4f652aa0253127d382dcb6e611250b2e67)
at commit `9f076b4f652aa0253127d382dcb6e611250b2e67`.

## Dataset download and local inputs

```bash
uv run --no-sync opensr-zoo sen2neon download data/sen2neon --max-samples 3
```

After [installation](installation.md), this downloads metadata and three paired tiles.
Select reproducible individual tiles with `--sample-ids`; inspect `--help` for
options. Download receipts retain the repository revision and selected rows.
Already-downloaded data can be supplied directly through `--root` and
`--metadata`; no additional download is necessary.

### Finite-value and mask filtering

For visual examples, filter the downloaded pairs before preparation:

```bash
uv run --no-sync opensr-zoo sen2neon filter --root data/sen2neon \
  --output data/sen2neon-clean
```

The filter checks every stored band in both full rasters for NaN and infinity.
It also requires complete RGB-NIR validity masks, which excludes missing
reference regions encoded as finite zeros. Valid physical zeros are retained.
`selection.json` records accepted and rejected pairs, counts, reasons, and
source hashes. Source imagery and historical benchmark cohorts stay intact.
This selection applies to the supplied local metadata.

Pass `--metadata data/sen2neon-clean/filtered-pairs.csv` to the preparation
command below to use that selection.

## 4× cohort preparation

```bash
uv run opensr-zoo sen2neon prepare --root data/sen2neon \
  --output data/sen2neon-x4 --patch-size 128 --metric-border 64
uv run opensr-zoo benchmark data/sen2neon-x4/benchmark.json \
  benchmark-results/sen2neon-x4 --device cuda --cache-dir artifacts/cache \
  --artifact-dir artifacts/huggingface-model-zoo --save-predictions
```

Omit `--artifact-dir` when using upstream automatic downloads, available for
all pretrained recipes including SR4RS. Run a subset with `--recipes` when needed. Subset results
remain explicitly incomplete until the configured cohort is complete.

Preparation selects B04/B03/B02/B08 from explicit band metadata, divides integer
reflectances by 10,000, and preserves valid zero values. It validates projected
metre grids, both axes of pixel spacing, alignment, extent, dimensions and masks.
Each tile contributes a deterministic centre crop of 128×128 LR → 512×512 HR.
Source checksums, crop offsets, grids and masks are recorded in the preparation
receipt and tensor sample manifest. Missing band metadata requires an explicit
`--band-order`; brightness is never used to guess units or channels.

## 2× cohort preparation

```bash
uv run opensr-zoo sen2neon prepare --root data/sen2neon \
  --output data/sen2neon-x2 --target-resolution 5 --patch-size 64
uv run opensr-zoo benchmark data/sen2neon-x2/benchmark.json \
  benchmark-results/sen2neon-x2 --device cuda --cache-dir artifacts/cache \
  --save-predictions
```

This keeps the observed LR unchanged and area-averages the canonical 2.5 m HR to
5 m, requiring all contributing reference pixels to be valid. This additional
reference operation is recorded. The 64×64 LR crop accommodates the released
Swin2-MoSE patch contract. Its 128×128 output is compared with Evoland's two
2× models and 2× interpolation references. Its protocol differs from 4× and its
scores must remain in a separate group.

## Metrics, timing, and cohort limitations

Runs use seeds `[0, 1, 2]`, float32, explicit masks, no additional correction,
a common 64-pixel output border in the 4× demo (zero in 2×), PSNR with data range 1, local 7×7 SSIM, and SAM in radians.
Only predicted bands are scored. Warmup is excluded; CUDA inference timings
synchronize the selected GPU. Loading, inference and metric times are separate.
The manifest records hardware, effective settings and the actual artifact hashes.

```bash
uv run opensr-zoo export-results docs/assets/benchmarks \
  benchmark-results/sen2neon-x4 benchmark-results/sen2neon-x2
```

Export to a fresh directory, or deliberately replace an older generated export
when refreshing documentation. Compatible split runs can be merged through
`opensr-zoo merge`; unrelated protocol hashes remain separate in the website.

The committed demo uses **three adjacent MLBS tiles and three seed draws**, not
a full-dataset evaluation. Their geographic coverage is narrow and training
overlap is unknown. Repeated draws of deterministic models are identical quality
observations, rather than independent samples. Satlas expects rendered TCI and
is excluded from these reflectance cohorts. No overall quality rank is assigned.
