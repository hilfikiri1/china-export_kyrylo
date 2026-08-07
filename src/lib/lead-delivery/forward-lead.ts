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

export type LeadDeliveryResult =
  | { ok: true; leadId?: number }
  | { ok: false; status: number };

/**
 * Forwards a validated lead to bot_lead (`POST /webhook/website-form`).
 * Requires CONTACT_WEBHOOK_URL and CONTACT_WEBHOOK_SECRET.
 */
export async function forwardLeadToWebhook(
  payload: LeadPayload,
): Promise<LeadDeliveryResult> {
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

  const responseBody = (await res.json().catch(() => null)) as
    | { lead_id?: unknown }
    | null;
  const leadId = responseBody?.lead_id;
  return {
    ok: true,
    leadId:
      typeof leadId === "number" && Number.isSafeInteger(leadId) && leadId > 0
        ? leadId
        : undefined,
  };
}
