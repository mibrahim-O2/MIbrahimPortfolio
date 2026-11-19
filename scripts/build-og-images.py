"""Builds the 1200x630 JPEG share images (Open Graph): public/og-image.jpg (homepage and pages without
their own) and one per published project.

Run after adding or changing a project screenshot:  python3 scripts/build-og-images.py
Output: public/og-image.jpg and public/og/<project-id>.jpg  (JPEG on purpose: LinkedIn does not show WebP previews)
Needs Pillow and the Inter font (any bold sans works: change FONT_BOLD / FONT_REG).
"""
import json, re, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'og'
FONT_BOLD = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
FONT_REG = '/usr/share/fonts/opentype/inter/Inter-Medium.otf'
BG = (11, 7, 6)          # charcoal  (styles/globals.css --bg)
COPPER = (255, 106, 43)  # infrared  (--accent)
TEXT = (246, 238, 234)   # --text
MUTED = (184, 169, 162)  # --text-muted

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


# ---- Default share image: name, role, headline, the thermal terrain poster and the portrait ----
def default_image():
    W, H = 1200, 630
    canvas = Image.new('RGB', (W, H), BG)
    terrain = Image.open(ROOT / 'scripts/assets/thermal-poster.webp').convert('RGB')
    tw = 1200; th = round(tw * terrain.height / terrain.width)
    terrain = terrain.resize((tw, th), Image.LANCZOS)
    # fade the terrain in from the left so the text stays clean
    mask = Image.linear_gradient('L').rotate(90).resize((tw, th))
    mask = mask.point(lambda v: max(0, min(255, int((v - 70) * 1.9))))
    canvas.paste(terrain, (0, H - th + 40), mask)
    d = ImageDraw.Draw(canvas)
    small = ImageFont.truetype(FONT_REG, 22)
    d.rounded_rectangle((72, 64, 116, 108), radius=10, fill=COPPER)
    d.text((80, 73), 'MI', font=ImageFont.truetype(FONT_BOLD, 22), fill=(28, 7, 0))
    d.text((132, 72), 'Muhammad Ibrahim', font=ImageFont.truetype(FONT_BOLD, 26), fill=TEXT)
    d.text((72, 172), 'AGENTIC AI & AUTOMATION ENGINEER', font=small, fill=COPPER)
    big = ImageFont.truetype(FONT_BOLD, 60)
    y = 214
    for parts in [[('I build ', TEXT), ('AI agents', (255, 154, 60))], [('and automation that', TEXT)], [('businesses can', TEXT)], [('actually trust.', TEXT)]]:
        x = 72
        for text, color in parts:
            d.text((x, y), text, font=big, fill=color); x += d.textlength(text, font=big)
        y += 70
    portrait = Image.open(ROOT / 'public/images/profile/portrait.jpg').convert('RGB').resize((300, 300), Image.LANCZOS)
    pm = Image.new('L', (300, 300), 0); ImageDraw.Draw(pm).rounded_rectangle((0, 0, 299, 299), radius=24, fill=255)
    d.rounded_rectangle((826, 94, 1130, 398), radius=26, outline=(70, 45, 36), width=2)
    canvas.paste(portrait, (828, 96), pm)
    d.text((W - 72 - d.textlength('mibrahimdev.tech', font=small), H - 64), 'mibrahimdev.tech', font=small, fill=COPPER)
    canvas.save(ROOT / 'public' / 'og-image.jpg', quality=86, optimize=True, progressive=True)
    print('og default')

default_image()
