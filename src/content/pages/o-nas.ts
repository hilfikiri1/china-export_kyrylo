import type { DedicatedPageContent } from "./types";

export const oNasPage: DedicatedPageContent = {
  id: "o-nas",
  meta: {
    title: "O nas — Buy & Bring Solutions",
    description:
      "Łączymy europejskie firmy z producentami w Chinach. Wyszukiwanie producentów, kontrola jakości i dostawy z Chin dla firm.",
  },
  hero: {
    eyebrow: "Kim jesteśmy",
    title: "Łączymy europejskie firmy z producentami w Chinach",
    lead: "Buy & Bring Solutions wspiera firmy w wyszukiwaniu producentów, organizacji produkcji, kontroli jakości i dostawach z Chin. Łączymy bezpośrednią pracę z chińskimi fabrykami z obsługą klientów w Europie i Ukrainie.",
  },
  sections: [
    {
      title: "Nasza misja",
      body: "Naszym celem jest ograniczenie ryzyka, uporządkowanie komunikacji z producentem i przeprowadzenie klienta przez cały proces — od specyfikacji i wyboru fabryki po kontrolę, transport i dostawę. Zespół Buy & Bring Solutions posiada 17 lat doświadczenia we współpracy z Chinami, a nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong.",
    },
    {
      title: "Dlaczego firmy z nami pracują",
      body: "Możesz powierzyć nam cały proces importu albo wesprzeć się tylko na wybranym etapie. Pracujemy elastycznie i dopasowujemy zakres do potrzeb projektu.",
      bullets: [
        "Bezpośredni kontakt z producentami",
        "Wsparcie zespołu na miejscu w Chinach",
        "Komunikacja w kilku językach",
        "Możliwość kompleksowej lub modułowej współpracy",
        "Doświadczenie w maszynach, surowcach i produktach Private Label",
        "Kontrola projektu od zapytania do wysyłki",
      ],
    },
  ],
  highlights: [
    { label: "Doświadczenia we współpracy z Chinami", value: "17 lat" },
    { label: "Obsłużonych klientów", value: "275+" },
    { label: "Dostarczonych kontenerów", value: "110+" },
  ],
  cta: {
    primary: { label: "Działamy w Chinach", href: "/zespol-w-chinach" },
    secondary: { label: "Opisz projekt", href: "/kontakt" },
  },
};
