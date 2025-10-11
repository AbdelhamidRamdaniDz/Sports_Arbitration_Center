import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function isSuperAdmin(email?: string | null) {
  const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
  return email?.trim().toLowerCase() === envAdmin;
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !isSuperAdmin((token as any).email)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });

  const data = {
    account: { name: "Super Admin", email: (token as any).email || "admin@gmail.com", phone: "+213-555-000" },
    site: { siteTitle: "مركز التحكيم والوساطة", siteDescription: "منصة لإدارة التحكيم والوساطة الرياضية", contactEmail: "contact@example.com", logoUrl: "/placeholder.svg?height=64&width=64", socials: { facebook: "", x: "", instagram: "" } },
  };
  return NextResponse.json({ data });
}
