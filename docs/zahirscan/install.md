# Install

## CLI

```bash
cargo install zahirscan
```

## Library

```bash
cargo add zahirscan
```

## Without NetCDF

NetCDF (`.nc`, `.cdf`) is enabled by default via the `netcdf` feature, which links **libnetcdf**. On systems without it:

```bash
cargo install zahirscan --no-default-features
# or
cargo add zahirscan --no-default-features
```

## Optional system tools

| Tool / library | When you need it |
|----------------|------------------|
| **ffprobe** (FFmpeg) | Rich video and audio metadata |
| **libnetcdf** | Default build; disable with `--no-default-features` if unavailable |

## Initialize config

Write the embedded default config to your XDG config dir:

```bash
zahirscan init
```

Paths: [Configuration](/zahirscan/configuration).
