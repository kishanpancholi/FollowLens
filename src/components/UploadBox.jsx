export default function UploadBox({ t, onFiles, onDemo, loading, errorKey }) {
  function handleChange(e) {
    if (e.target.files.length) onFiles(e.target.files);
    e.target.value = ""; // lets the user pick the same files again
  }

  return (
    <div className="rounded-card border border-line bg-card p-6 text-center shadow-card">
      <div className="bg-insta-btn mx-auto mb-3 grid h-[60px] w-[60px] place-items-center rounded-full shadow-card">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
        </svg>
      </div>
      <h2 className="mb-1 text-xl font-extrabold">{t.dropTitle}</h2>
      <p className="mb-4 text-[15px] text-muted">{t.dropHint}</p>

      <label className="btn-primary w-full focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-[#8134af]">
        <input
          type="file"
          multiple
          accept=".json,.zip,application/json,application/zip"
          onChange={handleChange}
          className="sr-only"
        />
        {loading ? "..." : t.chooseBtn}
      </label>

      <div className="my-3 flex items-center gap-3 text-sm text-muted before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
        {t.or}
      </div>

      <button onClick={onDemo} className="btn-ghost w-full">
        {t.demo}
      </button>

      {errorKey && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-danger-soft px-4 py-2 text-left text-danger"
        >
          {t.errors[errorKey]}
        </p>
      )}
    </div>
  );
}
