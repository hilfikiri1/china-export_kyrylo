import type { Locale } from "@/i18n/config";

export const siteUrl = "https://global.buybringsolutions.com";

type SeoEntry = {
  homeTitle: string;
  homeDescription: string;
};

export const seoByLocale: Record<Locale, SeoEntry> = {
  pl: {
    homeTitle: "Import z Chin dla firm | Buy & Bring Solutions",
    homeDescription:
      "Wyszukiwanie i weryfikacja producentów, kontrola jakości, produkcja pod marką własną, transport, odprawa celna i dostawa z Chin do Polski i Europy.",
  },
  uk: {
    homeTitle: "Імпорт із Китаю для бізнесу | Buy & Bring Solutions",
    homeDescription:
      "Пошук і перевірка виробників, контроль якості, Private Label, логістика, митне оформлення та доставка з Китаю до Європи.",
  },
  ru: {
    homeTitle: "Импорт из Китая для бизнеса | Buy & Bring Solutions",
    homeDescription:
      "Поиск и проверка производителей, контроль качества, Private Label, логистика, таможенное оформление и доставка из Китая в Европу.",
  },
  de: {
    homeTitle: "Import aus China für Unternehmen | Buy & Bring Solutions",
    homeDescription:
      "Lieferantensuche und Verifizierung, Qualitätskontrolle, Private Label, Transport, Zollabwicklung und Lieferung aus China nach Europa.",
  },
  zh: {
    homeTitle: "面向企业的中国进口服务 | Buy & Bring Solutions",
    homeDescription:
      "提供供应商筛选与核验、质检、Private Label、运输、清关及从中国到欧洲的交付支持。",
  },
};
