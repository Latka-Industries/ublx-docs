---
outline: deep
---

# Scientific array metadata

NumPy, hierarchical scientific formats, and matrix files return layout and catalog fields. Some also include [column statistics](/zahirscan/metadata/column-statistics) when data can be sampled as a 2-D table — see [when there are no columns](/zahirscan/metadata/column-statistics#array-and-catalog-stats).

## `npy_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `format_version`, `dtype`, `shape`, `fortran_order` | [`ArrayLayoutSummary`](/zahirscan/metadata/column-statistics#array-and-catalog-stats) |
| `header_region_bytes`, `data_offset`, `data_region_bytes`, `expected_data_bytes_from_dtype` | Payload bounds |
| `row_count`, `column_count`, `stats_rows_sampled`, `columns` | Optional when rank ≤ 2 and numeric dtype |
| `tensor3d` | Rank-3 plane min/max/mean/stdev (capped) |

## `npz_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | Archive size |
| `zip_entry_count` | ZIP member count |
| `npy_entries_scanned`, `npy_entries` | Per-member summaries (same fields as `npy_metadata` per entry) |

## `hdf5_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `superblock_version` | HDF5 superblock version |
| `root_member_count`, `root_dataset_count`, `root_attribute_count` | Root group summary |
| `groups_visited`, `datasets_visited` | Walk counters |
| `datasets` | `{ path, shape, datatype_class, inspect_error? }[]` |
| `walk_truncated`, `parse_error` | Caps or parse failures |

## `netcdf_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `netcdf4_model` | NetCDF-4 / HDF5-backed |
| `global_attributes` | `{ name, value }[]` |
| `dimension_count`, `dimensions_sample` | Dimension names and lengths |
| `variable_count`, `variables` | `{ name, shape, dimension_names, vartype, attributes? }[]` |
| `metadata_truncated`, `parse_error` | Caps or parse failures |

## `mtx_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `storage` | `sparse` or `dense` |
| `num_stored_values`, `symmetry` | Matrix Market header |
| `numeric_stats_include_implicit_zeros` | Sparse column stats include implicit zeros |
| `row_count`, `column_count`, `columns` | Logical matrix size and [column profiles](/zahirscan/metadata/column-statistics) |
| `parse_error` | Parse failure message |

## `mat_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `mat_format` | e.g. v7 classic; v7.3 HDF5 flagged |
| `variable_count`, `variables_scanned` | Variable catalog |
| `entries` | Per-variable `{ name, layout, global?, struct_subtree?, value? }` |
| `file_parse_error` | Top-level parse error |

Non-scalar entries may include a `global` block (whole-array stats) instead of per-column profiles.

## `zarr_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | Store size on disk |
| `root_group_metadata` | Root group Zarr version (`2` / `3`) |
| `array_entries_scanned`, `array_entries` | Per-array `{ name, layout, common?, tensor3d?, num_chunks? }` |

## `tetration_metadata` (`.tet`)

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `layout_version`, `dataset_count` | Container header |
| `chunk_count`, `raw_chunk_count`, `zstd_chunk_count`, `history_event_count` | Chunk index summary |
| `datasets` | `{ name, dtype, shape, chunk_shape, layout, common?, tensor3d?, query_error? }[]` |
| `datasets_stats_skipped`, `parse_error` | Query/stat caps or parse errors |

See [tetration-docs](https://github.com/Latka-Industries/tetration-docs) for the `.tet` on-disk layout.

Related: [Column statistics](/zahirscan/metadata/column-statistics), [Metadata overview](/zahirscan/metadata/).
