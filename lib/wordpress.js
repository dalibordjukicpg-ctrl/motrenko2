const DEFAULT_WP_BASE_URL = "https://tvoj-sajt.com";

/**
 * Placeholder fetcher for WordPress REST API.
 * Later you can expand this to map WP page content into your UI.
 */
export async function fetchWordpressPages({
  baseUrl = DEFAULT_WP_BASE_URL,
  params = {},
} = {}) {
  const url = new URL("/wp-json/wp/v2/pages", baseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    url.searchParams.set(key, String(value));
  }

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `WordPress request failed: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

