# Images: Where, What Size, How to Reference

All images the site serves live in the **`public/`** folder. A file at `public/logos/UOSlogo.png` is
available on the site as **`/logos/UOSlogo.png`**. You always **drop `public`** and start with `/`.

## Folders

| Folder | Used for | Referenced from |
|---|---|---|
| `public/images/projects/` | Project screenshots (create it with your first upload) | `image`, `heroBanner` in `data/projects.js` |
| `public/logos/` | Organisation logos and campus photos | `data/experience.js`, `data/education.js`, `data/certificates.js`, `data/volunteer.js` |
| `public/certificates/` | Certificate images | `image` in `data/certificates.js` |
| `public/gallery/` | Gallery photos (`/gallery` page, homepage marquee) | Found automatically, see [Gallery](#gallery-photos) |
| `public/og-image.jpg` | Link preview image (WhatsApp, LinkedIn, X) | `app/layout.js` |
| `public/favicon.png` | Browser tab icon | `app/layout.js` |
| `public/IntroVideo.mp4` | Hero intro video (to be removed in the redesign) | `sections/HeroSection.js` |

## Recommended formats and sizes

| Image | Format | Size (px) | Target file size |
|---|---|---|---|
| Project screenshot | WebP | 1600×1000 (16:10), landscape | ≤ 300 KB |
| Logo | PNG (transparent) or WebP | 200×200 to 400×400, square | ≤ 50 KB |
| Campus / banner photo | WebP | 1200×600 | ≤ 250 KB |
| Certificate | WebP | ~1600 wide | ≤ 300 KB |
| Gallery photo | WebP | max 1600 on the long side | ≤ 300 KB |
| Profile portrait | WebP | 800×800 or 800×1000 | ≤ 150 KB |
| Open Graph image | **JPG** (LinkedIn doesn't render WebP) | exactly 1200×630 | ≤ 300 KB |

Large images make the site slow on mobile data. Several logos in `public/logos/` are currently 1–2 MB and
will be compressed during the redesign.

**Converting on a phone:** use a free web tool such as <https://squoosh.app> (choose WebP, quality ~75,
resize) and save the result before uploading.

## Naming rules

- **lowercase**, words separated by **dashes**, no spaces: `bin-khalid-dairy-v2.webp`
- Project screenshots: name = project `id` (e.g. `neurocode.webp`, `neurocode-mobile.webp`)
- Certificates: name = certificate `id`
- Never use spaces, `#`, `?`, `&` or brackets in file names.

**Case matters.** Vercel's servers treat `Logo.png` and `logo.png` as different files. The reference in the
data file must match the real file name exactly. (Some older logos use capitals, e.g. `IMCSLogo.png`. That's
fine as long as the reference matches.)

## Uploading from your phone (GitHub app or github.com)

1. Open the repository on github.com in your mobile browser (the GitHub app can't upload binary files).
2. Switch to your working branch (not `main`).
3. Go into the folder, e.g. `public/images/projects/`. If it doesn't exist, go to `public/`, tap
   **Add file → Upload files**, and type `images/projects/` before the file name.
4. Upload, write a commit message ("Add NeuroCode screenshot"), commit to the branch.
5. Update the data file to point at it (or ask the AI agent to).

## Replacing an existing image

- **Same file name:** upload the new file with the same name into the same folder. GitHub replaces it.
  No code change needed.
- **New file name:** upload the new file, change the path in the data file, then delete the old file.

Browsers may cache the old image for a while. If the Preview still shows the old one, reload or open it in a
private tab.

## Gallery photos

The gallery reads `public/gallery/` **at build time**:

1. Upload a `.webp` photo to `public/gallery/` with a descriptive kebab-case name. The **caption is made from
   the file name** (`sports-gala-2025-team.webp` → "Sports Gala 2025 Team").
2. **The category comes from words in the file name**, using the `keywords` in `data/gallery.js`
   (`gala`, `exhibition`, `trip`, `lab`; anything else goes to "Moments").
3. Add the exact file name to the `galleryFileNames` list in `utils/galleryLoader.js` (alphabetical).
   This list is the fallback the page shows first, so keep it in sync with the folder.
4. Optional: to show it in the highlights (About section and homepage marquee), add its name without the
   extension to `highlightOrder` in `data/gallery.js`. Tall photos must also be added to `portraitPhotos`.

To remove a gallery photo, delete the file and remove it from `galleryFileNames` (and `highlightOrder` /
`portraitPhotos` if listed).

## External images

A full `https://…` URL also works in data files (several projects still use `images.unsplash.com` stock
photos, and the avatar comes from GitHub). Local files are preferred: they are faster and never disappear.

## Common mistakes

| Mistake | Fix |
|---|---|
| `"public/logos/x.png"` | `"/logos/x.png"` |
| `"logos/x.png"` (no leading slash) | `"/logos/x.png"` |
| Uploading a 6 MB photo straight from the camera | Resize and convert to WebP first |
| File name with spaces | Rename to kebab-case before uploading |
| Gallery photo added to the folder but not to `galleryFileNames` | Add it to the list |
