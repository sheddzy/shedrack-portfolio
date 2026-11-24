import { NextResponse } from "next/server";
import { adminCookie, createAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret || !adminEmail) {
    return NextResponse.json({ error: "Admin access is not configured on the server." }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  if (typeof body.email !== "string" || body.email.trim().toLowerCase() !== adminEmail || typeof body.password !== "string" || body.password !== password) {
    return NextResponse.json({ error: "Invalid admin email or password." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, createAdminToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict",
    path: "/", maxAge: adminCookie.maxAge
  });
  return response;
}
