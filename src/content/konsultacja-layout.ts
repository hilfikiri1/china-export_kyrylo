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
    badge: "Bezpłatna",
    titleLead: "Umów konsultację",
    titleAccent: "bez zobowiązań",
    lead: konsultacjaPage.hero.lead,
    stats: [
      { value: "Online", label: "Zoom / Meet / telefon" },
      { value: "0 zł", label: "Bez opłat wstępnych" },
      { value: "Moduły", label: "Elastyczny zakres" },
    ] satisfies KonsultacjaStat[],
  },
  agenda: {
    title: "Jak wygląda rozmowa",
    intro: konsultacjaPage.sections[0]?.body ?? "",
    steps: [
      {
        num: "01",
        title: "Analiza projektu",
        description: "Omawiamy produkt, wolumen, termin i wymagania techniczne",
      },
      {
        num: "02",
        title: "Ocena ryzyk",
        description: "Oceniamy potencjalne ryzyka i kluczowe kwestie do sprawdzenia",
      },
      {
        num: "03",
        title: "Rekomendacja zakresu",
        description: "Sugerujemy minimalne sensowne moduły i orientacyjny harmonogram",
      },
      {
        num: "04",
        title: "Pytania i koszty",
        description: "Odpowiadamy na pytania o proces, koszty i kolejne kroki",
      },
    ] satisfies KonsultacjaAgendaStep[],
    facilitator: {
      title: "Z kim rozmawiasz",
      body: konsultacjaPage.sections[1]?.body ?? "",
    },
  },
  form: {
    title: "Zarezerwuj termin",
    description:
      "Podaj dane kontaktowe i temat rozmowy — odezwiemy się, aby ustalić dogodny termin.",
    topicLabel: "Temat konsultacji",
    topicOptions: [
      { value: "sourcing", label: "Wyszukiwanie producenta" },
      { value: "verification", label: "Weryfikacja lub audyt fabryki" },
      { value: "qc", label: "Kontrola jakości" },
      { value: "oem", label: "Private Label / OEM" },
      { value: "consolidation", label: "Konsolidacja" },
      { value: "freight", label: "Transport i odprawa celna" },
      { value: "full", label: "Kompleksowa obsługa importu" },
      { value: "other", label: "Inne" },
    ] satisfies KonsultacjaTopicOption[],
    notesLabel: "Krótki opis projektu (opcjonalnie)",
    notesPlaceholder: "Czego dotyczy projekt?",
    submitLabel: "Poproś o kontakt",
    footnote: "Wolisz napisać zamiast rozmawiać?",
    footnoteLink: { label: "Wyślij zapytanie", href: "/kontakt" },
    success: {
      title: "Dziękujemy!",
      description:
        "Otrzymaliśmy zgłoszenie. Skontaktujemy się z Tobą wkrótce, aby potwierdzić rozmowę.",
    },
  },
  footerCta: {
    label: "Jak pracujemy",
    href: "/proces",
    hint: "Poznaj pełną ścieżkę współpracy — od briefu po dostawę pod wskazany adres.",
  },
} as const;
