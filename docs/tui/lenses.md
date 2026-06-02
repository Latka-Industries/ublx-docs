# Lenses

**Lenses** are saved path lists — a focused subset of the catalog (e.g. “docs to review”, “configs only”).

The tab appears only when the database has **at least one lens**.

## What fills each pane

| Pane | Content |
|------|---------|
| **Left** | Lens names |
| **Middle** | Paths in the selected lens |
| **Right** | *(unused — no Viewer / Templates / Metadata / Writing tabs)* |

Use **Snapshot** if you need right-pane previews for a lens path; lenses themselves are for curated lists and export.

## Creating & editing lenses

| Action | How |
|--------|-----|
| Add paths | **l** from Snapshot quick actions, or bulk **a** in multi-select |
| Rename / delete lens | **Space** on a lens name in the **left** pane |
| Remove path from lens | **d** on a file row in the middle *(removes from lens, not disk)* |

Export and markdown conversion: [Making & exporting lenses](/guides/lenses).

## Multi-select

Same as Snapshot: **Ctrl+Space** on the **middle** pane, **Space** to toggle, **a** for bulk add/remove/export actions.

## Command Mode

**Ctrl+A** then **l** — lens-related global actions (see in-app menu). **x** exports Zahir JSON; do not confuse with quick-action **l** (add to lens).

## Related

- [Snapshot](/tui/snapshot) — full catalog with right pane
- [Guides: Lenses](/guides/lenses)
