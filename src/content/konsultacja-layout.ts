import { konsultacjaPage } from "@/content/pages/konsultacja";
import { serviceScopeOptions } from "@/content/kontakt-layout";

export type KonsultacjaStat = {
  value: string;
  label: string;
};

export type KonsultacjaAgendaStep = {
  num: string;
  title: string;
  description: string;
};

export type KonsultacjaTopicOption = {
  value: string;
  label: string;
};

export const konsultacjaLayout = {
  meta: konsultacjaPage.meta,
  hero: {
    badge: "Kontakt",
    titleLead: "Umów bezpłatną konsultację",
    titleAccent: "dla projektu importowego",
    lead: konsultacjaPage.hero.lead,
    stats: [
      { value: "Projekt", label: "Zakres rozmowy" },
      { value: "Online", label: "Telefon / Meet / WhatsApp" },
      { value: "0 zł", label: "Bez opłat wstępnych" },
    ] satisfies KonsultacjaStat[],
  },
  agenda: {
    title: "Co ustalimy",
    intro: konsultacjaPage.sections[0]?.body ?? "",
    steps: [
      {
        num: "01",
        title: "Produkt i wymagania",
        description: "Omówimy produkt, ilość, kraj docelowy i najważniejsze wymagania.",
      },
      {
        num: "02",
        title: "Zakres wsparcia",
        description: "Ustalimy, czy potrzebujesz całego procesu, czy wybranego etapu.",
      },
      {
        num: "03",
        title: "Dane do wyceny",
        description: "Wskażemy, jakie informacje są potrzebne do dalszej analizy.",
      },
      {
        num: "04",
        title: "Kolejne kroki",
        description: "Skontaktujemy się, aby potwierdzić rozmowę i zaproponować następny etap.",
      },
    ] satisfies KonsultacjaAgendaStep[],
    facilitator: {
      title: "Z kim rozmawiasz",
      body: konsultacjaPage.sections[1]?.body ?? "",
    },
  },
  form: {
    title: "Poproś o kontakt",
    description:
      "Podaj dane kontaktowe, preferowany termin i krótki opis projektu. Skontaktujemy się, aby potwierdzić rozmowę.",
    topicLabel: "Kategoria projektu",
    topicOptions: serviceScopeOptions satisfies KonsultacjaTopicOption[],
    notesLabel: "Krótki opis projektu",
    notesPlaceholder: "Produkt, ilość, kraj dostawy, preferowany termin kontaktu...",
    submitLabel: "Poproś o kontakt",
    footnote: "Wolisz wysłać pełniejsze zapytanie?",
    footnoteLink: { label: "Opisz projekt", href: "/kontakt" },
    success: {
      title: "Dziękujemy — skontaktujemy się",
      description:
        "Otrzymaliśmy zgłoszenie. Skontaktujemy się, aby potwierdzić rozmowę.",
    },
  },
  footerCta: {
    label: "Zobacz proces importu",
    href: "/proces",
    hint: "Poznaj pełną ścieżkę współpracy — od briefu po dostawę.",
  },
} as const;
