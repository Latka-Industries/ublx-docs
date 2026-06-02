# Settings

The **Settings** tab edits **global** and **local** `ublx.toml` from the TUI. It is always available.

## What fills each pane

| Pane | Content |
|------|---------|
| **Left** | Scope — **Global** vs **Local** |
| **Middle** | Config keys for that scope (theme, layout, toggles, …) |
| **Right** | Description and preview for the selected key |

Changes hot-reload where supported (see [Configuration](/configuration)).

## Common keys in the UI

| Key | Effect |
|-----|--------|
| `theme` | Palette display name — [Themes & palettes](/themes) |
| `layout` | Left / middle / right pane width percentages |
| `bg_opacity` | Page background opacity (`1.0` = solid) |
| `show_hidden_files` | Include dotfiles in the index |
| `run_snapshot_on_startup` | Snapshot when opening a catalog |
| `typed_column_tables` | Metadata column tables: `none` / `abbrev` / `full` |

## Editing the file directly

| Key | Action |
|-----|--------|
| **e** | Open the active scope’s config file in `$EDITOR` |

Theme picker without leaving Settings: **Ctrl+A**, **t** (Command Mode) — saves to **local** config on confirm.

## Related

- [Configuration](/configuration) — full key reference
- [Themes & palettes](/themes)
- [Layout & keys](/tui/layout-and-keys)
