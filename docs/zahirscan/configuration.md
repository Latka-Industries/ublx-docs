# Configuration

## CLI overlay

The CLI merges an **embedded default** with a user file (only keys in the user file override):

| Platform | Path |
|----------|------|
| macOS / Linux | `~/.config/zahirscan/zahirscan.toml` or `$XDG_CONFIG_HOME/zahirscan/zahirscan.toml` |
| Windows | `%APPDATA%\zahirscan\zahirscan.toml` |

```bash
zahirscan init   # write embedded default to edit
```

Full schema: [config.toml in the zahirscan repo](https://github.com/Latka-Industries/zahirscan/blob/main/config.toml).

## Library

`extract_zahir(..., config: None, ...)` uses the embedded default only — no file I/O.

Pass `Some(&config)` for a custom `RuntimeConfig`; `RuntimeConfig::new()` matches the embedded default. File overlay is CLI-only via `setup::load_config()`.

## File filtering (`[filter]`)

| Key | Effect |
|-----|--------|
| `ignore_patterns` | Skip basenames: exact (`.DS_Store`), suffix (`*.swp`), prefix (`prefix*`) |
| `ignore_hidden_files = true` | Skip Unix hidden files (basename starts with `.`) |

## Adaptive batching

Documented in depth in the upstream README **Configuration** section. Summary:

- Phase 2 chunk sizes scale with Phase 1 file count, mean size, and variance
- Rayon `with_min_len` avoids oversaturating the pool on very large task lists
- `max_workers = 0` picks a sensible CPU-based default

See [Architecture](/zahirscan/architecture) for how phases interact with batches.
