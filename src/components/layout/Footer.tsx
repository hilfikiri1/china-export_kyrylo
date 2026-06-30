"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { getNavGroups } from "@/config/navigation";
import { companyConfig } from "@/config/company";
import { contactConfig, getPrimaryPhone, mailtoHref, telHref } from "@/config/contacts";
import { getMessages } from "@/i18n/messages";
import { splitLocaleFromPathname, localizePath } from "@/i18n/config";
import Link from "next/link";

const footerLinkClassName =
  "text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const footerTagline = {
  pl: "Import, sourcing i produkcja w Chinach dla firm",
  uk: "Імпорт, sourcing і виробництво в Китаї для бізнесу",
  ru: "Импорт, sourcing и производство в Китае для бизнеса",
  de: "Import, Sourcing und Produktion in China für Unternehmen",
  zh: "面向企业的中国进口、采购与生产支持",
};

export function Footer() {
  const pathname = usePathname();
  const { locale } = splitLocaleFromPathname(pathname || "/");
  const navGroups = getNavGroups(locale);
  const messages = getMessages(locale);
  const footerServices =
    navGroups.find((group) => group.items.some((item) => item.serviceId))?.items.filter(
      (item) => item.serviceId,
    ) ?? [];
  const footerPages =
    navGroups.find((group) => group.items.some((item) => item.href.includes("/kalkulator")))?.items ?? [];
  const primaryPhone = getPrimaryPhone(locale);

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-navy py-12">
      <LogisticsBackdrop variant="footer" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/brand/bbs-logo.svg"
                alt={`${companyConfig.brandName} logo`}
                width={34}
                height={34}
                className="h-8 w-8"
              />
              <span className="text-sm font-semibold text-white">
                {companyConfig.brandName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              {footerTagline[locale]}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {navGroups.find((group) => group.items.some((item) => item.serviceId))?.label}
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
              {navGroups.find((group) => group.items.some((item) => item.href.includes("/kalkulator")))?.label}
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
                  href={mailtoHref()}
                  className={footerLinkClassName}
                >
                  {contactConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={telHref(primaryPhone)}
                  aria-label={`${primaryPhone.countryLabel[locale]}: ${primaryPhone.display}`}
                  className={footerLinkClassName}
                >
                  {primaryPhone.display} · {primaryPhone.countryLabel[locale]}
                </a>
              </li>
              <li>
                <Link href={localizePath("/polityka-prywatnosci", locale)} className={footerLinkClassName}>
                  {messages.forms.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={localizePath("/polityka-cookies", locale)} className={footerLinkClassName}>
                  Cookie policy
                </Link>
              </li>
              <li>
                <Link href={localizePath("/regulamin", locale)} className={footerLinkClassName}>
                  Regulamin strony
                </Link>
              </li>
              <li>
                <Link href={localizePath("/zastrzezenie-kalkulatora", locale)} className={footerLinkClassName}>
                  Zastrzeżenie kalkulatora
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} {companyConfig.brandName}. {messages.brand.copyright}
        </div>
      </div>
    </footer>
  );
}
