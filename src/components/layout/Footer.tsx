"use client";

import Image from "next/image";
import Link from "next/link";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { company } from "@/config/company";
import { contacts } from "@/config/contacts";
import {
  getNavGroups,
  resolveNavGroupLabel,
  resolveNavLabel,
} from "@/config/navigation";
import { useLocale, useMessages } from "@/i18n/LocaleProvider";
import { localizedPath, routes } from "@/i18n/routing";

const footerLinkClassName =
  "footer-link text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

export function Footer() {
  const { locale } = useLocale();
  const messages = useMessages();
  const navGroups = getNavGroups(locale);
  const footerServices =
    navGroups.find((group) => group.labelKey === "services")?.items.filter(
      (item) => item.serviceId,
    ) ?? [];
  const footerPages =
    navGroups.find((group) => group.labelKey === "tools")?.items ?? [];

  return (
    <footer className="site-footer dark-surface relative z-10 overflow-hidden border-t border-white/10 bg-navy py-12">
      <LogisticsBackdrop variant="footer" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <Image
                src="/brand/logo.svg"
                alt={company.name}
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <p className="footer-muted text-sm leading-relaxed text-white/50">
              {company.tagline[locale]}
            </p>
          </div>

          <div>
            <h3 className="footer-heading mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {messages.common.footerServices}
            </h3>
            <ul className="space-y-2 text-sm">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClassName}>
                    {resolveNavLabel(item.labelKey, messages)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {messages.common.footerPages}
            </h3>
            <ul className="space-y-2 text-sm">
              {footerPages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClassName}>
                    {resolveNavLabel(item.labelKey, messages)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {messages.common.footerContact}
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
                  href={`tel:${contacts.phones.poland.tel}`}
                  className={footerLinkClassName}
                  aria-label={`${contacts.phones.poland.display} — ${contacts.phones.poland.country[locale]}`}
                >
                  {contacts.phones.poland.display}
                  <span className="text-white/40">
                    {" "}
                    ({contacts.phones.poland.country[locale]})
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contacts.phones.ukraine.tel}`}
                  className={footerLinkClassName}
                  aria-label={`${contacts.phones.ukraine.display} — ${contacts.phones.ukraine.country[locale]}`}
                >
                  {contacts.phones.ukraine.display}
                  <span className="text-white/40">
                    {" "}
                    ({contacts.phones.ukraine.country[locale]})
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contacts.phones.china.tel}`}
                  className={footerLinkClassName}
                  aria-label={`${contacts.phones.china.display} — ${contacts.phones.china.country[locale]}`}
                >
                  {contacts.phones.china.display}
                  <span className="text-white/40">
                    {" "}
                    ({contacts.phones.china.country[locale]})
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-xs text-white/40">
          <Link
            href={localizedPath(locale, routes.privacy)}
            className={footerLinkClassName}
          >
            {messages.common.privacyPolicy}
          </Link>
          <Link
            href={localizedPath(locale, routes.cookies)}
            className={footerLinkClassName}
          >
            {messages.common.cookiePolicy}
          </Link>
          <Link
            href={localizedPath(locale, routes.terms)}
            className={footerLinkClassName}
          >
            {messages.common.terms}
          </Link>
          <Link
            href={localizedPath(locale, routes.calculatorDisclaimer)}
            className={footerLinkClassName}
          >
            {messages.common.calculatorDisclaimer}
          </Link>
        </div>

        <div className="footer-muted mt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} {company.name}.{" "}
          {messages.common.allRightsReserved}
        </div>
      </div>
    </footer>
  );
}
