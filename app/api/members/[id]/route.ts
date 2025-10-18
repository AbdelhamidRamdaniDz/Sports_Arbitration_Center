import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const {
      name,
      email,
      role,
      image,
      city,
      experience,
      specialization,
      languages,
      phone,
      education,
      certifications,
      status,
    } = body || {};

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(role !== undefined && { role }),
        ...(image !== undefined && { image }),
        ...(city !== undefined && { city }),
        ...(experience !== undefined && { experience }),
        ...(specialization !== undefined && { specialization }),
        ...(languages !== undefined && { languages }),
        ...(phone !== undefined && { phone }),
        ...(education !== undefined && { education }),
        ...(certifications !== undefined && { certifications }),
        ...(status !== undefined && { status }),
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({ id: user.id });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
