# Delta

**Delta** compares the current snapshot to the **previous** snapshot for the same catalog root.

The tab appears when a prior snapshot exists in the DB.

## What fills each pane

| Pane | Content |
|------|---------|
| **Left** | Change buckets — e.g. added, modified, removed |
| **Middle** | Paths in the selected bucket |
| **Right** | Overview for the selection; file rows can use [right-pane tabs](/tui/right-pane/viewer) like Snapshot |

Layout matches Snapshot so you can inspect what changed and open previews for modified files.

## Typical workflow

1. Run a new snapshot after editing the tree.
2. Open **Delta** (**~** or tab bar).
3. Select **Added**, **Modified**, or **Removed** on the left.
4. Walk the middle list; use **Space** quick actions where applicable.

## Quick actions

File rows in the middle use the same **Space** menu as [Snapshot](/tui/snapshot) (open, enhance, copy path, …). Lens add (**l**) applies to paths still in the catalog.

## Related

- [Snapshot](/tui/snapshot)
- [Headless snapshot + export](/guides/headless-snapshot-export)
