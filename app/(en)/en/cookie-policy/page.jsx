export const metadata = {
  title: 'Cookie Policy',
  description: 'The necessary, analytics and Google AdSense advertising storage used by ODYOMUH and how visitors control consent.',
  alternates: { canonical: '/en/cookie-policy', languages: { en: '/en/cookie-policy', 'x-default': '/en/cookie-policy' } },
};

const sections = [
  ['Necessary storage', 'The site may store theme and consent choices in local browser storage so that the interface and privacy controls can remember a visitor’s preference. This storage is not used for advertising personalization.'],
  ['Analytics storage', 'If accepted, Google Analytics may use identifiers such as _ga, _ga_* or related technologies to measure visits and interactions. Analytics storage is denied until the visitor grants consent.'],
  ['Advertising storage', 'If accepted, Google AdSense and authorized advertising vendors may use identifiers such as __gads, __gpi, IDE, DSID or similar technologies for ad delivery, frequency control, fraud prevention, measurement and personalization. Advertising storage and personalization signals are denied by default.'],
  ['Consent Mode and verification', 'The AdSense script may be present in a restricted Google Consent Mode state before a choice is made so that site ownership can be verified and consent signals can be communicated. This does not grant permission for advertising cookies or personalized advertising.'],
  ['Changing a choice', 'Visitors can accept or reject optional storage in the consent panel. Clearing the site’s local storage or browser data resets the prompt. Rejecting optional categories does not block access to ODYOMUH articles.'],
  ['Third parties', 'Cookie names and retention periods can change as Google services evolve or according to regional settings. Google Analytics and Google AdSense are also governed by Google’s own privacy and advertising terms.'],
];

export default function EnglishCookiePolicyPage() {
  return (
    <div className="english-edition english-policy-page" lang="en">
      <header className="english-page-hero">
        <p className="eyebrow">Cookie preferences · Updated July 27, 2026</p>
        <h1>Cookie Policy</h1>
        <p>The necessary, analytics and Google AdSense advertising storage used by ODYOMUH and how visitors control consent.</p>
      </header>
      <article className="english-policy-content">
        {sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
      </article>
    </div>
  );
}
