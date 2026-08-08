import type { Locale } from "@/i18n/config";
import { routes } from "@/i18n/routing";
import { company } from "./company";

export type PageSeoKey =
  | "home"
  | "services"
  | "process"
  | "cases"
  | "about"
  | "china"
  | "calculator"
  | "consultation"
  | "contact"
  | "privacy"
  | "cookies"
  | "terms"
  | "calculatorDisclaimer";

type SeoEntry = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const pageSeo: Record<PageSeoKey, SeoEntry> = {
  home: {
    title: {
      pl: "Import z Chin dla firm | Buy & Bring Solutions",
      en: "Import from China for Businesses | Buy & Bring Solutions",
      uk: "Імпорт з Китаю для бізнесу | Buy & Bring Solutions",
      ru: "Импорт из Китая для компаний | Buy & Bring Solutions",
      de: "Import aus China für Unternehmen | Buy & Bring Solutions",
      zh: "企业中国进口服务 | Buy & Bring Solutions",
    },
    description: {
      pl: "Wyszukiwanie i weryfikacja producentów, kontrola jakości, produkcja pod marką własną, transport, odprawa celna i dostawa z Chin do Polski i Europy.",
      en: "Supplier sourcing and verification, quality control, Private Label production, freight, customs clearance and delivery from China to Europe.",
      uk: "Пошук і верифікація виробників, контроль якості, виробництво під власною маркою, транспорт, митне оформлення та доставка з Китаю до Польщі та Європи.",
      ru: "Поиск и верификация производителей, контроль качества, производство под собственной маркой, транспорт, таможня и доставка из Китая в Польшу и Европу.",
      de: "Herstellersuche und -prüfung, Qualitätskontrolle, Private Label, Transport, Zollabfertigung und Lieferung aus China nach Polen und Europa.",
      zh: "生产商搜寻与验证、质量检验、自有品牌生产、运输、清关及从中国至波兰与欧洲的交付。",
    },
  },
  services: {
    title: {
      pl: "Usługi importu z Chin | Buy & Bring Solutions",
      en: "China Import Services | Buy & Bring Solutions",
      uk: "Послуги імпорту з Китаю | Buy & Bring Solutions",
      ru: "Услуги импорта из Китая | Buy & Bring Solutions",
      de: "Importdienstleistungen aus China | Buy & Bring Solutions",
      zh: "中国进口服务 | Buy & Bring Solutions",
    },
    description: {
      pl: "Modułowe usługi: wyszukiwanie producentów, audyty, kontrola jakości, Private Label, konsolidacja, transport i odprawa celna.",
      en: "Modular services: supplier sourcing, audits, quality control, Private Label, consolidation, freight and customs clearance.",
      uk: "Модульні послуги: пошук виробників, аудити, контроль якості, Private Label, консолідація, транспорт і митне оформлення.",
      ru: "Модульные услуги: поиск производителей, аудиты, контроль качества, Private Label, консолидация, транспорт и таможня.",
      de: "Modulare Leistungen: Herstellersuche, Audits, Qualitätskontrolle, Private Label, Konsolidierung, Transport und Zoll.",
      zh: "模块化服务：生产商搜寻、审计、质量检验、自有品牌、拼箱、运输与清关。",
    },
  },
  process: {
    title: {
      pl: "Jak pracujemy — proces importu | Buy & Bring Solutions",
      en: "How We Work — Import Process | Buy & Bring Solutions",
      uk: "Як ми працюємо — процес імпорту | Buy & Bring Solutions",
      ru: "Как мы работаем — процесс импорта | Buy & Bring Solutions",
      de: "So arbeiten wir — Importprozess | Buy & Bring Solutions",
      zh: "工作流程 — 进口流程 | Buy & Bring Solutions",
    },
    description: {
      pl: "Sześć etapów importu z Chin: od briefu i wyszukiwania producentów po kontrolę jakości, transport i dostawę.",
      en: "Six stages of importing from China: from the brief and supplier sourcing to quality control, freight and delivery.",
      uk: "Шість етапів імпорту з Китаю: від брифу та пошуку виробників до контролю якості, транспорту та доставки.",
      ru: "Шесть этапов импорта из Китая: от брифа и поиска производителей до контроля качества, транспорта и доставки.",
      de: "Sechs Schritte beim Import aus China: vom Briefing und der Herstellersuche bis zu Qualitätskontrolle, Transport und Lieferung.",
      zh: "中国进口六个阶段：从需求简报与生产商搜寻到质量检验、运输与交付。",
    },
  },
  cases: {
    title: {
      pl: "Realizacje | Buy & Bring Solutions",
      en: "Case Studies | Buy & Bring Solutions",
      uk: "Реалізації | Buy & Bring Solutions",
      ru: "Реализованные проекты | Buy & Bring Solutions",
      de: "Referenzen | Buy & Bring Solutions",
      zh: "项目案例 | Buy & Bring Solutions",
    },
    description: {
      pl: "Case studies: Private Label, akumulatory, konsolidacja, maszyny przemysłowe i sourcing na targach w Chinach.",
      en: "Case studies covering Private Label, batteries, consolidation, industrial machinery and sourcing at trade fairs in China.",
      uk: "Кейси: Private Label, акумулятори, консолідація, промислові машини та сорсинг на виставках у Китаї.",
      ru: "Кейсы: Private Label, аккумуляторы, консолидация, промышленные машины и сорсинг на выставках в Китае.",
      de: "Fallstudien: Private Label, Batterien, Konsolidierung, Industriemaschinen und Sourcing auf Messen in China.",
      zh: "案例：自有品牌、电池、拼箱、工业机械及中国展会采购。",
    },
  },
  about: {
    title: {
      pl: "O nas | Buy & Bring Solutions",
      en: "About Us | Buy & Bring Solutions",
      uk: "Про нас | Buy & Bring Solutions",
      ru: "О нас | Buy & Bring Solutions",
      de: "Über uns | Buy & Bring Solutions",
      zh: "关于我们 | Buy & Bring Solutions",
    },
    description: {
      pl: "17 lat doświadczenia we współpracy z Chinami. Łączymy europejskie firmy z producentami w Chinach.",
      en: "17 years of experience working with China. We connect European businesses with manufacturers in China.",
      uk: "17 років досвіду співпраці з Китаєм. Поєднуємо європейські компанії з виробниками в Китаї.",
      ru: "17 лет опыта работы с Китаем. Соединяем европейские компании с производителями в Китае.",
      de: "17 Jahre Erfahrung in der Zusammenarbeit mit China. Wir verbinden europäische Unternehmen mit Herstellern in China.",
      zh: "17年中国合作经验。连接欧洲企业与中国生产商。",
    },
  },
  china: {
    title: {
      pl: "Działamy na miejscu w Chinach | Buy & Bring Solutions",
      en: "On-the-Ground Operations in China | Buy & Bring Solutions",
      uk: "Працюємо на місці в Китаї | Buy & Bring Solutions",
      ru: "Работаем на месте в Китае | Buy & Bring Solutions",
      de: "Vor Ort in China | Buy & Bring Solutions",
      zh: "中国本地运营 | Buy & Bring Solutions",
    },
    description: {
      pl: "Operacje w Foshan: kontakt z producentami, inspekcje, konsolidacja i dokumentacja eksportowa.",
      en: "Operations in Foshan: supplier communication, inspections, consolidation and export documentation.",
      uk: "Операції у Фошані: контакт з виробниками, інспекції, консолідація та експортна документація.",
      ru: "Операции в Фошане: контакт с производителями, инспекции, консолидация и экспортная документация.",
      de: "Operative Präsenz in Foshan: Herstellerkontakt, Inspektionen, Konsolidierung und Exportdokumentation.",
      zh: "佛山运营：联系生产商、检验、拼箱及出口单证。",
    },
  },
  calculator: {
    title: {
      pl: "Kalkulator kosztu importu z Chin | Buy & Bring Solutions",
      en: "China Import Cost Calculator | Buy & Bring Solutions",
      uk: "Калькулятор вартості імпорту з Китаю | Buy & Bring Solutions",
      ru: "Калькулятор стоимости импорта из Китая | Buy & Bring Solutions",
      de: "Importkostenrechner China | Buy & Bring Solutions",
      zh: "中国进口成本计算器 | Buy & Bring Solutions",
    },
    description: {
      pl: "Oblicz orientacyjny koszt zakupu, transportu, cła i VAT. Wynik informacyjny — nie stanowi oferty handlowej.",
      en: "Estimate purchase, freight, customs duty and VAT costs. The result is for information only and is not a commercial offer.",
      uk: "Розрахуйте орієнтовну вартість закупівлі, транспорту, мита та ПДВ. Результат інформаційний.",
      ru: "Рассчитайте ориентировочную стоимость закупки, транспорта, пошлины и НДС. Результат носит информационный характер.",
      de: "Berechnen Sie den orientierenden Kauf-, Transport-, Zoll- und MwSt.-Aufwand. Ergebnis ohne Angebotscharakter.",
      zh: "估算采购、运输、关税与增值税成本。结果仅供参考，不构成报价。",
    },
  },
  consultation: {
    title: {
      pl: "Umów konsultację | Buy & Bring Solutions",
      en: "Book a Consultation | Buy & Bring Solutions",
      uk: "Записатися на консультацію | Buy & Bring Solutions",
      ru: "Записаться на консультацию | Buy & Bring Solutions",
      de: "Beratung vereinbaren | Buy & Bring Solutions",
      zh: "预约咨询 | Buy & Bring Solutions",
    },
    description: {
      pl: "Opisz projekt i wskaż dogodny termin kontaktu. Skontaktujemy się, aby potwierdzić rozmowę.",
      en: "Describe your project and suggest a convenient time to talk. We will contact you to confirm the consultation.",
      uk: "Опишіть проєкт і вкажіть зручний час для контакту. Ми зв'яжемося з вами для підтвердження розмови.",
      ru: "Опишите проект и укажите удобное время для связи. Мы свяжемся с вами для подтверждения разговора.",
      de: "Beschreiben Sie Ihr Projekt und nennen Sie einen passenden Kontakttermin. Wir melden uns zur Bestätigung.",
      zh: "简述项目并注明方便联系的时间。我们将与您确认沟通安排。",
    },
  },
  contact: {
    title: {
      pl: "Kontakt | Buy & Bring Solutions",
      en: "Contact | Buy & Bring Solutions",
      uk: "Контакт | Buy & Bring Solutions",
      ru: "Контакт | Buy & Bring Solutions",
      de: "Kontakt | Buy & Bring Solutions",
      zh: "联系我们 | Buy & Bring Solutions",
    },
    description: {
      pl: "Opowiedz o swoim projekcie importu z Chin. Kontakt: buybringsolutionspol@gmail.com",
      en: "Tell us about your China import project. Contact: buybringsolutionspol@gmail.com",
      uk: "Розкажіть про свій проєкт імпорту з Китаю. Контакт: buybringsolutionspol@gmail.com",
      ru: "Расскажите о своём проекте импорта из Китая. Контакт: buybringsolutionspol@gmail.com",
      de: "Erzählen Sie uns von Ihrem Importprojekt aus China. Kontakt: buybringsolutionspol@gmail.com",
      zh: "介绍您的中国进口项目。联系：buybringsolutionspol@gmail.com",
    },
  },
  privacy: {
    title: {
      pl: "Polityka prywatności | Buy & Bring Solutions",
      en: "Privacy Policy | Buy & Bring Solutions",
      uk: "Політика конфіденційності | Buy & Bring Solutions",
      ru: "Политика конфиденциальности | Buy & Bring Solutions",
      de: "Datenschutzerklärung | Buy & Bring Solutions",
      zh: "隐私政策 | Buy & Bring Solutions",
    },
    description: {
      pl: "Polityka prywatności serwisu Buy & Bring Solutions.",
      en: "Privacy policy for the Buy & Bring Solutions website.",
      uk: "Політика конфіденційності сайту Buy & Bring Solutions.",
      ru: "Политика конфиденциальности сайта Buy & Bring Solutions.",
      de: "Datenschutzerklärung der Website Buy & Bring Solutions.",
      zh: "Buy & Bring Solutions 网站隐私政策。",
    },
  },
  cookies: {
    title: {
      pl: "Polityka cookies | Buy & Bring Solutions",
      en: "Cookie Policy | Buy & Bring Solutions",
      uk: "Політика cookies | Buy & Bring Solutions",
      ru: "Политика cookies | Buy & Bring Solutions",
      de: "Cookie-Richtlinie | Buy & Bring Solutions",
      zh: "Cookie 政策 | Buy & Bring Solutions",
    },
    description: {
      pl: "Informacje o plikach cookie na stronie Buy & Bring Solutions.",
      en: "Information about cookies used on the Buy & Bring Solutions website.",
      uk: "Інформація про файли cookie на сайті Buy & Bring Solutions.",
      ru: "Информация о файлах cookie на сайте Buy & Bring Solutions.",
      de: "Informationen zu Cookies auf der Website Buy & Bring Solutions.",
      zh: "Buy & Bring Solutions 网站 Cookie 说明。",
    },
  },
  terms: {
    title: {
      pl: "Regulamin | Buy & Bring Solutions",
      en: "Terms of Use | Buy & Bring Solutions",
      uk: "Правила | Buy & Bring Solutions",
      ru: "Правила | Buy & Bring Solutions",
      de: "Nutzungsbedingungen | Buy & Bring Solutions",
      zh: "网站条款 | Buy & Bring Solutions",
    },
    description: {
      pl: "Regulamin korzystania ze strony Buy & Bring Solutions.",
      en: "Terms of use for the Buy & Bring Solutions website.",
      uk: "Правила користування сайтом Buy & Bring Solutions.",
      ru: "Правила использования сайта Buy & Bring Solutions.",
      de: "Nutzungsbedingungen der Website Buy & Bring Solutions.",
      zh: "Buy & Bring Solutions 网站使用条款。",
    },
  },
  calculatorDisclaimer: {
    title: {
      pl: "Zastrzeżenie kalkulatora | Buy & Bring Solutions",
      en: "Calculator Disclaimer | Buy & Bring Solutions",
      uk: "Застереження калькулятора | Buy & Bring Solutions",
      ru: "Оговорка к калькулятору | Buy & Bring Solutions",
      de: "Rechner-Hinweis | Buy & Bring Solutions",
      zh: "计算器免责声明 | Buy & Bring Solutions",
    },
    description: {
      pl: "Zastrzeżenia prawne dotyczące kalkulatora kosztu importu.",
      en: "Legal disclaimer for the import cost calculator.",
      uk: "Правові застереження щодо калькулятора вартості імпорту.",
      ru: "Правовые оговорки к калькулятору стоимости импорта.",
      de: "Rechtliche Hinweise zum Importkostenrechner.",
      zh: "进口成本计算器法律免责声明。",
    },
  },
};

export function getPageSeo(page: PageSeoKey, locale: Locale) {
  return {
    title: pageSeo[page].title[locale],
    description: pageSeo[page].description[locale],
  };
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://global.buybringsolutions.com";

export function getCanonicalUrl(locale: Locale, path = ""): string {
  const normalized = path.replace(/^\//, "");
  return normalized
    ? `${siteUrl}/${locale}/${normalized}`
    : `${siteUrl}/${locale}`;
}

export function getAlternateLanguages(path = ""): Record<string, string> {
  const normalized = path.replace(/^\//, "");
  const locales: Locale[] = ["pl", "en", "uk", "ru", "de", "zh"];
  const alternates: Record<string, string> = {};

  for (const locale of locales) {
    alternates[locale] = normalized
      ? `${siteUrl}/${locale}/${normalized}`
      : `${siteUrl}/${locale}`;
  }

  alternates["x-default"] = normalized
    ? `${siteUrl}/pl/${normalized}`
    : `${siteUrl}/pl`;

  return alternates;
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteUrl,
  email: "buybringsolutionspol@gmail.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+48-783-232-971",
      contactType: "customer service",
      areaServed: "PL",
      availableLanguage: ["Polish", "English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+380-66-496-38-81",
      contactType: "customer service",
      areaServed: "UA",
      availableLanguage: ["Ukrainian", "Russian"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+86-139-2994-3320",
      contactType: "customer service",
      areaServed: "CN",
      availableLanguage: ["Chinese", "English"],
    },
  ],
};

export { routes };
