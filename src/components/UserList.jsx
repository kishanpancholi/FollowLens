import { useState } from "react";

const PAGE_SIZE = 50;

export default function UserList({ t, names, onOpen }) {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const q = query.trim().toLowerCase().replace(/^@/, "");
  const rows = q ? names.filter((n) => n.includes(q)) : names;

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShown(PAGE_SIZE);
        }}
        placeholder={t.search}
        className="w-full rounded-card border border-line bg-card px-3.5 py-2.5"
      />

      <div className="mt-3 overflow-hidden rounded-card border border-line bg-card shadow-card">
        {rows.length === 0 ? (
          <p className="p-7 text-center text-muted">{t.empty}</p>
        ) : (
          rows.slice(0, shown).map((name) => (
            <div
              key={name}
              className="flex items-center gap-3 border-b border-line px-3.5 py-2.5 last:border-b-0"
            >
              <div className="ring-insta grid h-10 w-10 shrink-0 place-items-center rounded-full font-extrabold text-accent">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1 truncate font-semibold">
                @{name}
              </div>
              <button
                onClick={() => onOpen(name)}
                className="whitespace-nowrap rounded-[10px] border border-line bg-card px-2.5 py-1.5 text-sm font-semibold text-accent hover:bg-soft"
              >
                {t.open}
              </button>
            </div>
          ))
        )}

        {rows.length > shown && (
          <div className="p-3 text-center">
            <button
              onClick={() => setShown(shown + PAGE_SIZE)}
              className="btn-ghost"
            >
              {t.more}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
