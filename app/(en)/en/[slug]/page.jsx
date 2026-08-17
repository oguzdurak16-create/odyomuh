import { notFound, permanentRedirect } from 'next/navigation';
import { englishPosts, findEnglishPost } from '../../../../data/en-posts';
import { englishPolicyPages, findEnglishPolicyPage } from '../../../../data/en-pages';
import { findEnglishTopic } from '../../../../data/en-topics';
import { applyContentOverride } from '../../../../data/seo-overrides';
import { baseUrl, site, metaDescription } from '../../../site-data';
import { allEnglishPosts } from '../../../../lib/content-collections';
import HtmlContent from '../../../../components/HtmlContent';
import SourceList from '../../../../components/SourceList';
import EnglishPostCard from '../../../../components/EnglishPostCard';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

function resolvedSlug(post = {}) {
  if (post.slug) return post.slug;
  return String(post.primaryPath || '').replace(/^\/en\//, '').replace(/^\/+|\/+$/g, '');
}

function findEnglishContent(slug) {
  const normalized = decodeURIComponent(String(slug || '')).replace(/^\/+|\/+$/g, '');
  return allEnglishPosts().find((post) => (
    resolvedSlug(post) === normalized
    || (post.routes || []).includes(`/en/${normalized}`)
    || post.primaryPath === `/en/${normalized}`
  )) || findEnglishPost(normalized);
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

function plainText(value = '') {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCount(value) {
  return plainText(value).split(/\s+/).filter(Boolean).length;
}

function readingTime(value) {
  return Math.max(1, Math.ceil(wordCount(value) / 220));
}

export function generateStaticParams() {
  const slugs = [
    ...allEnglishPosts().map(resolvedSlug),
    ...englishPolicyPages.map((page) => page.slug),
  ].filter(Boolean);
  return [...new Set(slugs)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const policyPage = findEnglishPolicyPage(slug);
  if (policyPage) {
    const canonical = `/en/${policyPage.slug}`;
    return {
      title: policyPage.title,
      description: policyPage.description,
      alternates: { canonical, languages: { en: canonical, 'x-default': canonical } },
    };
  }

  const post = applyContentOverride(findEnglishContent(slug));
  if (!post) return {};
  const canonical = post.primaryPath;
  const seoTitle = post.seoTitle || post.title;
  const description = metaDescription(post.metaDescription || post.description);
  const keywords = [...new Set([...(post.labels || []), ...(post.searchAliases || [])])];
  const languages = post.turkishPath
    ? { en: canonical, 'tr-TR': post.turkishPath, 'x-default': canonical }
    : { en: canonical, 'x-default': canonical };

  return {
    title: seoTitle,
    description,
    keywords,
    alternates: { canonical, languages },
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
      locale: 'en_US',
      type: 'article',
      title: seoTitle,
      description,
      url: canonical,
      images: [{ url: post.image, width: 1672, height: 941, alt: post.title }],
      publishedTime: post.published,
      modifiedTime: post.updated || post.published,
      authors: [site.name],
      tags: post.labels,
    },
    twitter: { card: 'summary_large_image', title: seoTitle, description, images: [post.image] },
  };
}

function EnglishPolicyPage({ page }) {
  return (
    <div className="english-edition english-policy-page" lang="en">
      <header className="english-page-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </header>
      <article className="english-policy-content">
        {page.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        ))}
      </article>
    </div>
  );
}

export default async function EnglishDynamicPage({ params }) {
  const { slug } = await params;
  const policyPage = findEnglishPolicyPage(slug);
  if (policyPage) return <EnglishPolicyPage page={policyPage} />;

  const requestedPath = `/en/${decodeURIComponent(String(slug || '')).replace(/^\/+|\/+$/g, '')}`;
  const post = applyContentOverride(findEnglishContent(slug));
  if (!post) notFound();
  if (requestedPath !== post.primaryPath) permanentRedirect(post.primaryPath);

  const topic = findEnglishTopic(post.topic);
  const related = allEnglishPosts()
    .filter((item) => item.id !== post.id)
    .map((item) => ({
      item,
      score: (item.topic === post.topic ? 5 : 0)
        + ((item.labels || []).filter((label) => post.labels.includes(label)).length * 2)
        + ((item.searchAliases || []).filter((alias) => post.searchAliases?.includes(alias)).length * 4),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ item }) => item);

  const url = `${siteUrl}${post.primaryPath}`;
  const description = metaDescription(post.metaDescription || post.description);
  const words = wordCount(post.contentHtml);
  const schemaType = post.newsArticle ? 'NewsArticle' : 'Article';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.seoTitle || post.title,
    name: post.title,
    description,
    image: [`${siteUrl}${post.image}`],
    datePublished: post.published,
    dateModified: post.updated || post.published,
    inLanguage: 'en',
    isAccessibleForFree: true,
    wordCount: words,
    keywords: [...new Set([...(post.labels || []), ...(post.searchAliases || [])])].join(', '),
    articleSection: topic?.name || post.labels[0],
    isPartOf: { '@type': 'WebSite', '@id': `${siteUrl}/en/#website`, name: `${site.name} English`, url: `${siteUrl}/en` },
    author: { '@type': 'Organization', name: site.name, url: `${siteUrl}/en/about` },
    publisher: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: site.name, url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/img/logo-512x512.png`, width: 512, height: 512 } },
    citation: post.sources,
    speakable: post.newsArticle ? { '@type': 'SpeakableSpecification', cssSelector: ['.article-title', '.article-summary', '.odyomuh-note'] } : undefined,
  };
  const faqSchema = post.faq?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'English Edition', item: `${siteUrl}/en` },
      { '@type': 'ListItem', position: 2, name: topic?.shortName || 'Archive', item: `${siteUrl}/en/topic/${post.topic}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="english-edition english-article-page" lang="en">
      <article className="post article-detail english-article-detail" itemScope itemType={`https://schema.org/${schemaType}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <img className="article-cover" src={post.image} alt={post.title} width="1672" height="941" fetchPriority="high" decoding="async" />
        <div className="post-body article-body">
          <nav className="english-breadcrumb" aria-label="Breadcrumb">
            <a href="/en">English Edition</a><span>›</span><a href={`/en/topic/${post.topic}`}>{topic?.shortName || 'Archive'}</a><span>›</span><span>{post.title}</span>
          </nav>
          {post.turkishPath ? <a className="english-original-link" href={post.turkishPath} hrefLang="tr">Turkish edition available →</a> : null}
          {post.newsArticle ? <div className="current-affairs-status"><strong>Current affairs file</strong><span>Last reviewed: {formatDate(post.updated || post.published)}</span><em>Military and diplomatic conditions may change.</em></div> : null}
          <h1 className="article-title" itemProp="headline">{post.title}</h1>
          <p className="article-summary" itemProp="description">{post.description}</p>
          <div className="post-meta-info">
            <time dateTime={post.published}>{formatDate(post.published)}</time>
            <span>{readingTime(post.contentHtml)} min read</span>
            <a href={`/en/topic/${post.topic}`}>{topic?.shortName || post.labels[0]}</a>
          </div>
          <div className="post-labels top-labels">{post.labels.map((label) => <span key={label}>{label}</span>)}</div>
          <HtmlContent html={post.contentHtml} imageAlt={post.title} className="english-content" />
          <SourceList sources={post.sources} locale="en" />

          <div className="english-article-end">
            <p><strong>How this page is handled:</strong> Evidence, interpretation and modern speculation are separated. Material corrections are reflected in the article date.</p>
            <div>
              <a href="/en/sources-and-fact-checking">Fact-checking method</a>
              <a href="/en/corrections">Report a correction</a>
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="english-related-section">
          <div className="home-section-heading">
            <div><p className="eyebrow">Continue the cluster</p><h2>Related English articles</h2></div>
            <a className="section-text-link" href={`/en/topic/${post.topic}`}>Open topic page →</a>
          </div>
          <div className="english-post-grid english-related-grid">
            {related.map((item) => <EnglishPostCard post={item} key={item.id} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
