import {
  BatteryCharging,
  Boxes,
  Building2,
  Cog,
  FlaskConical,
  Package,
  Shirt,
  ShoppingBag,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type IndustryCategory = {
  id: string;
  icon: LucideIcon;
  /** Polish master title. Translations are a documented follow-up task. */
  title: string;
  items: string[];
};

/**
 * Product / industry categories (Polish master), based on the official Buy &
 * Bring Solutions business areas. The section heading, lead and closing line
 * are translated via the i18n "sections" namespace.
 *
 * Do NOT present this list as a guarantee that every listed product can be
 * legally imported into every target country.
 */
export const industryCategories: IndustryCategory[] = [
  {
    id: "machinery",
    icon: Cog,
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
    id: "battery",
    icon: BatteryCharging,
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
    icon: Zap,
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
    icon: FlaskConical,
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
    icon: Package,
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
    icon: Shirt,
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
    icon: Building2,
    title: "Budownictwo i wyposażenie specjalistyczne",
    items: [
      "domy kontenerowe i modułowe",
      "wyposażenie kolejowe",
      "materiały budowlane",
      "maszyny i wyposażenie specjalistyczne",
    ],
  },
  {
    id: "consumer",
    icon: ShoppingBag,
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

export const industriesFallbackIcon = Boxes;
