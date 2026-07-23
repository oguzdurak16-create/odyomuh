import { generatedArt } from '../site-data';
import ProfessionalHome from '../../components/ProfessionalHome';

export const metadata = {
  title: 'Tarih, Arkeoloji ve Kadim Uygarlıklar',
  description: 'Tarih, arkeoloji, mitoloji, antik teknoloji ve güncel olayların tarihsel arka planını kaynak odaklı dosyalarla keşfedin.',
  alternates: { canonical: '/', languages: { 'tr-TR': '/', en: '/en', 'x-default': '/en' } },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    title: 'ODYOMUH | Tarih, Arkeoloji ve Kadim Uygarlıklar',
    description: 'Kaynak odaklı tarih ve arkeoloji dosyaları, kronoloji, ders notları ve güncel araştırmalar.',
    url: '/',
    images: [{ url: generatedArt.explorerDesk, width: 1672, height: 941, alt: 'ODYOMUH dijital tarih arşivi' }],
  },
  twitter: { card: 'summary_large_image', title: 'ODYOMUH | Dijital Tarih Arşivi', description: 'Kaynak odaklı tarih ve arkeoloji dosyaları.', images: [generatedArt.explorerDesk] },
};

export default function HomePage() {
  return <ProfessionalHome />;
}
