# Path-only vs full enhance

UBLX separates **fast indexing** from **deep metadata**. Understanding the split keeps large trees usable.

## Defaults

| Mode | On snapshot | Catalog contains |
|------|-------------|------------------|
| **Path-only** (default) | Nefaxer walk only | Paths, categories, filetype hints |
| **Full enhance** | Nefaxer + ZahirScan batch | Zahir JSON for previews, Templates, Metadata, Writing |

`enable_enhance_all = false` is the default. Turn on full enhance globally, per subtree with `[[enhance_policy]]`, or file-by-file in the TUI.

## When to stay path-only

- First pass on a **large** directory — see filetype mix without waiting on every file
- Trees where you only need **Delta** / duplicate / path navigation
- CI that only needs a snapshot or export skeleton before selective enhance

## When to batch enhance

- Smaller projects where you want rich previews immediately
- Subtrees you always inspect (e.g. `src/`) — use `policy = "auto"` on that prefix
- Headless export pipelines — prefer `--full-snapshot` or tuned policies before `--export`

## On-demand enhance

For `policy = "manual"` prefixes (or path-only rows), use **Enhance with ZahirScan** from quick actions or multi-select. Good when only a few files need depth.

## Tradeoffs

| Approach | Speed | Depth | Best for |
|----------|-------|-------|----------|
| Path-only | Fastest | Shallow | Exploration, huge trees |
| Policy `auto` on prefix | Medium | Deep in subtree | Monorepos, mixed content |
| `enable_enhance_all` | Slowest | Deep everywhere | Small roots, full export |
| On-demand | Pay per file | Deep where needed | Archives, occasional deep dives |

Next: [Enhance policies](/guides/enhance-policies), [Headless snapshot + export](/guides/headless-snapshot-export).
