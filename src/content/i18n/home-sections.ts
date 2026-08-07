import type { Messages } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath, routes } from "@/i18n/routing";
import { getMessageArray, getMessageObject } from "@/i18n/translate";

export type HomeAudienceSegment = {
  id: string;
  title: string;
  description: string;
};

export type HomeMissionPillar = {
  id: string;
  title: string;
  description: string;
};

export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function getHomeAudience(messages: Messages) {
  const section = getMessageObject<{
    eyebrow: string;
    title: string;
    lead: string;
    ariaLabel: string;
  }>(messages, "home.audience");

  const segments = getMessageArray<HomeAudienceSegment>(
    messages,
    "home.audience.segments",
  );

  if (!section) {
    throw new Error("Missing home.audience translations");
  }

  return { ...section, segments };
}

export function getHomeMission(messages: Messages) {
  const section = getMessageObject<{
    eyebrow: string;
    title: string;
    lead: string;
    ariaLabel: string;
  }>(messages, "home.mission");

  const pillars = getMessageArray<HomeMissionPillar>(
    messages,
    "home.mission.pillars",
  );

  if (!section) {
    throw new Error("Missing home.mission translations");
  }

  return { ...section, pillars };
}

export function getHomeUrgencyCta(messages: Messages, locale: Locale) {
  const section = getMessageObject<{
    portsTitle: string;
    portsBody: string;
    urgencyTitle: string;
    urgencyBody: string;
    ctaLabel: string;
    ariaLabel: string;
  }>(messages, "home.urgencyCta");

  if (!section) {
    throw new Error("Missing home.urgencyCta translations");
  }

  return {
    ...section,
    ctaHref: localizedPath(locale, routes.contact),
  };
}

export function getHomeFaq(messages: Messages) {
  const section = getMessageObject<{
    eyebrow: string;
    title: string;
    lead: string;
    ariaLabel: string;
  }>(messages, "home.faq");

  const items = getMessageArray<HomeFaqItem>(messages, "home.faq.items");

  if (!section) {
    throw new Error("Missing home.faq translations");
  }

  return { ...section, items };
}
