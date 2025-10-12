import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  const data = await prisma.photo.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });

  try {
    const form = await req.formData();
    const files = form.getAll("files") as File[];
    if (!files || files.length === 0) return NextResponse.json({ error: "no_files" }, { status: 400 });

    const allowed = [".png", ".jpg", ".jpeg", ".webp"];
    const created: any[] = [];
    for (const f of files) {
      const bytes = await f.arrayBuffer();
      const buffer = Buffer.from(bytes);
      if (buffer.byteLength > 8 * 1024 * 1024) return NextResponse.json({ error: "file_too_large" }, { status: 400 });

      const nameLower = f.name.toLowerCase();
      const isAllowed = allowed.some(ext => nameLower.endsWith(ext));
      if (!isAllowed) return NextResponse.json({ error: "invalid_type" }, { status: 400 });

      const fileName = `${Date.now()}-${f.name}`.replace(/\s+/g, "-");
      const { url } = await put(fileName, buffer, {
        access: "public",
        contentType: (f as any).type || undefined,
      });

      const photo = await prisma.photo.create({ data: { url, caption: f.name } });
      created.push(photo);
    }

    return NextResponse.json({ ok: true, data: created });
  } catch (err: any) {
    return NextResponse.json({ error: "upload_failed", details: err?.message ?? String(err) }, { status: 500 });
  }
}

