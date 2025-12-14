import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // 🚫 Only guard API routes
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  /* ==================================================
     disabled in NODE_ENV = development
     enabled in NODE_ENV = produciton
     ================================================== */
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  const ALLOWED_DOMAIN = "https://collegefinder.site";
  const ALLOWED_WWW = "https://www.collegefinder.site";

  const allowed =
    origin?.startsWith(ALLOWED_DOMAIN) ||
    origin?.startsWith(ALLOWED_WWW) ||
    referer?.startsWith(ALLOWED_DOMAIN) ||
    referer?.startsWith(ALLOWED_WWW);

  /* ==================================================
     🔒 EXTRA HARDENING (2 lines)
     Blocks curl, Postman, scripts
     ================================================== */
  if (!origin && !referer) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!allowed) {
    return new NextResponse(JSON.stringify({ error: "Access blocked" }), {
      status: 403,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
