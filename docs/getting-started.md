# Install

UBLX turns a directory into a flat, browsable catalog in the terminal. Indexing is powered by [Nefaxer](/nefaxer/); deep metadata comes from [ZahirScan](/zahirscan/) when you enhance. Headless `query` / `doctor` ship by default; optional `serve` exposes an HTTP API, and `ui` embeds a browser SPA.

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
cargo install ublx                     # TUI + query/doctor (default)
cargo install ublx --features serve    # + `ublx serve` HTTP API
cargo install ublx --features ui       # + serve + embedded Leptos SPA
cargo install ublx --no-default-features --features serve   # serve/query without TUI
```

Default crates.io install is **TUI + catalog CLI**. `serve` / `ui` are opt-in; `ui` implies `serve`. Catalog path resolve, SQLite ops, and headless open/read live in the internal `ublx-catalog` workspace crate — one published `ublx` binary.

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

Headless index/export (`--snapshot-only`, `--full-snapshot`, `--export`) and catalog tools (`ublx query`, `ublx doctor`, optional `ublx serve` / `--url` / `UBLX_URL`): [CLI](/cli).

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
