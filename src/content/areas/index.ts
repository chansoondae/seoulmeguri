import { cityHall } from "./city-hall";
import { hannam } from "./hannam";
import { gangnam } from "./gangnam";
import type { Area } from "@/content/types";

export const areas: Area[] = [cityHall, hannam, gangnam];

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
