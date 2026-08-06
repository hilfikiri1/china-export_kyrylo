import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Panel wewnętrzny — Buy & Bring Solutions",
  robots: { index: false, follow: false },
};

/**
 * Employee panel. Only available in development and Vercel Preview environments.
 * Returns 404 in production without authentication.
 */
export default function BbsLayout({ children }: { children: ReactNode }) {
  const env = process.env.NODE_ENV;
  const vercelEnv = process.env.VERCEL_ENV;
  const isAllowed =
    env === "development" || vercelEnv === "preview";

  if (!isAllowed) notFound();

  return <>{children}</>;
}
