import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || undefined;
    const role = searchParams.get("role")?.trim() || undefined;
    const city = searchParams.get("city")?.trim() || undefined;
    const status = searchParams.get("status")?.trim() || undefined;

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ];
    }
    if (role) where.role = role as any;
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (status) where.status = status;

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: ({
        id: true,
        name: true,
        email: true,
        role: true,
        city: true,
        experience: true,
        specialization: true,
        languages: true,
        phone: true,
        education: true,
        certifications: true,
        status: true,
        createdAt: true,
      } as any),
    });

    return NextResponse.json({ data: users });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
