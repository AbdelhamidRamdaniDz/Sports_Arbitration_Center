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
    <div dir="rtl" className="text-right min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#003366] via-[#004d99] to-[#00B4D8] flex items-center justify-center shadow-2xl shadow-[#003366]/20 ring-4 ring-white">
                  <ImageIcon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-white shadow-lg" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#003366] to-[#00B4D8] bg-clip-text text-transparent">معرض الصور</h1>
                <p className="text-sm lg:text-base text-slate-500 font-medium">إدارة ومشاركة صور الأخبار والمحتوى المرئي</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="group relative px-5 py-3 bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200/60 hover:shadow-xl hover:border-[#00B4D8]/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600">إجمالي الصور</span>
                  <div className="h-5 w-px bg-slate-300" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#003366] to-[#00B4D8] bg-clip-text text-transparent tabular-nums">{rowsAll.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Add Section */}
          <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-xl group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#00B4D8] transition-colors" />
              <Input 
                placeholder="ابحث عن صورة بالتسمية أو الوصف..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="pr-12 h-12 bg-white/80 backdrop-blur-sm border-slate-200/80 shadow-sm shadow-slate-200/50 focus:shadow-lg focus:shadow-[#00B4D8]/10 focus:ring-2 focus:ring-[#00B4D8]/20 focus:border-[#00B4D8]/50 rounded-2xl text-base transition-all duration-300 placeholder:text-slate-400"
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
            <Button 
              type="button" 
              className="h-12 px-6 bg-gradient-to-r from-[#00B4D8] via-[#0096C7] to-[#0077B6] hover:from-[#0096C7] hover:via-[#0077B6] hover:to-[#005F8D] shadow-xl shadow-[#00B4D8]/30 hover:shadow-2xl hover:shadow-[#00B4D8]/40 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
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
          <DialogContent className="sm:max-w-4xl rounded-3xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#00B4D8] bg-clip-text text-transparent flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0096C7] flex items-center justify-center shadow-lg">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                إضافة صور للمعرض
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5 mt-2">
              <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-10 lg:p-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 hover:border-[#00B4D8] hover:bg-blue-50/20 transition-all duration-300 group">
                <label htmlFor="gallery-files" className="cursor-pointer flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00B4D8]/10 to-[#0096C7]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-9 h-9 text-[#00B4D8]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#00B4D8] flex items-center justify-center shadow-lg animate-pulse">
                      <Plus className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-base font-bold text-slate-800">اضغط لاختيار الصور أو اسحبها هنا</p>
                    <p className="text-sm text-slate-500">PNG, JPG, WEBP · حتى 8MB لكل صورة · يمكنك اختيار عدة صور</p>
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <span>الصور المحددة</span>
                      <span className="px-2.5 py-0.5 bg-[#00B4D8] text-white text-xs font-bold rounded-full">{files.length}</span>
                    </h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setFiles([]);
                        const input = document.getElementById("gallery-files") as HTMLInputElement | null;
                        if (input) input.value = "";
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl font-medium"
                    >
                      <X className="w-4 h-4 ml-1" />
                      إزالة الكل
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[450px] overflow-y-auto p-2 rounded-xl">
                    {files.map((f, idx) => (
                      <div key={idx} className="group relative rounded-2xl overflow-hidden bg-white border-2 border-slate-200 hover:border-[#00B4D8] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]">
                        <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                          {f.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(f)}
                              alt={f.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                              onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                            />
                          ) : (
                            <span className="text-xs text-slate-500 font-medium">ملف</span>
                          )}
                        </div>
                        <button
                          className="absolute top-2 left-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
                          onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-xs font-medium text-white truncate" title={f.name}>{f.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="gap-3 mt-2">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)} 
                className="rounded-xl h-11 px-6 border-2 hover:bg-slate-50 font-medium"
              >
                إلغاء
              </Button>
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
                className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#0096C7] hover:to-[#0077B6] rounded-xl h-11 px-6 shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20 rounded-3xl" />
          <Card className="relative rounded-3xl shadow-2xl shadow-slate-200/60 border-slate-200/60 bg-white/40 backdrop-blur-xl overflow-hidden">
            <CardContent className="p-6 lg:p-8">
              {!list.isLoading && rows.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-6">
                  {rows.map(p => (
                    <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-white border-2 border-slate-200/80 hover:border-[#00B4D8] transition-all duration-500 hover:shadow-2xl hover:shadow-[#00B4D8]/20 hover:-translate-y-2">
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                        <img 
                          src={p.url} 
                          alt={p.caption} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-1" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="absolute top-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-white/95 backdrop-blur-sm hover:bg-white text-slate-700 shadow-xl rounded-xl h-10 font-semibold hover:scale-105 active:scale-95 transition-all" 
                            onClick={() => { setEditPhoto(p); setEditCaption(p.caption || ""); setEditOpen(true) }}
                          >
                            <Edit2 className="w-4 h-4 ml-1.5" />
                            تعديل
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-xl rounded-xl h-10 font-semibold hover:scale-105 active:scale-95 transition-all" 
                            onClick={() => { setDeletePhoto(p); setDeleteOpen(true) }}
                          >
                            <Trash2 className="w-4 h-4 ml-1.5" />
                            حذف
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3 bg-gradient-to-b from-white to-slate-50/50">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-bold text-[#003366] line-clamp-2 flex-1 leading-relaxed" title={p.caption || "بدون تسمية"}>
                            {p.caption || "بدون تسمية"}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                          <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            {new Date(p.createdAt).toLocaleDateString('ar-DZ', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                            <span className="text-xs font-semibold text-emerald-600">نشط</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!list.isLoading && rows.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 lg:py-32">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 flex items-center justify-center shadow-xl">
                      <ImageIcon className="w-14 h-14 text-slate-300" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#0096C7] flex items-center justify-center shadow-xl">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
                    {search ? "لا توجد نتائج مطابقة" : "لا توجد صور بعد"}
                  </h3>
                  <p className="text-base text-slate-500 mb-8 max-w-md text-center">
                    {search ? "جرب استخدام كلمات بحث مختلفة أو أزل الفلاتر" : "ابدأ بإضافة صور رائعة إلى المعرض لعرضها ومشاركتها"}
                  </p>
                  {!search && (
                    <Button 
                      onClick={() => setOpen(true)} 
                      className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#0096C7] hover:to-[#0077B6] rounded-2xl h-12 px-8 shadow-xl font-semibold text-base hover:scale-105 active:scale-95 transition-all"
                    >
                      <Plus className="w-5 h-5 ml-2" />
                      إضافة صور الآن
                    </Button>
                  )}
                </div>
              )}

              {list.isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-6">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden bg-white border-2 border-slate-200/60 shadow-lg">
                      <div className="aspect-square bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50 animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-3/4 animate-pulse" />
                        <div className="flex items-center justify-between pt-2">
                          <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-1/3 animate-pulse" />
                          <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-1/4 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-lg rounded-3xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#003366] to-[#00B4D8] bg-clip-text text-transparent flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0096C7] flex items-center justify-center shadow-lg">
                  <Edit2 className="w-5 h-5 text-white" />
                </div>
                تعديل تسمية الصورة
              </DialogTitle>
            </DialogHeader>
            {editPhoto && (
              <div className="space-y-5 mt-2">
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl">
                  <img src={editPhoto.url} alt={editPhoto.caption} className="w-full aspect-video object-cover" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <span>التسمية</span>
                    <span className="text-xs text-slate-400 font-normal">(اختياري)</span>
                  </label>
                  <Input 
                    value={editCaption} 
                    onChange={(e) => setEditCaption(e.target.value)} 
                    placeholder="أدخل وصفاً واضحاً للصورة..." 
                    className="rounded-xl h-11 border-2 focus:ring-2 focus:ring-[#00B4D8]/20"
                  />
                </div>
              </div>
            )}
            <DialogFooter className="gap-3 mt-2">
              <Button 
                variant="outline" 
                onClick={() => setEditOpen(false)} 
                className="rounded-xl h-11 px-6 border-2 hover:bg-slate-50 font-medium"
              >
                إلغاء
              </Button>
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
                className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#0096C7] hover:to-[#0077B6] rounded-xl h-11 px-6 shadow-lg font-semibold"
              >
                <Edit2 className="w-4 h-4 ml-2" />
                حفظ التعديلات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Alert Dialog */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent className="rounded-3xl border-0 shadow-2xl max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl shadow-red-500/30">
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <span>تأكيد حذف الصورة</span>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4 mt-2">
              {deletePhoto && (
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl">
                  <img src={deletePhoto.url} alt={deletePhoto.caption} className="w-full aspect-video object-cover" />
                </div>
              )}
              <div className="relative rounded-2xl bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 p-4">
                <div className="absolute top-2 right-2 w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <span className="text-lg">⚠️</span>
                </div>
                <p className="text-sm font-medium text-red-900 leading-relaxed pr-10">
                  هل أنت متأكد من حذف هذه الصورة نهائياً؟ لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
                </p>
              </div>
            </div>
            <AlertDialogFooter className="gap-3 mt-2">
              <AlertDialogCancel className="rounded-xl h-11 px-6 border-2 hover:bg-slate-50 font-medium">
                إلغاء
              </AlertDialogCancel>
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
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl h-11 px-6 shadow-xl shadow-red-500/30 font-semibold hover:scale-105 active:scale-95 transition-all"
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