import { areas } from "@/content/areas";
import {
  WEEKDAYS,
  WEEKDAY_JA_FULL,
  OPEN_STATE_LABEL_FORMAL,
} from "@/lib/weekday";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Builds a schema.org Dataset that exposes the full "area × weekday → state"
 * matrix as structured data. The dataset itself is human-summarised in the
 * description (so AI agents can quote it without re-parsing the table) and
 * the row facts are also emitted as `variableMeasured` observations.
 *
 * Regenerated every request (cheap: 3 areas × 7 days).
 */
export function buildWeekdayDatasetJsonLd() {
  const rows = areas.flatMap((area) =>
    WEEKDAYS.map((day) => {
      const state = area.weekday[day];
      return {
        area: area.nameJa,
        weekday: WEEKDAY_JA_FULL[day],
        state: OPEN_STATE_LABEL_FORMAL[state],
        sentence: `${area.nameJa}エリアは${WEEKDAY_JA_FULL[day]}は${OPEN_STATE_LABEL_FORMAL[state]}`,
      };
    }),
  );

  const description = rows.map((r) => r.sentence).join("。") + "。";

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "ソウル主要エリアの曜日別営業状況",
    alternateName: "Seoul area weekday openness matrix",
    description,
    keywords: [
      "ソウル 月曜日 休み",
      "ソウル 火曜日 開いてる",
      "曜日別 営業",
      "휴관일",
      "weekday closing",
    ],
    inLanguage: "ja",
    isAccessibleForFree: true,
    license: `${SITE_URL}/about`,
    url: `${SITE_URL}/#weekday`,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    variableMeasured: rows.map((r) => ({
      "@type": "PropertyValue",
      name: `${r.area} × ${r.weekday}`,
      value: r.state,
      description: r.sentence,
    })),
  };
}
