# Supported formats

ZahirScan detects format from content and path, then runs the appropriate metadata and (where applicable) template pipeline.

## Logs & text

| Format | Extensions |
|--------|------------|
| Logs (plain or structured) | `.log` |
| JSON-formatted logs | `.json` |
| Plain text | `.txt` |
| Markdown | `.md`, `.markdown` |

## Documents

| Format | Extensions |
|--------|------------|
| Word documents | `.docx` |
| Excel workbooks | `.xlsx` |
| PowerPoint decks | `.pptx` |
| PDF | `.pdf` |
| EPUB e-books | `.epub` |

## Settings & structured text

| Format | Extensions |
|--------|------------|
| INI / config | `.ini`, `.cfg` |
| TOML | `.toml`, `.lock` |
| YAML | `.yaml`, `.yml` |
| XML | `.xml` |
| Value delimited | `.csv`, `.tsv`, `.tab`, `.psv` |
| JSON / JSON-lines | `.json` |
| HTML | `.html`, `.htm` |

## Tabular & columnar

| Format | Extensions |
|--------|------------|
| Parquet | `.parquet` |
| Arrow IPC / Feather | `.arrow`, `.feather`, `.ipc` |
| Avro | `.avro` |
| ORC | `.orc` |
| NumPy | `.npy`, `.npz` |
| HDF5 | `.h5`, `.hdf5` |
| NetCDF | `.nc`, `.cdf` |
| Matrix Market | `.mtx` |
| MATLAB | `.mat` |
| Zarr | `.zarr` |
| [Tetration](https://github.com/Latka-Industries/tetration) | `.tet` |

## Python pickle

| Format | Extensions | Notes |
|--------|------------|-------|
| Python pickle | `.pickle`, `.pkl` | `.pickle` always; `.pkl` when bytes look like Python serialization |

ZahirScan **does not unpickle** files. It walks opcodes read-only (like `pickletools`) and records protocol, import references, frame stats, and a heuristic `content_hint` (`tabular`, `ml_model`, `numeric_array`, `builtin_containers`). Large array payloads are skipped by length.

See [Metadata extraction — Python pickle](/zahirscan/metadata#python-pickle).

## Models

| Format | Extensions |
|--------|------------|
| ONNX | `.onnx` |
| GGUF | `.gguf` |
| TensorFlow Lite | `.tflite` |
| Safetensors | `.safetensors` |

## Archives

| Format | Extensions |
|--------|------------|
| ZIP | `.zip` |
| TAR | `.tar` |
| TAR.GZ | `.tar.gz`, `.tgz` |
| TAR.BZ2 | `.tar.bz2` |
| TAR.XZ | `.tar.xz` |

## Code & scripts

| Format | Extensions |
|--------|------------|
| Linguist-style source (by extension) | `.py`, `.rs`, `.js`, `.ts`, `.go`, `.java`, … |
| Makefile | `Makefile` |
| Dockerfile | `Dockerfile` |
| Shell / script (shebang) | `.sh`, `.bash`, `.zsh`, `.py`, `.rb`, `.pl` |

## Media

| Format | Extensions |
|--------|------------|
| Images | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.tif`, `.tiff`, `.ico`, `.svg` |
| Video | `.mp4`, `.mkv`, `.avi`, `.mov`, `.wmv`, `.flv`, `.webm`, `.m4v`, `.3gp`, `.ogv` |
| Audio | `.mp3`, `.flac`, `.wav`, `.m4a`, `.aac`, `.ogg`, `.opus`, `.wma`, `.ape`, `.dsd`, `.dsf`, `.aif`, `.aiff`, `.aifc` |

## Databases

| Format | Extensions |
|--------|------------|
| SQLite | `.db`, `.sqlite`, `.sqlite3` |

What each category extracts is summarized on [Metadata extraction](/zahirscan/metadata).
