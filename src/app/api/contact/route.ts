import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { forwardLeadToWebhook } from "@/lib/lead-delivery/forward-lead";

// Simple in-memory rate limiter (per IP, resets per process restart)
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

  // Honeypot: bots fill this hidden field, humans don't see it
  if (body._hp) {
    // Fake success to confuse scrapers
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const language = typeof body.language === "string" ? body.language : "pl";
  const pageUrl = typeof body.pageUrl === "string" ? body.pageUrl : "";
  const formType =
    typeof body.formType === "string" ? body.formType : "contact";
  const consent = body.consent === true;

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!email || !isValidEmail(email)) missing.push("email");
  if (!consent) missing.push("consent");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "validation", fields: missing },
      { status: 422 },
    );
  }

  if (!process.env.CONTACT_WEBHOOK_URL) {
    console.error("[contact-api] CONTACT_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
  }

  const payload = {
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

  try {
    const result = await forwardLeadToWebhook(payload);
    if (!result.ok) {
      console.error("[contact-api] Webhook responded with", result.status);
      return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact-api] Webhook request error", err);
    return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
