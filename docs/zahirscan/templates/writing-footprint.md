---
outline: deep
---

# Writing footprint

**Writing footprint** is separate from [templates](/zahirscan/templates/): it describes **style and variation in prose**, not repeating log lines or JSON keys. It is computed only for **text-like** content after template mining (plain text, markdown, HTML body, EPUB body).

It does **not** appear for logs, JSON template runs, or metadata-only formats.

## Where it appears in JSON

| Location | When |
|----------|------|
| `writing_footprint` on `MiningResult` | Templates-only path for text-like files |
| Top-level `writing_footprint` on `Output` | Same metrics, also in templates-only export |
| `html_metadata` | HTML-specific counts **plus** footprint from body text |
| `epub_metadata` | EPUB bibliographic fields **plus** footprint from spine body |

UBLX shows this in the **Writing** pane (table layout, same family as Metadata).

## How it is derived

Writing metrics are computed from the same sentences used for templates:

1. **Exact-pattern pass** — group sentences by shared phrases / n-grams; build templates and example diversity.
2. **Shape fallback** — if no templates emerge, group by sentence length and ending punctuation (`period`, `?`, `!`).
3. **Aggregate** — vocabulary, punctuation, template entropy, and optional **SVO-style** pivot analysis over template examples.

Logs use line templates only; `log_metadata` covers line endings and timestamp heuristics instead.

## `WritingFootprint` fields

```json
{
  "vocabulary_richness": 0.42,
  "avg_sentence_length": 18.3,
  "template_diversity": 27,
  "avg_entropy": 0.61,
  "punctuation": {
    "period_percent": 72.5,
    "question_percent": 4.1,
    "exclamation_percent": 0.8,
    "dialogue_percent": 12.0,
    "avg_commas_per_sentence": 1.4
  },
  "svo_analysis": {
    "svo_structure_percent": 38.0,
    "avg_subject_length": 5.2,
    "avg_object_length": 8.1,
    "common_pivots": ["is", "was", "has"]
  }
}
```

| Field | Meaning |
|-------|---------|
| `vocabulary_richness` | Unique words ÷ total words (0.0–1.0) |
| `avg_sentence_length` | Mean words per sentence |
| `template_diversity` | Count of distinct template patterns |
| `avg_entropy` | Mean placeholder variation across templates (0.0–1.0; higher = more varied wording in slots) |
| `punctuation` | Sentence-ending and dialogue punctuation profile (see below) |
| `svo_analysis` | Optional inferred subject–verb–object structure from template pivots |

### `punctuation` object

| Field | Meaning |
|-------|---------|
| `period_percent` | Share of sentences ending with `.` |
| `question_percent` | Share ending with `?` |
| `exclamation_percent` | Share ending with `!` |
| `dialogue_percent` | Share containing quotes |
| `avg_commas_per_sentence` | Mean commas per sentence |

### `svo_analysis` object (optional)

Present when the analyzer finds enough pivot structure in template examples:

| Field | Meaning |
|-------|---------|
| `svo_structure_percent` | Share of templates with pivot-like structure |
| `avg_subject_length` | Mean words before pivot |
| `avg_object_length` | Mean words after pivot |
| `common_pivots` | Frequent pivot tokens (often verbs or structural words) |

Related: [Template mining overview](/zahirscan/templates/), [Metadata extraction](/zahirscan/metadata).
