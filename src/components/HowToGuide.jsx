export default function HowToGuide({ t }) {
  return (
    <details
      open
      className="mt-8 rounded-card border border-line bg-card p-4 shadow-card"
    >
      <summary className="cursor-pointer font-extrabold">{t.howTitle}</summary>
      <ol className="ml-5 mt-3 list-decimal space-y-2">
        {t.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      <p className="text-sm text-muted">{t.howNote}</p>
    </details>
  );
}
