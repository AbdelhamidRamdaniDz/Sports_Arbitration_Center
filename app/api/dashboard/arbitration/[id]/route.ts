import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }
  const id = params.id;
  const item = await prisma.arbitration.findUnique({ where: { id }, include: { documents: true } });
  if (!item) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }
  const id = params.id;
  const body = await req.json().catch(() => ({}));
  const status = body?.status as string | undefined;
  const note = body?.note as string | undefined;
  if (!status) return NextResponse.json({ error: "status_required" }, { status: 400 });
  const updated = await prisma.arbitration.update({ where: { id }, data: { status } });
  // TODO: persist note in a notes table if needed
  return NextResponse.json(updated);
}
