import { NextResponse } from "next/server";
import { hasBbsAdminSession } from "@/lib/bbs/auth";
import {
  isNotionCasesConfigured,
  uploadNotionCaseImage,
} from "@/lib/cases/notion";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 3_500_000;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export async function POST(request: Request) {
  if (!(await hasBbsAdminSession())) {
    return NextResponse.json({ error: "Sesja wygasła. Zaloguj się ponownie." }, { status: 401 });
  }

  if (!isNotionCasesConfigured()) {
    return NextResponse.json({ error: "Integracja Notion nie jest skonfigurowana." }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Nie wybrano pliku." }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Obsługiwane formaty: JPG, PNG, WebP, GIF i AVIF." },
      { status: 415 },
    );
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      { error: "Zdjęcie jest za duże. Maksymalny rozmiar jednego pliku to 3,5 MB." },
      { status: 413 },
    );
  }

  try {
    const uploaded = await uploadNotionCaseImage(file);
    return NextResponse.json(uploaded);
  } catch (error) {
    console.error("[bbs/cases] Failed to upload case image", error);
    return NextResponse.json(
      { error: "Nie udało się przesłać zdjęcia do Notion." },
      { status: 500 },
    );
  }
}
