import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Noto_Sans_SC } from "next/font/google";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HtmlLangUpdater } from "@/components/layout/HtmlLangUpdater";
import { company } from "@/config/company";
import { contacts } from "@/config/contacts";
import { seoByLocale, siteUrl } from "@/config/seo";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-sans",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const notoSc = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-zh",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seoByLocale.pl.homeTitle,
  description: seoByLocale.pl.homeDescription,
  openGraph: {
    title: seoByLocale.pl.homeTitle,
    description: seoByLocale.pl.homeDescription,
    siteName: company.brandName,
    images: ["/hero/world-map-outline.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={cn(
        "h-full",
        "antialiased",
        jakarta.variable,
        notoSc.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: company.brandName,
              url: "https://global.buybringsolutions.com",
              email: contacts.email,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: contacts.phones.poland.phone,
                  areaServed: "PL",
                  availableLanguage: ["pl", "de", "en"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: contacts.phones.ukraine.phone,
                  areaServed: "UA",
                  availableLanguage: ["uk", "ru", "en"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: contacts.phones.china.phone,
                  areaServed: "CN",
                  availableLanguage: ["zh", "en"],
                },
              ],
            }),
          }}
        />
        <HtmlLangUpdater />
        <LogisticsBackdrop variant="site" />
        <Header />
        <main className="relative z-10 flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
