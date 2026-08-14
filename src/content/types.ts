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

// schema.org Place subtypes we use. Falls back to TouristAttraction when
// unset.
export type PlaceType =
  | "TouristAttraction"
  | "Restaurant"
  | "Museum"
  | "Store"
  | "PerformingArtsVenue"
  | "LandmarksOrHistoricalBuildings"
  | "PlaceOfWorship"
  | "Park";

// One row of a schema.org OpeningHoursSpecification. dayOfWeek is a group of
// weekdays that share the same opens/closes range.
export interface StructuredHours {
  dayOfWeek: Weekday[];
  opens: string; // "HH:MM" in KST (24h)
  closes: string; // "HH:MM"
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
  // Optional narrative context (used by theme courses like BTS 聖地巡礼)
  eyebrow?: string;
  story?: string;
  address?: string;
  // Structured fields for schema.org Place JSON-LD. Optional — a stop
  // without these still renders normally but is not emitted as a
  // machine-readable place.
  placeType?: PlaceType;
  geo?: { latitude: number; longitude: number };
  structuredHours?: StructuredHours[];
  specialClosedDays?: Weekday[]; // regularly-closed days (e.g. Tuesday for 景福宮)
  lastVerified?: string; // ISO date. Falls back to page-level updatedAt.
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
  relatedCourses?: string[];
  relatedGuides?: string[];
}

export interface SouvenirItem {
  rank: number;
  group: "office" | "friend" | "special";
  nameJa: string;
  nameKo?: string;
  body: string;
  bullets?: string[];
  tip?: string;
  caution?: string;
}

export interface GuideTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GuideCallout {
  kind: "tip" | "warn";
  title?: string;
  body: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export interface GuideSection {
  heading?: string;
  body?: string;
  bullets?: string[];
  items?: SouvenirItem[];
  table?: GuideTable;
  callout?: GuideCallout;
  faq?: FaqEntry[];
}

export type GuideCategory =
  | "money"
  | "transport"
  | "entry"
  | "manner"
  | "shopping";

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  category: GuideCategory;
  sections: GuideSection[];
  updatedAt: string;
  relatedGuides?: string[];
  relatedAreas?: string[];
  relatedCourses?: string[];
}

export type CourseCategory = "kpop" | "history" | "cafe" | "shopping";

export interface CourseAccess {
  start: Station;
  end?: Station;
  totalWalkMinutes?: number;
}

export interface CourseExclusion {
  title: string;
  intro?: string;
  items: string[];
  outro?: string;
}

export interface Course {
  slug: string;
  category: CourseCategory;
  nameJa: string;
  nameKo?: string;
  tagline: string;
  intro: string;
  keyColor: KeyColor;
  access: CourseAccess;
  weekdayNote: string;
  weekdayTable: FacilityWeekRow[];
  headline?: Pitfall;
  stops: Stop[];
  extras?: Stop[];
  outOfSeoul?: Stop[];
  pitfalls?: Pitfall[];
  exclusion?: CourseExclusion;
  faq?: FaqEntry[];
  updatedAt: string;
  relatedAreas?: string[];
  relatedGuides?: string[];
  relatedCourses?: string[];
}
