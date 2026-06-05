---
outline: deep
---

# Model metadata

ONNX, GGUF, TFLite, and Safetensors parsers return **graph and tensor inventories** — not [column statistics](/zahirscan/metadata/column-statistics). No graph execution or weight loading.

## `onnx_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `proto_parse_error`, `ir_version`, `producer_name`, `producer_version`, `domain`, `model_version`, `model_doc_string` | Wire header |
| `opset_import` | `{ domain, version }[]` |
| `model_metadata_props` | Key/value model metadata (capped) |
| `training_info_count`, `functions_count` | Training info and function defs |
| `graph_name`, `raw_node_count`, `graph_node_count` | Graph size (wire vs IR) |
| `initializer_count`, `sparse_initializer_count`, `external_initializer_count` | Weights |
| `graph_input_count`, `graph_output_count`, `graph_inputs`, `graph_outputs` | I/O with type summaries |
| `value_info_count`, `op_type_counts` | Intermediate values and op histogram |
| `parse_ok`, `parse_error` | IR conversion status and errors |

## `gguf_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `parse_ok`, `parse_error` | Decode status |
| `version`, `model_family`, `gguf_file_type`, `model_parameters` | Header summary |
| `num_kv`, `num_tensor` | Counts |
| `kv` | Capped metadata key/value JSON |
| `tensor_summaries` | `{ name, shape, dtype, … }[]` (weights not loaded) |

## `tflite_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `parse_ok`, `parse_error` | FlatBuffer parse status |
| `schema_version`, `description` | Model header |
| `operator_code_count`, `subgraph_count`, `buffer_count`, `model_metadata_count` | Inventory |
| `subgraphs` | Per-subgraph `{ index, name?, tensor_count, operator_count, input_tensor_indices, output_tensor_indices }` (capped) |
| `op_type_counts` | Builtin operator histogram across all subgraphs |

## `safetensors_metadata`

| Field | Meaning |
|-------|---------|
| `byte_count` | File size |
| `parse_ok`, `parse_error` | Header parse status |
| `header_metadata` | Optional `__metadata__` JSON |
| `tensor_count`, `tensors` | `{ name, dtype, shape, data_bytes }[]` (capped) |
| `dtype_counts` | Dtype histogram |

Related: [Metadata overview](/zahirscan/metadata/), [Supported formats](/zahirscan/formats).
