import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/resume`, lastModified: now, priority: 0.8 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
