import { generatedArt } from '../app/site-data.js';

export const englishTopics = [
  {
    slug: 'mesopotamia',
    name: 'Mesopotamia and Ancient Texts',
    shortName: 'Mesopotamia',
    description: 'Sumerian, Akkadian and Babylonian texts explained without turning myth into modern pseudohistory.',
    image: generatedArt.globalHistoryHero,
  },
  {
    slug: 'undeciphered-scripts',
    name: 'Undeciphered Scripts',
    shortName: 'Ancient Scripts',
    description: 'Writing systems, inscriptions and the hard limits of decipherment, from Linear A to Rongorongo.',
    image: generatedArt.cuneiformGlobal,
  },
  {
    slug: 'lost-technology',
    name: 'Lost Technology and Engineering',
    shortName: 'Ancient Engineering',
    description: 'Machines, materials and construction methods that reveal what ancient engineering could really achieve.',
    image: generatedArt.antikytheraGlobal,
  },
  {
    slug: 'archaeological-mysteries',
    name: 'Archaeological Mysteries',
    shortName: 'Archaeology',
    description: 'Sites, cities and objects whose evidence is more interesting than the myths built around them.',
    image: generatedArt.gobekliGlobal,
  },
  {
    slug: 'myths-vs-evidence',
    name: 'Myths vs Evidence',
    shortName: 'Claims Checked',
    description: 'Popular historical claims examined by separating primary evidence, later interpretation and internet folklore.',
    image: generatedArt.mythsEvidenceGlobal,
  },
{
  slug: 'new-discoveries',
  name: 'New Archaeological Discoveries 2026',
  shortName: 'New Discoveries',
  description: 'Fresh archaeological and ancient-history research explained with the evidence, limits and publication context kept visible.',
  image: generatedArt.dakhlaCityTrend,
},

  {
    slug: 'middle-east',
    name: 'Middle East History and Current Affairs',
    shortName: 'Middle East',
    description: 'Dated explainers on Iran, Israel, the United States, the Houthis, sectarian history, nuclear policy and strategic waterways.',
    image: generatedArt.middleEastHub,
  },

];

export function findEnglishTopic(slug) {
  return englishTopics.find((topic) => topic.slug === slug);
}
