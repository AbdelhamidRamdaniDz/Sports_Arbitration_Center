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

  const area = url.searchParams.get("area") || undefined; // sports | commercial
  const search = url.searchParams.get("search") || undefined;
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100);
  const sort = url.searchParams.get("sort") || "-createdAt"; // - for desc

  const where: any = {};
  if (area && area !== "all") where.area = area;
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { disputeTitle: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy: any = {};
  if (sort.startsWith("-")) {
    orderBy[sort.slice(1)] = "desc";
  } else {
    orderBy[sort] = "asc";
  }

  const [total, rows] = await Promise.all([
    prisma.arbitrationRequest.count({ where }),
    prisma.arbitrationRequest.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return NextResponse.json({
    data: rows,
    meta: { page, limit, total },
  });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }

  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

  try {
    await prisma.arbitrationRequest.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  }
}
