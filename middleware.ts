import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/reset-password" ||
    path.startsWith("/api/books");
  const token = request.cookies.get("token")?.value || "";

  // If the user has a token and tries to access a public page, redirect to home
  if (isPublic && token && !path.startsWith("/api")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the user doesn't have a token and tries to access a protected page, redirect to login
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Add CORS headers for API routes
  if (path.startsWith("/api/books")) {
    const response = NextResponse.next();
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://ghiz-read.vercel.app"
    );
    response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }

  // Prevent caching for authenticated routes
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/",
    "/books",
    "/books/:path*",
    "/books/new",
    "/category",
    "/category/:path*",
    "/category/new",
    "/signup",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/api/books/:path*",
  ],
};
