export function FitFilter({
  goodFor,
  notFor,
}: {
  goodFor: string[];
  notFor: string[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div
        className="rounded-2xl p-5"
        style={{
          background:
            "color-mix(in oklab, var(--brand-ice) 40%, var(--paper))",
        }}
      >
        <h3 className="t-title mb-3">
          <span aria-hidden>◎ </span>
          こんな人におすすめ
        </h3>
        <ul className="space-y-2">
          {goodFor.map((g) => (
            <li key={g} className="t-body-s pl-5 relative">
              <span
                aria-hidden
                className="absolute left-0 top-2.5 w-2 h-2 rounded-full"
                style={{ background: "var(--link)" }}
              />
              {g}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="rounded-2xl p-5"
        style={{
          background:
            "color-mix(in oklab, var(--brand-petal) 40%, var(--paper))",
        }}
      >
        <h3 className="t-title mb-3">
          <span aria-hidden>✕ </span>
          このエリアは向かないかも
        </h3>
        <ul className="space-y-2">
          {notFor.map((g) => (
            <li key={g} className="t-body-s pl-5 relative">
              <span
                aria-hidden
                className="absolute left-0 top-2.5 w-2 h-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
