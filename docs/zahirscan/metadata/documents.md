---
outline: deep
---

# Document metadata

Office documents, PDFs, and EPUBs return bibliographic and structural fields. None use [column statistics](/zahirscan/metadata/column-statistics).

## `docx_metadata` / `xlsx_metadata`

DOCX and XLSX share `DocumentMetadata` (serialized as `docx_metadata` for both):

| Field | Meaning |
|-------|---------|
| `page_count` | Pages (DOCX when available) |
| `word_count`, `character_count`, `character_count_no_spaces`, `paragraph_count` | Text counts |
| `sheet_count`, `sheet_stats` | XLSX: sheet count and per-sheet `{rows, columns}` |
| `title`, `author`, `subject`, `description` | Core properties |
| `creation_date`, `modified_date`, `last_modified_by`, `revision` | Dates and revision |
| `file_size` | Document size in bytes |

## `pptx_metadata`

| Field | Meaning |
|-------|---------|
| `slide_count` | Number of slides |
| `title`, `author` | Core properties |
| `creation_date`, `modification_date` | ISO 8601 dates |
| `file_size` | File size in bytes |

## `pdf_metadata`

| Field | Meaning |
|-------|---------|
| `page_count`, `pdf_version` | Structure |
| `is_encrypted` | Encryption flag |
| `title`, `author`, `subject`, `creator`, `producer` | Info dictionary |
| `creation_date`, `modification_date` | Document dates |
| `file_size` | File size in bytes |

## `epub_metadata`

| Field | Meaning |
|-------|---------|
| `title`, `author`, `language`, `identifier` | Dublin Core-style fields |
| `chapter_count` | Spine item count |
| `file_size` | File size in bytes |

DRM-protected EPUBs (`encryption.xml`) skip body parsing; metadata may be partial. Body text may also feed [writing footprint](/zahirscan/writing-footprint) when mined.

Related: [Metadata overview](/zahirscan/metadata/).
