# Configuration

When running the **CLI**, place `.nefaxer.toml` in the directory you index. File values are defaults; command-line flags override them.

The **library** uses `NefaxOpts` directly — no automatic TOML load unless you parse it yourself.

## Example `.nefaxer.toml`

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

## Settings

| Key | Type | Description |
|-----|------|-------------|
| `db_path` | string | Index file path (default `.nefaxer` in `DIR`) |
| `hash` | bool | Compute Blake3 (`--check-hash`) |
| `follow_links` | bool | Follow symlinks |
| `exclude` | array of strings | Glob patterns to skip |
| `list` | bool | List changed paths on diff (`--list`) |
| `verbose` | bool | Verbose output / progress |
| `mtime_window` | integer | Mtime tolerance in **seconds** |
| `strict` | bool | Fail on first access error |
| `paranoid` | bool | Re-hash on mtime/size mismatch when hashing |
| `encrypt` | bool | SQLCipher-encrypted index |

## Passphrase (encrypt)

When `encrypt = true`, use `--encrypt` / `-x` on the CLI. Passphrase from prompt, `NEFAXER_DB_KEY`, or `.env`.

## UBLX note

UBLX maintains its own per-root SQLite under the user cache (`ubli/`). Nefaxer’s `.nefaxer` format is the same family of metadata; UBLX drives indexing through the library. See [UBLX integration](/nefaxer/ublx).
