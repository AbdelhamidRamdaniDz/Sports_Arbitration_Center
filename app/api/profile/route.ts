import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  if (!token || !token.email) {
    return NextResponse.json(
      { message: "يجب تسجيل الدخول للوصول إلى هذه الصفحة" },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: token.email },
      // 🔑 تم حذف 'phone' و 'avatar' لتجنب أخطاء PrismaClientValidationError
      select: { 
        id: true,
        name: true,
        email: true,
        // phone: true, // تم حذفه
        // avatar: true, // تم حذفه
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "لم يتم العثور على المستخدم" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("[PROFILE_GET]", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء جلب بيانات الملف الشخصي" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });

    if (!token || !token.email) { 
      return NextResponse.json(
        { message: "يجب تسجيل الدخول لتحديث الملف الشخصي" },
        { status: 401 }
      );
    }

    // 🔑 يجب أن نتأكد من أننا نستقبل حقولاً موجودة في مخطط Prisma
    const { name /* , phone */ } = await req.json(); 

    if (!name) {
      return NextResponse.json(
        { message: "الاسم مطلوب" },
        { status: 400 }
      );
    }
    
    // 🔑 نقوم بتحديث الحقول الموجودة فقط
    const updateData: { name: string; /* phone?: string */ } = { name };
    /* if (phone) {
        updateData.phone = phone;
    } */

    const updatedUser = await prisma.user.update({
      where: { email: token.email },
      data: updateData, // استخدام updateData بدلاً من { name, phone }
      // 🔑 تم حذف 'phone' و 'avatar' من select
      select: {
        id: true,
        name: true,
        email: true,
        // phone: true, // تم حذفه
        // avatar: true, // تم حذفه
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[PROFILE_UPDATE]", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء تحديث الملف الشخصي" },
      { status: 500 }
    );
  }
}
