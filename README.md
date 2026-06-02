# ublx-docs

Documentation site for the Latka Industries catalog stack: [UBLX](https://github.com/Latka-Industries/UBLX), [Nefaxer](https://github.com/Latka-Industries/nefaxer), and [ZahirScan](https://github.com/Latka-Industries/zahirscan).

Built with [VitePress](https://vitepress.dev/).

## Local development

```bash
npm install
npm run docs:dev
```

Open [http://localhost:5173/ublx-docs/](http://localhost:5173/ublx-docs/) (base path matches GitHub Pages). Use the search box in the nav bar or **⌘K** / **Ctrl+K** for full-text search.

## Build

```bash
npm run docs:build
npm run docs:preview
```

## Deployment

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`.

| Environment | URL |
|-------------|-----|
| GitHub Pages (current) | `https://latka-industries.github.io/ublx-docs/` |
| Custom domain (future) | `https://ublx.dev` |

## Site structure

| Path | Content |
|------|---------|
| `/` | UBLX — install, config, TUI |
| `/zahirscan/` | ZahirScan — CLI, formats, export |
| `/nefaxer/` | Nefaxer — indexing, snapshots |
| `/guides/` | Cross-tool workflows |

Related: [tetration-docs](https://github.com/Latka-Industries/tetration-docs) (`.tet` format — separate site).
