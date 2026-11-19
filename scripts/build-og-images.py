"""Builds a 1200x630 JPEG share image (Open Graph) for every published project.

Run after adding or changing a project screenshot:  python3 scripts/build-og-images.py
Output: public/og/<project-id>.jpg  (JPEG on purpose: LinkedIn does not show WebP previews)
Needs Pillow and the Inter font (any bold sans works: change FONT_BOLD / FONT_REG).
"""
import json, re, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'og'
FONT_BOLD = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
FONT_REG = '/usr/share/fonts/opentype/inter/Inter-Medium.otf'
BG = (18, 16, 14)
COPPER = (217, 123, 74)
TEXT = (237, 238, 240)
MUTED = (161, 167, 176)

# Read the published projects through Node, so this script never duplicates data/projects.js
js = "import('./data/projects.js').then(m=>console.log(JSON.stringify(m.publishedProjects.map(p=>({id:p.id,title:p.title,image:p.image,badge:p.badge||''})))))"
projects = json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT, stderr=subprocess.DEVNULL))
OUT.mkdir(parents=True, exist_ok=True)

def wrap(draw, text, font, width):
    words, lines, line = text.split(), [], ''
    for w in words:
        trial = (line + ' ' + w).strip()
        if draw.textlength(trial, font=font) <= width: line = trial
        else: lines.append(line); line = w
    lines.append(line)
    return lines

for p in projects:
    W, H = 1200, 630
    canvas = Image.new('RGB', (W, H), BG)
    shot = Image.open(ROOT / 'public' / p['image'].lstrip('/')).convert('RGB')
    # screenshot on the right, framed
    sw = 640; sh = round(sw * shot.height / shot.width)
    shot = shot.resize((sw, sh), Image.LANCZOS)
    x, y = W - sw - 56, (H - sh) // 2
    frame = Image.new('RGB', (sw + 2, sh + 2), (60, 54, 48))
    canvas.paste(frame, (x - 1, y - 1)); canvas.paste(shot, (x, y))
    d = ImageDraw.Draw(canvas)
    small = ImageFont.truetype(FONT_REG, 22)
    d.text((56, 64), 'CASE STUDY' + (f'  ·  {p["badge"].upper()}' if p['badge'] else ''), font=small, fill=COPPER)
    size = 54
    while True:
        big = ImageFont.truetype(FONT_BOLD, size)
        lines = wrap(d, p['title'], big, 400)
        if len(lines) <= 4 or size <= 36: break
        size -= 4
    ty = 120
    for line in lines:
        d.text((56, ty), line, font=big, fill=TEXT); ty += int(size * 1.15)
    d.text((56, H - 100), 'Muhammad Ibrahim', font=ImageFont.truetype(FONT_BOLD, 26), fill=TEXT)
    d.text((56, H - 66), 'Agentic AI & Automation Engineer', font=small, fill=MUTED)
    canvas.save(OUT / f"{p['id']}.jpg", quality=86, optimize=True, progressive=True)
    print('og', p['id'])
