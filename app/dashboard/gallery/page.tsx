"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Search, Plus, Edit2, Trash2, Upload, X, Image as ImageIcon } from "lucide-react"

type Photo = { id: string; caption: string; url: string; createdAt: string }

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editPhoto, setEditPhoto] = useState<Photo | null>(null)
  const [editCaption, setEditCaption] = useState("")
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletePhoto, setDeletePhoto] = useState<Photo | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => { if (authStatus === "unauthenticated") router.replace("/login") }, [authStatus, router])

  const list = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/gallery`)
      if (!res.ok) throw new Error("فشل تحميل البيانات")
      return res.json() as Promise<{ data: Photo[] }>
    }
  })

  const rowsAll = list.data?.data || []
  const rows = useMemo(() => {
    const term = search.trim()
    if (!term) return rowsAll
    return rowsAll.filter(p => (p.caption || "").toLowerCase().includes(term.toLowerCase()))
  }, [rowsAll, search])

  return (
    <div dir="rtl" className="text-right min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 md:p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center shadow-lg">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#003366]">معرض الصور</h1>
                  <p className="text-sm text-slate-600">إدارة ومشاركة صور الأخبار</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200">
                <span className="text-sm text-slate-600">إجمالي الصور:</span>
                <span className="text-lg font-bold text-[#003366] mr-2">{rowsAll.length}</span>
              </div>
            </div>
          </div>

          {/* Search and Add Section */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                placeholder="ابحث في الصور..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="pr-10 h-11 bg-white border-slate-200 shadow-sm focus:ring-2 focus:ring-[#00B4D8]/20 rounded-xl"
              />
            </div>
            <Button 
              type="button" 
              className="h-11 bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#0096C7] hover:to-[#0077B6] shadow-lg shadow-[#00B4D8]/25 rounded-xl font-medium" 
              onClick={() => setOpen(true)}
            >
              <Plus className="w-5 h-5 ml-2" />
              إضافة صور جديدة
            </Button>
          </div>
        </div>

        {/* Upload Dialog */}
        <Dialog open={open} onOpenChange={(o) => { 
          if (!o) { 
            setOpen(false); 
            setFiles([]); 
            const input = document.getElementById("gallery-files") as HTMLInputElement | null; 
            if (input) input.value = "" 
          } 
        }}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#003366] flex items-center gap-2">
                <Upload className="w-6 h-6" />
                إضافة صور للمعرض
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50/50 hover:border-[#00B4D8] transition-colors">
                <label htmlFor="gallery-files" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-[#00B4D8]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-700">اضغط لاختيار الصور</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP · حتى 8MB لكل صورة</p>
                  </div>
                </label>
                <input
                  id="gallery-files"
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  multiple
                  onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
                  className="hidden"
                />
              </div>

              {files && files.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-700">الصور المحددة ({files.length})</h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setFiles([]);
                        const input = document.getElementById("gallery-files") as HTMLInputElement | null;
                        if (input) input.value = "";
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 ml-1" />
                      إزالة الكل
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto p-1">
                    {files.map((f, idx) => (
                      <div key={idx} className="group relative rounded-xl overflow-hidden bg-white border-2 border-slate-200 hover:border-[#00B4D8] transition-all shadow-sm hover:shadow-md">
                        <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                          {f.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(f)}
                              alt={f.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                            />
                          ) : (
                            <span className="text-xs text-slate-500">ملف</span>
                          )}
                        </div>
                        <button
                          className="absolute top-2 left-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs text-white truncate" title={f.name}>{f.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">إلغاء</Button>
              <Button
                disabled={uploading || !files || files.length === 0}
                onClick={async () => {
                  if (!files || files.length === 0) return
                  try {
                    setUploading(true)
                    const fd = new FormData()
                    files.forEach(f => fd.append("files", f))
                    const res = await fetch(`/api/dashboard/gallery`, { method: "POST", body: fd })
                    if (!res.ok) throw new Error()
                    await res.json()
                    setFiles([])
                    const input = document.getElementById("gallery-files") as HTMLInputElement | null
                    if (input) input.value = ""
                    qc.invalidateQueries({ queryKey: ["gallery"] })
                    setOpen(false)
                    toast({ description: "✅ تم رفع الصور بنجاح" })
                  } catch {
                    toast({ description: "❌ فشل رفع الصور" })
                  } finally {
                    setUploading(false)
                  }
                }}
                className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#0096C7] hover:to-[#0077B6] rounded-xl"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                    جاري الرفع...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 ml-2" />
                    رفع {files.length} صورة
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Gallery Grid */}
        <Card className="rounded-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            {!list.isLoading && rows.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {rows.map(p => (
                  <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-[#00B4D8] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img 
                        src={p.url} 
                        alt={p.caption} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-white hover:bg-slate-50 text-slate-700 shadow-lg rounded-xl h-9" 
                          onClick={() => { setEditPhoto(p); setEditCaption(p.caption || ""); setEditOpen(true) }}
                        >
                          <Edit2 className="w-3.5 h-3.5 ml-1" />
                          تعديل
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-lg rounded-xl h-9" 
                          onClick={() => { setDeletePhoto(p); setDeleteOpen(true) }}
                        >
                          <Trash2 className="w-3.5 h-3.5 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-sm font-semibold text-[#003366] truncate" title={p.caption || "بدون تسمية"}>
                        {p.caption || "بدون تسمية"}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{new Date(p.createdAt).toLocaleDateString('ar-DZ')}</span>
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!list.isLoading && rows.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <ImageIcon className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  {search ? "لا توجد نتائج" : "لا توجد صور بعد"}
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  {search ? "جرب كلمات بحث أخرى" : "ابدأ بإضافة صور إلى المعرض"}
                </p>
                {!search && (
                  <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] rounded-xl">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة صور
                  </Button>
                )}
              </div>
            )}

            {list.isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white border border-slate-200">
                    <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse" />
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

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                <Edit2 className="w-5 h-5" />
                تعديل تسمية الصورة
              </DialogTitle>
            </DialogHeader>
            {editPhoto && (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border-2 border-slate-200">
                  <img src={editPhoto.url} alt={editPhoto.caption} className="w-full aspect-video object-cover" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">التسمية</label>
                  <Input 
                    value={editCaption} 
                    onChange={(e) => setEditCaption(e.target.value)} 
                    placeholder="أدخل تسمية الصورة" 
                    className="rounded-xl"
                  />
                </div>
              </div>
            )}
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setEditOpen(false)} className="rounded-xl">إلغاء</Button>
              <Button 
                onClick={async () => {
                  if (!editPhoto) return
                  const res = await fetch(`/api/dashboard/gallery/${editPhoto.id}`, { 
                    method: "PATCH", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({ caption: editCaption }) 
                  })
                  if (res.ok) {
                    toast({ description: "✅ تم التعديل بنجاح" })
                    setEditOpen(false)
                    qc.invalidateQueries({ queryKey: ["gallery"] })
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

        {/* Delete Alert Dialog */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                تأكيد حذف الصورة
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-3">
              {deletePhoto && (
                <div className="rounded-xl overflow-hidden border-2 border-slate-200">
                  <img src={deletePhoto.url} alt={deletePhoto.caption} className="w-full aspect-video object-cover" />
                </div>
              )}
              <p className="text-sm text-slate-600 bg-red-50 border border-red-200 rounded-lg p-3">
                ⚠️ هل أنت متأكد من حذف هذه الصورة؟ هذا الإجراء لا يمكن التراجع عنه.
              </p>
            </div>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="rounded-xl">إلغاء</AlertDialogCancel>
              <AlertDialogAction 
                onClick={async () => {
                  if (!deletePhoto) return
                  const res = await fetch(`/api/dashboard/gallery/${deletePhoto.id}`, { method: "DELETE" })
                  if (res.ok) {
                    toast({ description: "✅ تم حذف الصورة" })
                    qc.invalidateQueries({ queryKey: ["gallery"] })
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

export default function GalleryPage() {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <PageInner />
    </QueryClientProvider>
  )
}