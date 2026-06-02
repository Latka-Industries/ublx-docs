# CLI

```bash
nefaxer [OPTIONS] [DIR]
```

Index a directory (default): creates or updates `.nefaxer` in `DIR`.

```bash
nefaxer --dry-run [OPTIONS] [DIR]
```

Compare to the existing index and report added / removed / modified paths **without** writing to the database.

## Options

| Option | Short | Description |
|--------|-------|-------------|
| `--db <DB>` | `-d` | Index file path. Default: `.nefaxer` in `DIR` |
| `--dry-run` | | Diff only; do not update index |
| `--list` | `-l` | List each changed path. If changes &gt; 100, writes `nefaxer.results` instead of stdout |
| `--verbose` | `-v` | Verbose output and progress bar |
| `--check-hash` | `-c` | Compute Blake3 per file (slower, more accurate diffs) |
| `--follow-links` | `-f` | Follow symbolic links |
| `--mtime-window <SECS>` | `-m` | Mtime tolerance in seconds (default: 0) |
| `--exclude <PATTERN>` | `-e` | Exclude glob patterns (repeatable) |
| `--encrypt` | `-x` | Encrypt index with SQLCipher; passphrase via prompt, `NEFAXER_DB_KEY`, or `.env` |
| `--strict` | | Fail on first permission / access error |
| `--paranoid` | | With `-c`: re-hash when hash matches but mtime/size differ |

## Examples

Index with hashing and custom excludes:

```bash
nefaxer -c -e node_modules -e .git /path/to/project
```

See what changed since last index:

```bash
nefaxer --dry-run -l -v /path/to/project
```

Custom database location:

```bash
nefaxer -d /var/index/myproject.nefax /path/to/project
```

## Configuration file

CLI reads `.nefaxer.toml` in the indexed directory; CLI flags override file defaults. See [Configuration](/nefaxer/configuration).
