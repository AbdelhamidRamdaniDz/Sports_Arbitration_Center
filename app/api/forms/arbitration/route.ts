import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: "invalid_json" }, { status: 400 })

    // Basic required fields from the public form
    const fullName = String(body.fullName || "").trim()
    const email = String(body.email || "").trim()
    const phone = String(body.phone || "").trim()
    const disputeType = String(body.disputeType || "").trim()
    const disputeCategory = String(body.disputeCategory || "").trim()
    const disputeTitle = String(body.disputeTitle || "").trim()
    const disputeDescription = String(body.disputeDescription || "").trim()

    if (!fullName || !email || !phone || !disputeType || !disputeTitle || !disputeDescription) {
      return NextResponse.json({ error: "missing_required_fields" }, { status: 400 })
    }

    // Compose a readable description that includes the full payload for reviewers
    const lines: string[] = []
    lines.push(`عنوان: ${disputeTitle}`)
    lines.push(`النوع: ${disputeType}${disputeCategory ? ` / ${disputeCategory}` : ""}`)
    lines.push(`الوصف:\n${disputeDescription}`)
    lines.push("")
    lines.push("— معلومات مقدم الطلب —")
    lines.push(`الاسم: ${fullName}`)
    lines.push(`البريد: ${email}`)
    lines.push(`الهاتف: ${phone}`)
    if (body.applicantType) lines.push(`نوع المقدم: ${body.applicantType}`)
    if (body.address) lines.push(`العنوان: ${body.address}`)
    if (body.organizationName) lines.push(`المؤسسة: ${body.organizationName}`)
    if (body.organizationRegistration) lines.push(`السجل: ${body.organizationRegistration}`)
    if (body.representativeName) lines.push(`المفوض: ${body.representativeName}`)
    if (body.representativePosition) lines.push(`منصب المفوض: ${body.representativePosition}`)
    lines.push("")
    lines.push("— معلومات الطرف الآخر —")
    if (body.otherPartyName) lines.push(`الاسم: ${body.otherPartyName}`)
    if (body.otherPartyType) lines.push(`النوع: ${body.otherPartyType}`)
    if (body.otherPartyContact) lines.push(`الاتصال: ${body.otherPartyContact}`)
    if (body.otherPartyAddress) lines.push(`العنوان: ${body.otherPartyAddress}`)
    lines.push("")
    lines.push("— تفضيلات التحكيم —")
    if (body.arbitratorPreference) lines.push(`تفضيل: ${body.arbitratorPreference}`)
    if (body.preferredArbitrator) lines.push(`محكم مفضل: ${body.preferredArbitrator}`)
    if (body.excludedArbitrator) lines.push(`محكم مستبعد: ${body.excludedArbitrator}`)
    if (body.arbitrationLanguage) lines.push(`اللغة: ${body.arbitrationLanguage}`)
    if (typeof body.urgentCase === "boolean") lines.push(`القضية مستعجلة: ${body.urgentCase ? "نعم" : "لا"}`)
    if (typeof body.hasLegalRepresentation === "boolean") lines.push(`يمتلك تمثيلاً قانونياً: ${body.hasLegalRepresentation ? "نعم" : "لا"}`)
    if (body.lawyerName) lines.push(`المحامي: ${body.lawyerName}`)
    if (body.lawyerLicense) lines.push(`رخصة المحامي: ${body.lawyerLicense}`)
    if (body.lawyerContact) lines.push(`اتصال المحامي: ${body.lawyerContact}`)
    if (body.documentsDescription) {
      lines.push("")
      lines.push("— الوثائق —")
      lines.push(String(body.documentsDescription))
    }

    const description = lines.join("\n")

    const created = await prisma.arbitration.create({
      data: {
        clientName: fullName,
        type: disputeCategory ? `${disputeType}:${disputeCategory}` : disputeType,
        status: "new",
        description,
      },
    })

    return NextResponse.json({ ok: true, id: created.id })
  } catch (err) {
    console.error("arbitration_submit_error", err)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
