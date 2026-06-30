import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  locales,
  type Locale,
} from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

/** Old Polish URLs without locale prefix → permanent redirect to /pl/... */
const legacyRedirects: Record<string, string> = {
  "/proces": "/pl/proces",
  "/o-nas": "/pl/o-nas",
  "/specjalizacje": "/pl/specjalizacje",
  "/realizacje": "/pl/realizacje",
  "/zespol-w-chinach": "/pl/zespol-w-chinach",
  "/kalkulator": "/pl/kalkulator",
  "/konsultacja": "/pl/konsultacja",
  "/kontakt": "/pl/kontakt",
  "/uslugi": "/pl/uslugi",
  "/wyjazdy-do-chin": "/pl/zespol-w-chinach",
};

function getPreferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language") ?? "";
  for (const locale of locales) {
    if (accept.toLowerCase().includes(locale)) return locale;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (legacyRedirects[pathname]) {
    return NextResponse.redirect(
      new URL(legacyRedirects[pathname], request.url),
      308,
    );
  }

  if (pathname.startsWith("/uslugi/") && !pathname.startsWith("/pl/")) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length >= 2 && !isLocale(segments[0])) {
      return NextResponse.redirect(
        new URL(`/pl${pathname}`, request.url),
        308,
      );
    }
  }

  if (pathname === "/") {
    const locale = getPreferredLocale(request);
    const response = NextResponse.redirect(
      new URL(`/${locale}`, request.url),
      308,
    );
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (firstSegment && !isLocale(firstSegment)) {
    return NextResponse.redirect(
      new URL(`/pl${pathname}`, request.url),
      308,
    );
  }

  if (firstSegment && isLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
