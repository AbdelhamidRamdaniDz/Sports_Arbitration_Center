"use client"

import Link from "next/link"
import { Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const { status, data: session } = useSession();

  // إعادة التوجيه بعد نجاح المصادقة
  useEffect(() => {
    if (status !== "authenticated") return;
    const email = session?.user?.email?.trim().toLowerCase();
    if (!email) return;
    const isAdmin = session?.user?.isAdmin || email === "admin@gmail.com";
    router.push(isAdmin ? "/dashboard" : "/profile");
    router.refresh();
  }, [status, session, router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-corporate-green/30 via-green-100 to-white overflow-hidden">
      {/* Decorative animated background (pure CSS) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-corporate-green/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-green-400/20 rounded-full blur-2xl animate-float2" />
        <div className="absolute top-1/2 left-1/3 w-[120px] h-[120px] bg-green-600/10 rounded-full blur-xl animate-float3" />
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center px-4 py-12">
        {/* Optional branding panel on desktop */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 pr-8">
          <img src="/modern-digital-arbitration-system.jpg" alt="منصة التحكيم" className="w-64 h-64 object-cover rounded-2xl shadow-lg mb-6" />
          <h2 className="text-3xl font-extrabold text-corporate-green mb-2 tracking-tight">منصة التحكيم الرياضي</h2>
          <p className="text-lg text-muted-foreground text-center max-w-xs">بوابتك الوطنية للخدمات الرقمية والتحكيم الرياضي</p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md md:w-1/2">
          <Card className="rounded-2xl shadow-xl border border-green-100 bg-white/80 backdrop-blur-lg transition-colors duration-300">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-corporate-green to-green-500 shadow-lg">
                  <Scale className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-extrabold text-corporate-green mb-1 font-arabic">تسجيل الدخول</CardTitle>
              <div className="text-base text-muted-foreground mb-1">مرحبًا بعودتك إلى منصتك</div>
              <CardDescription className="text-sm text-muted-foreground">أدخل بياناتك للوصول إلى حسابك</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6" dir="rtl">
              <div className="space-y-2 text-right">
                <Label htmlFor="email" className="block text-right">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="block text-right">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-right"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={remember} onCheckedChange={(v:any) => setRemember(Boolean(v))} />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">تذكرني</Label>
                </div>
                <Link href="/login/forgot" className="text-sm text-corporate-green hover:underline">نسيت كلمة المرور؟</Link>
              </div>

              {message && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-right">
                  {message}
                </div>
              )}

              <Button
                className="w-full bg-corporate-green hover:bg-corporate-green/90"
                onClick={async () => {
                  setMessage(null)
                  setLoading(true)
                  try {
                    const adminEmail = (process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || 'admin@gmail.com').trim().toLowerCase()
                    const target = email.trim().toLowerCase() === adminEmail ? '/dashboard' : '/profile'
                    const result = await signIn('credentials', {
                      email,
                      password,
                      redirect: false
                    })
                    if (result?.error) {
                      setMessage(result.error)
                      setLoading(false)
                      return
                    }
                    router.replace(target)
                    router.refresh()
                  } catch (err) {
                    setMessage('حدث خطأ غير متوقع')
                    setLoading(false)
                  }
                }}
                disabled={loading}
              >
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">ليس لديك حساب؟ </span>
                <Link href="/register" className="text-corporate-green hover:underline">
                  إنشاء حساب جديد
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
