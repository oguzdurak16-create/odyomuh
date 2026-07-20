import { allItems, baseUrl } from './site-data';
import { englishTopics } from '../data/en-topics';
import { englishPolicyPages } from '../data/en-pages';
import { allTurkishPosts, allEnglishPosts, turkishLabelStats, latestDate } from '../lib/content-collections';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const absolute = (path) => `${siteUrl}${path === '/' ? '' : path}`;

function uniqueByUrl(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.url || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function languageAlternates(post, englishByTurkishPath) {
  const english = englishByTurkishPath.get(post.primaryPath);
  if (!english) return { 'tr-TR': absolute(post.primaryPath) };
  return {
    'tr-TR': absolute(post.primaryPath),
    en: absolute(english.primaryPath),
    'x-default': absolute(english.primaryPath),
  };
}

export default function sitemap() {
  const turkishPosts = allTurkishPosts();
  const englishPosts = allEnglishPosts();
  const englishByTurkishPath = new Map(englishPosts.filter((post) => post.turkishPath).map((post) => [post.turkishPath, post]));
  const turkishLatest = latestDate(turkishPosts);
  const englishLatest = latestDate(englishPosts);
  const pages = allItems().filter((item) => item.type === 'PAGE');
  const indexableLabels = turkishLabelStats().filter((item) => item.count >= 2);

  const entries = [
    {
      url: siteUrl,
      lastModified: turkishLatest || undefined,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { 'tr-TR': siteUrl, en: absolute('/en'), 'x-default': absolute('/en') } },
      images: [absolute('/generated-history/explorer-desk.webp')],
    },
    { url: absolute('/arsiv'), lastModified: turkishLatest || undefined, changeFrequency: 'weekly', priority: 0.9, images: [absolute('/generated-history/ancient-library-desk.webp')] },
    { url: absolute('/etiketler'), lastModified: turkishLatest || undefined, changeFrequency: 'weekly', priority: 0.8, images: [absolute('/generated-global/cuneiform-decipherment.webp')] },
    {
      url: absolute('/gundem/orta-dogu'),
      lastModified: latestDate(turkishPosts.filter((post) => post.articleSection === 'Orta Doğu Gündemi' || (post.labels || []).includes('Orta Doğu Gündemi'))) || turkishLatest || undefined,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: { languages: { 'tr-TR': absolute('/gundem/orta-dogu'), en: absolute('/en/topic/middle-east'), 'x-default': absolute('/en/topic/middle-east') } },
      images: [absolute('/generated-middle-east/iran-israel-conflict.webp')],
    },
    {
      url: absolute('/en'),
      lastModified: englishLatest || undefined,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { en: absolute('/en'), 'tr-TR': siteUrl, 'x-default': absolute('/en') } },
      images: [absolute('/generated-global/global-history-hero.webp')],
    },
    { url: absolute('/en/archive'), lastModified: englishLatest || undefined, changeFrequency: 'weekly', priority: 0.9, images: [absolute('/generated-global/global-history-hero.webp')] },
    ...englishTopics.map((topic) => {
      const topicPosts = englishPosts.filter((post) => post.topic === topic.slug);
      return {
        url: absolute(`/en/topic/${topic.slug}`),
        lastModified: latestDate(topicPosts) || undefined,
        changeFrequency: topic.slug === 'middle-east' || topic.slug === 'new-discoveries' ? 'daily' : 'weekly',
        priority: 0.8,
        images: topic.image ? [absolute(topic.image)] : undefined,
      };
    }),
    ...englishPolicyPages.map((page) => ({
      url: absolute(`/en/${page.slug}`),
      changeFrequency: 'yearly',
      priority: page.slug === 'about' || page.slug === 'sources-and-fact-checking' ? 0.6 : 0.4,
    })),
    ...indexableLabels.map(({ label, latest }) => ({
      url: absolute(`/label/${encodeURIComponent(label)}`),
      lastModified: latest || undefined,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
    ...englishPosts.map((post) => ({
      url: absolute(post.primaryPath),
      lastModified: post.updated || post.published || undefined,
      changeFrequency: post.newsArticle ? 'daily' : 'monthly',
      priority: post.newsArticle ? 0.9 : 0.8,
      images: post.image ? [absolute(post.image)] : undefined,
      alternates: {
        languages: post.turkishPath
          ? { en: absolute(post.primaryPath), 'tr-TR': absolute(post.turkishPath), 'x-default': absolute(post.primaryPath) }
          : { en: absolute(post.primaryPath), 'x-default': absolute(post.primaryPath) },
      },
    })),
    ...turkishPosts.map((post) => ({
      url: absolute(post.primaryPath),
      lastModified: post.updated || post.published || undefined,
      changeFrequency: post.newsArticle ? 'daily' : 'monthly',
      priority: post.newsArticle ? 0.9 : 0.8,
      images: post.image ? [absolute(post.image)] : undefined,
      alternates: { languages: languageAlternates(post, englishByTurkishPath) },
    })),
    ...pages.map((item) => ({
      url: absolute(item.primaryPath),
      lastModified: item.updated || item.published || undefined,
      changeFrequency: 'yearly',
      priority: 0.5,
    })),
  ];
  return uniqueByUrl(entries);
}
