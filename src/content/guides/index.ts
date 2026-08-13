import { exchange } from "./exchange";
import type { Guide } from "@/content/types";

export const guides: Guide[] = [exchange];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
