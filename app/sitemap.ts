import type { MetadataRoute } from "next";
import { programs } from "@/lib/content/programs";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/programs",
    "/book",
    "/gallery",
    "/impact",
    "/contact",
    "/about/founder",
    "/about/sacred-place",
    "/faq",
    "/privacy",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/programs") ? 0.9 : 0.7,
    })),
    ...programs.map((p) => ({
      url: `${base}/programs/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
