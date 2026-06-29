import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // 1. Host canonicalization (redirect non-www to www.getshutter.online in production)
  // We ignore localhost/development hosts
  if (
    host === "getshutter.online" &&
    process.env.NODE_ENV === "production"
  ) {
    url.host = "www.getshutter.online";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // 2. Trailing slash redirection (remove trailing slash except for root, api, and file requests)
  const pathname = url.pathname;
  if (
    pathname !== "/" &&
    pathname.endsWith("/") &&
    !pathname.startsWith("/api") &&
    !pathname.includes(".")
  ) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
