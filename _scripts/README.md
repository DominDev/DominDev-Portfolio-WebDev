# \_scripts

Utility scripts for the DominDynamics portfolio project.

## Supported tooling

- `optimize-images.cjs` - optimizes raster images with `sharp`
- `optimize-video.cjs` - creates production MP4/WebM variants with `ffmpeg-static`
- `snapshot_code.ps1` - creates a code snapshot for review/reference
- `snapshot_structure.ps1` - creates a structure snapshot for review/reference
- `run-codex.ps1` - starts Codex with project-local configuration

## Source-of-truth model for media

This project uses a mirrored source pipeline:

- original media lives in `_assets-source/`
- optimized runtime assets are written into `src/assets/` and `public/`
- only optimized runtime assets are intended to be committed

The `_assets-source/` directory is git-ignored and should mirror final repo paths.

Example:

```text
_assets-source/
├── public/
│   └── og-image.png
└── src/
    └── assets/
        ├── icons/
        │   └── logo-white.png
        └── images/
            └── person-damian-mono-v2.png
```

After running the scripts, the optimized files are written to:

```text
public/og-image.png
src/assets/icons/logo-white.png
src/assets/images/person-damian-mono-v2.png
```

## Commands

### Optimize images

```bash
npm run optimize:images
```

Useful flags:

```bash
node _scripts/optimize-images.cjs --dry-run
node _scripts/optimize-images.cjs --force
```

### Optimize video

```bash
npm run optimize:video
```

Useful flags:

```bash
node _scripts/optimize-video.cjs --dry-run
node _scripts/optimize-video.cjs --force
node _scripts/optimize-video.cjs --strip-audio
```

### Snapshot scripts

```powershell
powershell -ExecutionPolicy Bypass -File .\_scripts\snapshot_code.ps1
powershell -ExecutionPolicy Bypass -File .\_scripts\snapshot_structure.ps1
```

## Notes

- Image optimization preserves the filename and extension used by the app.
- Video optimization generates production-ready `.mp4` and `.webm` files from originals stored in `_assets-source/`.
- Files outside mirrored `public/` and `src/assets/` paths are ignored on purpose.
