import { allItems, baseUrl, labels } from './site-data';
import { englishPosts } from '../data/en-posts';
import { dailyTurkishPosts, dailyEnglishPosts } from '../data/daily-2026-07-20';
import { englishTopics } from '../data/en-topics';
import { englishPolicyPages } from '../data/en-pages';

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

export default function sitemap() {
  const now = new Date();
  const entries = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { 'tr-TR': siteUrl, en: absolute('/en'), 'x-default': absolute('/en') } },
    },
    { url: absolute('/arsiv'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absolute('/etiketler'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: absolute('/gundem/orta-dogu'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: { languages: { 'tr-TR': absolute('/gundem/orta-dogu'), en: absolute('/en/topic/middle-east') } },
    },
    {
      url: absolute('/en'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { en: absolute('/en'), 'tr-TR': siteUrl, 'x-default': absolute('/en') } },
    },
    { url: absolute('/en/archive'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...englishTopics.map((topic) => ({
      url: absolute(`/en/topic/${topic.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...englishPolicyPages.map((page) => ({
      url: absolute(`/en/${page.slug}`),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: page.slug === 'about' || page.slug === 'sources-and-fact-checking' ? 0.6 : 0.4,
    })),
    ...labels().map((label) => ({
      url: absolute(`/label/${encodeURIComponent(label)}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
    ...dailyEnglishPosts.map((post) => ({
      url: absolute(post.primaryPath),
      lastModified: post.updated || post.published || now,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: { languages: { en: absolute(post.primaryPath), 'tr-TR': absolute(post.turkishPath), 'x-default': absolute(post.primaryPath) } },
    })),
    ...englishPosts.map((post) => ({
      url: absolute(post.primaryPath),
      lastModified: post.updated || post.published || now,
      changeFrequency: post.newsArticle ? 'daily' : 'monthly',
      priority: post.newsArticle ? 0.9 : 0.8,
      alternates: {
        languages: post.turkishPath
          ? { en: absolute(post.primaryPath), 'tr-TR': absolute(post.turkishPath), 'x-default': absolute(post.primaryPath) }
          : { en: absolute(post.primaryPath), 'x-default': absolute(post.primaryPath) },
      },
    })),
    ...dailyTurkishPosts.map((post) => ({
      url: absolute(post.primaryPath),
      lastModified: post.updated || post.published || now,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: { languages: { 'tr-TR': absolute(post.primaryPath), en: absolute(post.englishPath), 'x-default': absolute(post.englishPath) } },
    })),
    ...allItems().map((item) => ({
      url: absolute(item.primaryPath),
      lastModified: item.updated || item.published || now,
      changeFrequency: item.newsArticle ? 'daily' : (item.type === 'POST' ? 'monthly' : 'yearly'),
      priority: item.newsArticle ? 0.9 : (item.type === 'POST' ? 0.8 : 0.5),
    })),
  ];
  return uniqueByUrl(entries);
}
