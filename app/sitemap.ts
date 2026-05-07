import { SITE_URL } from "@/lib/seo";
import { getMenu, slugify } from "@/lib/wordpress";
import type { MetadataRoute } from "next";

async function fetchAllPosts() {
  const base = process.env.WORDPRESS_API_URL ?? "http://localhost/Motrenko/wp-json/wp/v2";
  try {
    const res = await fetch(`${base}/posts?per_page=100&categories_exclude=152&_fields=slug,modified`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json() as Promise<{ slug: string; modified: string }[]>;
  } catch {
    return [];
  }
}

async function fetchAllPages() {
  const base = process.env.WORDPRESS_API_URL ?? "http://localhost/Motrenko/wp-json/wp/v2";
  try {
    const res = await fetch(`${base}/pages?per_page=100&_fields=slug,modified`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json() as Promise<{ slug: string; modified: string }[]>;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [menu, posts, pages] = await Promise.all([
    getMenu("primary").catch(() => []),
    fetchAllPosts(),
    fetchAllPages(),
  ]);

  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tim`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const categoryUrls: MetadataRoute.Sitemap = menu
    .filter((i) => i.parent === 0)
    .map((cat) => ({
      url: `${SITE_URL}/usluge/${slugify(cat.title)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const pageUrls: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${SITE_URL}/stranica/${p.slug}`,
    lastModified: new Date(p.modified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/novosti/${p.slug}`,
    lastModified: new Date(p.modified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticUrls, ...categoryUrls, ...pageUrls, ...postUrls];
}
