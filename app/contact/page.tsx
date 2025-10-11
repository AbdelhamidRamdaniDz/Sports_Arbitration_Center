"use client"
import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferred: "email" as "email" | "phone",
  })

  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})

  const validate = () => {
    const next: { email?: string; message?: string } = {}
    if (!form.email.trim()) next.email = "البريد الإلكتروني مطلوب"
    if (!form.message.trim()) next.message = "محتوى الرسالة مطلوب"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('failed')
      toast({ title: "تم إرسال الرسالة", description: "نشكركم على تواصلكم. سنرد في أقرب الآجال." })
      setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "", preferred: "email" })
      setErrors({})
    } catch {
      toast({ title: "تعذر إرسال الرسالة", description: "يرجى المحاولة لاحقًا", variant: "destructive" as any })
    }
  }

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <PageHeader
        title="تواصل معنا"
        description="نرحب بجميع استفساراتكم ومقترحاتكم حول خدمات التحكيم الرياضي في الجزائر، وسنحرص على الرد في أقرب الآجال."
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-corporate-green mb-6">معلومات التواصل</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">الهاتف</h3>
                    <p className="text-muted-foreground">+213 21 123 456</p>
                    <p className="text-muted-foreground">+213 661 234 567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                    <p className="text-muted-foreground">info@sports-arbitration.dz</p>
                    <p className="text-muted-foreground">support@sports-arbitration.dz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">العنوان</h3>
                    <p className="text-muted-foreground">
                      شارع ديدوش مراد، الجزائر العاصمة 16000
                      <br />
                      الجمهورية الجزائرية الديمقراطية الشعبية
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">ساعات العمل</h3>
                    <p className="text-muted-foreground">الأحد إلى الخميس: 08:30 - 16:30</p>
                    <p className="text-muted-foreground">الجمعة: مغلق</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>أرسل لنا رسالة</CardTitle>
              <CardDescription>سنعمل على الرد على استفساركم في أقرب الآجال</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input
                      id="firstName"
                      placeholder="اكتب اسمك"
                      value={form.firstName}
                      onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">اسم العائلة</Label>
                    <Input
                      id="lastName"
                      placeholder="اكتب اسم العائلة"
                      value={form.lastName}
                      onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    placeholder="+213 661 234 567"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">موضوع الاستفسار</Label>
                  <Select value={form.subject} onValueChange={(v) => setForm((f) => ({ ...f, subject: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر موضوع الاستفسار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arbitration">التحكيم</SelectItem>
                      <SelectItem value="mediation">الوساطة</SelectItem>
                      <SelectItem value="training">التدريب</SelectItem>
                      <SelectItem value="consultation">استشارة قانونية</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <Textarea
                    id="message"
                    placeholder="اكتب رسالتك هنا..."
                    className="min-h-[120px]"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
                </div>

                {/* Preferred contact method */}
                <div className="space-y-2">
                  <Label>طريقة التواصل المفضلة</Label>
                  <RadioGroup
                    className="flex items-center gap-6"
                    value={form.preferred}
                    onValueChange={(v) => setForm((f) => ({ ...f, preferred: v as "email" | "phone" }))}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem id="pref-email" value="email" />
                      <Label htmlFor="pref-email">البريد الإلكتروني</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem id="pref-phone" value="phone" />
                      <Label htmlFor="pref-phone">الهاتف</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full bg-corporate-green hover:bg-corporate-green/90">إرسال الرسالة</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
