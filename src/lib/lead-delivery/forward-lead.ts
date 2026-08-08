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
  product: string;
  quantity: string;
  budget: string;
  destination: string;
  deadline: string;
  description: string;
};

export type LeadAttachment = {
  name: string;
  type: string;
  bytes: ArrayBuffer;
};

export type LeadDeliveryResult =
  | { ok: true; leadId?: number }
  | { ok: false; status: number };

/**
 * Forwards a validated lead to bot_lead (`POST /webhook/website-form`).
 * Uses JSON for normal submissions and multipart/form-data when attachments
 * are present. Requires CONTACT_WEBHOOK_URL and CONTACT_WEBHOOK_SECRET.
 */
export async function forwardLeadToWebhook(
  payload: LeadPayload,
  attachments: LeadAttachment[] = [],
): Promise<LeadDeliveryResult> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, status: 503 };
  }

  const headers: Record<string, string> = {};
  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  if (secret) {
    headers["X-Website-Lead-Secret"] = secret;
  }

  let body: BodyInit;
  if (attachments.length > 0) {
    const formData = new FormData();
    formData.set("payload", JSON.stringify(payload));
    for (const attachment of attachments) {
      formData.append(
        "files",
        new Blob([attachment.bytes], {
          type: attachment.type || "application/octet-stream",
        }),
        attachment.name,
      );
    }
    body = formData;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body,
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
