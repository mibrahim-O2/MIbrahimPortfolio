import { categoryForFile, categoryLabel, highlightOrder, portraitPhotos } from '@/data/gallery';

// Files in public/gallery/ (exact on-disk names; servers are case-sensitive), sorted by name.
// The API route scans the folder at request time; this list is the client-safe fallback built from the same folder.
// Keep it in sync when photos are added to or removed from public/gallery/ (run the check in the README of this task).
export const galleryFileNames = [
  'armed-forces-exhibition-2025.webp',
  'exhibition-2026.webp',
  'exhibition-memory.webp',
  'first-day-at-uos-2023.webp',
  'gala-2024.webp',
  'gala-2025-winning-highlights.webp',
  'gala-team-2024.webp',
  'group-picture-2023.webp',
  'group-picture-of-class.webp',
  'imcs-image.webp',
  'imcs-sports-gala-2025.webp',
  'lab-time.webp',
  'learning-carnival-2018-2.webp',
  'learning-carnival-2018.webp',
  'piaic-student.webp',
  'received-pm-laptop-2023.webp',
  'school-trip-2019.webp',
  'sports-gala-2023.webp',
  'sports-gala-2025-team.webp',
  'sports-gala-2025-volunteer-card.webp',
  'team-support.webp',
  'trip-2025.webp',
  'uos-image.webp',
  'volunteer-gala-2025.webp'
];

export const baseName = (file) => file.replace(/\.[a-z0-9]+$/i, '').toLowerCase();
const VIDEO_EXT = /\.(mp4|webm)$/i;

// Known acronyms that appear in file names (kept upper-case in captions)
const ACRONYMS = new Set(['uos', 'imcs', 'piaic', 'pm']);

// Caption from the file name only: kebab-case -> Title Case.
export function titleFromFileName(filename) {
  return filename
    .replace(/\.[a-z0-9]+$/i, '')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => (ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}

// One gallery item from a file name. Used by both the API route and the fallback list so they always agree.
export function buildGalleryItem(file) {
  const category = categoryForFile(file);
  return {
    id: `g-${file.replace(/\.[a-z0-9]+$/i, '')}`,
    filename: file,
    src: `/gallery/${encodeURIComponent(file)}`,
    title: titleFromFileName(file),
    category,
    categoryLabel: categoryLabel(category),
    isVideo: VIDEO_EXT.test(file),
    aspect: portraitPhotos.includes(baseName(file)) ? 'portrait' : 'landscape'
  };
}

export const compareFileNames = (a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0);

// The 11 highlights first (in highlightOrder), then every other photo sorted by name.
export function orderGalleryFiles(files) {
  const sorted = [...files].sort(compareFileNames);
  const first = highlightOrder.map((id) => sorted.find((file) => baseName(file) === id)).filter(Boolean);
  return [...first, ...sorted.filter((file) => !first.includes(file))];
}

export const fallbackGalleryItems = orderGalleryFiles(galleryFileNames).map((file) => buildGalleryItem(file));

// Highlight items only, in display order (About deck + home marquee)
export const highlightItems = fallbackGalleryItems.slice(0, highlightOrder.length);
