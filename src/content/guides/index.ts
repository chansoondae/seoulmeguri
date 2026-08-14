import { exchange } from "./exchange";
import { souvenir } from "./souvenir";
import type { Guide } from "@/content/types";

export const guides: Guide[] = [exchange, souvenir];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
