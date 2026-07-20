import { notFound } from 'next/navigation';
import { englishTopics, findEnglishTopic } from '../../../../../data/en-topics';
import { baseUrl, site } from '../../../../site-data';
import { allEnglishPosts } from '../../../../../lib/content-collections';
import EnglishPostCard from '../../../../../components/EnglishPostCard';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

export function generateStaticParams() {
  return englishTopics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }) {
  const { topic: slug } = await params;
  const topic = findEnglishTopic(slug);
  if (!topic) return {};
  const canonical = `/en/topic/${topic.slug}`;
  return {
    title: topic.name,
    description: topic.description,
    alternates: { canonical, languages: { en: canonical, 'x-default': canonical } },
    openGraph: { title: topic.name, description: topic.description, url: canonical, images: [{ url: topic.image, width: 1672, height: 941, alt: topic.name }] },
  };
}

export default async function EnglishTopicPage({ params }) {
  const { topic: slug } = await params;
  const topic = findEnglishTopic(slug);
  if (!topic) notFound();
  const posts = allEnglishPosts().filter((post) => post.topic === topic.slug);
  const canonical = `/en/topic/${topic.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: topic.name,
    description: topic.description,
    url: `${siteUrl}${canonical}`,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: `${site.name} English`, url: `${siteUrl}/en` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, name: post.title, url: `${siteUrl}${post.primaryPath}` })),
    },
  };
  return (
    <div className="english-edition english-index-page" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="english-topic-hero">
        <img src={topic.image} alt="" width="1672" height="941" fetchPriority="high" decoding="async" />
        <div className="english-card-shade" />
        <div>
          <p className="eyebrow">Research cluster · {posts.length} articles</p>
          <h1>{topic.name}</h1>
          <p>{topic.description}</p>
        </div>
      </header>
      <nav className="english-breadcrumb" aria-label="Breadcrumb">
        <a href="/en">English Edition</a><span>›</span><a href="/en/archive">Archive</a><span>›</span><span>{topic.shortName}</span>
      </nav>
      <div className="english-post-grid english-archive-grid">
        {posts.map((post) => <EnglishPostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
