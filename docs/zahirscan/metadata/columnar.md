---
outline: deep
---

# Columnar binary metadata

Parquet, Arrow IPC / Feather, Avro, and ORC share flattened [column statistics](/zahirscan/metadata/column-statistics) via `ColumnarCommonFields`.

## Shared fields

Present on **`parquet_metadata`**, **`arrow_ipc_metadata`**, **`avro_metadata`**, and **`orc_metadata`**:

| Field | Meaning |
|-------|---------|
| `row_count`, `column_count`, `stats_rows_sampled`, `columns` | See [Column statistics](/zahirscan/metadata/column-statistics) |
| `encoding` | Text encoding when relevant |

## Format-specific extras

| Block | Extra fields |
|-------|----------------|
| `parquet_metadata` | `num_row_groups` |
| `arrow_ipc_metadata` | `container_kind` — `ipc_file`, `ipc_stream`, or `feather` |
| `avro_metadata` | `schema_canonical` |
| `orc_metadata` | `num_stripes` |

Related: [Delimited text](/zahirscan/metadata/delimited), [Scientific arrays](/zahirscan/metadata/scientific-arrays), [Metadata overview](/zahirscan/metadata/).
