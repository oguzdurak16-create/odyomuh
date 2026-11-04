import { trafficOverrides } from '../../../../../data/traffic-overrides';
import ContentPage from '../../../[...slug]/page';

const slug = [
  '2025',
  '12',
  'orun-ve-ulus-nedir-ilk-turk-devletlerinde-mevki-ve-pay-sistemi-ders-notu.html',
];
const canonical = '/2025/12/orun-ve-ulus-nedir-ilk-turk-devletlerinde-mevki-ve-pay-sistemi-ders-notu.html';
const title = trafficOverrides[canonical].seoTitle;
const description = trafficOverrides[canonical].metaDescription;

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
