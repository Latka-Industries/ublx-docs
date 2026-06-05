---
outline: deep
---

# Delimited text metadata

CSV, TSV, tab-separated, and PSV files all serialize as **`csv_metadata`** (delimiter differs by extension).

## `csv_metadata`

Flattened [column statistics](/zahirscan/metadata/column-statistics) (`ColumnarCommonFields`) plus dialect fields:

| Field | Meaning |
|-------|---------|
| `row_count`, `column_count`, `stats_rows_sampled`, `columns` | Table stats and compact `ColumnStat` profiles |
| `delimiter`, `quote_character`, `escape_character` | Detected CSV dialect |
| `has_header` | Header row present |
| `encoding` | Text encoding when detected |

The `columns[]` array uses compact keys (`i`, `t`, `num`, …). See [Column statistics](/zahirscan/metadata/column-statistics) for field definitions and typed stat objects.

Related: [Columnar binary](/zahirscan/metadata/columnar), [Metadata overview](/zahirscan/metadata/).
