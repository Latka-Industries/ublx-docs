# Architecture

ZahirScan runs a **two-phase** pipeline with parallel Rayon workers, memory-mapped reads, and bounded resource use on large path lists.

## Phase 1

- Format detection and content-type classification
- Per-path stats (lines, bytes, tokens)
- **One mmap open per path**
- Parallel over all paths in the current batch

## Phase 2

- Per-format metadata extraction
- Template mining and writing footprint (exact-pattern, then shape fallback for text/markdown)
- Single Rayon pool; chunk sizes and `with_min_len` batching derived from Phase 1 statistics

## Path batching

When the input path count exceeds the batch size (from the process **fd limit**), ZahirScan:

1. Runs Phase 1 + Phase 2 on a chunk of paths
2. Drops the chunk and its mmaps
3. Continues with the next chunk

This keeps open file descriptors bounded on huge trees.

## Adaptive parallelization

- **Phase 2 chunking** — chunk count and size follow Phase 1 stats (file count, mean bytes, variance), aligned to `max_workers`
- **Phase 2 batching** — when task count exceeds `workers × threshold_multiplier`, Rayon uses `with_min_len(batch_size)` to avoid pool saturation; otherwise full parallelism
- **`max_workers = 0`** — sensible default (e.g. `num_cpus - 1`)

Tunable fields live in `zahirscan.toml` — see [Configuration](/zahirscan/configuration).

## Output sinks (library)

| Sink | Behavior |
|------|----------|
| `OutputSink::Collect` | Default; all results in `ZahirScanResult.outputs` |
| `OutputSink::StreamOnly` | Callback per file; no collection — bounded memory |
| `OutputSink::Channel` | Send each result on a channel |

Compatible with batched scans and `extract_zahir_from_stream` for paths arriving on a channel. Details: [Library](/zahirscan/library).

## Security

Read-only and non-invasive: path sanitization, existence checks, no modification of source files.
