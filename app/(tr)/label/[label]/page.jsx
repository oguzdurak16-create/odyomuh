import { allItems, posts, labels, site, baseUrl, generatedArt, canonicalLabel } from '../../../site-data';
import PostCard from '../../../../components/PostCard';
import Sidebar from '../../../../components/Sidebar';
import { redirect } from 'next/navigation';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

export function generateStaticParams() {
  return labels().map((label) => ({ label }));
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

  const allPosts = posts();
  const items = allItems().filter((item) => item.type === 'POST' && (item.labels || []).includes(label));
  return (
    <div className="main-wrapper">
      <section>
        <section className="hero small">
          <p className="eyebrow">Etiket Arşivi</p>
          <h1>{label}</h1>
          <p>{items.length} yazı bu başlık altında listeleniyor.</p>
        </section>
        <section className="blog-posts">
          {items.length ? items.map((post) => <PostCard post={post} key={post.id} />) : <p className="empty-state">Bu etikette henüz yazı bulunmuyor.</p>}
        </section>
      </section>
      <Sidebar posts={allPosts} labels={labels()} site={site} />
    </div>
  );
}
