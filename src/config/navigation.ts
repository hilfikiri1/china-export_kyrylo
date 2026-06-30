import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/config";

export type NavItem = {
  href: string;
  label: string;
  description?: string;
  serviceId?: string;
};

export type NavGroup = { label: string; items: NavItem[] };

const labels = {
  pl: {
    main: "Główne",
    company: "Firma",
    services: "Usługi",
    tools: "Narzędzia",
    home: "Strona główna",
    servicesPage: "Usługi",
    process: "Jak pracujemy",
    cases: "Realizacje",
    about: "O nas",
    china: "Działamy w Chinach",
    calculator: "Kalkulator",
    consultation: "Umów konsultację",
    contact: "Kontakt",
    sourcing: "Wyszukiwanie producentów",
    audits: "Weryfikacja i audyty",
    quality: "Kontrola jakości",
    freight: "Transport i odprawa",
    cta: "Opisz projekt",
  },
  uk: {
    main: "Головне",
    company: "Компанія",
    services: "Послуги",
    tools: "Інструменти",
    home: "Головна",
    servicesPage: "Послуги",
    process: "Як ми працюємо",
    cases: "Кейси",
    about: "Про нас",
    china: "Працюємо в Китаї",
    calculator: "Калькулятор",
    consultation: "Замовити консультацію",
    contact: "Контакти",
    sourcing: "Пошук виробників",
    audits: "Перевірка й аудити",
    quality: "Контроль якості",
    freight: "Доставка і митниця",
    cta: "Описати проєкт",
  },
  ru: {
    main: "Главное",
    company: "Компания",
    services: "Услуги",
    tools: "Инструменты",
    home: "Главная",
    servicesPage: "Услуги",
    process: "Как мы работаем",
    cases: "Кейсы",
    about: "О нас",
    china: "Работаем в Китае",
    calculator: "Калькулятор",
    consultation: "Запросить консультацию",
    contact: "Контакты",
    sourcing: "Поиск производителей",
    audits: "Проверка и аудиты",
    quality: "Контроль качества",
    freight: "Доставка и таможня",
    cta: "Описать проект",
  },
  de: {
    main: "Hauptnavigation",
    company: "Unternehmen",
    services: "Leistungen",
    tools: "Tools",
    home: "Startseite",
    servicesPage: "Leistungen",
    process: "So arbeiten wir",
    cases: "Projekte",
    about: "Über uns",
    china: "Vor Ort in China",
    calculator: "Kalkulator",
    consultation: "Beratung anfragen",
    contact: "Kontakt",
    sourcing: "Herstellersuche",
    audits: "Prüfung und Audits",
    quality: "Qualitätskontrolle",
    freight: "Transport und Zoll",
    cta: "Projekt beschreiben",
  },
  zh: {
    main: "主导航",
    company: "公司",
    services: "服务",
    tools: "工具",
    home: "首页",
    servicesPage: "服务",
    process: "工作流程",
    cases: "案例",
    about: "关于我们",
    china: "中国本地支持",
    calculator: "计算器",
    consultation: "预约咨询",
    contact: "联系",
    sourcing: "供应商开发",
    audits: "工厂核验与审核",
    quality: "质量检验",
    freight: "运输与清关",
    cta: "描述项目",
  },
} satisfies Record<Locale, Record<string, string>>;

function buildNav(locale: Locale): NavGroup[] {
  const t = labels[locale];
  const href = (path: string) => localizePath(path, locale);

  return [
    {
      label: t.main,
      items: [
        { href: href("/"), label: t.home },
        { href: href("/uslugi"), label: t.servicesPage },
        { href: href("/proces"), label: t.process },
        { href: href("/realizacje"), label: t.cases },
      ],
    },
    {
      label: t.company,
      items: [
        { href: href("/o-nas"), label: t.about },
        { href: href("/zespol-w-chinach"), label: t.china },
      ],
    },
    {
      label: t.services,
      items: [
        {
          href: href("/uslugi/wyszukiwanie-dostawcow"),
          label: t.sourcing,
          serviceId: "sourcing",
        },
        {
          href: href("/uslugi/audyty-fabryk"),
          label: t.audits,
          serviceId: "verification",
        },
        {
          href: href("/uslugi/kontrola-jakosci"),
          label: t.quality,
          serviceId: "qc",
        },
        {
          href: href("/uslugi/spedycja-i-logistyka"),
          label: t.freight,
          serviceId: "freight",
        },
      ],
    },
    {
      label: t.tools,
      items: [
        { href: href("/kalkulator"), label: t.calculator },
        { href: href("/konsultacja"), label: t.consultation },
        { href: href("/kontakt"), label: t.contact },
      ],
    },
  ];
}

export function getNavGroups(locale: Locale): NavGroup[] {
  return buildNav(locale);
}

export function getCtaLink(locale: Locale) {
  return { href: localizePath("/kontakt", locale), label: labels[locale].cta };
}

export function getNavLabel(locale: Locale, key: keyof (typeof labels)["pl"]): string {
  return labels[locale][key];
}

export const navGroups: NavGroup[] = getNavGroups("pl");
export const ctaLink = getCtaLink("pl");
