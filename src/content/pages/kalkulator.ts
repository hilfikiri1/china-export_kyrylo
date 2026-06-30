import type { DedicatedPageContent } from "./types";

export const kalkulatorPage: DedicatedPageContent = {
  id: "kalkulator",
  meta: {
    title: "Kalkulator importu — Buy & Bring Solutions",
    description:
      "Orientacyjny kalkulator importu z Chin: transport, cło, VAT i koszt dostawy do Polski. Narzędzie planistyczne Buy & Bring Solutions.",
  },
  hero: {
    eyebrow: "Narzędzia",
    title: "Orientacyjny kalkulator importu z Chin",
    lead: "Oszacuj pełny koszt importu — fracht, cło, VAT i obsługę celną — zanim wyślesz zapytanie. Wynik ma charakter orientacyjny i nie stanowi oferty handlowej.",
  },
  sections: [
    {
      title: "Co uwzględnia kalkulator",
      body: "Kalkulator łączy szacunkowy koszt transportu z podstawową kalkulacją celną i podatkową po stronie polskiej.",
      bullets: [
        "Wartość towaru w USD, EUR lub PLN z aktualnymi kursami NBP",
        "Tryby: FCL morski/kolejowy, LCL oraz transport lotniczy",
        "Incoterms EXW, FOB i CIF z odpowiednią wartością celną",
        "Cło, VAT importowy 23% oraz koszt agencji celnej",
        "Opcjonalne ubezpieczenie ładunku (poza CIF)",
      ],
    },
    {
      title: "Czego kalkulator nie obejmuje",
      body: "To narzędzie planistyczne oparte na przykładowych stawkach frachtowych. Dokładna wycena wymaga weryfikacji kodu CN/TARIC, trasy i specyfiki ładunku.",
      bullets: [
        "Towary niebezpieczne, baterie litowe, chemia i żywność",
        "Akcyza, cła antydumpingowe i procedury specjalne",
        "Door-to-door z odbiorem z fabryki (poza wybranym incotermem)",
        "Indywidualne stawki portowe dla konkretnych portów załadunku",
      ],
    },
  ],
  cta: {
    primary: { label: "Wyślij zapytanie o wycenę", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
