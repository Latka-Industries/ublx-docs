# Change & duplicates

Two main tabs build on [Nefaxer](/nefaxer/) snapshot history and optional content hashes: **Delta** (what changed between walks) and **Duplicates** (same bytes, different paths).

## Delta — snapshot diffs

**Delta** compares the **current** snapshot to the **previous** snapshot for the same catalog root.

The tab appears when a prior snapshot exists in the database.

### How diffs are produced

Nefaxer records added, modified, and removed paths on each walk. UBLX surfaces them as buckets on the **Delta** tab — no full re-walk needed to see what moved.

| Pane | Content |
|------|---------|
| **Left** | Change buckets — added, modified, removed |
| **Middle** | Paths in the selected bucket |
| **Right** | Overview; file rows use [right-pane previews](/guides/right-pane-previews) like Snapshot |

### Typical workflow

1. Edit files under the indexed root.
2. Re-snapshot (**Ctrl+A** → **s**, or restart `ublx` with snapshot on startup).
3. Watch for the completion toast — **Snapshot finished**, then either **No changes** (nothing to do in **Delta** for this run) or **`N added, M modified, R removed`** (see [Snapshot & browse](/guides/snapshot-and-browse#toast-when-the-snapshot-finishes)).
4. Press **`~`** → **Delta**.
5. Walk **Added** / **Modified** / **Removed**; **Space** quick actions match [Snapshot](/tui/snapshot).

Schema details: [Nefaxer database](/nefaxer/database). Tab reference: [Delta](/tui/delta).

## Duplicates — hash groups

**Duplicates** groups files by **content hash** (Blake3 when hashing is enabled).

The tab appears only after duplicate groups exist in the database.

### Enable hashing

Set `hash = true` in [UBLX configuration](/configuration) (or use Nefaxer with `-c`) so snapshot entries include digests. Without hashes, duplicate detection has nothing to group on.

### Run detection

1. **Ctrl+A** (Command Mode)
2. **d** — duplicate detection (see in-app menu)

UBLX scans indexed content and builds groups. This is separate from the Delta diff — it finds redundant **copies**, not edits to a single file.

### Review groups

| Pane | Content |
|------|---------|
| **Left** | Group identifiers |
| **Middle** | Member paths in the selected group |
| **Right** | Summary — counts, hash context |

**Space** on a member path:

| Key | Action |
|-----|--------|
| **d** | Delete file |
| **i** | Ignore — hide path for this detection run |

Multi-select is **not** available on Duplicates. Tab reference: [Duplicates](/tui/duplicates).

## When to use which

| Goal | Tab |
|------|-----|
| “What changed since yesterday’s index?” | **Delta** |
| “Do I have the same file in two places?” | **Duplicates** (after **Ctrl+A** → **d**) |
| Path-only first pass on a huge tree | Snapshot + Delta later; defer duplicate scan until hashes exist |

## Related

- [Snapshot & browse](/guides/snapshot-and-browse) — indexing and re-snapshot
- [Nefaxer UBLX integration](/nefaxer/ublx) — who owns diffs vs UI
- [Command mode & context menus](/guides/command-mode-and-menus) — **Ctrl+A** actions
- [Headless snapshot + export](/guides/headless-snapshot-export) — CI diff before opening the TUI
