"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Search, Plus, Edit2, Trash2, Upload, Video } from "lucide-react"

type Vid = { id: string; title: string; type: string; url: string; thumbnail: string; views: number; createdAt: string }

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()
  const qc = useQueryClient()
  const { toast } = useToast()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("")

  const [createOpen, setCreateOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [formTitle, setFormTitle] = useState("")
  const [formType, setFormType] = useState<string>("youtube")
  const [formUrl, setFormUrl] = useState("")
  const [formThumb, setFormThumb] = useState("")

  const [editOpen, setEditOpen] = useState(false)
  const [editVideo, setEditVideo] = useState<Vid | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editType, setEditType] = useState<string>("youtube")
  const [editUrl, setEditUrl] = useState("")
  const [editThumb, setEditThumb] = useState("")

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteVideo, setDeleteVideo] = useState<Vid | null>(null)

  useEffect(() => { if (authStatus === "unauthenticated") router.replace("/login") }, [authStatus, router])

  const list = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/videos`)
      if (!res.ok) throw new Error("فشل تحميل البيانات")
      return res.json() as Promise<{ data: Vid[] }>
    }
  })

  const rowsAll = list.data?.data || []
  const filtered = useMemo(() => {
    let out = rowsAll
    if (filter) out = out.filter(v => v.type === filter)
    const term = search.trim()
    if (term) out = out.filter(v => (v.title || "").toLowerCase().includes(term.toLowerCase()))
    return out
  }, [rowsAll, filter, search])

  return (
    <div dir="rtl" className="text-right min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 md:p-6">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center shadow-lg">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#003366]">إدارة الفيديوهات</h1>
                  <p className="text-sm text-slate-600">إضافة وتعديل وحذف روابط الفيديوهات</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200">
                <span className="text-sm text-slate-600">إجمالي الفيديوهات:</span>
                <span className="text-lg font-bold text-[#003366] mr-2">{rowsAll.length}</span>
              </div>
            </div>
          </div>

          
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="ابحث في عناوين الفيديو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10 h-11 bg-white border-slate-200 shadow-sm focus:ring-2 focus:ring-[#00B4D8]/20 rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filter || "all"} onValueChange={(v) => setFilter(v === "all" ? "" : v)}>
                <SelectTrigger className="w-40 h-11 rounded-xl"><SelectValue placeholder="النوع" /></SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="mp4">MP4</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                className="h-11 bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#0096C7] hover:to-[#0077B6] shadow-lg shadow-[#00B4D8]/25 rounded-xl font-medium"
                onClick={() => setCreateOpen(true)}
              >
                <Plus className="w-5 h-5 ml-2" />
                إضافة فيديو جديد
              </Button>
            </div>
          </div>
        </div>

        
        <Dialog open={createOpen} onOpenChange={(o) => { if (!o) { setCreateOpen(false); setFormTitle(""); setFormType("youtube"); setFormUrl(""); setFormThumb("") } }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#003366] flex items-center gap-2">
                <Upload className="w-6 h-6" />
                إضافة فيديو
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">العنوان</label>
                <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="عنوان الفيديو" className="rounded-xl" />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">النوع</label>
                  <Select value={formType} onValueChange={setFormType}>
                    <SelectTrigger className="rounded-xl"><SelectValue placeholder="اختر النوع" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="mp4">MP4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">الصورة المصغرة (اختياري)</label>
                  <Input value={formThumb} onChange={(e) => setFormThumb(e.target.value)} placeholder="رابط الصورة" className="rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">الرابط</label>
                <Input value={formUrl} onChange={(e) => setFormUrl(e.target.value)} placeholder="رابط YouTube أو ملف MP4" className="rounded-xl" />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)} className="rounded-xl">إلغاء</Button>
              <Button
                disabled={creating || !formTitle || !formUrl || !formType}
                onClick={async () => {
                  try {
                    setCreating(true)
                    const res = await fetch(`/api/dashboard/videos`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ title: formTitle, type: formType, url: formUrl, thumbnail: formThumb || undefined })
                    })
                    if (!res.ok) throw new Error()
                    await res.json()
                    qc.invalidateQueries({ queryKey: ["videos"] })
                    setCreateOpen(false)
                    toast({ description: "✅ تم إضافة الفيديو" })
                  } catch {
                    toast({ description: "❌ فشل إضافة الفيديو" })
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

        
        <Card className="rounded-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            {!list.isLoading && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {filtered.map(v => (
                  <div key={v.id} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-[#00B4D8] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={v.thumbnail || "/placeholder.png"}
                        alt={v.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="sm"
                          className="flex-1 bg-white hover:bg-slate-50 text-slate-700 shadow-lg rounded-xl h-9"
                          onClick={() => { setEditVideo(v); setEditTitle(v.title || ""); setEditType(v.type || "youtube"); setEditUrl(v.url || ""); setEditThumb(v.thumbnail || ""); setEditOpen(true) }}
                        >
                          <Edit2 className="w-3.5 h-3.5 ml-1" />
                          تعديل
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-lg rounded-xl h-9"
                          onClick={() => { setDeleteVideo(v); setDeleteOpen(true) }}
                        >
                          <Trash2 className="w-3.5 h-3.5 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-sm font-semibold text-[#003366] truncate" title={v.title || "بدون عنوان"}>
                        {v.title || "بدون عنوان"}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{new Date(v.createdAt).toLocaleDateString('ar-DZ')}</span>
                        <span className="uppercase">{v.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!list.isLoading && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Video className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  {search ? "لا توجد نتائج" : "لا توجد فيديوهات بعد"}
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  {search ? "جرب كلمات بحث أخرى" : "ابدأ بإضافة فيديو"}
                </p>
                {!search && (
                  <Button onClick={() => setCreateOpen(true)} className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] rounded-xl">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة فيديو
                  </Button>
                )}
              </div>
            )}

            {list.isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white border border-slate-200">
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
                      <div className="h-3 bg-slate-200 rounded-lg w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                <Edit2 className="w-5 h-5" />
                تعديل الفيديو
              </DialogTitle>
            </DialogHeader>
            {editVideo && (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border-2 border-slate-200">
                  <img src={editThumb || "/placeholder.png"} alt={editTitle} className="w-full aspect-video object-cover" />
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">العنوان</label>
                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="عنوان الفيديو" className="rounded-xl" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-slate-700 mb-2 block">النوع</label>
                      <Select value={editType} onValueChange={setEditType}>
                        <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="mp4">MP4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium text-slate-700 mb-2 block">الصورة المصغرة</label>
                      <Input value={editThumb} onChange={(e) => setEditThumb(e.target.value)} placeholder="رابط الصورة" className="rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">الرابط</label>
                    <Input value={editUrl} onChange={(e) => setEditUrl(e.target.value)} placeholder="رابط الفيديو" className="rounded-xl" />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setEditOpen(false)} className="rounded-xl">إلغاء</Button>
              <Button
                onClick={async () => {
                  if (!editVideo) return
                  const res = await fetch(`/api/dashboard/videos/${editVideo.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: editTitle, type: editType, url: editUrl, thumbnail: editThumb })
                  })
                  if (res.ok) {
                    toast({ description: "✅ تم التعديل بنجاح" })
                    setEditOpen(false)
                    qc.invalidateQueries({ queryKey: ["videos"] })
                  } else {
                    toast({ description: "❌ فشل التعديل" })
                  }
                }}
                className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] rounded-xl"
              >
                <Edit2 className="w-4 h-4 ml-2" />
                حفظ التعديلات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                تأكيد حذف الفيديو
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-3">
              {deleteVideo && (
                <div className="rounded-xl overflow-hidden border-2 border-slate-200">
                  <img src={deleteVideo.thumbnail || "/placeholder.png"} alt={deleteVideo.title} className="w-full aspect-video object-cover" />
                </div>
              )}
              <p className="text-sm text-slate-600 bg-red-50 border border-red-200 rounded-lg p-3">
                ⚠️ هل أنت متأكد من حذف هذا الفيديو؟ هذا الإجراء لا يمكن التراجع عنه.
              </p>
            </div>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="rounded-xl">إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (!deleteVideo) return
                  const res = await fetch(`/api/dashboard/videos/${deleteVideo.id}`, { method: "DELETE" })
                  if (res.ok) {
                    toast({ description: "✅ تم حذف الفيديو" })
                    qc.invalidateQueries({ queryKey: ["videos"] })
                  } else {
                    toast({ description: "❌ فشل الحذف" })
                  }
                  setDeleteOpen(false)
                }}
                className="bg-red-500 hover:bg-red-600 rounded-xl"
              >
                <Trash2 className="w-4 h-4 ml-2" />
                تأكيد الحذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default function VideosPage() {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <PageInner />
    </QueryClientProvider>
  )
}

