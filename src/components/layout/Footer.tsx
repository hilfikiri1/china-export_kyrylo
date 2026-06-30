"use client";

import Link from "next/link";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { navGroups } from "@/config/navigation";
import { company } from "@/config/company";
import { contactEmail, getPrimaryPhone } from "@/config/contacts";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

const linkClass =
  "text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const servicesGroup = navGroups.find((g) => g.labelKey === "nav.group.services");
const companyGroup = navGroups.find((g) => g.labelKey === "nav.group.company");

const legalLinks = [
  { href: "/polityka-prywatnosci", key: "footer.privacy" },
  { href: "/polityka-cookies", key: "footer.cookies" },
  { href: "/regulamin", key: "footer.terms" },
];

export function Footer() {
  const locale = useLocale();
  const t = useT();
  const phone = getPrimaryPhone(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-navy py-12">
      <LogisticsBackdrop variant="footer" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo className="mb-4" />
            <p className="text-sm leading-relaxed text-white/50">
              {t("footer.descriptor")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.servicesTitle")}
            </h3>
            <ul className="space-y-2 text-sm">
              {(servicesGroup?.items ?? []).map((item) => (
                <li key={item.href}>
                  <Link href={localeHref(locale, item.href)} className={linkClass}>
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.pagesTitle")}
            </h3>
            <ul className="space-y-2 text-sm">
              {(companyGroup?.items ?? []).map((item) => (
                <li key={item.href}>
                  <Link href={localeHref(locale, item.href)} className={linkClass}>
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localeHref(locale, "/kontakt")} className={linkClass}>
                  {t("nav.kontakt")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.contactTitle")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${contactEmail}`} className={linkClass}>
                  {contactEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${phone.tel}`} className={linkClass}>
                  {phone.display}
                  <span className="sr-only"> ({t(phone.countryLabelKey)})</span>
                </a>
              </li>
              <li className="text-white/60">{company.chinaPresence}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:justify-between">
          <p>
            © {year} {company.name}. {t("footer.rights")}
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={localeHref(locale, item.href)} className={linkClass}>
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
