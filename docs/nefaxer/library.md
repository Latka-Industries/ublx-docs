# Library

Use Nefaxer from Rust for programmatic indexing and diffing. Full API: [docs.rs/nefaxer](https://docs.rs/nefaxer).

## Entry point

**`nefax_dir(root, opts, existing, on_entry)`** → `Result<(Nefax, Diff)>`

| Argument | Purpose |
|----------|---------|
| `root` | Directory to index |
| `opts` | `NefaxOpts` (threads, hash, excludes, …) |
| `existing` | `None` for fresh run (diff = all added); `Some(&nefax)` to diff against a prior snapshot |
| `on_entry` | `None` for batch; `Some(callback)` for streaming each `Entry` as it’s ready |

Keep callbacks fast — they run on the consumer thread (or forward to a channel).

**`tuning_for_path(path, available_threads)`** → `(num_threads, drive_type, use_parallel_walk)` for `NefaxOpts` without re-probing the drive.

**`validate_nefax(&nefax)`** — fail-early validation before passing a loaded table as `existing`.

## Types

```rust
pub type Nefax = HashMap<PathBuf, PathMeta>;

pub struct PathMeta {
    pub mtime_ns: i64,
    pub size: u64,
    pub hash: Option<[u8; 32]>,
}

pub struct Entry {
    pub path: PathBuf,
    pub mtime_ns: i64,
    pub size: u64,
    pub hash: Option<[u8; 32]>,
}

pub struct Diff {
    pub added: Vec<PathBuf>,
    pub removed: Vec<PathBuf>,
    pub modified: Vec<PathBuf>,
}
```

## NefaxOpts highlights

- `num_threads`, `drive_type`, `use_parallel_walk` — set all three (e.g. from `tuning_for_path`) to **skip** drive detection
- `with_hash` — Blake3 per file
- `follow_links`, `exclude`, `mtime_window_ns`
- `strict`, `paranoid`

## Examples

```rust
use nefaxer::{nefax_dir, validate_nefax, NefaxOpts, tuning_for_path};
use std::path::Path;

// Fresh index, batch
let (nefax, diff) = nefax_dir(Path::new("/some/dir"), &NefaxOpts::default(), None, None)?;

// Diff against prior snapshot
// let prior: Nefax = /* load from your DB */;
// validate_nefax(&prior)?;
// let (nefax, diff) = nefax_dir(path, &opts, Some(&prior), None)?;

// Streaming callback
let (nefax, diff) = nefax_dir(
    Path::new("/some/dir"),
    &opts,
    None,
    Some(|e: &nefaxer::Entry| { /* progress, forward to ZahirScan, etc. */ }),
)?;

// Reuse drive tuning
let (n, dt, pw) = tuning_for_path(Path::new("/some/dir"), None);
let opts = NefaxOpts {
    num_threads: Some(n),
    drive_type: Some(dt),
    use_parallel_walk: Some(pw),
    ..Default::default()
};
let (nefax, _) = nefax_dir(Path::new("/some/dir"), &opts, None, None)?;
```

## Advanced

`nefaxer::check` provides `diff_from_stream` and `diff_from_stream_with_callback` on `crossbeam_channel::Receiver<Entry>` (by reference).
