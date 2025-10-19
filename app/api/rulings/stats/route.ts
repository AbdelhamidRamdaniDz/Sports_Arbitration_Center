import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") ?? undefined
  const sport = searchParams.get("sport") ?? undefined
  const year = searchParams.get("year") ? Number(searchParams.get("year")) : undefined

  const where: any = {}
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { summary: { contains: q, mode: "insensitive" } },
      { caseNumber: { contains: q, mode: "insensitive" } },
      { sport: { contains: q, mode: "insensitive" } },
    ]
  }
  if (sport) where.sport = { equals: sport, mode: "insensitive" }
  if (year) where.year = year

  const [total, thisYear, sports, years] = await Promise.all([
    prisma.ruling.count({ where }),
    prisma.ruling.count({ where: { ...where, year: new Date().getFullYear() } }),
    prisma.ruling.findMany({ where, select: { sport: true }, distinct: ["sport"] }),
    prisma.ruling.findMany({ where, select: { year: true }, distinct: ["year"], orderBy: { year: "desc" } }),
  ])

  return NextResponse.json({
    total,
    thisYear,
    sportsCount: sports.length,
    yearsCount: years.length,
  })
}
