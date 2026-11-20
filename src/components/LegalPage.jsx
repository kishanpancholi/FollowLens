const CONTACT_EMAIL = "your-email@example.com";
const UPDATED = "19 November 2026";

const privacy = [
  {
    h: "What this site does",
    p: [
      "InstaTrack compares the followers and following lists from the data export that you download from Instagram, and shows you who does not follow you back.",
    ],
  },
  {
    h: "Data you upload",
    p: [
      "The files you choose are read and processed only inside your own browser, on your own device. They are not uploaded to our servers, and we do not store, copy, or look at them.",
      "The files contain usernames of other people. These are also processed only on your device. When you close or reload the page, the loaded data is gone.",
    ],
  },
  {
    h: "What is stored on your device",
    p: [
      "If you tick “Remember my choice” when opening a profile, the site saves one small setting (Instagram app or browser) in your browser’s local storage. Nothing else is saved. You can remove it with the “Change app/browser choice” button or by clearing your browser data.",
    ],
  },
  {
    h: "Cookies and tracking",
    p: [
      "This site does not use cookies, advertising trackers, or analytics, and it does not ask you to log in or give any Instagram password.",
    ],
  },
  {
    h: "Hosting and third parties",
    p: [
      "The site is delivered by a web hosting provider. Like most websites, the host may record technical information such as IP address, browser type, and the time of a visit in its server logs. This is separate from the files you upload, which never reach the server.",
      "When you tap “Open profile”, you leave this site and go to Instagram, which is run by Meta and has its own privacy policy.",
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      "If this policy changes, for example if analytics is added, the updated version and date will be posted on this page.",
    ],
  },
  {
    h: "Contact",
    p: [`Questions about privacy can be sent to ${CONTACT_EMAIL}.`],
  },
];

const terms = [
  {
    h: "About this tool",
    p: [
      "InstaTrack is an independent tool. It is not affiliated with, endorsed by, or connected to Instagram or Meta.",
    ],
  },
  {
    h: "How to use it",
    p: [
      "Use this tool only with the data export of your own Instagram account, or with data you have permission to use.",
      "The site does not log in to Instagram and does not follow, unfollow, or change anything on your account. If you want to unfollow someone, you do it yourself in Instagram.",
    ],
  },
  {
    h: "Accuracy of results",
    p: [
      "Results are based only on the files you upload. They show your account as it was on the date of the export. Recent follows or unfollows, username changes, and deactivated or deleted accounts can cause differences from what you see on Instagram.",
      "Use the “Open profile” button to check any name before you act on it.",
    ],
  },
  {
    h: "No warranty",
    p: [
      "The tool is provided “as is” and “as available”, without any promise that it will be error-free, uninterrupted, or suitable for a particular purpose.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "To the extent allowed by law, the owner of this site is not responsible for any loss or damage that results from using the tool or relying on its results.",
    ],
  },
  {
    h: "Changes and contact",
    p: [
      "These terms may be updated from time to time. Continued use of the site means you accept the current version.",
      `Questions can be sent to ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function LegalPage({ t, page }) {
  const isPrivacy = page === "privacy";
  const sections = isPrivacy ? privacy : terms;

  return (
    <article>
      <a href="#/" className="mb-4 inline-block font-semibold text-accent">
        ← {t.back}
      </a>
      <h1 className="mb-1 text-3xl font-extrabold">
        {isPrivacy ? t.privacyLink : t.termsLink}
      </h1>
      <p className="mb-6 text-sm text-muted">Last updated: {UPDATED}</p>

      {sections.map((s) => (
        <section key={s.h} className="mb-5">
          <h2 className="mb-1 text-lg font-extrabold">{s.h}</h2>
          {s.p.map((text, i) => (
            <p key={i} className="mb-2 text-ink/80">
              {text}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
