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
  const status = url.searchParams.get("status") || "";
  const search = url.searchParams.get("search") || "";
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
  const sort = (url.searchParams.get("sort") || "createdAt:desc").toLowerCase();
  const [orderField, orderDirRaw] = sort.split(":");
  const orderBy: any = { [orderField === "createdat" ? "createdAt" : orderField || "createdAt"]: orderDirRaw === "asc" ? "asc" : "desc" };

  const where: any = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { id: { contains: search, mode: "insensitive" } },
      { clientName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [total, data] = await Promise.all([
    prisma.mediation.count({ where }),
    prisma.mediation.findMany({
      where,
      orderBy,
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true,
        clientName: true,
        email: true,
        status: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        documents: { select: { id: true } },
      },
    }),
  ]);

  const mapped = data.map((r: any) => ({
    id: r.id,
    name: r.clientName,
    email: r.email,
    status: r.status,
    description: r.description ?? null,
    createdAt: r.createdAt.toISOString(),
    documents: r.documents?.map((d: any) => ({ id: d.id })) ?? [],
  }));

  return NextResponse.json({
    data: mapped,
    meta: { page, limit, total },
  });
}
