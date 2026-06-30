"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCtaLink, getNavGroups } from "@/config/navigation";
import { companyConfig } from "@/config/company";
import { contactConfig, getPrimaryPhone, telHref } from "@/config/contacts";
import {
  languageNames,
  locales,
  splitLocaleFromPathname,
  switchLocalePath,
  type Locale,
} from "@/i18n/config";
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
  const pathname = usePathname();
  const { locale } = splitLocaleFromPathname(pathname || "/");
  const navGroups = getNavGroups(locale);
  const ctaLink = getCtaLink(locale);
  const primaryPhone = getPrimaryPhone(locale);

  function localizedLanguageHref(nextLocale: Locale) {
    return switchLocalePath(pathname || "/", nextLocale);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/brand/bbs-logo.svg"
            alt={`${companyConfig.brandName} logo`}
            width={34}
            height={34}
            priority
            className="h-8 w-8"
          />
          <span className="hidden text-sm font-semibold text-white sm:block">
            {companyConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {navGroups.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 text-sm font-normal text-white/70 hover:bg-white/5 hover:text-white data-open:bg-white/5 data-open:text-white">
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[240px] overflow-hidden rounded-lg border border-white/10 bg-navy/95 p-1 shadow-xl backdrop-blur-md">
                    <ul className="flex flex-col">
                      {group.items.map((item) => (
                        <li key={`${group.label}-${item.label}`}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              {item.label}
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

          <div className="group relative">
            <button
              type="button"
              aria-label={`Język: ${languageNames[locale]}`}
              className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"
            >
              <Globe2 className="h-4 w-4" />
              {locale.toUpperCase()}
            </button>
            <div className="invisible absolute right-0 top-full min-w-40 translate-y-1 rounded-lg border border-white/10 bg-navy/95 p-1 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={localizedLanguageHref(item)}
                  hrefLang={item === "zh" ? "zh-CN" : item}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    item === locale
                      ? "bg-accent-light/15 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {languageNames[item]}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={ctaLink.href}
            className="rounded-lg border border-accent-light/20 bg-accent-light px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47]"
          >
            {ctaLink.label}
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-navy/95 transition-all duration-300 md:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-4 px-4 py-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-white/40">
                {group.label}
              </p>
              {group.items.map((item) => (
                <Link
                  key={`${group.label}-${item.label}`}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          <Link
            href={ctaLink.href}
            className="mt-2 rounded-lg border border-accent-light/20 bg-accent-light px-3 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47]"
            onClick={() => setOpen(false)}
          >
            {ctaLink.label}
          </Link>

          <div className="grid gap-2 border-t border-white/10 pt-4 text-sm">
            <a
              href={telHref(primaryPhone)}
              aria-label={`${primaryPhone.countryLabel[locale]}: ${primaryPhone.display}`}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-white/80"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {primaryPhone.display}
            </a>
            <a
              href={primaryPhone.whatsapp}
              className="rounded-lg border border-accent-light/20 bg-white/5 px-3 py-2.5 text-center font-semibold text-white"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${contactConfig.email}`}
              className="text-center text-white/60"
            >
              {contactConfig.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {locales.map((item) => (
              <Link
                key={item}
                href={localizedLanguageHref(item)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-center text-sm",
                  item === locale
                    ? "border-accent-light/40 bg-accent-light/15 text-white"
                    : "border-white/10 text-white/70",
                )}
                onClick={() => setOpen(false)}
              >
                {languageNames[item]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
