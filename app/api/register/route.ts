import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ ok: false, message: 'الرجاء ملء جميع الحقول' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ ok: false, message: 'يجب أن تكون كلمة المرور ٨ حروف على الأقل' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ ok: false, message: 'هذا البريد مستخدم مسبقًا' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)

    await prisma.user.create({ data: { name, email, password: hashed } })

    return NextResponse.json({ ok: true, message: 'تم إنشاء الحساب بنجاح' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, message: 'حدث خطأ غير متوقع' }, { status: 500 })
  }
}
