---
outline: deep
---

# HTML metadata

## `html_metadata`

| Field | Meaning |
|-------|---------|
| `file_size` | File size |
| `title`, `meta_description`, `lang`, `charset`, `has_viewport` | Document head |
| `link_count`, `stylesheet_count`, `script_count`, `style_count` | Resources |
| `heading_count`, `h1_count` … `h6_count` | Headings |
| `img_count`, `table_count`, `form_count`, `p_count`, `ul_count`, `ol_count` | Elements |
| `iframe_count`, `article_count`, `nav_count`, `section_count`, `header_count`, `footer_count`, `main_count` | Landmarks |
| `plain_text_len`, `word_count` | Visible body text (excludes script/style) |

Body text also feeds **`writing_footprint`** when mined — see [Writing footprint](/zahirscan/writing-footprint).

Related: [Metadata overview](/zahirscan/metadata/).
