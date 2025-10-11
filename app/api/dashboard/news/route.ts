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

  const url = new URL(req.url);
  const search = url.searchParams.get("search") || undefined;
  const category = url.searchParams.get("category") || undefined;
  const urgent = url.searchParams.get("urgent");

  const where: any = {};
  if (search) where.title = { contains: search, mode: "insensitive" };
  if (category) where.category = category;
  if (urgent === "true") where.urgent = true;
  if (urgent === "false") where.urgent = false;

  const data = await prisma.news.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const { title, slug, excerpt, body: content, mainImage, category, urgent } = body || {};
  if (!title || !slug) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  const created = await prisma.news.create({ data: { title, slug, excerpt, body: content, mainImage, category, urgent: !!urgent } });
  return NextResponse.json(created);
}
