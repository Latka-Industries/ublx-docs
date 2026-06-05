---
outline: deep
---

# Metadata extraction

ZahirScan attaches **format-specific metadata** to output JSON. Templates-only mode still includes metadata where the format pipeline produces it; full mode (`-f`) adds file stats and compression — see [CLI](/zahirscan/cli).

Use the sidebar under **Metadata extraction** for field-level detail by category.

## Top-level output

Every scan includes `templates` and `file_type`. Full mode adds counts and timing; format blocks appear when the parser runs.

| Field | When | Meaning |
|-------|------|---------|
| `source` | Always (when path known) | Input file path |
| `file_type` | Always | Detected type string (e.g. `Csv`, `Pickle`, `Image`) |
| `byte_count`, `line_count`, `token_count` | Full mode | File size and line/token estimates |
| `processing_time_ms`, `is_binary` | Full mode | Timing and binary heuristic |
| `compression` | Full mode | Template token reduction stats |
| `writing_footprint` | Text-like formats | Prose metrics — [Writing footprint](/zahirscan/writing-footprint) |
| `*_metadata` | Per format | One block below; omitted when empty |

## By category

| Topic | JSON blocks | Page |
|-------|-------------|------|
| Sampled column profiles | `columns[]`, SQLite `ColumnInfo` | [Column statistics](/zahirscan/metadata/column-statistics) |
| Images, video, audio | `image_metadata`, `video_metadata`, `audio_metadata` | [Media](/zahirscan/metadata/media) |
| Office & ebooks | `docx_metadata`, `pptx_metadata`, `pdf_metadata`, `epub_metadata` | [Documents](/zahirscan/metadata/documents) |
| Logs & JSON structure | `log_metadata`, `json_metadata` | [Logs & JSON](/zahirscan/metadata/logs-and-json) |
| CSV / TSV / PSV | `csv_metadata` | [Delimited text](/zahirscan/metadata/delimited) |
| Parquet, Arrow, Avro, ORC | `parquet_metadata`, … | [Columnar binary](/zahirscan/metadata/columnar) |
| NumPy, HDF5, NetCDF, … | `npy_metadata`, `hdf5_metadata`, … | [Scientific arrays](/zahirscan/metadata/scientific-arrays) |
| Python pickle | `pickle_metadata` | [Python pickle](/zahirscan/metadata/pickle) |
| ONNX, GGUF, TFLite, Safetensors | `onnx_metadata`, … | [Models](/zahirscan/metadata/models) |
| SQLite databases | `sqlite_metadata` | [SQLite](/zahirscan/metadata/sqlite) |
| TOML, YAML, INI, XML | `toml_metadata`, … | [Settings & XML](/zahirscan/metadata/settings) |
| Source files | `code_metadata` | [Code](/zahirscan/metadata/code) |
| Web pages | `html_metadata` | [HTML](/zahirscan/metadata/html) |
| ZIP & TAR | `zip_metadata`, `archive_metadata` | [Archives](/zahirscan/metadata/archives) |

Tabular formats share [column statistics](/zahirscan/metadata/column-statistics) (`ColumnStat`, typed stat objects). Array and catalog formats use layout blocks instead — see [when there are no columns](/zahirscan/metadata/column-statistics#array-and-catalog-stats).

Related: [Supported formats](/zahirscan/formats), [Template mining](/zahirscan/templates) (separate from metadata). Rust API types: [docs.rs/zahirscan](https://docs.rs/zahirscan).
