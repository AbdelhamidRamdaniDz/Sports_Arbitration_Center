import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export const runtime = "nodejs";

export async function DELETE(_req: Request, { params }: { params: { id: string; docId: string } }) {
  const session = await getServerSession(authOptions as any);
  if (!session || !isSuperAdmin(session.user?.email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }
  const { id, docId } = params;
  const doc = await prisma.arbitrationDocument.findUnique({ where: { id: docId } });
  if (!doc || doc.arbitrationId !== id) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (doc.url) {
    const rel = doc.url.replace(/^\//, "");
    const filePath = path.join(process.cwd(), "public", rel);
    try { await fs.unlink(filePath); } catch {}
  }
  await prisma.arbitrationDocument.delete({ where: { id: docId } });
  return NextResponse.json({ ok: true });
}
