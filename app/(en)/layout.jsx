import '../globals.css';
import '../editorial.css';
import '../audit.css';
import { site, baseUrl, generatedArt } from '../site-data';
import SiteChrome from '../../components/SiteChrome';
import ConsentRestore from '../../components/ConsentRestore';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const siteDescription = 'Evidence-led history, archaeology, ancient texts and historical mysteries for readers around the world.';
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
  applicationName: `${site.name} English`,
  title: { default: 'History, Archaeology and Ancient Mysteries | ODYOMUH English', template: '%s | ODYOMUH English' },
  description: siteDescription,
  keywords: ['history', 'archaeology', 'ancient texts', 'ancient civilizations', 'historical mysteries', 'evidence-led history'],
  authors: [{ name: site.name, url: `${siteUrl}/en/about` }],
  creator: site.name,
  publisher: site.name,
  category: 'history',
  alternates: { canonical: '/en', languages: { en: '/en', 'tr-TR': '/', 'x-default': '/en' } },
  icons: { icon: '/favicon.ico', apple: '/img/logo-512x512.png' },
  manifest: '/site.webmanifest',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    siteName: `${site.name} English`,
    title: 'ODYOMUH English | History, Archaeology and Ancient Mysteries',
    description: siteDescription,
    url: `${siteUrl}/en`,
    images: [{ url: generatedArt.globalHistoryHero, width: 1672, height: 941, alt: 'ODYOMUH English history and archaeology archive' }],
  },
  twitter: { card: 'summary_large_image', title: 'ODYOMUH English', description: siteDescription, images: [generatedArt.globalHistoryHero] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function EnglishRootLayout({ children }) {
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/en/#website`;
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
        url: `${siteUrl}/en`,
        name: `${site.name} English`,
        description: siteDescription,
        inLanguage: 'en',
        publisher: { '@id': organizationId },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/en/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning style={{ '--font-cinzel': '"Cinzel", Georgia, serif', '--font-merriweather': '"Merriweather", Georgia, serif', '--font-inter': '"Inter", Arial, sans-serif' }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="alternate" type="application/rss+xml" title="ODYOMUH English RSS" href="/en/feed.xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SiteChrome site={{ name: site.name, description: siteDescription }} pages={[]} labels={[]}>
          <ConsentRestore />
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
