import type { Weekday, OpenState } from "@/content/types";

export const WEEKDAYS: Weekday[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

export const WEEKDAY_JA: Record<Weekday, string> = {
  mon: "月",
  tue: "火",
  wed: "水",
  thu: "木",
  fri: "金",
  sat: "土",
  sun: "日",
};

export const WEEKDAY_JA_FULL: Record<Weekday, string> = {
  mon: "月曜日",
  tue: "火曜日",
  wed: "水曜日",
  thu: "木曜日",
  fri: "金曜日",
  sat: "土曜日",
  sun: "日曜日",
};

export const OPEN_STATE_SYMBOL: Record<OpenState, string> = {
  good: "◎",
  partial: "○",
  closed: "✕",
};

export const OPEN_STATE_LABEL: Record<OpenState, string> = {
  good: "ばっちり",
  partial: "一部休み",
  closed: "今日はやめとこ",
};

/**
 * Returns the weekday in Korea Standard Time regardless of the client TZ.
 * Japan and Korea are both UTC+9 so this is mainly documentation, but we
 * keep the timezone explicit to protect against future changes.
 */
export function getSeoulWeekday(d: Date = new Date()): Weekday {
  const kst = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const order: Weekday[] = [
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ];
  return order[kst.getDay()];
}
