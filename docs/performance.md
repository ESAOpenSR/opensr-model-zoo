# Benchmark results

See the separate [OpenSR-Test pilot](validation.md) for the six-site batch,
seven upstream metrics, and registration diagnostics. The examples below keep
their original three-tile protocol.

Results apply to the recorded dataset, protocol, and runtime. Each table
specifies hardware, runtime lock, recipe revision, input shape, precision,
warmup, and timing boundary. Runtime and parameter count do not measure image
quality; a single sample is insufficient to rank models.

## Recorded metadata

| Field | Required interpretation |
| --- | --- |
| Recipe | Full immutable recipe ID and artifact hashes |
| Input | BCHW shape, bands, grid, units, and validity mask |
| Runtime | Python, PyTorch, package version, device, and environment digest |
| Timing | Loading, warmup, synchronized inference, and metric timing separately |
| Memory | Peak allocated GPU memory when CUDA is used |
| Quality | Declared dataset revision, split, masks, borders, and metrics |

The benchmark runner writes `per_sample.csv`, `aggregate.csv`, and a provenance
manifest. Aggregates report means and population standard deviations over the
declared seeds. Comparisons may combine runs only when the benchmark protocol
hash matches.

## Three-tile SEN2NEON results

The current measured cohorts use three adjacent MLBS3 validation samples and
three seeds (45 rows for the ×2 protocol and 81 rows for the ×4 protocol).
The ×2 cohort uses border 0 and 2× tensor output; the ×4 cohort uses border 64
and 4× tensor output. They share the SEN2NEON dataset revision but remain
separate output groups because scale and border protocol differ.

The table below is rendered from the versioned JSON export at
`assets/benchmarks/index.json`, using the saved benchmark records. It is
filterable by recipe, device, dataset, and protocol.

<div id="benchmark-controls" class="benchmark-controls" markdown>
<label>Filter <input id="benchmark-filter" type="search" placeholder="recipe, device, dataset…"></label>
</div>
<div id="benchmark-table" class="benchmark-table" markdown>
Loading benchmark records…
</div>

Each exported record includes the dataset revision and protocol identity. A
row may contain latency, memory, PSNR, SSIM, and SAM, but a missing value stays
`—`; it is never imputed. Records describe their declared cohort. Comparisons
across datasets need a separately defined common protocol.

Use [the benchmark protocol](benchmarks.md) to evaluate an observed-data cohort.
Label synthetic fixtures as API tests.

Download the protocol records and per-sample observations:

| Cohort | Protocol and environment | Aggregate | Per sample |
| --- | --- | --- | --- |
| 4×, 128×128 LR, border 64 | [Manifest](assets/benchmarks/x4/manifest.json) | [CSV](assets/benchmarks/x4/aggregate.csv) | [CSV](assets/benchmarks/x4/per_sample.csv) |
| 2×, 64×64 LR, border 0 | [Manifest](assets/benchmarks/x2/manifest.json) | [CSV](assets/benchmarks/x2/aggregate.csv) | [CSV](assets/benchmarks/x2/per_sample.csv) |

All measurements use RTX 3090, Python 3.12, Torch 2.6.0+cu126 and float32.
The manifests record the exact uv lock hash, library versions, TF32 settings,
artifact hashes, source data checksums, warmup and metric settings. Timing
includes the prediction API and its recipe corrections, excludes model loading
and metrics, and synchronizes the selected CUDA device. Results were collected
on this development workstation and are not dedicated-hardware speed claims.
Repeated seeds of deterministic models do not increase the number of independent
samples. Training overlap remains unknown. Larger scenes and more geographic
coverage are needed before drawing model-quality conclusions.
