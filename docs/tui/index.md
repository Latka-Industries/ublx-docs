# TUI & modes

UBLX runs as a terminal UI with a **three-pane layout** and **main tabs** across the top. Each main tab reuses the same panes but fills them with different data.

## Three panes

| Pane | Role |
|------|------|
| **Left** | Categories, lens names, duplicate groups, or settings sections |
| **Middle** | File list, lens paths, duplicate members, or settings rows |
| **Right** | Detail for the selection — Viewer / Templates / Metadata / Writing, delta overview, or inline editors |

Main tabs run **left to right** when available. Cycle them with **`~`**.

## Main tabs

| Tab | When shown | Left · Middle · Right |
|-----|------------|------------------------|
| [Snapshot](/tui/snapshot) | Always | Categories · files · [right-pane tabs](/tui/right-pane/viewer) |
| [Lenses](/tui/lenses) | DB has lenses | Lens names · paths in lens · *(no right-pane tabs)* |
| [Delta](/tui/delta) | Prior snapshot exists | Change buckets · changed paths · delta overview |
| [Duplicates](/tui/duplicates) | Groups exist | Group names · member paths · group summary |
| [Settings](/tui/settings) | Always | Global / Local · option rows · description / preview |

**Lenses** and **Duplicates** tabs appear only when the database has lenses or duplicate groups respectively.

## Right pane (Snapshot & Delta)

On **Snapshot**, the right side shows ZahirScan-backed tabs for the selected file:

| Tab | Doc |
|-----|-----|
| **Viewer** | [Viewer](/tui/right-pane/viewer) — previews (markdown, code, images, `.tet`, …) |
| **Templates** | [Templates](/tui/right-pane/templates) — structure / outline snippets |
| **Metadata** | [Metadata](/tui/right-pane/metadata) — key/value and typed column tables |
| **Writing** | [Writing](/tui/right-pane/writing) — word/character stats when available |

Focus: **v** / **t** / **m** / **w**. **Shift+Tab** cycles. **Shift+F** fullscreen Viewer; **Shift+S** in-pane search.

## Navigation & actions

- [Layout & keys](/tui/layout-and-keys) — pane focus, catalog search, scrolling, enhance workflow
- [Command mode & context menus](/guides/command-mode-and-menus) — **Space**, **Ctrl+Space**, **Ctrl+A**
- Press **`?`** in the TUI for the live help overlay (sections follow the active tab)

## Related

- [Install](/getting-started) — first snapshot
- [Configuration](/configuration) — keys that change TUI behavior
- [Path-only vs full enhance](/guides/path-only-vs-full-enhance) — what fills Metadata / Templates / Writing
