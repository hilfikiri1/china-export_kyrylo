"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";
import { localeLabels, locales, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routing";
import { useMessages } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

export function LanguageSwitcher({
  className,
  variant = "desktop",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const messages = useMessages();

  function handleChange(targetLocale: Locale) {
    const newPath = switchLocalePath(pathname, targetLocale);
    document.cookie = `${LOCALE_COOKIE}=${targetLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    router.push(newPath);
  }

  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={`lang-select-${variant}`}
        className="sr-only"
      >
        {messages.common.language}
      </label>
      <div className="flex items-center gap-1.5">
        <Globe2 className="h-4 w-4 shrink-0 text-text-muted" aria-hidden />
        <select
          id={`lang-select-${variant}`}
          value={pathname.split("/")[1]}
          onChange={(e) => handleChange(e.target.value as Locale)}
          className={cn(
            "cursor-pointer appearance-none rounded-md border border-border-subtle bg-surface-secondary py-1.5 pl-2 pr-7 text-sm text-text-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light",
            variant === "mobile" && "w-full",
          )}
          aria-label={messages.common.language}
        >
          {locales.map((locale) => (
            <option key={locale} value={locale}>
              {localeLabels[locale]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
