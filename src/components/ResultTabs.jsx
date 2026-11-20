export default function ResultTabs({ t, counts, active, onChange }) {
  return (
    <div role="tablist" className="mb-4 grid grid-cols-3 gap-2">
      {counts.map((count, i) => {
        const selected = active === i;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(i)}
            className={`rounded-card border p-3 text-left shadow-card ${
              selected ? "border-accent bg-soft" : "border-line bg-card"
            }`}
          >
            <b
              className={`block text-2xl font-extrabold leading-tight ${selected ? "text-accent" : ""}`}
            >
              {count.toLocaleString()}
            </b>
            <span className="text-xs text-muted">{t.tabs[i]}</span>
          </button>
        );
      })}
    </div>
  );
}
