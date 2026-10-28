# SRGAN RGB-NIR parity

The pinned RGB-NIR artifact is the `simon-donike/SR-GAN` file
`RGB-NIR_4band_inference.ckpt` at revision
`7b984f30dbba26198ebf55527a1ee7126fa68d71`. Its SHA-256 is
`d55eee785ab5ff7d2d53d2c674d70461037722027020da2d2385b0fe43834281`.

Using the upstream `ESAOpenSR/SRGAN` source available in `/work/code/SRGAN`,
the native generator was loaded on CPU and compared on a fixed `torch.rand`
input with seed 123. For an 8×8 RGB-NIR input (output 32×32), the measured
maximum and mean absolute differences were both exactly `0.0`. The same held
for the official inference path, including per-channel histogram matching.

To reproduce the generator check when the upstream research repository and
artifact are available:

```bash
OPENSR_SRGAN_RGBN_CKPT=/path/RGB-NIR_4band_inference.ckpt \
OPENSR_SRGAN_RGBN_CONFIG=/path/config_RGB-NIR.yaml \
pytest -q tests/parity/test_srgan_published.py
```
