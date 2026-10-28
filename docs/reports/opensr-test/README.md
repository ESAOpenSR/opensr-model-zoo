# OpenSR-Test evidence

`pilot-v1/` contains the first six-site observed-imagery batch, run with
OpenSR-Test 1.3.3 on 27 October 2026. Keep later protocols in separate folders.

Each cohort contains `aggregate.csv`, `per_sample.csv`, and `manifest.json`
from the real evaluator. Its `inference/` subfolder contains the native
PSNR/SSIM/SAM summaries and timing rows. The top-level manifest also retains the
inference protocol, artifact provenance, and environment. Prediction paths refer
to ignored local `benchmark-results/` files; binaries are deliberately excluded.

The 4× cohort has 54 evaluations; the 2× cohort has 30. All seven metric values
are finite for every case. The 2× report records upstream registration warnings
for the Evoland Sen2Venus SOAP case. These results do not certify full-dataset
quality, training independence, or the complete supported runtime matrix.

See [the protocol and readable results](../../validation.md) and the
frozen selection in `src/opensr_model_zoo/benchmark/data/sen2neon-pilot.json`,
which is shipped as package data.
