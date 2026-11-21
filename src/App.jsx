import { useEffect, useMemo, useState } from "react";
import { getText, languages } from "./i18n";
import { loadFiles } from "./lib/parser";
import { compareLists } from "./lib/compare";
import { makeDemoData } from "./lib/demo";
import { downloadCsv } from "./lib/csv";
import UploadBox from "./components/UploadBox";
import TrustCards from "./components/TrustCards";
import HowToGuide from "./components/HowToGuide";
import StatCards from "./components/StatCards";
import UsernameCheck from "./components/UsernameCheck";
import ResultTabs from "./components/ResultTabs";
import UserList from "./components/UserList";
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
  const [data, setData] = useState(null); // { followers, following, exportDate, isDemo }
  const [errorKey, setErrorKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [pendingUser, setPendingUser] = useState("");
  const [page, setPage] = useState(getPage());
  const [savedChoice, setSavedChoice] = useState(getSavedChoice());
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
      const { followers, following, exportDate } = await loadFiles(files);
      setData({ followers, following, exportDate, isDemo: false });
      setTab(0);
    } catch (e) {
      setErrorKey(e.message in t.errors ? e.message : "UNKNOWN");
    } finally {
      setLoading(false);
    }
  }

  function handleDemo() {
    setErrorKey("");
    setData({ ...makeDemoData(), exportDate: "2026-11-16", isDemo: true });
    setTab(0);
  }

  function reset() {
    setData(null);
    setErrorKey("");
    setTab(0);
    window.scrollTo(0, 0);
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
    ? [
        result.notFollowingBack ?? [],
        result.youDontFollowBack ?? [],
        result.mutuals ?? [],
      ]
    : null;

  return (
    <div className="min-h-screen bg-page text-ink">
      <div className="mx-auto max-w-2xl px-4 py-4 pb-10">
        <header className="mb-5 flex items-center justify-between">
          <a href="#/" className="text-insta text-[22px] font-extrabold">
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
                className={`px-3.5 py-1.5 text-sm ${lang === l.code ? "bg-insta-btn font-semibold" : "text-muted"}`}
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
            <span className="ring-insta mb-3.5 inline-block rounded-full px-3.5 py-0.5 text-[13px] font-semibold text-accent">
              {t.badge}
            </span>
            <h1 className="text-insta mb-3 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
              {t.title}
            </h1>
            <p className="mb-5 max-w-prose text-muted">{t.sub}</p>
            <UploadBox
              t={t}
              onFiles={handleFiles}
              onDemo={handleDemo}
              loading={loading}
              errorKey={errorKey}
            />
            <TrustCards t={t} />
            <HowToGuide t={t} />
          </>
        ) : (
          <>
            {data.isDemo && (
              <p className="mb-3 inline-block rounded-lg bg-soft px-3 py-1 text-sm text-accent">
                {t.demoTag}
              </p>
            )}

            <StatCards
              t={t}
              lang={lang}
              followers={data.followers.size}
              following={data.following.size}
              exportDate={data.exportDate}
            />

            <UsernameCheck
              t={t}
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

            <p className="my-4 text-sm text-muted">{t.accuracyNote}</p>

            <div className="flex justify-between gap-3">
              <button
                onClick={reset}
                className="btn-ghost max-w-[260px] flex-1"
              >
                {t.reset}
              </button>
              <button
                onClick={() => downloadCsv(lists[tab], tab, data.exportDate)}
                className="btn-primary max-w-[260px] flex-1"
              >
                {t.exportCsv}
              </button>
            </div>
          </>
        )}

        <footer className="mt-6 text-sm text-muted">
          <p className="mb-2">{t.privacy}</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="#/privacy" className="underline">
              {t.privacyLink}
            </a>
            <a href="#/terms" className="underline">
              {t.termsLink}
            </a>
            {savedChoice && (
              <button
                onClick={() => {
                  clearSavedChoice();
                  setSavedChoice(null);
                }}
                className="underline"
              >
                {t.forget}
              </button>
            )}
          </p>
        </footer>

        <OpenProfileDialog
          t={t}
          username={pendingUser}
          onClose={() => setPendingUser("")}
          onSaved={() => setSavedChoice(getSavedChoice())}
        />
      </div>
    </div>
  );
}
