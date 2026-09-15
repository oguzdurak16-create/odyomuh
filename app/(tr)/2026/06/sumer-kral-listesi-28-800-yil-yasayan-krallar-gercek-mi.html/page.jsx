import ContentPage from '../../../[...slug]/page';

const slug = [
  '2026',
  '06',
  'sumer-kral-listesi-28-800-yil-yasayan-krallar-gercek-mi.html',
];
const canonical = '/2026/06/sumer-kral-listesi-28-800-yil-yasayan-krallar-gercek-mi.html';
const title = 'Sümer Kral Listesi: Krallar Neden Binlerce Yıl Hüküm Sürdü?';
const description = 'Sümer Kral Listesi’nde krallar neden 28.800 yıl hüküm sürüyor? Tufan öncesi hükümdarları, sayı sistemini ve tarih ile mit arasındaki farkı inceleyin.';

export const metadata = {
  title,
  description,
  keywords: [
    'Sümer Kral Listesi',
    'Sümer kralları',
    'tufan öncesi krallar',
    'Alulim',
    'Sümer sayı sistemi',
  ],
  alternates: { canonical },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'article',
    title,
    description,
    url: canonical,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function Page() {
  return ContentPage({ params: { slug } });
}
