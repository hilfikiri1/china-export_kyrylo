"use server";

import { headers } from "next/headers";
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

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function safeLocale(value: FormDataEntryValue | null) {
  return typeof value === "string" && isLocale(value) ? value : defaultLocale;
}

async function clientIp() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function activeAttempt(ip: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  if (!attempt) return undefined;
  if (attempt.resetAt <= now) {
    loginAttempts.delete(ip);
    return undefined;
  }
  return attempt;
}

function registerFailedAttempt(ip: string) {
  const now = Date.now();
  const current = activeAttempt(ip);
  if (!current) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  current.count += 1;
}

function isLoginBlocked(ip: string) {
  return (activeAttempt(ip)?.count ?? 0) >= LOGIN_MAX_ATTEMPTS;
}

export async function loginBbs(
  _previousState: BbsLoginState,
  formData: FormData,
): Promise<BbsLoginState> {
  if (!isBbsAuthConfigured()) {
    return { error: "Logowanie do panelu nie jest jeszcze skonfigurowane." };
  }

  const ip = await clientIp();
  if (isLoginBlocked(ip)) {
    return { error: "Za dużo nieudanych prób. Spróbuj ponownie za kilkanaście minut." };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !verifyBbsAdminPassword(password)) {
    registerFailedAttempt(ip);
    return { error: "Nieprawidłowe hasło." };
  }

  loginAttempts.delete(ip);
  const locale = safeLocale(formData.get("locale"));
  await createBbsAdminSession();
  redirect(`/${locale}/bbs`);
}

export async function logoutBbs(formData: FormData) {
  const locale = safeLocale(formData.get("locale"));
  await clearBbsAdminSession();
  redirect(`/${locale}/bbs`);
}
