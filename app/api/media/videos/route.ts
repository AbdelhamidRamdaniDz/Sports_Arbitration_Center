import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "9", 10), 100);
  const type = url.searchParams.get("type") || undefined; // youtube | mp4

  const where: any = {};
  if (type) where.type = type;

  const [total, rows] = await Promise.all([
    prisma.video.count({ where }),
    prisma.video.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
  ]);

  return NextResponse.json({ data: rows, meta: { page, limit, total } });
}
