# Database schema

The default index file is **`.nefaxer`** in the indexed directory (override with `-d` / `db_path`). SQLite runs in **WAL** mode.

## Tables

```sql
CREATE TABLE paths (
    path TEXT PRIMARY KEY,
    mtime_ns INTEGER NOT NULL,
    size INTEGER NOT NULL,
    hash BLOB
);

CREATE TABLE diskinfo (
    root_path TEXT PRIMARY KEY,
    data TEXT NOT NULL
);
```

## `paths`

| Column | Description |
|--------|-------------|
| `path` | Relative path from indexed root (primary key) |
| `mtime_ns` | Modification time in nanoseconds |
| `size` | File size in bytes |
| `hash` | Optional 32-byte Blake3 digest when hashing enabled |

## `diskinfo`

Stores drive-detection / tuning metadata for the indexed root (`root_path` + JSON `data`).

## Library mapping

In Rust, a snapshot is `Nefax = HashMap<PathBuf, PathMeta>` with the same fields as `paths`. See [Library](/nefaxer/library) and [docs.rs/nefaxer](https://docs.rs/nefaxer).

## Encryption

With `--encrypt` / `encrypt = true`, the file is a SQLCipher database. Passphrase handling is described in [Configuration](/nefaxer/configuration).
