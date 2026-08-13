import type { MetadataRoute } from "next";
import { areas } from "@/content/areas";
import { guides } from "@/content/guides";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly" },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly" },
    ...areas.map((a) => ({
      url: `${SITE_URL}/areas/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: "monthly" as const,
    })),
    ...guides.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "monthly" as const,
    })),
  ];
}
