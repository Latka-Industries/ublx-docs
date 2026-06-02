# CLI

```bash
nefaxer --help
```

```
Index a directory; use --dry-run to compare without writing.

Usage: nefaxer [OPTIONS] [DIR]

Arguments:
  [DIR]  Directory to index. Default: current directory [default: .]

Options:
  -d, --db <DB>                        Path to nefaxer index file. Default: `.nefaxer` in DIR
      --dry-run                        Compare to index and report added/removed/modified; do not write to the index
  -l, --list [<LIST>]                  List each changed path. If total changes exceed threshold, write to nefaxer.results instead of stdout
  -v, --verbose [<VERBOSE>]            Verbose output [possible values: true, false]
  -c, --check-hash [<CHECK_HASH>]      Compute blake3 hash for files (slower but more accurate) [possible values: true, false]
  -f, --follow-links [<FOLLOW_LINKS>]  Follow symbolic links [possible values: true, false]
  -m, --mtime-window <MTIME_WINDOW>    Mtime tolerance window in seconds. Files within this window are considered unchanged
  -e, --exclude <EXCLUDE>...           Exclude patterns (glob syntax). Can specify multiple: -e pattern1 pattern2 pattern3
      --strict [<STRICT>]              Strict mode: fail on first permission error instead of skipping [possible values: true, false]
      --paranoid [<PARANOID>]          Paranoid mode: re-hash files when hash matches but mtime/size differ (detect collisions) [possible values: true, false]
  -x, --encrypt [<ENCRYPT>]            Encrypt the index database with `SQLCipher`. Prompts for passphrase (or use `NEFAXER_DB_KEY` / .env) [possible values: true, false]
  -h, --help                           Print help
```

## Synopsis

| Invocation | Behavior |
|------------|----------|
| `nefaxer [DIR]` | Walk `DIR` (default `.`), update the index database |
| `nefaxer --dry-run [DIR]` | Compare current tree to the existing index; **do not write** |
| `nefaxer -h` | Print help |

Default index path: **`.nefaxer`** in the indexed directory unless `-d` / `--db` overrides it.

## Modes

### Index (default)

Creates or updates the SQLite index (WAL mode) with paths, sizes, mtimes, and optional Blake3 hashes when hashing is enabled.

```bash
nefaxer /path/to/project
nefaxer -c -e node_modules -e .git /path/to/project
```

### Dry-run

Reports **added**, **removed**, and **modified** paths relative to the index on disk. Useful for CI checks or auditing before committing to a new snapshot.

```bash
nefaxer --dry-run /path/to/project
nefaxer --dry-run -l -v /path/to/project
```

Pair with `--list` to print every changed path (see below for the 100-path threshold).

## Options

| Option | Short | Description |
|--------|-------|-------------|
| `[DIR]` | | Directory to index. Default: current directory (`.`) |
| `--db <DB>` | `-d` | Index file path. Default: `.nefaxer` inside `DIR` |
| `--dry-run` | | Diff only; do not update the database |
| `--list [<BOOL>]` | `-l` | List each changed path on stdout. If total changes **exceed 100**, writes `nefaxer.results` in the current working directory instead of flooding the terminal. Use `-l`, `-l true`, or `-l false` (see [Boolean flags](#boolean-flags)) |
| `--verbose [<BOOL>]` | `-v` | Verbose logging and progress bar during indexing |
| `--check-hash [<BOOL>]` | `-c` | Compute **Blake3** content hash per file (slower; enables content-based diff and duplicate-style checks) |
| `--follow-links [<BOOL>]` | `-f` | Follow symbolic links when walking |
| `--mtime-window <SECS>` | `-m` | Treat mtimes within this many **seconds** as unchanged (default: `0`) |
| `--exclude <PATTERN>` | `-e` | Glob patterns to skip; repeatable (`-e node_modules -e .git`) |
| `--strict [<BOOL>]` | | Fail on the first permission or access error instead of skipping the path |
| `--paranoid [<BOOL>]` | | With hashing enabled: if hash matches but mtime/size differ, **re-hash** to detect rare collisions |
| `--encrypt [<BOOL>]` | `-x` | Encrypt the index with **SQLCipher**. Passphrase from prompt, `NEFAXER_DB_KEY`, or `.env` |
| `--help` | `-h` | Print help |

### Boolean flags

Several options accept optional `true` / `false` values (Clap `num_args = 0..=1`):

| You type | Meaning |
|----------|---------|
| `-l` or `-l true` or `--list` | Enable |
| `-l false` or `--list false` | Disable |
| *(flag omitted)* | Use default from [`.nefaxer.toml`](/nefaxer/configuration) when present, else built-in default |

Same pattern applies to `-v`, `-c`, `-f` (follow-links), `--strict`, `--paranoid`, and `-x` / `--encrypt`.

CLI flags **override** `.nefaxer.toml` defaults for that run.

## Examples

First index with hashing and common excludes:

```bash
nefaxer -c -e node_modules -e .git /path/to/project
```

Audit changes since last index:

```bash
nefaxer --dry-run -l -v /path/to/project
```

Custom index location (e.g. central store):

```bash
nefaxer -d /var/index/myproject.nefax /path/to/project
```

Encrypted index for sensitive trees:

```bash
nefaxer -x /path/to/project
# or: NEFAXER_DB_KEY=... nefaxer -x /path/to/project
```

Strict CI walk (fail on permission errors):

```bash
nefaxer --strict -c /path/to/project
```

Relaxed mtime for noisy filesystems:

```bash
nefaxer -m 2 /path/to/project
```

## Configuration file

When running the **CLI**, place `.nefaxer.toml` in the directory you index. File values are defaults; command-line flags override them.

```toml
[settings]
db_path = ".nefaxer"
hash = true
follow_links = false
exclude = ["node_modules", ".git"]
list = false
verbose = false
mtime_window = 0
strict = false
paranoid = false
encrypt = false
```

See [Configuration](/nefaxer/configuration) and [Database schema](/nefaxer/database).

## Related

- [Install](/nefaxer/install)
- [Architecture](/nefaxer/architecture) — pipeline, drive tuning
- [Library](/nefaxer/library) — `nefax_dir`, streaming callbacks
- [UBLX integration](/nefaxer/ublx) — snapshots and Delta tab
