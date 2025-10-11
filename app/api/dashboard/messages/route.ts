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

  const data = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data });
}
