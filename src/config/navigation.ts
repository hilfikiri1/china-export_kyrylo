import type { Locale } from "@/i18n/config";
import { prefixPathWithLocale } from "@/i18n/routing";

export type NavItem = {
  href: string;
  label: string;
  description?: string;
  serviceId?: string;
};
export type NavGroup = { label: string; items: NavItem[] };

type NavigationLabels = {
  groups: { company: string; services: string; tools: string };
  pages: {
    home: string;
    services: string;
    process: string;
    cases: string;
    about: string;
    china: string;
    calculator: string;
    consultation: string;
    contact: string;
  };
  serviceItems: {
    sourcing: string;
    verification: string;
    qc: string;
    freight: string;
  };
  cta: string;
};

const labelsByLocale: Record<Locale, NavigationLabels> = {
  pl: {
    groups: { company: "Firma", services: "Usługi", tools: "Narzędzia" },
    pages: {
      home: "Strona główna",
      services: "Usługi",
      process: "Jak pracujemy",
      cases: "Realizacje",
      about: "O nas",
      china: "Działamy w Chinach",
      calculator: "Kalkulator",
      consultation: "Umów konsultację",
      contact: "Kontakt",
    },
    serviceItems: {
      sourcing: "Wyszukiwanie producentów",
      verification: "Weryfikacja i audyty",
      qc: "Kontrola jakości",
      freight: "Transport i odprawa",
    },
    cta: "Opisz projekt",
  },
  uk: {
    groups: { company: "Компанія", services: "Послуги", tools: "Інструменти" },
    pages: {
      home: "Головна",
      services: "Послуги",
      process: "Як ми працюємо",
      cases: "Кейси",
      about: "Про нас",
      china: "Робота в Китаї",
      calculator: "Калькулятор",
      consultation: "Консультація",
      contact: "Контакт",
    },
    serviceItems: {
      sourcing: "Пошук виробників",
      verification: "Перевірка та аудити",
      qc: "Контроль якості",
      freight: "Логістика і митниця",
    },
    cta: "Описати проєкт",
  },
  ru: {
    groups: { company: "Компания", services: "Услуги", tools: "Инструменты" },
    pages: {
      home: "Главная",
      services: "Услуги",
      process: "Как мы работаем",
      cases: "Кейсы",
      about: "О нас",
      china: "Работа в Китае",
      calculator: "Калькулятор",
      consultation: "Консультация",
      contact: "Контакт",
    },
    serviceItems: {
      sourcing: "Поиск производителей",
      verification: "Проверка и аудиты",
      qc: "Контроль качества",
      freight: "Логистика и таможня",
    },
    cta: "Описать проект",
  },
  de: {
    groups: { company: "Unternehmen", services: "Leistungen", tools: "Tools" },
    pages: {
      home: "Startseite",
      services: "Leistungen",
      process: "So arbeiten wir",
      cases: "Referenzen",
      about: "Über uns",
      china: "Team in China",
      calculator: "Kalkulator",
      consultation: "Beratung",
      contact: "Kontakt",
    },
    serviceItems: {
      sourcing: "Lieferantensuche",
      verification: "Prüfung und Audits",
      qc: "Qualitätskontrolle",
      freight: "Transport und Zoll",
    },
    cta: "Projekt beschreiben",
  },
  zh: {
    groups: { company: "公司", services: "服务", tools: "工具" },
    pages: {
      home: "首页",
      services: "服务",
      process: "合作流程",
      cases: "案例",
      about: "关于我们",
      china: "中国本地支持",
      calculator: "计算器",
      consultation: "咨询",
      contact: "联系",
    },
    serviceItems: {
      sourcing: "供应商筛选",
      verification: "核验与审厂",
      qc: "质量控制",
      freight: "运输与清关",
    },
    cta: "描述项目",
  },
};

export function getNavGroups(locale: Locale): NavGroup[] {
  const labels = labelsByLocale[locale];
  return [
    {
      label: labels.groups.company,
      items: [
        { href: prefixPathWithLocale("/proces", locale), label: labels.pages.process },
        { href: prefixPathWithLocale("/o-nas", locale), label: labels.pages.about },
        { href: prefixPathWithLocale("/realizacje", locale), label: labels.pages.cases },
        { href: prefixPathWithLocale("/dzialamy-w-chinach", locale), label: labels.pages.china },
      ],
    },
    {
      label: labels.groups.services,
      items: [
        { href: prefixPathWithLocale("/uslugi", locale), label: labels.pages.services },
        {
          href: prefixPathWithLocale("/uslugi/wyszukiwanie-dostawcow", locale),
          label: labels.serviceItems.sourcing,
          serviceId: "sourcing",
        },
        {
          href: prefixPathWithLocale("/uslugi/audyty-fabryk", locale),
          label: labels.serviceItems.verification,
          serviceId: "verification",
        },
        {
          href: prefixPathWithLocale("/uslugi/kontrola-jakosci", locale),
          label: labels.serviceItems.qc,
          serviceId: "qc",
        },
        {
          href: prefixPathWithLocale("/uslugi/spedycja-i-logistyka", locale),
          label: labels.serviceItems.freight,
          serviceId: "freight",
        },
      ],
    },
    {
      label: labels.groups.tools,
      items: [
        { href: prefixPathWithLocale("/kalkulator", locale), label: labels.pages.calculator },
        { href: prefixPathWithLocale("/konsultacja", locale), label: labels.pages.consultation },
        { href: prefixPathWithLocale("/kontakt", locale), label: labels.pages.contact },
      ],
    },
  ];
}

export function getPrimaryCta(locale: Locale) {
  return { href: prefixPathWithLocale("/kontakt", locale), label: labelsByLocale[locale].cta };
}

export const navGroups: NavGroup[] = getNavGroups("pl");
export const ctaLink = getPrimaryCta("pl");
