export const CANTON_FAIR_PATH = "uslugi/targi-kantonskie";
export const CANTON_FAIR_BLOG_SLUG = "canton-fair-2026";

export const CANTON_FAIR_OFFICIAL_URL = "https://www.cantonfair.org.cn/en-US";
export const CANTON_FAIR_BUYER_URL = "https://buyer.cantonfair.org.cn/";

export type CantonFairPhase = {
  number: 1 | 2 | 3;
  officialName: string;
  polishName: string;
  dateLabel: string;
  startIso: string;
  endIso: string;
  summary: string;
  groups: Array<{
    title: string;
    items: string[];
  }>;
};

/**
 * 140th Canton Fair, Autumn 2026.
 * Dates follow the official China Import and Export Fair announcement.
 * Times use the current published daily opening window, 09:30-18:00 China time.
 */
export const cantonFairPhases: CantonFairPhase[] = [
  {
    number: 1,
    officialName: "Advanced Manufacturing",
    polishName: "Zaawansowana produkcja",
    dateLabel: "15–19 października 2026",
    startIso: "2026-10-15T09:30:00+08:00",
    endIso: "2026-10-19T18:00:00+08:00",
    summary:
      "Maszyny, automatyka, elektronika, energia, pojazdy, części, oświetlenie i narzędzia.",
    groups: [
      {
        title: "Elektronika i AGD",
        items: [
          "sprzęt gospodarstwa domowego",
          "elektronika użytkowa i produkty informatyczne",
        ],
      },
      {
        title: "Produkcja i przemysł",
        items: [
          "maszyny ogólne i części mechaniczne",
          "maszyny i urządzenia do obróbki",
          "nowe materiały i produkty chemiczne",
          "energetyka i urządzenia elektryczne",
          "automatyka przemysłowa i inteligentna produkcja",
          "maszyny rolnicze i budowlane",
        ],
      },
      {
        title: "Motoryzacja i dwa koła",
        items: [
          "pojazdy i części zamienne",
          "pojazdy nowej energii i smart mobility",
          "motocykle i rowery",
        ],
      },
      {
        title: "Energia, oświetlenie i hardware",
        items: [
          "oświetlenie",
          "produkty elektryczne i elektroniczne",
          "źródła nowej energii",
          "narzędzia i artykuły metalowe",
        ],
      },
    ],
  },
  {
    number: 2,
    officialName: "Quality Home Life",
    polishName: "Dom, wyposażenie i dekoracje",
    dateLabel: "23–27 października 2026",
    startIso: "2026-10-23T09:30:00+08:00",
    endIso: "2026-10-27T18:00:00+08:00",
    summary:
      "Wyposażenie domu, prezenty i dekoracje, materiały budowlane, łazienki i meble.",
    groups: [
      {
        title: "Artykuły domowe",
        items: [
          "wyposażenie kuchni i zastawa stołowa",
          "artykuły gospodarstwa domowego",
          "ceramika użytkowa",
        ],
      },
      {
        title: "Prezenty i dekoracje",
        items: [
          "upominki i artykuły promocyjne",
          "dekoracje domu i artykuły ogrodowe",
          "szkło i ceramika artystyczna",
          "dekoracje sezonowe i świąteczne",
          "wyroby z rattanu, żelaza i materiałów plecionych",
          "zegary, zegarki i artykuły optyczne",
        ],
      },
      {
        title: "Budownictwo i meble",
        items: [
          "materiały budowlane i dekoracyjne",
          "meble",
          "wyposażenie sanitarne i łazienkowe",
          "kamień i dekoracje metalowe",
          "wyposażenie outdoor i spa",
        ],
      },
    ],
  },
  {
    number: 3,
    officialName: "Better Life",
    polishName: "Zdrowie, moda i styl życia",
    dateLabel: "31 października – 4 listopada 2026",
    startIso: "2026-10-31T09:30:00+08:00",
    endIso: "2026-11-04T18:00:00+08:00",
    summary:
      "Moda, tekstylia, zabawki, produkty dziecięce, sport, zdrowie, medycyna, żywność i artykuły dla zwierząt.",
    groups: [
      {
        title: "Dzieci i zabawki",
        items: ["zabawki", "produkty dziecięce, niemowlęce i ciążowe", "odzież dziecięca"],
      },
      {
        title: "Moda",
        items: [
          "odzież damska i męska",
          "torby i walizki",
          "obuwie",
          "surowce i tkaniny tekstylne",
          "dodatki modowe",
          "odzież sportowa i casual",
          "bielizna, skóry i wyroby puchowe",
        ],
      },
      {
        title: "Tekstylia domowe i biuro",
        items: ["tekstylia domowe", "dywany i gobeliny", "artykuły biurowe"],
      },
      {
        title: "Zdrowie i rekreacja",
        items: [
          "sport, podróże i rekreacja",
          "żywność",
          "leki, produkty zdrowotne i urządzenia medyczne",
          "pielęgnacja osobista i kosmetyka użytkowa",
          "produkty i karma dla zwierząt",
          "artykuły higieniczne",
        ],
      },
    ],
  },
];
