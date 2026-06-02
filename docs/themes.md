---
outline: [2, 2]
---

# Themes & palettes

UBLX themes are **`Palette`** values in [`palettes.rs`](https://github.com/Latka-Industries/UBLX/blob/main/src/themes/palettes.rs). The config string must match the **display name** exactly.

```toml
theme = "Oblivion Ink"
```

Omit `theme` or use `theme = "default"` for **Oblivion Ink** (built-in default).

## How to choose a theme

| Method | Notes |
|--------|--------|
| **Settings tab** | Theme, layout, opacity, toggles; **e** opens active config in `$EDITOR` |
| **Command Mode** | **Ctrl+A**, then **t** — preview in picker; saves to **local** config on confirm |
| **Config file** | `theme = "..."` in global or local `ublx.toml` (hot-reloadable) |
| **CLI** | `ublx --themes` — lists themes grouped by appearance |

The in-app picker shows **Dark** and **Light** headers; themes sort **A–Z** within each (same order below).

Use the **Palette** dropdown in the top nav to preview any palette as this documentation site’s color scheme. Light or dark mode follows the palette you pick (saved in your browser).

<ThemeGallery />

::: tip Source of truth
To add a theme upstream: define a `Palette` in `palettes.rs`, append to `ALL_THEMES`, and set `name` to the exact display string. Regenerate this page’s swatch data from that file when palettes change.
:::
