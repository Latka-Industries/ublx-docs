# Delta

**Delta** compares the current snapshot to the **previous** snapshot for the same catalog root.

The tab appears when a prior snapshot exists in the DB.

## What fills each pane

| Pane | Content |
|------|---------|
| **Left** | Change buckets — e.g. added, modified, removed |
| **Middle** | Paths in the selected bucket |
| **Right** | Snapshot overview for the indexed tree — not file previews for middle-pane rows |

Layout matches Snapshot so you can inspect what changed and open previews for modified files.

## Typical workflow

1. Run a new snapshot after editing the tree.
2. If the toast reports **`N added, M modified, R removed`**, open **Delta** (**~** or tab bar). If it says **No changes**, this run added nothing to **Delta** — stay on **Snapshot**.
3. Select **Added**, **Modified**, or **Removed** on the left.
4. Walk the middle list; use **Space** quick actions where applicable.

## Quick actions

File rows in the middle use the same **Space** menu as [Snapshot](/tui/snapshot) (open, enhance, copy path, …). Lens add (**l**) applies to paths still in the catalog.

## Related

- [Change & duplicates](/guides/change-and-duplicates)
- [Snapshot](/tui/snapshot)
- [Headless snapshot + export](/guides/headless-snapshot-export)
