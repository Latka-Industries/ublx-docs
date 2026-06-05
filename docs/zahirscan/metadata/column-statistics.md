---
outline: deep
---

# Column statistics

**Column statistics** describe **tabular and database columns** from sampled rows. They appear inside format-specific `*_metadata` blocks — not in the [templates](/zahirscan/templates) array.

Delimited files and columnar binaries use a compact shared shape; SQLite uses a richer per-column struct. Array and catalog formats may omit `columns[]` entirely — see [arrays without columns](#array-and-catalog-stats).

## Compact `columns` array (`ColumnStat`)

Used by CSV/TSV/tab/psv and columnar formats (Parquet, Arrow IPC, Avro, ORC) via flattened `ColumnarCommonFields`:

```json
{
  "row_count": 50000,
  "column_count": 12,
  "stats_rows_sampled": 2000,
  "columns": [
    {
      "i": 0,
      "name": "user_id",
      "t": "number",
      "pt": "Int64",
      "null_pct": 0.0,
      "num": {
        "min": 1,
        "max": 98421,
        "mean": 44102.5,
        "median": 43800,
        "range": 98420,
        "iqr": 22000,
        "stdev": 28104.2
      }
    },
    {
      "i": 3,
      "name": "status",
      "t": "string",
      "null_pct": 1.2,
      "uniq": 4
    },
    {
      "i": 7,
      "name": "created_at",
      "t": "date",
      "date": {
        "span_days": 412.5,
        "span_minutes": 594000,
        "min": "2024-01-02T00:00:00Z",
        "max": "2025-02-18T23:59:59Z"
      }
    },
    {
      "i": 9,
      "name": "active",
      "t": "boolean",
      "bool": { "true_pct": 73.4 }
    }
  ]
}
```

| `ColumnStat` field | Meaning |
|--------------------|---------|
| `i` | Column index |
| `name` | Column name when known |
| `t` | Inferred logical type: `number`, `string`, `date`, `boolean`, … |
| `pt` | Physical / schema dtype when available (e.g. Arrow `Int32`, Parquet type) |
| `null_pct` | Null rate in the **sample** (omitted if not computed) |
| `uniq` | Distinct non-null string values (string columns only) |
| `num` | [Numeric stats](#numeric-stats) |
| `bool` | [Boolean stats](#boolean-stats) (`true_pct` in JSON) |
| `date` | [Date stats](#date-stats) |

### Table-level fields

| Field | Meaning |
|-------|---------|
| `row_count` | Total rows when known |
| `column_count` | Number of columns |
| `stats_rows_sampled` | Rows used for stats (sample may be smaller than `row_count`) |
| `encoding` | Text encoding when relevant |

**CSV-specific** fields on `csv_metadata`: `delimiter`, `quote_character`, `escape_character`, `has_header`. See [Delimited text](/zahirscan/metadata/delimited).

Sampling scales with file size, table width, and **bytes-per-row** when row count is known early — wide tables cap how many columns or rows are fully profiled.

## Typed stat objects

### Numeric stats {#numeric-stats}

`min`, `max`, `mean`, `median`, `range`, `iqr`, `stdev` — used for numeric CSV/columnar columns and SQLite INTEGER/REAL.

### Date stats {#date-stats}

`span_days`, `span_minutes`, `min`, `max` (ISO-style strings) — parsed date columns in CSV or TEXT SQLite columns.

### Boolean stats {#boolean-stats}

`true_pct` (alias `true_percentage`) — share of true-like values (`true`, `yes`, `1`, `y`, …).

### Text stats (SQLite)

`min_length`, `max_length`, `avg_length` — for TEXT columns.

### Blob stats (SQLite)

`min_size`, `max_size`, `avg_size` (bytes) — for BLOB columns.

## SQLite columns {#sqlite-columns}

`sqlite_metadata` adds schema-oriented data: tables, primary/foreign keys, indexes, row counts. Each column is a **`ColumnInfo`** object (verbose names, not the compact `i`/`t` form). Full database fields: [SQLite](/zahirscan/metadata/sqlite).

| Field | Meaning |
|-------|---------|
| `name`, `type_name` | Column name and declared SQLite type |
| `not_null`, `default_value` | Constraints |
| `is_primary_key`, `is_foreign_key` | Key roles |
| `null_percentage`, `unique_count` | Sampled null % and distinct count |
| `numeric_stats`, `date_stats`, `boolean_stats`, `text_stats`, `blob_stats` | Typed stats (boolean vs numeric are mutually exclusive) |

## Shapes and dtypes instead of `columns` {#array-and-catalog-stats}

Not every numeric file is a **named table**. CSV and columnar binaries have schema columns you can profile row-by-row. Array containers, hierarchical stores, and model files instead expose **layout** (shape, dtype, paths) and sometimes **global** or **per-axis** stats — not a `columns` array.

### When you get `columns` vs when you do not

| Pattern | Formats | JSON shape |
|---------|---------|------------|
| **Named columns, row sampling** | CSV/TSV/tab/psv; Parquet, Arrow IPC, Avro, ORC | Flattened `ColumnarCommonFields`: `row_count`, `column_count`, `stats_rows_sampled`, `columns[]` |
| **Matrix with logical columns** | Matrix Market (`.mtx`) | Same `columns[]`, plus `storage`, `symmetry`, `numeric_stats_include_implicit_zeros` on `mtx_metadata` |
| **2-D arrays treated as tables** | NumPy (`.npy`/`.npz` members), Zarr arrays, Tetration datasets (rank ≤ 2, numeric dtype) | `layout.shape` + dtype **and** optional `columns[]` from flattened `common` (same `ColumnStat` objects, names often omitted) |
| **Layout + catalog only** | HDF5, NetCDF, Zarr store (directory), MATLAB `.mat` (multi-variable) | Per-dataset or per-variable entries with `shape`, dtype/class, paths — no row-wise column profiles |
| **Global array stats** | MATLAB entries (non-scalar arrays) | `global` on each `MatArrayEntrySummary`: one `num` / `date` / `bool` block for the whole array, not per column |
| **Tensor / graph inventory** | ONNX, GGUF, TFLite, Safetensors | Tensor or operator summaries — names, dtypes, shapes, counts |
| **Pickle** | `.pickle`, `.pkl` | `pickle_metadata`: import references and `content_hint`, not column stats |

Rank **> 2** NumPy/Zarr/Tetration arrays keep **`layout.shape`** only; ZahirScan does not flatten them into a `columns` list. Object, structured, and char dtypes skip column profiling.

### `ArrayLayoutSummary` (shared layout block)

Used inside `npy_metadata`, `npz` member entries, Zarr array entries, Tetration dataset summaries, and MATLAB array entries. Format field tables: [Scientific arrays](/zahirscan/metadata/scientific-arrays).

| Field | Meaning |
|-------|---------|
| `format_version` | Container version when known (NumPy header version, MAT level, …) |
| `dtype` | Element type (`descr` string, MATLAB class, HDF5 label, …) |
| `shape` | Dimension lengths — **authoritative size** when `row_count` / `column_count` are omitted on flattened `common` |
| `fortran_order` | Column-major layout when applicable |
| `header_region_bytes`, `data_offset`, `data_region_bytes` | Where payload bytes live in the file or member |
| `expected_data_bytes_from_dtype` | `itemsize × num_elements` when inferable |

For rank 0–2, parsers may derive table dims from `shape` for sampling; higher rank uses `prod(shape)` as a flat element count.

## UBLX display

UBLX renders compact `columns` JSON as typed tables in the **Metadata** pane (and **Writing** when column stats are present). Config key **`typed_column_tables`**: `none` | `abbrev` (default, caps wide tables at 20 rows) | `full`.

Related: [Metadata overview](/zahirscan/metadata/), [Template mining](/zahirscan/templates).
