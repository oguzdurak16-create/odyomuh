import HtmlContent from './HtmlContent';
import ShareButtons from './ShareButtons';
import SourceList from './SourceList';

function plainText(html = '') {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCount(html = '') {
  return plainText(html).split(/\s+/).filter(Boolean).length;
}

function readingTime(html = '') {
  return Math.max(1, Math.ceil(wordCount(html) / 220));
}

function formatDate(value, locale) {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

export default function DailyArticlePage({ post, locale = 'tr', siteUrl = 'https://www.odyomuh.net' }) {
  const english = locale === 'en';
  const url = `${siteUrl}${post.primaryPath}`;
  const schemaType = post.newsArticle ? 'NewsArticle' : 'Article';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated || post.published,
    image: [`${siteUrl}${post.image}`],
    inLanguage: english ? 'en' : 'tr-TR',
    isAccessibleForFree: true,
    wordCount: wordCount(post.contentHtml),
    articleSection: post.labels?.[0],
    keywords: (post.labels || []).join(', '),
    citation: post.sources || undefined,
    isPartOf: {
      '@type': 'WebSite',
      '@id': english ? `${siteUrl}/en/#website` : `${siteUrl}/#website`,
      name: english ? 'ODYOMUH English' : 'ODYOMUH',
      url: english ? `${siteUrl}/en` : siteUrl,
    },
    author: { '@type': 'Organization', name: 'ODYOMUH', url: english ? `${siteUrl}/en/about` : siteUrl },
    publisher: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'ODYOMUH', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/img/logo-512x512.png`, width: 512, height: 512 } },
    speakable: post.newsArticle ? { '@type': 'SpeakableSpecification', cssSelector: ['.article-title', '.article-summary', '.odyomuh-note'] } : undefined,
  };
  const faqSchema = post.faq?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((entry) => ({ '@type': 'Question', name: entry.question, acceptedAnswer: { '@type': 'Answer', text: entry.answer } })),
  } : null;
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: english ? 'English Edition' : 'Ana Sayfa', item: english ? `${siteUrl}/en` : siteUrl },
      { '@type': 'ListItem', position: 2, name: english ? 'Archive' : 'Tüm yazılar', item: english ? `${siteUrl}/en/archive` : `${siteUrl}/arsiv` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className={english ? 'english-edition english-article-page' : 'article-page-shell'} lang={english ? 'en' : 'tr'}>
      <article className="post article-detail" itemScope itemType={`https://schema.org/${schemaType}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
        <img className="article-cover" src={post.image} alt={post.title} width="1672" height="941" fetchPriority="high" decoding="async" />
        <div className="post-body article-body">
          <nav className={english ? 'english-breadcrumb' : 'breadcrumb-nav'} aria-label="Breadcrumb">
            <a href={english ? '/en' : '/'}>{english ? 'English Edition' : 'Ana Sayfa'}</a><span>›</span><a href={english ? '/en/archive' : '/arsiv'}>{english ? 'Archive' : 'Tüm yazılar'}</a><span>›</span><span>{post.title}</span>
          </nav>
          {post.turkishPath ? <a className="english-original-link" href={post.turkishPath} hrefLang="tr">Turkish edition available →</a> : null}
          {post.englishPath ? <a className="english-original-link" href={post.englishPath} hrefLang="en">Read this article in English →</a> : null}
          <h1 className="article-title" itemProp="headline">{post.title}</h1>
          <p className="article-summary" itemProp="description">{post.description}</p>
          <div className="current-affairs-status"><strong>{english ? 'Research update' : 'Güncel araştırma'}</strong><span>{formatDate(post.updated || post.published, english ? 'en-US' : 'tr-TR')}</span></div>
          <div className="post-meta-info"><time dateTime={post.published}>{formatDate(post.published, english ? 'en-US' : 'tr-TR')}</time><span>{readingTime(post.contentHtml)} {english ? 'min read' : 'dk okuma'}</span><span>{post.labels?.[0]}</span></div>
          <div className="post-labels top-labels">{post.labels?.map((label) => english ? <span key={label}>{label}</span> : <a key={label} href={`/label/${encodeURIComponent(label)}`}>{label}</a>)}</div>
          <HtmlContent html={post.contentHtml} imageAlt={post.title} className={english ? 'english-content' : undefined} />
          <SourceList sources={post.sources} locale={english ? 'en' : 'tr'} />
          <ShareButtons title={post.title} url={url} />
        </div>
      </article>
    </div>
  );
}
