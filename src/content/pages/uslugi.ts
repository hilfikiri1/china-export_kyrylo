import type { DedicatedPageContent } from "./types";

export const uslugiPage: DedicatedPageContent = {
  id: "uslugi",
  meta: {
    title: "Usługi modułowe — Buy & Bring Solutions",
    description:
      "Każdy etap importu jako osobna usługa — sourcing, audyty, QC, spedycja i dostawa door-to-door. Wybierz moduły, których potrzebujesz.",
  },
  hero: {
    eyebrow: "Usługi modułowe",
    title: "Kupujesz dokładnie to, czego potrzebujesz",
    lead: "Nie musisz wykupywać pełnego pakietu end-to-end. Każdy etap mapy współpracy działa jako samodzielny moduł — od wyszukiwania dostawcy po dostawę pod Twój adres.",
  },
  sections: [
    {
      title: "Jak wybrać moduły",
      body: "Jeśli masz już dostawcę — potrzebujesz może tylko QC i spedycji. Jeśli zaczynasz od zera — zaczynamy od sourcingu i audytu. Na konsultacji pomożemy dobrać minimalny, sensowny zakres.",
      bullets: [
        "Przed produkcją — sourcing, audyty, QC, OEM",
        "Logistyka — płatności, konsolidacja, fracht",
        "Dostawa w UE — odprawa celna, door-to-door",
      ],
    },
  ],
  cta: {
    primary: { label: "Wyślij zapytanie", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
