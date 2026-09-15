import { dailyEnglishPosts } from '../../../../data/current-updates-2026-07-23';
import DailyArticlePage from '../../../../components/DailyArticlePage';
import { baseUrl } from '../../../site-data';

const rawPost = dailyEnglishPosts.find((item) => item.id === 'en-pompeii-graffiti-everyday-life');
const post = {
  ...rawPost,
  primaryPath: rawPost.primaryPath || `/en/${rawPost.slug}`,
};
const siteUrl = baseUrl || 'https://www.odyomuh.net';
const seoTitle = 'Pompeii Graffiti: What Ancient Romans Wrote on Walls';
const seoDescription = 'What did ancient Romans write as graffiti in Pompeii? Explore election notices, names, jokes, love messages and what wall writing reveals about everyday life.';

export const metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: [...post.labels, 'ancient Roman graffiti', 'Pompeii graffiti', 'Roman wall inscriptions'],
  alternates: {
    canonical: post.primaryPath,
    languages: {
      en: post.primaryPath,
      'en-US': post.primaryPath,
      'tr-TR': post.turkishPath,
      'x-default': post.primaryPath,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    title: seoTitle,
    description: seoDescription,
    url: `${siteUrl}${post.primaryPath}`,
    images: [{ url: post.image, width: 1672, height: 941, alt: post.title }],
    publishedTime: post.published,
    modifiedTime: post.updated,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: [post.image],
  },
};

export default function Page() {
  return <DailyArticlePage post={post} locale="en" siteUrl={siteUrl} />;
}
