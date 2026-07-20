import ProfessionalEnglishHome from '../../../components/ProfessionalEnglishHome';

export const metadata = {
  title: 'History, Archaeology and Ancient Mysteries',
  description: 'Evidence-led English articles on archaeology, ancient texts, historical mysteries and global history.',
  alternates: { canonical: '/en', languages: { en: '/en', 'tr-TR': '/', 'x-default': '/en' } },
};

export default function EnglishHomePage() {
  return <ProfessionalEnglishHome />;
}
