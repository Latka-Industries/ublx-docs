# FAQ

Quick answers about UBLX, Nefaxer, and ZahirScan. For workflows and flags, see the [Guides overview](/guides/) and linked pages below.

## What is UBLX?

UBLX is a **terminal catalog** for a project directory: index once, browse paths in a flat TUI, enrich files on demand, and export or diff snapshots. It is built on [Nefaxer](/nefaxer/) for indexing and [ZahirScan](/zahirscan/) for deep metadata when you enhance.

## How do the three projects fit together?

| Tool | Role |
|------|------|
| **Nefaxer** | Parallel directory walk → SQLite snapshot, change detection, optional content hashes |
| **ZahirScan** | Template mining and per-format metadata when you batch- or on-demand enhance |
| **UBLX** | TUI, lenses, Delta tab, config, headless `--snapshot-only` / `--export`, per-root cache |

See [Getting started](/getting-started), [Nefaxer UBLX integration](/nefaxer/ublx), and [ZahirScan UBLX integration](/zahirscan/ublx).

## Why is my catalog “path-only”?

By default UBLX only stores **paths and filetype hints** on snapshot — fast for large trees. Rich previews and Metadata / Writing tabs need **ZahirScan** output.

- Turn on full enhance globally: `enable_enhance_all = true` or `ublx --full-snapshot`
- Scope enhance per folder: `[[enhance_policy]]` with `policy = "auto"` or `"manual"`
- Enhance one file in the TUI: **Enhance with ZahirScan** (quick actions)

Details: [Path-only vs full enhance](/guides/path-only-vs-full-enhance), [Enhance policies](/guides/enhance-policies), [Configuration](/configuration).

## Where is the index stored?

UBLX keeps a **per-root SQLite catalog** under your user cache (`ubli/`, keyed by sanitized path + hash). Local project behavior lives in `.ublx.toml` or `ublx.toml` in the indexed directory. Nefaxer can also use a standalone `.nefaxer` index in-tree when you run the CLI directly.

## Is UBLX a file manager?

No. It is aimed at **project trees**: snapshot browse, lenses, Delta diffs, duplicate detection, and headless export — not drag-and-drop or bulk rename across the OS.

## How do I run UBLX without the TUI?

```bash
ublx --snapshot-only /path/to/project
ublx --full-snapshot --export /path/to/project
```

See [Headless snapshot + export](/guides/headless-snapshot-export).

## Where is the Rust API documentation?

Each product menu in the top nav ends with **API reference** → [docs.rs](https://docs.rs) for `ublx`, `nefaxer`, and `zahirscan`. User guides on this site expand the GitHub READMEs.

## Do I need ZahirScan or Nefaxer installed separately?

UBLX bundles the stack for normal use. You may install **nefaxer** or **zahirscan** on their own for CLI-only indexing or batch extraction outside the TUI — see [Nefaxer install](/nefaxer/install) and [ZahirScan install](/zahirscan/install).

## What terminal do I need?

Truecolor (24-bit) and image support are expected; a [**Nerd Font**](https://github.com/ryanoasis/nerd-fonts) is strongly recommended. Optional helpers (`tree`, `pdftoppm` / `mutool`, `ffmpeg`, etc.) improve previews — listed in [Getting started](/getting-started#prerequisites).

## Is UBLX stable?

UBLX is in **active development** — expect breaking changes. Watch the [UBLX repo](https://github.com/Latka-Industries/UBLX) for releases.

## Something broke — where do I look?

1. [CLI](/cli) and [Configuration](/configuration)
2. Snapshot vs enhance: [Path-only vs full enhance](/guides/path-only-vs-full-enhance)
3. Keys and panes: [TUI overview](/tui/) and [Command mode & menus](/guides/command-mode-and-menus)
4. Open an issue on the relevant GitHub repo (UBLX, Nefaxer, or ZahirScan)
