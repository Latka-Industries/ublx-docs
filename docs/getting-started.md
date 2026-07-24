# Install

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
| `resvg` | SVG raster preview (same backend as Yazi) |
| `netcdf` / `libnetcdf` | Linked by default; build without: `cargo build --no-default-features` |

## Install UBLX

### Homebrew

```bash
brew tap Latka-Industries/ublx https://github.com/Latka-Industries/UBLX
brew install Latka-Industries/ublx/ublx
```

Homebrew builds with the embedded serve UI (`--features ui`) — TUI-shaped browser at `ublx serve --open`.

### Cargo

```bash
cargo install ublx                  # API-only serve (v0.2+)
cargo install ublx --features ui    # + embedded Leptos SPA (assets in the crate; v0.2.1+)
```

Default crates.io install stays **API-only** (`GET /` has no SPA). Homebrew and `--features ui` both ship the browser UI.

Or build from source:

```bash
git clone https://github.com/Latka-Industries/UBLX.git
cd UBLX
./crates/ublx-web/build.sh          # WASM + Tailwind → assets/web-ui/
cargo install --path . --features ui
```

## First run

Open the TUI on a project directory:

```bash
ublx /path/to/your/project
```

UBLX indexes the tree, stores a per-root SQLite snapshot under your user cache (`ubli/`), and opens the catalog. By default you get **path + filetype** only — fast and lightweight. Run **Enhance with ZahirScan** (or enable full enhance in config) when you need rich previews and metadata.

Headless index/export (`--snapshot-only`, `--full-snapshot`, `--export`) and catalog tools (`ublx query`, `ublx doctor`, `ublx serve`, optional `--url` / `UBLX_URL`): [CLI](/cli).

## What you get on day one

| Step | Result |
|------|--------|
| First `ublx <dir>` | Snapshot + TUI on **Snapshot** tab |
| Default config | Path catalog only (`enable_enhance_all = false`) |
| Optional enhance | Per-file or batch via ZahirScan |
| Later runs | Fast **Delta** tab vs previous snapshot |

## Next steps

- [CLI](/cli) — `ublx --help`, headless flags, `query` / `doctor` / `serve`, remote `--url`
- [Configuration](/configuration) — `enable_enhance_all`, `[[enhance_policy]]`, themes, cache paths
- [TUI & modes](/tui/) — Snapshot, Lenses, Delta, panes, keybindings
- [ZahirScan](/zahirscan/) — metadata extraction and export
- [Nefaxer](/nefaxer/) — install, CLI, architecture, UBLX integration
- [Guides](/guides/) — snapshot & browse, previews, change & duplicates, project trees
