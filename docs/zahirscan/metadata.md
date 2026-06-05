# Metadata extraction

ZahirScan attaches **format-specific metadata** to Zahir JSON output. Templates-only mode still includes metadata where the format pipeline produces it; full mode (`-f`) adds file stats and size comparison — see [CLI](/zahirscan/cli).

## By category

### Media

Dimensions, codecs, bitrates for images, video, and audio (rich video/audio needs **ffprobe**).

### Documents

| Format | Extracts |
|--------|----------|
| **DOCX** | Word/character/paragraph counts, title, author, dates, revision |
| **XLSX** | Sheet count, names, row/column counts per sheet, core properties |
| **PPTX** | Slide count, core properties |
| **PDF** | Page count, title, author, subject, creator, producer, dates, version, encryption |
| **EPUB** | Title, author, language, identifier, chapter count; writing footprint from spine. DRM-protected EPUBs (encryption.xml) skip parsing |

### Logs

Byte count, line count, line ending, max line length, blank lines, timestamp heuristic on first lines (ISO8601 / epoch).

### JSON

Byte/line stats, root type (array/object), lengths or key counts, max depth, pretty-printed heuristic.

### CSV / TSV / tab / psv

Row/column counts, column names, types, delimiter, quote/escape, null percentages, unique string counts; numeric/date/boolean column statistics with adaptive sampling (file size, wide tables, bytes-per-row when known).

### Tabular / columnar

**Parquet, Arrow, Avro, ORC**: schema, row counts, `stats_rows_sampled`, bounded column stats.

**NumPy, HDF5, NetCDF, Matrix Market, MATLAB, Zarr**: shapes, dtypes, format-specific summaries.

**`.tet` (Tetration)**: catalog, datasets, chunk index, query-derived column/tensor stats.

### Python pickle

**`.pickle`**, and **`.pkl`** when sniffed as Python serialization (not Apple Pkl source). Read-only opcode scan — **no unpickling**, no imports, no code execution.

| Field | Meaning |
|-------|---------|
| `protocol` | First `\x80` + protocol byte when present (binary pickles) |
| `encoding` | `binary` (protocol 2+ or non-UTF-8) or `text` (protocol 0/1 ASCII) |
| `protocols_seen` | Every `PROTO` opcode in the stream |
| `frame_count`, `frame_bytes_total` | Protocol 4+ `FRAME` opcodes and declared payload sizes |
| `referenced_globals` | Deduplicated `module.name` from `GLOBAL`, `INST`, `STACK_GLOBAL` |
| `builtin_types` | Subset under `builtins.*`, `__builtin__.*`, `collections.*` |
| `content_hint` | Heuristic: `tabular` (pandas), `ml_model` (sklearn/torch/xgboost), `numeric_array` (numpy), `builtin_containers` |
| `scan_truncated`, `scan_error` | Scan stopped early (opcode cap, unknown opcode, truncated operand) |

Apple Pkl **source text** at `.pkl` is routed as **Code** with linguist `script_type: "pkl"` — see [Code / scripts](#code-scripts).

### Models

| Format | Extracts |
|--------|----------|
| **ONNX** | Producer, opset, op-type summary, I/O and initializer counts, node count |
| **GGUF** | Key/value metadata, tensor table summary |
| **TFLite** | Model/subgraph/operator summary, tensor descriptors |
| **Safetensors** | Optional `__metadata__`, tensor summaries, dtype histograms, parse status |

### SQLite

Schema (tables, columns, types, constraints), PKs, FKs, indexes, row counts, column statistics (null %, uniques, typed stats).

### TOML, YAML, INI, CFG

Recursive schema (scalar / table / array; INI sections), key count, max depth; format-specific counts (sections, comments, sequence/map counts).

### Code / scripts

`script_type` (linguist + shebang), byte/line counts, BOM, line ending, trailing newline, max line length, blank lines, indentation scan.

### ZIP

File count, entries (path, sizes, type, modified, compression), `entry_type_counts`; filters `__MACOSX`, `.DS_Store`, `Thumbs.db`, etc.

### TAR family

File count, entry paths and sizes, compressed vs uncompressed totals.

### XML

Recursive schema with attributes; repeated siblings as arrays; element/attribute counts, depth, namespaces.

### HTML

Title, meta description, lang, charset, viewport; resource counts (link, script, style, …); heading and element counts; `plain_text_len`, `word_count`; writing footprint from body text.

### Writing footprint

For text, markdown, and HTML body: vocabulary richness, sentence structure, template diversity, punctuation and optional SVO metrics. Documented in depth on [Writing footprint](/zahirscan/templates/writing-footprint).

### Column statistics

Tabular and SQLite outputs include per-column profiles (`columns` compact array or `ColumnInfo`). See [Column statistics](/zahirscan/templates/column-statistics).

Full field-level API types: [docs.rs/zahirscan](https://docs.rs/zahirscan).
