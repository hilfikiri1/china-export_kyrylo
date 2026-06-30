import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";

/**
 * Locale routing (Next.js 16 "Proxy", formerly Middleware).
 *
 * - Requests that already start with a known locale segment pass through.
 * - The root `/` and any non-prefixed (legacy Polish) URL is redirected to the
 *   locale-prefixed equivalent. Crawlers without a cookie get a permanent (308)
 *   redirect to the Polish version so old links keep their SEO value; returning
 *   visitors with a locale cookie get a temporary (307) redirect to their
 *   preferred language.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const target =
    cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${target}${pathname === "/" ? "" : pathname}`;

  const permanent = target === defaultLocale && pathname !== "/";
  return NextResponse.redirect(url, permanent ? 308 : 307);
}

export const config = {
  // Skip Next internals, API routes, and any path that looks like a file.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
