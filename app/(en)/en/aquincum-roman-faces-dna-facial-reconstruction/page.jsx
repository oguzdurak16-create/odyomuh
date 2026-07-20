import { dailyEnglishPosts } from '../../../../data/daily-2026-07-20';
import DailyArticlePage from '../../../../components/DailyArticlePage';
import { baseUrl } from '../../../site-data';

const post = dailyEnglishPosts.find((item) => item.id === 'en-daily-20260720-aquincum-faces');
const siteUrl = baseUrl || 'https://www.odyomuh.net';

export const metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: post.primaryPath, languages: { en: post.primaryPath, 'tr-TR': post.turkishPath, 'x-default': post.primaryPath } },
  openGraph: { type: 'article', locale: 'en_US', title: post.title, description: post.description, url: `${siteUrl}${post.primaryPath}`, images: [{ url: post.image, width: 1672, height: 941, alt: post.title }] },
  twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [post.image] },
};

export default function Page() {
  return <DailyArticlePage post={post} locale="en" siteUrl={siteUrl} />;
}
