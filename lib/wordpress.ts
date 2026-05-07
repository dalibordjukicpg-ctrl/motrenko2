const BASE =
  process.env.WORDPRESS_API_URL ?? "http://localhost/Motrenko/wp-json/wp/v2";

async function wpFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`WP API ${res.status}: ${path}`);
  return res.json();
}

export type WPPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
};

export type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
};

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    // typographic quotes and dashes
    .replace(/&#8222;|&#8220;|&#8221;|&#8216;|&#8217;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // remove WP "Continue reading..." suffix
    .replace(/\s*\.{3}\s*Continue reading[\s\S]*/i, "…")
    .replace(/Continue reading[\s\S]*/i, "")
    .trim();
}

export function decodeTitle(str: string): string {
  return str
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export type WPMenuItem = {
  id: number;
  object_id: number;
  parent: number;
  order: number;
  title: string;
  url: string;
  slug: string;
  type: string;
  excerpt: string;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\u00a0/g, "-")
    .replace(/[čć]/g, "c")
    .replace(/š/g, "s")
    .replace(/ž/g, "z")
    .replace(/đ/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Fetch primary nav menu via custom public endpoint. */
export async function getMenu(location = "primary"): Promise<WPMenuItem[]> {
  const base = process.env.WORDPRESS_API_URL?.replace("/wp/v2", "") ?? "http://localhost/Motrenko/wp-json";
  const res = await fetch(`${base}/custom/v1/menu?location=${location}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

/** Fetch a single WP post by its slug. */
export async function getPostBySlug(slug: string): Promise<(WPPost & { content: { rendered: string } }) | null> {
  const posts = await wpFetch<(WPPost & { content: { rendered: string } })[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_fields=id,slug,title,excerpt,content,date&per_page=1`
  );
  return posts?.[0] ?? null;
}

/** Fetch a single WP page by its slug. */
export async function getPageBySlug(slug: string): Promise<(WPPage & { content: { rendered: string } }) | null> {
  const pages = await wpFetch<(WPPage & { content: { rendered: string } })[]>(
    `/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,title,excerpt,content&per_page=1`
  );
  return pages?.[0] ?? null;
}

/** Fetch a WP page by slug with full content + featured image URL. */
export async function getPageWithImage(slug: string): Promise<{
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
} | null> {
  const pages = await wpFetch<(WPPage & {
    content: { rendered: string };
    featured_media: number;
    _embedded?: { "wp:featuredmedia"?: { source_url: string }[] };
  })[]>(
    `/pages?slug=${encodeURIComponent(slug)}&_embed=1&_fields=id,slug,title,excerpt,content,featured_media,_embedded&per_page=1`
  ).catch(() => null);

  const page = pages?.[0];
  if (!page) return null;

  const imageUrl =
    page._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

  return {
    title: decodeTitle(page.title.rendered),
    excerpt: stripHtml(page.excerpt.rendered),
    content: page.content.rendered,
    imageUrl,
  };
}

/** Fetch posts from a category (1 = Novosti, 152 = Osoblje). */
export async function getPostsByCategory(
  categoryId: number,
  perPage = 4
): Promise<WPPost[]> {
  return wpFetch<WPPost[]>(
    `/posts?categories=${categoryId}&categories_exclude=152&per_page=${perPage}&_fields=id,slug,title,excerpt,date&orderby=date&order=desc`
  );
}

/** Fetch staff posts (category 152 = Osoblje). */
export async function getStaff(perPage = 20): Promise<(WPPost & {
  content: { rendered: string };
  _embedded?: { "wp:featuredmedia"?: { source_url: string }[] };
})[]> {
  return wpFetch(
    `/posts?categories=152&per_page=${perPage}&_embed=1&orderby=menu_order&order=asc&_fields=id,slug,title,excerpt,content,date,_embedded`
  );
}
