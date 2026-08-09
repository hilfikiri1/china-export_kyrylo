import type { Messages } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { getMessageObject } from "@/i18n/translate";

type ConsultationPageMessages = {
  hero: { lead: string };
  sections: Array<{ title: string; body: string; bullets?: string[] }>;
  layout: {
    hero: {
      badge: string;
      titleLead: string;
      titleAccent: string;
      stats: Array<{ value: string; label: string }>;
    };
    agenda: {
      title: string;
      steps: Array<{ num: string; title: string; description: string }>;
      facilitatorTitle: string;
    };
    footerCta: { label: string; hint: string };
  };
};

type ConsultationFormMessages = {
  title: string;
  description: string;
  fields: { name: string; email: string; topic: string; notes: string };
  placeholders: { name: string; email: string; notes: string };
  topicOptions: Record<string, string>;
  submit: string;
  footnote: string;
  footnoteLink: string;
  sendAnother: string;
  success: { title: string; description: string };
};

const requestSlotLabel: Record<Locale, string> = {
  pl: "Poproś o termin konsultacji",
  en: "Request a consultation time",
  uk: "Запросити час консультації",
  ru: "Запросить время консультации",
  de: "Beratungstermin anfragen",
  zh: "申请咨询时间",
};

export function getKonsultacjaLayout(messages: Messages, locale: Locale) {
  const page = getMessageObject<ConsultationPageMessages>(
    messages,
    "pages.consultation",
  );
  const formMessages = getMessageObject<ConsultationFormMessages>(
    messages,
    "forms.consultation",
  );

  if (!page?.layout || !formMessages) {
    throw new Error("Missing consultation page/form translations");
  }

  return {
    hero: {
      badge: page.layout.hero.badge,
      titleLead: page.layout.hero.titleLead,
      titleAccent: page.layout.hero.titleAccent,
      lead: page.hero.lead,
      stats: page.layout.hero.stats,
    },
    agenda: {
      title: page.layout.agenda.title,
      intro: page.sections[0]?.body ?? "",
      steps: page.layout.agenda.steps,
      facilitator: {
        title: page.layout.agenda.facilitatorTitle,
        body: page.sections[1]?.body ?? "",
      },
    },
    form: {
      title: requestSlotLabel[locale],
      description: formMessages.description,
      topicLabel: formMessages.fields.topic,
      topicOptions: Object.entries(formMessages.topicOptions).map(
        ([value, label]) => ({ value, label }),
      ),
      notesLabel: formMessages.fields.notes,
      notesPlaceholder: formMessages.placeholders.notes,
      submitLabel: requestSlotLabel[locale],
      footnote: formMessages.footnote,
      footnoteLink: {
        label: formMessages.footnoteLink,
        href: localizedPath(locale, "kontakt"),
      },
      success: formMessages.success,
      sendAnother: formMessages.sendAnother,
      fields: formMessages.fields,
      placeholders: formMessages.placeholders,
    },
    footerCta: {
      label: page.layout.footerCta.label,
      href: localizedPath(locale, "proces"),
      hint: page.layout.footerCta.hint,
    },
  };
}
