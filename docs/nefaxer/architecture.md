# Architecture

Nefaxer is built as a **streaming pipeline** so large trees never buffer entirely in memory.

## Pipeline

```
Walk thread → bounded channel → metadata workers → main thread (hash?) → SQLite batches
```

| Stage | Role |
|-------|------|
| **Walk** | Enumerate paths; serial (`walkdir`) when disk-bound, parallel (`jwalk`) otherwise |
| **Metadata workers** | Turn paths into entries (mtime, size, optional hash slot) |
| **Receiver** | Optional Blake3 when `--check-hash`; batch writes to SQLite |
| **SQLite** | WAL mode, batch inserts, optional in-memory index for small dirs (&lt;10K files), writer pool |

Walk, metadata, and write run **concurrently** — no full-tree buffering.

## Drive-adaptive tuning

Nefaxer detects **SSD**, **HDD**, or **network** storage and adjusts:

- Worker thread count
- Writer pool size
- Parallel vs serial walk

Use `tuning_for_path` in the library to reuse the same decisions without re-probing. See [Library](/nefaxer/library).

## Reliability modes

| Mode | Flag | Behavior |
|------|------|----------|
| **Default** | | Skip inaccessible paths, continue indexing |
| **Strict** | `--strict` | Fail on first permission / access error |
| **Paranoid** | `--paranoid` (with `-c`) | Re-hash when hash matches but mtime/size differ (collision check) |

## Resource limits

On Unix, worker threads are capped by **`ulimit -n`** so open files stay under the process fd limit and avoid `EMFILE`.

## Index storage

Default on-disk index: `.nefaxer` (SQLite WAL). Schema: [Database](/nefaxer/database). Optional **SQLCipher** encryption via `--encrypt`.
