export const englishPolicyPages = [
  {
    slug: 'about',
    title: 'About ODYOMUH English',
    description: 'What ODYOMUH publishes, who the English edition is for and how the site approaches history and archaeology.',
    eyebrow: 'About the publication',
    sections: [
      ['A global reading edition', 'ODYOMUH English publishes accessible articles on archaeology, ancient texts, engineering history and popular historical claims. The English edition is edited as its own publication rather than being a machine-translated copy of the Turkish archive.'],
      ['What readers can expect', 'Articles distinguish primary evidence, scholarly interpretation and modern speculation. Uncertainty is stated directly. A dramatic headline is never treated as proof, and the absence of a complete explanation is not used as evidence for a preferred theory.'],
      ['Scope', 'The publication focuses on ancient civilizations, undeciphered writing, archaeological sites, historical technology and myths that circulate widely online. It does not provide antiquities valuations, authentication services or professional archaeological advice.'],
    ],
  },
  {
    slug: 'editorial-policy',
    title: 'Editorial Policy',
    description: 'The standards used to select, write, review and update ODYOMUH English articles.',
    eyebrow: 'How we publish',
    sections: [
      ['Topic selection', 'Topics are selected from reader questions, search demand and gaps in the existing archive. A new article must answer a distinct search intent and should not repeat an existing page with slightly different wording.'],
      ['Evidence hierarchy', 'Priority is given to excavation reports, museum catalogues, inscriptions, peer-reviewed research, academic books and official heritage documentation. Popular summaries may help explain a topic but do not replace the underlying evidence.'],
      ['Claims and uncertainty', 'Disputed interpretations are labelled as such. When specialists disagree, the article presents the main evidence behind each position and avoids manufacturing certainty. Unsupported claims are described accurately without being amplified as fact.'],
      ['Updates', 'Articles may be revised when new excavation results, improved dating, corrected translations or stronger research becomes available. Material changes are reflected in the updated date.'],
    ],
  },
  {
    slug: 'sources-and-fact-checking',
    title: 'Sources and Fact-Checking',
    description: 'How ODYOMUH English checks translations, dates, archaeological claims and viral historical stories.',
    eyebrow: 'Evidence first',
    sections: [
      ['Ancient texts', 'A quotation should be traceable to a named composition, tablet, manuscript or recognized edition. Dictionary meanings are not substituted for grammar, and one isolated sign is not presented as a complete translation.'],
      ['Archaeology', 'Claims are checked against context: excavation layer, dating method, associated objects, site history and later disturbance. Photographs detached from provenance are treated cautiously.'],
      ['Maps and images', 'Historical maps are read according to their date, projection, maker and geographic conventions. Visual resemblance alone is not accepted as proof of identity.'],
      ['Internet claims', 'Viral claims are tested by asking for primary evidence, chronology, a physical mechanism and a prediction that could be independently checked.'],
    ],
  },
  {
    slug: 'corrections',
    title: 'Corrections Policy',
    description: 'How readers can report an error and how ODYOMUH English records meaningful corrections.',
    eyebrow: 'Accuracy and accountability',
    sections: [
      ['Reporting an error', 'Readers can use the contact page to identify the article, disputed sentence and supporting source. Specific corrections can be assessed more quickly than general objections.'],
      ['What is corrected', 'Factual errors, broken citations, incorrect dates, misleading captions and material omissions are corrected. Differences of interpretation are clarified when the evidence supports more than one responsible reading.'],
      ['Correction notes', 'Minor spelling and formatting changes may be made silently. Changes that alter the meaning of an article should be noted within the page and reflected in the updated date.'],
    ],
  },
  {
    slug: 'contact',
    title: 'Contact ODYOMUH',
    description: 'Contact information for corrections, editorial questions and rights-related requests.',
    eyebrow: 'Contact',
    sections: [
      ['Editorial questions', 'For an article correction, include the article URL, the sentence in question and the source that supports the correction.'],
      ['Rights and images', 'For image attribution, removal or licensing questions, identify the exact page and image.'],
      ['Email', 'Contact: odyomuh.net@gmail.com'],
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'How ODYOMUH handles analytics, advertising, local preferences and contact messages.',
    eyebrow: 'Privacy',
    sections: [
      ['Consent-based scripts', 'Analytics and advertising scripts are not loaded until a visitor accepts optional cookies. Theme and consent preferences may be stored locally in the browser.'],
      ['Analytics and advertising', 'When consent is granted, third-party services may process device, page-view and advertising information according to their own policies. Visitors can reject optional cookies and continue reading the site.'],
      ['Contact messages', 'Information sent by email is used to answer the request and is not published without permission, except where required by law.'],
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'The necessary and optional storage used by ODYOMUH and how visitors control consent.',
    eyebrow: 'Cookie preferences',
    sections: [
      ['Necessary storage', 'The site may store theme and consent choices in local browser storage so that the interface can remember a visitor’s preference.'],
      ['Optional services', 'Analytics and advertising services are optional. They load only after the visitor selects Accept in the consent panel.'],
      ['Changing a choice', 'A visitor can clear the site’s local storage or browser data to reset the consent prompt. Browser privacy tools can also block third-party storage.'],
    ],
  },
];

export function findEnglishPolicyPage(slug) {
  return englishPolicyPages.find((page) => page.slug === slug);
}
