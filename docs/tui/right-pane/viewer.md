# Viewer

The **Viewer** right-pane tab shows a **preview** of the selected file. Focus with **v** or **Shift+Tab**.

Available on [Snapshot](/tui/snapshot) and [Delta](/tui/delta) when a file row is selected.

## What fills the pane

| Input | Preview |
|-------|---------|
| Plain text / logs | Scrolled text; syntax highlighting where supported |
| **Markdown** | Rendered preview |
| **Images** | Terminal image via ratatui-image (downscaled to pane) |
| **Code** | Syntect highlighting |
| **`.tet`** (tetration) | Catalog summary (`tet info --all -n 0` style) — works from path before enhance |
| **Directories** | `tree` layout when configured |

Footer shows **size** and **last modified** when available.

## Keys

| Key | Action |
|-----|--------|
| **Shift+F** | Toggle fullscreen Viewer |
| **Shift+S** | Literal in-pane search (n/N, Esc — see **`?`**) |
| **Shift+b/e**, **Shift+↑↓** | Scroll — [Layout & keys](/tui/layout-and-keys) |

## Dependencies

Optional tools improve previews (see [Getting started](/getting-started)): `tree`, image backends, etc.

## Without ZahirScan JSON

Path-only snapshots still show path-based previews (e.g. `.tet` from disk). Rich markdown/metadata tabs need enhance — [Path-only vs full enhance](/guides/path-only-vs-full-enhance).

## Related

- [Templates](/tui/right-pane/templates)
- [Metadata](/tui/right-pane/metadata)
- [ZahirScan formats](/zahirscan/formats)
