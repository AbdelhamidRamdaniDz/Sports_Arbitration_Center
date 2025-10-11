"use client"

import Link from "next/link"
import { Scale } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-corporate-green/30 via-green-100 to-white overflow-hidden">
      <div className="relative z-10 w-full flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="rounded-2xl shadow-xl border border-green-100 bg-white/80 backdrop-blur-lg">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-corporate-green to-green-500 shadow-lg">
                  <Scale className="h-7 w-7 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-extrabold text-corporate-green font-arabic">إنشاء حساب جديد</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">أنشئ حسابًا للوصول إلى خدمات المنصة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" dir="rtl">
              <div className="space-y-2 text-right">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="أدخل اسمك الكامل" />
              </div>
              <div className="space-y-2 text-right">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="أدخل بريدك الإلكتروني" />
              </div>
              <div className="space-y-2 text-right">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="كلمة المرور" />
              </div>
              <div className="space-y-2 text-right">
                <Label htmlFor="confirm">تأكيد كلمة المرور</Label>
                <Input id="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="أعد كتابة كلمة المرور" />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="terms" checked={terms} onCheckedChange={(v:any) => setTerms(Boolean(v))} />
                <Label htmlFor="terms" className="text-sm">أوافق على <Link href="#" className="text-corporate-green hover:underline">شروط الاستخدام</Link></Label>
              </div>

              <Button onClick={async () => {
                setMessage(null)
                if (password !== confirm) {
                  setMessage('كلمتا المرور غير متطابقتين')
                  return
                }
                if (password.length < 8) {
                  setMessage('يجب أن تكون كلمة المرور ٨ حروف على الأقل')
                  return
                }
                setLoading(true)
                try {
                  const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                  })
                  const data = await res.json()
                  if (!data.ok) {
                    setMessage(data.message || 'حدث خطأ')
                    setLoading(false)
                    return
                  }
                  setMessage(data.message)
                  setLoading(false)
                  router.push('/profile')
                } catch (err) {
                  setMessage('حدث خطأ غير متوقع')
                  setLoading(false)
                }
              }} className="w-full bg-gradient-to-r from-corporate-green to-green-600 text-white font-bold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
              </Button>

              {message && <div className="text-center text-sm text-red-600 mt-2">{message}</div>}

              <div className="text-center text-sm">
                <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
                <Link href="/login" className="text-corporate-green font-semibold hover:underline">تسجيل الدخول</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
