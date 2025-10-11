import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'الرجاء ملء جميع الحقول' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ ok: false, message: 'بيانات الدخول غير صحيحة' }, { status: 401 })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return NextResponse.json({ ok: false, message: 'بيانات الدخول غير صحيحة' }, { status: 401 })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })

    return NextResponse.json({ ok: true, token, message: 'تم تسجيل الدخول بنجاح' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, message: 'حدث خطأ غير متوقع' }, { status: 500 })
  }
}
