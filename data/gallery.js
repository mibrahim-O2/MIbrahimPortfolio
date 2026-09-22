// Gallery categories used by app/api/gallery/route.js, utils/galleryLoader.js and app/gallery/page.js.
// Every photo lives in public/gallery/ as lowercase kebab-case .webp. The category of a photo is derived from the
// WORDS of its file name (case-insensitive, split on dashes), checked top to bottom; a file that matches no rule
// goes to the last category ("moments"). To add a category: add it here (keep 'moments' last) plus its keywords.
export const galleryCategories = [
  { key: 'gala', label: 'Gala', icon: 'fas fa-trophy', keywords: ['gala'] },
  { key: 'exhibitions', label: 'Exhibitions', icon: 'fas fa-lightbulb', keywords: ['exhibition', 'exhibitions'] },
  { key: 'trips', label: 'Trips', icon: 'fas fa-route', keywords: ['trip', 'trips'] },
  { key: 'lab', label: 'Lab', icon: 'fas fa-computer', keywords: ['lab'] },
  { key: 'moments', label: 'Moments', icon: 'fas fa-camera', keywords: [] }
];

export const DEFAULT_GALLERY_CATEGORY = 'moments';

export function categoryForFile(filename) {
  const words = filename.toLowerCase().replace(/\.[a-z0-9]+$/, '').split(/[^a-z0-9]+/).filter(Boolean);
  const hit = galleryCategories.find((category) => category.keywords.some((word) => words.includes(word)));
  return hit ? hit.key : DEFAULT_GALLERY_CATEGORY;
}

export function categoryLabel(key) {
  const hit = galleryCategories.find((category) => category.key === key);
  return hit ? hit.label : key;
}

// SINGLE source for the About "Gallery & Highlights" deck, the home marquee and the top of /gallery.
// File base names (no extension) of photos in public/gallery/, in display order. Every other photo follows, sorted by name.
export const highlightOrder = [
  'uos-image',
  'imcs-image',
  'piaic-student',
  'gala-2025-winning-highlights',
  'group-picture-of-class',
  'learning-carnival-2018',
  'received-pm-laptop-2023',
  'school-trip-2019',
  'sports-gala-2025-team',
  'sports-gala-2025-volunteer-card',
  'trip-2025'
];

// Photos that are taller than wide (used for the marquee card shape)
export const portraitPhotos = [
  'armed-forces-exhibition-2025',
  'exhibition-2026',
  'exhibition-memory',
  'gala-2025-winning-highlights',
  'lab-time',
  'sports-gala-2025-volunteer-card'
];
