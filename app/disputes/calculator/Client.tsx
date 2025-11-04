"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, Clock, DollarSign, Info } from "lucide-react"

// معامل نوع القضية
const TYPE_COEFF: Record<string, number> = {
  "player_contracts": 1.0, // عقود اللاعبين
  "international_transfers": 1.3, // الانتقالات الدولية
  "commercial_sponsorship": 1.2, // الرعاية التجارية
  "administrative": 0.9, // النزاعات الإدارية
  "broadcast_rights": 1.5, // حقوق البث
  "disciplinary": 0.7, // التأديب الرياضي
  "commercial_disputes": 1.4, // النزاعات التجارية
  "employment_contracts": 1.1, // عقود العمل
  "energy_sector_disputes": 1.6, // النزعات في مجال الطاقة
}

// معاملات التعقيد
const COMPLEXITY_COEFF: Record<string, { label: string; factor: number; duration: string }> = {
  low: { label: "منخفض", factor: 0.02, duration: "15-30 يوم" },
  medium: { label: "متوسط", factor: 0.04, duration: "30-60 يوم" },
  high: { label: "عالي", factor: 0.06, duration: "60-90 يوم" },
  very_high: { label: "عالي جدًا", factor: 0.08, duration: "90-120 يوم" },
}

// تنسيق العملة بالدينار الجزائري (DZD)
function formatDZD(value: number) {
  try {
    return new Intl.NumberFormat("ar-DZ", { maximumFractionDigits: 0 }).format(Math.round(value))
  } catch {
    return String(Math.round(value))
  }
}

export default function CalculatorClient() {
  // حالة الإدخالات
  const [typeKey, setTypeKey] = useState<string>("player_contracts")
  const [amount, setAmount] = useState<string>("")
  const [complexityKey, setComplexityKey] = useState<string>("medium")
  const [result, setResult] = useState<{ cost: number; duration: string } | null>(null)

  // تنفيذ الحساب عند الإرسال
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const base = Number((amount || "").replace(/[^\d.]/g, ""))
    if (!isFinite(base) || base <= 0) {
      setResult(null)
      return
    }
    const typeCoeff = TYPE_COEFF[typeKey] ?? 1
    const cx = COMPLEXITY_COEFF[complexityKey] ?? COMPLEXITY_COEFF.medium
    const cost = base * cx.factor * typeCoeff + 10000
    setResult({ cost, duration: cx.duration })
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      <PageHeader
        title="حاسبة تكلفة  النزاعات "
        description="احسب تكلفة نزاعك ومدة حله بسرعة وسهولة لأي نوع من النزاعات: رياضية، تجارية، أو غيرها أدخل تفاصيل قضيتك لتحصل على تقديرات فورية دقيقة، مع تجربة سلسة وواجهة مبتكرة."
      />

      {/* نموذج الحاسبة */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-corporate-green/20">
              <CardHeader>
                <div className="flex items-center justify-center mb-2">
                  <div className="h-14 w-14 rounded-xl bg-corporate-green text-white flex items-center justify-center">
                    <Calculator className="h-7 w-7" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl text-corporate-green">حاسبة تكلفة النزاع</CardTitle>
                <CardDescription className="text-center">املأ الحقول التالية ثم اضغط "احسب التكلفة"</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-5" onSubmit={onSubmit}>
                  {/* نوع النزاع */}
                  <div>
                    <label className="block text-sm font-medium mb-2">نوع النزاع</label>
                    <Select value={typeKey} onValueChange={setTypeKey}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="اختر نوع النزاع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="player_contracts">عقود اللاعبين</SelectItem>
                        <SelectItem value="international_transfers">الانتقالات الدولية</SelectItem>
                        <SelectItem value="commercial_sponsorship">الرعاية التجارية</SelectItem>
                        <SelectItem value="administrative">النزاعات الإدارية</SelectItem>
                        <SelectItem value="broadcast_rights">حقوق البث</SelectItem>
                        <SelectItem value="disciplinary">التأديب الرياضي</SelectItem>
                        <SelectItem value="commercial_disputes">النزاعات التجارية</SelectItem>
                        <SelectItem value="employment_contracts">عقود العمل</SelectItem>
                        <SelectItem value="energy_sector_disputes">النزعات في مجال الطاقة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* قيمة النزاع */}
                  <div>
                    <label className="block text-sm font-medium mb-2">قيمة النزاع (DZD)</label>
                    <Input
                      inputMode="numeric"
                      placeholder="مثال: 2500000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  {/* مستوى التعقيد */}
                  <div>
                    <label className="block text-sm font-medium mb-2">مستوى التعقيد</label>
                    <Select value={complexityKey} onValueChange={setComplexityKey}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">منخفض</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="very_high">عالي جدًا</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full bg-corporate-green hover:bg-corporate-green/90">احسب التكلفة</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* نتيجة الحساب */}
            {result && (
              <Card className="mt-6 border-2 border-corporate-green/20 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-corporate-green">النتيجة التقديرية</CardTitle>
                  <CardDescription>الحساب يعتمد على المعاملات المحددة لنوع القضية ومستوى التعقيد</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-light-grey">
                      <div className="flex items-center gap-2 text-corporate-green mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">التكلفة التقديرية (DZD)</span>
                      </div>
                      <div className="text-3xl font-extrabold text-[#003366]">{formatDZD(result.cost)} DZD</div>
                    </div>
                    <div className="p-4 rounded-xl bg-light-grey">
                      <div className="flex items-center gap-2 text-corporate-green mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">المدة التقديرية</span>
                      </div>
                      <div className="text-2xl font-bold text-[#003366]">{result.duration}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* توضيح */}
            <div className="mt-6 text-sm text-muted-foreground flex items-start gap-2">
              <Info className="h-4 w-4 text-[#00B4D8] mt-0.5" />
              <span>💡 هذه الحاسبة تقديرية فقط، والقيمة النهائية تعتمد على تقييم المركز لكل قضية.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
