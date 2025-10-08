"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ConsultationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 300))
    toast({ title: "تم استلام طلب الاستشارة", description: "سنتواصل معكم في أقرب الآجال." })
    setForm({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <PageHeader title="طلب استشارة مجانية" description="أرسل طلبك وسيتواصل معك فريقنا المختص في الجزائر" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="اكتب اسمك" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="example@mail.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+213 21 123 456" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">موضوع الاستشارة</Label>
                    <Input id="subject" required value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} placeholder="موضوع مختصر" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">وصف موجز</Label>
                    <Textarea id="message" required rows={6} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="قدّم ملخصًا عن الاستشارة المطلوبة" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button type="submit" className="bg-corporate-green hover:bg-corporate-green/90">إرسال الطلب</Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>رجوع</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


