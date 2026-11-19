import { buildMetadata } from '@/utils/seo';

export const metadata = buildMetadata({
  title: 'Gallery | Muhammad Ibrahim',
  description: 'Photos of Muhammad Ibrahim from university, project exhibitions, sports galas, volunteering and trips.',
  path: '/gallery'
});

export default function GalleryLayout({ children }) {
  return children;
}
