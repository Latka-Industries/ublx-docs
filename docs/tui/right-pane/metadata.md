# Metadata

The **Metadata** tab shows **key/value fields** and **typed column tables** from ZahirScan for the selected file.

Focus with **m**.

## What fills the pane

| Section | Content |
|---------|---------|
| Top-level keys | Codec, dimensions, document properties, schema hints, … |
| Column tables | Parsed from compact `columns` JSON in the snapshot |

Table display is controlled by **`typed_column_tables`** in config:

| Value | Behavior |
|-------|----------|
| `none` | Hide typed column tables |
| `abbrev` | Default — cap wide tables at 20 rows |
| `full` | Show all rows |

Adjust in [Settings](/tui/settings) or [Configuration](/configuration).

## Format coverage

Per-format fields differ (media, office, sqlite, csv, …). See [ZahirScan metadata extraction](/zahirscan/metadata).

## Related

- [Templates](/tui/right-pane/templates)
- [Writing](/tui/right-pane/writing)
- [Configuration](/configuration) — `typed_column_tables`
