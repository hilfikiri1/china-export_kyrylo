import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

const legacyPaths = [
  "/uslugi",
  "/proces",
  "/realizacje",
  "/o-nas",
  "/zespol-w-chinach",
  "/kalkulator",
  "/konsultacja",
  "/kontakt",
  "/polityka-prywatnosci",
  "/polityka-cookies",
  "/regulamin",
  "/zastrzezenie-kalkulatora",
  "/uslugi/wyszukiwanie-dostawcow",
  "/uslugi/audyty-fabryk",
  "/uslugi/kontrola-jakosci",
  "/uslugi/spedycja-i-logistyka",
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", firstSegment, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 308);
  }

  if (legacyPaths.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|robots.txt|sitemap.xml).*)"],
};

export { locales };
