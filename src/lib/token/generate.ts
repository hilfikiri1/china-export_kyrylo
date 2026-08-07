import { randomBytes } from "crypto";

const DEFAULT_PORTAL_ORIGIN = "https://china-exportkyrylo.vercel.app";

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
 * Client links must always point to the public portal, even when an employee
 * creates the project from a local or preview deployment.
 */
export function buildProjectAccessUrl(token: string): string {
  const origin =
    process.env.BBS_PORTAL_SITE_URL?.trim().replace(/\/$/, "") ||
    DEFAULT_PORTAL_ORIGIN;
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
