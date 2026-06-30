import type { Messages } from "@/i18n/get-dictionary";
import { getMessageObject } from "@/i18n/translate";
import type { Locale } from "@/i18n/config";
import { localizedPath, routes } from "@/i18n/routing";

export type HomeSpecializationsContent = {
  eyebrow: string;
  title: string;
  lead: string;
  closing: string;
  ctaLabel: string;
  ariaLabel: string;
  ctaHref: string;
};

type HomeSpecializationsMessages = {
  eyebrow: string;
  title: string;
  lead: string;
  closing: string;
  ctaLabel: string;
  ariaLabel: string;
};

export function getHomeSpecializations(
  messages: Messages,
  locale: Locale,
): HomeSpecializationsContent {
  const section = getMessageObject<HomeSpecializationsMessages>(
    messages,
    "home.specializations",
  );
  if (!section) {
    throw new Error("Missing home.specializations translations");
  }

  return {
    ...section,
    ctaHref: localizedPath(locale, routes.specializations),
  };
}
