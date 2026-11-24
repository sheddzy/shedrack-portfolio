import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
const FILE_PATH = "src/data/portfolio.json";
const REPO = process.env.GITHUB_REPOSITORY || "sheddzy/shedrack-portfolio";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.GITHUB_TOKEN;
  if (!token) return NextResponse.json({ error: "GITHUB_TOKEN is not configured on the server." }, { status: 503 });
  const result = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    cache: "no-store"
  });
  if (!result.ok) return NextResponse.json({ error: "Could not load portfolio content from GitHub." }, { status: 502 });
  const file = await result.json();
  const content = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
  return NextResponse.json({ content: JSON.parse(content), sha: file.sha });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.GITHUB_TOKEN;
  if (!token) return NextResponse.json({ error: "GITHUB_TOKEN is not configured on the server." }, { status: 503 });
  const body = await request.json().catch(() => null);
  if (!body?.content || typeof body.sha !== "string") return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  const encoded = Buffer.from(JSON.stringify(body.content, null, 2), "utf8").toString("base64");
  const result = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Update portfolio content from admin dashboard", content: encoded, sha: body.sha })
  });
  const payload = await result.json().catch(() => ({}));
  if (!result.ok) return NextResponse.json({ error: payload.message || "GitHub could not save the update." }, { status: result.status });
  return NextResponse.json({ ok: true, commit: payload.commit?.sha });
}
