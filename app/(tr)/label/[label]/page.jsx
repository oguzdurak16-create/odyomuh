import { allItems, labels, baseUrl, generatedArt, canonicalLabel } from '../../../site-data';
import { dailyTurkishPosts } from '../../../../data/daily-2026-07-20';
import PostCard from '../../../../components/PostCard';
import { redirect } from 'next/navigation';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

export function generateStaticParams() {
  const dailyLabels = dailyTurkishPosts.flatMap((post) => post.labels || []);
  return [...new Set([...labels(), ...dailyLabels])].map((label) => ({ label }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawLabel = decodeURIComponent(resolvedParams.label);
  const label = canonicalLabel(rawLabel);
  const canonical = `/label/${encodeURIComponent(label)}`;
  const description = `${label} etiketiyle yayınlanan ODYOMUH tarih, mitoloji ve uygarlık yazıları.`;
  return {
    title: `${label} yazıları`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${label} yazıları | ODYOMUH`,
      description,
      url: `${siteUrl}${canonical}`,
      images: [{ url: generatedArt.explorerDesk, width: 1672, height: 941, alt: `${label} yazıları` }],
    },
  };
}

export default async function LabelPage({ params }) {
  const resolvedParams = await params;
  const rawLabel = decodeURIComponent(resolvedParams.label);
  const label = canonicalLabel(rawLabel);
  if (label !== rawLabel) redirect(`/label/${encodeURIComponent(label)}`);

  const standardItems = allItems().filter((item) => item.type === 'POST' && (item.labels || []).includes(label));
  const dailyItems = dailyTurkishPosts.filter((item) => (item.labels || []).map(canonicalLabel).includes(label));
  const seen = new Set();
  const items = [...dailyItems, ...standardItems]
    .filter((item) => {
      const key = item.id || item.primaryPath;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => (b.published || '').localeCompare(a.published || ''));

  return (
    <div className="label-page-shell">
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
