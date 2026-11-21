export default function StatCards({
  t,
  lang,
  followers,
  following,
  exportDate,
}) {
  const date = exportDate
    ? new Date(exportDate + "T00:00:00").toLocaleDateString(
        lang === "gu" ? "gu-IN" : "en-GB",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
      )
    : "—";

  const cards = [
    [followers.toLocaleString(), t.followers, false],
    [following.toLocaleString(), t.following, false],
    [date, t.exportDate, true],
  ];

  return (
    <div className="mb-3.5 grid grid-cols-3 gap-2.5">
      {cards.map(([value, label, small]) => (
        <div
          key={label}
          className="rounded-card border border-line bg-card px-2 py-3 text-center shadow-card"
        >
          <b
            className={`block font-extrabold leading-tight text-accent ${small ? "pt-1 text-base" : "text-[22px] sm:text-2xl"}`}
          >
            {value}
          </b>
          <span className="block text-[11px] leading-tight text-muted sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
