# Library

Use ZahirScan from Rust to drive batch jobs, custom pipelines, or embedding in tools like UBLX.

**API reference:** [docs.rs/zahirscan](https://docs.rs/zahirscan) — `ZahirScanResult`, `Output`, `OutputSink`, `Template`, `WritingFootprint`, and per-format metadata types.

## Collect all outputs

```rust
use zahirscan::{extract_zahir, OutputMode, OutputSink};

let result = extract_zahir(
    "file.log",
    OutputMode::Full,
    None,
    None,
    &OutputSink::Collect,
)?;
// result.outputs, result.phase1_failed, result.phase2_failed
```

## Stream-only (bounded memory)

```rust
use std::sync::{Arc, Mutex};
use zahirscan::{extract_zahir, OutputMode, OutputSink};

let collected = Arc::new(Mutex::new(Vec::new()));
let c = Arc::clone(&collected);
let sink = OutputSink::StreamOnly(Box::new(move |path, out| {
    c.lock().unwrap().push((path, out));
}));
let result = extract_zahir(
    ["a.log", "b.log"],
    OutputMode::Full,
    None,
    None,
    &sink,
)?;
// result.outputs is empty; see collected
```

## Streaming input paths

```rust
use std::sync::mpsc;
use zahirscan::{extract_zahir_from_stream, OutputMode, OutputSink};

let (tx, rx) = mpsc::channel();
// producer sends paths, then drops tx
let result = extract_zahir_from_stream(
    &rx,
    OutputMode::Full,
    None,
    None,
    &OutputSink::Collect,
)?;
```

## Inputs & config

- **Paths:** single (`&str`, `String`) or multiple (`&[&str]`, `Vec<String>`, …)
- **Config:** `None` → embedded default; `Some(&config)` → custom `RuntimeConfig`
- **Output dir:** optional path for CLI-style file writes from library calls

Sinks and batching interact with [Architecture](/zahirscan/architecture) path batches the same way as the CLI.
