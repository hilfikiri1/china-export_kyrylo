"use server";

import { redirect } from "next/navigation";
import {
  clearBbsAdminSession,
  createBbsAdminSession,
  isBbsAuthConfigured,
  verifyBbsAdminPassword,
} from "@/lib/bbs/auth";
import { defaultLocale, isLocale } from "@/i18n/config";

export type BbsLoginState = {
  error?: string;
};

function safeLocale(value: FormDataEntryValue | null) {
  return typeof value === "string" && isLocale(value) ? value : defaultLocale;
}

export async function loginBbs(
  _previousState: BbsLoginState,
  formData: FormData,
): Promise<BbsLoginState> {
  if (!isBbsAuthConfigured()) {
    return { error: "Logowanie do panelu nie jest jeszcze skonfigurowane." };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !verifyBbsAdminPassword(password)) {
    return { error: "Nieprawidłowe hasło." };
  }

  const locale = safeLocale(formData.get("locale"));
  await createBbsAdminSession();
  redirect(`/${locale}/bbs`);
}

export async function logoutBbs(formData: FormData) {
  const locale = safeLocale(formData.get("locale"));
  await clearBbsAdminSession();
  redirect(`/${locale}/bbs`);
}
