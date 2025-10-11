import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session || !isSuperAdmin(session.user?.email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }
  const body = await req.json().catch(() => ({} as any));
  const status = body?.status as string | undefined;
  const search = body?.search as string | undefined;
  const where: any = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { clientName: { contains: search, mode: "insensitive" } },
      { id: { contains: search } },
    ];
  }
  const rows = await prisma.arbitration.findMany({ where, orderBy: { createdAt: "desc" } });
  const header = ["id","clientName","type","status","assignedTo","createdAt","updatedAt"];
  const lines = [header.join(",")];
  for (const r of rows) {
    const line = [r.id, r.clientName, r.type, r.status, r.assignedTo || "", r.createdAt.toISOString(), r.updatedAt.toISOString()]
      .map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");
    lines.push(line);
  }
  const csv = lines.join("\n");
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=arbitration_export.csv`,
    },
  });
}
