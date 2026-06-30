import type { DedicatedPageContent } from "./types";

export const kalkulatorPage: DedicatedPageContent = {
  id: "kalkulator",
  meta: {
    title: "Kalkulator importu z Chin | Buy & Bring Solutions",
    description:
      "Oblicz orientacyjny koszt importu z Chin — transport, cło, VAT i koszt jednostkowy.",
  },
  hero: {
    eyebrow: "Narzędzia",
    title: "Kalkulator kosztu importu z Chin",
    lead: "Oblicz orientacyjny koszt zakupu, transportu, cła i podatku VAT. Wynik ma charakter informacyjny i nie stanowi oferty handlowej ani porady podatkowej.",
  },
  sections: [
    {
      title: "Co uwzględnia kalkulator",
      body: "Kalkulator łączy szacunkowy koszt transportu z podstawową kalkulacją celną i podatkową.",
      bullets: [
        "Wartość towaru w USD, EUR lub PLN z kursami NBP",
        "Tryby: FCL morski/kolejowy, LCL oraz transport lotniczy",
        "Incoterms EXW, FOB i CIF z odpowiednią wartością celną",
        "Cło, VAT importowy 23% oraz koszt agencji celnej",
        "Opcjonalne ubezpieczenie ładunku",
      ],
    },
    {
      title: "Czego kalkulator nie obejmuje",
      body: "To narzędzie planistyczne. Dokładna wycena wymaga weryfikacji kodu HS/TARIC, trasy i specyfiki ładunku.",
      bullets: [
        "Towary niebezpieczne, baterie litowe, chemia i żywność",
        "Akcyza, cła antydumpingowe i procedury specjalne",
        "Indywidualne stawki portowe dla konkretnych portów załadunku",
      ],
    },
  ],
  cta: {
    primary: { label: "Prześlij dane do weryfikacji", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
