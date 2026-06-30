"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { ctaLink, navGroups } from "@/config/navigation";
import { getPrimaryPhone } from "@/config/contacts";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useT();
  const primaryPhone = getPrimaryPhone(locale);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={localeHref(locale, "/")} aria-label={t("nav.home")}>
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {navGroups.map((group) => (
                <NavigationMenuItem key={group.labelKey}>
                  <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 text-sm font-normal text-white/70 hover:bg-white/5 hover:text-white data-open:bg-white/5 data-open:text-white">
                    {t(group.labelKey)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[260px] overflow-hidden rounded-lg border border-white/10 bg-navy/95 p-1 shadow-xl backdrop-blur-md">
                    <ul className="flex flex-col">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={localeHref(locale, item.href)}
                              className="block rounded-md px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              {t(item.labelKey)}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <LanguageSwitcher />

          <Link
            href={localeHref(locale, ctaLink.href)}
            className="rounded-lg border border-accent-light/20 bg-accent-light px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47]"
          >
            {t(ctaLink.labelKey)}
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? t("common.menuClose") : t("common.menuOpen")}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-y-auto border-t border-white/10 bg-navy/95 transition-all duration-300 md:hidden",
          open ? "max-h-[38rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-4 px-4 py-4">
          {navGroups.map((group) => (
            <div key={group.labelKey}>
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-white/40">
                {t(group.labelKey)}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={localeHref(locale, item.href)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          ))}

          <LanguageSwitcher variant="mobile" />

          <div className="flex flex-col gap-2 px-3">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-white/80 hover:bg-white/5"
            >
              <Phone className="h-4 w-4 text-accent-light" aria-hidden />
              <span>
                {primaryPhone.display}
                <span className="sr-only"> ({t(primaryPhone.countryLabelKey)})</span>
              </span>
            </a>
            {primaryPhone.whatsapp && (
              <a
                href={primaryPhone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-white/80 hover:bg-white/5"
              >
                <MessageCircle className="h-4 w-4 text-accent-light" aria-hidden />
                <span>{t("common.whatsapp")}</span>
              </a>
            )}
          </div>

          <Link
            href={localeHref(locale, ctaLink.href)}
            className="mt-1 rounded-lg border border-accent-light/20 bg-accent-light px-3 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47]"
            onClick={() => setOpen(false)}
          >
            {t(ctaLink.labelKey)}
          </Link>
        </nav>
      </div>
    </header>
  );
}
