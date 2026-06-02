# Command mode & context menus

UBLX has three overlapping ways to act on files and the catalog: **quick actions** (per-row **Space** menu), **multi-select** (bulk **Space** menu), and **Command Mode** (global **Ctrl+A**). Menus show only what applies to the current tab, row type, and config.

Press **`?`** anytime for the in-app help overlay (sections change with the active main tab).

## At a glance

| Mechanism | Keys | Scope |
|-----------|------|--------|
| **Quick actions** (context menu) | **Space** on a row | One file, directory, lens name, or duplicate member |
| **Multi-select** | **Ctrl+Space**, then **Space** / **a** | Many paths in **Snapshot** or **Lenses** (middle pane) |
| **Command Mode** | **Ctrl+A**, then a letter | Whole session (snapshot, export, theme, …) |

**Not available** while the catalog search bar (**/**) is active, or when another popup already has focus (help, theme picker, lens name input, rename/delete confirm, etc.).

---

## Pane focus first

Most row actions target the **middle** (contents) pane. Use **Tab**, **h**, or **l** to focus left (categories / lens names) vs middle (files).

| Focus | Typical **Space** menu |
|-------|-------------------------|
| **Middle** — file row | Full quick actions (Snapshot, Delta, Lenses paths) |
| **Left** — lens name (Lenses tab) | Rename lens, delete lens |
| **Duplicates** — member row | Delete file, ignore in duplicates list |

---

## Quick actions (Space)

Open the context menu with **Space** on the highlighted row. Choose a row with **↑/↓**, then **Enter**, or press the **letter** shown in parentheses (e.g. `Open (o)`).

### Snapshot / Delta (file rows)

| Key | Action | Notes |
|-----|--------|--------|
| **o** | Open | Terminal and/or GUI editor |
| **f** | Show in folder | Reveal in Finder / Explorer (platform-dependent) |
| **p** | Enhance policy | **Directories only** — set subtree `auto` / `never` for ZahirScan on snapshot |
| **z** | Enhance with ZahirScan | Per-file enrich when `enable_enhance_all` is false |
| **l** | Add to Lens | Opens lens picker — see [Making and exporting lenses](/guides/lenses) |
| **c** | Copy path | Relative path to clipboard |
| **j** | Copy Zahir JSON | When snapshot already has Zahir JSON for that file |
| **r** | Rename file | Inline rename prompt |
| **d** | Delete file | Confirmation dialog |

Rows that do not apply are omitted (e.g. no **z** on directories, no **j** without JSON).

### Lenses tab (file row in middle pane)

Same menu as Snapshot, except:

| Key | Action |
|-----|--------|
| **d** | **Remove from lens** (not delete file) |
| **l** | *(not shown — use bulk **a** to add elsewhere)* |

Use **Space** on a **lens name** in the **left** pane for **Rename lens** / **Delete lens**.

### Duplicates tab

No full quick-actions menu. **Space** on a duplicate member:

| Key | Action |
|-----|--------|
| **d** | Delete file |
| **i** | Ignore — hide path for this duplicate-detection run |

### Enhance policy submenu

When **p** is available on a **directory** row, the submenu sets how ZahirScan runs under that path prefix on future snapshots (`auto` vs `never`). Details: [Enhance policies](/guides/enhance-policies).

---

## Multi-select & bulk menu

Multi-select works on the **contents** (middle) pane in **Snapshot** and **Lenses** only — not Duplicates.

| Step | Keys |
|------|------|
| Enter multi-select | **Ctrl+Space** |
| Toggle current row | **Space** |
| Open bulk menu | **a** |
| Exit | **Esc** |

### Bulk menu actions

| Key | Action |
|-----|--------|
| **a** | Add to Lens / Add to other Lens (same picker as quick actions **l**) |
| **r** | Bulk rename paths (via `$EDITOR`) |
| **d** | Delete files, or remove from current lens on **Lenses** tab |
| **z** | Enhance with ZahirScan (shown when selected rows are eligible and `enable_enhance_all` is off) |

Background enhance and delete operations show **toasts** when they finish.

---

## Command Mode (Ctrl+A)

**Command Mode** is a global “leader” chord: press **Ctrl+A**, then a second key. If you pause (~½s), a centered menu lists the same shortcuts.

Unavailable while **/** search is active or another modal is open.

| Key | Action |
|-----|--------|
| **d** | Run **duplicate detection** (background). **Duplicates** tab appears when groups exist |
| **t** | **Theme selector** — writes theme to local config on confirm |
| **s** | **Take snapshot** (background) — re-index the project |
| **r** | **Reload config** from disk (global + local `ublx.toml`) |
| **x** | Export Zahir JSON to **`ublx-export/`** — see [Headless snapshot + export](/guides/headless-snapshot-export) |
| **l** | Export lenses to **`ublx-lenses/`** — see [Making and exporting lenses](/guides/lenses) |
| **p** | **Switch project** — recents / other indexed roots under `ubli/` |

**Esc** cancels Command Mode without running an action.

::: tip Viewer search is not Command Mode
In-pane preview search uses **Shift+S** in the Viewer tab, not **Ctrl+A**.
:::

---

## Other navigation (often paired with menus)

These are not popups, but they change what **Space** and **Ctrl+A** apply to:

| Keys | Action |
|------|--------|
| **~** | Cycle main tabs (Snapshot, Lenses, Delta, Duplicates, Settings) |
| **/** | Fuzzy filter categories and file list |
| **s** | Cycle sort mode (middle pane) |
| **j** / **k** | Move selection up/down |
| **gg** / **G** | Jump to top/bottom of list |
| **Ctrl+j** / **Ctrl+k** | Jump by 10 rows |
| **v** / **t** / **m** / **w** | Focus right-pane Viewer / Templates / Metadata / Writing |

Digit keys **1–5** jump to visible main tabs (shown in **`?`** help).

---

## Settings tab

On **Settings**, **Space** does not open file quick actions. Useful keys:

| Key | Action |
|-----|--------|
| **Tab** | Switch Global vs Local config scope |
| **j** / **k** | Move in the settings list |
| **e** | Open the active settings file in `$EDITOR` |

---

## Related guides

- [TUI & modes](/tui) — three-pane layout and main tabs
- [Making and exporting lenses](/guides/lenses)
- [Path-only vs full enhance](/guides/path-only-vs-full-enhance)
- [Enhance policies](/guides/enhance-policies)
- [Headless snapshot + export](/guides/headless-snapshot-export)
