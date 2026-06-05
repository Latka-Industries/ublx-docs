---
outline: deep
---

# Writing footprint

**Writing footprint** is separate from [template mining](/zahirscan/templates): it describes **style and variation in prose**, not repeating log lines or JSON keys. It is computed only for **text-like** content after template mining.

It does **not** appear for logs, JSON template runs, or metadata-only formats.

## Where it appears in JSON

| Location | When |
|----------|------|
| `writing_footprint` on `MiningResult` | Templates-only path for text-like files |
| Top-level `writing_footprint` on `Output` | Same metrics, also in templates-only export |
| `html_metadata` | HTML-specific counts **plus** footprint from body text |
| `epub_metadata` | EPUB bibliographic fields **plus** footprint from spine body |

UBLX shows this in the **Writing** pane (table layout, same family as Metadata).

## Which formats run it

| Format | Text source | SVO / pivot analysis |
|--------|-------------|----------------------|
| Plain text (`.txt`) | Full document | Yes |
| HTML | Visible body (no script/style) | Yes — body fed through plain-text pipeline |
| EPUB | Spine body text | Yes — same as HTML |
| Markdown | Paragraphs and block quotes only | No — structure templates mined separately; footprint metrics only |

Logs use line templates only; `log_metadata` covers line endings and timestamp heuristics instead.

## Pipeline

Footprint is computed **after** sentence extraction and template mining on the same (or overlapping) text.

```
Raw text
  → split into sentences
  → pivot / SVO pass (unfiltered sentences; plain text / HTML / EPUB only)
  → filter short fragments
  → n-gram & phrase frequencies
  → exact-pattern template groups
  → shape fallback if no groups survive
  → build Template objects (+ per-template entropy)
  → aggregate WritingFootprint
```

### 1. Sentence splitting

Text is normalized (trim lines, drop empty, join with spaces), then split on `.`, `?`, and `!` with heuristics:

- Skip decimals (`3.14`) and abbreviations (`Dr.`, single letter before `.`)
- Skip ellipsis (`...`)
- After punctuation, split when the next non-space character is **uppercase**; do not split when lowercase follows (likely abbreviation)
- Do not split inside parentheticals ending with `!)`

### 2. Two sentence lists

ZahirScan keeps **unfiltered** sentences for pivot detection and SVO (word positions must align). A **filtered** list drops fragments below minimum word count and length; only filtered sentences feed n-grams and templates.

If filtering removes everything, mining returns empty and there is no footprint.

### 3. Template mining (feeds `template_diversity` and `avg_entropy`)

On filtered sentences:

1. Count n-grams and multi-word phrases across all sentences.
2. Keep items that appear in at least **`text_threshold`** × sentence count (default **1%**, minimum 2 occurrences).
3. **Exact-pattern pass** — replace frequent phrases with placeholders (e.g. `[WORD:n]`); literal words stay fixed. Group sentences by the resulting pattern string.
4. Keep groups with at least **`max(2, text_threshold × sentences)`** members; skip patterns longer than 2× the average sentence length.
5. **Shape fallback** — if step 4 yields no templates, group by **word count + ending** (`.`, `?`, or `!`) and use positional placeholders `[WORD_00]`, `[WORD_01]`, …

For each surviving template, ZahirScan collects **example values** per placeholder from matching sentences, then computes **entropy** per template (see below). When entropy is in a display band, the pattern string includes `[entropy=0.61]`; footprint averages those values.

### 4. Pivot and SVO (plain text, HTML, EPUB)

Before filtering, the analyzer scans all sentences for **pivot words**: tokens that appear at the **same index** in many sentences and are followed by **varied** next words (a structural slot, often verb-like).

For each sentence where a known pivot is found at position `p`:

- **Subject length** = word count before `p`
- **Object length** = word count after `p`
- **Common pivots** = most frequent pivot tokens across the document

This is heuristic position-frequency analysis, not a POS tagger or dependency parser.

## Metric calculations

### `vocabulary_richness`

```
unique_words ÷ total_words   (over the full document text)
```

Words are whitespace-split tokens with non-alphanumeric edges stripped. Range **0.0–1.0** (type–token ratio). Higher ≈ more varied vocabulary; lower ≈ more repetition.

### `avg_sentence_length`

```
sum(words per filtered sentence) ÷ sentence_count
```

Uses the **filtered** sentence list (same set as template mining).

### `punctuation`

Computed per **filtered sentence**:

| Field | Calculation |
|-------|-------------|
| `period_percent` | % of sentences whose trimmed text ends with `.` |
| `question_percent` | % ending with `?` |
| `exclamation_percent` | % ending with `!` |
| `dialogue_percent` | % containing `"` or `'` anywhere in the sentence |
| `avg_commas_per_sentence` | total comma count ÷ sentence count |

Ending checks are mutually exclusive (period is tested first).

### `template_diversity`

Count of distinct **Template** patterns kept after grouping and minimum-count filtering (`templates.len()`).

### `avg_entropy`

For each template whose pattern includes `[entropy=X.XX]`:

1. For each placeholder’s example list, compute **Shannon entropy** of the value distribution: `−Σ p·log₂(p)`.
2. Normalize by maximum entropy `log₂(unique_count)` → **0.0–1.0**.
3. Scale down when the sample has fewer than five examples (small samples are less reliable).
4. Average across placeholders in that template.

**`avg_entropy`** is the mean of those per-template values. Higher = more varied wording in template slots; lower = slots repeat the same words. If no templates carry an entropy tag, the value is **0.0**.

### `svo_analysis` (optional)

Present for plain text, HTML, and EPUB when pivot analysis runs. **Omitted for Markdown.**

| Field | Calculation |
|-------|-------------|
| `svo_structure_percent` | % of **all sentences** (unfiltered) where a pivot was found |
| `avg_subject_length` | Mean word count before the pivot (sentences with a pivot only) |
| `avg_object_length` | Mean word count after the pivot |
| `common_pivots` | Most frequent pivot tokens (count capped by config) |

## Example JSON

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

## Field reference

| Field | Meaning |
|-------|---------|
| `vocabulary_richness` | Unique words ÷ total words (0.0–1.0) |
| `avg_sentence_length` | Mean words per filtered sentence |
| `template_diversity` | Count of distinct template patterns |
| `avg_entropy` | Mean placeholder variation across templates (0.0–1.0) |
| `punctuation` | Sentence-ending and dialogue profile |
| `svo_analysis` | Optional pivot-based structure (plain text / HTML / EPUB) |

### `punctuation` object

| Field | Meaning |
|-------|---------|
| `period_percent` | Share of sentences ending with `.` |
| `question_percent` | Share ending with `?` |
| `exclamation_percent` | Share ending with `!` |
| `dialogue_percent` | Share containing quotes |
| `avg_commas_per_sentence` | Mean commas per sentence |

### `svo_analysis` object

| Field | Meaning |
|-------|---------|
| `svo_structure_percent` | Share of sentences with a detected pivot |
| `avg_subject_length` | Mean words before pivot |
| `avg_object_length` | Mean words after pivot |
| `common_pivots` | Frequent pivot tokens |

## Templates vs footprint

| | Templates | Writing footprint |
|---|-----------|-------------------|
| Question answered | What repeats? | How does the prose read? |
| Output | Pattern strings + example lists | Scalar style metrics |
| UBLX pane | Templates | Writing |

Related: [Template mining](/zahirscan/templates), [Metadata extraction](/zahirscan/metadata/).
