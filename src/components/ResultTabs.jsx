export default function ResultTabs({ t, counts, active, onChange }) {
  return (
    <div role="tablist" className="mb-3 mt-3.5 grid grid-cols-3 gap-2.5">
      {counts.map((count, i) => {
        const selected = active === i;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(i)}
            className={`rounded-card border px-2 py-3 text-center shadow-card ${
              selected ? "border-accent bg-soft" : "border-line bg-card"
            }`}
          >
            <b
              className={`block text-[22px] font-extrabold leading-tight sm:text-2xl ${selected ? "text-accent" : ""}`}
            >
              {count.toLocaleString()}
            </b>
            <span className="block text-[11px] leading-tight text-muted sm:text-xs">
              {t.tabs[i]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
