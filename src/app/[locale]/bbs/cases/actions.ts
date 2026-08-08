"use server";

import { revalidatePath } from "next/cache";
import { hasBbsAdminSession } from "@/lib/bbs/auth";
import {
  setNotionCaseArchived,
  setNotionCasePublished,
} from "@/lib/cases/notion";

function readText(formData: FormData, name: string, maxLength = 200) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function revalidateCasePaths(slug: string, locale: string) {
  revalidatePath(`/${locale}/bbs/cases`);
  revalidatePath(`/${locale}/realizacje`);
  revalidatePath(`/${locale}/realizacje/${slug}`);
  revalidatePath("/sitemap.xml");
}

async function requireAdmin() {
  if (!(await hasBbsAdminSession())) {
    throw new Error("Sesja wygasła. Zaloguj się ponownie do panelu.");
  }
}

export async function publishCaseAction(formData: FormData) {
  await requireAdmin();
  const pageId = readText(formData, "pageId", 80);
  const locale = readText(formData, "locale", 10) || "pl";
  if (!pageId) return;
  const result = await setNotionCasePublished(pageId, true);
  revalidateCasePaths(result.slug, locale);
}

export async function hideCaseAction(formData: FormData) {
  await requireAdmin();
  const pageId = readText(formData, "pageId", 80);
  const locale = readText(formData, "locale", 10) || "pl";
  if (!pageId) return;
  const result = await setNotionCasePublished(pageId, false);
  revalidateCasePaths(result.slug, locale);
}

export async function archiveCaseAction(formData: FormData) {
  await requireAdmin();
  const pageId = readText(formData, "pageId", 80);
  const locale = readText(formData, "locale", 10) || "pl";
  if (!pageId) return;
  const result = await setNotionCaseArchived(pageId, true);
  revalidateCasePaths(result.slug, locale);
}

export async function restoreCaseAction(formData: FormData) {
  await requireAdmin();
  const pageId = readText(formData, "pageId", 80);
  const locale = readText(formData, "locale", 10) || "pl";
  if (!pageId) return;
  const result = await setNotionCaseArchived(pageId, false);
  revalidateCasePaths(result.slug, locale);
}
