import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { buildGalleryItem, orderGalleryFiles } from '@/utils/galleryLoader';

// Static: the folder is scanned once at build time (Vercel's function bundle does not reliably contain public/).
export const dynamic = 'force-static';

// Scans public/gallery/ when the site is built. Category and caption come from the file name
// (rules live in data/gallery.js and utils/galleryLoader.js, shared with the client fallback list).
export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');

    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json({ items: [] });
    }

    const validExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.avif', '.gif', '.mp4', '.webm'];
    const seen = new Set();

    const files = fs
      .readdirSync(galleryDir)
      .filter((file) => validExtensions.includes(path.extname(file).toLowerCase()))
      .filter((file) => {
        const key = file.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    return NextResponse.json({ items: orderGalleryFiles(files).map((file) => buildGalleryItem(file)) });
  } catch (error) {
    console.error('Error scanning gallery directory:', error);
    return NextResponse.json({ error: 'Failed to read gallery images', items: [] }, { status: 500 });
  }
}
