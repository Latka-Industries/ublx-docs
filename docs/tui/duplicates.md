# Duplicates

**Duplicates** groups files by **content hash** so you can review redundant copies.

The tab appears only after duplicate groups exist in the database.

## Populating groups

Run duplicate detection from **Command Mode**: **Ctrl+A**, then **d** (see in-app menu). UBLX scans indexed content and builds groups.

## What fills each pane

| Pane | Content |
|------|---------|
| **Left** | Duplicate group identifiers |
| **Middle** | Member paths in the selected group |
| **Right** | Summary for the group (counts, hash context) |

There are **no** Viewer / Templates / Metadata / Writing tabs on this main tab.

## Actions

**Space** on a member path in the middle:

| Key | Action |
|-----|--------|
| **d** | Delete file |
| **i** | Ignore — hide path for this detection run |

Multi-select (**Ctrl+Space**) is **not** available on Duplicates.

## Related

- [Command mode & context menus](/guides/command-mode-and-menus#duplicates-tab)
- [Snapshot](/tui/snapshot)
