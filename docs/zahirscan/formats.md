# Supported formats

ZahirScan detects format from content and path, then runs the appropriate metadata and (where applicable) template pipeline.

## Logs & text

- Plain text logs, JSON-formatted logs, structured log files
- **TXT**, **Markdown** (`.md`)

## Documents

- **DOCX**, **XLSX**, **PPTX**, **PDF**, **EPUB**

## Settings & structured text

- **INI** (`.ini`, `.cfg`), **TOML** (`.toml`, `.lock`), **YAML** (`.yaml`, `.yml`), **XML** (`.xml`)
- **CSV / TSV / tab / psv**, **JSON**, **HTML** (`.html`, `.htm`)

## Tabular & columnar

- **Parquet**; **Arrow IPC / Feather** (`.arrow`, `.feather`, `.ipc`); **Avro**; **ORC**
- **NumPy** (`.npy`, `.npz`); **HDF5** (`.h5`, `.hdf5`); **NetCDF** (`.nc`, `.cdf`)
- **Matrix Market** (`.mtx`); **MATLAB** (`.mat`); **Zarr** (`.zarr`)
- **[Tetration](https://github.com/Latka-Industries/tetration)** (`.tet`) — see [tetration-docs](https://github.com/Latka-Industries/tetration-docs)

## Models

- **ONNX** (`.onnx`), **GGUF** (`.gguf`), **TensorFlow Lite** (`.tflite`), **Safetensors** (`.safetensors`)

## Archives

- **ZIP** (`.zip`)
- **TAR** family (`.tar`, `.tar.gz`, `.tgz`, `.tar.bz2`, `.tar.xz`)

## Code & scripts

Common source and config extensions (e.g. `.py`, `.rs`, `.js`, `.ts`, `.sh`, `Makefile`, `Dockerfile`, …) via linguist-style detection plus optional shebang.

## Media

| Type | Examples |
|------|----------|
| **Images** | JPEG, PNG, GIF, WebP, BMP, TIFF |
| **Video** | MP4, MKV, AVI, MOV, WMV, FLV, WebM, M4V, 3GP, OGV |
| **Audio** | MP3, FLAC, WAV, M4A, AAC, OGG, Opus, WMA, APE, DSD, DSF |

## Databases

- **SQLite** (`.db`, `.sqlite`, `.sqlite3`)

What each category extracts is summarized on [Metadata extraction](/zahirscan/metadata).
