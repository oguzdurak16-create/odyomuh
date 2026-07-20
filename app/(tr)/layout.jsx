import '../globals.css';
import '../editorial.css';
import '../audit.css';
import { site, pages, baseUrl, generatedArt } from '../site-data';
import { allTurkishLabels } from '../../lib/content-collections';
import SiteChrome from '../../components/SiteChrome';
import ConsentRestore from '../../components/ConsentRestore';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const siteDescription = site.settings?.blog_meta_description || site.description || 'Tarih, arkeoloji, mitoloji ve kadim uygarlıklar üzerine kaynak odaklı dijital arşiv.';
const themeBootstrap = `(function(){try{var saved=localStorage.getItem('odyomuh-theme');var theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',theme);}catch(e){}})();`;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#120d09' },
    { media: '(prefers-color-scheme: light)', color: '#fbf7f0' },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.name,
  title: {
    default: 'ODYOMUH | Tarih, Arkeoloji ve Kadim Uygarlıklar',
    template: `%s | ${site.name}`,
  },
  description: siteDescription,
  keywords: ['tarih', 'arkeoloji', 'mitoloji', 'kadim uygarlıklar', 'antik tarih', 'Türk tarihi', 'tarihsel araştırma'],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: 'history',
  alternates: { canonical: '/', languages: { 'tr-TR': '/', en: '/en', 'x-default': '/en' } },
  manifest: '/site.webmanifest',
  icons: { icon: '/favicon.ico', apple: '/img/logo-512x512.png' },
  openGraph: {
    locale: 'tr_TR',
    type: 'website',
    siteName: site.name,
    title: 'ODYOMUH | Tarih, Arkeoloji ve Kadim Uygarlıklar',
    description: siteDescription,
    url: siteUrl,
    images: [{ url: generatedArt.explorerDesk, width: 1672, height: 941, alt: 'ODYOMUH tarih ve arkeoloji arşivi' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tarihdedektifi0',
    creator: '@tarihdedektifi0',
    title: 'ODYOMUH | Tarih, Arkeoloji ve Kadim Uygarlıklar',
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
  const labelLinks = allTurkishLabels().slice(0, 12);
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.name,
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/img/logo-512x512.png`, width: 512, height: 512 },
        sameAs: [
          'https://www.facebook.com/profile.php?id=61554477900461',
          'https://instagram.com/tarihdedektifi0',
          'https://www.youtube.com/@tarihdedektifi0',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: site.name,
        description: siteDescription,
        inLanguage: 'tr-TR',
        publisher: { '@id': organizationId },
        potentialAction: { '@type': 'SearchAction', target: `${siteUrl}/search?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
      },
    ],
  };

  return (
    <html lang="tr" suppressHydrationWarning style={{ '--font-cinzel': '"Cinzel", Georgia, serif', '--font-merriweather': '"Merriweather", Georgia, serif', '--font-inter': '"Inter", Arial, sans-serif' }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="alternate" type="application/rss+xml" title="ODYOMUH Türkçe RSS" href="/feed.xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body><SiteChrome site={{ name: site.name, description: siteDescription }} pages={pageLinks} labels={labelLinks}><ConsentRestore />{children}</SiteChrome></body>
    </html>
  );
}
