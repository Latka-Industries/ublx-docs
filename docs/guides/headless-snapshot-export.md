# Headless snapshot + export

Use UBLX without the TUI for automation, CI, or batch artifacts.

## Snapshot only

```bash
ublx --snapshot-only /path/to/project
```

Creates or updates the SQLite snapshot and writes local config if the directory had none.

## Full metadata snapshot

```bash
ublx --full-snapshot /path/to/project
```

Equivalent to `--snapshot-only --enhance-all` — sets `enable_enhance_all = true` in new local config and runs ZahirScan for all files this pass.

## Export flat Zahir JSON

```bash
ublx --snapshot-only --export /path/to/project
```

Writes one JSON file per enhanced path under `ublx-export/` (flat `{path}.json` layout). For the richest output, run after a full snapshot or with `[[enhance_policy]]` rows set to `auto` on the paths you care about:

```bash
ublx --full-snapshot --export /path/to/project
```

## Suggested pipeline

1. Index path-only for speed: `ublx --snapshot-only`
2. Edit `.ublx.toml` / `ublx.toml` — add `[[enhance_policy]]` for subtrees that need Zahir
3. Re-snapshot and export: `ublx --snapshot-only --export`

Or one shot for small trees: `ublx --full-snapshot --export`.
