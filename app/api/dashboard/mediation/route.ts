import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "";

  const data = [
    { id: "med-001", name: "محمد علي", email: "moh@example.com", status: "new", createdAt: new Date().toISOString(), description: "نزاع وساطة تجاري", documents: [] },
    { id: "med-002", name: "سارة", email: "sara@example.com", status: "in_progress", createdAt: new Date().toISOString(), description: "وساطة رياضية", documents: [] },
  ].filter((r) => (status ? r.status === status : true));

  return NextResponse.json({ data });
}
