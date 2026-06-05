# Templates

The **Templates** tab shows **structure and outline snippets** mined by ZahirScan from the selected file.

Focus with **t**. Requires ZahirScan enrichment for that path.

## What fills the pane

| Source | Content |
|--------|---------|
| Logs / repetitive text | Template lines with placeholders |
| Structured text | Section headers, repeated patterns |
| Tabular extracts | Column-aware snippets when present in JSON |

Content comes from the snapshot’s Zahir JSON — not recomputed on every keypress.

## When the tab is empty

- **Path-only** catalog — run [enhance](/guides/path-only-vs-full-enhance) on the file or subtree
- Format not supported — see [ZahirScan formats](/zahirscan/formats)
- Policy `never` on the path — [Enhance policies](/guides/enhance-policies)

## Related docs

- [ZahirScan: Template mining](/zahirscan/templates)
- [Metadata](/tui/right-pane/metadata) — typed fields alongside templates
- [Snapshot](/tui/snapshot)
