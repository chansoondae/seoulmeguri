// Maps guide slug → OG source image under public/. Guides not listed here
// fall back to the site-root /opengraph-image.
export const GUIDE_OG_FILE: Record<string, string> = {
  souvenir: "og/souvenir.jpg",
};

export function hasGuideOgImage(slug: string): boolean {
  return Boolean(GUIDE_OG_FILE[slug]);
}
