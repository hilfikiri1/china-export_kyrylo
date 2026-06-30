"use client";

import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { company } from "@/config/company";
import { contacts, getPrimaryPhoneByLocale } from "@/config/contacts";
import { getNavGroups } from "@/config/navigation";
import { useCurrentLocale } from "@/i18n/use-current-locale";
import Link from "next/link";

const footerLinkClassName =
  "text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

export function Footer() {
  const locale = useCurrentLocale();
  const navGroups = getNavGroups(locale);
  const footerServices =
    navGroups.find((group) => group.items.some((item) => item.serviceId))?.items.filter(
      (item) => item.serviceId,
    ) ?? [];
  const footerPages =
    navGroups.find((group) => group.items.some((item) => item.href.includes("/kalkulator")))
      ?.items ?? [];
  const primaryPhone = getPrimaryPhoneByLocale(locale);

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-navy py-12">
      <LogisticsBackdrop variant="footer" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                B&BS
              </div>
              <span className="text-sm font-semibold text-white">
                {company.brandName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Import, sourcing i produkcja w Chinach dla firm z Polski i Europy.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Usługi
            </h3>
            <ul className="space-y-2 text-sm">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Strony
            </h3>
            <ul className="space-y-2 text-sm">
              {footerPages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Kontakt
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className={footerLinkClassName}
                >
                  {contacts.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${primaryPhone.phone.replace(/\s+/g, "")}`}
                  className={footerLinkClassName}
                  aria-label={`Telefon ${primaryPhone.countryLabel}: ${primaryPhone.phone}`}
                >
                  {primaryPhone.phone}
                </a>
              </li>
              <li className="text-white/60">{contacts.addresses.china}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          <div className="mb-2 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${locale}/polityka-prywatnosci`} className={footerLinkClassName}>
              Polityka prywatności
            </Link>
            <Link href={`/${locale}/polityka-cookies`} className={footerLinkClassName}>
              Polityka cookies
            </Link>
            <Link href={`/${locale}/regulamin`} className={footerLinkClassName}>
              Regulamin
            </Link>
            <Link href={`/${locale}/zastrzezenie-kalkulatora`} className={footerLinkClassName}>
              Zastrzeżenie kalkulatora
            </Link>
          </div>
          © {new Date().getFullYear()} {company.brandName}. {company.copyrightLabel}
        </div>
      </div>
    </footer>
  );
}
