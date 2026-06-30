import type { Metadata } from "next";
import { company } from "@/config/company";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://china-exportkyrylo.vercel.app",
  ),
  title: {
    default: company.name,
    template: `%s | ${company.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
