import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Noto_Sans_SC } from "next/font/google";
import { notFound } from "next/navigation";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { company } from "@/config/company";
import { htmlLang, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chinese",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  icons: {
    icon: "/brand/favicon.svg",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const messages = await getDictionary(locale);

  return (
    <html
      lang={htmlLang[locale]}
      className={cn(
        "h-full antialiased",
        jakarta.variable,
        inter.variable,
        notoSansSc.variable,
        locale === "zh" ? "font-[family-name:var(--font-chinese)]" : "font-sans",
      )}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <LocaleProvider locale={locale} messages={messages}>
          <LogisticsBackdrop variant="site" />
          <Header />
          <main className="relative z-10 flex-1 pt-16">{children}</main>
          <Footer />
          <CookieBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}

export function generateViewport() {
  return {
    themeColor: "#1e3a5f",
  };
}
