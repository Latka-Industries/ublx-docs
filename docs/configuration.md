# Configuration

UBLX merges **global** config first, then **local** overrides from the indexed directory. Config is optional; unset keys use defaults.

## Config locations

| Scope | macOS / Linux | Windows |
|-------|---------------|---------|
| Global | `~/.config/ublx/ublx.toml` | `%APPDATA%\ublx\ublx.toml` |
| Config cache | `~/.local/share/ublx/configs/` | `%LOCALAPPDATA%\ublx\configs\` |
| Local (per project) | `.ublx.toml` or `ublx.toml` in the indexed directory | same |

Only keys present in each file override defaults. **Global-only** keys cannot be set from local project files.

## Global-only keys

| Key | Type | Description |
|-----|------|-------------|
| `opacity_format` | string (optional) | When `bg_opacity` &lt; 1: `rgba` (default) or `hex8` (`#RRGGBBAA`) for OSC 11 background |
| `ask_enhance_on_new_root` | bool (optional) | If `false`, skip first-run “Enhance all files?” and apply `enable_enhance_all` immediately. Default: prompt on new root |

## Common keys (global and/or local)

| Key | Type | Description |
|-----|------|-------------|
| `theme` | string | Palette display name — see [Themes & palettes](/themes); `ublx --themes` lists values |
| `layout` | table | `left_pct`, `middle_pct`, `right_pct` (0–100, must sum to 100). Default: 10 / 30 / 60 |
| `bg_opacity` | float (optional) | `0.0`–`1.0`; below `1.0` uses terminal default fill so wallpaper can show through |
| `show_hidden_files` | bool | Include dotfiles in the index |
| `hash` | bool | Compute blake3 per file (slower; needed for duplicates and change detection) |
| `exclude` | array of strings | Extra path patterns to exclude (**startup only**, not hot-reloadable) |
| `editor_path` | string | Editor for “Open (Terminal)”; falls back to `$EDITOR` |
| `enable_enhance_all` | bool | If `true`, ZahirScan all files on snapshot. Default `false` (path + filetype only) |
| `run_snapshot_on_startup` | bool (optional) | Default `true`: background snapshot on TUI open and root switch. `false` keeps existing DB until you snapshot |
| `typed_column_tables` | string (optional) | Metadata/Writing column stats: `none`, `abbrev` (default), or `full`. Alias: `column_stats` |

All keys except `exclude` are **hot-reloadable** when saved in a loaded config file. A file watcher debounces reloads from global and local paths; invalid TOML keeps the last good cached overlay.

## Enhance policies

`[[enhance_policy]]` scopes ZahirScan batch behavior per path prefix (relative to the indexed directory, `/` separators, e.g. `src` or `photos/2024`):

| Field | Values |
|-------|--------|
| `path` | Prefix to match |
| `policy` | `auto` — ZahirScan on snapshot under this prefix; `manual` — path-only until on-demand enhance |

The **longest matching** `path` wins. If no row matches, **`enable_enhance_all`** applies globally.

Example — lightweight catalog by default, full metadata under `src/`:

```toml
enable_enhance_all = false

[[enhance_policy]]
path = "src"
policy = "auto"

[[enhance_policy]]
path = "docs/archive"
policy = "manual"
```

See [Guides: Enhance policies](/guides/enhance-policies) for workflow examples.

## CLI flags (config-related)

Headless flags that write or seed local config:

```text
ublx --snapshot-only <DIR>     # headless index; writes local config if missing
ublx --enhance-all ...         # with --snapshot-only: enable_enhance_all in new config
ublx --full-snapshot <DIR>     # --snapshot-only --enhance-all
ublx --export <DIR>            # flat Zahir JSON under ublx-export/
```

Full synopsis, examples, and `--themes` / `--dev`: [CLI](/cli). First-run walkthrough: [Install](/getting-started).
