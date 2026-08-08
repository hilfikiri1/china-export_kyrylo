import type { Metadata } from "next";
import { NewBlogPostForm } from "@/components/bbs/NewBlogPostForm";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "New blog post — B&BS Admin",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function NowyWpisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const ru = locale === "ru";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-6">
        <a href={`/${locale}/bbs`} className="text-xs text-white/40 hover:text-white/70">
          ← {ru ? "Внутренняя панель" : "Panel wewnętrzny"}
        </a>
        <h1 className="mt-2 text-2xl font-bold text-white">{ru ? "Новая статья" : "Nowy wpis blogowy"}</h1>
        <p className="mt-1 text-sm text-white/50">
          {ru ? "Создайте черновик или опубликуйте статью напрямую через Notion." : "Utwórz Draft albo opublikuj artykuł bezpośrednio przez Notion."}
        </p>
      </div>
      <NewBlogPostForm locale={locale} />
    </div>
  );
}
