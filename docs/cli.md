# CLI

```bash
ublx --help
```

```
UBLX is a TUI to index once, enrich with metadata, and browse a flat snapshot in a 3-pane layout with multiple modes.

Usage: ublx [OPTIONS] [DIR] [COMMAND]

Commands:
  query   Query the `.ublx` catalog (list / detail / delta / lenses)
  doctor  Diagnose `.ublx` DB / path / schema
  help    Print this message or the help of the given subcommand(s)

Arguments:
  [DIR]  Directory to index (when no subcommand) [default: .]

Options:
  -s, --snapshot-only  Headless snapshot. Writes a local config file when this dir has none
  -e, --enhance-all    With `--snapshot-only`: set `enable_enhance_all = true` in new local config and use it for this run
  -f, --full-snapshot  Same as `--snapshot-only --enhance-all`
  -x, --export         Headless: write each Zahir JSON to `ublx-export/` as flat `{path}.json` files
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
| `ublx query [DIR]` | Read the catalog (list / filter / detail) without the TUI |
| `ublx doctor [DIR]` | Diagnose catalog path, schema, integrity |
| `ublx --themes` | List theme names (light/dark groups) and exit |
| `ublx --dev [DIR]` | TUI with dev logging (`tui-logger`, trace filter) |

TUI keybindings, panes, and tabs are documented in [TUI & modes](/tui/) — not repeated here.

## Arguments

| Argument | Description |
|----------|-------------|
| `DIR` | Project directory to index and browse. Default: current directory (`.`). |

UBLX stores a per-root SQLite catalog under your user cache (`ubli/`). Local config: `.ublx.toml` or `ublx.toml` in `DIR`. See [Configuration](/configuration).

With a **subcommand**, pass `DIR` after the subcommand (`ublx query /path/to/project`), not before it.

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

## Subcommands

Catalog read tools. They **do not** create the DB — run `ublx` or `ublx -s` in `DIR` first. See `ublx query --help` / `ublx doctor --help` for the full flag list.

### `ublx query`

List or inspect snapshot rows (and related tables) without the TUI. Useful for agents and scripts (`--json`).

| Mode / flag | Behavior |
|-------------|----------|
| _(default)_ | List entries: category, size, path |
| `--category <NAME>` | Exact category filter |
| `--min-size` / `--max-size` | Size filters (bytes) |
| `--contains <STR>` | Path substring filter |
| `--path <REL>` | One row by exact relative path |
| `--zahir` | With `--path`, include nested Zahir JSON |
| `--categories` | List distinct categories |
| `--lenses` / `--lens <NAME>` | List lens names, or paths in a lens |
| `--delta` / `--delta-type` | List `delta_log` (`added` / `mod` / `removed`) |
| `--json` | Machine-readable JSON (pretty-printed) |

```bash
ublx query --categories
ublx query --category Code
ublx query --contains main.rs --json
ublx query --path src/main.rs --zahir --json
ublx query --delta --delta-type added
```

### `ublx doctor`

Diagnose the expected `.ublx` path, sidecars (`tmp` / `wal` / `shm`), schema, stats, and `PRAGMA quick_check`. Prints PASS / WARN / FAIL; exits non-zero on FAIL.

| Flag | Behavior |
|------|----------|
| `--json` | Emit the full report as JSON |
| `--fix` | Remove leftover **tmp / wal / shm** aux files (not the main `.ublx` DB) |
| `--force` | Run even if a snapshot appears in progress (`.ublx_tmp` + tmp wal/shm) |

Doctor is **blocked** while a snapshot looks active unless you pass `--force`. Do not `--fix` during a live snapshot write.

```bash
ublx doctor .
ublx doctor --json .
ublx doctor --fix .
```

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

Most behavior (theme, layout, `[[enhance_policy]]`, `hash`, excludes, etc.) lives in **global** and **local** `ublx.toml` files and hot-reloads in the TUI. Top-level flags cover **headless index/export**; `query` / `doctor` read the existing catalog.

| Topic | Doc |
|-------|-----|
| All config keys | [Configuration](/configuration) |
| Path-only vs full enhance | [Guide](/guides/path-only-vs-full-enhance) |
| Nefaxer indexing | [Nefaxer](/nefaxer/) |
| ZahirScan CLI (standalone) | [ZahirScan CLI](/zahirscan/cli) |

## Related

- [Install](/getting-started) — Homebrew, Cargo, prerequisites, first run
- [API (docs.rs)](https://docs.rs/ublx) — Rust crate
