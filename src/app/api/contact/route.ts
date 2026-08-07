import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  forwardLeadToWebhook,
  type LeadPayload,
} from "@/lib/lead-delivery/forward-lead";
import { INTERNAL_PROJECT_STATUSES, PORTAL_STAGES } from "@/lib/portal/constants";
import {
  createPortalProject,
  isNotionPortalConfigured,
} from "@/lib/portal/notion";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function str(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

const ALLOWED_LOCALES = new Set(["pl", "uk", "ru", "de", "zh"]);
const ALLOWED_FORM_TYPES = new Set(["contact", "consultation"]);

const TOPIC_LABELS: Record<string, string> = {
  sourcing: "Wyszukiwanie producenta",
  audit: "Weryfikacja / audyt fabryki",
  qc: "Kontrola jakości",
  oem: "Private Label / OEM",
  consolidation: "Konsolidacja",
  freight: "Transport i odprawa",
  full: "Kompleksowa obsługa importu",
  other: "Inne",
  logistics: "Logistyka i transport",
};

function oneLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function projectNameFromLead(payload: LeadPayload) {
  const topic = TOPIC_LABELS[payload.topic] || payload.topic;
  return (
    oneLine(payload.description) ||
    oneLine(topic) ||
    `Zapytanie WWW — ${oneLine(payload.name)}`
  ).slice(0, 200);
}

function projectDescriptionFromLead(payload: LeadPayload) {
  const topic = TOPIC_LABELS[payload.topic] || payload.topic;
  return [
    topic ? `Usługa: ${topic}` : "",
    payload.description ? `Opis: ${payload.description}` : "",
    `Źródło: formularz WWW (${payload.formType}, ${payload.language.toUpperCase()})`,
    payload.pageUrl ? `Strona: ${payload.pageUrl}` : "",
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 2_000);
}

async function createProjectFromWebsiteLead(
  payload: LeadPayload,
  kommoId?: number,
) {
  if (!isNotionPortalConfigured()) {
    console.warn("[contact-api] Notion portal is not configured; project creation skipped");
    return false;
  }

  await createPortalProject({
    name: projectNameFromLead(payload),
    company: payload.company || undefined,
    contactName: payload.name || undefined,
    email: payload.email || undefined,
    phone: payload.phone || undefined,
    description: projectDescriptionFromLead(payload),
    kommoId,
    internalStatus: INTERNAL_PROJECT_STATUSES[0],
    currentStage: PORTAL_STAGES[0],
    managerName: "Buy & Bring Solutions",
  });
  return true;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot
  if (body._hp) return NextResponse.json({ success: true });

  // Allowlist extraction with max lengths — extra fields are silently ignored
  const name = str(body.name, 200);
  const email = str(body.email, 254);
  const phone = str(body.phone, 30);
  const company = str(body.company, 200);
  const topic = str(body.topic, 100);
  const description = str(body.description, 3000);
  const rawLanguage = str(body.language, 5);
  const language = ALLOWED_LOCALES.has(rawLanguage) ? rawLanguage : "pl";
  const rawFormType = str(body.formType, 20);
  const formType = ALLOWED_FORM_TYPES.has(rawFormType) ? rawFormType : "contact";
  const pageUrl = str(body.pageUrl, 500);
  const consent = body.consent === true;

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!email || !isValidEmail(email)) missing.push("email");
  if (!consent) missing.push("consent");

  if (missing.length > 0) {
    return NextResponse.json({ error: "validation", fields: missing }, { status: 422 });
  }

  if (!process.env.CONTACT_WEBHOOK_URL) {
    console.error("[contact-api] CONTACT_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
  }

  // Explicit allowlist payload — no spread of request body
  const payload: LeadPayload = {
    language,
    pageUrl,
    formType,
    submittedAt: new Date().toISOString(),
    name,
    company,
    email,
    phone,
    topic,
    description,
  };

  let leadId: number | undefined;
  try {
    const result = await forwardLeadToWebhook(payload);
    if (!result.ok) {
      console.error("[contact-api] Webhook responded with", result.status);
      return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
    }
    leadId = result.leadId;
  } catch (err) {
    console.error("[contact-api] Webhook request error", err);
    return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
  }

  let projectCreated = false;
  try {
    projectCreated = await createProjectFromWebsiteLead(payload, leadId);
  } catch (err) {
    // Kommo / Telegram delivery has already succeeded. A transient Notion
    // failure must not make the customer resubmit and create a duplicate lead.
    console.error("[contact-api] Notion project creation failed", err);
  }

  return NextResponse.json({ success: true, projectCreated });
}
