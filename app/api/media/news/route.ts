import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || undefined;
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100);

  const where: any = {};
  if (search) where.title = { contains: search, mode: "insensitive" };

  const [total, rows] = await Promise.all([
    prisma.news.count({ where }),
    prisma.news.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
  ]);

  return NextResponse.json({ data: rows, meta: { page, limit, total } });
}
