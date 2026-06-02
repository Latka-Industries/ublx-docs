# Making and exporting lenses

**Lenses** are named, saved lists of paths in your indexed project — focused subsets of the catalog (e.g. “papers to read”, “API surface”, “assets for v2”). They live in the per-project SQLite index (under your `ubli/` cache), not as loose files until you export them.

The **Lenses** tab appears in the TUI only after at least one lens exists. See [TUI & modes](/tui) for pane layout and global keys.

## What a lens is

| Piece | Behavior |
|-------|----------|
| **Lens name** | Unique label (left pane on **Lenses** tab) |
| **Paths** | Relative paths from the indexed root (middle pane) |
| **Storage** | SQLite in the project’s UBLX index DB |
| **Export** | Optional Markdown under `ublx-lenses/` in the project directory |

Lenses are independent of ZahirScan enhance: you can add path-only or fully enhanced files.

## Create a lens and add paths

### Single file (Snapshot tab)

1. Open the project with `ublx` and stay on **Snapshot** (or **Delta** / **Duplicates** with file rows).
2. Select a file in the **contents** (middle) pane.
3. Press **Space** → **Add to Lens** (`l`).
4. In the lens picker, choose **Create New Lens** (first row), press **Enter**.
5. Type a name at **Lens name:**, press **Enter**.

UBLX creates the lens and adds that file. The **Lenses** tab becomes available (cycle with **`~`**).

### Add to an existing lens

Same flow, but in step 4 pick an existing lens name instead of **Create New Lens**, then **Enter**.

### Multiple files (multi-select)

1. On **Snapshot** or **Lenses**, press **Ctrl+Space** to enter multi-select on the contents pane.
2. Move with **↑/↓** (or vim motion); **Space** toggles each row.
3. Press **a** for the bulk menu → **Add to Lens** (or **Add to other Lens** when you are already on the **Lenses** tab).
4. Pick **Create New Lens** or an existing lens, same as above.

**Esc** leaves multi-select.

## Browse and edit lenses

1. Press **`~`** until **Lenses** is active.
2. **Left pane** — lens names; **middle pane** — paths in the selected lens.
3. **Tab** / **h** / **l** move focus between panes (same as other tabs).

### Remove a path from the current lens

On **Lenses**, select a path in the middle pane → **Space** → **Remove from lens** (`d`).

### Rename or delete a lens

Focus the **left** pane, select a lens name → **Space** → **Rename** (`r`) or **Delete** (`d`), and confirm.

### Add paths while on the Lenses tab

Use **multi-select** + bulk **Add to other Lens** (`a`), or switch to **Snapshot**, add via **Add to Lens** (`l`), then return to **Lenses**.

## Export lenses as Markdown

Export is **TUI only** (not a headless CLI flag today).

1. From the indexed project in UBLX, press **Ctrl+A** (Command Mode).
2. Press **l** — export lenses as Markdown.
3. Wait for the toast (export runs in the background).

Output directory (under the project root you indexed):

```text
ublx-lenses/
  my-lens-name.md
  another-lens.md
```

Each file contains:

- A `#` heading with the lens name
- One Markdown link per path (relative to the project root)
- Image paths use `![path](url)`; other types use `[path](url)`

Open the `.md` files in an editor or viewer; links resolve relative to the export file location.

If you see *“No lenses to export — create a lens in the Lenses tab first”*, create at least one lens before exporting.

::: tip Re-indexing
`ublx-lenses/` is treated as an export artifact under the project tree. It is not meant to be catalog content; avoid adding those Markdown files back into lenses unless you intend to.
:::

## Related workflows

- [Path-only vs full enhance](/guides/path-only-vs-full-enhance) — enrich lens files before export if you want Zahir detail in previews
- [Headless snapshot + export](/guides/headless-snapshot-export) — Zahir JSON export (`ublx-export/`) is separate from lens Markdown
- [TUI & modes](/tui) — Command Mode **x** (Zahir JSON) vs **l** (lenses)
