# Enhance policies

`[[enhance_policy]]` rows override global `enable_enhance_all` for specific path prefixes. The **longest matching** prefix wins.

## Fields

```toml
[[enhance_policy]]
path = "relative/prefix"
policy = "auto"   # or "manual"
```

- **`auto`** — ZahirScan runs on snapshot for files under `path`
- **`manual`** — path-only on snapshot; enrich via TUI when needed

## Example: monorepo

```toml
enable_enhance_all = false

[[enhance_policy]]
path = "packages/core"
policy = "auto"

[[enhance_policy]]
path = "packages/core/vendor"
policy = "manual"

[[enhance_policy]]
path = "assets/screenshots"
policy = "auto"
```

`packages/core/vendor` is manual (longer match). Other files under `packages/core` get batch enhance. Everything else stays path-only unless you enhance on demand.

## Headless runs

Policies apply to `ublx --snapshot-only` and `--full-snapshot` the same as the TUI. Tune policies before `--export` so `ublx-export/` contains Zahir JSON only where you need it.

See also [Path-only vs full enhance](/guides/path-only-vs-full-enhance).
