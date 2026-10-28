# Weight-license review

This register keeps the license of imported source code separate from the
permission to redistribute a trained checkpoint. Revisions and hashes are
copied from the checkpoint `provenance.json` files. The links below were
validated against the upstream repository or model page; the exact immutable
revisions remain recorded in the machine-readable provenance.

The unresolved entries are intentionally **source-only**: the project does not
mirror their weight binaries.

| Checkpoint | Source implementation | Source terms | Weight evidence and status |
| --- | --- | --- | --- |
| Satlas ESRGAN (`satlas-esrgan-rgb-tci-v1`) | [allenai/satlas-super-resolution](https://github.com/allenai/satlas-super-resolution), pinned revision `3e67973f6746bedbd91cc032b4888574980e1daf` | Apache-2.0 repository license for the imported implementation | `esrgan_1S2.pth`, SHA-256 `b4b1bb6c7d1b926083fc01edc039f1b143c743f9c403cd09878331765c20c405`; no separate checkpoint grant is recorded in the pinned metadata. **Open.** |
| SRGAN (`srgan-rgbn-v1`) | [ESAOpenSR/SRGAN](https://github.com/ESAOpenSR/SRGAN), pinned revision `7bcb73b358d3990c0d70cbd66201afdd9dd2cdf3` | Apache-2.0 repository license for the imported implementation | [simon-donike/SR-GAN](https://huggingface.co/simon-donike/SR-GAN) contains `RGB-NIR_4band_inference.ckpt`; SHA-256 `d55eee785ab5ff7d2d53d2c674d70461037722027020da2d2385b0fe43834281`. The pinned record supplies no redistribution term. **Open.** |
| SR4RS (`sr4rs-rgbn-v1`) | [remicres/sr4rs](https://github.com/remicres/sr4rs), including its [pretrained-model documentation](https://github.com/remicres/sr4rs/blob/master/doc/PRETRAINED_MODELS.md), pinned revision `35ce4aaa131bed40cbbc1977c454d92b50d2d0d9` | MIT repository license for the imported generator components | TensorFlow variables are supplied through [isp-uv-es/superIX](https://huggingface.co/isp-uv-es/superIX), revision `99343836564dae33541fd61c62beeecf7af3ed9f`; hashes are in provenance. Publisher terms for those files are not documented in the pinned record. **Open.** |
| Swin2-MoSE (`swin2-mose-rgbn-v1`) | [IMPLabUniPr/swin2-mose](https://github.com/IMPLabUniPr/swin2-mose), pinned revision `095d314b90d007d44104796d4b591401b6617a80` | GPL-2.0-only upstream project/reference. The native port uses the reference for behavior and attribution but does not copy its reference implementation. | The upstream [v1.1 release](https://github.com/IMPLabUniPr/swin2-mose/releases/tag/v1.1) supplies `sen2venus_exp4_2x_v5_1.zip`, SHA-256 `4bfcae792956cd8d51a38f2ff02de5565675197e282c436032e404ac306a62f3`; the pinned record declares GPL-2.0-only. This records the upstream declaration; project redistribution review remains open. **Open.** |
| Evoland (`evoland-s2v2x2-v1`, `evoland-wsx2-v1`, `evoland-wsx4-v1`) | [Evoland sentinel2_superresolution](https://github.com/Evoland-Land-Monitoring-Evolution/sentinel2_superresolution), pinned revision `cc5dec8c9c6b4917b99172a02d86659278334642` | Apache-2.0 repository license | The repository includes the pinned ONNX files for [s2v2x2](https://github.com/Evoland-Land-Monitoring-Evolution/sentinel2_superresolution/blob/master/src/sentinel2_superresolution/models/s2v2x2_spatrad.onnx), [wsx2](https://github.com/Evoland-Land-Monitoring-Evolution/sentinel2_superresolution/blob/master/src/sentinel2_superresolution/models/wsx2_spatrad.onnx), and [wsx4](https://github.com/Evoland-Land-Monitoring-Evolution/sentinel2_superresolution/blob/master/src/sentinel2_superresolution/models/wsx4_spatrad.onnx). The pinned record labels them Apache-2.0 but gives no separate artifact grant. **Open.** |

## Release rule

The machine-readable source of truth is the installed recipe catalog and the
source audit records in
`src/opensr_model_zoo/catalog/provenance/*.json`. Generated Hub trees in
`build/huggingface-model-zoo/` copy those identities into checkpoint
`provenance.json` files and an `index.json`; they are publication outputs, not
the package's source metadata.

Close a redistribution gate only when an authoritative publisher statement,
license file, or rights-holder grant clearly covers the exact checkpoint. Add
that evidence beside the checkpoint, update provenance, and rerun Hub-tree
validation. Until then, retain `availability: source-only` and
`redistribution: unresolved`.
