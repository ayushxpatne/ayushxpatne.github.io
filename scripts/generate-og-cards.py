"""Render the 1200x630 Open Graph card for every page.

Titles come from the pages themselves — post front matter, the standalone
write-ups' <title> — so nothing here is typed twice. Re-run after adding or
renaming a page:

    python3 scripts/generate-og-cards.py

Needs Pillow, plus fonttools[woff] to unpack the site's woff2 fonts.
Cards land in assets/og/ and are referenced by each page's og:image.
"""

import pathlib
import re
import sys
import tempfile

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib.woff2 import decompress

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "og"

W, H = 1200, 630
PAD = 76
INK, MUTED, HAIR, PAPER = "#000000", "#666666", "#e5e5e5", "#ffffff"
SITE_NAME, DOMAIN = "ayush patne", "ayushpatne.com"
TITLE_SIZES = (66, 58, 50, 44, 38)
MAX_LINES = 4


def load_fonts(tmp):
    """The site ships woff2; Pillow needs ttf. Medium weight if the Mac has it."""
    faces = {}
    for name in ("inter-400", "jetbrains-mono-400"):
        ttf = tmp / f"{name}.ttf"
        decompress(str(ROOT / "assets" / "fonts" / f"{name}.woff2"), str(ttf))
        faces[name] = ttf
    medium = pathlib.Path.home() / "Library" / "Fonts" / "Inter-Medium.ttf"
    faces["title"] = medium if medium.exists() else faces["inter-400"]
    return faces


def wrap(draw, text, font, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=font) <= width or not line:
            line = trial
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def fit_title(draw, text, path, width):
    """Largest size that keeps the title within MAX_LINES."""
    for size in TITLE_SIZES:
        font = ImageFont.truetype(str(path), size)
        lines = wrap(draw, text, font, width)
        if len(lines) <= MAX_LINES:
            return font, lines, size
    return font, lines[:MAX_LINES], TITLE_SIZES[-1]


def render(kicker, title, dest, faces):
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)
    inner = W - PAD * 2

    mono = ImageFont.truetype(str(faces["jetbrains-mono-400"]), 22)
    draw.text((PAD, PAD), kicker, font=mono, fill=MUTED, spacing=4)

    foot_rule = H - PAD - 54
    draw.line([(PAD, foot_rule), (W - PAD, foot_rule)], fill=HAIR, width=2)

    name_font = ImageFont.truetype(str(faces["title"]), 26)
    draw.text((PAD, foot_rule + 20), SITE_NAME, font=name_font, fill=INK)
    domain_font = ImageFont.truetype(str(faces["jetbrains-mono-400"]), 22)
    dw = draw.textlength(DOMAIN, font=domain_font)
    draw.text((W - PAD - dw, foot_rule + 22), DOMAIN, font=domain_font, fill=MUTED)

    font, lines, size = fit_title(draw, title, faces["title"], inner)
    leading = int(size * 1.18)
    block = leading * len(lines)
    y = foot_rule - 56 - block
    for line in lines:
        draw.text((PAD, y), line, font=font, fill=INK)
        y += leading

    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG", optimize=True)
    return size


def front_matter(path):
    text = path.read_text()
    if not text.startswith("---"):
        return {}
    block = text.split("---", 2)[1]
    found = {}
    for key in ("title", "permalink", "description"):
        m = re.search(rf"^{key}:\s*(.+)$", block, re.M)
        if m:
            found[key] = m.group(1).strip().strip('"').strip("'")
    return found


def slug_for(url):
    s = url.strip("/").replace("/", "-")
    return s or "home"


def collect():
    """(kicker, title, url, source file) for every page that wants a card."""
    pages = [("portfolio", "Building AI systems from research to production", "/", ROOT / "index.html"),
             ("index", "Write-ups, notes and build logs", "/blog/", ROOT / "blog.html"),
             ("index", "Projects", "/projects/", ROOT / "projects" / "index.html"),
             ("about", "Resume", "/resume/", ROOT / "resume.md")]

    for post in sorted((ROOT / "_posts").glob("*.md")):
        fm = front_matter(post)
        if not fm.get("title"):
            continue
        name = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", post.stem)
        pages.append(("blog", fm["title"], f"/blog/{name}/", post))

    for stub in sorted(ROOT.glob("projects/*/index.md")):
        fm = front_matter(stub)
        if fm.get("title") and fm.get("permalink"):
            pages.append(("write-up", fm["title"], fm["permalink"], stub))

    for page in sorted(ROOT.glob("projects/*/index.html")):
        m = re.search(r"<title>(.*?)</title>", page.read_text(), re.S)
        if m:
            pages.append(("write-up", m.group(1).strip(), f"/projects/{page.parent.name}/", page))

    return pages


def main():
    with tempfile.TemporaryDirectory() as td:
        faces = load_fonts(pathlib.Path(td))
        pages = collect()
        for kicker, title, url, src in pages:
            slug = slug_for(url)
            size = render(kicker, title, OUT / f"{slug}.png", faces)
            print(f"{slug + '.png':<34} {size}px  {title[:52]}")
        print(f"\n{len(pages)} cards -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    sys.exit(main())
