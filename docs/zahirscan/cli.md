# CLI

```bash
zahirscan --help
```

```
Template mining for text/logs and metadata extraction for media, documents, archives, and more

Usage: zahirscan [OPTIONS] [COMMAND]

Commands:
  init  Write default config to XDG config dir
  help  Print help
```

## Commands

| Command | Description |
|---------|-------------|
| `init` | Write default `zahirscan.toml` to `~/.config/zahirscan/` (or `$XDG_CONFIG_HOME`) |
| `help` | Command or global help |

## Options

| Flag | Description |
|------|-------------|
| `-i, --input <INPUT>...` | One or more input files |
| `-o, --output <OUTPUT>` | Output folder; writes `{name}.zahirscan.out` per input |
| `-f, --full` | Full metadata (dev/debug). Default is **templates-only** (minimal JSON) |
| `-d, --dev` | Debug logging; disables progress bars when combined with `-p` |
| `-r, --redact` | Redact paths in output (`***/filename.ext`) |
| `-n, --no-media` | Skip image/video/audio metadata (faster) |
| `-p, --progress` | Progress bars (ignored in dev mode) |
| `-V, --version` | Version |
| `-h, --help` | Help |

## Examples

Single file with explicit output directory:

```bash
zahirscan -i application.log -o ./zahir-out
```

Multiple inputs:

```bash
zahirscan -i a.log -i b.json -i report.pdf -o ./batch-out
```

Full metadata (includes file stats and size comparison):

```bash
zahirscan -i data.csv -f -o ./out
```

Privacy-safe sharing:

```bash
zahirscan -i /home/user/project.log -r -o ./shared
```

Skip media probes:

```bash
zahirscan -i mixed/ -n -o ./out
```

## Output modes

| Mode | Flag | JSON contains |
|------|------|----------------|
| **Templates** (default) | (none) | Templates, writing footprint (text/markdown), and per-format metadata where applicable |
| **Full** | `-f` / `--full` | Templates mode plus file statistics, processing time, before/after size comparison |

UBLX stores Zahir JSON from enhance runs; export layout is documented in [UBLX getting started](/getting-started) and [Headless snapshot + export](/guides/headless-snapshot-export).
