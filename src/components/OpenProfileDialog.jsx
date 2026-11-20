import { useEffect, useRef, useState } from "react";

const KEY = "fb_open";

export function getSavedChoice() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function clearSavedChoice() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function openProfile(how, username) {
  const u = encodeURIComponent(username);
  if (how === "app") window.location.href = `instagram://user?username=${u}`;
  else
    window.open(`https://instagram.com/${u}`, "_blank", "noopener,noreferrer");
}

export default function OpenProfileDialog({ t, username, onClose }) {
  const ref = useRef(null);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (username && !d.open) {
      setRemember(false);
      d.showModal();
    }
    if (!username && d.open) d.close();
  }, [username]);

  function choose(how) {
    if (remember) {
      try {
        localStorage.setItem(KEY, how);
      } catch {
        /* ignore */
      }
    }
    openProfile(how, username);
    onClose();
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-card border border-line bg-card p-5 text-ink shadow-card backdrop:bg-ink/50"
    >
      <h2 className="text-xl font-extrabold">{t.chooseTitle}</h2>
      <p className="text-sm text-muted">@{username}</p>

      <div className="my-4 grid gap-2">
        <button onClick={() => choose("app")} className="btn-primary">
          {t.openApp}
        </button>
        <button onClick={() => choose("web")} className="btn-ghost">
          {t.openWeb}
        </button>
      </div>

      <label className="mb-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        {t.remember}
      </label>
      <p className="mb-3 text-sm text-muted">{t.appNote}</p>
      <button onClick={onClose} className="btn-ghost">
        {t.cancel}
      </button>
    </dialog>
  );
}
