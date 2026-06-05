---
outline: deep
---

# Template mining

ZahirScan compresses repetitive structure into **templates** and attaches **metadata** blocks per file type. Use the sidebar under **Template mining** to jump between topics.

Not every format produces templates. Many files return `templates: []` and instead ship **metadata** (including `columns` stats for tables). UBLX maps these fields to the **Templates**, **Writing**, and **Metadata** panes.

| Topic | Page |
|-------|------|
| Templates, compression, categories | This page |
| [Writing footprint](/zahirscan/templates/writing-footprint) | Prose/style metrics (not templates) |
| [Column statistics](/zahirscan/templates/column-statistics) | Tabular `columns[]`, SQLite profiles, [arrays & catalogs without columns](/zahirscan/templates/column-statistics#array-and-catalog-stats) |

## Templates

A **template** is one recurring pattern with placeholders. They are stored in the top-level `templates` array (and mirrored inside the phase-2 `MiningResult` when present).

### Template object

```json
{
  "pattern": "[DATE] [TIME] ERROR: Process [POS:3] failed",
  "count": 842,
  "examples": {
    "POS:3": ["1234", "5678", "9012"]
  }
}
```

| Field | Meaning |
|-------|---------|
| `pattern` | Structure with bracketed placeholders — e.g. `[POS:n]`, `[HEADER:2]`, `[LIST:12]:type=unordered`, `[WORD:0]` |
| `count` | Lines, JSON records, or structural elements matching this pattern |
| `examples` | Sample values per placeholder key (`BTreeMap`, keys sorted; count capped by config) |

Output sorts templates by **`count`** descending (most common first).

### Placeholder families (by category)

| Category | Typical placeholders |
|----------|----------------------|
| Logs | `[POS:n]`, typed date/time tokens, literals for fixed columns |
| Plain text / HTML / EPUB body | `[WORD:n]`, `[PREFIX]`, `[SUFFIX]`, shape groups like length + ending punctuation |
| Markdown | `[HEADER:level]`, `[LIST:n]:type=…`, `[CODE_BLOCK:…]:lang=…`, `[PARAGRAPH:n]:quotes=…` |
| JSON | Key paths with dynamic value slots; stable keys stay literal in the pattern string |

## Mining result & compression

Phase 2 builds a **`MiningResult`** (embedded in Zahir output alongside top-level fields):

| Field | Description |
|-------|-------------|
| `templates` | Mined patterns; `[]` if format skips mining or nothing repeats |
| `original_tokens` | Estimated source tokens |
| `compressed_tokens` | Estimated tokens after template representation |
| `token_reduction_percent` | Percent reduction vs original |
| `writing_footprint` | Optional — see [Writing footprint](/zahirscan/templates/writing-footprint) |

Top-level **`Output`** always includes `templates`. **Full mode** (`-f`) also adds file-level stats and `compression`:

```json
{
  "compression": {
    "original_tokens": 120000,
    "compressed_tokens": 18000,
    "reduction_percent": 85.0
  }
}
```

Typical reduction on template-eligible content is **80–95%**. Column-heavy files gain more from [column statistics](/zahirscan/templates/column-statistics) than from templates.

## Results per category

### Categories that mine templates

| Category | Formats | Mining approach | Writing footprint |
|----------|---------|-----------------|-------------------|
| **Logs** | Plain, JSON logs, structured logs | Per-line token positions; static tokens literal, variable slots → placeholders | No |
| **Plain text** | `.txt`, generic text | Sentence n-grams / phrases; shape fallback if no exact match | Yes |
| **Markdown** | `.md` | Document structure (headers, lists, code blocks) + sentence shapes in paragraphs | Yes |
| **HTML** | `.html`, `.htm` | Visible body text → same as plain text | Yes |
| **JSON** | `.json` | Per-value patterns from key/value frequency across records | No |
| **EPUB** | `.epub` | Spine body text → plain-text pipeline (skipped if DRM/encrypted) | Yes when body parsed |

**Example patterns**

```text
# Log line
2025-01-15T10:00:01Z ERROR service [POS:4] connection reset

# Markdown structure
[HEADER:2]
[LIST:8]:type=unordered
[PARAGRAPH:32]:quotes=true

# JSON record (illustrative)
{"level":"INFO","service":"api","msg":"[WORD:2]"}

# Shape fallback (plain text / HTML / EPUB)
[SHAPE:14_words_period]
```

### Categories with metadata only (`templates: []`)

| Category | Formats | Primary JSON blocks |
|----------|---------|---------------------|
| **Delimited text** | CSV, TSV, tab, psv | `csv_metadata` + [column stats](/zahirscan/templates/column-statistics) |
| **Columnar binary** | Parquet, Arrow, Avro, ORC | `parquet_metadata`, `arrow_ipc_metadata`, … + `columns` |
| **Scientific arrays** | NumPy, HDF5, NetCDF, Zarr, `.tet`, MATLAB, MTX | Format-specific `*_metadata` — see [arrays & catalogs without `columns`](/zahirscan/templates/column-statistics#array-and-catalog-stats) |
| **Documents** | DOCX, XLSX, PPTX, PDF, EPUB (metadata path) | `docx_metadata`, `pdf_metadata`, … |
| **Settings** | INI, TOML, YAML, XML | Recursive schema stats, no line templates |
| **SQLite** | `.db`, … | `sqlite_metadata` with per-table column info |
| **Models** | ONNX, GGUF, TFLite, Safetensors | Graph/tensor summaries |
| **Archives / media / code** | ZIP, TAR, images, video, audio, source files | Entry lists, probes, `code_metadata` |

See [Metadata extraction](/zahirscan/metadata) for field-by-field descriptions.

## Output modes

| Mode | CLI | Templates | Writing footprint | Column / format metadata |
|------|-----|-----------|-------------------|--------------------------|
| **Templates-only** (default) | (none) | ✓ | Text-like only | When the format pipeline provides it |
| **Full** | `-f` | ✓ | ✓ | All `*_metadata` blocks + `compression`, timings, byte/line counts |

Use **full** for debugging; use **templates-only** for production, UBLX enhance, and sharing smaller JSON.

## Privacy

`-r` / `--redact` replaces filesystem paths with `***/filename.ext` in output JSON.

Related: [Writing footprint](/zahirscan/templates/writing-footprint), [Column statistics](/zahirscan/templates/column-statistics), [Metadata extraction](/zahirscan/metadata), [CLI](/zahirscan/cli).
