import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const area = url.searchParams.get("area") || undefined;
  const q = url.searchParams.get("q")?.trim() || "";
  const category = url.searchParams.get("category")?.trim() || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "12", 10), 100);

  const where: any = {};
  if (area) where.area = area;
  const and: any[] = [];
  if (category) and.push({ category });
  if (q) {
    and.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { language: { contains: q, mode: "insensitive" } },
        { date: { contains: q, mode: "insensitive" } },
        { size: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (and.length) (where as any).AND = and;

  const p = prisma as any;
  const [total, rows] = await Promise.all([
    p.regulation.count({ where }),
    p.regulation.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
  ]);

  return NextResponse.json({ data: rows, meta: { page, limit, total } });
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const area = String(form.get("area") || "national-sports");
    const title = String(form.get("title") || "");
    const description = form.get("description") ? String(form.get("description")) : null;
    const category = form.get("category") ? String(form.get("category")) : null;
    const date = form.get("date") ? String(form.get("date")) : null;
    const pages = form.get("pages") ? Number(form.get("pages")) : null;
    const language = form.get("language") ? String(form.get("language")) : null;

    const file = form.get("file") as File | null;
    if (!title || !file) {
      return NextResponse.json({ error: "title and file are required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "regulations");
    await fs.mkdir(uploadsDir, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const filename = `${Date.now()}_${safeName}`;
    const filepath = path.join(uploadsDir, filename);
    await fs.writeFile(filepath, buffer);

    const sizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(1) + " MB";
    const urlPath = `/uploads/regulations/${filename}`;

    const created = await (prisma as any).regulation.create({
      data: {
        area,
        title,
        description: description || undefined,
        category: category || undefined,
        date: date || undefined,
        pages: pages ?? undefined,
        size: sizeMB,
        language: language || undefined,
        url: urlPath,
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Upload failed" }, { status: 500 });
  }
}
