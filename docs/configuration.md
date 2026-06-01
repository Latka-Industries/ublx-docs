# Configuration

UBLX reads a local TOML config in the indexed directory. Key options:

| Key | Type | Description |
|-----|------|-------------|
| `enable_enhance_all` | bool | If `true`, run ZahirScan for all files on snapshot. Default `false` (path + filetype only). |

Enhance policies (`[[enhance_policy]]`) scope ZahirScan batch behavior per path prefix:

- **`auto`** — enrich on snapshot for paths under the prefix
- **`manual`** — path-only until you run **Enhance with ZahirScan** on demand

::: tip
Full config reference will expand here as the site grows. See the [UBLX README](https://github.com/Latka-Industries/UBLX#configuration) for now.
:::
