# Getting started

UBLX turns a directory into a flat, browsable catalog in the terminal. Indexing is powered by [Nefaxer](/nefaxer/); deep metadata comes from [ZahirScan](/zahirscan/) when you enhance.

::: warning Development status
UBLX is in active development — expect breaking changes. See the [UBLX repo](https://github.com/Latka-Industries/UBLX) for the latest.
:::

## Prerequisites

- A terminal with **truecolor** (24-bit) and image support
- A [**Nerd Font**](https://github.com/ryanoasis/nerd-fonts) is strongly recommended

**Optional tools** (improve previews):

| Tool | Role |
|------|------|
| `tree` | Directory preview in the Viewer |
| `pdftoppm` or `mutool` | PDF page raster preview |
| `ffmpeg` | Video frame preview |
| `netcdf` / `libnetcdf` | Linked by default; build without: `cargo build --no-default-features` |

## Install UBLX

### Homebrew

```bash
brew tap Latka-Industries/ublx https://github.com/Latka-Industries/UBLX
brew install Latka-Industries/ublx/ublx
```

### Cargo

```bash
cargo install ublx
```

Or build from source:

```bash
git clone https://github.com/Latka-Industries/UBLX.git
cd UBLX
cargo install --path .
```

## First run

Open the TUI on a project directory:

```bash
ublx /path/to/your/project
```

UBLX indexes the tree, stores a per-root SQLite snapshot under your user cache (`ubli/`), and opens the catalog. By default you get **path + filetype** only — fast and lightweight. Run **Enhance with ZahirScan** (or enable full enhance in config) when you need rich previews and metadata.

### Headless snapshot

Index without the TUI — useful for CI or warming a catalog:

```bash
ublx --snapshot-only /path/to/your/project
```

If the directory has no local config yet, UBLX writes one. Pair with full metadata:

```bash
ublx --full-snapshot /path/to/your/project
# same as: ublx --snapshot-only --enhance-all /path/to/your/project
```

### Headless export

Write flat Zahir JSON files to `ublx-export/`:

```bash
ublx --snapshot-only --export /path/to/your/project
```

For the most complete export, use `--full-snapshot` (or tune `[[enhance_policy]]` in config). See [Guides: Headless snapshot + export](/guides/headless-snapshot-export).

## What you get on day one

| Step | Result |
|------|--------|
| First `ublx <dir>` | Snapshot + TUI on **Snapshot** tab |
| Default config | Path catalog only (`enable_enhance_all = false`) |
| Optional enhance | Per-file or batch via ZahirScan |
| Later runs | Fast **Delta** tab vs previous snapshot |

## Next steps

- [Configuration](/configuration) — `enable_enhance_all`, `[[enhance_policy]]`, themes, cache paths
- [TUI & modes](/tui) — Snapshot, Lenses, Delta, panes, keybindings
- [ZahirScan](/zahirscan/) — metadata extraction and export
- [Nefaxer](/nefaxer/) — install, CLI, architecture, UBLX integration
- [Guides](/guides/) — path-only vs full enhance, policies, large trees
