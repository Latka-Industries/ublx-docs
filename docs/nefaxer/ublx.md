# UBLX integration

UBLX builds on Nefaxer for **fast catalogs** and **snapshot diffs**. ZahirScan adds enrichment on top; Nefaxer owns path, size, mtime, and optional content hashes.

```
Directory → Nefaxer (index + diff) → UBLX (browse) → ZahirScan (enhance)
```

## What Nefaxer owns in UBLX

| Concern | Nefaxer | UBLX / ZahirScan |
|---------|---------|------------------|
| Directory walk | ✓ | |
| SQLite snapshot | ✓ (per-root cache under `ubli/`) | |
| Added / removed / modified | ✓ → **Delta** tab | |
| Blake3 for duplicates | ✓ when `hash` enabled in config | Duplicate detection UI |
| Path + filetype catalog | ✓ | |
| Zahir JSON / previews | | ✓ |

UBLX stores per-project SQLite under your user cache (`ubli/`; sanitized dir name + path hash). Config paths and enhance behavior are UBLX-specific — see [UBLX Configuration](/configuration).

## Snapshot workflow

| Action | Behavior |
|--------|----------|
| **Open TUI** | Background snapshot on startup (unless disabled) |
| **Command Mode `s`** | Background re-index |
| **Switch project** | Re-snapshot for new root (when `run_snapshot_on_startup` is true) |
| **`ublx --snapshot-only`** | Headless index only |

**Delta** tab surfaces Nefaxer diff results (added / modified / removed) vs the previous snapshot.

## Hashing and duplicates

Set `hash = true` in UBLX config (or use Nefaxer with `-c`) so entries include Blake3 digests. UBLX duplicate detection (Command Mode **d**) uses those hashes.

## Standalone vs through UBLX

| Approach | Best for |
|----------|----------|
| **`nefaxer` CLI** | CI diff reports, custom `.nefaxer` in-repo, dry-run audits |
| **UBLX TUI** | Browsing, lenses, ZahirScan enhance, export |

For enrich-on-demand workflows after a lightweight index, see [Path-only vs full enhance](/guides/path-only-vs-full-enhance) and [ZahirScan UBLX integration](/zahirscan/ublx).
