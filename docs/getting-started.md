# Getting started

## Install UBLX

```bash
cargo install ublx
```

Or build from source:

```bash
git clone https://github.com/Latka-Industries/UBLX.git
cd UBLX
cargo install --path .
```

## First run

```bash
ublx /path/to/your/project
```

Headless snapshot (writes local config if none exists):

```bash
ublx --snapshot-only /path/to/your/project
```

## Next steps

- [Configuration](/configuration) — `enable_enhance_all`, enhance policies, themes
- [ZahirScan](/zahirscan/) — metadata extraction and export
- [Nefaxer](/nefaxer/) — how indexing and diffs work under the hood
- [Guides](/guides/) — cross-tool workflows
