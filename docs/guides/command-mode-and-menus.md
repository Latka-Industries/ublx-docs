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

Unavailable while **/** search is active or another modal is open. **Esc** cancels without running an action.

| Key | Action | Toast / result |
|-----|--------|----------------|
| **d** | Run **duplicate detection** (background) | **No duplicates found**, or groups load and the **Duplicates** tab can appear |
| **t** | **Theme selector** — writes theme to local config on confirm | Confirmation when the theme is saved |
| **s** | **Take snapshot** (background) — re-index the project | **Snapshot finished**, then **No changes** or diff counts — [below](#snapshot-re-index) |
| **r** | **Reload config** from disk (global + local `ublx.toml`) | **Config reloaded** (or validation errors if the file is invalid) |
| **x** | Export Zahir JSON to **`ublx-export/`** | Exported *N* file(s), nothing to export, or error — [Headless snapshot + export](/guides/headless-snapshot-export) |
| **l** | Export lenses to **`ublx-lenses/`** | Exported *N* lens file(s), **No lenses to export**, or error — [Making and exporting lenses](/guides/lenses) |
| **p** | **Switch project** — recents / other indexed roots under `ubli/` | Error toast if the switch fails; otherwise the new root loads (snapshot per config) |

::: tip Viewer search is not Command Mode
In-pane preview search uses **Shift+S** in the Viewer tab, not **Ctrl+A**.
:::

::: tip Enhance is not Command Mode
**Enhance with ZahirScan** is **Space** → **z** on a row, or bulk **a** → **z** in multi-select — not a **Ctrl+A** chord.
:::

---

## Toast notifications

UBLX shows short **toasts** when background work completes. They appear in the toast area (same region used for config reload and other status lines). Only the latest message for a given operation type is kept — a new snapshot replaces prior snapshot toasts.

### Snapshot (re-index)

After **Ctrl+A** → **s** (or a startup snapshot when switching projects), you get:

| Line | Meaning |
|------|---------|
| **Snapshot finished** | The Nefaxer walk completed |
| **No changes** | No paths added, modified, or removed vs the previous snapshot — **Delta** has nothing new for this run; batch ZahirScan at index time is skipped for unchanged files |
| **`N added, M modified, R removed`** | Diff counts — open **Delta** to inspect paths |

First snapshot on a new root has no prior walk to compare against; diff counts apply from the **second** snapshot onward.

When the second line is **No changes**, the snapshot still completes (the catalog is refreshed), but nothing diff-driven is queued — you do not need to switch tabs or wait for enhance work tied to edits.

When counts are non-zero, open **Delta** rather than re-running the snapshot.

### Quick actions, bulk menu, and lens picker

These are **not** Command Mode chords; they use **Space** or multi-select **a**:

| Source | Typical toast |
|--------|----------------|
| **Space** → **z** or bulk **z** | Enhance finished (or error) for the selected path(s) |
| **Space** → **d** or bulk **d** | Delete completed (or error) |
| **Space** → **l** (lens picker) | e.g. **Added to lens "…"** — [Making and exporting lenses](/guides/lenses) |
| Bulk **r** | Bulk rename result |

Command Mode actions (**Ctrl+A** → **d** / **s** / **x** / **l** / …) are listed in the [Command Mode](#command-mode-ctrla) table above.

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

- [TUI & modes](/tui/) — three-pane layout and main tabs
- [Making and exporting lenses](/guides/lenses)
- [Path-only vs full enhance](/guides/path-only-vs-full-enhance)
- [Enhance policies](/guides/enhance-policies)
- [Headless snapshot + export](/guides/headless-snapshot-export)
