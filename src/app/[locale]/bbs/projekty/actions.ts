"use server";

import { revalidatePath } from "next/cache";
import { hasBbsAdminSession } from "@/lib/bbs/auth";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { INTERNAL_PROJECT_STATUSES, PORTAL_STAGES } from "@/lib/portal/constants";
import {
  createPortalProject,
  createPortalUpdate,
  getPortalProjectAdmin,
  NotionPortalConfigurationError,
  updatePortalProject,
} from "@/lib/portal/notion";

export type PortalProjectActionState = {
  status?: "success" | "error";
  message?: string;
  pageId?: string;
  accessUrl?: string;
  notionUrl?: string;
};

const MAX = {
  name: 200,
  projectNumber: 100,
  company: 200,
  contactName: 200,
  email: 320,
  phone: 80,
  description: 2_000,
  nextStep: 700,
  managerName: 200,
  updateDescription: 1_500,
} as const;

const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 2_500_000;
const MAX_TOTAL_IMAGE_BYTES = 3_200_000;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function stringValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function safeLocale(formData: FormData): Locale {
  const value = stringValue(formData, "locale");
  return isLocale(value) ? value : defaultLocale;
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function validPageId(value: string) {
  return /^[a-f0-9]{32}$/i.test(value.replaceAll("-", ""));
}

function imagesFrom(formData: FormData) {
  return formData
    .getAll("images")
    .filter((value): value is File => typeof value !== "string" && value.size > 0);
}

function validateImages(images: File[]) {
  if (images.length > MAX_IMAGES) return `Możesz dodać maksymalnie ${MAX_IMAGES} zdjęcia naraz.`;
  if (images.some((file) => !IMAGE_TYPES.has(file.type))) {
    return "Zdjęcia muszą mieć format JPG, PNG, WebP albo GIF.";
  }
  if (images.some((file) => file.size > MAX_IMAGE_BYTES)) {
    return "Jedno zdjęcie może mieć maksymalnie 2,5 MB.";
  }
  const total = images.reduce((sum, file) => sum + file.size, 0);
  if (total > MAX_TOTAL_IMAGE_BYTES) return "Łączny rozmiar zdjęć może wynosić maksymalnie 3,2 MB.";
  return "";
}

function actionError(error: unknown) {
  if (error instanceof NotionPortalConfigurationError) {
    return "Integracja Notion dla panelu klienta nie jest skonfigurowana.";
  }
  console.error("[bbs/projects] Project update failed.", error);
  return "Nie udało się zapisać projektu w Notion. Sprawdź dostęp integracji do baz projektu.";
}

export async function createPortalProjectAction(
  _previousState: PortalProjectActionState,
  formData: FormData,
): Promise<PortalProjectActionState> {
  if (!(await hasBbsAdminSession())) {
    return { status: "error", message: "Sesja panelu wygasła. Zaloguj się ponownie." };
  }

  const locale = safeLocale(formData);
  const name = stringValue(formData, "name");
  const projectNumber = stringValue(formData, "projectNumber");
  const company = stringValue(formData, "company");
  const contactName = stringValue(formData, "contactName");
  const email = stringValue(formData, "email");
  const phone = stringValue(formData, "phone");
  const description = stringValue(formData, "description");
  const internalStatus = stringValue(formData, "internalStatus");
  const currentStage = stringValue(formData, "currentStage");
  const nextStep = stringValue(formData, "nextStep");
  const plannedDate = stringValue(formData, "plannedDate");
  const managerName = stringValue(formData, "managerName");
  const kommoRaw = stringValue(formData, "kommoId");

  if (!name || name.length > MAX.name) return { status: "error", message: "Sprawdź nazwę projektu." };
  if (projectNumber.length > MAX.projectNumber || company.length > MAX.company) {
    return { status: "error", message: "Numer projektu lub firma są zbyt długie." };
  }
  if (contactName.length > MAX.contactName || email.length > MAX.email || phone.length > MAX.phone) {
    return { status: "error", message: "Sprawdź dane kontaktowe klienta." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Podaj poprawny adres e-mail." };
  }
  if (description.length > MAX.description || nextStep.length > MAX.nextStep || managerName.length > MAX.managerName) {
    return { status: "error", message: "Jedno z pól opisowych jest zbyt długie." };
  }
  if (!INTERNAL_PROJECT_STATUSES.includes(internalStatus as (typeof INTERNAL_PROJECT_STATUSES)[number])) {
    return { status: "error", message: "Wybierz poprawny status wewnętrzny." };
  }
  if (!PORTAL_STAGES.includes(currentStage as (typeof PORTAL_STAGES)[number])) {
    return { status: "error", message: "Wybierz poprawny etap klienta." };
  }
  if (plannedDate && !validDate(plannedDate)) return { status: "error", message: "Sprawdź planowaną datę." };

  let kommoId: number | undefined;
  if (kommoRaw) {
    const parsed = Number(kommoRaw);
    if (!Number.isSafeInteger(parsed) || parsed <= 0) {
      return { status: "error", message: "Kommo ID musi być dodatnią liczbą całkowitą." };
    }
    kommoId = parsed;
  }

  try {
    const created = await createPortalProject({
      name,
      projectNumber: projectNumber || undefined,
      company: company || undefined,
      contactName: contactName || undefined,
      email: email || undefined,
      phone: phone || undefined,
      description: description || undefined,
      kommoId,
      internalStatus,
      currentStage,
      nextStep: nextStep || undefined,
      plannedDate: plannedDate || undefined,
      managerName: managerName || undefined,
    });
    revalidatePath(`/${locale}/bbs/projekty`);
    return {
      status: "success",
      message: "Projekt zapisany. Link klienta jest aktywny.",
      pageId: created.pageId,
      accessUrl: created.accessUrl,
      notionUrl: created.notionUrl,
    };
  } catch (error) {
    return { status: "error", message: actionError(error) };
  }
}

export async function updatePortalProjectAction(
  _previousState: PortalProjectActionState,
  formData: FormData,
): Promise<PortalProjectActionState> {
  if (!(await hasBbsAdminSession())) {
    return { status: "error", message: "Sesja panelu wygasła. Zaloguj się ponownie." };
  }

  const locale = safeLocale(formData);
  const pageId = stringValue(formData, "pageId");
  const internalStatus = stringValue(formData, "internalStatus");
  const currentStage = stringValue(formData, "currentStage");
  const nextStep = stringValue(formData, "nextStep");
  const plannedDate = stringValue(formData, "plannedDate");
  const managerName = stringValue(formData, "managerName");
  const updateDescription = stringValue(formData, "updateDescription");
  const active = formData.get("active") === "on";
  const visible = formData.get("visibleForClient") === "on";
  const images = imagesFrom(formData);

  if (!validPageId(pageId)) return { status: "error", message: "Nieprawidłowy identyfikator projektu." };
  if (!INTERNAL_PROJECT_STATUSES.includes(internalStatus as (typeof INTERNAL_PROJECT_STATUSES)[number])) {
    return { status: "error", message: "Wybierz poprawny status wewnętrzny." };
  }
  if (!PORTAL_STAGES.includes(currentStage as (typeof PORTAL_STAGES)[number])) {
    return { status: "error", message: "Wybierz poprawny etap klienta." };
  }
  if (nextStep.length > MAX.nextStep || managerName.length > MAX.managerName) {
    return { status: "error", message: "Jedno z pól projektu jest zbyt długie." };
  }
  if (updateDescription.length > MAX.updateDescription) {
    return { status: "error", message: "Opis aktualizacji może mieć maksymalnie 1500 znaków." };
  }
  if (plannedDate && !validDate(plannedDate)) return { status: "error", message: "Sprawdź planowaną datę." };
  const imageError = validateImages(images);
  if (imageError) return { status: "error", message: imageError };

  try {
    const before = await getPortalProjectAdmin(pageId);
    await updatePortalProject(pageId, {
      internalStatus,
      currentStage,
      nextStep: nextStep || undefined,
      plannedDate: plannedDate || undefined,
      managerName: managerName || undefined,
      active,
    });

    const clientFacingChanged =
      before.currentStage !== currentStage ||
      before.nextStep !== nextStep ||
      before.plannedDate !== plannedDate;
    if (clientFacingChanged || updateDescription || images.length > 0) {
      await createPortalUpdate(pageId, {
        currentStage,
        description: updateDescription || undefined,
        nextStep: nextStep || undefined,
        plannedDate: plannedDate || undefined,
        visible,
        images,
      });
    }

    revalidatePath(`/${locale}/bbs/projekty`);
    revalidatePath(`/${locale}/bbs/projekty/${pageId}`);
    revalidatePath(`/pl/panel/${before.token}`);
    return {
      status: "success",
      message: "Zmiany zapisane. Panel klienta został odświeżony.",
      pageId,
      accessUrl: before.accessUrl,
    };
  } catch (error) {
    return { status: "error", message: actionError(error) };
  }
}
