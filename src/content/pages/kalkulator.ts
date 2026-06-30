import type { DedicatedPageContent } from "./types";

export const kalkulatorPage: DedicatedPageContent = {
  id: "kalkulator",
  meta: {
    title: "Kalkulator kosztu importu z Chin — Buy & Bring Solutions",
    description:
      "Oblicz orientacyjny koszt zakupu, transportu, cła i podatku VAT. Wynik ma charakter informacyjny.",
  },
  hero: {
    eyebrow: "Narzędzia · Buy & Bring Solutions",
    title: "Kalkulator kosztu importu z Chin",
    lead: "Oblicz orientacyjny koszt zakupu, transportu, cła i podatku VAT. Wynik ma charakter informacyjny i nie stanowi oferty handlowej ani porady podatkowej.",
  },
  sections: [
    {
      title: "Co uwzględnia kalkulator",
      body: "Moduł B&BS Poland łączy szacunkowy koszt transportu z podstawową kalkulacją celną i podatkową po stronie polskiej.",
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
