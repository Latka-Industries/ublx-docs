# CLI

```bash
zahirscan --help
```

```
Template mining for text/logs and metadata extraction for media, documents, archives, and more

Usage: zahirscan [OPTIONS] [COMMAND]

Commands:
  init  Write default config to XDG config dir (~/.config/zahirscan/zahirscan.toml or equivalent)
  help  Print this message or the help of the given subcommand(s)

Options:
  -i, --input <INPUT>...  Input file(s) to parse (can specify multiple)
  -o, --output <OUTPUT>   Output folder path (defaults to temp file if not specified). Creates filename.zahirscan.out in the folder for each input file
  -f, --full              Output mode: full metadata (for development/debugging). Default is templates-only mode (minimal JSON with templates & writing footprint)
  -d, --dev               Development mode: enables debug logging. Default is production mode (info level only). This disables progress bars if enabled
  -r, --redact            Redact file paths in output (show only filename as ***/filename.ext). Useful for privacy when sharing output JSON
  -n, --no-media          Skip media metadata extraction (audio, video, image). Faster processing when metadata is not needed
  -p, --progress          Show progress bars during processing. This is ignored if dev mode is enabled
  -h, --help              Print help
  -V, --version           Print version
```

## Synopsis

| Invocation | Behavior |
|------------|----------|
| `zahirscan -i FILE ...` | Run Phase 1 + Phase 2 on each input path |
| `zahirscan init` | Write embedded default config to the user config dir for editing |
| `zahirscan --help` / `zahirscan help` | Global or subcommand help |

No subcommand is required for parsing — pass one or more `-i` paths and optional flags.

## Commands

### `init`

Writes the embedded default [config.toml](https://github.com/Latka-Industries/zahirscan/blob/main/config.toml) to the XDG config location so you can override settings without rebuilding.

| Platform | Path |
|----------|------|
| macOS / Linux | `~/.config/zahirscan/zahirscan.toml` or `$XDG_CONFIG_HOME/zahirscan/zahirscan.toml` |
| Windows | `%APPDATA%\zahirscan\zahirscan.toml` |

The CLI merges this file over the embedded default on each run. The library API does not read the file unless you load config yourself — see [Configuration](/zahirscan/configuration).

## Options

| Flag | Description |
|------|-------------|
| `-i, --input <INPUT>...` | **Required for a parse run.** One or more files or directories to process. Repeat `-i` or pass multiple paths after a single `-i`. |
| `-o, --output <OUTPUT>` | Directory for output files. Each input basename gets `{name}.zahirscan.out` inside this folder. If omitted, output goes to a **temporary directory** (see your system temp). |
| `-f, --full` | **Full** output mode: everything in templates-only mode **plus** file statistics, processing time, and before/after size comparison. Intended for development and debugging. |
| *(default)* | **Templates-only** mode: minimal JSON with templates, writing footprint (text/markdown/HTML), and per-format metadata where the pipeline produces it. |
| `-d, --dev` | Debug logging (`trace`/`debug` level). **Disables progress bars** even when `-p` is set. |
| `-r, --redact` | Replace directory prefixes in JSON paths with `***/filename.ext` so shared artifacts do not leak full paths. |
| `-n, --no-media` | Skip image, video, and audio metadata probes (faster when you only need text/tabular/document formats). |
| `-p, --progress` | Show progress bars during processing. Ignored when `-d` / `--dev` is enabled. |
| `-h, --help` | Print help. |
| `-V, --version` | Print version. |

## Output modes

| Mode | Flags | JSON contains |
|------|-------|----------------|
| **Templates** (default) | *(none)* | Templates, writing footprint, and format metadata (see [Supported formats](/zahirscan/formats) and [Metadata](/zahirscan/metadata)) |
| **Full** | `-f` / `--full` | Templates mode **plus** per-file stats, timing, and compressed vs raw size comparison |

UBLX stores Zahir JSON from enhance runs in its catalog cache. For headless export from UBLX, see [CLI](/cli) and [Headless snapshot + export](/guides/headless-snapshot-export).

## Examples

Write config, then parse a log with an explicit output folder:

```bash
zahirscan init
zahirscan -i application.log -o ./zahir-out
# → ./zahir-out/application.log.zahirscan.out
```

Several inputs in one run:

```bash
zahirscan -i a.log -i b.json -i report.pdf -o ./batch-out
```

Full metadata for debugging a CSV:

```bash
zahirscan -i data.csv -f -o ./out
```

Share results without leaking home-directory paths:

```bash
zahirscan -i /home/user/project.log -r -o ./shared
```

Text and tabular only (skip ffprobe and image probes):

```bash
zahirscan -i mixed/ -n -o ./out
```

Verbose logging while iterating on a parser:

```bash
zahirscan -d -i sample.epub -f -o ./debug-out
```

Progress in production-style runs:

```bash
zahirscan -p -i large_tree/ -o ./out
```

## Related

- [Install](/zahirscan/install) — features, NetCDF, `ffprobe`
- [Configuration](/zahirscan/configuration) — `zahirscan.toml`, filtering, adaptive batching
- [Library](/zahirscan/library) — `extract_zahir`, sinks, streaming
- [UBLX integration](/zahirscan/ublx) — batch vs on-demand enhance in the catalog
