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
    description: 'How ODYOMUH handles technical logs, local preferences, Google Analytics, Google AdSense and contact messages.',
    eyebrow: 'Privacy · Updated July 27, 2026',
    sections: [
      ['Technical information', 'Hosting and security services may process an IP address, browser and device information, requested pages, timestamps, response status and error details. These records are used to deliver the site, protect it from abuse and diagnose technical problems.'],
      ['Local browser storage', 'Theme and cookie choices may be stored in the current browser. These records are not user accounts, are not synchronized between devices and can be removed by clearing ODYOMUH site data.'],
      ['Google Analytics', 'If analytics consent is granted, Google Analytics may measure page views, traffic sources and basic interactions. Analytics storage is denied by default through Google Consent Mode and is updated only according to the visitor’s choice.'],
      ['Google AdSense', 'ODYOMUH may use Google AdSense to support free editorial content. Google and authorized advertising vendors may use cookies or similar technologies for ad delivery, frequency control, fraud prevention, reporting and, where permitted, personalization.'],
      ['Restricted consent state', 'Advertising storage, ad user data and ad personalization signals are denied by default. The AdSense tag may load in a restricted Consent Mode state for site verification and consent signalling; this does not grant permission for advertising cookies or personalized advertising.'],
      ['Service providers and transfers', 'Hosting, analytics and advertising providers may process limited technical or consent-based information on infrastructure located outside the visitor’s country under their own privacy and security terms.'],
      ['Contact messages and rights', 'Information sent by email is used to answer the request and is not published without permission except where required by law. Privacy, correction or deletion requests may be sent to odyomuh@gmail.com.'],
      ['Children and updates', 'ODYOMUH is a general-audience history publication and does not intentionally collect personal information from children. This policy may be updated when services or legal requirements change.'],
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'The necessary, analytics and Google AdSense advertising storage used by ODYOMUH and how visitors control consent.',
    eyebrow: 'Cookie preferences · Updated July 27, 2026',
    sections: [
      ['Necessary storage', 'The site may store theme and consent choices in local browser storage so that the interface and privacy controls can remember a visitor’s preference. This storage is not used for advertising personalization.'],
      ['Analytics storage', 'If accepted, Google Analytics may use identifiers such as _ga, _ga_* or related technologies to measure visits and interactions. Analytics storage is denied until the visitor grants consent.'],
      ['Advertising storage', 'If accepted, Google AdSense and authorized advertising vendors may use identifiers such as __gads, __gpi, IDE, DSID or similar technologies for ad delivery, frequency control, fraud prevention, measurement and personalization. Advertising storage and personalization signals are denied by default.'],
      ['Consent Mode and verification', 'The AdSense script may be present in a restricted Google Consent Mode state before a choice is made so that site ownership can be verified and consent signals can be communicated. This does not grant permission for advertising cookies or personalized advertising.'],
      ['Changing a choice', 'Visitors can accept or reject optional storage in the consent panel. Clearing the site’s local storage or browser data resets the prompt. Rejecting optional categories does not block access to ODYOMUH articles.'],
      ['Third parties', 'Cookie names and retention periods can change as Google services evolve or according to regional settings. Google Analytics and Google AdSense are also governed by Google’s own privacy and advertising terms.'],
    ],
  },
];

export function findEnglishPolicyPage(slug) {
  return englishPolicyPages.find((page) => page.slug === slug);
}

// Policy content is intentionally versioned so hosting integrations rebuild these routes.
