export type LeadPayload = {
  language: string;
  pageUrl: string;
  formType: string;
  submittedAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  description: string;
};

/**
 * Forwards a validated lead to bot_lead (`POST /webhook/website-form`).
 * Requires CONTACT_WEBHOOK_URL and CONTACT_WEBHOOK_SECRET.
 */
export async function forwardLeadToWebhook(
  payload: LeadPayload,
): Promise<{ ok: true } | { ok: false; status: number }> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, status: 503 };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  if (secret) {
    headers["X-Website-Lead-Secret"] = secret;
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return { ok: false, status: res.status };
  }

  return { ok: true };
}
