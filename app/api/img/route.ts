import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });

  // Only allow WordPress uploads
  const allowed = /^https?:\/\/(localhost|192\.168\.\d+\.\d+|[a-z0-9-]+\.ngrok-free\.dev|[a-z0-9-]+\.ngrok\.io)\/Motrenko\/wp-content\/uploads\//i;
  if (!allowed.test(url)) return new NextResponse("Forbidden", { status: 403 });

  try {
    const res = await fetch(url, {
      headers: { "ngrok-skip-browser-warning": "1" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return new NextResponse("Not found", { status: 404 });

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("Error", { status: 502 });
  }
}
