import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
const REPO = process.env.GITHUB_REPOSITORY || "sheddzy/shedrack-portfolio";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.GITHUB_TOKEN;
  if (!token) return NextResponse.json({ error: "GITHUB_TOKEN is not configured on the server." }, { status: 503 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
  const extension = extensions[file.type];
  if (!extension) return NextResponse.json({ error: "Use a JPG, PNG, WEBP or GIF image." }, { status: 415 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 413 });
  const path = `public/uploads/${randomUUID()}.${extension}`;
  const encoded = Buffer.from(await file.arrayBuffer()).toString("base64");
  const result = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Upload portfolio image from admin dashboard", content: encoded })
  });
  const payload = await result.json().catch(() => ({}));
  if (!result.ok) return NextResponse.json({ error: payload.message || "Image upload failed." }, { status: result.status });
  return NextResponse.json({ ok: true, url: `/uploads/${path.split("/").pop()}` });
}
