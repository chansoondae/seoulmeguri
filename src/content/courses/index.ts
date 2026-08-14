import { btsSeoul } from "./bts-seoul";
import type { Course } from "@/content/types";

export const courses: Course[] = [btsSeoul];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
