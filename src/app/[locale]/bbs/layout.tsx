import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { BbsLoginForm } from "@/components/bbs/BbsLoginForm";
import { isBbsAuthConfigured, hasBbsAdminSession } from "@/lib/bbs/auth";
import { isLocale, type Locale } from "@/i18n/config";
import { logoutBbs } from "./actions";

export const metadata: Metadata = {
  title: "Panel wewnętrzny — Buy & Bring Solutions",
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

  const authenticated = await hasBbsAdminSession();
  if (!authenticated) {
    return <BbsLoginForm locale={locale} configured={isBbsAuthConfigured()} />;
  }

  return (
    <>
      {process.env.NODE_ENV !== "development" && (
        <div className="border-b border-white/10 bg-navy-light/70">
          <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-2 sm:px-6 lg:px-8">
            <form action={logoutBbs}>
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Wyloguj z panelu
              </button>
            </form>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
