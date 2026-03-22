#!/usr/bin/env python3
"""Generate responsive WebP variants for high-impact images."""

from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageOps

PHOTO_WIDTHS = (640, 1024, 1600)
LOGO_WIDTHS = (260, 520)

PHOTO_QUALITY = 88

ROOT = Path("assets")


def save_resized_webp(source: Path, widths: tuple[int, ...], quality: int | None, lossless: bool) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        source_mode = image.mode

        for width in widths:
            if image.width <= width:
                continue

            ratio = width / image.width
            height = max(1, int(round(image.height * ratio)))
            resized = image.resize((width, height), Image.Resampling.LANCZOS)

            if lossless:
                if source_mode in {"RGBA", "LA", "P"}:
                    resized = resized.convert("RGBA")
                elif resized.mode not in {"RGB", "RGBA"}:
                    resized = resized.convert("RGB")
            elif resized.mode not in {"RGB", "RGBA"}:
                resized = resized.convert("RGB")

            output = source.with_name(f"{source.stem}-{width}.webp")
            save_kwargs = {"format": "WEBP", "method": 6}
            if lossless:
                save_kwargs["lossless"] = True
            else:
                save_kwargs["quality"] = quality if quality is not None else PHOTO_QUALITY
                save_kwargs["optimize"] = True

            resized.save(output, **save_kwargs)
            print(f"wrote {output.as_posix()} ({width}w)")


def main() -> None:
    logo = ROOT / "logo-asa-prenois-bourgogne.webp"
    save_resized_webp(logo, LOGO_WIDTHS, quality=None, lossless=True)

    training_dir = ROOT / "news" / "formation-commissaire"
    for path in sorted(training_dir.glob("formation-commissaire-*.webp")):
        if any(path.stem.endswith(f"-{w}") for w in PHOTO_WIDTHS):
            continue
        save_resized_webp(path, PHOTO_WIDTHS, quality=PHOTO_QUALITY, lossless=False)


if __name__ == "__main__":
    main()
