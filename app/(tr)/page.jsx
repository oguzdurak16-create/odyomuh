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
  return (
    <>
      <style>{`
        .home-editorial-hero {
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.35fr) !important;
        }

        .home-editorial-intro h1 {
          max-width: 100% !important;
          font-size: clamp(2.45rem, 3.75vw, 4.75rem) !important;
          line-height: 1.01 !important;
          overflow-wrap: anywhere !important;
          word-break: normal;
        }

        .home-lead-story-content h2 {
          font-size: clamp(2rem, 3vw, 3.8rem) !important;
          overflow-wrap: anywhere;
        }

        @media (max-width: 1280px) {
          .home-editorial-hero {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }

          .home-editorial-intro {
            padding: clamp(32px, 6vw, 64px) !important;
          }

          .home-editorial-intro h1 {
            max-width: 13ch !important;
            font-size: clamp(2.7rem, 7.2vw, 5.2rem) !important;
          }

          .home-lead-story {
            min-height: clamp(430px, 58vw, 680px) !important;
          }
        }

        @media (max-width: 720px) {
          .home-editorial-intro h1 {
            max-width: 100% !important;
            font-size: clamp(2.15rem, 10.5vw, 3.45rem) !important;
            line-height: 1.04 !important;
          }

          .home-lead-story {
            min-height: min(125vw, 580px) !important;
          }
        }
      `}</style>
      <ProfessionalHome />
    </>
  );
}
