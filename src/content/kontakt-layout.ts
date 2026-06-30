import { kontaktPage } from "@/content/pages/kontakt";
import { contacts } from "@/config/contacts";
import type { Messages } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export type KontaktHighlight = {
  value: string;
  label: string;
};

export type KontaktChannel = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export type KontaktScopeOption = {
  value: string;
  label: string;
};

export type KontaktLayout = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  guidance: { title: string; body: string; bullets: string[] };
  highlights: KontaktHighlight[];
  channels: KontaktChannel[];
  consultationLink: { label: string; href: string; hint: string };
  form: {
    title: string;
    description: string;
    scopeLabel: string;
    scopeOptions: KontaktScopeOption[];
    submitLabel: string;
    success: { title: string; description: string };
  };
};

const highlightCopy = {
  response: {
    pl: "Odpowiedź robocza",
    uk: "Робоча відповідь",
    ru: "Рабочий ответ",
    de: "Antwort werktags",
    zh: "工作日回复",
  },
  team: {
    pl: "Zespół w Polsce, Ukrainie i Chinach",
    uk: "Команда в Польщі, Україні та Китаї",
    ru: "Команда в Польше, Украине и Китае",
    de: "Team in Polen, Ukraine und China",
    zh: "波兰、乌克兰与中国团队",
  },
  modules: {
    pl: "Elastyczny zakres usług",
    uk: "Гнучкий обсяг послуг",
    ru: "Гибкий объём услуг",
    de: "Flexibler Leistungsumfang",
    zh: "灵活服务范围",
  },
} as const;

const channelLabels = {
  email: {
    pl: "E-mail",
    uk: "E-mail",
    ru: "E-mail",
    de: "E-Mail",
    zh: "电子邮件",
  },
  phonePoland: {
    pl: "Telefon — Polska",
    uk: "Телефон — Польща",
    ru: "Телефон — Польша",
    de: "Telefon — Polen",
    zh: "电话 — 波兰",
  },
  phoneUkraine: {
    pl: "Telefon — Ukraina",
    uk: "Телефон — Україна",
    ru: "Телефон — Украина",
    de: "Telefon — Ukraine",
    zh: "电话 — 乌克兰",
  },
  phoneChina: {
    pl: "Telefon — Chiny",
    uk: "Телефон — Китай",
    ru: "Телефон — Китай",
    de: "Telefon — China",
    zh: "电话 — 中国",
  },
  officeUkraine: {
    pl: "Biuro — Ukraina",
    uk: "Офіс — Україна",
    ru: "Офис — Украина",
    de: "Büro — Ukraine",
    zh: "办公室 — 乌克兰",
  },
  officeChina: {
    pl: "Biuro — Chiny (Foshan)",
    uk: "Офіс — Китай (Foshan)",
    ru: "Офис — Китай (Foshan)",
    de: "Büro — China (Foshan)",
    zh: "办公室 — 中国（佛山）",
  },
} as const;

export function getKontaktLayout(locale: Locale, messages: Messages): KontaktLayout {
  const scopeOptions = Object.entries(messages.contact.scopeOptions).map(
    ([value, label]) => ({ value, label }),
  );

  return {
    meta: kontaktPage.meta,
    hero: {
      eyebrow: messages.nav.contact,
      title: messages.contact.heading,
      lead: messages.contact.supporting,
    },
    guidance: {
      title: kontaktPage.sections[0]?.title ?? "",
      body: kontaktPage.sections[0]?.body ?? "",
      bullets: kontaktPage.sections[0]?.bullets ?? [],
    },
    highlights: [
      { value: "24h", label: highlightCopy.response[locale] },
      { value: "PL + UA + CN", label: highlightCopy.team[locale] },
      { value: "Moduły", label: highlightCopy.modules[locale] },
    ],
    channels: [
      {
        id: "email",
        label: channelLabels.email[locale],
        value: contacts.email,
        href: `mailto:${contacts.email}`,
      },
      {
        id: "phone-pl",
        label: channelLabels.phonePoland[locale],
        value: contacts.phones.poland.display,
        href: `tel:${contacts.phones.poland.tel}`,
      },
      {
        id: "phone-ua",
        label: channelLabels.phoneUkraine[locale],
        value: contacts.phones.ukraine.display,
        href: `tel:${contacts.phones.ukraine.tel}`,
      },
      {
        id: "phone-cn",
        label: channelLabels.phoneChina[locale],
        value: contacts.phones.china.display,
        href: `tel:${contacts.phones.china.tel}`,
      },
      {
        id: "office-ua",
        label: channelLabels.officeUkraine[locale],
        value: contacts.addresses.ukraine[locale],
      },
      {
        id: "office-cn",
        label: channelLabels.officeChina[locale],
        value: contacts.addresses.china[locale],
      },
    ],
    consultationLink: {
      label: messages.consultation.heading,
      href: "/konsultacja",
      hint: messages.consultation.text,
    },
    form: {
      title: messages.contact.formTitle,
      description: messages.contact.formDescription,
      scopeLabel: messages.contact.scope,
      scopeOptions,
      submitLabel: messages.contact.submit,
      success: {
        title: messages.contact.successTitle,
        description: messages.contact.successDescription,
      },
    },
  };
}
