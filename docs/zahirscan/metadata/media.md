---
outline: deep
---

# Media metadata

Rich **video** and **audio** metadata needs **ffprobe** on `PATH`. Raster images use built-in header readers. **SVG** (still `FileType::Image`) parses root `width` / `height` / `viewBox` for absolute sizes (unitless or `px`); percentages and other CSS units are left unknown. Unknown dimensions are **omitted from JSON** — ZahirScan does not emit placeholder `0×0`.

## `image_metadata`

| Field                | Meaning                                                                           |
| -------------------- | --------------------------------------------------------------------------------- |
| `width`, `height`    | Pixel dimensions when known; omitted from JSON when unknown (including fluid SVG) |
| `aspect_ratio`       | Width ÷ height when both dimensions are known                                     |
| `stream_size`        | File size in bytes                                                                |
| `format`             | Detected format (e.g. `Jpeg`, `Png`, `Svg`)                                       |
| `color_type`         | e.g. `Rgb8`, `Rgba8`, `L8` (raster)                                               |
| `chroma_subsampling` | JPEG only (e.g. `4:2:0`)                                                          |
| `compression`        | Format-specific compression note                                                  |
| `bit_depth`          | Bits per sample/channel                                                           |

## `video_metadata`

| Field                                                                                                           | Meaning                                  |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `width`, `height`, `aspect_ratio`                                                                               | Display dimensions                       |
| `display_aspect_ratio`, `sample_aspect_ratio`                                                                   | DAR / pixel aspect (SAR)                 |
| `coded_width`, `coded_height`                                                                                   | Encoded frame size (may include padding) |
| `duration_seconds`, `frame_rate`, `frame_count`                                                                 | Timing                                   |
| `video_codec`, `video_codec_profile`, `video_codec_level`                                                       | Video stream                             |
| `pixel_format`, `bit_depth`, `color_space`, `chroma_subsampling`, `scan_type`                                   | Pixel layout                             |
| `bitrate`, `video_bitrate`, `bitrate_mode`                                                                      | Overall and video bitrates               |
| `has_b_frames`, `video_language`, `creation_time`                                                               | Encoding flags and tags                  |
| `audio_codec`, `audio_bitrate`, `audio_channels`, `audio_channel_layout`, `audio_sample_rate`, `audio_language` | Embedded audio stream                    |
| `container_format`, `format_name`, `format_long_name`                                                           | Container probe                          |
| `file_size`, `stream_count`                                                                                     | File and stream counts                   |

## `audio_metadata`

| Field                                                                                           | Meaning                                        |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `duration_seconds`                                                                              | Track length                                   |
| `audio_codec`, `audio_codec_profile`                                                            | Codec and profile                              |
| `audio_bitrate`, `audio_channels`, `audio_channel_layout`, `audio_sample_rate`                  | Stream layout                                  |
| `container_format`, `audio_stream_size`                                                         | Container and stream size                      |
| `title`, `artist`, `album`, `album_artist`, `track`, `track_total`, `year`, `genre`, `comments` | Tags (ID3, etc.)                               |
| `bit_depth`, `compression_mode`, `encoded_library`, `bit_rate_mode`                             | Encoding details                               |
| `creation_time`, `audio_language`                                                               | Dates and language                             |
| `artwork`                                                                                       | Nested image summary when cover art is present |

Related: [Metadata overview](/zahirscan/metadata/), [Supported formats](/zahirscan/formats).
