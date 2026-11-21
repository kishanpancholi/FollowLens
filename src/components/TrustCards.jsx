export default function TrustCards({ t }) {
  const items = [
    [t.t1, t.t1s],
    [t.t2, t.t2s],
    [t.t3, t.t3s],
  ];
  return (
    <div className="my-4 grid grid-cols-3 gap-2.5">
      {items.map(([title, sub]) => (
        <div
          key={title}
          className="rounded-card border border-line bg-card p-3 text-center shadow-card"
        >
          <b className="text-insta block text-[15px]">{title}</b>
          <span className="block text-xs leading-tight text-muted">{sub}</span>
        </div>
      ))}
    </div>
  );
}
