import { useEffect, useMemo, useState } from "react";
import { getText, languages } from "./i18n";
import { loadFiles } from "./lib/parser";
import { compareLists } from "./lib/compare";
import { makeDemoData } from "./lib/demo";
import { downloadCsv } from "./lib/csv";
import UploadBox from "./components/UploadBox";
import HowToGuide from "./components/HowToGuide";
import ResultTabs from "./components/ResultTabs";
import UserList from "./components/UserList";
import UsernameCheck from "./components/UsernameCheck";
import LegalPage from "./components/LegalPage";
import OpenProfileDialog, {
  getSavedChoice,
  clearSavedChoice,
  openProfile,
} from "./components/OpenProfileDialog";

function getPage() {
  const h = window.location.hash;
  if (h === "#/privacy") return "privacy";
  if (h === "#/terms") return "terms";
  return "home";
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [data, setData] = useState(null); // { followers, following, report, exportDate, isDemo }
  const [errorKey, setErrorKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [pendingUser, setPendingUser] = useState("");
  const [page, setPage] = useState(getPage());
  const t = getText(lang);

  useEffect(() => {
    function onHash() {
      setPage(getPage());
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  async function handleFiles(files) {
    setErrorKey("");
    setLoading(true);
    try {
      const { followers, following, report, exportDate } =
        await loadFiles(files);
      setData({ followers, following, report, exportDate, isDemo: false });
      setTab(0);
    } catch (e) {
      setErrorKey(e.message in t.errors ? e.message : "UNKNOWN");
    } finally {
      setLoading(false);
    }
  }

  function handleDemo() {
    setErrorKey("");
    setData({ ...makeDemoData(), isDemo: true });
    setTab(0);
  }

  function reset() {
    setData(null);
    setErrorKey("");
    setTab(0);
  }

  function askOpen(name) {
    const saved = getSavedChoice();
    if (saved) openProfile(saved, name);
    else setPendingUser(name);
  }

  const result = useMemo(
    () => (data ? compareLists(data.followers, data.following) : null),
    [data],
  );
  const lists = result
    ? [result.notFollowingBack, result.youDontInstaTrack, result.mutuals]
    : null;

  return (
    <div className="min-h-screen bg-page text-ink">
      <div className="mx-auto max-w-2xl px-4 py-5 pb-12">
        <header className="mb-8 flex items-center justify-between">
          <a href="#/" className="text-insta text-xl font-extrabold">
            {t.appName}
          </a>
          <div
            className="flex overflow-hidden rounded-full border border-line bg-card"
            role="group"
            aria-label="Language"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                className={`px-3 py-1.5 text-sm ${lang === l.code ? "bg-insta-btn font-semibold" : "text-muted"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </header>

        {page !== "home" ? (
          <LegalPage t={t} page={page} />
        ) : !data ? (
          <>
            <h1 className="text-insta mb-3 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
              {t.title}
            </h1>
            <p className="mb-6 max-w-prose text-muted">{t.sub}</p>
            <UploadBox
              t={t}
              onFiles={handleFiles}
              onDemo={handleDemo}
              loading={loading}
              errorKey={errorKey}
            />
            <HowToGuide t={t} />
          </>
        ) : (
          <>
            {data.isDemo && (
              <p className="mb-3 inline-block rounded-lg bg-soft px-3 py-1 text-sm text-accent">
                {t.demoTag}
              </p>
            )}

            <p className="mb-1 font-semibold">
              {t.followersFound}: {data.followers.size.toLocaleString()} ·{" "}
              {t.followingFound}: {data.following.size.toLocaleString()}
            </p>
            <p className="mb-4 text-sm text-muted">{t.compare}</p>

            {data.exportDate && (
              <p className="mb-4 text-sm font-semibold">
                {t.exportDate}: {data.exportDate}
              </p>
            )}

            {data.report && (
              <details className="mb-4 text-sm">
                <summary className="cursor-pointer">Files used</summary>
                <ul className="mt-2 space-y-1">
                  {data.report.map((r, i) => (
                    <li key={i}>
                      {r.file}: {r.type}, {r.entries} entries, {r.unique} unique
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <UsernameCheck
              followers={data.followers}
              following={data.following}
            />

            <ResultTabs
              t={t}
              counts={lists.map((l) => l.length)}
              active={tab}
              onChange={setTab}
            />
            <UserList key={tab} t={t} names={lists[tab]} onOpen={askOpen} />

            <p className="mt-4 text-sm text-muted">{t.accuracyNote}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={reset} className="btn-ghost">
                {t.reset}
              </button>
              <button onClick={clearSavedChoice} className="btn-ghost">
                {t.forget}
              </button>
              <button
                onClick={() => downloadCsv(lists[tab], tab, data.exportDate)}
                className="btn-primary"
              >
                {t.exportCsv}
              </button>
            </div>
          </>
        )}

        <footer className="mt-10 text-sm text-muted">
          <p>{t.privacy}</p>
          <p className="mt-2 flex gap-4">
            <a href="#/privacy" className="underline">
              {t.privacyLink}
            </a>
            <a href="#/terms" className="underline">
              {t.termsLink}
            </a>
          </p>
        </footer>

        <OpenProfileDialog
          t={t}
          username={pendingUser}
          onClose={() => setPendingUser("")}
        />
      </div>
    </div>
  );
}
