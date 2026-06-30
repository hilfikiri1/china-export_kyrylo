"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe2 } from "lucide-react";
import { company } from "@/config/company";
import { getPrimaryPhoneByLocale } from "@/config/contacts";
import { localeCookieName, localeMeta, locales } from "@/i18n/config";
import { useCurrentLocale } from "@/i18n/use-current-locale";
import { toLocalePath } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { getNavGroups, getPrimaryCta } from "@/config/navigation";
import { usePathname } from "next/navigation";
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
  const locale = useCurrentLocale();
  const pathname = usePathname() || "/";
  const navGroups = getNavGroups(locale);
  const ctaLink = getPrimaryCta(locale);
  const primaryPhone = getPrimaryPhoneByLocale(locale);

  function handleLocaleSwitch(targetLocale: (typeof locales)[number]) {
    document.cookie = `${localeCookieName}=${targetLocale}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            B&BS
          </div>
          <span className="hidden text-sm font-semibold text-white sm:block">
            {company.brandName}
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

          <label className="flex items-center gap-1.5 text-sm text-white/50">
            <Globe2 className="h-4 w-4" />
            <span className="sr-only">Wybierz język</span>
            <select
              value={locale}
              onChange={(event) => {
                const target = event.target.value as (typeof locales)[number];
                handleLocaleSwitch(target);
                window.location.href = toLocalePath(pathname, target);
              }}
              className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-xs text-white"
            >
              {locales.map((itemLocale) => (
                <option key={itemLocale} value={itemLocale} className="bg-navy text-white">
                  {localeMeta[itemLocale].nativeLabel}
                </option>
              ))}
            </select>
          </label>

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

          <div className="rounded-lg border border-white/10 p-2">
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-white/40">
              <Globe2 className="mr-1 inline-block h-3.5 w-3.5" />
              Język
            </p>
            <div className="grid grid-cols-2 gap-1">
              {locales.map((itemLocale) => (
                <Link
                  key={itemLocale}
                  href={toLocalePath(pathname, itemLocale)}
                  onClick={() => {
                    handleLocaleSwitch(itemLocale);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-md px-3 py-2 text-center text-xs text-white/70 hover:bg-white/10 hover:text-white",
                    locale === itemLocale && "bg-white/10 text-white",
                  )}
                >
                  {localeMeta[itemLocale].nativeLabel}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={ctaLink.href}
            className="mt-2 rounded-lg border border-accent-light/20 bg-accent-light px-3 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47]"
            onClick={() => setOpen(false)}
          >
            {ctaLink.label}
          </Link>
          <a
            href={`tel:${primaryPhone.phone.replace(/\s+/g, "")}`}
            className="rounded-lg border border-white/20 px-3 py-2.5 text-center text-sm text-white/80 hover:bg-white/5"
          >
            {primaryPhone.phone}
          </a>
          {primaryPhone.whatsapp ? (
            <a
              href={primaryPhone.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-emerald-400/20 bg-emerald-500/15 px-3 py-2.5 text-center text-sm font-medium text-emerald-200 hover:bg-emerald-500/20"
            >
              WhatsApp
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
