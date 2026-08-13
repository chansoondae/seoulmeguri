import Link from "next/link";
import type { Area } from "@/content/types";
import { KEY_COLOR_VAR, KEY_COLOR_SOFT_VAR } from "@/lib/keyColor";

export function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="block rounded-3xl overflow-hidden border no-underline transition-transform hover:-translate-y-0.5"
      style={{
        borderColor: "var(--line)",
        background: KEY_COLOR_SOFT_VAR[area.keyColor],
      }}
    >
      <div
        aria-hidden
        className="h-24 md:h-28"
        style={{
          background: `linear-gradient(135deg, ${KEY_COLOR_VAR[area.keyColor]} 0%, ${KEY_COLOR_SOFT_VAR[area.keyColor]} 100%)`,
        }}
      />
      <div className="p-5 md:p-6 bg-paper">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className="t-display-m text-ink">{area.nameJa}</h3>
          <span className="t-caption">{area.reading}</span>
        </div>
        <p className="t-title mt-2 text-ink">{area.tagline}</p>
        <p className="t-body-s mt-3" style={{ color: "var(--ink-2)" }}>
          {area.intro}
        </p>
        <p
          className="t-caption mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1"
          style={{
            background: "var(--paper-2)",
            color: "var(--ink)",
          }}
        >
          <span aria-hidden>⚠</span>
          {area.weekdayNote}
        </p>
      </div>
    </Link>
  );
}
