# Built for project trees

UBLX targets **repo-scale catalogs** — navigate, diff, enrich selectively, and export — not replacing Finder, Explorer, or a full IDE file tree.

## What it optimizes for

| Strength | Example |
|----------|---------|
| Flat catalog over a indexed root | One middle-pane list per category |
| Fast first pass | Path-only snapshot on large trees |
| Change awareness | [Delta](/guides/change-and-duplicates) between snapshots |
| Curated subsets | [Lenses](/guides/lenses) and Markdown export |
| Scriptable output | [Headless snapshot + export](/guides/headless-snapshot-export) |

Use a normal file manager or editor for ad-hoc renames across the OS; use UBLX when you want a **persistent index** with previews, policies, and export.

## Large directory strategy

1. **Path-only first** — open `ublx` on the root; skim categories and filetypes without batch enhance. See [Path-only vs full enhance](/guides/path-only-vs-full-enhance).
2. **Policy on hot subtrees** — `[[enhance_policy]]` with `auto` on `src/` or `docs/` only. See [Enhance policies](/guides/enhance-policies).
3. **On-demand depth** — **Space** → **Enhance with ZahirScan** (**z**) on the files you actually open.
4. **Re-snapshot after churn** — **Ctrl+A** → **s**, then **Delta** for added/modified/removed.
5. **Hashes when needed** — enable `hash = true` before [duplicate detection](/guides/change-and-duplicates).

[Nefaxer](/nefaxer/) parallel walks keep indexing practical on deep trees — [Architecture](/nefaxer/architecture).

## Navigation in the TUI

| Mechanism | Keys | Use |
|-----------|------|-----|
| Main tabs | **`~`** | Snapshot, Lenses, Delta, Duplicates, Settings |
| Pane focus | **Tab**, **h**, **l** | Categories vs file list vs right pane |
| Catalog search | **/** | Filter middle pane |
| Quick actions | **Space** | Per-file open, enhance, lens, copy path, … |
| Multi-select | **Ctrl+Space**, **a** | Bulk enhance, lens add, export actions |
| Command Mode | **Ctrl+A** | Snapshot, export, theme, duplicate scan, … |

Full menu reference: [Command mode & context menus](/guides/command-mode-and-menus). Layout: [TUI & modes](/tui/), [Layout & keys](/tui/layout-and-keys).

Press **`?`** in the TUI for context help on the active tab.

## Recurring workflows

| Task | Where to start |
|------|----------------|
| Review PR-sized changes | Re-snapshot → **Delta** |
| Audit duplicate assets | `hash = true` → **Ctrl+A** → **d** → **Duplicates** |
| Share a path list | **Lenses** + export to `ublx-lenses/` |
| CI catalog artifact | `ublx --snapshot-only --export` |

## Related

- [Snapshot & browse](/guides/snapshot-and-browse) — default catalog session
- [Making and exporting lenses](/guides/lenses) — saved path lists
- [Configuration](/configuration) — hidden files, layout, cache, enhance defaults
