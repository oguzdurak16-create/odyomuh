import HtmlContent from '../../../components/HtmlContent';
import TimelineExperience from '../../../components/TimelineExperience';
import QuizExperience from '../../../components/QuizExperience';
import DersNotlariExperience from '../../../components/DersNotlariExperience';
import timelineData from '../../../data/timeline-events.json';
import quizQuestions from '../../../data/quiz-questions.json';
import ShareButtons from '../../../components/ShareButtons';
import Sidebar from '../../../components/Sidebar';
import { allItems, findByPath, baseUrl, posts, labels, site, generatedArt, metaDescription, normalizeSearchText } from '../../site-data';
import { englishPathForTurkishPath } from '../../../data/en-posts';
import { notFound } from 'next/navigation';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

function pathFromParams(params) {
  const slug = params?.slug || [];
  return '/' + slug.join('/');
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value));
}

function readingTime(value) {
  const words = String(value || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 210));
}

export function generateStaticParams() {
  return allItems().map((item) => ({ slug: item.primaryPath.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const item = findByPath(pathFromParams(resolvedParams));
  if (!item) return {};

  const canonicalPath = item.primaryPath;
  const description = metaDescription(item.description);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const englishPath = englishPathForTurkishPath(canonicalPath);
  const specialImage = item.title === 'Tarih Kronolojisi'
    ? generatedArt.explorerDesk
    : item.title === 'Tarih Quiz' || item.title === 'Ders Notları'
      ? generatedArt.ancientLibraryDesk
      : item.image;
  const image = specialImage ? [{ url: specialImage, width: 1672, height: 941, alt: item.title }] : [];

  return {
    title: item.title,
    description,
    keywords: [...(item.labels || []), ...(item.searchAliases || [])],
    other: item.newsArticle ? { news_keywords: [...(item.labels || []), ...(item.searchAliases || [])].join(', ') } : undefined,
    alternates: {
      canonical: canonicalPath,
      languages: englishPath ? { 'tr-TR': canonicalPath, 'en-US': englishPath } : undefined,
    },
    openGraph: {
      title: item.title,
      description,
      url: canonicalUrl,
      images: image,
      type: item.type === 'POST' ? 'article' : 'website',
      publishedTime: item.published,
      modifiedTime: item.updated || item.published,
      authors: item.type === 'POST' ? [site.name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description,
      images: specialImage ? [specialImage] : [],
    },
  };
}

export default async function ContentPage({ params }) {
  const resolvedParams = await params;
  const item = findByPath(pathFromParams(resolvedParams));
  if (!item) notFound();

  const url = `${siteUrl}${item.primaryPath}`;
  const description = metaDescription(item.description);
  const englishPath = englishPathForTurkishPath(item.primaryPath);

  if (item.title === 'Tarih Kronolojisi') {
    return <TimelineExperience data={timelineData} />;
  }

  if (item.title === 'Tarih Quiz') {
    return <QuizExperience questions={quizQuestions} />;
  }

  if (item.title === 'Ders Notları') {
    const lessonPosts = posts().filter((post) => {
      const title = normalizeSearchText(post.title);
      const postLabels = (post.labels || []).map(normalizeSearchText);
      return title.includes('ders notu') || postLabels.includes('ders-notlari');
    });

    return (
      <div className="main-wrapper lessons-layout">
        <section><DersNotlariExperience posts={lessonPosts} /></section>
        <Sidebar posts={posts()} labels={labels()} site={site} />
      </div>
    );
  }

  const related = posts().filter((post) => post.id !== item.id && post.labels?.some((label) => item.labels?.includes(label))).slice(0, 3);
  const schemaType = item.type === 'POST' ? (item.newsArticle ? 'NewsArticle' : 'Article') : 'WebPage';
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: item.title,
    name: item.title,
    description,
    image: item.image ? [`${siteUrl}${item.image}`] : undefined,
    datePublished: item.published || undefined,
    dateModified: item.updated || item.published || undefined,
    inLanguage: 'tr-TR',
    isAccessibleForFree: true,
    articleSection: item.articleSection || item.labels?.[0] || undefined,
    keywords: [...(item.labels || []), ...(item.searchAliases || [])].join(', '),
    about: (item.about || item.labels || []).map((name) => ({ '@type': 'Thing', name })),
    citation: item.sources || undefined,
    speakable: item.newsArticle ? { '@type': 'SpeakableSpecification', cssSelector: ['.article-title', '.article-summary', '.odyomuh-note'] } : undefined,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/img/logo-512x512.png` },
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: item.articleSection || (item.type === 'POST' ? 'Yazılar' : 'Sayfalar'), item: item.articleSection === 'Orta Doğu Gündemi' ? `${siteUrl}/gundem/orta-dogu` : siteUrl },
      { '@type': 'ListItem', position: 3, name: item.title, item: url },
    ],
  };
  const faqSchema = item.faq?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: item.faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  } : null;

  return (
    <div className="main-wrapper">
      <section>
        <article className="post article-detail" itemScope itemType={item.type === 'POST' ? 'https://schema.org/Article' : 'https://schema.org/WebPage'}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
          {item.image ? <img className="article-cover" src={item.image} alt={item.title} width="1672" height="941" fetchPriority="high" /> : null}
          <div className="post-body article-body">
            <nav className="breadcrumb-nav" aria-label="Sayfa yolu">
              <ol className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Ana Sayfa</a></li>
                <li className="breadcrumb-separator">›</li>
                <li className="breadcrumb-item"><a href="/">{item.type === 'PAGE' ? 'Sayfalar' : 'Yazılar'}</a></li>
                <li className="breadcrumb-separator">›</li>
                <li className="breadcrumb-current"><span>{item.title}</span></li>
              </ol>
            </nav>
            {item.articleSection === 'Orta Doğu Gündemi' ? <a className="middle-east-back-link" href="/gundem/orta-dogu">← Orta Doğu gündem merkezine dön</a> : null}
            {englishPath ? <a className="english-original-link" href={englishPath}>Read this article in English →</a> : null}
            <h1 className="article-title" itemProp="headline">{item.title}</h1>
            <p className="article-summary" itemProp="description">{item.description}</p>
            {item.newsArticle ? <div className="current-affairs-status"><strong>Güncel dosya</strong><span>Son kontrol: {formatDate(item.updated || item.published)}</span><em>Askerî ve diplomatik durum değişebilir.</em></div> : null}
            <div className="post-meta-info">
              <span>{formatDate(item.published)}</span>
              <span>{readingTime(item.contentHtml)} dk okuma</span>
              {item.labels?.[0] ? <span>{item.labels[0]}</span> : null}
            </div>
            {item.labels?.length ? <div className="post-labels top-labels">{item.labels.map((label) => <a key={label} href={`/label/${encodeURIComponent(label)}`}>{label}</a>)}</div> : null}
            <HtmlContent html={item.contentHtml} imageAlt={item.title} />
            {item.type === 'POST' ? <ShareButtons title={item.title} url={url} /> : null}
          </div>
        </article>

        {related.length ? (
          <section className="related-posts-widget" aria-label="Benzer yazılar">
            <h2 className="related-posts-title">Benzer Yazılar</h2>
            <div className="related-posts-grid">
              {related.map((post) => (
                <a className="related-post-card" href={post.primaryPath} key={post.id}>
                  <div className="related-post-image">{post.image ? <img src={post.image} alt={post.title} width="1672" height="941" loading="lazy" decoding="async" /> : null}</div>
                  <div className="related-post-content">
                    <h3 className="related-post-card-title">{post.title}</h3>
                    <div className="related-post-meta">{formatDate(post.published)}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </section>
      <Sidebar posts={posts()} labels={labels()} site={site} />
    </div>
  );
}
