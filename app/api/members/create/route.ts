import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      role,
      city,
      experience,
      specialization,
      languages,
      phone,
      education,
      certifications,
    } = body || {};

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "invalid" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ message: "exists" }, { status: 409 });
    }

    const hashed = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role,
        city: city || null,
        experience: typeof experience === "number" ? experience : null,
        specialization: specialization || null,
        languages: Array.isArray(languages) ? languages : [],
        phone: phone || null,
        education: education || null,
        certifications: Array.isArray(certifications) ? certifications : [],
        status: "active",
      },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
