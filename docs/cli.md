# CLI

```bash
ublx --help
```

```
UBLX is a TUI to index once, enrich with metadata, and browse a flat snapshot in a 3-pane layout with multiple modes.

Usage: ublx [OPTIONS] [DIR]

Arguments:
  [DIR]  Directory to index [default: .]

Options:
  -s, --snapshot-only  Headless snapshot. Writes a local config file when this dir has none
  -e, --enhance-all    With `--snapshot-only`: set `enable_enhance_all = true` in new local config and use it for this run
  -f, --full-snapshot  Same as `--snapshot-only --enhance-all`
  -x, --export         Headless: write each Zahir JSON to `ublx-export/` as flat `{path}.json` files. Recommended to run with "--full-snapshot" to get most complete & recent results. Adjust enhance policy in config to fine-tune which paths get `ZahirScan`
      --dev            Dev mode: tui-logger drain + `move_events` + trace-level default filter
      --themes         Print available themes grouped by appearance
  -h, --help           Print help
  -V, --version        Print version
```

## Synopsis

| Invocation | Behavior |
|------------|----------|
| `ublx [DIR]` | Index (if needed), open the **TUI** on the catalog for `DIR` (default `.`) |
| `ublx -s [DIR]` | **Headless** index only — no TUI |
| `ublx -f [DIR]` | Headless index with **full ZahirScan** pass (`--snapshot-only --enhance-all`) |
| `ublx -x [DIR]` | Headless **export** of Zahir JSON to `ublx-export/` |
| `ublx --themes` | List theme names (light/dark groups) and exit |
| `ublx --dev [DIR]` | TUI with dev logging (`tui-logger`, trace filter) |

TUI keybindings, panes, and tabs are documented in [TUI & modes](/tui/) — not repeated here.

## Arguments

| Argument | Description |
|----------|-------------|
| `DIR` | Project directory to index and browse. Default: current directory (`.`). |

UBLX stores a per-root SQLite catalog under your user cache (`ubli/`). Local config: `.ublx.toml` or `ublx.toml` in `DIR`. See [Configuration](/configuration).

## Options

### Headless indexing

| Flag | Short | Description |
|------|-------|-------------|
| `--snapshot-only` | `-s` | Index without opening the TUI. If `DIR` has no local config yet, UBLX **writes** a new one (path-only catalog by default). |
| `--enhance-all` | `-e` | Only meaningful with `--snapshot-only`: set `enable_enhance_all = true` in the **new** local config and run ZahirScan for all files this pass. Ignored without `-s` (use config or TUI for enhance). |
| `--full-snapshot` | `-f` | Shorthand for `--snapshot-only --enhance-all` — full metadata batch on this run. |

Default snapshot behavior matches `enable_enhance_all = false`: **path + filetype** only until you enhance in the TUI or tune [enhance policies](/guides/enhance-policies).

### Headless export

| Flag | Short | Description |
|------|-------|-------------|
| `--export` | `-x` | Write each enhanced file’s Zahir JSON under `ublx-export/` as flat `{path}.json` files. |

Recommended combinations:

```bash
# Richest export: index + enhance all, then export
ublx --full-snapshot --export /path/to/project

# Path-only export skeleton (enhance selectively in config/TUI first)
ublx --snapshot-only --export /path/to/project
```

Export uses whatever Zahir JSON is already in the catalog from the snapshot/enhance pass on that run. See [Headless snapshot + export](/guides/headless-snapshot-export).

### Other flags

| Flag | Description |
|------|-------------|
| `--dev` | Development mode: `tui-logger` drain, `move_events`, trace-level default filter. |
| `--themes` | Print available palette names grouped by appearance (from `palettes.rs`); then exit. Same names as `theme = "..."` in config — see [Themes](/themes). |
| `--help` | Print help. |
| `--version` | Print version. |

## Examples

Interactive catalog (default):

```bash
ublx /path/to/your/project
```

CI or warm cache without TUI:

```bash
ublx --snapshot-only /path/to/project
```

One-shot full metadata snapshot:

```bash
ublx --full-snapshot /path/to/project
# same as: ublx --snapshot-only --enhance-all /path/to/project
```

Export after full enhance:

```bash
ublx --full-snapshot --export /path/to/project
```

List installable themes:

```bash
ublx --themes
```

## Config vs CLI

Most behavior (theme, layout, `[[enhance_policy]]`, `hash`, excludes, etc.) lives in **global** and **local** `ublx.toml` files and hot-reloads in the TUI. CLI flags above cover **headless** entry points and dev utilities.

| Topic | Doc |
|-------|-----|
| All config keys | [Configuration](/configuration) |
| Path-only vs full enhance | [Guide](/guides/path-only-vs-full-enhance) |
| Nefaxer indexing | [Nefaxer](/nefaxer/) |
| ZahirScan CLI (standalone) | [ZahirScan CLI](/zahirscan/cli) |

## Related

- [Install](/getting-started) — Homebrew, Cargo, prerequisites, first run
- [API (docs.rs)](https://docs.rs/ublx) — Rust crate
