# ZahirScan

[ZahirScan](https://github.com/Latka-Industries/zahirscan) extracts metadata and mines templates from files — logs, media, documents, tabular formats, and more. UBLX uses it for deep previews, writing stats, and export.

## Install

```bash
cargo install zahirscan
```

## Standalone usage

```bash
zahirscan /path/to/file-or-dir
```

## With UBLX

- Batch: set `enable_enhance_all = true` or an `[[enhance_policy]]` with `mode = "auto"`
- On demand: **Enhance with ZahirScan** from the TUI quick actions menu

## API

Rust crate docs: [docs.rs/zahirscan](https://docs.rs/zahirscan)

::: info
Format support includes Parquet, Arrow, media files, PDFs, and [Tetration `.tet` files](https://github.com/Latka-Industries/tetration-docs) — documented on the Tetration site.
:::
