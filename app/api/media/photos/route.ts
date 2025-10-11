import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "12", 10), 100);

  const [total, rows] = await Promise.all([
    prisma.photo.count(),
    prisma.photo.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
  ]);

  return NextResponse.json({ data: rows, meta: { page, limit, total } });
}
