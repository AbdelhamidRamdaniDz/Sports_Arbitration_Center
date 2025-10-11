import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { promises as fs } from "fs";
import path from "path";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }

  const arbitrationId = params.id;
  const form = await req.formData();
  const files = form.getAll("files") as File[];
  if (!files || files.length === 0) {
    return NextResponse.json({ error: "no_files" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "arbitration", arbitrationId);
  await fs.mkdir(uploadDir, { recursive: true });

  const saved: any[] = [];
  for (const f of files) {
    const bytes = await f.arrayBuffer();
    const buffer = Buffer.from(bytes);
    if (buffer.byteLength > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "file_too_large" }, { status: 400 });
    }
    const ext = path.extname(f.name).toLowerCase();
    const allowed = [".pdf", ".docx", ".png", ".jpg", ".jpeg"];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: "invalid_type" }, { status: 400 });
    }
    const fileName = `${Date.now()}-${f.name}`.replace(/\s+/g, "-");
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    const publicUrl = path.posix.join("/uploads/arbitration", arbitrationId, fileName);
    const doc = await prisma.arbitrationDocument.create({
      data: {
        arbitrationId,
        name: f.name,
        url: publicUrl,
      },
    });
    saved.push(doc);
  }

  return NextResponse.json({ ok: true, documents: saved });
}
