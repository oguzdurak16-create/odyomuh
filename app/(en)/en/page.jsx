import { generatedArt } from '../../site-data';
import ProfessionalEnglishHome from '../../../components/ProfessionalEnglishHome';

export const metadata = {
  title: 'History, Archaeology and Ancient Mysteries',
  description: 'Evidence-led English articles on archaeology, ancient texts, historical mysteries and global history.',
  alternates: { canonical: '/en', languages: { en: '/en', 'tr-TR': '/', 'x-default': '/en' } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'ODYOMUH English | History, Archaeology and Ancient Mysteries',
    description: 'Evidence-led archaeology, ancient texts, historical mysteries and long-form research.',
    url: '/en',
    images: [{ url: generatedArt.globalHistoryHero, width: 1672, height: 941, alt: 'ODYOMUH English history archive' }],
  },
  twitter: { card: 'summary_large_image', title: 'ODYOMUH English', description: 'Evidence-led history and archaeology for global readers.', images: [generatedArt.globalHistoryHero] },
};

export default function EnglishHomePage() {
  return <ProfessionalEnglishHome />;
}
