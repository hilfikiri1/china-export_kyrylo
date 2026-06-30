# Руководство по редактированию контента

Это руководство поможет вам менять тексты и данные на сайте **Buy & Bring Solutions** без поиска по React-компонентам.

> **Важно:** юридические тексты (политика конфиденциальности, cookies, регламент) помечены для профессиональной правовой проверки. Не публикуйте их без согласования с юристом.

---

## Контактные данные

| Что менять | Файл |
|------------|------|
| E-mail компании | `src/config/contacts.ts` → `email` |
| Телефоны (Польша, Украина, Китай) | `src/config/contacts.ts` → `phones` |
| Адреса (Украина, Китай) | `src/config/contacts.ts` → `addresses` |
| Региональный телефон в шапке по языку | `src/config/contacts.ts` → функция `getPrimaryPhone()` |
| Контактное лицо (когда будут проверенные данные) | `src/config/contacts.ts` → `regionalContactPersons` |

WhatsApp-ссылки формируются автоматически из номеров в `contacts.ts`.

---

## Статистика компании

| Что менять | Файл |
|------------|------|
| 17 лет, 275+ клиентов, 110+ контейнеров, Foshan | `src/content/statistics.ts` |

Используйте **только проверенные** цифры. Не добавляйте выдуманные рейтинги, отзывы или «120+ отправлений в месяц».

---

## Услуги

| Что менять | Файл |
|------------|------|
| Список услуг, описания, slug страниц | `src/content/services.ts` |
| Тексты на всех языках (заголовки в навигации и на главной) | `src/i18n/messages/pl.json`, `uk.json`, `ru.json`, `de.json`, `zh.json` → раздел `services` |

---

## Кейсы (реализации)

| Что менять | Файл |
|------------|------|
| Все кейсы (5 официальных тем) | `src/content/cases.ts` |
| Тизер на главной | `src/content/realizacje-teaser.ts` |

Для каждого кейса: `id`, `slug`, переводы `title`, `summary`, `category`, `scope`, `result`, `coverImage`, `gallery`.

---

## Отрасли и категории продуктов

| Что менять | Файл |
|------------|------|
| 8 категорий и списки подкатегорий | `src/content/industries.ts` |

---

## Процесс импорта (6 этапов)

| Что менять | Файл |
|------------|------|
| Тексты этапов | `src/content/process.ts` |
| Визуальная «дорожная карта» на главной | `src/content/roadmap.stages.ts` |

---

## Главная страница

| Что менять | Файл |
|------------|------|
| Hero, trust-карточки, кнопки | `src/i18n/messages/*.json` → `hero`, `trust`, `common` |
| Блок статистики | `src/content/statistics.ts` |
| Услуги | `src/content/services.ts` + `messages` → `services` |
| Кейсы (тизер) | `src/content/realizacje-teaser.ts` |
| О компании (сетка) | `src/content/about-grid.ts` |

---

## Страницы «О нас» и «Работаем в Китае»

| Что менять | Файл |
|------------|------|
| О нас | `src/content/o-nas-layout.ts`, `src/content/pages/o-nas.ts` |
| Операции в Китае (Foshan) | `src/content/my-w-chinach-layout.ts`, `src/content/pages/zespol-w-chinach.ts` |

---

## Переводы интерфейса

| Язык | Файл |
|------|------|
| Польский (основной) | `src/i18n/messages/pl.json` |
| Украинский | `src/i18n/messages/uk.json` |
| Русский | `src/i18n/messages/ru.json` |
| Немецкий | `src/i18n/messages/de.json` |
| Китайский (упрощённый) | `src/i18n/messages/zh.json` |

Формы, калькулятор, cookie-баннер, ошибки — в тех же файлах (`contact`, `calculator`, `cookie`, `forms`).

---

## SEO

| Что менять | Файл |
|------------|------|
| Title и description по страницам и языкам | `src/config/seo.ts` |
| URL сайта (canonical, sitemap) | переменная окружения `NEXT_PUBLIC_SITE_URL` или `src/config/seo.ts` → `siteUrl` |

---

## Изображения

Рекомендуемая структура:

```text
public/
  brand/          — логотип, favicon
  team/           — фото команды (когда будут)
  china-office/   — офис и операции в Китае
  services/       — иллюстрации услуг
  industries/     — отрасли
  cases/          — кейсы
```

Сейчас часть изображений — временные копии из `public/image/`. Замените на официальные фото B&BS, когда они будут предоставлены.

---

## Юридическая информация

| Что менять | Файл |
|------------|------|
| Название юрлица, NIP, VAT (пока пусто — не показывается на сайте) | `src/config/legal.ts` |

---

## Как добавить шестой язык

1. Добавьте код локали в `src/i18n/config.ts` → `locales`, `localeLabels`, `htmlLang`.
2. Создайте `src/i18n/messages/xx.json` (скопируйте структуру из `pl.json`).
3. Добавьте переводы во все файлы `src/content/*.ts`, где есть `Record<Locale, string>`.
4. Обновите `src/i18n/get-dictionary.ts`.
5. Запустите `npm run build` — TypeScript покажет пропущенные поля.

---

## Как проверить перед публикацией

```bash
npm install
npm run lint
npm run build
npm run dev
```

Откройте в браузере:

- `http://localhost:3000/pl` — польская версия по умолчанию
- `/uk`, `/ru`, `/de`, `/zh` — остальные языки
- Проверьте переключатель языка, мобильное меню, формы и калькулятор

---

## Ограничения бэкенда форм

Формы сейчас работают на клиенте (состояние «отправлено» без реального API). Для продакшена подключите endpoint через переменную окружения (например Formspree, собственный API). Секреты **не** храните в frontend-коде.

Калькулятор использует API NBP (`/api/nbp-rates`) для курсов валют, с запасным ручным вводом.

---

## Git: как откатиться к предыдущей версии на GitHub

Если новая версия вам не подходит:

### Вариант 1 — через GitHub (веб)

1. Откройте репозиторий на GitHub → **Releases** или **Commits**.
2. Найдите коммит **до** ребрендинга (ветка `main` до merge PR).
3. **Revert** merge commit: Pull Request → кнопка **Revert** на merged PR.

### Вариант 2 — локально

```bash
# Посмотреть историю
git log --oneline

# Вернуть main к конкретному коммиту (осторожно — перезаписывает историю)
git checkout main
git reset --hard <hash-старого-коммита>
git push origin main --force
```

### Вариант 3 — без force push (безопаснее)

```bash
git revert <hash-коммита-ребрендинга>
git push origin main
```

### Vercel

После отката на GitHub Vercel автоматически задеплоит предыдущую версию. Можно также в панели Vercel: **Deployments** → выбрать старый деплой → **Promote to Production**.

---

## TODO для владельца проекта

- [ ] Официальные фото для кейсов (`public/cases/`)
- [ ] Логотип B&BS в высоком разрешении (сейчас SVG-заглушка в `public/brand/`)
- [ ] Юридические данные в `src/config/legal.ts`
- [ ] Проверенные данные контактного лица в `src/config/contacts.ts`
- [ ] Подключение форм к реальному backend
- [ ] Правовая проверка текстов политики конфиденциальности и cookies
