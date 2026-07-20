import '../globals.css';
import '../editorial.css';
import { site, baseUrl, generatedArt } from '../site-data';
import SiteChrome from '../../components/SiteChrome';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const siteDescription = 'Evidence-led history, archaeology, ancient texts and historical mysteries for readers around the world.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: `${site.name} English`,
  title: { default: 'History, Archaeology and Ancient Mysteries | ODYOMUH English', template: '%s | ODYOMUH English' },
  description: siteDescription,
  keywords: ['history', 'archaeology', 'ancient DNA', 'Turin Shroud DNA', 'Aquincum Roman faces', 'ancient mysteries'],
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
    images: [{ url: generatedArt.explorerDesk, width: 1672, height: 941, alt: 'ODYOMUH English history archive' }],
  },
  twitter: { card: 'summary_large_image', title: 'ODYOMUH English', description: siteDescription, images: [generatedArt.explorerDesk] },
  robots: { index: true, follow: true },
};

export default function EnglishRootLayout({ children }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      url: `${siteUrl}/en`,
      logo: `${siteUrl}/img/logo-512x512.png`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${siteUrl}/en`,
      name: `${site.name} English`,
      description: siteDescription,
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/en/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning style={{ '--font-cinzel': '"Cinzel", Georgia, serif', '--font-merriweather': '"Merriweather", Georgia, serif', '--font-inter': '"Inter", Arial, sans-serif' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="alternate" type="application/rss+xml" title="ODYOMUH English RSS" href="/en/feed.xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SiteChrome site={{ name: site.name, description: siteDescription }} pages={[]} labels={[]}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
