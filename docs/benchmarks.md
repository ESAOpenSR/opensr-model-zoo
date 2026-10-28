# Benchmark protocol

A comparison cohort uses one input/output grid and identical conditioning band
sets. RGB-only models use an RGB cohort; RGB-NIR models use an RGBN cohort. Each
sample is one BCHW float32 image, with named input/reference bands. NPZ archives
and temporal tensors are unsupported. `.npy`, tensor-only `.pt`, and one-tensor
`.safetensors` files are accepted. Separate boolean LR validity and HR reference
masks are optional. Nonfinite values never count as valid metrics pixels.

Create a runnable interpolation example without downloading imagery:

```bash
python examples/create_benchmark.py /tmp/zoo-example
opensr-zoo benchmark /tmp/zoo-example/benchmark.json /tmp/zoo-results --device cpu
```

The generated sample is a synthetic fixture for exercising the API, not a
scientific dataset or quality claim. Replace it with a frozen observed dataset
and explicit split/sample identities for research. An OpenSR-Test dataset
revision and training overlap declaration belong in the dataset metadata;
the optional opensr-test bridge can compute its additional metrics.

The [OpenSR-Test validation guide](validation.md) runs `opensr-test` over
complete observed-imagery cohorts and reports its seven additional metrics,
effective settings, and registration diagnostics.

For observed imagery, the [SEN2NEON preparation guide](benchmarks-sen2neon.md)
pins the corrected dataset revision and extracts aligned RGB-NIR crops for this
runner. This RGB-NIR cohort has its own protocol and does not reproduce the
published all-band benchmark.

A config has `benchmark_version: "1"`, `dataset` (id, revision, split, samples,
training_overlap), full `recipes`, fixed `seeds`, `conditioning: {"mode":"RGBN"}`,
and `metrics`. The sample manifest declares input/reference files, input_bands,
reference_bands, resolution_m, and optionally reference_resolution_m, units,
processing_level, valid_mask and reference_mask. Paths resolve relative to that
manifest. Samples and masks are content-hashed alongside their metadata.

Metrics default to reflectance data range 1, mean-squared-error PSNR, per-image
per-channel local 7×7 skimage SSIM, and spectral angle in radians. SSIM counts
only windows with entirely valid pixels; borders are additionally cropped when
configured. A zero/zero spectral vector scores angle zero; a single zero vector
scores pi/2. Perfect PSNR remains infinity in CSV. All seeds are scored and
aggregates report means and population standard deviations. `metrics.border` is
in HR pixels; `ssim_win_size` and `data_range` are explicit config options.

The runner records warmup (default one), model loading, synchronized inference,
metric timing, and CUDA peak allocated memory. Input-to-device transfer is part
of the high-level prediction call. Timings are observations on the recorded
hardware, not standardized performance claims. Images are loaded sequentially
and model runtimes are released between recipes.

Outputs are `per_sample.csv`, `aggregate.csv`, and `manifest.json`, with complete
recipe/settings/artifact provenance and the benchmark identity. The runner
rejects unsupported preprocessing and grid overrides; supply already prepared,
aligned tensors. Registration or shared correction must be applied upstream and
recorded in a new dataset/protocol identity.

For separate runtimes, use the same full config and sample files and select
execution subsets with `--recipes`. Their protocol hashes remain identical:

```bash
opensr-zoo benchmark benchmark.json run-a --recipes opensr/bilinear-x4@1
opensr-zoo benchmark benchmark.json run-b --recipes opensr/bicubic-x4@1
opensr-zoo merge merged run-a run-b
```

Merging rejects different protocol hashes, unexpected/duplicate rows, and an
incomplete cohort. `--allow-partial` explicitly labels a partial aggregate.
