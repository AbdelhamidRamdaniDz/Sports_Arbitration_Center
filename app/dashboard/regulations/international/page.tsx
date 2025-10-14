"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Upload } from "lucide-react"

const AREA = "international"

export default function RegulationsDashboardInternationalPage() {
  const router = useRouter()
  const { status, data: session } = useSession()
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, isLoading, mutate } = useSWR<{ data: any[]; meta: any }>(`/api/regulations?area=${AREA}&limit=100`, fetcher)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [pages, setPages] = useState<string>("")
  const [language, setLanguage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
    if (status === "authenticated") {
      const envAdmin = (process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || 'admin@gmail.com').trim().toLowerCase()
      const emailNorm = session?.user?.email?.trim().toLowerCase()
      if (!emailNorm) return
      const isAdmin = (session as any)?.user?.isAdmin || (emailNorm === envAdmin)
      if (!isAdmin) router.replace("/profile")
    }
  }, [status, session, router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) { setError("الرجاء إدخال العنوان واختيار ملف"); return }
    setSubmitting(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.set("area", AREA)
      fd.set("title", title)
      if (description) fd.set("description", description)
      if (category) fd.set("category", category)
      if (date) fd.set("date", date)
      if (pages) fd.set("pages", pages)
      if (language) fd.set("language", language)
      fd.set("file", file)
      const res = await fetch("/api/regulations", { method: "POST", body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "فشل الرفع")
      setTitle(""); setDescription(""); setCategory(""); setDate(""); setPages(""); setLanguage(""); setFile(null)
      await mutate()
    } catch (e: any) {
      setError(e?.message || "حدث خطأ")
    } finally {
      setSubmitting(false)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف الوثيقة؟")) return
    try {
      const res = await fetch(`/api/regulations/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("فشل الحذف")
      await mutate()
    } catch (e) {
      alert("تعذر الحذف")
    }
  }

  return (
    <div dir="rtl" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#003366]">إدارة التشريعات الدولية</h1>
        <p className="text-sm text-muted-foreground">رفع وإدارة الوثائق الخاصة بصفحة التشريعات الدولية.</p>
      </div>

      <Card className="rounded-2xl shadow-md mb-6">
        <CardHeader>
          <CardTitle>رفع وثيقة جديدة</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-sm text-rose-600 mb-3">{error}</div>}
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>العنوان</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان الوثيقة" required />
            </div>
            <div>
              <Label>الفئة</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="FIFA / CAS / IOC .." />
            </div>
            <div className="md:col-span-2">
              <Label>الوصف</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="وصف مختصر" rows={3} />
            </div>
            <div>
              <Label>التاريخ</Label>
              <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="مثال: ديسمبر 2024" />
            </div>
            <div>
              <Label>عدد الصفحات</Label>
              <Input value={pages} onChange={(e) => setPages(e.target.value)} placeholder="مثال: 45" inputMode="numeric" />
            </div>
            <div>
              <Label>اللغة</Label>
              <Input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="عربي / إنجليزي" />
            </div>
            <div>
              <Label>الملف (PDF)</Label>
              <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting} className="bg-[#003366] hover:bg-[#003366]/90">
                <Upload className="h-4 w-4 mr-1" /> {submitting ? "جاري الرفع.." : "رفع الوثيقة"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>الوثائق المرفوعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الفئة</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الحجم</TableHead>
                  <TableHead className="text-right">اللغة</TableHead>
                  <TableHead className="text-right">رابط</TableHead>
                  <TableHead className="text-right">إجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.data ?? []).map((r: any) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.title}</TableCell>
                    <TableCell><Badge variant="outline">{r.category || "-"}</Badge></TableCell>
                    <TableCell>{r.date || ""}</TableCell>
                    <TableCell>{r.size || ""}</TableCell>
                    <TableCell>{r.language || ""}</TableCell>
                    <TableCell>
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[#00B4D8] underline">عرض</a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(r.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> حذف
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!isLoading && (data?.data ?? []).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-sm text-muted-foreground">لا توجد وثائق</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
