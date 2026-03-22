#!/usr/bin/env python3
"""Convert raster assets to WebP with high visual fidelity.

- JPEG/JPG -> WebP lossy (high quality)
- PNG -> WebP lossless
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert image assets to WebP")
    parser.add_argument("--root", type=Path, default=Path("assets"), help="Root folder to scan")
    parser.add_argument("--jpg-quality", type=int, default=95, help="Quality for JPEG/JPG conversions")
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        help="Skip conversion if output .webp already exists",
    )
    return parser.parse_args()


def iter_source_files(root: Path):
    extensions = {".jpg", ".jpeg", ".png"}
    for path in sorted(root.rglob("*")):
        if path.is_file() and path.suffix.lower() in extensions:
            yield path


def to_webp(source: Path, jpg_quality: int) -> tuple[int, int]:
    output = source.with_suffix(".webp")
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        save_kwargs = {"format": "WEBP", "method": 6}

        if source.suffix.lower() == ".png":
            save_kwargs["lossless"] = True
            # Keep alpha channel for transparent PNGs.
            if image.mode in {"RGBA", "LA", "P"}:
                image = image.convert("RGBA")
        else:
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGB")
            save_kwargs["quality"] = jpg_quality
            save_kwargs["optimize"] = True

        image.save(output, **save_kwargs)

    return source.stat().st_size, output.stat().st_size


def main() -> None:
    args = parse_args()
    root = args.root

    if not root.exists() or not root.is_dir():
        raise SystemExit(f"Invalid root folder: {root}")

    converted = 0
    before_total = 0
    after_total = 0

    for source in iter_source_files(root):
        output = source.with_suffix(".webp")
        if args.skip_existing and output.exists():
            continue

        before, after = to_webp(source, args.jpg_quality)
        before_total += before
        after_total += after
        converted += 1

    delta = before_total - after_total
    ratio = (delta / before_total * 100) if before_total else 0

    print(f"Converted: {converted} file(s)")
    print(f"Input total:  {before_total:,} bytes")
    print(f"Output total: {after_total:,} bytes")
    print(f"Saved:        {delta:,} bytes ({ratio:.2f}%)")


if __name__ == "__main__":
    main()
