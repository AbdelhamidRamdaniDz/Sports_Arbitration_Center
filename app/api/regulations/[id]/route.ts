import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const item = await (prisma as any).regulation.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Delete file from disk if exists
    if (item.url && item.url.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", item.url.replace(/^\/+/, ""));
      try { await fs.unlink(filePath); } catch {}
    }

    await (prisma as any).regulation.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Delete failed" }, { status: 500 });
  }
}
