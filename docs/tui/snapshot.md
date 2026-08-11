# Snapshot

The **Snapshot** tab is the default catalog view after indexing. It is always available.

## What fills each pane

| Pane | Content |
|------|---------|
| **Left** | Category tree from the current index (extension groups, directories, etc.) |
| **Middle** | Files in the selected category |
| **Right** | [Right-pane tabs](/tui/right-pane/viewer) for the highlighted file |

Selecting a row in the middle updates all four right-pane tabs when Zahir JSON exists (or path-only placeholders when it does not).

## Right pane tabs

| Tab | Keys | Doc |
|-----|------|-----|
| Viewer | **v** | [Viewer](/tui/right-pane/viewer) |
| Templates | **t** | [Templates](/tui/right-pane/templates) |
| Metadata | **m** | [Metadata](/tui/right-pane/metadata) |
| Writing | **w** | [Writing](/tui/right-pane/writing) |

**Shift+F** — Viewer fullscreen. **Shift+S** — literal search inside the preview.

## Typical workflow

1. Pick a category on the left.
2. Move through files in the middle (**↑/↓**, vim keys if enabled).
3. Read previews or metadata on the right.
4. **Space** for per-file actions (open, enhance, lens, copy path, …).

## Web UI (**v0.3.1+**)

In the embedded serve SPA (`ublx serve` with `--features ui`), a Command Mode snapshot (**Ctrl+A** → **s**) keeps your current **category** (and path when it still exists) after the catalog refreshes. You only fall back to **All** if that category disappears from the post-snapshot list. Soft **root switch** still starts Snapshot at All; categories refresh for the new root without needing another snapshot.

## Multi-select

**Ctrl+Space** on the middle pane enters multi-select (Snapshot and [Lenses](/tui/lenses) only). **Space** toggles rows; **a** opens the bulk menu. See [Command mode & context menus](/guides/command-mode-and-menus#multi-select--bulk-menu).

## Related

- [Snapshot & browse](/guides/snapshot-and-browse)
- [Right-pane previews](/guides/right-pane-previews)
- [Layout & keys](/tui/layout-and-keys)
- [Delta](/tui/delta) — same panes, diff-focused middle list
- [Configuration](/configuration) — `show_hidden_files`, layout percentages, enhance flags
