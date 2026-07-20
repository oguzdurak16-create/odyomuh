import { notFound } from 'next/navigation';
import { englishPostsByTopic } from '../../../../../data/en-posts';
import { englishTopics, findEnglishTopic } from '../../../../../data/en-topics';
import EnglishPostCard from '../../../../../components/EnglishPostCard';

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
    openGraph: { title: topic.name, description: topic.description, url: canonical, images: [{ url: topic.image }] },
  };
}

export default async function EnglishTopicPage({ params }) {
  const { topic: slug } = await params;
  const topic = findEnglishTopic(slug);
  if (!topic) notFound();
  const posts = englishPostsByTopic(topic.slug);
  return (
    <div className="english-edition english-index-page" lang="en">
      <header className="english-topic-hero">
        <img src={topic.image} alt="" width="1672" height="941" fetchPriority="high" />
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
