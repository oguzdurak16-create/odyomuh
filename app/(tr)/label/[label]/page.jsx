import { baseUrl, generatedArt, canonicalLabel, site } from '../../../site-data';
import { allTurkishLabels, postsForTurkishLabel } from '../../../../lib/content-collections';
import PostCard from '../../../../components/PostCard';
import { redirect } from 'next/navigation';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

export function generateStaticParams() {
  return allTurkishLabels().map((label) => ({ label }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawLabel = decodeURIComponent(resolvedParams.label);
  const label = canonicalLabel(rawLabel);
  const canonical = `/label/${encodeURIComponent(label)}`;
  const items = postsForTurkishLabel(label);
  const description = `${label} etiketiyle yayınlanan ${items.length} ODYOMUH tarih, mitoloji, arkeoloji ve uygarlık yazısı.`;
  return {
    title: `${label} yazıları`,
    description,
    alternates: { canonical },
    robots: { index: items.length >= 2, follow: true },
    openGraph: {
      title: `${label} yazıları | ODYOMUH`,
      description,
      url: `${siteUrl}${canonical}`,
      images: [{ url: items[0]?.image || generatedArt.explorerDesk, width: 1672, height: 941, alt: `${label} yazıları` }],
    },
  };
}

export default async function LabelPage({ params }) {
  const resolvedParams = await params;
  const rawLabel = decodeURIComponent(resolvedParams.label);
  const label = canonicalLabel(rawLabel);
  if (label !== rawLabel) redirect(`/label/${encodeURIComponent(label)}`);

  const items = postsForTurkishLabel(label);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${label} yazıları`,
    description: `${label} başlığındaki ODYOMUH araştırma dosyaları.`,
    url: `${siteUrl}/label/${encodeURIComponent(label)}`,
    inLanguage: 'tr-TR',
    isPartOf: { '@type': 'WebSite', name: site.name, url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `${siteUrl}${post.primaryPath}`,
      })),
    },
  };

  return (
    <div className="label-page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="modern-page-hero">
        <p className="eyebrow">Konu arşivi</p>
        <h1>{label}</h1>
        <p>{items.length} kaynak odaklı yazı bu araştırma başlığı altında toplanıyor.</p>
        <div className="modern-page-tools"><a href="/etiketler">Tüm etiketlere dön</a></div>
      </header>
      <section className="label-results-grid" aria-label={`${label} yazıları`}>
        {items.length ? items.map((post) => <PostCard post={post} key={post.id} />) : <p className="empty-state">Bu etikette henüz yazı bulunmuyor.</p>}
      </section>
    </div>
  );
}
