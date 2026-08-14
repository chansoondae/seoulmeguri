import type { FacilityWeekRow, OpenState } from "@/content/types";
import {
  WEEKDAYS,
  WEEKDAY_JA,
  WEEKDAY_JA_FULL,
  OPEN_STATE_SYMBOL,
  OPEN_STATE_LABEL_FORMAL,
} from "@/lib/weekday";

const CELL_BG: Record<OpenState, string> = {
  good: "color-mix(in oklab, var(--brand-ice) 40%, var(--paper))",
  partial: "color-mix(in oklab, var(--brand-petal) 40%, var(--paper))",
  closed: "color-mix(in oklab, var(--brand-orchid) 40%, var(--paper))",
};

export function WeekdayTable({ rows }: { rows: FacilityWeekRow[] }) {
  return (
    <div className="overflow-x-auto -mx-4 md:mx-0">
      <table className="min-w-full border-collapse t-body-s">
        <thead>
          <tr>
            <th
              scope="col"
              className="text-left p-3 border-b"
              style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}
            >
              施設
            </th>
            {WEEKDAYS.map((d) => (
              <th
                key={d}
                scope="col"
                className="p-3 border-b t-data text-center"
                style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}
              >
                {WEEKDAY_JA[d]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.facility}>
              <th
                scope="row"
                className="text-left align-top p-3 border-b font-normal"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="t-body-s block text-ink">{row.facility}</span>
                {row.note ? (
                  <span className="t-caption">{row.note}</span>
                ) : null}
              </th>
              {WEEKDAYS.map((d) => {
                const state = row.states[d];
                // Self-contained label: facility name + weekday + state.
                // Quoted out of context this still reads as a complete fact,
                // which helps both screen readers and AI crawlers.
                const label = `${row.facility}は${WEEKDAY_JA_FULL[d]}は${OPEN_STATE_LABEL_FORMAL[state]}`;
                return (
                  <td
                    key={d}
                    className="p-1 border-b text-center align-middle"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span
                      aria-label={label}
                      title={label}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full t-data"
                      style={{
                        background: CELL_BG[state],
                        color: "var(--ink)",
                      }}
                    >
                      {OPEN_STATE_SYMBOL[state]}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="t-caption mt-3">
        <span aria-hidden>◎</span> ばっちり ／ <span aria-hidden>○</span>{" "}
        一部休み ／ <span aria-hidden>✕</span> 休館
      </p>
    </div>
  );
}
