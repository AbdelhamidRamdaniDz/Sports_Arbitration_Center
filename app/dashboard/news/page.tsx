"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Edit2, Trash2, Newspaper } from "lucide-react"

type News = { id: string; title: string; slug?: string; excerpt?: string; body?: string; mainImage?: string; category: string; urgent: boolean; createdAt: string; views: number }

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()
  const qc = useQueryClient()
  const { toast } = useToast()

  const [search, setSearch] = useState("")
  const [cat, setCat] = useState("")
  const [urgent, setUrgent] = useState("")

  const [createOpen, setCreateOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [nTitle, setNTitle] = useState("")
  const [nSlug, setNSlug] = useState("")
  const [nExcerpt, setNExcerpt] = useState("")
  const [nBody, setNBody] = useState("")
  const [nMainImage, setNMainImage] = useState("")
  const [nCategory, setNCategory] = useState("")
  const [nUrgent, setNUrgent] = useState(false)

  const [editOpen, setEditOpen] = useState(false)
  const [editItem, setEditItem] = useState<News | null>(null)
  const [eTitle, setETitle] = useState("")
  const [eSlug, setESlug] = useState("")
  const [eExcerpt, setEExcerpt] = useState("")
  const [eBody, setEBody] = useState("")
  const [eMainImage, setEMainImage] = useState("")
  const [eCategory, setECategory] = useState("")
  const [eUrgent, setEUrgent] = useState(false)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState<News | null>(null)

  useEffect(() => { if (authStatus === "unauthenticated") router.replace("/login") }, [authStatus, router])

  const list = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/news`)
      if (!res.ok) throw new Error("فشل تحميل البيانات")
      return res.json() as Promise<{ data: News[] }>
    }
  })

  const rowsAll = list.data?.data || []
  const rows = useMemo(() => {
    return rowsAll
      .filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()))
      .filter(r => !cat || r.category === cat)
      .filter(r => !urgent || (urgent === "urgent" ? r.urgent : !r.urgent))
  }, [rowsAll, search, cat, urgent])

  return (
    <div dir="rtl" className="text-right min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center shadow-lg">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#003366]">إدارة الأخبار</h1>
          </div>
          <Button className="h-11 bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#0096C7] hover:to-[#0077B6] rounded-xl" onClick={() => setCreateOpen(true)}>
            <Plus className="w-5 h-5 ml-2" /> خبر جديد
          </Button>
        </div>

        <Card className="rounded-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>قائمة الأخبار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <Input placeholder="بحث بالعنوان" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-64" />
              <div className="flex items-center gap-2">
                <Select value={cat} onValueChange={(v) => setCat(v === "all" ? "" : v)}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="الفئة" /></SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="عام">عام</SelectItem>
                    <SelectItem value="أحداث">أحداث</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={urgent} onValueChange={(v) => setUrgent(v === "all" ? "" : v)}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="الحالة" /></SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="urgent">عاجل</SelectItem>
                    <SelectItem value="normal">عادي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {rows.map(n => (
                <Card key={n.id} className="rounded-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-[#003366] flex items-center justify-between">
                      <span className="truncate" title={n.title}>{n.title}</span>
                      <div className="flex items-center gap-2">
                        {n.urgent && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-md">عاجل</span>}
                        <Button size="sm" className="h-8 bg-white hover:bg-slate-50 text-slate-700 border" onClick={() => { setEditItem(n); setETitle(n.title || ""); setESlug(n.slug || ""); setEExcerpt(n.excerpt || ""); setEBody(n.body || ""); setEMainImage(n.mainImage || ""); setECategory(n.category || ""); setEUrgent(!!n.urgent); setEditOpen(true) }}>
                          <Edit2 className="w-3.5 h-3.5 ml-1" /> تعديل
                        </Button>
                        <Button size="sm" className="h-8 bg-red-500 hover:bg-red-600 text-white" onClick={() => { setDeleteItem(n); setDeleteOpen(true) }}>
                          <Trash2 className="w-3.5 h-3.5 ml-1" /> حذف
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">الفئة: {n.category}</div>
                    <div className="text-sm text-muted-foreground">التاريخ: {new Date(n.createdAt).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">المشاهدات: {n.views}</div>
                  </CardContent>
                </Card>
              ))}
              {rows.length === 0 && <div className="text-muted-foreground">لا توجد أخبار</div>}
            </div>
          </CardContent>
        </Card>

        <Dialog open={createOpen} onOpenChange={(o) => { if (!o) { setCreateOpen(false); setNTitle(""); setNSlug(""); setNExcerpt(""); setNBody(""); setNMainImage(""); setNCategory(""); setNUrgent(false) } }}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#003366] flex items-center gap-2">
                <Plus className="w-6 h-6" /> خبر جديد
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">العنوان</label>
                <Input value={nTitle} onChange={(e) => setNTitle(e.target.value)} placeholder="عنوان الخبر" className="rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">المعرف (Slug)</label>
                <Input value={nSlug} onChange={(e) => setNSlug(e.target.value)} placeholder="slug-مثال" className="rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700 mb-2 block">الملخص</label>
                <Input value={nExcerpt} onChange={(e) => setNExcerpt(e.target.value)} placeholder="ملخص قصير" className="rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700 mb-2 block">المحتوى</label>
                <Input value={nBody} onChange={(e) => setNBody(e.target.value)} placeholder="نص الخبر" className="rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">الصورة الرئيسية</label>
                <Input value={nMainImage} onChange={(e) => setNMainImage(e.target.value)} placeholder="رابط الصورة" className="rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">الفئة</label>
                <Input value={nCategory} onChange={(e) => setNCategory(e.target.value)} placeholder="مثل: عام" className="rounded-xl" />
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <Checkbox id="urgent" checked={nUrgent} onCheckedChange={(v) => setNUrgent(!!v)} />
                <label htmlFor="urgent" className="text-sm text-slate-700">عاجل</label>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)} className="rounded-xl">إلغاء</Button>
              <Button
                disabled={creating || !nTitle || !nSlug}
                onClick={async () => {
                  try {
                    setCreating(true)
                    const res = await fetch(`/api/dashboard/news`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ title: nTitle, slug: nSlug, excerpt: nExcerpt, body: nBody, mainImage: nMainImage, category: nCategory, urgent: nUrgent })
                    })
                    if (!res.ok) throw new Error()
                    await res.json()
                    qc.invalidateQueries({ queryKey: ["news"] })
                    setCreateOpen(false)
                    toast({ description: "✅ تم إضافة الخبر" })
                  } catch {
                    toast({ description: "❌ فشل إضافة الخبر" })
                  } finally {
                    setCreating(false)
                  }
                }}
                className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] rounded-xl"
              >
                {creating ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                <Edit2 className="w-5 h-5" /> تعديل الخبر
              </DialogTitle>
            </DialogHeader>
            {editItem && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">العنوان</label>
                  <Input value={eTitle} onChange={(e) => setETitle(e.target.value)} placeholder="عنوان الخبر" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">المعرف (Slug)</label>
                  <Input value={eSlug} onChange={(e) => setESlug(e.target.value)} placeholder="slug" className="rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">الملخص</label>
                  <Input value={eExcerpt} onChange={(e) => setEExcerpt(e.target.value)} placeholder="ملخص" className="rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">المحتوى</label>
                  <Input value={eBody} onChange={(e) => setEBody(e.target.value)} placeholder="المحتوى" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">الصورة الرئيسية</label>
                  <Input value={eMainImage} onChange={(e) => setEMainImage(e.target.value)} placeholder="رابط الصورة" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">الفئة</label>
                  <Input value={eCategory} onChange={(e) => setECategory(e.target.value)} placeholder="الفئة" className="rounded-xl" />
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <Checkbox id="e-urgent" checked={eUrgent} onCheckedChange={(v) => setEUrgent(!!v)} />
                  <label htmlFor="e-urgent" className="text-sm text-slate-700">عاجل</label>
                </div>
              </div>
            )}
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setEditOpen(false)} className="rounded-xl">إلغاء</Button>
              <Button
                onClick={async () => {
                  if (!editItem) return
                  const res = await fetch(`/api/dashboard/news/${editItem.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: eTitle, slug: eSlug, excerpt: eExcerpt, body: eBody, mainImage: eMainImage, category: eCategory, urgent: eUrgent })
                  })
                  if (res.ok) {
                    toast({ description: "✅ تم التعديل بنجاح" })
                    setEditOpen(false)
                    qc.invalidateQueries({ queryKey: ["news"] })
                  } else {
                    toast({ description: "❌ فشل التعديل" })
                  }
                }}
                className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] rounded-xl"
              >
                <Edit2 className="w-4 h-4 ml-2" /> حفظ التعديلات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><Trash2 className="w-5 h-5 text-red-600" /></div>
                تأكيد حذف الخبر
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 bg-red-50 border border-red-200 rounded-lg p-3">هل أنت متأكد من حذف هذا الخبر؟</p>
            </div>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="rounded-xl">إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (!deleteItem) return
                  const res = await fetch(`/api/dashboard/news/${deleteItem.id}`, { method: "DELETE" })
                  if (res.ok) {
                    toast({ description: "✅ تم حذف الخبر" })
                    qc.invalidateQueries({ queryKey: ["news"] })
                  } else {
                    toast({ description: "❌ فشل الحذف" })
                  }
                  setDeleteOpen(false)
                }}
                className="bg-red-500 hover:bg-red-600 rounded-xl"
              >
                <Trash2 className="w-4 h-4 ml-2" /> تأكيد الحذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default function NewsPage() {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <PageInner />
    </QueryClientProvider>
  )
}
