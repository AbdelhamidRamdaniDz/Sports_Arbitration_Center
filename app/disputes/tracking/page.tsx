import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Lock, User, Key, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "تتبع القضايا | مركز التحكيم الرياضي",
  description: "تتبع حالة قضيتك وآخر التطورات في الوقت الفعلي",
}

export default function CaseTrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="تتبع القضايا"
        description="تابع حالة قضيتك وآخر التطورات في الوقت الفعلي مع نظام التتبع المتطور"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-corporate-green/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green/10 text-corporate-green">
                    <Lock className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-corporate-green">تسجيل الدخول مطلوب</CardTitle>
                <CardDescription className="text-base">
                  للوصول إلى نظام تتبع القضايا، يرجى تسجيل الدخول باستخدام رقم القضية وكلمة المرور المرسلة إليك
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="caseNumber" className="text-sm font-medium">
                      رقم القضية
                    </Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="caseNumber" placeholder="مثال: ARB-2024-001" className="pr-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      كلمة المرور
                    </Label>
                    <div className="relative">
                      <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" placeholder="كلمة المرور المرسلة إليك" className="pr-10" />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-corporate-green hover:bg-corporate-green/90">
                  <Search className="mr-2 h-4 w-4" />
                  تسجيل الدخول
                </Button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">معلومات مهمة:</p>
                      <ul className="text-blue-800 space-y-1">
                        <li>• رقم القضية وكلمة المرور يتم إرسالهما عند تقديم الطلب</li>
                        <li>• في حالة نسيان كلمة المرور، يرجى التواصل مع المركز</li>
                        <li>• النظام متاح 24/7 لتتبع آخر التطورات</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">لا تملك قضية مسجلة بعد؟</p>
              <Button
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
              >
                تقديم قضية جديدة
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
