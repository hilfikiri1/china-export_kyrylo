/** Deep overrides for non-pl locales — merged after base migration */

export const localeFullOverrides = {
  uk: {
    services: {
      card: {
        relatedStage: "Пов'язаний етап",
        helpCta: "Потрібна допомога на цьому етапі?",
      },
      phases: {
        "pre-production": {
          description:
            "Від пошуку виробника до контролю якості та OEM.",
        },
        logistics: {
          description:
            "Від фабрики до порту — платежі, консолідація та фрахт.",
        },
        delivery: {
          description:
            "Транспорт, митне оформлення та доставка за вказаною адресою.",
        },
      },
    },
    process: {
      page: {
        meta: {
          title: "Процес імпорту — Buy & Bring Solutions",
          description:
            "Повний шлях імпорту з Китаю — від брифу та перевірки постачальника до фрахту, митного оформлення та доставки door-to-door.",
        },
        hero: {
          eyebrow: "Карта співпраці",
          title: "Імпорт з Китаю крок за кроком",
          lead: "Кожен проєкт проходить передбачувані етапи. Ви знаєте, що відбувається зараз, що буде далі і хто за це відповідає — з польського та китайського боку.",
        },
        sections: [
          {
            title: "Від брифу до плану дій",
            body: "Починаємо з короткого брифу: продукт, обсяг, бюджет і графік. На цій основі пропонуємо обсяг — повний імпорт end-to-end або обрані модулі з пропозицією наступних кроків.",
            bullets: [
              "Аналіз продукту та вимог ринку ЄС",
              "Попередня оцінка ризиків і графіку",
              "Пропозиція модулів і прозорий кошторис",
            ],
          },
          {
            title: "Прозорість на кожному етапі",
            body: "Ми не зникаємо між етапами. Підтримуємо контакт і інформуємо про прогрес — залежно від фази проєкту ви отримуєте документи, фото або підсумки. Ви можете увійти в процес у будь-який момент або доручити нам усе.",
            bullets: [
              "Постійний куратор проєкту з боку PL",
              "Операційна команда на місці в Китаї",
              "Оновлення відповідно до домовленостей проєкту",
            ],
          },
        ],
        cta: {
          primary: { label: "Надіслати запит", href: "/kontakt" },
          secondary: {
            label: "Записатися на консультацію",
            href: "/konsultacja",
          },
        },
      },
    },
    forms: {
      contact: {
        placeholders: {
          name: "Олександр Коваленко",
          company: "ТОВ «Назва компанії»",
          email: "oleksandr@firma.ua",
          phone: "+380 66 496 38 81",
          message:
            "Продукт, кількість, графік, бажаний обсяг послуг...",
        },
        sendAnother: "Надіслати ще один запит",
      },
      consultation: {
        title: "Забронювати час",
        description:
          "Вкажіть контактні дані та тему розмови — ми зв'яжемося, щоб узгодити зручний час.",
        fields: {
          name: "Ім'я та прізвище",
          email: "E-mail",
          topic: "Тема консультації",
          notes: "Короткий опис (необов'язково)",
        },
        placeholders: {
          name: "Олександр Коваленко",
          email: "oleksandr@firma.ua",
          notes: "Про що ваш проєкт?",
        },
        topicOptions: {
          sourcing: "Пошук постачальника",
          audit: "Аудит фабрики",
          qc: "Контроль якості",
          logistics: "Логістика та транспорт",
          full: "Повний процес імпорту",
        },
        submit: "Записатися на консультацію",
        footnote: "Краще написати, ніж розмовляти?",
        footnoteLink: "Надіслати запит",
        sendAnother: "Надіслати ще одне звернення",
        success: {
          title: "Дякуємо — час узгоджується",
          description:
            "Ми отримали звернення. Зв'яжемося з вами, щоб узгодити час консультації.",
        },
      },
      serviceLead: {
        title: "Запит щодо обраної послуги",
        description:
          "Коротко опишіть потреби — відповімо з оцінкою обраного модуля без необхідності купувати повний пакет.",
        selectedService: "Обрана послуга",
        fields: {
          name: "Ім'я та прізвище",
          company: "Компанія",
          email: "E-mail",
          phone: "Телефон",
          message: "Опис потреб",
        },
        placeholders: {
          name: "Олександр Коваленко",
          company: "ТОВ «Назва компанії»",
          email: "oleksandr@firma.ua",
          phone: "+380 67 123 45 67",
          message:
            "Коротко опишіть продукт, кількість або обсяг послуги...",
        },
        submit: "Надіслати запит",
        close: "Закрити",
        success: {
          title: "Дякуємо за запит",
          description:
            "Ми зв'яжемося з вами щодо обраної послуги з пропозицією наступних кроків.",
        },
      },
    },
    calculator: {
      title: "Орієнтовний калькулятор імпорту з Китаю",
      supporting:
        "Транспорт, мито, ПДВ і вартість доставки до Польщі. Результат має орієнтовний характер і не є комерційною пропозицією.",
      brandNote: "Buy & Bring Solutions",
      fields: {
        sectionTitle: "Дані відправлення",
        intro:
          "Наведіть або натисніть (?) біля поля, якщо не знаєте, що ввести.",
        goods: "Вартість товару",
        currency: "Валюта товару",
        mode: "Спосіб транспортування",
        cbm: "Об'єм (м³)",
        kg: "Вага брутто (кг)",
        incoterm: "Incoterm",
        usdPln: "Курс USD/PLN",
        eurPln: "Курс EUR/PLN",
        cnCodes: "Кількість кодів CN",
        duty: "Ставка мита",
        customDuty: "Власна ставка (%)",
        insurance: "Додати страхування 0,5% (мін. 50 USD)",
        insuranceCif: "Страхування включено у вартість CIF",
        calculate: "Розрахувати орієнтовну вартість",
      },
      transportModes: {
        sea20: "Море — контейнер 20 ft",
        sea40: "Море — контейнер 40 ft",
        sea40hc: "Море — контейнер 40 HC",
        sealcl: "Море — LCL",
        rail20: "Залізниця — контейнер 20 ft",
        rail40: "Залізниця — контейнер 40 HQ",
        raillcl: "Залізниця — LCL",
        air: "Авіа",
      },
      dutyOptions: {
        unknown: "Не знаю — показати 0/5/10%",
        "0": "0%",
        "3": "3%",
        "5": "5%",
        "10": "10%",
        custom: "Інша",
      },
      results: {
        title: "Результат",
        emptyState: "Заповніть дані та натисніть «Розрахувати».",
        totalCash: "Кошти, потрібні при імпорті (з ПДВ)",
        landed: "Landed-вартість без ПДВ",
        transport: "Транспорт",
        transportCifNote:
          "Міжнародний фрахт включено у вартість CIF",
        transportLocal: "Транспорт (локальний PL)",
        goods: "Вартість товару",
        insurance: "Страхування",
        customsValue: "Митна вартість",
        duty: "Мито",
        vat: "Імпортний ПДВ 23%",
        broker: "Митний брокер",
        dutyRange: "Діапазон при цій ставці мита",
        scenarios: {
          duty: "Мито",
          landed: "Landed без ПДВ",
          total: "Кошти з ПДВ",
        },
        ratesBadge: "Планувальні дані",
        ratesNotOffer: "результат не є пропозицією",
        ratesNbp: "курси НБП",
        footerDisclaimer:
          "ПДВ 23%. Мито залежить від коду CN/TARIC. Оформлення брокера: 250 PLN + 20 PLN за додатковий код CN. Діапазон транспорту: ±15%. ПДВ показано окремо — для платника ПДВ може підлягати відшкодуванню.",
      },
      disclaimers: {
        form: "Ставки є прикладовими і потребують регулярного оновлення. Калькулятор автоматично не обробляє небезпечні вантажі, батареї, хімію, харчові товари, акциз і антидемпінгові мита.",
        freight:
          "Точна оцінка фрахту потребує ваги, об'єму, адреси завантаження та місця доставки.",
        general:
          "Результат має орієнтовний характер і не є комерційною пропозицією чи податковою порадою.",
      },
      fieldHelp: {
        goods:
          "Введіть суму з проформи або пропозиції постачальника. При EXW і FOB це ціна товару без транспорту та мита.",
        goodsCif:
          "Введіть суму з рахунку CIF — ціна товару вже з морським транспортом до порту призначення.",
        currency:
          "Валюта рахунку китайського постачальника. Найчастіше USD або EUR.",
        mode: "Оберіть спосіб відправлення. Повний контейнер — для великих регулярних поставок. LCL — для менших обсягів. Авіа — швидко, але дорожче.",
        cbm: "Об'єм упакованого товару в кубічних метрах.",
        kg: "Вага всього вантажу з упаковкою та палетами в кілограмах.",
        incoterm:
          "Умови поставки на проформі. EXW — самовивіз з фабрики. FOB — до порту в Китаї. CIF — включає морський фрахт.",
        cnCodes: "Скільки різних видів товарів у відправленні.",
        duty: "Митний податок — залежить від виду товару. Якщо не знаєте ставку, оберіть «Не знаю».",
        customDuty: "Введіть ставку мита з TARIC або від брокера, напр. 3,5%.",
        usdPln: "Курс USD/PLN. За замовчуванням з НБП. Можна змінити вручну.",
        eurPln: "Курс EUR/PLN. За замовчуванням з НБП. Можна змінити вручну.",
        insurance: "Страхування вантажу — 0,5% вартості, мінімум 50 USD.",
        insuranceCif: "При CIF страхування вже включено в ціну товару.",
      },
    },
    home: {
      casesTeaser: {
        eyebrow: "Реалізації",
        title: "Обрані проєкти імпорту з Китаю",
        lead: "Нижче — приклади співпраці в різних галузях. Через конфіденційність ми не публікуємо дані клієнтів — на сторінці Реалізації ви знайдете обсяг, процес і результати.",
        imageAlt:
          "Вантажні контейнери — логістика та реалізації імпорту з Китаю",
        ctaLabel: "Переглянути реалізації",
        highlights: {
          projects: "Проєктів у портфоліо",
          categories: "Галузей у реалізаціях",
          clients: "Обслугованих клієнтів",
        },
      },
    },
    legal: {
      placeholder:
        "Текст правового документа готується. З питаннями звертайтеся: buybringsolutionspol@gmail.com",
    },
  },
  ru: {
    services: {
      card: {
        relatedStage: "Связанный этап",
        helpCta: "Нужна помощь на этом этапе?",
      },
      phases: {
        "pre-production": {
          description:
            "От поиска производителя до контроля качества и OEM.",
        },
        logistics: {
          description:
            "От фабрики до порта — платежи, консолидация и фрахт.",
        },
        delivery: {
          description:
            "Транспортировка, таможенное оформление и доставка по указанному адресу.",
        },
      },
    },
    process: {
      page: {
        meta: {
          title: "Процесс импорта — Buy & Bring Solutions",
          description:
            "Полный путь импорта из Китая — от брифа и проверки поставщика до фрахта, таможенного оформления и доставки door-to-door.",
        },
        hero: {
          eyebrow: "Карта сотрудничества",
          title: "Импорт из Китая шаг за шагом",
          lead: "Каждый проект проходит предсказуемые этапы. Вы знаете, что происходит сейчас, что будет дальше и кто за это отвечает — со стороны Польши и Китая.",
        },
        sections: [
          {
            title: "От брифа до плана действий",
            body: "Начинаем с короткого брифа: продукт, объём, бюджет и график. На этой основе предлагаем объём — полный импорт end-to-end или выбранные модули с предложением следующих шагов.",
            bullets: [
              "Анализ продукта и требований рынка ЕС",
              "Предварительная оценка рисков и графика",
              "Предложение модулей и прозрачная смета",
            ],
          },
          {
            title: "Прозрачность на каждом этапе",
            body: "Мы не исчезаем между этапами. Поддерживаем контакт и информируем о прогрессе — в зависимости от фазы проекта вы получаете документы, фото или сводки. Вы можете войти в процесс в любой момент или поручить нам всё.",
            bullets: [
              "Постоянный куратор проекта со стороны PL",
              "Операционная команда на месте в Китае",
              "Обновления в соответствии с договорённостями проекта",
            ],
          },
        ],
        cta: {
          primary: { label: "Отправить запрос", href: "/kontakt" },
          secondary: {
            label: "Записаться на консультацию",
            href: "/konsultacja",
          },
        },
      },
    },
    forms: {
      contact: {
        placeholders: {
          name: "Иван Петров",
          company: "ООО «Название компании»",
          email: "ivan@firma.ru",
          phone: "+7 495 123 45 67",
          message:
            "Продукт, количество, график, предпочтительный объём услуг...",
        },
        sendAnother: "Отправить ещё один запрос",
      },
      consultation: {
        title: "Забронировать время",
        description:
          "Укажите контактные данные и тему разговора — мы свяжемся, чтобы согласовать удобное время.",
        fields: {
          name: "Имя и фамилия",
          email: "E-mail",
          topic: "Тема консультации",
          notes: "Краткое описание (необязательно)",
        },
        placeholders: {
          name: "Иван Петров",
          email: "ivan@firma.ru",
          notes: "О чём ваш проект?",
        },
        topicOptions: {
          sourcing: "Поиск поставщика",
          audit: "Аудит завода",
          qc: "Контроль качества",
          logistics: "Логистика и транспорт",
          full: "Полный процесс импорта",
        },
        submit: "Записаться на консультацию",
        footnote: "Предпочитаете написать вместо разговора?",
        footnoteLink: "Отправить запрос",
        sendAnother: "Отправить ещё одно обращение",
        success: {
          title: "Спасибо — время согласуется",
          description:
            "Мы получили обращение. Свяжемся с вами, чтобы согласовать время консультации.",
        },
      },
      serviceLead: {
        title: "Запрос по выбранной услуге",
        description:
          "Кратко опишите потребности — ответим с оценкой выбранного модуля без необходимости покупать полный пакет.",
        selectedService: "Выбранная услуга",
        fields: {
          name: "Имя и фамилия",
          company: "Компания",
          email: "E-mail",
          phone: "Телефон",
          message: "Описание потребностей",
        },
        placeholders: {
          name: "Иван Петров",
          company: "ООО «Название компании»",
          email: "ivan@firma.ru",
          phone: "+7 916 234 56 78",
          message:
            "Кратко опишите продукт, количество или объём услуги...",
        },
        submit: "Отправить запрос",
        close: "Закрыть",
        success: {
          title: "Спасибо за запрос",
          description:
            "Мы свяжемся с вами по выбранной услуге с предложением следующих шагов.",
        },
      },
    },
    calculator: {
      title: "Ориентировочный калькулятор импорта из Китая",
      supporting:
        "Транспорт, пошлина, НДС и стоимость доставки в Польшу. Результат носит ориентировочный характер и не является коммерческим предложением.",
      fields: {
        sectionTitle: "Данные отправления",
        intro:
          "Наведите или нажмите (?) у поля, если не знаете, что ввести.",
        goods: "Стоимость товара",
        currency: "Валюта товара",
        mode: "Способ транспортировки",
        cbm: "Объём (м³)",
        kg: "Вес брутто (кг)",
        incoterm: "Incoterm",
        usdPln: "Курс USD/PLN",
        eurPln: "Курс EUR/PLN",
        cnCodes: "Количество кодов CN",
        duty: "Ставка пошлины",
        customDuty: "Своя ставка (%)",
        insurance: "Добавить страхование 0,5% (мин. 50 USD)",
        insuranceCif: "Страхование включено в стоимость CIF",
        calculate: "Рассчитать ориентировочную стоимость",
      },
      transportModes: {
        sea20: "Море — контейнер 20 ft",
        sea40: "Море — контейнер 40 ft",
        sea40hc: "Море — контейнер 40 HC",
        sealcl: "Море — LCL",
        rail20: "Железная дорога — контейнер 20 ft",
        rail40: "Железная дорога — контейнер 40 HQ",
        raillcl: "Железная дорога — LCL",
        air: "Авиа",
      },
      dutyOptions: {
        unknown: "Не знаю — показать 0/5/10%",
        "0": "0%",
        "3": "3%",
        "5": "5%",
        "10": "10%",
        custom: "Другая",
      },
      results: {
        title: "Результат",
        emptyState: "Заполните данные и нажмите «Рассчитать».",
        totalCash: "Средства, необходимые при импорте (с НДС)",
        landed: "Landed-стоимость без НДС",
        transport: "Транспорт",
        transportCifNote:
          "Международный фрахт включён в стоимость CIF",
        transportLocal: "Транспорт (локальный PL)",
        goods: "Стоимость товара",
        insurance: "Страхование",
        customsValue: "Таможенная стоимость",
        duty: "Пошлина",
        vat: "Импортный НДС 23%",
        broker: "Таможенный брокер",
        dutyRange: "Диапазон при этой ставке пошлины",
        scenarios: {
          duty: "Пошлина",
          landed: "Landed без НДС",
          total: "Средства с НДС",
        },
        ratesBadge: "Планировочные данные",
        ratesNotOffer: "результат не является предложением",
        ratesNbp: "курсы НБП",
        footerDisclaimer:
          "НДС 23%. Пошлина зависит от кода CN/TARIC. Оформление брокера: 250 PLN + 20 PLN за дополнительный код CN. Диапазон транспорта: ±15%. НДС показан отдельно — для плательщика НДС может подлежать зачёту.",
      },
      disclaimers: {
        form: "Ставки приведены для примера и требуют регулярного обновления. Калькулятор автоматически не обрабатывает опасные грузы, батареи, химию, продукты питания, акциз и антидемпинговые пошлины.",
        freight:
          "Точная оценка фрахта требует веса, объёма, адреса погрузки и места доставки.",
        general:
          "Результат носит ориентировочный характер и не является коммерческим предложением или налоговой консультацией.",
      },
      fieldHelp: {
        goods:
          "Введите сумму из проформы или предложения поставщика. При EXW и FOB это цена товара без транспорта и пошлины.",
        goodsCif:
          "Введите сумму из счёта CIF — цена товара уже с морским транспортом до порта назначения.",
        currency:
          "Валюта счёта китайского поставщика. Чаще всего USD или EUR.",
        mode: "Выберите способ отправки. Полный контейнер — для крупных регулярных поставок. LCL — для меньших объёмов. Авиа — быстро, но дороже.",
        cbm: "Объём упакованного товара в кубических метрах.",
        kg: "Вес всего груза с упаковкой и паллетами в килограммах.",
        incoterm:
          "Условия поставки на проформе. EXW — самовывоз с завода. FOB — до порта в Китае. CIF — включает морской фрахт.",
        cnCodes: "Сколько разных видов товаров в отправлении.",
        duty: "Таможенная пошлина — зависит от вида товара. Если не знаете ставку, выберите «Не знаю».",
        customDuty:
          "Введите ставку пошлины из TARIC или от брокера, например 3,5%.",
        usdPln:
          "Курс USD/PLN. По умолчанию загружается с НБП. Можно изменить вручную.",
        eurPln:
          "Курс EUR/PLN. По умолчанию загружается с НБП. Можно изменить вручную.",
        insurance:
          "Страхование груза — 0,5% стоимости, минимум 50 USD.",
        insuranceCif:
          "При CIF страхование уже включено в цену товара.",
      },
    },
    home: {
      casesTeaser: {
        eyebrow: "Реализованные проекты",
        title: "Избранные проекты импорта из Китая",
        lead: "Ниже — примеры сотрудничества в разных отраслях. Из‑за конфиденциальности мы не публикуем данные клиентов — на странице проектов вы найдёте объём, процесс и результаты.",
        imageAlt:
          "Грузовые контейнеры — логистика и реализация импорта из Китая",
        ctaLabel: "Смотреть проекты",
        highlights: {
          projects: "Проектов в портфолио",
          categories: "Отраслей в проектах",
          clients: "Обслуженных клиентов",
        },
      },
    },
    legal: {
      placeholder:
        "Текст правового документа готовится. По вопросам обращайтесь: buybringsolutionspol@gmail.com",
    },
  },
  de: {
    services: {
      card: {
        relatedStage: "Zugehörige Phase",
        helpCta: "Hilfe in dieser Phase?",
      },
      phases: {
        "pre-production": {
          description:
            "Vom Hersteller-Sourcing bis QC und OEM.",
        },
        logistics: {
          description:
            "Von der Fabrik zum Hafen — Zahlungen, Konsolidierung und Fracht.",
        },
        delivery: {
          description:
            "Transport, Zollabfertigung und Lieferung an die angegebene Adresse.",
        },
      },
    },
    process: {
      page: {
        meta: {
          title: "Importprozess — Buy & Bring Solutions",
          description:
            "Der vollständige Importweg aus China — vom Briefing und Lieferantenprüfung bis Fracht, Zoll und Door-to-Door-Lieferung.",
        },
        hero: {
          eyebrow: "Kooperationskarte",
          title: "Import aus China Schritt für Schritt",
          lead: "Jedes Projekt durchläuft vorhersehbare Phasen. Sie wissen, was jetzt passiert, was als Nächstes kommt und wer dafür verantwortlich ist.",
        },
        sections: [
          {
            title: "Vom Briefing zum Aktionsplan",
            body: "Wir beginnen mit einem kurzen Briefing: Produkt, Volumen, Budget und Zeitplan. Darauf basierend schlagen wir den Umfang vor — vollständiger End-to-End-Import oder ausgewählte Module.",
            bullets: [
              "Produktanalyse und EU-Marktanforderungen",
              "Erste Risiko- und Zeitplanbewertung",
              "Modulvorschlag und transparente Kostenübersicht",
            ],
          },
          {
            title: "Transparenz in jeder Phase",
            body: "Wir verschwinden nicht zwischen den Phasen. Wir halten Kontakt und informieren über Fortschritte — je nach Projektphase erhalten Sie Dokumente, Fotos oder Zusammenfassungen.",
            bullets: [
              "Fester Projektbetreuer auf polnischer Seite",
              "Operatives Team vor Ort in China",
              "Updates gemäß Projektvereinbarung",
            ],
          },
        ],
        cta: {
          primary: { label: "Anfrage senden", href: "/kontakt" },
          secondary: { label: "Beratung vereinbaren", href: "/konsultacja" },
        },
      },
    },
    forms: {
      contact: {
        placeholders: {
          name: "Max Mustermann",
          company: "Muster GmbH",
          email: "max@firma.de",
          phone: "+49 30 1234 5678",
          message:
            "Produkt, Menge, Zeitplan, gewünschter Leistungsumfang...",
        },
        sendAnother: "Weitere Anfrage senden",
      },
      consultation: {
        title: "Termin reservieren",
        description:
          "Geben Sie Kontaktdaten und Gesprächsthema an — wir melden uns zur Terminabstimmung.",
        fields: {
          name: "Vor- und Nachname",
          email: "E-Mail",
          topic: "Beratungsthema",
          notes: "Kurze Beschreibung (optional)",
        },
        placeholders: {
          name: "Max Mustermann",
          email: "max@firma.de",
          notes: "Worum geht es in Ihrem Projekt?",
        },
        topicOptions: {
          sourcing: "Lieferantensuche",
          audit: "Fabrikaudit",
          qc: "Qualitätskontrolle",
          logistics: "Logistik und Transport",
          full: "Vollständiger Importprozess",
        },
        submit: "Beratung vereinbaren",
        footnote: "Lieber schreiben als sprechen?",
        footnoteLink: "Anfrage senden",
        sendAnother: "Weiteres Formular senden",
        success: {
          title: "Danke — Termin wird abgestimmt",
          description:
            "Wir haben Ihre Anfrage erhalten und melden uns zur Terminvereinbarung.",
        },
      },
      serviceLead: {
        title: "Anfrage zur gewählten Leistung",
        description:
          "Beschreiben Sie kurz Ihren Bedarf — wir antworten mit einer Einschätzung des gewählten Moduls.",
        selectedService: "Gewählte Leistung",
        fields: {
          name: "Vor- und Nachname",
          company: "Unternehmen",
          email: "E-Mail",
          phone: "Telefon",
          message: "Bedarfsbeschreibung",
        },
        placeholders: {
          name: "Max Mustermann",
          company: "Muster GmbH",
          email: "max@firma.de",
          phone: "+49 176 2345 6789",
          message:
            "Kurz Produkt, Menge oder Leistungsumfang beschreiben...",
        },
        submit: "Anfrage senden",
        close: "Schließen",
        success: {
          title: "Danke für Ihre Anfrage",
          description:
            "Wir melden uns zur gewählten Leistung mit den nächsten Schritten.",
        },
      },
    },
    calculator: {
      title: "Orientierungsrechner für Import aus China",
      supporting:
        "Transport, Zoll, MwSt. und Lieferkosten nach Polen. Das Ergebnis ist orientierend und keine verbindliche Offerte.",
      fields: {
        sectionTitle: "Sendungsdaten",
        intro:
          "Fahren Sie mit der Maus über (?) oder klicken Sie, wenn Sie unsicher sind.",
        goods: "Warenwert",
        currency: "Währung",
        mode: "Transportart",
        cbm: "Volumen (m³)",
        kg: "Bruttogewicht (kg)",
        incoterm: "Incoterm",
        usdPln: "Kurs USD/PLN",
        eurPln: "Kurs EUR/PLN",
        cnCodes: "Anzahl CN-Codes",
        duty: "Zollsatz",
        customDuty: "Eigener Satz (%)",
        insurance: "Versicherung 0,5% hinzufügen (min. 50 USD)",
        insuranceCif: "Versicherung in CIF-Wert enthalten",
        calculate: "Orientierungskosten berechnen",
      },
      transportModes: {
        sea20: "See — 20-ft-Container",
        sea40: "See — 40-ft-Container",
        sea40hc: "See — 40 HC-Container",
        sealcl: "See — LCL",
        rail20: "Schiene — 20-ft-Container",
        rail40: "Schiene — 40 HQ-Container",
        raillcl: "Schiene — LCL",
        air: "Luftfracht",
      },
      dutyOptions: {
        unknown: "Unbekannt — 0/5/10% anzeigen",
        "0": "0%",
        "3": "3%",
        "5": "5%",
        "10": "10%",
        custom: "Andere",
      },
      results: {
        title: "Ergebnis",
        emptyState: "Daten ausfüllen und „Berechnen“ klicken.",
        totalCash: "Benötigte Mittel beim Import (inkl. MwSt.)",
        landed: "Landed-Kosten ohne MwSt.",
        transport: "Transport",
        transportCifNote: "Internationaler Fracht in CIF-Wert enthalten",
        transportLocal: "Transport (lokal PL)",
        goods: "Warenwert",
        insurance: "Versicherung",
        customsValue: "Zollwert",
        duty: "Zoll",
        vat: "Einfuhrumsatzsteuer 23%",
        broker: "Zollagentur",
        dutyRange: "Spanne bei diesem Zollsatz",
        scenarios: {
          duty: "Zoll",
          landed: "Landed ohne MwSt.",
          total: "Mittel mit MwSt.",
        },
        ratesBadge: "Planungsdaten",
        ratesNotOffer: "Ergebnis ist keine Offerte",
        ratesNbp: "NBP-Kurse",
        footerDisclaimer:
          "MwSt. 23%. Zoll hängt vom CN/TARIC-Code ab. Zollagentur: 250 PLN + 20 PLN pro zusätzlichem CN-Code. Transportspanne: ±15%.",
      },
      disclaimers: {
        form: "Sätze sind Beispiele und müssen regelmäßig aktualisiert werden. Gefahrgut, Batterien, Chemie, Lebensmittel, Verbrauchsteuer und Antidumpingzölle sind nicht automatisch abgedeckt.",
        freight:
          "Genaue Frachtkalkulation erfordert Gewicht, Volumen, Lade- und Lieferadresse.",
        general:
          "Das Ergebnis ist orientierend und keine Offerte oder Steuerberatung.",
      },
      fieldHelp: {
        goods:
          "Betrag aus Proforma oder Angebot. Bei EXW/FOB nur Warenwert ohne Transport und Zoll.",
        goodsCif:
          "CIF-Rechnungsbetrag — Transport bis Zielhafen bereits enthalten.",
        currency: "Währung der chinesischen Rechnung, meist USD oder EUR.",
        mode: "Versandart wählen. Vollcontainer für große Lieferungen, LCL für kleinere Mengen, Luftfracht schnell aber teurer.",
        cbm: "Volumen in Kubikmetern laut Packing List oder L×B×H in Metern.",
        kg: "Bruttogewicht inkl. Verpackung und Paletten in Kilogramm.",
        incoterm: "Lieferbedingung laut Proforma: EXW, FOB oder CIF.",
        cnCodes: "Anzahl verschiedener Warenarten in der Sendung.",
        duty: "Einfuhrzoll je nach Produkt. Bei Unsicherheit Szenarien 0/5/10% anzeigen.",
        customDuty: "Zollsatz aus TARIC oder vom Broker, z. B. 3,5%.",
        usdPln: "USD/PLN-Kurs, standardmäßig von NBP, manuell änderbar.",
        eurPln: "EUR/PLN-Kurs, standardmäßig von NBP, manuell änderbar.",
        insurance: "Ladungsversicherung 0,5%, mindestens 50 USD.",
        insuranceCif: "Bei CIF ist Versicherung im Warenwert enthalten.",
      },
    },
    home: {
      casesTeaser: {
        eyebrow: "Referenzen",
        title: "Ausgewählte Importprojekte aus China",
        lead: "Beispiele aus verschiedenen Branchen. Aus Vertraulichkeitsgründen keine Kundendaten — Umfang, Ablauf und Ergebnisse auf der Referenzseite.",
        imageAlt: "Frachtcontainer — Logistik und Importreferenzen aus China",
        ctaLabel: "Referenzen ansehen",
        highlights: {
          projects: "Projekte im Portfolio",
          categories: "Branchen in Referenzen",
          clients: "Betreute Kunden",
        },
      },
    },
    legal: {
      placeholder:
        "Rechtstext wird vorbereitet. Bei Fragen: buybringsolutionspol@gmail.com",
    },
  },
  zh: {
    services: {
      card: {
        relatedStage: "相关阶段",
        helpCta: "此阶段需要帮助？",
      },
      phases: {
        "pre-production": {
          description: "从搜寻生产商到质量检验与 OEM。",
        },
        logistics: {
          description: "从工厂到港口——付款、集运与运费。",
        },
        delivery: {
          description: "运输、清关及送达指定地址。",
        },
      },
    },
    process: {
      page: {
        meta: {
          title: "进口流程 — Buy & Bring Solutions",
          description:
            "完整中国进口路径——从简报与供应商核验到运费、清关及门到门交付。",
        },
        hero: {
          eyebrow: "合作路线图",
          title: "中国进口分步指南",
          lead: "每个项目都经过可预期的阶段。您清楚当前进展、下一步及波兰与中国团队的职责。",
        },
        sections: [
          {
            title: "从简报到行动计划",
            body: "以简短简报开始：产品、数量、预算与时间表。据此提出全流程进口或选定模块及后续步骤。",
            bullets: [
              "产品分析与欧盟市场要求",
              "风险与时间表初步评估",
              "模块建议与透明成本概览",
            ],
          },
          {
            title: "各阶段保持透明",
            body: "阶段之间我们不会失联。按项目阶段提供文件、照片或摘要。您可随时介入或全权委托。",
            bullets: [
              "波兰侧专属项目负责人",
              "中国本地运营团队",
              "按项目约定提供进度更新",
            ],
          },
        ],
        cta: {
          primary: { label: "发送询盘", href: "/kontakt" },
          secondary: { label: "预约咨询", href: "/konsultacja" },
        },
      },
    },
    forms: {
      contact: {
        placeholders: {
          name: "张伟",
          company: "示例贸易有限公司",
          email: "zhangwei@firma.cn",
          phone: "+86 139 2994 3320",
          message: "产品、数量、时间表、所需服务范围...",
        },
        sendAnother: "再次发送询盘",
      },
      consultation: {
        title: "预约时间",
        description: "请留下联系方式与咨询主题——我们将联系您确认时间。",
        fields: {
          name: "姓名",
          email: "电子邮件",
          topic: "咨询主题",
          notes: "简要说明（选填）",
        },
        placeholders: {
          name: "张伟",
          email: "zhangwei@firma.cn",
          notes: "项目涉及什么？",
        },
        topicOptions: {
          sourcing: "供应商搜寻",
          audit: "工厂审厂",
          qc: "质量检验",
          logistics: "物流与运输",
          full: "完整进口流程",
        },
        submit: "预约咨询",
        footnote: "更喜欢书面沟通？",
        footnoteLink: "发送询盘",
        sendAnother: "再次提交",
        success: {
          title: "感谢——正在安排时间",
          description: "我们已收到申请，将联系您确认咨询时间。",
        },
      },
      serviceLead: {
        title: "所选服务询盘",
        description: "简要说明需求——我们将就所选模块回复报价，无需购买全套服务。",
        selectedService: "所选服务",
        fields: {
          name: "姓名",
          company: "公司",
          email: "电子邮件",
          phone: "电话",
          message: "需求说明",
        },
        placeholders: {
          name: "张伟",
          company: "示例贸易有限公司",
          email: "zhangwei@firma.cn",
          phone: "+86 138 0013 8000",
          message: "简要说明产品、数量或服务范围...",
        },
        submit: "发送询盘",
        close: "关闭",
        success: {
          title: "感谢您的询盘",
          description: "我们将就所选服务联系您并说明后续步骤。",
        },
      },
    },
    calculator: {
      title: "中国进口成本估算器",
      supporting:
        "运输、关税、增值税及波兰交付成本。结果仅供参考，不构成商业报价。",
      fields: {
        sectionTitle: "货运数据",
        intro: "不确定如何填写时，请将鼠标悬停或点击 (?) 查看说明。",
        goods: "货值",
        currency: "货值币种",
        mode: "运输方式",
        cbm: "体积 (m³)",
        kg: "毛重 (kg)",
        incoterm: "Incoterm",
        usdPln: "USD/PLN 汇率",
        eurPln: "EUR/PLN 汇率",
        cnCodes: "CN 编码数量",
        duty: "关税税率",
        customDuty: "自定义税率 (%)",
        insurance: "添加 0.5% 保险（最低 50 USD）",
        insuranceCif: "CIF 价值已含保险",
        calculate: "计算估算成本",
      },
      transportModes: {
        sea20: "海运 — 20 尺柜",
        sea40: "海运 — 40 尺柜",
        sea40hc: "海运 — 40 HC 柜",
        sealcl: "海运 — 拼箱 LCL",
        rail20: "铁路 — 20 尺柜",
        rail40: "铁路 — 40 HQ 柜",
        raillcl: "铁路 — 拼箱 LCL",
        air: "空运",
      },
      dutyOptions: {
        unknown: "未知 — 显示 0/5/10%",
        "0": "0%",
        "3": "3%",
        "5": "5%",
        "10": "10%",
        custom: "其他",
      },
      results: {
        title: "结果",
        emptyState: "填写数据后点击「计算」。",
        totalCash: "进口所需资金（含增值税）",
        landed: "到岸成本（不含增值税）",
        transport: "运输",
        transportCifNote: "CIF 价值已含国际运费",
        transportLocal: "运输（波兰本地）",
        goods: "货值",
        insurance: "保险",
        customsValue: "海关完税价格",
        duty: "关税",
        vat: "进口增值税 23%",
        broker: "报关行",
        dutyRange: "该税率下的区间",
        scenarios: {
          duty: "关税",
          landed: "到岸（不含增值税）",
          total: "含增值税资金",
        },
        ratesBadge: "规划数据",
        ratesNotOffer: "结果非报价",
        ratesNbp: "波兰央行汇率",
        footerDisclaimer:
          "增值税 23%。关税取决于 CN/TARIC 编码。报关行：250 PLN + 每增加一个 CN 编码 20 PLN。运输区间 ±15%。",
      },
      disclaimers: {
        form: "费率为示例，需定期更新。危险品、电池、化学品、食品、消费税及反倾销税未自动涵盖。",
        freight: "精确运费需重量、体积、装货地址与交付地点。",
        general: "结果仅供参考，不构成报价或税务建议。",
      },
      fieldHelp: {
        goods: "填写形式发票或报价金额。EXW/FOB 为货值，不含运输与关税。",
        goodsCif: "CIF 发票金额已含至目的港海运，勿重复加运费。",
        currency: "中国供应商发票币种，通常为 USD 或 EUR。",
        mode: "选择运输方式。整柜适合大批量，LCL 适合较小数量，空运快但贵。",
        cbm: "包装后体积（立方米），见装箱单或长×宽×高（米）。",
        kg: "含包装与托盘的总毛重（千克）。",
        incoterm: "发票上的贸易术语：EXW、FOB 或 CIF。",
        cnCodes: "货运中不同货品种类数量。",
        duty: "进口关税因产品而异。不确定时可查看 0/5/10% 情景。",
        customDuty: "TARIC 或报关行提供的税率，如 3.5%。",
        usdPln: "美元/兹罗提汇率，默认波兰央行，可手动修改。",
        eurPln: "欧元/兹罗提汇率，默认波兰央行，可手动修改。",
        insurance: "货运保险 0.5%，最低 50 USD。",
        insuranceCif: "CIF 条件下保险已含在货价中。",
      },
    },
    home: {
      casesTeaser: {
        eyebrow: "项目案例",
        title: "精选中国进口项目",
        lead: "以下为不同行业合作示例。出于保密不公开客户信息——案例页可查看范围、流程与结果。",
        imageAlt: "货运集装箱——中国进口物流与项目交付",
        ctaLabel: "查看案例",
        highlights: {
          projects: "案例项目",
          categories: "涉及行业",
          clients: "服务客户",
        },
      },
    },
    legal: {
      placeholder:
        "法律文件内容准备中。如有疑问请联系：buybringsolutionspol@gmail.com",
    },
  },
};
