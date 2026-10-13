"""Shrink the demo's destination photos: PNG (~2.5 MB each) -> WebP.

Runs after `vite build --config vite.demo.config.ts`. Only touches the
../pengus-demo output; the originals in public/photos stay as they are.
"""
from pathlib import Path
from PIL import Image

PHOTOS = Path(__file__).resolve().parent.parent.parent / "pengus-demo" / "photos"
MAX_WIDTH = 800  # photos are shown inside a phone-sized frame

before = after = 0
for png in sorted(PHOTOS.glob("*.png")):
    before += png.stat().st_size
    with Image.open(png) as im:
        if im.width > MAX_WIDTH:
            im = im.resize((MAX_WIDTH, round(im.height * MAX_WIDTH / im.width)), Image.LANCZOS)
        out = png.with_suffix(".webp")
        im.save(out, "WEBP", quality=80, method=6)
    after += out.stat().st_size
    png.unlink()
    print(f"{png.name} -> {out.name} ({out.stat().st_size // 1024} KB)")

print(f"Photos: {before / 1e6:.1f} MB -> {after / 1e6:.1f} MB")
