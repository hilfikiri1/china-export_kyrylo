import type { DedicatedPageContent } from "./types";

export const kontrolaJakosciPage: DedicatedPageContent = {
  id: "uslugi-kontrola-jakosci",
  meta: {
    title: "Kontrola jakości — Buy & Bring Solutions",
    description:
      "Inspekcje QC przed wysyłką z Chin — weryfikacja ilości, wymiarów, opakowania i testy funkcjonalne z raportem.",
  },
  hero: {
    eyebrow: "Przed produkcją",
    title: "Kontrola jakości przed wysyłką",
    lead: "Inspekcja towaru zanim opuści fabrykę — sprawdzamy zgodność ze specyfikacją, ilość, opakowanie i działanie. Płacisz dopiero, gdy wiesz, co wysyłasz.",
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
      body: "Inspekcja PSI zwykle trwa 1 dzień. Raport otrzymujesz w ciągu 24 godzin od zakończenia — przed finalną płatnością producentowi.",
    },
  ],
  cta: {
    primary: { label: "Zamów inspekcję QC", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
