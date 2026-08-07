import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "bbs_admin_session";
const SESSION_VERSION = "v1";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const MIN_PASSWORD_LENGTH = 16;
const MAX_PASSWORD_LENGTH = 256;

function configuredPassword() {
  return process.env.BBS_ADMIN_PASSWORD ?? "";
}

function constantTimeEqual(left: string, right: string) {
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function sessionSignature(expiresAt: number, password: string) {
  return createHmac("sha256", password)
    .update(`${SESSION_VERSION}:${expiresAt}`)
    .digest("hex");
}

function createSessionToken(expiresAt: number, password: string) {
  return `${SESSION_VERSION}.${expiresAt}.${sessionSignature(expiresAt, password)}`;
}

function verifySessionToken(token: string, password: string) {
  const [version, expiresRaw, signature, ...extra] = token.split(".");
  if (extra.length || version !== SESSION_VERSION || !expiresRaw || !signature) return false;
  if (!/^\d{13}$/.test(expiresRaw) || !/^[a-f0-9]{64}$/.test(signature)) return false;

  const expiresAt = Number(expiresRaw);
  const now = Date.now();
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= now) return false;
  if (expiresAt > now + SESSION_MAX_AGE_SECONDS * 1000 + 60_000) return false;

  return constantTimeEqual(signature, sessionSignature(expiresAt, password));
}

export function isBbsAuthConfigured() {
  const password = configuredPassword();
  return password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH;
}

export function verifyBbsAdminPassword(candidate: string) {
  const password = configuredPassword();
  if (!isBbsAuthConfigured() || candidate.length > MAX_PASSWORD_LENGTH) return false;
  return constantTimeEqual(candidate, password);
}

export async function hasBbsAdminSession() {
  if (process.env.NODE_ENV === "development") return true;

  const session = (await cookies()).get(COOKIE_NAME)?.value;
  const password = configuredPassword();
  if (!isBbsAuthConfigured()) return false;
  return session ? verifySessionToken(session, password) : false;
}

export async function createBbsAdminSession() {
  const password = configuredPassword();
  if (!isBbsAuthConfigured()) throw new Error("B&BS admin authentication is not configured.");

  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(expiresAt, password), {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
    priority: "high",
  });
}

export async function clearBbsAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
