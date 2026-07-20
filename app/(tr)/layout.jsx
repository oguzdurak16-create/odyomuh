import '../globals.css';
import { site, pages, labels, baseUrl, generatedArt } from '../site-data';
import SiteChrome from '../../components/SiteChrome';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const siteDescription = site.settings?.blog_meta_description || site.description || 'Tarih, mitoloji ve kadim uygarlıklar üzerine dijital arşiv.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.name,
  title: {
    default: 'ODYOMUH | Tarih, Mitoloji ve Kadim Uygarlıklar',
    template: `%s | ${site.name}`,
  },
  description: siteDescription,
  keywords: ['tarih', 'mitoloji', 'kadim uygarlıklar', 'arkeoloji', 'osmanlı tarihi', 'antik dünya', 'tarihi gizemler', 'İran', 'İsrail', 'Orta Doğu', 'Husiler', 'Şii Sünni farkı'],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/', languages: { 'tr-TR': '/', 'en-US': '/en' } },
  manifest: '/site.webmanifest',
  icons: { icon: '/favicon.ico', apple: '/img/logo-512x512.png' },
  openGraph: {
    locale: 'tr_TR',
    type: 'website',
    siteName: site.name,
    title: 'ODYOMUH | Tarih, Mitoloji ve Kadim Uygarlıklar',
    description: siteDescription,
    url: siteUrl,
    images: [{ url: generatedArt.explorerDesk, width: 1672, height: 941, alt: 'ODYOMUH tarih arşivi' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tarihdedektifi0',
    creator: '@tarihdedektifi0',
    title: 'ODYOMUH | Tarih, Mitoloji ve Kadim Uygarlıklar',
    description: siteDescription,
    images: [generatedArt.explorerDesk],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export default function TurkishRootLayout({ children }) {
  const pageLinks = pages().slice(0, 8).map((page) => ({ id: page.id, title: page.title, primaryPath: page.primaryPath }));
  const labelLinks = labels().slice(0, 8);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description: siteDescription,
        inLanguage: 'tr-TR',
        potentialAction: { '@type': 'SearchAction', target: `${siteUrl}/search?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
      },
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: site.name, url: siteUrl, logo: `${siteUrl}/img/logo-512x512.png` },
    ],
  };

  return (
    <html lang="tr" suppressHydrationWarning style={{ '--font-cinzel': '"Cinzel", Georgia, serif', '--font-merriweather': '"Merriweather", Georgia, serif', '--font-inter': '"Inter", Arial, sans-serif' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body><SiteChrome site={{ name: site.name, description: siteDescription }} pages={pageLinks} labels={labelLinks}>{children}</SiteChrome></body>
    </html>
  );
}
