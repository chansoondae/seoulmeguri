import { areas } from "@/content/areas";
import {
  WEEKDAYS,
  WEEKDAY_JA_FULL,
  OPEN_STATE_LABEL_FORMAL,
} from "@/lib/weekday";

/**
 * Server-rendered fallback / secondary view of the weekday matrix.
 *
 * The interactive WeekdayChecker is a client component whose initial SSR
 * state has `selected = null` (to avoid hydration mismatch). That means
 * crawlers and AI agents that only see server HTML would not know what's
 * open on which day. This component fills that gap: it emits every
 * (area × weekday → state) fact as a self-contained sentence in a
 * <details> block, so the full matrix is always in the static HTML while
 * staying visually collapsed by default.
 */
export function WeekdayMatrixSummary() {
  return (
    <details
      className="mt-4 rounded-2xl border p-4"
      style={{
        borderColor: "var(--line)",
        background: "var(--paper)",
      }}
    >
      <summary
        className="t-caption cursor-pointer"
        style={{ color: "var(--ink-2)" }}
      >
        すべての曜日 × エリアの一覧を見る（{areas.length} エリア ×{" "}
        {WEEKDAYS.length} 曜日）
      </summary>
      <ul className="mt-3 space-y-1.5">
        {areas.flatMap((area) =>
          WEEKDAYS.map((day) => {
            const state = area.weekday[day];
            return (
              <li
                key={`${area.slug}-${day}`}
                className="t-body-s"
                style={{ color: "var(--ink-2)" }}
              >
                {area.nameJa}エリアは{WEEKDAY_JA_FULL[day]}は
                {OPEN_STATE_LABEL_FORMAL[state]}
                {state === "closed"
                  ? "。訪問はおすすめしません"
                  : state === "partial"
                  ? "。目的次第で判断してください"
                  : "。ほぼ全施設が動きます"}
                。
              </li>
            );
          }),
        )}
      </ul>
    </details>
  );
}
