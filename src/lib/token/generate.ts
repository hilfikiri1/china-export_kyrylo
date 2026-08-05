import { randomBytes } from "crypto";

/**
 * Server-side only. Generates a cryptographically secure, URL-safe token
 * with ≥128 bits of entropy (32 hex chars = 128 bits).
 * Never call from client components.
 */
export function generateProjectAccessToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Builds the full client portal URL for a given token.
 * Uses NEXT_PUBLIC_SITE_URL in production, localhost fallback in dev.
 */
export function buildProjectAccessUrl(token: string): string {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";
  return `${origin}/pl/panel/${token}`;
}

/**
 * Prepares metadata for a future project record.
 * Persistence (Notion / DB) is handled separately.
 */
export type ProjectAccessRecord = {
  token: string;
  accessUrl: string;
  projectNumber?: string;
  active: boolean;
  createdAt: string;
  expiresAt?: string;
};

export function createProjectAccessRecord(
  projectNumber?: string,
): ProjectAccessRecord {
  const token = generateProjectAccessToken();
  return {
    token,
    accessUrl: buildProjectAccessUrl(token),
    projectNumber,
    active: true,
    createdAt: new Date().toISOString(),
  };
}
