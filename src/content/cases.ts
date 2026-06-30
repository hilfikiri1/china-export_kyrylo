import type { Locale } from "@/i18n/config";

export type CaseStudyImage = {
  src: string;
  alt: Record<Locale, string>;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  category: Record<Locale, string>;
  challenge?: Record<Locale, string>;
  requirements?: Record<Locale, string[]>;
  scope: Record<Locale, string[]>;
  result: Record<Locale, string>;
  coverImage: string;
  gallery: CaseStudyImage[];
  country?: Record<Locale, string>;
  date?: string;
  status?: Record<Locale, string>;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-cookware",
    slug: "produkcja-garnkow-pod-marka-klienta",
    title: {
      pl: "Produkcja garnków i patelni pod marką klienta",
      uk: "Виробництво каструль і сковорідок під маркою клієнта",
      ru: "Производство кастрюль и сковородок под маркой клиента",
      de: "Produktion von Töpfen und Pfannen unter Kundenmarke",
      zh: "客户品牌锅具生产",
    },
    summary: {
      pl: "Wybór producentów, produkcja naczyń z logo klienta, markowe opakowania, kontrola jakości i organizacja dostawy.",
      uk: "Вибір виробників, виробництво посуду з логотипом клієнта, фірмове пакування, контроль якості та організація доставки.",
      ru: "Выбор производителей, производство посуды с логотипом клиента, фирменная упаковка, контроль качества и организация доставки.",
      de: "Herstellerauswahl, Produktion mit Kundenlogo, Markenverpackung, Qualitätskontrolle und Lieferorganisation.",
      zh: "筛选生产商、带客户标识的器皿生产、品牌包装、质量检验与交付安排。",
    },
    category: {
      pl: "Private Label",
      uk: "Private Label",
      ru: "Private Label",
      de: "Private Label",
      zh: "自有品牌",
    },
    scope: {
      pl: [
        "wybór producentów",
        "produkcja naczyń z logo klienta",
        "opracowanie markowych opakowań",
        "kontrola jakości w fabryce",
        "organizacja dostawy",
      ],
      uk: [
        "вибір виробників",
        "виробництво посуду з логотипом клієнта",
        "розробка фірмового пакування",
        "контроль якості на фабриці",
        "організація доставки",
      ],
      ru: [
        "выбор производителей",
        "производство посуды с логотипом клиента",
        "разработка фирменной упаковки",
        "контроль качества на фабрике",
        "организация доставки",
      ],
      de: [
        "Herstellerauswahl",
        "Produktion mit Kundenlogo",
        "Entwicklung von Markenverpackungen",
        "Qualitätskontrolle in der Fabrik",
        "Lieferorganisation",
      ],
      zh: [
        "筛选生产商",
        "带客户标识的器皿生产",
        "品牌包装开发",
        "工厂质量检验",
        "交付安排",
      ],
    },
    result: {
      pl: "Klient otrzymał gotową serię produktów przeznaczoną do sprzedaży pod własną marką.",
      uk: "Клієнт отримав готову серію продуктів для продажу під власною маркою.",
      ru: "Клиент получил готовую серию продуктов для продажи под собственной маркой.",
      de: "Der Kunde erhielt eine fertige Produktserie zur Vermarktung unter eigener Marke.",
      zh: "客户获得可直接以自有品牌销售的产品批次。",
    },
    coverImage: "/cases/cookware.jpg",
    gallery: [
      {
        src: "/cases/cookware.jpg",
        alt: {
          pl: "Naczynia kuchenne z logo klienta",
          uk: "Кухонний посуд з логотипом клієнта",
          ru: "Кухонная посуда с логотипом клиента",
          de: "Küchengeschirr mit Kundenlogo",
          zh: "带客户标识的厨房器皿",
        },
      },
    ],
  },
  {
    id: "cs-battery",
    slug: "akumulatory-do-motocykli-elektrycznych",
    title: {
      pl: "Akumulatory do motocykli elektrycznych według specyfikacji klienta",
      uk: "Акумулятори для електромотоциклів за специфікацією клієнта",
      ru: "Аккумуляторы для электромотоциклов по спецификации клиента",
      de: "Akkupacks für Elektromotorräder nach Kundenspezifikation",
      zh: "按客户规格定制的电动摩托车电池",
    },
    summary: {
      pl: "Wybór producenta, uzgodnienie parametrów technicznych, konfiguracja ogniw, system BMS, kontrola przed wysyłką i organizacja dostawy.",
      uk: "Вибір виробника, узгодження технічних параметрів, конфігурація елементів, система BMS, контроль перед відправленням та організація доставки.",
      ru: "Выбор производителя, согласование технических параметров, конфигурация элементов, система BMS, контроль перед отгрузкой и организация доставки.",
      de: "Herstellerauswahl, Abstimmung technischer Parameter, Zellkonfiguration, BMS-System, Kontrolle vor Versand und Lieferorganisation.",
      zh: "选择生产商、确认技术参数、电芯配置、BMS系统、发货前检验与交付安排。",
    },
    category: {
      pl: "Technologie akumulatorowe",
      uk: "Акумуляторні технології",
      ru: "Аккумуляторные технологии",
      de: "Batterietechnologien",
      zh: "电池技术",
    },
    scope: {
      pl: [
        "wybór producenta",
        "uzgodnienie parametrów technicznych",
        "dopasowanie wymiarów",
        "konfiguracja ogniw",
        "system BMS",
        "kontrola przed wysyłką",
        "organizacja dostawy",
      ],
      uk: [
        "вибір виробника",
        "узгодження технічних параметрів",
        "підбір розмірів",
        "конфігурація елементів",
        "система BMS",
        "контроль перед відправленням",
        "організація доставки",
      ],
      ru: [
        "выбор производителя",
        "согласование технических параметров",
        "подбор размеров",
        "конфигурация элементов",
        "система BMS",
        "контроль перед отгрузкой",
        "организация доставки",
      ],
      de: [
        "Herstellerauswahl",
        "Abstimmung technischer Parameter",
        "Maßanpassung",
        "Zellkonfiguration",
        "BMS-System",
        "Kontrolle vor Versand",
        "Lieferorganisation",
      ],
      zh: [
        "选择生产商",
        "确认技术参数",
        "尺寸适配",
        "电芯配置",
        "BMS系统",
        "发货前检验",
        "交付安排",
      ],
    },
    result: {
      pl: "Wyprodukowano pakiety akumulatorowe dopasowane do parametrów technicznych pojazdu klienta.",
      uk: "Виготовлено акумуляторні пакети, адаптовані до технічних параметрів транспортного засобу клієнта.",
      ru: "Произведены аккумуляторные пакеты, адаптированные к техническим параметрам транспортного средства клиента.",
      de: "Es wurden Akkupacks produziert, die auf die technischen Parameter des Kundenfahrzeugs abgestimmt sind.",
      zh: "生产出符合客户车辆技术参数的电池包。",
    },
    coverImage: "/cases/battery.jpg",
    gallery: [
      {
        src: "/cases/battery.jpg",
        alt: {
          pl: "Pakiety akumulatorowe do motocykli elektrycznych",
          uk: "Акумуляторні пакети для електромотоциклів",
          ru: "Аккумуляторные пакеты для электромотоциклов",
          de: "Akkupacks für Elektromotorräder",
          zh: "电动摩托车电池包",
        },
      },
    ],
  },
  {
    id: "cs-consolidation",
    slug: "konsolidacja-towarow-od-9-producentow",
    title: {
      pl: "Konsolidacja towarów od 9 producentów",
      uk: "Консолідація товарів від 9 виробників",
      ru: "Консолидация товаров от 9 производителей",
      de: "Konsolidierung von Waren von 9 Herstellern",
      zh: "9家生产商货物拼箱",
    },
    summary: {
      pl: "Koordynacja dostaw od dziewięciu fabryk, odbiór na magazyn w Chinach, kontrola kompletności i wspólna wysyłka kontenerowa.",
      uk: "Координація поставок від дев'яти фабрик, прийом на склад у Китаї, перевірка комплектності та спільне контейнерне відправлення.",
      ru: "Координация поставок от девяти фабрик, приём на склад в Китае, проверка комплектности и совместная контейнерная отгрузка.",
      de: "Koordination von Lieferungen von neun Fabriken, Wareneingang in China, Vollständigkeitsprüfung und gemeinsamer Containerversand.",
      zh: "协调九家工厂供货、中国仓库收货、完整性检查及合并集装箱发运。",
    },
    category: {
      pl: "Logistyka i konsolidacja",
      uk: "Логістика та консолідація",
      ru: "Логистика и консолидация",
      de: "Logistik und Konsolidierung",
      zh: "物流与拼箱",
    },
    scope: {
      pl: [
        "koordynacja dostaw od dziewięciu fabryk",
        "odbiór na magazyn w Chinach",
        "kontrola kompletności",
        "przygotowanie wspólnej wysyłki",
        "załadunek kontenera",
        "dokumentacja eksportowa",
      ],
      uk: [
        "координація поставок від дев'яти фабрик",
        "прийом на склад у Китаї",
        "перевірка комплектності",
        "підготовка спільного відправлення",
        "завантаження контейнера",
        "експортна документація",
      ],
      ru: [
        "координация поставок от девяти фабрик",
        "приём на склад в Китае",
        "проверка комплектности",
        "подготовка совместной отгрузки",
        "загрузка контейнера",
        "экспортная документация",
      ],
      de: [
        "Koordination von Lieferungen von neun Fabriken",
        "Wareneingang in China",
        "Vollständigkeitsprüfung",
        "Vorbereitung gemeinsamer Sendung",
        "Containerverladung",
        "Exportdokumentation",
      ],
      zh: [
        "协调九家工厂供货",
        "中国仓库收货",
        "完整性检查",
        "合并发运准备",
        "集装箱装载",
        "出口单证",
      ],
    },
    result: {
      pl: "Towary od dziewięciu producentów zostały połączone w jedną wysyłkę kontenerową.",
      uk: "Товари від дев'яти виробників об'єднано в одне контейнерне відправлення.",
      ru: "Товары от девяти производителей объединены в одну контейнерную отгрузку.",
      de: "Waren von neun Herstellern wurden zu einer Containerlieferung zusammengeführt.",
      zh: "九家生产商的货物合并为一票集装箱发运。",
    },
    coverImage: "/image/consolidation.jpg",
    gallery: [
      {
        src: "/image/consolidation.jpg",
        alt: {
          pl: "Konsolidacja towarów w magazynie w Chinach",
          uk: "Консолідація товарів на складі в Китаї",
          ru: "Консолидация товаров на складе в Китае",
          de: "Warenkonsolidierung im Lager in China",
          zh: "中国仓库货物拼箱",
        },
      },
      {
        src: "/image/cargo_conteiners.jpg",
        alt: {
          pl: "Załadunek kontenera",
          uk: "Завантаження контейнера",
          ru: "Загрузка контейнера",
          de: "Containerverladung",
          zh: "集装箱装载",
        },
      },
    ],
  },
  {
    id: "cs-paper-machines",
    slug: "maszyny-do-produkcji-wyrobow-papierniczych",
    title: {
      pl: "Dobór i dostawa maszyn do produkcji wyrobów papierniczych",
      uk: "Підбір і доставка машин для виробництва паперових виробів",
      ru: "Подбор и поставка машин для производства бумажных изделий",
      de: "Auswahl und Lieferung von Maschinen für Papierprodukte",
      zh: "纸制品生产设备选型与交付",
    },
    summary: {
      pl: "Analiza potrzeb produkcyjnych, wyszukiwanie producentów, porównanie modeli, weryfikacja i organizacja dostawy sprzętu.",
      uk: "Аналіз виробничих потреб, пошук виробників, порівняння моделей, верифікація та організація доставки обладнання.",
      ru: "Анализ производственных потребностей, поиск производителей, сравнение моделей, верификация и организация поставки оборудования.",
      de: "Analyse des Produktionsbedarfs, Herstellersuche, Modellvergleich, Verifizierung und Lieferorganisation.",
      zh: "分析生产需求、寻找生产商、比较机型、验证并安排设备交付。",
    },
    category: {
      pl: "Maszyny przemysłowe",
      uk: "Промислові машини",
      ru: "Промышленные машины",
      de: "Industriemaschinen",
      zh: "工业机械",
    },
    scope: {
      pl: [
        "analiza potrzeb produkcyjnych",
        "wyszukiwanie producentów",
        "porównanie modeli",
        "negocjacje techniczne",
        "weryfikacja producenta",
        "przygotowanie ofert",
        "organizacja dostawy",
        "maszyna do produkcji kubków papierowych",
        "laminator",
        "gilotyna do papieru",
        "grawer laserowy",
      ],
      uk: [
        "аналіз виробничих потреб",
        "пошук виробників",
        "порівняння моделей",
        "технічні переговори",
        "верифікація виробника",
        "підготовка пропозицій",
        "організація доставки",
        "машина для виробництва паперових стаканчиків",
        "ламінатор",
        "гільйотина для паперу",
        "лазерний гравер",
      ],
      ru: [
        "анализ производственных потребностей",
        "поиск производителей",
        "сравнение моделей",
        "технические переговоры",
        "верификация производителя",
        "подготовка предложений",
        "организация поставки",
        "машина для производства бумажных стаканчиков",
        "ламинатор",
        "гильотина для бумаги",
        "лазерный гравёр",
      ],
      de: [
        "Analyse des Produktionsbedarfs",
        "Herstellersuche",
        "Modellvergleich",
        "technische Verhandlungen",
        "Herstellerverifizierung",
        "Angebotserstellung",
        "Lieferorganisation",
        "Maschine für Papierbecher",
        "Laminator",
        "Papierschneider",
        "Lasergravierer",
      ],
      zh: [
        "分析生产需求",
        "寻找生产商",
        "比较机型",
        "技术谈判",
        "生产商验证",
        "准备报价",
        "安排交付",
        "纸杯生产机",
        "覆膜机",
        "切纸机",
        "激光雕刻机",
      ],
    },
    result: {
      pl: "Sprzęt dobrany dla klienta został dostarczony zgodnie z uzgodnioną konfiguracją linii produkcyjnej.",
      uk: "Підібране для клієнта обладнання доставлено відповідно до узгодженої конфігурації виробничої лінії.",
      ru: "Подобранное для клиента оборудование доставлено в соответствии с согласованной конфигурацией производственной линии.",
      de: "Die für den Kunden ausgewählte Ausrüstung wurde gemäß der vereinbarten Linienkonfiguration geliefert.",
      zh: "为客户选型的设备已按约定的生产线配置完成交付。",
    },
    coverImage: "/cases/paper-machines.jpg",
    gallery: [
      {
        src: "/cases/paper-machines.jpg",
        alt: {
          pl: "Maszyny do produkcji wyrobów papierniczych",
          uk: "Машини для виробництва паперових виробів",
          ru: "Машины для производства бумажных изделий",
          de: "Maschinen für Papierprodukte",
          zh: "纸制品生产设备",
        },
      },
    ],
  },
  {
    id: "cs-trade-fair",
    slug: "poszukiwanie-producentow-na-targach",
    title: {
      pl: "Poszukiwanie producentów na specjalistycznych targach w Chinach",
      uk: "Пошук виробників на спеціалізованих виставках у Китаї",
      ru: "Поиск производителей на специализированных выставках в Китае",
      de: "Herstellersuche auf Fachmessen in China",
      zh: "中国专业展会生产商搜寻",
    },
    summary: {
      pl: "Udział w targach branżowych, rozmowy z wystawcami, analiza produktów i przygotowanie listy potencjalnych producentów.",
      uk: "Участь у галузевих виставках, переговори з учасниками, аналіз продуктів та підготовка списку потенційних виробників.",
      ru: "Участие в отраслевых выставках, переговоры с участниками, анализ продукции и подготовка списка потенциальных производителей.",
      de: "Teilnahme an Fachmessen, Gespräche mit Ausstellern, Produktanalyse und Erstellung einer Herstellerliste.",
      zh: "参加行业展会、与展商洽谈、分析产品并整理潜在生产商名单。",
    },
    category: {
      pl: "Sourcing w Chinach",
      uk: "Сорсинг у Китаї",
      ru: "Сорсинг в Китае",
      de: "Sourcing in China",
      zh: "中国采购",
    },
    scope: {
      pl: [
        "udział w targach branżowych",
        "rozmowy z wystawcami",
        "analiza produktów i możliwości fabryk",
        "zebranie kontaktów",
        "zdjęcia i materiały wideo",
        "przygotowanie listy potencjalnych producentów",
      ],
      uk: [
        "участь у галузевих виставках",
        "переговори з учасниками",
        "аналіз продуктів і можливостей фабрик",
        "збір контактів",
        "фото та відеоматеріали",
        "підготовка списку потенційних виробників",
      ],
      ru: [
        "участие в отраслевых выставках",
        "переговоры с участниками",
        "анализ продукции и возможностей фабрик",
        "сбор контактов",
        "фото- и видеоматериалы",
        "подготовка списка потенциальных производителей",
      ],
      de: [
        "Teilnahme an Fachmessen",
        "Gespräche mit Ausstellern",
        "Analyse von Produkten und Fabrikkapazitäten",
        "Kontaktsammlung",
        "Foto- und Videomaterial",
        "Erstellung einer Herstellerliste",
      ],
      zh: [
        "参加行业展会",
        "与展商洽谈",
        "分析产品及工厂能力",
        "收集联系方式",
        "照片与视频资料",
        "整理潜在生产商名单",
      ],
    },
    result: {
      pl: "Klient otrzymał listę potencjalnych producentów oraz materiały potrzebne do rozpoczęcia dalszych negocjacji.",
      uk: "Клієнт отримав список потенційних виробників та матеріали для початку подальших переговорів.",
      ru: "Клиент получил список потенциальных производителей и материалы для начала дальнейших переговоров.",
      de: "Der Kunde erhielt eine Liste potenzieller Hersteller und Materialien für weitere Verhandlungen.",
      zh: "客户获得潜在生产商名单及后续谈判所需资料。",
    },
    coverImage: "/image/business_trips.jpg",
    gallery: [
      {
        src: "/image/business_trips.jpg",
        alt: {
          pl: "Targi branżowe w Chinach",
          uk: "Галузеві виставки в Китаї",
          ru: "Отраслевые выставки в Китае",
          de: "Fachmessen in China",
          zh: "中国行业展会",
        },
      },
    ],
  },
];

export function getCaseStudies(locale: Locale) {
  return caseStudies.map((cs) => ({
    id: cs.id,
    slug: cs.slug,
    title: cs.title[locale],
    summary: cs.summary[locale],
    category: cs.category[locale],
    challenge: cs.challenge?.[locale],
    requirements: cs.requirements?.[locale],
    scope: cs.scope[locale],
    result: cs.result[locale],
    coverImage: cs.coverImage,
    gallery: cs.gallery.map((img) => ({
      src: img.src,
      alt: img.alt[locale],
    })),
    country: cs.country?.[locale],
    date: cs.date,
    status: cs.status?.[locale],
  }));
}

export function getCaseStudyBySlug(slug: string, locale: Locale) {
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return undefined;
  return getCaseStudies(locale).find((c) => c.slug === slug);
}

export function getCaseStudyById(id: string, locale: Locale) {
  const cs = caseStudies.find((c) => c.id === id);
  if (!cs) return undefined;
  return getCaseStudies(locale).find((c) => c.id === id);
}
