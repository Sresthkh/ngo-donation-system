import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // public routes
  if (
    pathname.startsWith("/auth") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // protected routes
  if (pathname.startsWith("/user") || pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
