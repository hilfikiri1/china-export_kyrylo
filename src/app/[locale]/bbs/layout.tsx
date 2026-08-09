import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BbsLoginForm } from "@/components/bbs/BbsLoginForm";
import { isBbsAuthConfigured, hasBbsAdminSession } from "@/lib/bbs/auth";
import { isLocale, type Locale } from "@/i18n/config";
import { logoutBbs } from "./actions";

export const metadata: Metadata = {
  title: "B&BS Admin — Buy & Bring Solutions",
  robots: { index: false, follow: false },
};

export default async function BbsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const ru = locale === "ru";

  const authenticated = await hasBbsAdminSession();
  if (!authenticated) {
    return <BbsLoginForm locale={locale} configured={isBbsAuthConfigured()} />;
  }

  return (
    <>
      <div className="border-b border-white/10 bg-navy-light/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1 text-xs">
            <Link
              href="/pl/bbs"
              className={`rounded-md px-2.5 py-1 transition-colors ${
                locale === "pl" ? "bg-accent-light text-white" : "text-white/50 hover:text-white"
              }`}
              aria-current={locale === "pl" ? "page" : undefined}
            >
              PL
            </Link>
            <Link
              href="/ru/bbs"
              className={`rounded-md px-2.5 py-1 transition-colors ${
                ru ? "bg-accent-light text-white" : "text-white/50 hover:text-white"
              }`}
              aria-current={ru ? "page" : undefined}
            >
              RU
            </Link>
          </div>

          {process.env.NODE_ENV !== "development" && (
            <form action={logoutBbs}>
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                {ru ? "Выйти из панели" : "Wyloguj z panelu"}
              </button>
            </form>
          )}
        </div>
      </div>
      {children}
    </>
  );
}
