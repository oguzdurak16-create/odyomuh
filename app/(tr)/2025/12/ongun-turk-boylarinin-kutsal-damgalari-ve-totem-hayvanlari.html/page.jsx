import ContentPage from '../../../[...slug]/page';

const slug = [
  '2025',
  '12',
  'ongun-turk-boylarinin-kutsal-damgalari-ve-totem-hayvanlari.html',
];
const canonical = '/2025/12/ongun-turk-boylarinin-kutsal-damgalari-ve-totem-hayvanlari.html';
const title = 'Ongun Nedir? Türk Boylarında Ongun, Damga ve Totem Farkı';
const description = 'Ongun nedir? Eski Türklerde boylarla ilişkilendirilen kutsal veya koruyucu hayvanları, damga ile farkını ve “totem” sözcüğünün neden tam karşılık olmadığını öğrenin.';

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
