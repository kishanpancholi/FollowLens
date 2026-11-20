export default function UploadBox({ t, onFiles, onDemo, loading, errorKey }) {
  function handleChange(e) {
    if (e.target.files.length) onFiles(e.target.files);
    e.target.value = ""; // lets the user pick the same files again
  }

  return (
    <div>
      <label className="block cursor-pointer rounded-card border-2 border-dashed border-line bg-card p-8 text-center shadow-card focus-within:border-accent hover:border-accent">
        <input
          type="file"
          multiple
          accept=".json,.zip,application/json,application/zip"
          onChange={handleChange}
          className="sr-only"
        />
        <strong>{loading ? "..." : t.drop}</strong>
        <p className="mt-2 text-sm text-muted">{t.dropHint}</p>
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={onDemo} className="btn-primary">
          {t.demo}
        </button>
        <span className="text-sm text-muted">{t.demoHint}</span>
      </div>

      {errorKey && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-danger-soft px-4 py-2 text-danger"
        >
          {t.errors[errorKey]}
        </p>
      )}
    </div>
  );
}
