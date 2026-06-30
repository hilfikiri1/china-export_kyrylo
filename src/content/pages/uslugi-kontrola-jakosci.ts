import type { DedicatedPageContent } from "./types";

export const kontrolaJakosciPage: DedicatedPageContent = {
  id: "uslugi-kontrola-jakosci",
  meta: {
    title: "Kontrola jakości towarów",
    description:
      "Organizujemy kontrolę jakości na podstawie uzgodnionej specyfikacji, checklisty i próbek referencyjnych — weryfikacja ilości, wymiarów, opakowania i testy funkcjonalne.",
  },
  hero: {
    eyebrow: "Przed produkcją",
    title: "Kontrola jakości towarów",
    lead: "Organizujemy kontrolę jakości na podstawie uzgodnionej specyfikacji — sprawdzamy zgodność, ilość, opakowanie, oznakowanie i działanie. Zakres kontroli dobieramy do projektu.",
  },
  sections: [
    {
      title: "Etapy kontroli",
      body: "QC może obejmować inspekcję w trakcie produkcji (DUPRO), przed wysyłką (PSI) lub oba — w zależności od produktu i ryzyka.",
      bullets: [
        "DUPRO — kontrola w trakcie produkcji (25–50% serii)",
        "PSI — inspekcja przed wysyłką (pre-shipment)",
        "Losowanie próbek według AQL (ISO 2859-1)",
        "Pomiary wymiarowe i testy funkcjonalne",
      ],
    },
    {
      title: "Co sprawdzamy",
      body: "Każda inspekcja ma checklistę dopasowaną do produktu — od elektroniki po materiały budowlane. Raport zawiera zdjęcia każdej usterki.",
      bullets: [
        "Zgodność z approved sample i specyfikacją",
        "Ilość, etykietowanie, instrukcje i opakowanie",
        "Testy działania i wytrzymałości (wg specyfikacji)",
        "Raport Pass / Fail z rekomendacją",
      ],
    },
    {
      title: "Harmonogram",
      body: "Inspekcja przed wysyłką zwykle trwa jeden dzień, a raport otrzymujesz wkrótce po jej zakończeniu — zanim towar opuści fabrykę.",
    },
  ],
  cta: {
    primary: { label: "Zamów inspekcję QC", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
