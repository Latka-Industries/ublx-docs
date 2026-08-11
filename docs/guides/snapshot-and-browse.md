# Snapshot & browse

The default UBLX workflow: **index a directory once** with [Nefaxer](/nefaxer/), then **browse the flat catalog** in the TUI on the **Snapshot** tab.

```
Directory → Nefaxer (walk + SQLite) → UBLX (Snapshot tab) → optional ZahirScan (right pane)
```

## First snapshot

1. Install [UBLX](/getting-started) (Nefaxer and ZahirScan ship with it).
2. Open a project root:

   ```bash
   ublx /path/to/your/project
   ```

3. UBLX runs a background snapshot (unless disabled), writes SQLite under your user cache (`ubli/`), and opens **Snapshot**.

By default the catalog is **path + filetype only** — fast on large trees. See [Path-only vs full enhance](/guides/path-only-vs-full-enhance) when you need Zahir-backed previews.

## What Nefaxer writes

| Data | Used for |
|------|----------|
| Paths, sizes, mtimes | Categories, middle-pane file list |
| Optional Blake3 hashes | [Duplicate detection](/guides/change-and-duplicates) |
| Diff vs prior snapshot | [Delta tab](/tui/delta) on the next run |

Details: [Nefaxer UBLX integration](/nefaxer/ublx), [Database schema](/nefaxer/database).

## Snapshot tab layout

| Pane | Role |
|------|------|
| **Left** | Category tree (extensions, directories, …) |
| **Middle** | Files in the selected category |
| **Right** | [Right-pane tabs](/guides/right-pane-previews) for the highlighted file |

Cycle main tabs with **`~`**: Snapshot, Lenses (when lenses exist), Delta (when a prior snapshot exists), Duplicates (after detection), Settings.

Pane focus, search, and scrolling: [Layout & keys](/tui/layout-and-keys).

## Typical browse session

1. Pick a category on the left.
2. Move through files in the middle (**↑/↓**, vim keys if enabled).
3. Read previews on the right (**v** / **t** / **m** / **w** when Zahir JSON exists).
4. **Space** on a row for quick actions — open, enhance, add to lens, copy path, …

Full key reference: [Command mode & context menus](/guides/command-mode-and-menus).

## Re-snapshot

| Action | When |
|--------|------|
| **Ctrl+A** → **s** | Background re-index while the TUI stays open |
| New `ublx <dir>` | Switch project root (when `run_snapshot_on_startup` is true) |
| `ublx --snapshot-only` | Headless index only — [Headless snapshot + export](/guides/headless-snapshot-export) |

After a re-snapshot, check the completion toast: open **Delta** only when it reports added/modified/removed counts — not when it says **No changes**.

On the **embedded web UI** (**v0.3.1+**), Command Mode snapshot keeps your current Snapshot **category** (and selected path when it still exists) instead of jumping back to **All**.

### Toast when the snapshot finishes

Background snapshots (**Ctrl+A** → **s**, or startup re-index) show a **toast** when the walk completes:

1. **Snapshot finished**
2. Then either:
   - **`No changes`** — nothing added, modified, or removed vs the previous snapshot
   - **`N added, M modified, R removed`** — counts from the Nefaxer diff

When the toast says **No changes**, there is nothing new to inspect in **Delta** for that run — no new diff rows, and index-time batch ZahirScan does not run on unchanged files. You can stay on **Snapshot**; only re-open **Delta** after a snapshot that reports non-zero counts.

When counts are non-zero, **Delta** lists the paths in each bucket. See [Change & duplicates](/guides/change-and-duplicates).

Other background work (enhance, delete, lens export, duplicate detection) also finishes with toasts — [Command mode & context menus](/guides/command-mode-and-menus#toast-notifications).

## Cache location

Per-root SQLite lives under `ubli/` in your user cache (sanitized directory name + path hash). UBLX config controls paths, hidden files, and snapshot-on-startup — [Configuration](/configuration).

## Related

- [Install](/getting-started) — prerequisites and first run
- [TUI: Snapshot](/tui/snapshot) — tab-specific reference
- [Right-pane previews](/guides/right-pane-previews) — Viewer, Templates, Metadata, Writing
- [Making and exporting lenses](/guides/lenses) — saved path subsets
