# Nefaxer

[Nefaxer](https://github.com/Latka-Industries/nefaxer) is the directory indexer behind UBLX. It walks trees in parallel, stores metadata in SQLite, and diffs against a previous snapshot.

## Role in the stack

```
Directory → Nefaxer (index + diff) → UBLX (browse) → ZahirScan (enrich)
```

UBLX drives the workflow; Nefaxer handles the fast path catalog and snapshot storage under your user cache.

## API

Rust crate docs: [docs.rs/nefaxer](https://docs.rs/nefaxer)

::: info
Detailed architecture docs coming soon.
:::
