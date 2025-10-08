"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { getMemberById } from "@/lib/data"
import type { Arbitrator, Lawyer, ContactForm } from "@/lib/types"

export default function ContactMemberPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id as string
  const router = useRouter()
  const { toast } = useToast()
  const [member, setMember] = useState<Arbitrator | Lawyer | null>(null)
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", subject: "", message: "" })

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const { member } = await getMemberById(id)
      setMember(member)
      setLoading(false)
    }
    load()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submit
    await new Promise((r) => setTimeout(r, 300))
    toast({ title: "تم الإرسال بنجاح", description: "تم إرسال رسالتك وسيتم التواصل معك قريبًا." })
    setForm({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader title="تواصل مع العضو" description="أرسل رسالة مباشرة إلى العضو المختار" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-1">
              <Card className="bg-white">
                <CardContent className="p-6">
                  {loading ? (
                    <div className="h-32 bg-muted animate-pulse rounded" />
                  ) : member ? (
                    <div className="flex items-center gap-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-corporate-green/20"
                      />
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-corporate-green">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.title}</p>
                        <Badge className="bg-corporate-green/10 text-corporate-green text-xs">
                          {member.specialization}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">لم يتم العثور على العضو.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                        placeholder="اكتب اسمك الكامل"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        required
                        placeholder="example@mail.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="05xxxxxxxx"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="subject">موضوع الرسالة</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        required
                        placeholder="موضوع مختصر"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">نص الرسالة</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        required
                        rows={6}
                        placeholder="اكتب رسالتك هنا"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Button type="submit" className="bg-corporate-green hover:bg-corporate-green/90">
                        إرسال
                      </Button>
                      <Button type="button" variant="outline" onClick={() => router.back()}>
                        رجوع
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


