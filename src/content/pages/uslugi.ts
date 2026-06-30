import type { DedicatedPageContent } from "./types";

export const uslugiPage: DedicatedPageContent = {
  id: "uslugi",
  meta: {
    title: "Usługi dopasowane do etapu projektu — Buy & Bring Solutions",
    description:
      "Możemy przeprowadzić cały proces importu albo wesprzeć Cię tylko na wybranym etapie: sourcing, weryfikacja, kontrola jakości, konsolidacja, transport i odprawa.",
  },
  hero: {
    eyebrow: "Usługi",
    title: "Usługi dopasowane do etapu Twojego projektu",
    lead: "Możemy przeprowadzić cały proces importu albo wesprzeć Cię tylko na wybranym etapie.",
  },
  sections: [
    {
      title: "Jak wybrać zakres",
      body: "Jeśli masz już producenta, możesz potrzebować tylko kontroli jakości, konsolidacji lub transportu. Jeśli zaczynasz od zera, zaczniemy od wyszukiwania i porównania producentów.",
      bullets: [
        "przed produkcją — sourcing, weryfikacja, próbki, Private Label",
        "logistyka — konsolidacja, dokumentacja, eksport",
        "dostawa — transport, odprawa celna i dostawa końcowa",
      ],
    },
  ],
  cta: {
    primary: { label: "Opisz projekt", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
