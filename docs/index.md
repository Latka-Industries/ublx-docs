---
layout: home

hero:
  name: UBLX
  text: Index once. Enrich on demand. Browse in the terminal.
  tagline: A TUI catalog powered by Nefaxer indexing and ZahirScan metadata extraction.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Latka-Industries/UBLX

features:
  - title: Snapshot & browse
    details: Index a directory once, then navigate a flat catalog with previews, lenses, and delta views.
  - title: Path-only or full enhance
    details: Lightweight path catalogs by default; batch or on-demand ZahirScan enrichment when you need depth.
  - title: Built for project trees
    details: Fast diffs, duplicate detection, and export — not a file manager replacement.
---

## The stack

| Tool | Role |
|------|------|
| **[UBLX](https://github.com/Latka-Industries/UBLX)** | Terminal UI — browse, enrich, export |
| **[Nefaxer](https://github.com/Latka-Industries/nefaxer)** | Parallel directory indexer with SQLite snapshots |
| **[ZahirScan](https://github.com/Latka-Industries/zahirscan)** | Metadata extraction and template mining |

::: info API reference
Rust crate APIs live on [docs.rs](https://docs.rs) (ublx, nefaxer, zahirscan). User guides on this site are expanded from the GitHub READMEs.
:::
