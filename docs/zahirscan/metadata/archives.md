---
outline: deep
---

# Archive metadata

## `zip_metadata`

| Field | Meaning |
|-------|---------|
| `file_size`, `file_count` | Archive size and entry count |
| `entries` | `{ path, uncompressed_size, compressed_size, detected_type, modified, compression_method }[]` |
| `total_uncompressed`, `total_compressed` | Summed sizes |
| `entry_type_counts` | Counts by detected `FileType` |
| `comment` | ZIP archive comment |

OS junk paths (`__MACOSX`, `.DS_Store`, `Thumbs.db`, …) are filtered from listings.

## `archive_metadata`

TAR and compressed TAR variants (`tar`, `tar.gz`, `tgz`, `tar.bz2`, `tar.xz`):

| Field | Meaning |
|-------|---------|
| `format` | Archive variant |
| `file_count`, `entries` | `{ path, size }[]` |
| `compressed_size`, `uncompressed_size` | On-disk vs summed entry sizes |
| `truncated`, `note` | Listing limits; compressed TAR may omit full entry list |

Related: [Metadata overview](/zahirscan/metadata/), [Supported formats](/zahirscan/formats).
