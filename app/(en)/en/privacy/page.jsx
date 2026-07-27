export const metadata = {
  title: 'Privacy Policy',
  description: 'How ODYOMUH handles technical logs, local preferences, Google Analytics, Google AdSense and contact messages.',
  alternates: { canonical: '/en/privacy', languages: { en: '/en/privacy', 'x-default': '/en/privacy' } },
};

const sections = [
  ['Technical information', 'Hosting and security services may process an IP address, browser and device information, requested pages, timestamps, response status and error details. These records are used to deliver the site, protect it from abuse and diagnose technical problems.'],
  ['Local browser storage', 'Theme and cookie choices may be stored in the current browser. These records are not user accounts, are not synchronized between devices and can be removed by clearing ODYOMUH site data.'],
  ['Google Analytics', 'If analytics consent is granted, Google Analytics may measure page views, traffic sources and basic interactions. Analytics storage is denied by default through Google Consent Mode and is updated only according to the visitor’s choice.'],
  ['Google AdSense', 'ODYOMUH may use Google AdSense to support free editorial content. Google and authorized advertising vendors may use cookies or similar technologies for ad delivery, frequency control, fraud prevention, reporting and, where permitted, personalization.'],
  ['Restricted consent state', 'Advertising storage, ad user data and ad personalization signals are denied by default. The AdSense tag may load in a restricted Consent Mode state for site verification and consent signalling; this does not grant permission for advertising cookies or personalized advertising.'],
  ['Service providers and transfers', 'Hosting, analytics and advertising providers may process limited technical or consent-based information on infrastructure located outside the visitor’s country under their own privacy and security terms.'],
  ['Contact messages and rights', 'Information sent by email is used to answer the request and is not published without permission except where required by law. Privacy, correction or deletion requests may be sent to odyomuh@gmail.com.'],
  ['Children and updates', 'ODYOMUH is a general-audience history publication and does not intentionally collect personal information from children. This policy may be updated when services or legal requirements change.'],
];

export default function EnglishPrivacyPage() {
  return (
    <div className="english-edition english-policy-page" lang="en">
      <header className="english-page-hero">
        <p className="eyebrow">Privacy · Updated July 27, 2026</p>
        <h1>Privacy Policy</h1>
        <p>How ODYOMUH handles technical logs, local preferences, Google Analytics, Google AdSense and contact messages.</p>
      </header>
      <article className="english-policy-content">
        {sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
      </article>
    </div>
  );
}
