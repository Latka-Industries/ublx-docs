# Templates

The **Templates** tab shows **patterns mined by ZahirScan** from the selected file — each row is a template `pattern` with a match `count` and placeholder **examples**.

Focus with **t**. Requires ZahirScan enrichment for that path. Same data in the TUI and the embedded web UI (`ublx serve --features ui`, **v0.2.4+**).

## What fills the pane

| Source | Content |
|--------|---------|
| Logs / repetitive text | Patterns with `[PLACEHOLDER]` tokens and example values |
| Structured text | Repeated headers / outlines as patterns |
| Other formats | Whatever ZahirScan put in `templates[]` — often empty; Metadata/Writing may still fill |

Content comes from the snapshot’s Zahir JSON — not recomputed on every keypress. Schema: [ZahirScan: Template mining](/zahirscan/templates).

## TUI (v0.2.4+)

- Patterns list with **×count**; selection highlight on the pattern line only
- **Examples** expand **inline under** the selected pattern (framed by horizontal rules)
- Rules show **↑** / **↓** when the examples block can scroll
- **Shift+J/K** (or Shift+↑↓) — previous / next pattern
- **Shift+B/E** — scroll examples to top / bottom when ↑↓ appear

## Web UI (v0.2.4+)

- **Accordion**: expand several patterns at once
- **Filter** box — substring match on pattern, placeholder names, and example values
- **Expand all** / **Collapse all** (disabled when already fully expanded or collapsed)
- Serve may attach parsed `template_views` on `GET /entries/*path?zahir=1` — see [CLI: `ublx serve`](/cli#ublx-serve)

## When the tab is empty

- **Path-only** catalog — run [enhance](/guides/path-only-vs-full-enhance) on the file or subtree
- Format not supported — see [ZahirScan formats](/zahirscan/formats)
- Policy `never` on the path — [Enhance policies](/guides/enhance-policies)

## Related docs

- [ZahirScan: Template mining](/zahirscan/templates)
- [Metadata](/tui/right-pane/metadata) — typed fields alongside templates
- [Layout & keys](/tui/layout-and-keys) — preview scrolling and Templates shortcuts
- [Snapshot](/tui/snapshot)
