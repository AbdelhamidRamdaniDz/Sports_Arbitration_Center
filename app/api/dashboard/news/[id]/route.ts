import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  const id = params.id;
  const body = await req.json().catch(() => ({}));
  const { title, slug, excerpt, body: content, mainImage, category, urgent } = body || {};
  const updated = await prisma.news.update({ where: { id }, data: { title, slug, excerpt, body: content, mainImage, category, urgent } });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  const id = params.id;
  await prisma.news.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
