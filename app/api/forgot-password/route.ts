import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "البريد الإلكتروني مطلوب" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "البريد الإلكتروني غير مسجل" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save reset token to database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: "إعادة تعيين كلمة المرور",
      html: `
        <div dir="rtl">
          <h1>إعادة تعيين كلمة المرور</h1>
          <p>لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك.</p>
          <p>لإعادة تعيين كلمة المرور، يرجى النقر على الرابط أدناه:</p>
          <a href="${resetUrl}">إعادة تعيين كلمة المرور</a>
          <p>هذا الرابط صالح لمدة 24 ساعة فقط.</p>
          <p>إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني.</p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
    });
  } catch (error) {
    console.error("[FORGOT_PASSWORD]", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة طلبك" },
      { status: 500 }
    );
  }
}