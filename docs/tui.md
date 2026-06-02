# TUI & modes

UBLX uses a three-pane layout: categories (left), file list (middle), and detail tabs (right). Main tabs run left to right when available.

## Main tabs

| Tab | When shown | Purpose |
|-----|------------|---------|
| **Snapshot** | Always | Categories and files from the current index; right pane shows Viewer / Templates / Metadata / Writing |
| **Lenses** | DB has lenses | Saved path lists; create/export — [guide](/guides/lenses) |
| **Delta** | After a prior snapshot | Added / modified / removed since last snapshot |
| **Duplicates** | Groups exist | Content-hash duplicate groups (populate via Command Mode **d**) |
| **Settings** | Always | Global vs local config, theme, layout, toggles; **e** opens active config in `$EDITOR` |

Cycle main tabs with **`~`**.

## Right pane tabs

Focus with **v** (Viewer), **t** (Templates), **m** (Metadata), **w** (Writing). **Shift+Tab** cycles tabs.

| Tab | Content |
|-----|---------|
| **Viewer** | Previews — markdown, tables, images, code (syntect), `.tet` summary, directories via `tree`, etc. |
| **Templates** | Structure/outline snippets from ZahirScan |
| **Metadata** | Key/value and typed column tables from ZahirScan |
| **Writing** | Word/character stats when available |

**Shift+F** toggles Viewer fullscreen. **Shift+S** opens in-pane search in the preview.

## Pane focus & catalog search

- **Tab** — focus left (categories) vs middle (contents)
- **h** / **l** — focus left or middle pane
- **/** — fuzzy filter categories and file list; **Esc** clears

Scroll preview: **Shift+b** / **Shift+e** (top/bottom), **Shift+↑↓** or **Shift+K/J** (line).

## Quick actions & Command Mode

UBLX uses **Space** (per-row context menu), **Ctrl+Space** (multi-select + bulk actions), and **Ctrl+A** (Command Mode). What appears depends on the tab, row type, and config.

Full reference: **[Command mode & context menus](/guides/command-mode-and-menus)**. Press **`?`** in the TUI for the live help overlay.

## Enhance workflow

- **Path-only catalog** — default; fast snapshot
- **Batch enhance** — `enable_enhance_all` or `[[enhance_policy]]` with `policy = "auto"`
- **On demand** — **Enhance with ZahirScan** from quick actions or multi-select

See [Guides: Path-only vs full enhance](/guides/path-only-vs-full-enhance) and [Making and exporting lenses](/guides/lenses).
