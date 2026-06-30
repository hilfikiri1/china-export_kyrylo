export type IndustryCategory = {
  id: string;
  title: string;
  items: string[];
};

export const industryCategories: IndustryCategory[] = [
  {
    id: "industrial-machinery",
    title: "Maszyny i urządzenia przemysłowe",
    items: [
      "maszyny dla branży opakowaniowej i papierniczej",
      "maszyny spożywcze",
      "linie do przetwórstwa i produkcji",
      "urządzenia medyczne i SPA",
      "maszyny budowlane",
    ],
  },
  {
    id: "battery-energy",
    title: "Technologie akumulatorowe i rozwiązania energetyczne",
    items: [
      "ogniwa LFP i NMC",
      "ogniwa pryzmatyczne i cylindryczne",
      "systemy BMS",
      "pakiety akumulatorowe",
      "akumulatory przemysłowe",
      "magazyny energii ESS",
      "stacje ładowania",
    ],
  },
  {
    id: "emobility",
    title: "Elektromobilność i komponenty",
    items: [
      "motocykle elektryczne",
      "silniki i sterowniki",
      "rozwiązania akumulatorowe",
      "drony",
      "pojazdy",
      "opony",
      "części samochodowe",
    ],
  },
  {
    id: "chemicals",
    title: "Chemia i surowce",
    items: [
      "dodatki paszowe",
      "składniki funkcjonalne",
      "surowce dla przemysłu",
      "LLDPE, LDPE i HDPE",
      "chemia przemysłowa",
      "materiały klejące",
    ],
  },
  {
    id: "paper-packaging",
    title: "Papier, opakowania i materiały",
    items: [
      "papier kraft",
      "karton GC1, GC2 i FBB",
      "papier do produkcji kubków",
      "folia PET",
      "surowce opakowaniowe",
      "papiery specjalistyczne i termoodporne",
    ],
  },
  {
    id: "textiles",
    title: "Tekstylia i materiały techniczne",
    items: [
      "polar",
      "tkaniny bawełniane i syntetyczne",
      "tkaniny mieszane",
      "tkaniny techniczne",
      "materiały specjalistyczne",
      "produkty tekstylne",
    ],
  },
  {
    id: "construction",
    title: "Budownictwo i wyposażenie specjalistyczne",
    items: [
      "domy kontenerowe i modułowe",
      "wyposażenie kolejowe",
      "materiały budowlane",
      "maszyny i wyposażenie specjalistyczne",
    ],
  },
  {
    id: "consumer-private-label",
    title: "Produkty konsumenckie i Private Label",
    items: [
      "naczynia",
      "odzież",
      "zabawki",
      "wyroby żeliwne",
      "folie",
      "artykuły dla zwierząt",
      "inne produkty wykonywane pod marką klienta",
    ],
  },
];

export const industriesClosingLine =
  "Nie widzisz swojej kategorii? Opisz produkt — sprawdzimy możliwości produkcji i dostawy.";
