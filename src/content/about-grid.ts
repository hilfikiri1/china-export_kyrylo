import type { Locale } from "@/i18n/config";

export type AboutGridPanel = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type AboutGridContent = {
  sectionCta: { label: string; href: string };
  hero: AboutGridPanel;
  row: AboutGridPanel[];
};

const copy = {
  sectionCta: {
    pl: "Poznaj nasz zespół w Chinach",
    en: "Meet our team in China",
    uk: "Познайомтеся з нашою командою в Китаї",
    ru: "Познакомьтесь с нашей командой в Китае",
    de: "Lernen Sie unser Team in China kennen",
    zh: "了解我们在中国的团队",
  },
  teamTitle: {
    pl: "Zespół w Chinach",
    en: "Team in China",
    uk: "Команда в Китаї",
    ru: "Команда в Китае",
    de: "Team in China",
    zh: "中国团队",
  },
  teamDescription: {
    pl: "Zespół operacyjny w Foshan — od weryfikacji dostawców po koordynację produkcji i wysyłki.",
    en: "Our operations team in Foshan supports supplier verification, production coordination and shipments.",
    uk: "Операційна команда в Foshan — від верифікації постачальників до координації виробництва та відправлень.",
    ru: "Операционная команда в Foshan — от верификации поставщиков до координации производства и отгрузок.",
    de: "Operatives Team in Foshan — von der Lieferantenprüfung bis zur Produktions- und Versandkoordination.",
    zh: "佛山运营团队——从供应商核验到生产协调与发货安排。",
  },
  teamImageAlt: {
    pl: "Zespół Buy & Bring Solutions w Foshan",
    en: "Buy & Bring Solutions team in Foshan",
    uk: "Команда Buy & Bring Solutions у Foshan",
    ru: "Команда Buy & Bring Solutions в Foshan",
    de: "Team von Buy & Bring Solutions in Foshan",
    zh: "Buy & Bring Solutions 佛山团队",
  },
  qcTitle: {
    pl: "Kontrola jakości i dokumentacja",
    en: "Quality control and documentation",
    uk: "Контроль якості та документація",
    ru: "Контроль качества и документация",
    de: "Qualitätskontrolle und Dokumentation",
    zh: "质量检验与文件",
  },
  qcDescription: {
    pl: "Inspekcje QA, raporty z kontroli, certyfikaty i pełna dokumentacja zgodna z wymogami importu do UE.",
    en: "QA inspections, inspection reports, certificates and complete documentation aligned with EU import requirements.",
    uk: "Інспекції QA, звіти з перевірок, сертифікати та повна документація відповідно до вимог імпорту в ЄС.",
    ru: "Инспекции QA, отчёты о проверках, сертификаты и полная документация в соответствии с требованиями импорта в ЕС.",
    de: "QA-Inspektionen, Prüfberichte, Zertifikate und vollständige Dokumentation gemäß EU-Importanforderungen.",
    zh: "质量检验、检验报告、证书及符合欧盟进口要求的完整文件。",
  },
  qcImageAlt: {
    pl: "Kontrola jakości towarów przed wysyłką z Chin",
    en: "Quality control before shipment from China",
    uk: "Контроль якості товарів перед відправленням з Китаю",
    ru: "Контроль качества товаров перед отгрузкой из Китая",
    de: "Qualitätskontrolle vor Versand aus China",
    zh: "中国发货前的质量检验",
  },
  tripsTitle: {
    pl: "Wyjazdy biznesowe do Chin",
    en: "Business trips to China",
    uk: "Ділові поїздки до Китаю",
    ru: "Деловые поездки в Китай",
    de: "Geschäftsreisen nach China",
    zh: "中国商务考察",
  },
  tripsDescription: {
    pl: "Organizujemy wizyty w fabrykach, tłumaczenia na miejscu i wsparcie podczas negocjacji z dostawcami.",
    en: "We organize factory visits, on-site interpretation and support during supplier negotiations.",
    uk: "Організовуємо візити на фабрики, переклад на місці та підтримку під час переговорів із постачальниками.",
    ru: "Организуем визиты на фабрики, перевод на месте и поддержку во время переговоров с поставщиками.",
    de: "Wir organisieren Fabrikbesuche, Dolmetschen vor Ort und Unterstützung bei Verhandlungen mit Lieferanten.",
    zh: "安排工厂参观、现场翻译及与供应商谈判支持。",
  },
  tripsImageAlt: {
    pl: "Wyjazdy biznesowe do fabryk w Chinach",
    en: "Business trips to factories in China",
    uk: "Ділові поїздки на фабрики в Китаї",
    ru: "Деловые поездки на фабрики в Китае",
    de: "Geschäftsreisen zu Fabriken in China",
    zh: "中国工厂商务考察",
  },
} as const;

export function getAboutGrid(locale: Locale): AboutGridContent {
  return {
    sectionCta: {
      label: copy.sectionCta[locale],
      href: "/zespol-w-chinach",
    },
    hero: {
      id: "team-china",
      title: copy.teamTitle[locale],
      description: copy.teamDescription[locale],
      image: "/image/china_office.jpg",
      imageAlt: copy.teamImageAlt[locale],
    },
    row: [
      {
        id: "quality-control",
        title: copy.qcTitle[locale],
        description: copy.qcDescription[locale],
        image: "/image/quality_control.jpg",
        imageAlt: copy.qcImageAlt[locale],
      },
      {
        id: "business-trips",
        title: copy.tripsTitle[locale],
        description: copy.tripsDescription[locale],
        image: "/image/business_trips.jpg",
        imageAlt: copy.tripsImageAlt[locale],
      },
    ],
  };
}

export function getAboutPanelById(
  locale: Locale,
  id: string,
): AboutGridPanel | undefined {
  const grid = getAboutGrid(locale);
  if (grid.hero.id === id) return grid.hero;
  return grid.row.find((panel) => panel.id === id);
}

export function getRequiredAboutPanel(locale: Locale, id: string): AboutGridPanel {
  const panel = getAboutPanelById(locale, id);
  if (!panel) {
    throw new Error(`Missing about panel: ${id}`);
  }
  return panel;
}

/** @deprecated Use getAboutGrid(locale) instead */
export const aboutGridSectionCta = {
  label: copy.sectionCta.pl,
  href: "/zespol-w-chinach",
} as const;

/** @deprecated Use getAboutGrid(locale) instead */
export const aboutGridHero: AboutGridPanel = {
  id: "team-china",
  title: copy.teamTitle.pl,
  description: copy.teamDescription.pl,
  image: "/image/china_office.jpg",
  imageAlt: copy.teamImageAlt.pl,
};

/** @deprecated Use getAboutGrid(locale) instead */
export const aboutGridRow: AboutGridPanel[] = [
  {
    id: "quality-control",
    title: copy.qcTitle.pl,
    description: copy.qcDescription.pl,
    image: "/image/quality_control.jpg",
    imageAlt: copy.qcImageAlt.pl,
  },
  {
    id: "business-trips",
    title: copy.tripsTitle.pl,
    description: copy.tripsDescription.pl,
    image: "/image/business_trips.jpg",
    imageAlt: copy.tripsImageAlt.pl,
  },
];
