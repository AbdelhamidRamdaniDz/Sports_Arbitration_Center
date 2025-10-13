import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: "invalid_json" }, { status: 400 })

    const name = String(body.name || "").trim()
    const email = String(body.email || "").trim()
    const phone = body.phone ? String(body.phone).trim() : null
    const topic = String(body.topic || "general").trim()
    const message = String(body.message || "").trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "missing_required_fields" }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: {
        firstName: name,
        email,
        phone: phone || undefined,
        subject: topic,
        message,
        preferred: null,
      }
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
