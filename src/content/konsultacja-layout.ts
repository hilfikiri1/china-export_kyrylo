import { konsultacjaPage } from "@/content/pages/konsultacja";

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
    badge: "Bezpłatna konsultacja",
    titleLead: "Umów bezpłatną",
    titleAccent: "konsultację",
    lead: konsultacjaPage.hero.lead,
    stats: [
      { value: "Online", label: "Lub telefonicznie" },
      { value: "0 zł", label: "Bez opłat wstępnych" },
      { value: "Bez zobowiązań", label: "Niezobowiązująca rozmowa" },
    ] satisfies KonsultacjaStat[],
  },
  agenda: {
    title: "Jak wygląda rozmowa",
    intro: konsultacjaPage.sections[0]?.body ?? "",
    steps: [
      {
        num: "01",
        title: "Analiza produktu",
        description: "Analiza produktu i wymagań rynku UE",
      },
      {
        num: "02",
        title: "Ocena ryzyk",
        description:
          "Ocena ryzyk — dostawca, certyfikaty, logistyka",
      },
      {
        num: "03",
        title: "Rekomendacja planu",
        description:
          "Rekomendacja modułów i orientacyjny harmonogram",
      },
      {
        num: "04",
        title: "Pytania i koszty",
        description: "Odpowiedzi na pytania o proces i koszty",
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
      "Podaj dane kontaktowe i temat rozmowy oraz dogodny termin — odezwiemy się, aby potwierdzić rozmowę.",
    topicLabel: "Temat konsultacji",
    topicOptions: [
      { value: "sourcing", label: "Wyszukiwanie producenta" },
      { value: "verification", label: "Weryfikacja lub audyt fabryki" },
      { value: "qc", label: "Kontrola jakości" },
      { value: "logistics", label: "Transport i odprawa" },
      { value: "full", label: "Kompleksowa obsługa importu" },
    ] satisfies KonsultacjaTopicOption[],
    notesLabel: "Krótki opis (opcjonalnie)",
    notesPlaceholder: "Czego dotyczy projekt?",
    submitLabel: "Poproś o kontakt",
    footnote: "Wolisz napisać zamiast rozmawiać?",
    footnoteLink: { label: "Opisz projekt", href: "/kontakt" },
    success: {
      title: "Dziękujemy — odezwiemy się wkrótce",
      description:
        "Otrzymaliśmy zgłoszenie. Skontaktujemy się z Tobą, aby potwierdzić termin rozmowy.",
    },
  },
  footerCta: {
    label: "Jak pracujemy",
    href: "/proces",
    hint: "Poznaj pełną ścieżkę współpracy — od briefu po transport, odprawę i dostawę.",
  },
} as const;
