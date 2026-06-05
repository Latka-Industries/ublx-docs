---
outline: deep
---

# Code metadata

## `code_metadata`

Source and script files detected as **Code** (extension + optional shebang via Linguist):

| Field | Meaning |
|-------|---------|
| `script_type` | Linguist language |
| `byte_count`, `line_count` | Size |
| `bom` | Byte order mark when present |
| `line_ending` | `lf`, `crlf`, `cr`, or `mixed` |
| `trailing_newline`, `max_line_length`, `blank_line_count` | Line shape |
| `indentation` | `spaces`, `tabs`, or `mixed` on first non-blank lines |

Related: [Metadata overview](/zahirscan/metadata/), [Supported formats](/zahirscan/formats).
