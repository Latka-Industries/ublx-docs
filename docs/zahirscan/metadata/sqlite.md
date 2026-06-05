---
outline: deep
---

# SQLite metadata

## `sqlite_metadata`

| Field | Meaning |
|-------|---------|
| `file_size`, `page_size`, `sqlite_version`, `encoding` | Database header |
| `table_count`, `total_rows` | Catalog summary |
| `tables` | Per-table metadata (below) |
| `error` | Open/parse failure |

## Per-table `TableInfo`

Each entry in `tables`:

| Field | Meaning |
|-------|---------|
| `name`, `row_count`, `column_count`, `table_size` | Table summary |
| `columns` | [`ColumnInfo`](/zahirscan/metadata/column-statistics#sqlite-columns) profiles |
| `primary_keys`, `foreign_keys`, `indexes` | Keys and indexes |

SQLite column profiles use verbose field names (`numeric_stats`, `null_percentage`, …) rather than the compact `ColumnStat` shape used by CSV and columnar formats. Typed stat object definitions: [Column statistics](/zahirscan/metadata/column-statistics).

Related: [Metadata overview](/zahirscan/metadata/), [Delimited text](/zahirscan/metadata/delimited).
