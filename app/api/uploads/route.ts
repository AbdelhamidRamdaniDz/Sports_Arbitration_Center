import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "no_file" }, { status: 400 });
    }

    const originalName = (file as any).name || "upload";
    const extMatch = originalName.toString().match(/\.[a-zA-Z0-9]{1,6}$/);
    const ext = extMatch ? extMatch[0] : "";
    const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`;

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ message: "missing_blob_token" }, { status: 500 });
    }

    const blob = await put(`uploads/${filename}`, file, {
      access: "public",
      token,
    });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
