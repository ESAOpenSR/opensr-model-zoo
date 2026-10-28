# Release gates

Hosted actions run lint, formatting, Python syntax, and basic project metadata
checks. The documentation workflow installs only MkDocs Material, builds changed
documentation on `main`, and deploys it to GitHub Pages. Neither workflow
installs model runtimes or downloads checkpoints. See [hosting setup](../hosting.md)
for the owner-managed GitHub settings, custom domain, and DNS steps.

Run pretrained inference and numerical reference checks locally with Python and
uv. SEN2SR Lite and Mamba have opt-in tests against the frozen upstream source
in `tests/parity/test_sen2sr_upstream_reference.py`. Supply the required source
and checkpoint paths and inspect skipped tests before claiming a check passed.
Other recipes have their own reference tests. Artifact smoke inference remains
a separate check from numerical parity.

The [validation guide](../validation.md) documents explicit local commands for
the OpenSR-Test integration and the six-site 4×/2× pilot, including its
results and registration diagnostics.

Publish only after a clean wheel installation, catalog inclusion, offline
loading, the relevant parity gate, and the model/weight license audit pass.
External Hugging Face and PyPI publication are separate controlled
steps after these gates; none is published by the current development release.

Before opening contributions, configure repository rules to require the PR
checks, a DCO sign-off check, and approval by a core code owner. The checked-in
CODEOWNERS and contribution policy define those requirements; GitHub branch
protection and DCO app configuration need repository administrator access.
