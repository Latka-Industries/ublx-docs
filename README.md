# ublx-docs

Documentation site for the Latka Industries catalog stack: [UBLX](https://github.com/Latka-Industries/UBLX), [Nefaxer](https://github.com/Latka-Industries/nefaxer), and [ZahirScan](https://github.com/Latka-Industries/zahirscan).

Built with [VitePress](https://vitepress.dev/).

## Local development

```bash
npm install
npm run docs:dev
```

Open [http://localhost:5173/](http://localhost:5173/) after `npm run docs:dev`. Use the search box in the nav bar or **⌘K** / **Ctrl+K** for full-text search.

## Build

```bash
npm run docs:build
npm run docs:preview
```

## Deployment

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`.

| Environment | URL |
|-------------|-----|
| Production | [https://ublx.dev](https://ublx.dev) |
| GitHub Pages (legacy) | `https://latka-industries.github.io/ublx-docs/` (redirect or retire after DNS cutover) |

## Site structure

| Path | Content |
|------|---------|
| `/` | UBLX — install, config, TUI |
| `/zahirscan/` | ZahirScan — CLI, formats, export |
| `/nefaxer/` | Nefaxer — indexing, snapshots |
| `/guides/` | Cross-tool workflows |

Related: [tetration-docs](https://github.com/Latka-Industries/tetration-docs) (`.tet` format — separate site).
