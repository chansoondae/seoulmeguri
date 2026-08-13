import type { Pitfall } from "@/content/types";

const STYLES: Record<
  Pitfall["severity"],
  { border: string; bg: string; label: string; icon: string }
> = {
  info: {
    border: "var(--brand-ice)",
    bg: "color-mix(in oklab, var(--brand-ice) 40%, var(--paper))",
    label: "メモ",
    icon: "ⓘ",
  },
  warn: {
    border: "var(--brand-petal)",
    bg: "color-mix(in oklab, var(--brand-petal) 40%, var(--paper))",
    label: "注意",
    icon: "⚠",
  },
  danger: {
    border: "var(--warn)",
    bg: "color-mix(in oklab, var(--brand-petal) 60%, var(--paper))",
    label: "重要",
    icon: "✕",
  },
};

export function PitfallBox({ pitfall }: { pitfall: Pitfall }) {
  const s = STYLES[pitfall.severity];
  return (
    <div
      role="note"
      className="rounded-2xl border p-4 md:p-5"
      style={{ borderColor: s.border, background: s.bg }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-sm"
          style={{
            background: s.border,
            color: pitfall.severity === "danger" ? "#fff" : "var(--ink)",
          }}
        >
          {s.icon}
        </span>
        <span className="t-caption">{s.label}</span>
      </div>
      <h3 className="t-title mb-1">{pitfall.title}</h3>
      <p className="t-body-s">{pitfall.body}</p>
    </div>
  );
}
