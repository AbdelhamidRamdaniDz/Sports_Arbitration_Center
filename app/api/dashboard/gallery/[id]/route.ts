import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  const id = params.id;
  const body = await req.json().catch(() => ({}));
  const { caption } = body || {};
  const updated = await prisma.photo.update({ where: { id }, data: { caption } });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  const id = params.id;
  const photo = await prisma.photo.findUnique({ where: { id } });
  if (!photo) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (photo.url) {
    const rel = photo.url.replace(/^\//, "");
    const filePath = path.join(process.cwd(), "public", rel);
    try { await fs.unlink(filePath); } catch {}
  }
  await prisma.photo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
