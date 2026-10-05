import ContentPage from '../../../[...slug]/page';

const slug = [
  '2025',
  '12',
  'ongun-turk-boylarinin-kutsal-damgalari-ve-totem-hayvanlari.html',
];
const canonical = '/2025/12/ongun-turk-boylarinin-kutsal-damgalari-ve-totem-hayvanlari.html';
const title = 'Ongun Ne Demek? Tarihte Ongun Nedir? (KPSS Kısa Not)';
const description = 'Tarihte ongun ne demek? Eski Türklerde boylarla ilişkilendirilen kutsal veya koruyucu hayvan simgesini, damga ve totemden farkını KPSS için kısa ve net öğrenin.';

export const metadata = {
  title,
  description,
  keywords: [
    'ongun nedir',
    'ongun nedir tarih',
    'türklerde ongun ne demek',
    'türk boylarının kutsal hayvanları',
    'türk boyları damgaları',
    'ongun totem farkı',
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
  openGraph: { type: 'article', title, description, url: canonical },
  twitter: { card: 'summary_large_image', title, description },
};

export default function Page() {
  return ContentPage({ params: { slug } });
}
