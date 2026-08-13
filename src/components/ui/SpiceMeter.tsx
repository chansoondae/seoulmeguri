export function SpiceMeter({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const labels: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: "ほぼ辛くない",
    2: "少しピリッと",
    3: "はっきり辛い",
    4: "けっこう辛い",
    5: "本気で辛い",
  };
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 t-caption"
      style={{
        background: "color-mix(in oklab, var(--brand-petal) 50%, var(--paper))",
      }}
      aria-label={`辛さレベル ${level}／5：${labels[level]}`}
    >
      <span aria-hidden className="t-data">
        {"★".repeat(level)}
        <span style={{ color: "var(--ink-3)" }}>{"★".repeat(5 - level)}</span>
      </span>
      <span>{labels[level]}</span>
    </div>
  );
}
