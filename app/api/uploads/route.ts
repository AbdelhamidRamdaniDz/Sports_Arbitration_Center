import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "no_file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadsDir, { recursive: true });

    const ext = (file as any).name ? path.extname((file as any).name) : "";
    const safeExt = ext && ext.length <= 6 ? ext : "";
    const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}${safeExt}`;
    const filepath = path.join(uploadsDir, filename);

    await fs.writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;
    return NextResponse.json({ url }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
