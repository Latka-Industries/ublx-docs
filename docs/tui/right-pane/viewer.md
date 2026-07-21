# Viewer

The **Viewer** right-pane tab shows a **preview** of the selected file. Focus with **v** or **Shift+Tab**.

Available on [Snapshot](/tui/snapshot), [Lenses](/tui/lenses), and [Duplicates](/tui/duplicates) when a file row is selected.

## What fills the pane

| Input | Preview |
|-------|---------|
| Plain text / logs | Scrolled text; syntax highlighting where supported |
| **Markdown** | Rendered preview |
| **Images** (PNG/JPEG/WebP/…) | Terminal image via ratatui-image (downscaled to pane) |
| **SVG** | Rasterized with **`resvg`**, then same image path |
| **PDF** | Page raster via `pdftoppm` or `mutool` |
| **Video** | Mid-timeline frame via `ffmpeg` |
| **Code** | Syntect highlighting |
| **`.tet`** (tetration) | Catalog summary (`tet info --all -n 0` style) — works from path before enhance |
| **Directories** | `tree` layout when configured |

Footer shows **size** and **last modified** when available.

Settings → **External apps** shows which preview binaries and image protocol (Kitty / iTerm2 / Sixel / halfblocks) were detected.

## Keys

| Key | Action |
|-----|--------|
| **Shift+F** | Toggle fullscreen Viewer |
| **Shift+S** | Literal in-pane search (n/N, Esc — see **`?`**) |
| **Shift+b/e**, **Shift+↑↓** | Scroll — [Layout & keys](/tui/layout-and-keys) |

## Dependencies

Optional tools improve previews (see [Install](/getting-started)): `tree`, `resvg`, `pdftoppm` / `mutool`, `ffmpeg`.

## Without ZahirScan JSON

Path-only snapshots still show path-based previews (e.g. `.tet` from disk). Rich markdown/metadata tabs need enhance — [Path-only vs full enhance](/guides/path-only-vs-full-enhance).

## Related

- [Templates](/tui/right-pane/templates)
- [Metadata](/tui/right-pane/metadata)
- [ZahirScan formats](/zahirscan/formats)
