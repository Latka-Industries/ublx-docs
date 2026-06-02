# Layout & keys

Shared navigation and input behavior across main tabs unless a tab doc says otherwise.

## Pane focus

| Key | Action |
|-----|--------|
| **Tab** | Toggle focus: left (categories) ↔ middle (contents) |
| **h** / **l** | Focus left or middle pane |
| **v** / **t** / **m** / **w** | Focus right-pane tab: Viewer, Templates, Metadata, Writing *(Snapshot / Delta file rows)* |
| **Shift+Tab** | Cycle right-pane tabs |

The right pane is driven by the **middle** selection on Snapshot and Delta when viewing a file row.

## Catalog search

| Key | Action |
|-----|--------|
| **/** | Fuzzy filter on categories and file list |
| **Esc** | Clear filter |

Command Mode and quick-action menus are **disabled** while the search bar is active.

## Preview scrolling

| Key | Action |
|-----|--------|
| **Shift+b** / **Shift+e** | Top / bottom of preview |
| **Shift+↑↓** or **Shift+K/J** | Line up / down |

## Main tab cycling

| Key | Action |
|-----|--------|
| **~** | Next main tab (Snapshot → Lenses → Delta → …) |

## Enhance workflow

How much ZahirScan data appears in the right pane:

| Mode | Config / action |
|------|-----------------|
| **Path-only** | Default snapshot — fast index, minimal JSON |
| **Batch enhance** | `enable_enhance_all` or `[[enhance_policy]]` with `policy = "auto"` |
| **On demand** | **Enhance with ZahirScan** from quick actions or multi-select |

See [Path-only vs full enhance](/guides/path-only-vs-full-enhance) and [Enhance policies](/guides/enhance-policies).

## Quick actions overview

| Mechanism | Keys |
|-----------|------|
| Context menu | **Space** on a row |
| Multi-select | **Ctrl+Space**, then **Space** / **a** *(Snapshot & Lenses middle pane)* |
| Command Mode | **Ctrl+A**, then a letter |

Full reference: [Command mode & context menus](/guides/command-mode-and-menus).
