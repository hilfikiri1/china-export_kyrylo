import type { Metadata } from "next";
import Link from "next/link";
import { FilePlus2, Files, FolderKanban, Newspaper, Users } from "lucide-react";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "B&BS Admin — Buy & Bring Solutions",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BbsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const ru = locale === "ru";

  const sections = [
    {
      href: `/${locale}/bbs/cases`,
      icon: Files,
      title: ru ? "Кейсы" : "Case'y",
      description: ru
        ? "Редактирование, публикация, скрытие, архив и управление фотографиями."
        : "Edytuj, publikuj, ukrywaj, archiwizuj i zarządzaj zdjęciami.",
    },
    {
      href: `/${locale}/bbs/nowy-case`,
      icon: FilePlus2,
      title: ru ? "Новый кейс" : "Nowy case",
      description: ru
        ? "Добавить завершённый проект в раздел Реализации."
        : "Dodaj zamknięty case do sekcji Realizacje.",
    },
    {
      href: `/${locale}/bbs/nowy-wpis`,
      icon: Newspaper,
      title: ru ? "Новая статья" : "Nowy wpis blogowy",
      description: ru ? "Создать статью для раздела Блог." : "Napisz artykuł do sekcji Blog.",
    },
    {
      href: `/${locale}/bbs/nowy-projekt`,
      icon: Users,
      title: ru ? "Новый проект клиента" : "Nowy projekt klienta",
      description: ru
        ? "Создать проект и постоянную ссылку на кабинет клиента."
        : "Utwórz projekt i stały link do panelu klienta.",
    },
    {
      href: `/${locale}/bbs/projekty`,
      icon: FolderKanban,
      title: ru ? "Проекты клиентов" : "Projekty klientów",
      description: ru
        ? "Изменить этап, статус и добавить фотографии в кабинет клиента."
        : "Zmień etap, status i dodaj zdjęcia do panelu klienta.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8 rounded-lg border border-accent-light/20 bg-accent-light/5 px-4 py-3 text-xs text-white/60">
        <strong className="text-white/80">{ru ? "Внутренняя панель B&BS" : "Panel wewnętrzny B&BS"}</strong>{" "}
        — {ru ? "доступ защищён авторизацией администратора." : "dostęp chroniony uwierzytelnieniem administratora."}
      </div>

      <h1 className="text-2xl font-bold text-white sm:text-3xl">{ru ? "Внутренняя панель" : "Panel wewnętrzny"}</h1>
      <p className="mt-2 text-sm text-white/50">
        {ru ? "Рабочие инструменты команды Buy & Bring Solutions." : "Narzędzia robocze dla zespołu Buy & Bring Solutions."}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, icon: Icon, title, description }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-white/10 bg-navy-light p-5 transition-colors hover:border-white/20 hover:bg-white/5"
          >
            <Icon className="mb-3 h-6 w-6 text-accent-light" aria-hidden />
            <p className="font-semibold text-white">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/50">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
