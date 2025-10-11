import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }

  const status = url.searchParams.get("status") || undefined;
  const search = url.searchParams.get("search") || undefined;
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100);
  const sort = url.searchParams.get("sort") || "-createdAt"; // - for desc

  const where: any = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { clientName: { contains: search, mode: "insensitive" } },
      { id: { contains: search } },
    ];
  }

  const orderBy: any = {};
  if (sort.startsWith("-")) {
    orderBy[sort.slice(1)] = "desc";
  } else {
    orderBy[sort] = "asc";
  }

  const [total, rows] = await Promise.all([
    prisma.arbitration.count({ where }),
    prisma.arbitration.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        documents: true,
      },
    }),
  ]);

  return NextResponse.json({
    data: rows,
    meta: { page, limit, total },
  });
}
