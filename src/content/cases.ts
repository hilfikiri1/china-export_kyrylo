import type { Locale } from "@/i18n/config";

type CaseBaseLocale = Exclude<Locale, "en">;

export type CaseStudyImage = {
  src: string;
  alt: Record<CaseBaseLocale, string>;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: Record<CaseBaseLocale, string>;
  summary: Record<CaseBaseLocale, string>;
  category: Record<CaseBaseLocale, string>;
  challenge?: Record<CaseBaseLocale, string>;
  requirements?: Record<CaseBaseLocale, string[]>;
  scope: Record<CaseBaseLocale, string[]>;
  products?: Record<CaseBaseLocale, string[]>;
  result: Record<CaseBaseLocale, string>;
  coverImage: string;
  gallery: CaseStudyImage[];
  country?: Record<CaseBaseLocale, string>;
  date?: string;
  status?: Record<CaseBaseLocale, string>;
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
    challenge: {
      pl: "Klient potrzebował zorganizować produkcję garnków i patelni pod własną marką. Europejska firma zajmująca się projektowaniem akcesoriów kuchennych pod własną marką.",
      uk: "Клієнту потрібно було організувати виробництво каструль і сковорідок під власною маркою — європейська компанія з дизайну кухонних аксесуарів.",
      ru: "Клиенту нужно было организовать производство кастрюль и сковородок под собственной маркой — европейская компания по дизайну кухонных аксессуаров.",
      de: "Der Kunde musste die Produktion von Töpfen und Pfannen unter eigener Marke organisieren — ein europäisches Unternehmen für Küchenzubehör-Design.",
      zh: "客户需要组织自有品牌锅具生产——一家欧洲厨房配件设计公司。",
    },
    requirements: {
      pl: [
        "nanoszenie logo na produkty",
        "markowe opakowania",
        "stabilna jakość produktów",
        "optymalna cena produkcji",
        "organizacja dostawy z Chin",
      ],
      uk: [
        "нанесення логотипу на продукцію",
        "фірмове пакування",
        "стабільна якість продукції",
        "оптимальна ціна виробництва",
        "організація доставки з Китаю",
      ],
      ru: [
        "нанесение логотипа на продукцию",
        "фирменная упаковка",
        "стабильное качество продукции",
        "оптимальная цена производства",
        "организация поставки из Китая",
      ],
      de: [
        "Logo-Aufbringung auf Produkten",
        "Markenverpackungen",
        "stabile Produktqualität",
        "optimaler Produktionspreis",
        "Lieferorganisation aus China",
      ],
      zh: [
        "产品标识印制",
        "品牌包装",
        "稳定的产品质量",
        "最优生产成本",
        "中国发货安排",
      ],
    },
    scope: {
      pl: [
        "wybraliśmy kilka sprawdzonych fabryk w Chinach",
        "zorganizowaliśmy produkcję garnków i patelni z logo klienta",
        "opracowaliśmy indywidualne opakowania — markowe pudełka",
        "przeprowadziliśmy kontrolę jakości w fabryce",
        "zorganizowaliśmy logistykę i dostawę towaru do klienta",
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
        "筛选多家可靠中国工厂",
        "组织带客户标识的锅具生产",
        "设计定制品牌包装盒",
        "在工厂进行质量检验",
        "安排物流并交付客户",
      ],
    },
    products: {
      pl: [
        "garnki ze stali nierdzewnej",
        "patelnie",
        "markowe opakowania",
      ],
      uk: [
        "каструлі з нержавіючої сталі",
        "сковорідки",
        "фірмове пакування",
      ],
      ru: [
        "кастрюли из нержавеющей стали",
        "сковородки",
        "фирменная упаковка",
      ],
      de: [
        "Töpfe aus Edelstahl",
        "Pfannen",
        "Markenverpackungen",
      ],
      zh: ["不锈钢锅", "平底锅", "品牌包装"],
    },
    result: {
      pl: "Wyprodukowana partia pod markę klienta ze stworzonym indywidualnym opakowaniem, zapewnioną stabilną jakością i dostawą do klienta. Gotowy produkt przeznaczony do sprzedaży pod własną marką.",
      uk: "Клієнт отримав готову серію продуктів для продажу під власною маркою.",
      ru: "Клиент получил готовую серию продуктов для продажи под собственной маркой.",
      de: "Der Kunde erhielt eine fertige Produktserie zur Vermarktung unter eigener Marke.",
      zh: "客户获得可直接以自有品牌销售的产品批次。",
    },
    coverImage: "/cases/cookware-real.png",
    gallery: [
      {
        src: "/cases/cookware-real.png",
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
    challenge: {
      pl: "Klient potrzebował wyprodukować akumulatory do motocykli elektrycznych o określonych parametrach technicznych. Firma zajmująca się dostawą motocykli elektrycznych.",
      uk: "Клієнту потрібно було виготовити акумулятори для електромотоциклів із заданими технічними параметрами — компанія з постачання електромотоциклів.",
      ru: "Клиенту нужно было произвести аккумуляторы для электромотоциклов с заданными техническими параметрами — компания по поставке электромотоциклов.",
      de: "Der Kunde benötigte Akkupacks für Elektromotorräder mit spezifischen technischen Parametern — ein Unternehmen im E-Motorrad-Vertrieb.",
      zh: "客户需要按指定技术参数生产电动摩托车电池——一家电动摩托车供应公司。",
    },
    requirements: {
      pl: [
        "bateria o indywidualnych parametrach",
        "dopasowanie do konkretnego rozmiaru schowka akumulatorowego",
        "stabilna jakość ogniw",
        "system ochrony BMS",
        "niezawodny montaż pakietu baterii",
        "organizacja produkcji i dostawy z Chin",
      ],
      uk: [
        "акумулятор з індивідуальними параметрами",
        "підбір під конкретний розмір відсіку акумулятора",
        "стабільна якість елементів",
        "система захисту BMS",
        "надійна збірка батарейного пакета",
        "організація виробництва та доставки з Китаю",
      ],
      ru: [
        "аккумулятор с индивидуальными параметрами",
        "подгонка под конкретный размер отсека аккумулятора",
        "стабильное качество элементов",
        "система защиты BMS",
        "надёжная сборка батарейного пакета",
        "организация производства и поставки из Китая",
      ],
      de: [
        "Batterie mit individuellen Parametern",
        "Anpassung an konkrete Akkufach-Abmessungen",
        "stabile Zellqualität",
        "BMS-Schutzsystem",
        "zuverlässige Paketmontage",
        "Produktions- und Lieferorganisation aus China",
      ],
      zh: [
        "定制参数电池",
        "适配电池仓具体尺寸",
        "稳定的电芯质量",
        "BMS保护系统",
        "可靠的电池包组装",
        "中国生产与交付安排",
      ],
    },
    scope: {
      pl: [
        "wybraliśmy producenta litowo-jonowych akumulatorów w Chinach",
        "uzgodniliśmy parametry techniczne baterii z fabryką",
        "zorganizowaliśmy produkcję baterii w wymaganej konfiguracji ogniw",
        "sprawdziliśmy system BMS i bezpieczeństwo baterii",
        "przeprowadziliśmy kontrolę jakości przed wysyłką",
        "zorganizowaliśmy dostawę do klienta",
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
        "选择中国锂离子电池生产商",
        "与工厂确认电池技术参数",
        "按所需电芯配置组织生产",
        "检验BMS系统与电池安全",
        "发货前进行质量检验",
        "安排交付客户",
      ],
    },
    products: {
      pl: [
        "akumulatory do motocykli elektrycznych",
        "pakiety baterii z systemem BMS",
        "indywidualna konfiguracja baterii",
      ],
      uk: [
        "акумулятори для електромотоциклів",
        "батарейні пакети з системою BMS",
        "індивідуальна конфігурація",
      ],
      ru: [
        "аккумуляторы для электромотоциклов",
        "батарейные пакеты с системой BMS",
        "индивидуальная конфигурация",
      ],
      de: [
        "Akkus für Elektromotorräder",
        "Akkupacks mit BMS-System",
        "individuelle Konfiguration",
      ],
      zh: ["电动摩托车电池", "带BMS的电池包", "定制电池配置"],
    },
    result: {
      pl: "Wyprodukowane baterie zgodnie z wymaganiami klienta, zapewniona niezawodność i bezpieczeństwo pakietu, zorganizowana produkcja i dostawa z Chin. Klient otrzymał gotowy komponent do motocykli elektrycznych.",
      uk: "Виготовлено акумуляторні пакети, адаптовані до технічних параметрів транспортного засобу клієнта.",
      ru: "Произведены аккумуляторные пакеты, адаптированные к техническим параметрам транспортного средства клиента.",
      de: "Es wurden Akkupacks produziert, die auf die technischen Parameter des Kundenfahrzeugs abgestimmt sind.",
      zh: "生产出符合客户车辆技术参数的电池包。",
    },
    coverImage: "/cases/battery-real.png",
    gallery: [
      {
        src: "/cases/battery-real.png",
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
    challenge: {
      pl: "Klient kupował produkty od kilku producentów i potrzebował zebrać cały asortyment w jednym miejscu, sprawdzić zgodność produktów, przygotować ładunek do wysyłki, załadować kontener i zorganizować transport międzynarodowy. Produkty pochodziły od 9 różnych fabryk.",
      uk: "Клієнт купував товари у кількох виробників і потребував зібрати весь асортимент в одному місці, перевірити відповідність, підготувати вантаж до відправлення, завантажити контейнер і організувати міжнародну доставку. Товари від 9 різних фабрик.",
      ru: "Клиент покупал товары у нескольких производителей и нуждался в сборе всего ассортимента в одном месте, проверке соответствия, подготовке груза, загрузке контейнера и международной доставке. Товары от 9 разных фабрик.",
      de: "Der Kunde kaufte bei mehreren Herstellern und musste das gesamte Sortiment an einem Ort sammeln, die Übereinstimmung prüfen, die Sendung vorbereiten, einen Container verladen und den internationalen Transport organisieren — Waren von 9 Fabriken.",
      zh: "客户从多家生产商采购，需要在一处集齐全部货品、核对一致性、准备发运、装箱并组织国际运输——货物来自9家工厂。",
    },
    requirements: {
      pl: [
        "zebrać cały asortyment w jednym miejscu",
        "sprawdzić zgodność produktów",
        "przygotować ładunek do wysyłki",
        "załadować kontener",
        "zorganizować transport międzynarodowy",
      ],
      uk: [
        "зібрати весь асортимент в одному місці",
        "перевірити відповідність товарів",
        "підготувати вантаж до відправлення",
        "завантажити контейнер",
        "організувати міжнародну доставку",
      ],
      ru: [
        "собрать весь ассортимент в одном месте",
        "проверить соответствие товаров",
        "подготовить груз к отгрузке",
        "загрузить контейнер",
        "организовать международную доставку",
      ],
      de: [
        "gesamtes Sortiment an einem Ort sammeln",
        "Produktübereinstimmung prüfen",
        "Sendung vorbereiten",
        "Container verladen",
        "internationalen Transport organisieren",
      ],
      zh: [
        "在一处集齐全部货品",
        "核对产品一致性",
        "准备发运",
        "集装箱装载",
        "组织国际运输",
      ],
    },
    scope: {
      pl: [
        "koordynowaliśmy dostawy od 9 producentów",
        "zorganizowaliśmy transport na magazyn konsolidacyjny w Chinach",
        "sprawdziliśmy zgodność produktów z zamówieniem",
        "skompletowaliśmy pełny asortyment zamówienia",
        "zorganizowaliśmy optymalne załadunek kontenera",
        "przygotowaliśmy dokumenty eksportowe",
        "wysłaliśmy kontener do klienta w Europie",
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
        "协调9家生产商供货",
        "安排运往中国拼箱仓库",
        "核对产品与订单一致性",
        "完成全部订单货品集齐",
        "优化集装箱装载",
        "准备出口单证",
        "发运集装箱至欧洲客户",
      ],
    },
    products: {
      pl: [
        "produkty różnych kategorii od 9 fabryk",
        "różne typy opakowań",
        "jeden kontener zamiast 9 przesyłek",
      ],
      uk: [
        "товари різних категорій від 9 фабрик",
        "різні типи пакування",
        "один контейнер замість 9 відправлень",
      ],
      ru: [
        "товары разных категорий от 9 фабрик",
        "разные типы упаковки",
        "один контейнер вместо 9 отправлений",
      ],
      de: [
        "Produkte verschiedener Kategorien von 9 Fabriken",
        "verschiedene Verpackungstypen",
        "ein Container statt 9 Sendungen",
      ],
      zh: ["来自9家工厂的不同品类产品", "多种包装类型", "一票集装箱替代9次发运"],
    },
    result: {
      pl: "Klient otrzymał jeden kontener zamiast 9 przesyłek, znacznie zmniejszone koszty logistyki, zapewniona prawidłowa kompletacja zamówienia i wysyłka jedną partią.",
      uk: "Товари від дев'яти виробників об'єднано в одне контейнерне відправлення.",
      ru: "Товары от девяти производителей объединены в одну контейнерную отгрузку.",
      de: "Waren von neun Herstellern wurden zu einer Containerlieferung zusammengeführt.",
      zh: "九家生产商的货物合并为一票集装箱发运。",
    },
    coverImage: "/cases/consolidation-real.png",
    gallery: [
      {
        src: "/cases/consolidation-real.png",
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
    challenge: {
      pl: "Firma planowała rozszerzyć produkcję i uruchomić linię do produkcji wyrobów papierowych. Klient potrzebował dobrać odpowiedni sprzęt produkcyjny, znaleźć wiarygodnego producenta w Chinach, porównać oferty i zorganizować dostawę sprzętu.",
      uk: "Компанія планувала розширити виробництво та запустити лінію паперових виробів. Потрібно було підібрати обладнання, знайти надійного виробника в Китаї, порівняти пропозиції та організувати доставку.",
      ru: "Компания планировала расширить производство и запустить линию бумажных изделий. Нужно было подобрать оборудование, найти надёжного производителя в Китае, сравнить предложения и организовать поставку.",
      de: "Das Unternehmen plante die Erweiterung der Produktion und den Start einer Papierproduktionslinie. Es brauchte passende Maschinen, einen verlässlichen Hersteller in China, Angebotsvergleich und Lieferorganisation.",
      zh: "公司计划扩大生产并启动纸制品生产线，需要选型设备、寻找可靠中国生产商、比较报价并组织交付。",
    },
    requirements: {
      pl: [
        "dobór odpowiedniego sprzętu produkcyjnego",
        "znalezienie wiarygodnego producenta w Chinach",
        "porównanie kilku ofert",
        "organizacja dostawy sprzętu",
      ],
      uk: [
        "підбір відповідного виробничого обладнання",
        "пошук надійного виробника в Китаї",
        "порівняння кількох пропозицій",
        "організація доставки обладнання",
      ],
      ru: [
        "подбор подходящего производственного оборудования",
        "поиск надёжного производителя в Китае",
        "сравнение нескольких предложений",
        "организация поставки оборудования",
      ],
      de: [
        "Auswahl passender Produktionsmaschinen",
        "zuverlässigen Hersteller in China finden",
        "mehrere Angebote vergleichen",
        "Lieferung der Ausrüstung organisieren",
      ],
      zh: [
        "选择合适的生产设备",
        "寻找可靠的中国生产商",
        "比较多家报价",
        "组织设备交付",
      ],
    },
    scope: {
      pl: [
        "przeanalizowaliśmy wymagania produkcji",
        "wybraliśmy kilku producentów sprzętu w Chinach",
        "porównaliśmy parametry techniczne modeli",
        "prowadziliśmy negocjacje z fabrykami",
        "zweryfikowaliśmy producentów sprzętu",
        "przygotowaliśmy oferty handlowe",
        "zorganizowaliśmy dostawę sprzętu do klienta",
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
        "筛选多家中国设备生产商",
        "比较机型技术参数",
        "与工厂谈判",
        "验证生产商",
        "准备商业报价",
        "组织设备交付客户",
      ],
    },
    products: {
      pl: [
        "maszyna do produkcji papierowych kubków",
        "maszyna do laminowania",
        "maszyna do cięcia papieru",
        "grawer laserowy do nanoszenia logo",
      ],
      uk: [
        "машина для виробництва паперових стаканчиків",
        "ламінатор",
        "гільйотина для паперу",
        "лазерний гравер для логотипу",
      ],
      ru: [
        "машина для производства бумажных стаканчиков",
        "ламинатор",
        "гильотина для бумаги",
        "лазерный гравёр для логотипа",
      ],
      de: [
        "Maschine für Papierbecher",
        "Laminator",
        "Papierschneider",
        "Lasergravierer für Logo",
      ],
      zh: ["纸杯生产机", "覆膜机", "切纸机", "标识激光雕刻机"],
    },
    result: {
      pl: "Znaleziono producenta w Chinach, dobrano optymalną konfigurację linii, zapewniono wsparcie techniczne producenta i dostarczono sprzęt do klienta.",
      uk: "Підібране для клієнта обладнання доставлено відповідно до узгодженої конфігурації виробничої лінії.",
      ru: "Подобранное для клиента оборудование доставлено в соответствии с согласованной конфигурацией производственной линии.",
      de: "Die für den Kunden ausgewählte Ausrüstung wurde gemäß der vereinbarten Linienkonfiguration geliefert.",
      zh: "为客户选型的设备已按约定的生产线配置完成交付。",
    },
    coverImage: "/cases/paper-machines-real.png",
    gallery: [
      {
        src: "/cases/paper-machines-real.png",
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
    challenge: {
      pl: "Europejska firma szukała nowych producentów w Chinach. Klient potrzebował znaleźć nowych producentów, poznać oferty rynku, porównać dostawców i nawiązać kontakty z fabrykami — postanowiono przeprowadzić poszukiwania na specjalistycznej wystawie w Chinach.",
      uk: "Європейська компанія шукала нових виробників у Китаї — знайти постачальників, вивчити ринкові пропозиції, порівняти їх і встановити контакти з фабриками на спеціалізованій виставці.",
      ru: "Европейская компания искала новых производителей в Китае — найти поставщиков, изучить рыночные предложения, сравнить их и установить контакты с фабриками на специализированной выставке.",
      de: "Ein europäisches Unternehmen suchte neue Hersteller in China — Lieferanten finden, Marktangebote kennenlernen, vergleichen und Kontakte zu Fabriken auf einer Fachmesse knüpfen.",
      zh: "欧洲公司在中国寻找新生产商——在专业展会上寻找供应商、了解市场报价、比较并建立工厂联系。",
    },
    requirements: {
      pl: [
        "znaleźć nowych producentów",
        "poznać oferty rynku",
        "porównać kilku dostawców",
        "nawiązać kontakty z fabrykami",
      ],
      uk: [
        "знайти нових виробників",
        "вивчити ринкові пропозиції",
        "порівняти кількох постачальників",
        "встановити контакти з фабриками",
      ],
      ru: [
        "найти новых производителей",
        "изучить рыночные предложения",
        "сравнить нескольких поставщиков",
        "установить контакты с фабриками",
      ],
      de: [
        "neue Hersteller finden",
        "Marktangebote kennenlernen",
        "mehrere Lieferanten vergleichen",
        "Kontakte zu Fabriken knüpfen",
      ],
      zh: [
        "寻找新生产商",
        "了解市场报价",
        "比较多家供应商",
        "建立工厂联系",
      ],
    },
    scope: {
      pl: [
        "odwiedziliśmy branżową wystawę producentów",
        "prowadziliśmy negocjacje z potencjalnymi dostawcami",
        "analizowaliśmy produkty i możliwości fabryk",
        "zebraliśmy kontakty producentów",
        "przygotowaliśmy listę potencjalnych partnerów dla klienta",
        "przekazaliśmy klientowi zdjęcia, wideo i informacje o producentach",
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
        "参观行业生产商展会",
        "与潜在供应商洽谈",
        "分析产品及工厂能力",
        "收集生产商联系方式",
        "整理潜在合作伙伴名单",
        "向客户交付照片、视频及生产商信息",
      ],
    },
    products: {
      pl: [
        "lista odpowiednich producentów",
        "kontakty fabryk",
        "zdjęcia produktów",
        "wideo z wystawy",
        "rekomendacje dotyczące wyboru dostawcy",
      ],
      uk: [
        "список відповідних виробників",
        "контакти фабрик",
        "фото продукції",
        "відео з виставки",
        "рекомендації щодо вибору постачальника",
      ],
      ru: [
        "список подходящих производителей",
        "контакты фабрик",
        "фото продукции",
        "видео с выставки",
        "рекомендации по выбору поставщика",
      ],
      de: [
        "Liste passender Hersteller",
        "Fabrikkontakte",
        "Produktfotos",
        "Messevideo",
        "Empfehlungen zur Lieferantenauswahl",
      ],
      zh: [
        "合适生产商名单",
        "工厂联系方式",
        "产品照片",
        "展会视频",
        "供应商选择建议",
      ],
    },
    result: {
      pl: "Znaleziono kilku potencjalnych producentów, przeprowadzono wstępną analizę dostawców, klient otrzymał kontakty i oferty fabryk oraz rozpoczęto negocjacje z wybranymi producentami.",
      uk: "Клієнт отримав список потенційних виробників та матеріали для початку подальших переговорів.",
      ru: "Клиент получил список потенциальных производителей и материалы для начала дальнейших переговоров.",
      de: "Der Kunde erhielt eine Liste potenzieller Hersteller und Materialien für weitere Verhandlungen.",
      zh: "客户获得潜在生产商名单及后续谈判所需资料。",
    },
    coverImage: "/cases/trade-fair-real.png",
    gallery: [
      {
        src: "/cases/trade-fair-real.png",
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

type EnglishCaseStudy = {
  title: string;
  summary: string;
  category: string;
  challenge: string;
  requirements: string[];
  scope: string[];
  products: string[];
  result: string;
  galleryAlt: string;
};

const englishCaseStudies: Record<string, EnglishCaseStudy> = {
  "cs-cookware": {
    title: "Private-label cookware production",
    summary: "Supplier selection, cookware production with the client's logo, branded packaging, quality control and delivery coordination.",
    category: "Private Label",
    challenge: "A European kitchen-accessories company needed to organize production of pots and pans under its own brand.",
    requirements: [
      "apply the client's logo to the products",
      "branded packaging",
      "consistent product quality",
      "competitive production cost",
      "delivery from China",
    ],
    scope: [
      "selected several verified factories in China",
      "organized production of pots and pans with the client's logo",
      "developed custom branded boxes",
      "carried out quality control at the factory",
      "organized logistics and delivery to the client",
    ],
    products: ["stainless-steel pots", "frying pans", "branded packaging"],
    result: "A complete private-label batch was produced with custom packaging, consistent quality and delivery to the client, ready for sale under the client's own brand.",
    galleryAlt: "Cookware with the client's branding",
  },
  "cs-battery": {
    title: "Electric-motorcycle batteries built to client specifications",
    summary: "Manufacturer selection, technical specification, cell configuration, BMS verification, pre-shipment quality control and delivery.",
    category: "Battery technologies",
    challenge: "An electric-motorcycle supplier needed battery packs manufactured to specific technical parameters and dimensions.",
    requirements: [
      "custom battery parameters",
      "fit for the specified battery compartment",
      "consistent cell quality",
      "BMS protection system",
      "reliable battery-pack assembly",
      "production and delivery from China",
    ],
    scope: [
      "selected a lithium-ion battery manufacturer in China",
      "agreed the battery's technical parameters with the factory",
      "organized production in the required cell configuration",
      "verified the BMS and battery safety",
      "performed pre-shipment quality control",
      "organized delivery to the client",
    ],
    products: ["electric-motorcycle batteries", "battery packs with BMS", "custom battery configuration"],
    result: "Battery packs were manufactured to the client's requirements with the required reliability and safety, then delivered as ready-to-use electric-motorcycle components.",
    galleryAlt: "Battery packs for electric motorcycles",
  },
  "cs-consolidation": {
    title: "Consolidation of goods from 9 manufacturers",
    summary: "Coordination of deliveries from nine factories, receiving at a China warehouse, completeness checks and one consolidated container shipment.",
    category: "Logistics and consolidation",
    challenge: "The client purchased products from nine factories and needed the full assortment collected, checked, prepared, loaded into one container and shipped internationally.",
    requirements: [
      "collect the full assortment in one location",
      "verify products against the orders",
      "prepare the cargo for shipment",
      "load the container",
      "organize international transport",
    ],
    scope: [
      "coordinated deliveries from 9 manufacturers",
      "organized transport to a consolidation warehouse in China",
      "checked products against the orders",
      "assembled the complete assortment",
      "optimized container loading",
      "prepared export documents",
      "shipped the container to the client in Europe",
    ],
    products: ["multiple product categories from 9 factories", "different packaging types", "one container instead of 9 separate shipments"],
    result: "The client received one consolidated container instead of nine separate shipments, reducing logistics costs while ensuring correct order completion and one coordinated delivery.",
    galleryAlt: "Goods consolidation at a warehouse in China",
  },
  "cs-paper-machines": {
    title: "Selection and delivery of paper-product manufacturing machinery",
    summary: "Production-needs analysis, manufacturer sourcing, model comparison, supplier verification and equipment delivery.",
    category: "Industrial machinery",
    challenge: "A company expanding its paper-product production needed the right equipment, a reliable Chinese manufacturer, offer comparison and delivery coordination.",
    requirements: [
      "select suitable production equipment",
      "find a reliable manufacturer in China",
      "compare several offers",
      "organize equipment delivery",
    ],
    scope: [
      "analyzed production requirements",
      "selected several equipment manufacturers in China",
      "compared technical specifications",
      "negotiated with factories",
      "verified manufacturers",
      "prepared commercial offers",
      "organized equipment delivery",
    ],
    products: ["paper-cup machine", "laminating machine", "paper-cutting machine", "laser engraver for logo marking"],
    result: "A manufacturer was selected, the production-line configuration was optimized, technical support was secured and the equipment was delivered to the client.",
    galleryAlt: "Machinery for manufacturing paper products",
  },
  "cs-trade-fair": {
    title: "Manufacturer sourcing at specialist trade fairs in China",
    summary: "Trade-fair visits, exhibitor meetings, product analysis and preparation of a shortlist of potential manufacturers.",
    category: "Sourcing in China",
    challenge: "A European company wanted to identify new manufacturers, understand market offers, compare suppliers and establish direct factory contacts at a specialist trade fair in China.",
    requirements: [
      "identify new manufacturers",
      "review current market offers",
      "compare several suppliers",
      "establish direct factory contacts",
    ],
    scope: [
      "visited a specialist manufacturer trade fair",
      "negotiated with potential suppliers",
      "analyzed products and factory capabilities",
      "collected manufacturer contacts",
      "prepared a shortlist of potential partners",
      "provided the client with photos, videos and supplier information",
    ],
    products: ["shortlist of suitable manufacturers", "factory contacts", "product photos", "trade-fair video", "supplier-selection recommendations"],
    result: "Several potential manufacturers were identified and initially assessed. The client received factory contacts and offers, and negotiations began with selected suppliers.",
    galleryAlt: "Specialist trade fair in China",
  },
};

export function getCaseStudies(locale: Locale) {
  if (locale === "en") {
    return caseStudies.map((cs) => {
      const content = englishCaseStudies[cs.id];
      if (!content) throw new Error(`Missing English case study: ${cs.id}`);
      return {
        id: cs.id,
        slug: cs.slug,
        title: content.title,
        summary: content.summary,
        category: content.category,
        challenge: content.challenge,
        requirements: content.requirements,
        scope: content.scope,
        products: content.products,
        result: content.result,
        coverImage: cs.coverImage,
        gallery: cs.gallery.map((img) => ({ src: img.src, alt: content.galleryAlt })),
        country: undefined,
        date: cs.date,
        status: undefined,
      };
    });
  }

  const baseLocale: CaseBaseLocale = locale;
  return caseStudies.map((cs) => ({
    id: cs.id,
    slug: cs.slug,
    title: cs.title[baseLocale],
    summary: cs.summary[baseLocale],
    category: cs.category[baseLocale],
    challenge: cs.challenge?.[baseLocale],
    requirements: cs.requirements?.[baseLocale],
    scope: cs.scope[baseLocale],
    products: cs.products?.[baseLocale],
    result: cs.result[baseLocale],
    coverImage: cs.coverImage,
    gallery: cs.gallery.map((img) => ({
      src: img.src,
      alt: img.alt[baseLocale],
    })),
    country: cs.country?.[baseLocale],
    date: cs.date,
    status: cs.status?.[baseLocale],
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
