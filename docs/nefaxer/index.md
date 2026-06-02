# Nefaxer

[Nefaxer](https://github.com/Latka-Industries/nefaxer) is a high-performance Rust tool for **directory indexing** and **change detection**. It walks trees in parallel, optionally hashes file contents (Blake3), and stores metadata in a fast SQLite index. Compare a new walk against a previous snapshot to detect additions, deletions, and modifications.

UBLX uses Nefaxer for snapshots, the **Delta** tab, and duplicate detection. You can also run the CLI or library standalone.

## What it does

| Capability | Summary |
|------------|---------|
| **Parallel indexing** | Streaming walk → metadata workers → batched SQLite writes |
| **Drive-adaptive** | SSD / HDD / network detection tunes threads and walk strategy |
| **Diffing** | Added / removed / modified paths vs prior index |
| **Optional hashing** | Blake3 for content-accurate change detection |

## Explore

| Page | Contents |
|------|----------|
| [Install](/nefaxer/install) | `cargo install`, library, releases |
| [CLI](/nefaxer/cli) | Index, dry-run, flags |
| [Architecture](/nefaxer/architecture) | Pipeline, WAL, drive tuning |
| [Configuration](/nefaxer/configuration) | `.nefaxer.toml` defaults |
| [Database schema](/nefaxer/database) | `.nefaxer` SQLite layout |
| [Library](/nefaxer/library) | `nefax_dir`, types, examples → [docs.rs](https://docs.rs/nefaxer) |
| [UBLX integration](/nefaxer/ublx) | Snapshots, cache, Delta mode |

## Quick start

```bash
cargo install nefaxer
nefaxer /path/to/project
```

Dry-run diff without updating the index:

```bash
nefaxer --dry-run -l /path/to/project
```

See [CLI](/nefaxer/cli) for hashing, excludes, and encryption options.
