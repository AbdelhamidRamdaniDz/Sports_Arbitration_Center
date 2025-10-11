import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  const data = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const { title, type, url, thumbnail } = body || {};
  if (!title || !type || !url) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  const created = await prisma.video.create({ data: { title, type, url, thumbnail } });
  return NextResponse.json(created);
}
