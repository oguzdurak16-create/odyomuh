import HtmlContent from '../../../components/HtmlContent';
import TimelineExperience from '../../../components/TimelineExperience';
import QuizExperience from '../../../components/QuizExperience';
import DersNotlariExperience from '../../../components/DersNotlariExperience';
import ShareButtons from '../../../components/ShareButtons';
import SourceList from '../../../components/SourceList';
import timelineData from '../../../data/timeline-events.json';
import quizQuestions from '../../../data/quiz-questions.json';
import { allItems, baseUrl, posts, site, generatedArt, metaDescription, normalizeSearchText } from '../../site-data';
import { englishPathForTurkishPath } from '../../../data/en-posts';
import { currentTurkishPosts } from '../../../data/current-updates';
import { applyContentOverride } from '../../../data/seo-overrides';
import { allTurkishPosts } from '../../../lib/content-collections';
import { notFound } from 'next/navigation';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const TIMELINE_PATH = '/p/tarih-kronolojisi.html';

function pathFromParams(params) {
  const slug = params?.slug || [];
  return '/' + slug.join('/');
}

function normalizeRoutableItem(item) {
  if (!item) return item;
  if (item.type) return item;
  return {
    ...item,
    type: 'POST',
    routes: [...new Set([item.primaryPath, ...(item.routes || [])].filter(Boolean))],
  };
}

function routableItems() {
  const seen = new Set();
  return [...currentTurkishPosts, ...allItems()]
    .map(normalizeRoutableItem)
    .filter((item) => {
      const key = item?.id || item?.primaryPath;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function findRoutableByPath(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return routableItems().find((item) => item.primaryPath === normalized || item.routes?.includes(normalized));
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value));
}

function plainText(value = '') {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCount(value = '') {
  return plainText(value).split(/\s+/).filter(Boolean).length;
}

function readingTime(value) {
  return Math.max(1, Math.ceil(wordCount(value) / 210));
}

export function generateStaticParams() {
  return routableItems().map((item) => ({ slug: item.primaryPath.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const item = applyContentOverride(findRoutableByPath(pathFromParams(resolvedParams)));
  if (!item) return {};

  const canonicalPath = item.primaryPath;
  const seoTitle = item.seoTitle || item.title;
  const description = metaDescription(item.metaDescription || item.description);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const englishPath = item.englishPath || englishPathForTurkishPath(canonicalPath);
  const specialImage = canonicalPath === TIMELINE_PATH
    ? generatedArt.explorerDesk
    : item.title === 'Tarih Quiz' || item.title === 'Ders Notları'
      ? generatedArt.ancientLibraryDesk
      : item.image;
  const image = specialImage ? [{ url: specialImage, width: 1672, height: 941, alt: item.title }] : [];
  const languages = englishPath
    ? { 'tr-TR': canonicalPath, en: englishPath, 'x-default': englishPath }
    : { 'tr-TR': canonicalPath };

  return {
    title: seoTitle,
    description,
    keywords: [...(item.labels || []), ...(item.searchAliases || [])],
    other: item.newsArticle ? { news_keywords: [...(item.labels || []), ...(item.searchAliases || [])].join(', ') } : undefined,
    alternates: { canonical: canonicalPath, languages },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: seoTitle,
      description,
      url: canonicalUrl,
      images: image,
      type: item.type === 'POST' ? 'article' : 'website',
      publishedTime: item.published,
      modifiedTime: item.updated || item.published,
      authors: item.type === 'POST' ? [site.name] : undefined,
      tags: item.labels || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description,
      images: specialImage ? [specialImage] : [],
    },
  };
}

export default async function ContentPage({ params }) {
  const resolvedParams = await params;
  const item = applyContentOverride(findRoutableByPath(pathFromParams(resolvedParams)));
  if (!item) notFound();

  const url = `${siteUrl}${item.primaryPath}`;
  const description = metaDescription(item.metaDescription || item.description);
  const englishPath = item.englishPath || englishPathForTurkishPath(item.primaryPath);

  if (item.primaryPath === TIMELINE_PATH) return <TimelineExperience data={timelineData} />;
  if (item.title === 'Tarih Quiz') return <QuizExperience questions={quizQuestions} />;

  if (item.title === 'Ders Notları') {
    const lessonPosts = posts().filter((post) => {
      const title = normalizeSearchText(post.title);
      const postLabels = (post.labels || []).map(normalizeSearchText);
      return title.includes('ders notu') || postLabels.includes('ders-notlari');
    });
    return <div className="lessons-layout"><DersNotlariExperience posts={lessonPosts} /></div>;
  }

  const related = allTurkishPosts()
    .filter((post) => post.id !== item.id)
    .map((post) => ({
      post,
      score: ((post.labels || []).filter((label) => item.labels?.includes(label)).length * 3)
        + ((post.searchAliases || []).filter((alias) => item.searchAliases?.includes(alias)).length * 5),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ post }) => post);
  const schemaType = item.type === 'POST' ? (item.newsArticle ? 'NewsArticle' : 'Article') : 'WebPage';
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: item.seoTitle || item.title,
    name: item.title,
    description,
    image: item.image ? [`${siteUrl}${item.image}`] : undefined,
    datePublished: item.published || undefined,
    dateModified: item.updated || item.published || undefined,
    inLanguage: 'tr-TR',
    isAccessibleForFree: true,
    wordCount: item.type === 'POST' ? wordCount(item.contentHtml) : undefined,
    articleSection: item.articleSection || item.labels?.[0] || undefined,
    keywords: [...(item.labels || []), ...(item.searchAliases || [])].join(', '),
    about: (item.about || item.labels || []).map((name) => ({ '@type': 'Thing', name })),
    citation: item.sources || undefined,
    speakable: item.newsArticle ? { '@type': 'SpeakableSpecification', cssSelector: ['.article-title', '.article-summary', '.odyomuh-note'] } : undefined,
    isPartOf: { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: site.name, url: siteUrl },
    author: { '@type': 'Organization', name: site.name, url: siteUrl },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: site.name,
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/img/logo-512x512.png`, width: 512, height: 512 },
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: item.articleSection || (item.type === 'POST' ? 'Yazılar' : 'Sayfalar'), item: item.articleSection === 'Orta Doğu Gündemi' ? `${siteUrl}/gundem/orta-dogu` : `${siteUrl}/arsiv` },
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
    <div className="article-page-shell">
      <article className="post article-detail" itemScope itemType={item.type === 'POST' ? `https://schema.org/${schemaType}` : 'https://schema.org/WebPage'}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
        {item.image ? <img className="article-cover" src={item.image} alt={item.title} width="1672" height="941" fetchPriority="high" decoding="async" /> : null}
        <div className="post-body article-body">
          <nav className="breadcrumb-nav" aria-label="Sayfa yolu">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item"><a href="/">Ana Sayfa</a></li>
              <li className="breadcrumb-separator">›</li>
              <li className="breadcrumb-item"><a href="/arsiv">{item.type === 'PAGE' ? 'Sayfalar' : 'Yazılar'}</a></li>
              <li className="breadcrumb-separator">›</li>
              <li className="breadcrumb-current"><span>{item.title}</span></li>
            </ol>
          </nav>
          {item.articleSection === 'Orta Doğu Gündemi' ? <a className="middle-east-back-link" href="/gundem/orta-dogu">← Orta Doğu gündem merkezine dön</a> : null}
          {englishPath ? <a className="english-original-link" href={englishPath} hrefLang="en">Read this article in English →</a> : null}
          <h1 className="article-title" itemProp="headline">{item.title}</h1>
          <p className="article-summary" itemProp="description">{item.description}</p>
          {item.newsArticle ? <div className="current-affairs-status"><strong>Güncel dosya</strong><span>Son kontrol: {formatDate(item.updated || item.published)}</span><em>Askerî ve diplomatik durum değişebilir.</em></div> : null}
          <div className="post-meta-info">
            <time dateTime={item.published}>{formatDate(item.published)}</time>
            <span>{readingTime(item.contentHtml)} dk okuma</span>
            {item.labels?.[0] ? <span>{item.labels[0]}</span> : null}
          </div>
          {item.labels?.length ? <div className="post-labels top-labels">{item.labels.map((label) => <a key={label} href={`/label/${encodeURIComponent(label)}`}>{label}</a>)}</div> : null}
          <HtmlContent html={item.contentHtml} imageAlt={item.title} />
          <SourceList sources={item.sources} locale="tr" />
          {item.type === 'POST' ? <ShareButtons title={item.title} url={url} /> : null}
        </div>
      </article>

      {related.length ? (
        <section className="related-posts-widget" aria-label="Benzer yazılar">
          <h2 className="related-posts-title">Bu konuyla ilgili devam yazıları</h2>
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
    </div>
  );
}
