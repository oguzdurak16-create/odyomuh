import { dailyEnglishPosts } from '../../../../data/current-updates-2026-07-23';
import DailyArticlePage from '../../../../components/DailyArticlePage';
import { baseUrl } from '../../../site-data';

const rawPost = dailyEnglishPosts.find((item) => item.id === 'en-pompeii-graffiti-everyday-life');
const post = {
  ...rawPost,
  primaryPath: rawPost.primaryPath || `/en/${rawPost.slug}`,
};
const siteUrl = baseUrl || 'https://www.odyomuh.net';

export const metadata = {
  title: post.seoTitle || post.title,
  description: post.metaDescription || post.description,
  keywords: post.labels,
  alternates: {
    canonical: post.primaryPath,
    languages: {
      en: post.primaryPath,
      'en-US': post.primaryPath,
      'tr-TR': post.turkishPath,
      'x-default': post.primaryPath,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    title: post.title,
    description: post.description,
    url: `${siteUrl}${post.primaryPath}`,
    images: [{ url: post.image, width: 1672, height: 941, alt: post.title }],
    publishedTime: post.published,
    modifiedTime: post.updated,
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: [post.image],
  },
};

export default function Page() {
  return <DailyArticlePage post={post} locale="en" siteUrl={siteUrl} />;
}
