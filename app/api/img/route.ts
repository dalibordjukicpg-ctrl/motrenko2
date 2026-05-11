import { NextRequest, NextResponse } from "next/server";

function isAllowedImageUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (!u.pathname.includes("/Motrenko/wp-content/uploads/")) return false;
    const h = u.hostname.toLowerCase();
    if (h === "localhost" || h === "127.0.0.1") return true;
    if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(h)) return true;
    if (
      h.endsWith(".ngrok-free.dev") ||
      h.endsWith(".ngrok-free.app") ||
      h.endsWith(".ngrok.io")
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  let url = req.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });
  try {
    url = decodeURIComponent(url);
  } catch {
    /* keep raw */
  }

  if (!isAllowedImageUrl(url)) return new NextResponse("Forbidden", { status: 403 });

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "image/*,*/*;q=0.8",
        "ngrok-skip-browser-warning": "69420",
        "User-Agent": "MotrenkoImageProxy/1.0",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      return new NextResponse(`Upstream ${res.status}`, { status: 502 });
    }

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return new NextResponse("Not an image", { status: 502 });
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("Error", { status: 502 });
  }
}
