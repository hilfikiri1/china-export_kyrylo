import {
  Building2,
  ClipboardCheck,
  Eye,
  MapPin,
  Settings2,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type TrustFactor = {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
};

export const trustFactors: TrustFactor[] = [
  {
    id: "china-operations",
    icon: MapPin,
    label: "Działamy na miejscu w Chinach",
    description:
      "Nasz zespół operacyjny w Foshan kontaktuje się z producentami, koordynuje zamówienia oraz organizuje kontrole i wysyłki.",
  },
  {
    id: "supplier-verification",
    icon: Eye,
    label: "Weryfikujemy producentów",
    description:
      "Sprawdzamy dane firmy, możliwości produkcyjne, dokumentację oraz zgodność oferty z wymaganiami projektu.",
  },
  {
    id: "quality-control",
    icon: ClipboardCheck,
    label: "Kontrolujemy towar przed wysyłką",
    description:
      "W zależności od projektu organizujemy kontrolę przedprodukcyjną, kontrolę w trakcie produkcji lub inspekcję przed wysyłką.",
  },
  {
    id: "logistics",
    icon: Truck,
    label: "Organizujemy dostawę od fabryki do magazynu",
    description:
      "Koordynujemy eksport, transport morski, kolejowy, lotniczy lub drogowy, odprawę celną i dostawę końcową.",
  },
  {
    id: "flexible",
    icon: Settings2,
    label: "Pełny proces lub wybrana usługa",
    description:
      "Możesz zlecić nam kompleksową obsługę albo tylko wyszukanie producenta, kontrolę jakości, konsolidację lub transport.",
  },
  {
    id: "b2b",
    icon: Building2,
    label: "Pracujemy z firmami B2B",
    description:
      "Wspieramy importerów, producentów, firmy handlowe i zespoły rozwijające produkty pod marką własną.",
  },
];
