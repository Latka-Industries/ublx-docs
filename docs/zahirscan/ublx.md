# UBLX integration

UBLX treats ZahirScan as the **enrichment layer** on top of Nefaxer’s path catalog.

```
Directory → Nefaxer (index) → UBLX (browse) → ZahirScan (enhance → Zahir JSON)
```

## When ZahirScan runs

| Trigger | Behavior |
|---------|----------|
| **Default snapshot** | Path + filetype only (`enable_enhance_all = false`) |
| **`enable_enhance_all = true`** | Batch ZahirScan on every file during snapshot |
| **`[[enhance_policy]]` `policy = "auto"`** | Batch enhance under matching path prefix |
| **`policy = "manual"`** | Path-only until **Enhance with ZahirScan** in the TUI |
| **Quick actions / multi-select** | On-demand enhance for selected rows |

Longest matching `path` prefix wins; otherwise global `enable_enhance_all` applies. See [UBLX Configuration](/configuration) and [Enhance policies](/guides/enhance-policies).

## What UBLX shows

| UBLX pane | ZahirScan data |
|-----------|----------------|
| **Templates** | Patterns + placeholder examples ([Templates](/tui/right-pane/templates), **v0.2.4+**) |
| **Metadata** | Key/value and typed column tables |
| **Writing** | Writing footprint stats |
| **Viewer** | Format-specific previews (markdown, images, `.tet` summary, etc.) |

## Export

- **TUI:** Command Mode **x** → `ublx-export/` flat `{path}.json`
- **Headless:** `ublx --snapshot-only --export` — see [Headless snapshot + export](/guides/headless-snapshot-export)

Run `--full-snapshot` or tune enhance policies before export for complete Zahir JSON.

## Standalone vs through UBLX

| Approach | Best for |
|----------|----------|
| **`zahirscan -i ...`** | One-off files, debugging `-f` / `-r`, custom output folder |
| **UBLX enhance** | Project catalogs, policies, TUI previews, lens/export workflows |

Start with [Path-only vs full enhance](/guides/path-only-vs-full-enhance) to choose a workflow.
