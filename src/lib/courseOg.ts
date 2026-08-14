// Maps course slug → OG source image under public/. Courses not listed here
// fall back to the site-root /opengraph-image.
export const COURSE_OG_FILE: Record<string, string> = {
  "bts-seoul": "og/bts-seoul.jpg",
};

export function hasCourseOgImage(slug: string): boolean {
  return Boolean(COURSE_OG_FILE[slug]);
}
