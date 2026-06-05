---
outline: deep
---

# Settings & XML metadata

Configuration and structured markup files return schema trees — not [column statistics](/zahirscan/metadata/column-statistics).

## `toml_metadata`

| Field | Meaning |
|-------|---------|
| `file_size` | File size |
| `section_count`, `key_count`, `max_depth` | Structure counts |
| `schema` | Recursive table → field types |

## `yaml_metadata`

| Field | Meaning |
|-------|---------|
| `file_size` | File size |
| `key_count`, `max_depth` | Structure |
| `scalar_count`, `sequence_count`, `map_count` | YAML node kinds |
| `schema` | Root mapping / sequence / scalar types |

## `ini_metadata`

| Field | Meaning |
|-------|---------|
| `file_size` | File size |
| `section_count`, `key_count`, `comment_count`, `max_depth` | Structure |
| `schema` | Section → key → inferred scalar type |

## `xml_metadata`

| Field | Meaning |
|-------|---------|
| `file_size` | File size |
| `element_count`, `attribute_count`, `max_depth` | Structure |
| `has_namespaces` | `xmlns` present |
| `schema` | Root element tree with attributes and children |

Related: [Metadata overview](/zahirscan/metadata/).
