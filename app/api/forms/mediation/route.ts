import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Basic shape mapping from the public form
    const {
      applicantName,
      applicantEmail,
      applicantPhone, // not stored currently
      otherPartyName, // not stored currently
      otherPartyEmail, // not stored currently
      otherPartyPhone, // not stored currently
      disputeType, // not stored currently
      disputeCategory, // not stored currently
      disputeDescription,
      preferredDate, // not stored currently
      preferredTime, // not stored currently
      sessionType, // not stored currently
      urgentCase, // not stored currently
      allPartiesAgree,
      agreesToTerms,
    } = body || {};

    // Minimal validations (frontend already validates)
    if (!applicantName || !applicantEmail || !disputeDescription) {
      return NextResponse.json({ error: "missing_required_fields" }, { status: 400 });
    }
    if (allPartiesAgree !== true || agreesToTerms !== true) {
      return NextResponse.json({ error: "agreements_required" }, { status: 400 });
    }

    const created = await prisma.mediation.create({
      data: {
        clientName: String(applicantName).trim(),
        email: String(applicantEmail).trim().toLowerCase(),
        status: "new",
        description: String(disputeDescription).trim(),
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ id: created.id, createdAt: created.createdAt }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "server_error", message: err?.message || "" }, { status: 500 });
  }
}
