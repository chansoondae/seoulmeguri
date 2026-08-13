export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type OpenState = "good" | "partial" | "closed";
export type KeyColor = "sky" | "orchid" | "blush";

export interface Station {
  line: string;
  name: string;
  exit: string;
}

export interface Pitfall {
  severity: "info" | "warn" | "danger";
  title: string;
  body: string;
}

export interface Stop {
  time: string;
  nameJa: string;
  nameKo: string;
  blurb: string;
  tips?: string[];
  hours?: string;
  closedDays?: Weekday[];
  fee?: string;
  reservation?: "required" | "recommended" | "none";
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  naverMapUrl?: string;
  googleMapsUrl?: string;
  walkFromPrev?: string;
}

export interface FacilityWeekRow {
  facility: string;
  states: Record<Weekday, OpenState>;
  note?: string;
}

export interface Area {
  slug: string;
  nameJa: string;
  nameKo: string;
  reading: string;
  tagline: string;
  intro: string;
  keyColor: KeyColor;
  station: Station;
  goodFor: string[];
  notFor: string[];
  weekday: Record<Weekday, OpenState>;
  weekdayNote: string;
  weekdayTable: FacilityWeekRow[];
  pitfalls: Pitfall[];
  stops: Stop[];
  extras: Stop[];
  updatedAt: string;
}

export interface GuideSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  category: "money" | "transport" | "entry" | "manner";
  sections: GuideSection[];
  updatedAt: string;
}
