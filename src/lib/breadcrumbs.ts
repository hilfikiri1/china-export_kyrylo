import type { Locale } from "@/i18n/config";
import type { Translator } from "@/i18n/translate";
import { localizedPath } from "@/i18n/routing";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function homeBreadcrumb(t: Translator, locale: Locale): BreadcrumbItem {
  return { label: t("common.home"), href: localizedPath(locale) };
}

export function buildBreadcrumbs(
  t: Translator,
  locale: Locale,
  items: Array<{ labelKey?: string; label?: string; href?: string }>,
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [homeBreadcrumb(t, locale)];

  for (const item of items) {
    crumbs.push({
      label: item.label ?? (item.labelKey ? t(item.labelKey) : ""),
      href: item.href,
    });
  }

  return crumbs;
}
