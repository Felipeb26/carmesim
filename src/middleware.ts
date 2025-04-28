import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { deleteCookie } from "./actions/cookie.action";

type PublicRoute = { path: string; whenAuthenticated: "next" | "redirect" };

const publicRoutes: PublicRoute[] = [
  { path: "/", whenAuthenticated: "next" },
  { path: "/artistas/", whenAuthenticated: "next" },
  { path: "/eventos/", whenAuthenticated: "next" },
  { path: "/galeria/", whenAuthenticated: "next" },
  { path: "/contatos/", whenAuthenticated: "next" },
  { path: "/auth/", whenAuthenticated: "redirect" },
  { path: "/auth/login/", whenAuthenticated: "redirect" },
  { path: "/criar-login/", whenAuthenticated: "redirect" },
  { path: "/politicas/cookies", whenAuthenticated: "next" },
  { path: "/politicas/privacidade", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/auth/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const token = request.cookies.get("token")?.value;

  if (!token && path === "/auth/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (token) {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTimestamp) {
        deleteCookie("token").then(() => {
          const redirectUrl = request.nextUrl.clone();
          redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
          return NextResponse.redirect(redirectUrl);
        });
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (token && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    if (path !== "/dashboard/") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard/";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|.*.svg|site.webmanifest*|icons).*)",
  ],
};
