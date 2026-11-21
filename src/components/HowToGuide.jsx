export default function HowToGuide({ t }) {
  return (
    <details
      open
      className="rounded-card border border-line bg-card p-4 shadow-card"
    >
      <summary className="cursor-pointer text-lg font-extrabold">
        {t.howTitle}
      </summary>
      <ol className="steps mt-4">
        {t.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      <p className="text-sm text-muted">{t.howNote}</p>
    </details>
  );
}
