"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/i18n/routing";

export function useCurrentLocale() {
  const pathname = usePathname();
  return getLocaleFromPathname(pathname || "/");
}
