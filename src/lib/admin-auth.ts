import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "shedrack_portfolio_admin";
const MAX_AGE = 60 * 60 * 12;

function signature(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminToken() {
  const issued = String(Date.now());
  return issued + "." + signature(issued);
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;
  const [issued, supplied] = token.split(".");
  if (!issued || !supplied || !/^\d+$/.test(issued)) return false;
  const age = Date.now() - Number(issued);
  if (age < 0 || age > MAX_AGE * 1000) return false;
  const expected = signature(issued);
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  const jar = await cookies();
  return isValidAdminToken(jar.get(COOKIE_NAME)?.value);
}

export const adminCookie = { name: COOKIE_NAME, maxAge: MAX_AGE };
