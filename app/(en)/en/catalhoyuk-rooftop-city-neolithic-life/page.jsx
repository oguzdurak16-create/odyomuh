import { dailyEnglishPosts } from '../../../../data/current-updates-2026-07-22';
import DailyArticlePage from '../../../../components/DailyArticlePage';
import { baseUrl } from '../../../site-data';

const rawPost = dailyEnglishPosts.find((item) => item.id === 'en-catalhoyuk-rooftop-city');
const post = {
  ...rawPost,
  title: 'Why Did Çatalhöyük Have Rooftop Entrances and No Streets?',
  description: 'Çatalhöyük was a densely packed Neolithic settlement where many houses had no street-facing doors. People probably moved across roofs and entered homes by ladder.',
  primaryPath: rawPost.primaryPath || `/en/${rawPost.slug}`,
};
const siteUrl = baseUrl || 'https://www.odyomuh.net';
const seoTitle = 'Çatalhöyük Houses: Why Were There No Streets?';
const seoDescription = 'Why did Çatalhöyük have no regular streets? Learn how rooftop entrances, tightly packed houses, burials and daily life shaped this Neolithic settlement.';

export const metadata = {
  title: seoTitle,
  description: seoDescription,
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
