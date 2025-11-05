import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "6", 10), 50);
  const search = url.searchParams.get("search") || undefined;

  const categories = ["press", "بيان", "بيان صحفي", "Press", "PressRelease"]; // simple filter list

  const where: any = {
    category: { in: categories },
  };
  if (search) where.title = { contains: search, mode: "insensitive" };

  const [total, rows] = await Promise.all([
    prisma.news.count({ where }),
    prisma.news.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
  ]);

  const data = rows.map((n) => ({
    id: n.id,
    title: n.title,
    excerpt: n.excerpt || "",
    date: (n as any).createdAt || (n as any).date || new Date().toISOString(),
    category: n.category || "بيان",
    views: (n as any).views || 0,
  }));

  return NextResponse.json({ data, meta: { page, limit, total } });
}
