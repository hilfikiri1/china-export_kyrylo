import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_SC, Plus_Jakarta_Sans } from "next/font/google";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getSeo } from "@/config/seo";

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-cjk",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = getSeo("pl", "home");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={cn("h-full", "antialiased", jakarta.variable, notoSans.variable, notoSansSc.variable, "font-sans")}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <StructuredData />
        <LogisticsBackdrop variant="site" />
        <Header />
        <main className="relative z-10 flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
