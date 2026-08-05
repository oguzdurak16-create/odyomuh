import { readFileSync } from 'node:fs';

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
];

const exportData = JSON.parse(readFileSync(new URL('./data/blogger-export.json', import.meta.url), 'utf8'));

const migratedRouteRedirects = exportData.blog.items.flatMap((item) =>
  (item.routes || [])
    .filter((route) => route && route !== item.primaryPath)
    .map((source) => ({ source, destination: item.primaryPath, permanent: true }))
);

const consolidatedPostRedirects = [
  {
    source: '/2025/11/blog-post.html',
    destination: '/2025/11/anunnakiler-kimdir-mitolojik-kokenlerden-bilimsel-konsensuse-kadar-kapsamli-rehber.html',
    permanent: true,
  },
  {
    source: '/2025/11/akad-ve-babilde-anunnaki-igigi-ayrimi-ve-yeralti-tanrilari.html',
    destination: '/2025/11/akad-ve-babil-de-anunnaki-igigi-ayrimi-ve-yeralti-tanrilari.html',
    permanent: true,
  },
  {
    source: '/2026/06/anunnaki-nedir-sumer-tanrilari-mi-uzayli-efsanesi-mi.html',
    destination: '/2025/12/anunnaki-nedir-sumer-tanrilari-ve-antik-uzayli-teorisi-tarih-ve-gizem.html',
    permanent: true,
  },
  {
    source: '/2026/06/gobekli-tepe-sirri-12-bin-yillik-tapinak-gercekten-ne-anlatiyor.html',
    destination: '/2026/01/gobekli-tepe-nedir-dunyanin-en-eski-tapinagi-ve-gizemleri-tarih-ve-arkeoloji.html',
    permanent: true,
  },
  {
    source: '/2026/06/atlantis-gercek-miydi-platon-un-kayip-ada-hikayesinin-pesinde.html',
    destination: '/2025/11/atlantis-ve-kristal-enerji-kayip-uygarligin-gercek-teknolojisi-mi.html',
    permanent: true,
  },
  {
    source: '/2026/06/voynich-manuscript-600-yillik-sifreli-kitap-neden-h-l-cozulemedi.html',
    destination: '/2026/03/voynich-manuscripti-600-yildir-kimsenin-okuyamadigi-gizemli-kitap.html',
    permanent: true,
  },
];

const redirects = [...migratedRouteRedirects, ...consolidatedPostRedirects];
const uniqueRedirects = [...new Map(redirects.map((item) => [item.source, item])).values()];

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'odyomuh.net' }],
        destination: 'https://www.odyomuh.net/:path*',
        permanent: true,
      },
      { source: '/search/label/:label', destination: '/label/:label', permanent: true },
      ...uniqueRedirects,
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
