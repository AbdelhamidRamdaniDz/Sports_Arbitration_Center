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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function BookingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", notes: "", city: "__algiers__" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 300))
    toast({ title: "تم حجز الموعد", description: "سنتواصل معكم لتأكيد التفاصيل." })
    setForm({ name: "", email: "", phone: "", date: "", time: "", notes: "", city: "__algiers__" })
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <PageHeader title="حجز موعد" description="حدّد موعدك للاستشارة داخل الجزائر" />

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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">التاريخ</Label>
                      <Input id="date" type="date" required value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">الوقت</Label>
                      <Input id="time" type="time" required value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} />
                    </div>
                    <div className="grid gap-2">
                      <Label>المدينة</Label>
                      <Select value={form.city} onValueChange={(v) => setForm((f) => ({ ...f, city: v }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__algiers__">الجزائر</SelectItem>
                          <SelectItem value="oran">وهران</SelectItem>
                          <SelectItem value="constantine">قسنطينة</SelectItem>
                          <SelectItem value="annaba">عنابة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">ملاحظات إضافية</Label>
                    <Textarea id="notes" rows={5} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="أي تفاصيل إضافية ترغب بمشاركتها" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button type="submit" className="bg-corporate-green hover:bg-corporate-green/90">احجز الآن</Button>
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


