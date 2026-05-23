import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { applySecurityHeaders } from "@/lib/security/headers";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";

  if (isAdmin && !isLogin && !req.auth) {
    const login = new URL("/admin/login", req.nextUrl.origin);
    login.searchParams.set("callbackUrl", pathname);
    const redirect = NextResponse.redirect(login);
    applySecurityHeaders(redirect.headers, process.env.NODE_ENV === "production");
    return redirect;
  }

  if (isLogin && req.auth) {
    const redirect = NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
    applySecurityHeaders(redirect.headers, process.env.NODE_ENV === "production");
    return redirect;
  }

  const response = NextResponse.next();
  applySecurityHeaders(response.headers, process.env.NODE_ENV === "production");
  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
