import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import arbitrators from "@/data/arbitrators.json";

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
        image: true,
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
    // Fallback: serve static arbitrators data when DB is unreachable
    try {
      const fallback = (arbitrators as any[])
        .filter((a) => {
          // basic filtering to respect query params when possible
          if (where?.role && where.role !== "arbitrator") return false;
          if (where?.city?.contains && !String(a.location ?? "").includes(where.city.contains)) return false;
          if (where?.OR && Array.isArray(where.OR) && where.OR.length > 0) {
            const q = where.OR[0]?.name?.contains || where.OR[1]?.email?.contains;
            if (q) {
              const hay = `${a.name} ${a.email}`.toLowerCase();
              if (!hay.includes(String(q).toLowerCase())) return false;
            }
          }
          if (where?.status && where.status !== "active") return false;
          return true;
        })
        .map((a) => ({
          id: a.id,
          name: a.name,
          email: a.email,
          role: "arbitrator",
          image: a.image,
          city: a.location,
          // attempt to parse leading integer from experience string like "20 سنة"
          experience: typeof a.experience === "string" ? parseInt(a.experience) || null : a.experience ?? null,
          specialization: a.specialization,
          languages: a.languages ?? [],
          phone: a.phone ?? null,
          education: a.education ?? null,
          certifications: a.certifications ?? [],
          status: "active",
          createdAt: new Date().toISOString(),
        }));

      return NextResponse.json({ data: fallback });
    } catch {
      return NextResponse.json({ message: "database_unreachable" }, { status: 500 });
    }
  }
}
