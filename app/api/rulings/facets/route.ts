import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const [sports, years] = await Promise.all([
    prisma.ruling.findMany({ select: { sport: true }, distinct: ["sport"], orderBy: { sport: "asc" } }),
    prisma.ruling.findMany({ select: { year: true }, distinct: ["year"], orderBy: { year: "desc" } }),
  ])

  return NextResponse.json({
    sports: sports.map((s: { sport: string | null }) => s.sport as string).filter(Boolean),
    years: years.map((y: { year: number | null }) => y.year).filter((y): y is number => typeof y === "number"),
  })
}
