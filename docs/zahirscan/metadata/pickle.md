---
outline: deep
---

# Python pickle metadata

## `pickle_metadata`

Read-only opcode scan — **no unpickling**, no imports, no code execution. There is no `columns[]` array; see [column statistics](/zahirscan/metadata/column-statistics#array-and-catalog-stats).

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `protocol` | First `\x80` + protocol byte when present |
| `encoding` | `binary` or `text` (protocol 0/1 ASCII) |
| `protocols_seen` | Every `PROTO` opcode observed |
| `frame_count`, `frame_bytes_total` | Protocol 4+ `FRAME` opcodes |
| `referenced_globals` | Deduplicated `module.name` from `GLOBAL`, `INST`, `STACK_GLOBAL` |
| `builtin_types` | Subset under `builtins.*`, `__builtin__.*`, `collections.*` |
| `content_hint` | `tabular`, `ml_model`, `numeric_array`, or `builtin_containers` |
| `scan_truncated`, `scan_error` | Scan stopped early |

Related: [Supported formats — pickle](/zahirscan/formats), [Metadata overview](/zahirscan/metadata/).
