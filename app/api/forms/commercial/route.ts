import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: "invalid_json" }, { status: 400 })

    const required = {
      fullName: String(body.fullName || "").trim(),
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      disputeType: String(body.disputeType || "").trim(),
      disputeTitle: String(body.disputeTitle || "").trim(),
      disputeDescription: String(body.disputeDescription || "").trim(),
    }
    if (!required.fullName || !required.email || !required.phone || !required.disputeType || !required.disputeTitle || !required.disputeDescription) {
      return NextResponse.json({ error: "missing_required_fields" }, { status: 400 })
    }

    const created = await prisma.arbitrationRequest.create({
      data: {
        area: "commercial",
        applicantType: String(body.applicantType || ""),
        fullName: required.fullName,
        nationalId: String(body.nationalId || ""),
        email: required.email,
        phone: required.phone,
        address: String(body.address || ""),
        organizationName: body.organizationName || null,
        organizationRegistration: body.organizationRegistration || null,
        representativeName: body.representativeName || null,
        representativePosition: body.representativePosition || null,
        disputeType: required.disputeType,
        disputeCategory: String(body.disputeCategory || ""),
        disputeTitle: required.disputeTitle,
        disputeDescription: required.disputeDescription,
        disputeValue: body.disputeValue || null,
        disputeDate: String(body.disputeDate || ""),
        otherPartyName: String(body.otherPartyName || ""),
        otherPartyType: String(body.otherPartyType || ""),
        otherPartyContact: body.otherPartyContact || null,
        otherPartyAddress: String(body.otherPartyAddress || ""),
        arbitratorPreference: String(body.arbitratorPreference || ""),
        preferredArbitrator: body.preferredArbitrator || null,
        excludedArbitrator: body.excludedArbitrator || null,
        arbitrationLanguage: String(body.arbitrationLanguage || ""),
        urgentCase: Boolean(body.urgentCase ?? false),
        hasLegalRepresentation: Boolean(body.hasLegalRepresentation ?? false),
        lawyerName: body.lawyerName || null,
        lawyerLicense: body.lawyerLicense || null,
        lawyerContact: body.lawyerContact || null,
        documentsDescription: String(body.documentsDescription || ""),
        agreesToTerms: Boolean(body.agreesToTerms ?? false),
        agreesToFees: Boolean(body.agreesToFees ?? false),
        confirmAccuracy: Boolean(body.confirmAccuracy ?? false),
      }
    })

    return NextResponse.json({ ok: true, id: created.id })
  } catch (err) {
    console.error("commercial_submit_error", err)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
