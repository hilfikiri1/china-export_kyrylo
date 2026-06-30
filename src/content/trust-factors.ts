import {
  Building2,
  Eye,
  MapPin,
  ShieldCheck,
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
    id: "operations-china",
    icon: Building2,
    label: "Działamy na miejscu w Chinach",
    description:
      "Nasz zespół operacyjny w Foshan kontaktuje się z producentami, koordynuje zamówienia oraz organizuje kontrole i wysyłki.",
  },
  {
    id: "supplier-verification",
    icon: MapPin,
    label: "Weryfikujemy producentów",
    description:
      "Sprawdzamy dane firmy, możliwości produkcyjne, dokumentację oraz zgodność oferty z wymaganiami projektu.",
  },
  {
    id: "quality-control",
    icon: Eye,
    label: "Kontrolujemy towar przed wysyłką",
    description:
      "W zależności od projektu organizujemy kontrolę przedprodukcyjną, kontrolę w trakcie produkcji lub inspekcję przed wysyłką.",
  },
  {
    id: "logistics",
    icon: ShieldCheck,
    label: "Organizujemy dostawę od fabryki do magazynu",
    description:
      "Koordynujemy eksport, transport morski, kolejowy, lotniczy lub drogowy, odprawę celną i dostawę końcową.",
  },
  {
    id: "flexible-cooperation",
    icon: Truck,
    label: "Pełny proces lub wybrana usługa",
    description:
      "Możesz zlecić nam kompleksową obsługę albo tylko wyszukanie producenta, kontrolę jakości, konsolidację lub transport.",
  },
];
