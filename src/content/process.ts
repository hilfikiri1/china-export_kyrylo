export type ProcessStep = {
  id: string;
  title: string;
  text: string;
};

export const importProcessSteps: ProcessStep[] = [
  {
    id: "brief",
    title: "Brief i specyfikacja",
    text: "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
  },
  {
    id: "sourcing",
    title: "Wyszukiwanie i porównanie producentów",
    text: "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
  },
  {
    id: "verification",
    title: "Weryfikacja fabryki i próbek",
    text: "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
  },
  {
    id: "production",
    title: "Zamówienie i nadzór nad produkcją",
    text: "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
  },
  {
    id: "qc-docs",
    title: "Kontrola jakości i dokumentów",
    text: "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
  },
  {
    id: "delivery",
    title: "Transport, odprawa i dostawa",
    text: "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
  },
];
