# Right-pane previews

On **Snapshot**, **Lenses**, and **Duplicates**, selecting a file in the middle pane fills the **right side** with up to four tabs. UBLX renders previews; [ZahirScan](/zahirscan/) supplies JSON when a path is enhanced.

## The four tabs

| Tab | Key | Path-only snapshot | After enhance |
|-----|-----|-------------------|---------------|
| **Viewer** | **v** | Markdown, code, images, `.tet` summary from disk | Same + richer where Zahir adds context |
| **Templates** | **t** | Empty or minimal | Structure / outline snippets from ZahirScan |
| **Metadata** | **m** | Empty or minimal | Typed key/value and column tables |
| **Writing** | **w** | Empty or minimal | Word and character stats when available |

**Shift+Tab** cycles tabs. **Shift+F** — Viewer fullscreen. **Shift+S** — literal in-pane search (Viewer).

Tab reference: [Viewer](/tui/right-pane/viewer), [Templates](/tui/right-pane/templates), [Metadata](/tui/right-pane/metadata), [Writing](/tui/right-pane/writing).

## Path-only vs enhanced

| Situation | What you see |
|-----------|--------------|
| Default first snapshot | Strong **Viewer** previews from file paths; Zahir tabs mostly empty |
| **Enhance with ZahirScan** (**Space** → **z**) | All four tabs populate for that file |
| `enable_enhance_all` or `policy = "auto"` | Batch enrich on snapshot — [Path-only vs full enhance](/guides/path-only-vs-full-enhance) |
| Unsupported format | Viewer may still preview; Templates / Metadata / Writing stay empty — [Supported formats](/zahirscan/formats) |

ZahirScan writes JSON into the snapshot DB; UBLX reads it on row select — it does not re-run extraction on every keypress.

## What ZahirScan extracts

| Tab | Source |
|-----|--------|
| Templates | [Template mining](/zahirscan/templates) — headers, patterns, column snippets |
| Metadata | [Metadata extraction](/zahirscan/metadata/) — format-specific fields |
| Writing | [Writing footprint](/zahirscan/writing-footprint) — counts and stats |

Deep format docs live under [ZahirScan](/zahirscan/). UBLX integration: [ZahirScan UBLX integration](/zahirscan/ublx).

## Viewer without enhance

Some previews work from disk alone:

- Plain text, logs, code (syntax highlighting)
- Markdown rendering
- Images (terminal image backends)
- **SVG** — needs `resvg` on `PATH`
- **PDF** / **video** — need `pdftoppm`/`mutool` and `ffmpeg`
- **`.tet`** — catalog-style summary before enhance

Optional host tools (`tree`, `resvg`, PDF rasterizers, `ffmpeg`, …): [Install](/getting-started#optional-tools-improve-previews).

## Tabs not on every main tab

| Main tab | Right pane |
|----------|------------|
| **Snapshot** | All four preview tabs for the selected file |
| **Lenses** | Same tabs for the selected lens path |
| **Duplicates** | Same tabs for the selected member path |
| **Delta** | Snapshot overview text only — no Viewer / Templates / Metadata / Writing for middle-pane rows |

## Related

- [Snapshot & browse](/guides/snapshot-and-browse) — catalog workflow
- [Enhance policies](/guides/enhance-policies) — `auto` / `manual` / `never` per prefix
- [Layout & keys](/tui/layout-and-keys) — pane focus and scrolling
