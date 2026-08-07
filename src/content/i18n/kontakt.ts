import type { Messages } from "@/i18n/get-dictionary";
import { contacts } from "@/config/contacts";
import type { Locale } from "@/i18n/config";
import { localizedPath, routes } from "@/i18n/routing";
import type { Translator } from "@/i18n/translate";
import { getMessageObject } from "@/i18n/translate";

export type KontaktScopeOption = {
  value: string;
  label: string;
};

export type KontaktChannel = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export function getKontaktLayout(
  locale: Locale,
  messages: Messages,
  t: Translator,
) {
  const page = getMessageObject<{
    meta: { title: string; description: string };
    hero: { eyebrow: string; title: string; lead: string };
    sections: Array<{ title: string; body: string; bullets?: string[] }>;
    cta: {
      primary: { label: string; href: string };
    };
    layout: {
      highlights: Array<{ value: string; label: string }>;
      channels: {
        email: string;
        phonePoland: string;
        phoneUkraine: string;
        phoneChina: string;
        officeUkraine: string;
        officeChina: string;
      };
      consultationHint: string;
    };
  }>(messages, "pages.contact");

  const formMessages = getMessageObject<{
    title: string;
    description: string;
    fields: {
      name: string;
      company: string;
      email: string;
      phone: string;
      scope: string;
      message: string;
    };
    placeholders: Record<string, string>;
    scopeOptions: Record<string, string>;
    submit: string;
    success: { title: string; description: string };
    error: { title: string; description: string };
  }>(messages, "forms.contact");

  const scopeOptions = formMessages?.scopeOptions ?? {};
  const layout = page?.layout;
  const channelLabels = layout?.channels;

  return {
    meta: page?.meta ?? { title: "", description: "" },
    hero: page?.hero ?? { eyebrow: "", title: "", lead: "" },
    guidance: page?.sections?.[0] ?? { title: "", body: "", bullets: [] },
    highlights: layout?.highlights ?? [],
    channels: [
      {
        id: "email",
        label: channelLabels?.email ?? t("common.email"),
        value: contacts.email,
        href: `mailto:${contacts.email}`,
      },
      {
        id: "phone-pl",
        label: channelLabels?.phonePoland ?? t("common.phone"),
        value: contacts.phones.poland.display,
        href: `tel:${contacts.phones.poland.tel}`,
      },
      {
        id: "phone-ua",
        label: channelLabels?.phoneUkraine ?? t("common.phone"),
        value: contacts.phones.ukraine.display,
        href: `tel:${contacts.phones.ukraine.tel}`,
      },
      {
        id: "phone-cn",
        label: channelLabels?.phoneChina ?? t("common.phone"),
        value: contacts.phones.china.display,
        href: `tel:${contacts.phones.china.tel}`,
      },
      {
        id: "office-ua",
        label: channelLabels?.officeUkraine ?? "",
        value: contacts.addresses.ukraine[locale],
      },
      {
        id: "office-cn",
        label: channelLabels?.officeChina ?? "",
        value: contacts.addresses.china[locale],
      },
      {
        id: "whatsapp",
        label: messages.common.whatsapp,
        value: contacts.phones.poland.display,
        href: contacts.social.whatsapp,
      },
      {
        id: "instagram",
        label: "Instagram",
        value: "@buybring_solutions",
        href: contacts.social.instagram,
      },
      {
        id: "facebook",
        label: "Facebook",
        value: "Buy & Bring Solutions",
        href: contacts.social.facebook,
      },
    ] satisfies KontaktChannel[],
    consultationLink: {
      label: page?.cta?.primary?.label ?? t("common.bookConsultation"),
      href: localizedPath(locale, routes.consultation),
      hint: layout?.consultationHint ?? "",
    },
    form: {
      title: formMessages?.title ?? t("forms.contact.title"),
      description: formMessages?.description ?? "",
      scopeLabel: formMessages?.fields?.scope ?? "",
      scopeOptions: Object.entries(scopeOptions).map(([value, label]) => ({
        value,
        label,
      })) satisfies KontaktScopeOption[],
      submitLabel: formMessages?.submit ?? t("forms.contact.submit"),
      success: formMessages?.success ?? {
        title: "",
        description: "",
      },
      error: formMessages?.error ?? {
        title: "",
        description: "",
      },
      fields: formMessages?.fields,
      placeholders: formMessages?.placeholders,
      sendAnother: t("forms.contact.sendAnother"),
    },
  };
}
