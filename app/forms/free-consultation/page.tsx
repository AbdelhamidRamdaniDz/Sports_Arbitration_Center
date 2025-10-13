"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Calculator, Info } from "lucide-react"

export default function FreeConsultationPage() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [topic, setTopic] = useState<string>("general")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) {
      toast({ description: "يرجى ملء الحقول المطلوبة" })
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch("/api/forms/free-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, topic, message })
      })
      if (!res.ok) throw new Error()
      toast({ description: "✅ تم إرسال طلب الاستشارة بنجاح" })
      setName("")
      setEmail("")
      setPhone("")
      setTopic("general")
      setMessage("")
    } catch {
      toast({ description: "❌ حدث خطأ أثناء الإرسال، حاول لاحقًا" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <PageHeader title="استشارة مجانية" description="أرسل طلبك وسيقوم أحد خبرائنا بالتواصل معك" />

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
                <CardTitle className="text-center text-2xl text-corporate-green">طلب استشارة مجانية</CardTitle>
                <CardDescription className="text-center">املأ البيانات التالية لإرسال طلب استشارة أولية</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-5" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك الكامل" required className="bg-white" />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" required className="bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05xxxxxxxx" className="bg-white" />
                    </div>
                    <div>
                      <Label>موضوع الاستشارة</Label>
                      <Select value={topic} onValueChange={setTopic}>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="اختر الموضوع" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">استشارة عامة</SelectItem>
                          <SelectItem value="sports_arbitration">تحكيم رياضي</SelectItem>
                          <SelectItem value="commercial_arbitration">تحكيم تجاري</SelectItem>
                          <SelectItem value="mediation">وساطة قانونية</SelectItem>
                          <SelectItem value="contracts">عقود</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">رسالتك</Label>
                    <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="اشرح بإيجاز موضوع استشارتك" required className="bg-white" />
                  </div>

                  <div className="pt-2">
                    <Button disabled={submitting} type="submit" className="w-full bg-corporate-green hover:bg-corporate-green/90">{submitting ? "جارٍ الإرسال..." : "إرسال الطلب"}</Button>
                  </div>
                </form>

                <div className="mt-6 text-sm text-muted-foreground flex items-start gap-2">
                  <Info className="h-4 w-4 text-[#00B4D8] mt-0.5" />
                  <span>💡 هذه الاستشارة أولية وتساعدنا على فهم طلبك قبل التواصل معك.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
