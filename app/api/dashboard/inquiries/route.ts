import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });

  const data = [
    { id: "inq-001", name: "خالد", email: "khaled@example.com", subject: "سؤال حول التحكيم", type: "تحكيم", body: "ما هي الرسوم؟", createdAt: new Date().toISOString(), replies: [] },
    { id: "inq-002", name: "مها", email: "maha@example.com", subject: "وساطة", type: "وساطة", body: "كيف أحدد جلسة؟", createdAt: new Date().toISOString(), replies: [{ id: "rep-1", message: "نقوم بالتواصل لتحديد موعد" }] },
  ];

  return NextResponse.json({ data });
}
