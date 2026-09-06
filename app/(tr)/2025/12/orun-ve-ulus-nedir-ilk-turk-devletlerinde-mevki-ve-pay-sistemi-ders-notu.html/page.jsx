import ContentPage from '../../../[...slug]/page';

const slug = [
  '2025',
  '12',
  'orun-ve-ulus-nedir-ilk-turk-devletlerinde-mevki-ve-pay-sistemi-ders-notu.html',
];
const canonical = '/2025/12/orun-ve-ulus-nedir-ilk-turk-devletlerinde-mevki-ve-pay-sistemi-ders-notu.html';
const title = 'Orun ve Ülüş Nedir? İlk Türk Devletlerinde Kısa Anlatım';
const description = 'Orun, kurultay ve toyda mevki ve oturma sırasını; ülüş ise pay ve hisseyi ifade eder. İlk Türk devletlerinde anlamını kısa örneklerle öğrenin.';

export const metadata = {
  title,
  description,
  keywords: [
    'orun nedir',
    'ülüş nedir',
    'orun ve ülüş',
    'orun ülüş nedir',
    'ilk türklerde orun ve ülüş',
    'orun ve ulus nedir',
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
    title: 'Orun ve Ülüş Nedir? İlk Türklerde Mevki ve Pay',
    description,
    url: canonical,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orun ve Ülüş Nedir? İlk Türklerde Mevki ve Pay',
    description,
  },
};

export default function Page() {
  return ContentPage({ params: { slug } });
}
