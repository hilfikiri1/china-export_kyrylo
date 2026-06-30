import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Noto_Sans_SC } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-cjk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/** Map locale to HTML lang attribute */
const localeLangMap: Record<string, string> = {
  pl: "pl",
  uk: "uk",
  ru: "ru",
  de: "de",
  zh: "zh-CN",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const htmlLang = localeLangMap[locale] ?? locale;

  return (
    <html
      lang={htmlLang}
      className={cn(
        "h-full antialiased",
        jakarta.variable,
        "font-sans",
        inter.variable,
        notoSansSC.variable,
      )}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <LogisticsBackdrop variant="site" />
          <Header />
          <main className="relative z-10 flex-1 pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
