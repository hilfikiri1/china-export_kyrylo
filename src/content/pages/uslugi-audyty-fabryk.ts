import type { DedicatedPageContent } from "./types";

export const audytyFabrykPage: DedicatedPageContent = {
  id: "uslugi-audyty-fabryk",
  meta: {
    title: "Weryfikacja dostawców i audyty fabryk",
    description:
      "Sprawdzamy dane rejestrowe, możliwości produkcyjne i dokumentację producenta. Weryfikacja zdalna, wideoweryfikacja na żywo lub audyt fabryki na miejscu.",
  },
  hero: {
    eyebrow: "Przed produkcją",
    title: "Weryfikacja dostawców i audyty fabryk",
    lead: "Sprawdzamy producenta przed zleceniem produkcji — dane rejestrowe, możliwości produkcyjne i dokumentację. Zakres weryfikacji dobieramy do projektu: zdalnie, wideo lub na miejscu.",
  },
  featuredSteps: {
    sectionTitle: "Jak przebiega audyt",
    sectionLead:
      "Wybierz etap, aby zobaczyć, co dzieje się na każdym kroku współpracy przed zleceniem produkcji.",
    steps: [
      {
        id: "analiza",
        tabLabel: "Analiza",
        title: "Analiza produktu i wymagań rynku UE",
        body: "Zaczynamy od zrozumienia produktu, certyfikacji wymaganych na rynku docelowym i specyfiki Twojej branży — zanim pojedziemy do fabryki.",
        bullets: [
          "Specyfikacja techniczna i wymagania UE",
          "Certyfikaty i normy obowiązkowe",
          "Kontekst wolumenu i harmonogramu",
        ],
        image: "/image/china_office.jpg",
        imageAlt: "Analiza produktu i wymagań rynku UE",
      },
      {
        id: "ryzyka",
        tabLabel: "Ryzyka",
        title: "Ocena ryzyk (dostawca, certyfikaty, logistyka)",
        body: "Identyfikujemy ryzyka operacyjne, prawne i logistyczne — od wiarygodności producenta po realność deklarowanych możliwości produkcyjnych.",
        bullets: [
          "Weryfikacja dokumentów i licencji",
          "Ocena certyfikatów i systemu jakości",
          "Analiza ryzyk logistycznych i dostawy",
        ],
        image: "/image/quality_control.jpg",
        imageAlt: "Ocena ryzyk dostawcy, certyfikatów i logistyki",
      },
      {
        id: "rekomendacja",
        tabLabel: "Rekomendacja",
        title: "Rekomendacja modułów i orientacyjny harmonogram",
        body: "Na podstawie analizy proponujemy zakres audytu — od weryfikacji wideo po pełną wizytę on-site — oraz orientacyjny plan działania.",
        bullets: [
          "Dobór rodzaju audytu do ryzyka",
          "Propozycja modułów współpracy",
          "Orientacyjny harmonogram i koszty",
        ],
        image: "/image/business_trips.jpg",
        imageAlt: "Rekomendacja modułów i harmonogram audytu",
      },
      {
        id: "pytania",
        tabLabel: "Pytania",
        title: "Odpowiedzi na pytania o proces i koszty",
        body: "Omawiamy szczegóły audytu, zakres raportu i kolejne kroki — tak, abyś przed wizytą w fabryce wiedział, czego się spodziewać.",
        bullets: [
          "Transparentny zakres i deliverables",
          "Wyjaśnienie procesu on-site",
          "Plan działania po audycie",
        ],
        image: "/image/china_office.jpg",
        imageAlt: "Odpowiedzi na pytania o proces audytu i koszty",
      },
    ],
  },
  sections: [
    {
      title: "Rodzaje audytów",
      body: "Dobieramy zakres do ryzyka produktu i wartości zamówienia — od weryfikacji wideo po pełny audit on-site z inspekcją linii produkcyjnej.",
      bullets: [
        "Weryfikacja prawna — licencje, rejestr, księgi handlowe",
        "Audit wideo na żywo — hala, magazyn, próbki produkcji",
        "Wizyta on-site — pełna inspekcja fabryki z raportem foto/wideo",
        "Re-audit — kontrola przed zleceniem dużej serii",
      ],
    },
    {
      title: "Na co zwracamy uwagę",
      body: "Szukamy sygnałów ostrzegawczych: brak własnej produkcji, niezgodność adresu z dokumentami, brak certyfikatów, zbyt niska cena w stosunku do rynku.",
      bullets: [
        "Zgodność fabryki z deklarowanymi możliwościami",
        "System jakości i dokumentacja procesów",
        "Warunki BCP i backup produkcji",
      ],
    },
    {
      title: "Deliverables",
      body: "Raport PDF z oceną ryzyka (zielony / żółty / czerwony), zdjęciami, rekomendacją i listą pytań do negocjacji.",
    },
  ],
  cta: {
    primary: { label: "Zamów audyt fabryki", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
