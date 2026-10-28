# Reproducibility

Each result records the package version, immutable recipe revision, and exact
Python runtime lock. A checkpoint filename
alone is insufficient because preprocessing, samplers, constraints, and
numerical code affect outputs.

Record the resolved recipe, artifact SHA-256 values, input units and bands,
inference options, seed, precision, device, and package/runtime versions.
Stochastic models receive an explicit seed. The single GPU-inclusive `uv.lock`
has been exercised on RTX 3090 hardware with CUDA 12.6 and Mamba. Full upstream
parity and release certification remain separate gates. Missing GPUs must fail
GPU certification.

Released manifests are immutable. Changes to weights, preprocessing,
architecture, or numerical behavior create a new recipe revision.

Current recipes retain their upstream artifact repository and immutable
revision pins. A project-controlled Hugging Face mirror is a future release
operation, not an assertion about the current catalog. PyPI publication is
likewise pending release certification.
