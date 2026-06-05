---
outline: deep
---

# Logs & JSON metadata

Log and JSON files use structure heuristics — not [column statistics](/zahirscan/metadata/column-statistics). Logs may still produce [templates](/zahirscan/templates) from line patterns.

## `log_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count`, `line_count` | Size |
| `line_ending` | `lf`, `crlf`, or `cr` |
| `max_line_length`, `blank_line_count` | Line shape |
| `has_timestamps` | Heuristic: ISO8601 or Unix epoch on early lines |

## `json_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count`, `line_count` | Size |
| `line_ending`, `max_line_length`, `blank_line_count` | Line shape |
| `root_type` | `array` or `object` |
| `root_array_length`, `root_object_key_count` | Top-level size |
| `max_depth` | Nesting depth |
| `pretty_printed` | Heuristic from newlines after `{`, `[`, `,` |

Related: [Metadata overview](/zahirscan/metadata/), [Template mining](/zahirscan/templates).
