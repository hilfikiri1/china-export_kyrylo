"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  getCtaLink,
  getNavGroups,
  resolveNavGroupLabel,
  resolveNavLabel,
} from "@/config/navigation";
import { getPrimaryPhone } from "@/config/contacts";
import { company } from "@/config/company";
import { useLocale, useMessages } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/routing";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const messages = useMessages();
  const { theme } = useTheme();
  const navGroups = getNavGroups(locale);
  const ctaLink = getCtaLink(locale);
  const primaryPhone = getPrimaryPhone(locale);
  const logoSrc =
    theme === "light" ? "/brand/logo-on-light.svg" : "/brand/logo.svg";

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={localizedPath(locale)}
          className="flex items-center gap-2"
        >
          <Image
            src={logoSrc}
            alt={company.name}
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {navGroups.map((group) => (
                <NavigationMenuItem key={group.labelKey}>
                  <NavigationMenuTrigger className="nav-link h-auto bg-transparent px-3 py-2 text-sm font-normal data-open:bg-transparent">
                    {resolveNavGroupLabel(group.labelKey, messages)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="site-header-dropdown min-w-[240px] overflow-hidden rounded-lg border p-1 backdrop-blur-md">
                    <ul className="flex flex-col">
                      {group.items.map((item) => (
                        <li key={`${group.labelKey}-${item.labelKey}`}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="nav-link block rounded-md px-3 py-2 text-sm transition-colors"
                            >
                              {resolveNavLabel(item.labelKey, messages)}
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

          <ThemeToggle />
          <LanguageSwitcher />

          <Link
            href={ctaLink.href}
            className="rounded-lg border border-accent-light/20 bg-accent-light px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-brand-primary-hover"
          >
            {messages.nav.cta}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? messages.common.closeMenu : messages.common.openMenu}
            className="nav-link flex h-10 w-10 items-center justify-center rounded-lg"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "mobile-nav-panel overflow-hidden border-t transition-all duration-300 md:hidden",
          open ? "max-h-[44rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-4 px-4 py-4">
          {navGroups.map((group) => (
            <div key={group.labelKey}>
              <p className="nav-group-label mb-1 px-3 text-xs font-semibold uppercase tracking-widest">
                {resolveNavGroupLabel(group.labelKey, messages)}
              </p>
              {group.items.map((item) => (
                <Link
                  key={`${group.labelKey}-${item.labelKey}`}
                  href={item.href}
                  className="nav-link block rounded-lg px-3 py-2.5 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {resolveNavLabel(item.labelKey, messages)}
                </Link>
              ))}
            </div>
          ))}

          <LanguageSwitcher variant="mobile" className="px-3" />

          <a
            href={`tel:${primaryPhone.tel}`}
            className="nav-link flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span>
              {primaryPhone.display}
              <span className="ml-1 text-text-muted">
                ({primaryPhone.country[locale]})
              </span>
            </span>
          </a>

          <a
            href={primaryPhone.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2.5 text-sm text-accent-light hover:bg-surface-hover"
          >
            {messages.common.whatsapp}
          </a>

          <Link
            href={ctaLink.href}
            className="mt-2 rounded-lg border border-accent-light/20 bg-accent-light px-3 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-brand-primary-hover"
            onClick={() => setOpen(false)}
          >
            {messages.nav.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
