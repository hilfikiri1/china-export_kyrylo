import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  forwardLeadToWebhook,
  type LeadAttachment,
  type LeadPayload,
} from "@/lib/lead-delivery/forward-lead";
import { createProjectFromQualifiedLead } from "@/lib/portal/qualified-project";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENTS_TOTAL_BYTES = 3_500_000;

const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
]);

const BUDGET_LABELS: Record<string, string> = {
  "5k-10k": "5 000–10 000 USD",
  "10k-20k": "10 000–20 000 USD",
  "20k+": "20 000+ USD",
};

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

// Keep every public locale explicit here. In particular, do not regress English to Polish.
const ALLOWED_LOCALES = new Set(["pl", "en", "uk", "ru", "de", "zh"]);
const ALLOWED_FORM_TYPES = new Set(["contact", "consultation"]);

function attachmentExtension(name: string) {
  return name.toLowerCase().split(".").pop() ?? "";
}

function isAllowedAttachment(file: File) {
  return ALLOWED_ATTACHMENT_EXTENSIONS.has(attachmentExtension(file.name));
}

async function parseIncomingRequest(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.toLowerCase().includes("multipart/form-data")) {
    const formData = await request.formData();
    const body: Record<string, unknown> = {};
    const textKeys = [
      "formType",
      "language",
      "pageUrl",
      "name",
      "company",
      "email",
      "phone",
      "topic",
      "product",
      "quantity",
      "budget",
      "destination",
      "deadline",
      "description",
      "_hp",
    ];
    for (const key of textKeys) {
      const value = formData.get(key);
      if (typeof value === "string") body[key] = value;
    }
    const consent = formData.get("consent");
    body.consent = consent === "true" || consent === "on";
    const attachments = formData
      .getAll("attachments")
      .filter((value): value is File => value instanceof File && value.size > 0);
    return { body, attachments };
  }

  const body = (await request.json()) as Record<string, unknown>;
  return { body, attachments: [] as File[] };
}

function isCompleteQualifiedApplication(input: {
  formType: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  product: string;
  quantity: string;
  budget: string;
  destination: string;
  deadline: string;
  description: string;
}) {
  if (input.formType !== "contact") return false;
  return [
    input.name,
    input.email,
    input.phone,
    input.topic,
    input.product,
    input.quantity,
    input.budget,
    input.destination,
    input.deadline,
    input.description,
  ].every((value) => value.trim().length > 0);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  let files: File[];
  try {
    ({ body, attachments: files } = await parseIncomingRequest(request));
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (body._hp) return NextResponse.json({ success: true });

  if (files.length > MAX_ATTACHMENTS) {
    return NextResponse.json({ error: "too_many_attachments" }, { status: 422 });
  }
  const totalAttachmentBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalAttachmentBytes > MAX_ATTACHMENTS_TOTAL_BYTES) {
    return NextResponse.json({ error: "attachments_too_large" }, { status: 413 });
  }
  if (files.some((file) => !isAllowedAttachment(file))) {
    return NextResponse.json({ error: "unsupported_attachment" }, { status: 422 });
  }

  const name = str(body.name, 200);
  const email = str(body.email, 254);
  const phone = str(body.phone, 30);
  const company = str(body.company, 200);
  const topic = str(body.topic, 100);
  const product = str(body.product, 300);
  const quantity = str(body.quantity, 200);
  const rawBudget = str(body.budget, 30);
  const budget = BUDGET_LABELS[rawBudget] ?? "";
  const destination = str(body.destination, 300);
  const deadline = str(body.deadline, 200);
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
  if (formType === "contact" && !budget) missing.push("budget");

  if (missing.length > 0) {
    return NextResponse.json({ error: "validation", fields: missing }, { status: 422 });
  }

  if (!process.env.CONTACT_WEBHOOK_URL) {
    console.error("[contact-api] CONTACT_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
  }

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
    product,
    quantity,
    budget,
    destination,
    deadline,
    description,
  };

  let attachments: LeadAttachment[] = [];
  try {
    attachments = await Promise.all(
      files.map(async (file) => ({
        name: file.name.slice(0, 180),
        type: file.type || "application/octet-stream",
        bytes: await file.arrayBuffer(),
      })),
    );
  } catch (error) {
    console.error("[contact-api] Could not read attachments", error);
    return NextResponse.json({ error: "attachment_read_failed" }, { status: 400 });
  }

  try {
    const result = await forwardLeadToWebhook(payload, attachments);
    if (!result.ok) {
      console.error("[contact-api] Webhook responded with", result.status);
      return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
    }

    let projectCreated = false;
    let projectPageId: string | undefined;
    const complete = isCompleteQualifiedApplication({
      formType,
      name,
      email,
      phone,
      topic,
      product,
      quantity,
      budget,
      destination,
      deadline,
      description,
    });

    if (complete && result.leadId) {
      try {
        const project = await createProjectFromQualifiedLead({
          kommoId: result.leadId,
          name: product || topic || `Lead ${result.leadId}`,
          company,
          contactName: name,
          email,
          phone,
          product,
          quantity,
          budget,
          destination,
          deadline,
          description,
        });
        projectCreated = project.created;
        projectPageId = project.pageId;
      } catch (projectError) {
        // CRM delivery is the primary operation. A temporary Notion failure must never lose the lead.
        console.error("[contact-api] Qualified lead project sync failed", projectError);
      }
    }

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      projectCreated,
      projectPageId,
    });
  } catch (err) {
    console.error("[contact-api] Webhook request error", err);
    return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
  }
}
