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

export default function OpenProfileDialog({ t, username, onClose, onSaved }) {
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
      onSaved?.();
    }
    openProfile(how, username);
    onClose();
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-[380px] rounded-[18px] border border-line bg-card p-[22px] text-ink shadow-2xl backdrop:bg-ink/45"
    >
      <h2 className="text-[22px] font-extrabold">{t.chooseTitle}</h2>
      <p className="mb-4 mt-0.5 break-all text-sm text-muted">@{username}</p>

      <div className="mb-4 grid gap-2.5">
        <button onClick={() => choose("app")} className="btn-primary w-full">
          {t.openApp}
        </button>
        <button onClick={() => choose("web")} className="btn-ghost w-full">
          {t.openWeb}
        </button>
      </div>

      <label className="mb-3 flex items-center gap-2 text-[15px]">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 accent-[#c13584]"
        />
        {t.remember}
      </label>
      <p className="mb-3.5 text-sm text-muted">{t.appNote}</p>
      <button onClick={onClose} className="btn-ghost">
        {t.cancel}
      </button>
    </dialog>
  );
}
