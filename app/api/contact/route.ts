import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { firstName, lastName, email, phone, subject, message, preferred } = body || {};
    if (!email || !message) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    const created = await prisma.contactMessage.create({
      data: { firstName, lastName, email, phone, subject, message, preferred },
    });
    return NextResponse.json({ ok: true, data: created });
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
