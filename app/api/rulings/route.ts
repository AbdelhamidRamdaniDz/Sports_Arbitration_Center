import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") ?? undefined
  const sport = searchParams.get("sport") ?? undefined
  const year = searchParams.get("year") ? Number(searchParams.get("year")) : undefined
  const page = Math.max(Number(searchParams.get("page") || 1), 1)
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || 9), 1), 50)

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

  const db = prisma as any
  const total = await db.ruling.count({ where })
  const pages = Math.max(Math.ceil(total / limit), 1)

  const rulings = await db.ruling.findMany({
    where,
    orderBy: { decidedAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      sport: true,
      year: true,
      caseNumber: true,
      summary: true,
      pdfUrl: true,
      decidedAt: true,
    },
  })

  return NextResponse.json({ rulings, total, page, pages, limit })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, sport, year, caseNumber, summary, pdfUrl, decidedAt } = body

    if (!title || !slug || !sport || !year || !caseNumber || !decidedAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = prisma as any
    const created = await db.ruling.create({
      data: {
        title,
        slug,
        sport,
        year: Number(year),
        caseNumber,
        summary: summary ?? null,
        pdfUrl: pdfUrl ?? null,
        decidedAt: new Date(decidedAt),
      },
    })

    return NextResponse.json({ ruling: created }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 })
  }
}
