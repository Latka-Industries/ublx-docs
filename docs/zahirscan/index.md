# ZahirScan

[ZahirScan](https://github.com/Latka-Industries/zahirscan) is a high-performance Rust tool for **template-based content compression** and **metadata extraction** across logs, documents, tabular data, media, archives, models, and more.

UBLX uses ZahirScan for deep previews, Templates / Metadata / Writing panes, and flat JSON export. You can also run it standalone.

## What it does

| Capability | Summary |
|------------|---------|
| **Template mining** | Repeated patterns in logs and text → templates with placeholders |
| **Metadata** | Per-format stats — media codecs, document properties, tabular schemas, SQLite schema, etc. |
| **Size reduction** | Output JSON is typically **80–95% smaller** than raw while preserving structure |
| **Performance** | Memory-mapped I/O, adaptive Rayon batching, fd-limit path batching |

## Explore

Use the sidebar to jump between topics:

| Page | Contents |
|------|----------|
| [Install](/zahirscan/install) | `cargo install`, optional features, system deps |
| [CLI](/zahirscan/cli) | Flags, output modes, `init` |
| [Supported formats](/zahirscan/formats) | Full format list by category |
| [Metadata extraction](/zahirscan/metadata/) | Per-format `*_metadata` blocks and [column statistics](/zahirscan/metadata/column-statistics) |
| [Template mining](/zahirscan/templates) | Repeated patterns, compression, placeholders |
| [Writing footprint](/zahirscan/writing-footprint) | Prose style metrics for text-like files |
| [Architecture](/zahirscan/architecture) | Phase 1 / Phase 2, batching, streaming sinks |
| [Configuration](/zahirscan/configuration) | `zahirscan.toml`, filters, adaptive batching |
| [Library](/zahirscan/library) | Rust API overview → [docs.rs](https://docs.rs/zahirscan) |
| [UBLX integration](/zahirscan/ublx) | Batch vs on-demand enhance in the catalog stack |

## Quick start

```bash
cargo install zahirscan
zahirscan -i /path/to/file.log -o ./out
```

Templates-only (default) vs full metadata: see [CLI](/zahirscan/cli).

::: tip Tetration `.tet` files
Tensor store layout and the `.tet` format are documented on [tetration-docs](https://github.com/Latka-Industries/tetration-docs). ZahirScan extracts catalog, dataset, and column stats from `.tet` files for UBLX and standalone runs.
:::
