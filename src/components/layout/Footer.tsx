"use client";

import { useTranslations } from "next-intl";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { navGroups } from "@/config/navigation";
import { Link } from "@/i18n/navigation";
import { company } from "@/config/company";
import { useLocale } from "next-intl";
import { getLocaleContacts } from "@/config/contacts";

const footerLinkClassName =
  "text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const contacts = getLocaleContacts(locale);

  const footerServices =
    navGroups.find((group) => group.label === "Usługi")?.items.filter(
      (item) => item.serviceId,
    ) ?? [];

  const footerPages =
    navGroups.find((group) => group.label === "Narzędzia")?.items ?? [];

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-navy py-12">
      <LogisticsBackdrop variant="footer" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white leading-none">
                B&amp;BS
              </div>
              <span className="text-sm font-semibold text-white">
                Buy &amp; Bring Solutions
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              {t("tagline")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("services")}
            </h3>
            <ul className="space-y-2 text-sm">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as Parameters<typeof Link>[0]["href"]}
                    className={footerLinkClassName}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("pages")}
            </h3>
            <ul className="space-y-2 text-sm">
              {footerPages.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as Parameters<typeof Link>[0]["href"]}
                    className={footerLinkClassName}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("contact")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className={footerLinkClassName}
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contacts.primaryPhone.e164}`}
                  className={footerLinkClassName}
                  aria-label={`Telefon ${contacts.primaryPhone.countryLabel}`}
                >
                  {contacts.primaryPhone.display}
                </a>
              </li>
              <li className="text-white/60">
                {company.operations.china.city}, {company.operations.china.country}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between text-xs text-white/30">
          <span>
            © {new Date().getFullYear()} {company.name}. {t("copyright")}
          </span>
          <nav className="flex gap-4" aria-label="Legal">
            <Link href="/polityka-prywatnosci" className="hover:text-white/60 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/polityka-cookies" className="hover:text-white/60 transition-colors">
              {t("cookies")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
