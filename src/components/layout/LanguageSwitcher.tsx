"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LOCALE_COOKIE,
  localeNames,
  publicLocales,
  type Locale,
} from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routing";
import { useLocale, useT } from "@/i18n/LocaleProvider";

export function LanguageSwitcher({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function selectLocale(next: Locale) {
    // Persist the chosen locale (browser API write).
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
    router.push(switchLocalePath(pathname, next));
  }

  if (variant === "mobile") {
    return (
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          {t("language.label")}
        </p>
        <div className="flex flex-wrap gap-2 px-3">
          {publicLocales.map((l) => (
            <button
              key={l}
              type="button"
              lang={l}
              aria-current={l === locale}
              onClick={() => selectLocale(l)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                l === locale
                  ? "border-accent-light/50 bg-accent-light/15 text-accent-light"
                  : "border-white/10 text-white/70 hover:border-white/20 hover:text-white",
              )}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.switcherAria")}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-1.5 rounded-md px-2 py-2 text-sm text-white/70 transition-colors hover:text-white"
      >
        <Globe2 className="h-4 w-4" aria-hidden />
        <span>{localeNames[locale]}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[160px] overflow-hidden rounded-lg border border-white/10 bg-navy/95 p-1 shadow-xl backdrop-blur-md"
        >
          {publicLocales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                lang={l}
                aria-selected={l === locale}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectLocale(l);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  l === locale
                    ? "text-accent-light"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                {localeNames[l]}
                {l === locale && <Check className="h-3.5 w-3.5" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
