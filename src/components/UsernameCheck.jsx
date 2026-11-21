import { useState } from "react";

const STYLES = {
  m: "bg-emerald-100 text-emerald-800",
  nb: "bg-danger-soft text-danger",
  yd: "bg-soft text-accent",
  no: "bg-line text-muted",
};

export default function UsernameCheck({ t, followers, following }) {
  const [q, setQ] = useState("");
  const name = q.trim().toLowerCase().replace(/^@/, "");

  let key = "";
  if (name) {
    const inFollowers = followers.has(name);
    const inFollowing = following.has(name);
    key =
      inFollowers && inFollowing
        ? "m"
        : inFollowing
          ? "nb"
          : inFollowers
            ? "yd"
            : "no";
  }

  return (
    <div>
      <p className="mb-1.5 font-semibold">{t.checkTitle}</p>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.checkPh}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        className="w-full rounded-card border border-line bg-card px-3.5 py-2.5"
      />
      <div aria-live="polite">
        {key && (
          <p
            className={`mt-2 inline-block rounded-[10px] px-3 py-1.5 text-sm font-semibold ${STYLES[key]}`}
          >
            @{name}: {t.result[key]}
          </p>
        )}
      </div>
    </div>
  );
}
