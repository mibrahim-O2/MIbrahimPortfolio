// Data-driven keyword highlighting. Returns plain segment objects (no HTML strings),
// so callers render them as React elements and never need dangerouslySetInnerHTML.

// Highlight tones rotate in this order across the whole text: accent-soft, teal-soft, accent.
export const HIGHLIGHT_TONES = ['soft', 'teal', 'accent'];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Split one text into [{ text, match }] segments. Terms match case-insensitively; longer terms win.
export function splitByHighlights(text, terms = []) {
  const list = terms.filter(Boolean);
  if (!list.length) return [{ text, match: false }];

  const sorted = [...list].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sorted.map(escapeRegExp).join('|')})`, 'gi');

  // With a capture group, split() puts every match at an odd index.
  return text
    .split(pattern)
    .map((part, index) => ({ text: part, match: index % 2 === 1 }))
    .filter((segment) => segment.text !== '');
}

// Prepare every paragraph: segments plus a rotating `tone` and an `order` (position inside the paragraph)
// on each highlighted segment. `order` is used to stagger the underline animation.
export function buildHighlightedParagraphs(paragraphs) {
  let toneCounter = 0;
  return paragraphs.map((paragraph) => {
    let order = 0;
    const segments = splitByHighlights(paragraph.text, paragraph.highlights).map((segment) => {
      if (!segment.match) return segment;
      const tagged = { ...segment, tone: HIGHLIGHT_TONES[toneCounter % HIGHLIGHT_TONES.length], order };
      toneCounter += 1;
      order += 1;
      return tagged;
    });
    return { text: paragraph.text, segments };
  });
}
