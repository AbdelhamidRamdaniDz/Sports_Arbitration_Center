"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Inbox, UserCheck, Download, Upload, Edit, Trash, Calendar, Folder, Copy, Eye, Search, ChevronUp, ChevronDown, AlertCircle, CheckCircle2, UploadCloud, Info, Filter, X, RefreshCcw } from "lucide-react"

type Arbitration = {
  id: string
  clientName: string
  type: string
  status: "new" | "in_review" | "assigned" | "closed" | string
  description?: string | null
  assignedTo?: string | null
  createdAt: string
  updatedAt: string
  documents: { id: string; name: string; url: string; createdAt: string }[]
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    new: { bg: "bg-gradient-to-r from-blue-500 to-blue-600", text: "text-white", label: "جديد", icon: "🆕" },
    in_review: { bg: "bg-gradient-to-r from-amber-500 to-orange-600", text: "text-white", label: "قيد المراجعة", icon: "⏳" },
    assigned: { bg: "bg-gradient-to-r from-purple-500 to-violet-600", text: "text-white", label: "مُسند", icon: "👤" },
    closed: { bg: "bg-gradient-to-r from-emerald-500 to-teal-600", text: "text-white", label: "مكتمل", icon: "✓" },
  }
  const cfg = config[status as keyof typeof config] || { bg: "bg-slate-200", text: "text-slate-700", label: status, icon: "" }
  return (
    <Badge className={`${cfg.bg} ${cfg.text} border-0 shadow-md px-3 py-1.5 text-xs font-semibold rounded-full`}>
      <span className="mr-1">{cfg.icon}</span>
      {cfg.label}
    </Badge>
  )
}

function PageInner() {
  const router = useRouter()
  const { status: authStatus, data: session } = useSession()
  const { toast } = useToast()
  const qc = useQueryClient()
  const sp = useSearchParams()
  const [statusFilter, setStatusFilter] = useState<string>(sp!.get("status") || "")
  const [search, setSearch] = useState<string>(sp!.get("search") || "")
  const [from, setFrom] = useState<string>("")
  const [to, setTo] = useState<string>("")
  const [page, setPage] = useState<number>(Number(sp!.get("page") || 1))
  const [limit, setLimit] = useState<number>(Number(sp!.get("limit") || 10))
  const [sort, setSort] = useState<string>(sp!.get("sort") || "-createdAt")
  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [statusId, setStatusId] = useState<string | null>(null)
  const [newStatus, setNewStatus] = useState<string>("")
  const [closeNote, setCloseNote] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploadContextId, setUploadContextId] = useState<string | null>(null)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState<boolean>(false)

  useEffect(() => {
    if (authStatus === "unauthenticated") router.replace("/login")
  }, [authStatus, router])

  const queryKey = useMemo(() => ["arbitrations", { status: statusFilter, search, page, limit, sort }], [statusFilter, search, page, limit, sort])

  const listQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)
      if (search) params.set("search", search)
      if (page) params.set("page", String(page))
      if (limit) params.set("limit", String(limit))
      if (sort) params.set("sort", sort)
      const res = await fetch(`/api/dashboard/arbitration?${params.toString()}`)
      if (!res.ok) throw new Error("فشل تحميل البيانات")
      return res.json() as Promise<{ data: Arbitration[]; meta: { page: number; limit: number; total: number } }>
    },
    keepPreviousData: true,
  })

  const allCount = useQuery({
    queryKey: ["arb-count", "all"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/arbitration?limit=1`)
      if (!res.ok) throw new Error("فشل تحميل الإحصائيات")
      return res.json() as Promise<{ meta: { total: number } }>
    },
  })
  const newCount = useQuery({
    queryKey: ["arb-count", "new"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/arbitration?status=new&limit=1`)
      if (!res.ok) throw new Error("فشل تحميل الإحصائيات")
      return res.json() as Promise<{ meta: { total: number } }>
    },
  })
  const reviewCount = useQuery({
    queryKey: ["arb-count", "in_review"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/arbitration?status=in_review&limit=1`)
      if (!res.ok) throw new Error("فشل تحميل الإحصائيات")
      return res.json() as Promise<{ meta: { total: number } }>
    },
  })
  const closedCount = useQuery({
    queryKey: ["arb-count", "closed"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/arbitration?status=closed&limit=1`)
      if (!res.ok) throw new Error("فشل تحميل الإحصائيات")
      return res.json() as Promise<{ meta: { total: number } }>
    },
  })

  const detailsQuery = useQuery({
    queryKey: ["arbitration", detailsId],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/arbitration/${detailsId}`)
      if (!res.ok) throw new Error("فشل تحميل التفاصيل")
      return res.json() as Promise<Arbitration>
    },
    enabled: !!detailsId,
  })

  const updateStatus = useMutation({
    mutationFn: async (v: { id: string; status: string; note?: string }) => {
      const res = await fetch(`/api/dashboard/arbitration/${v.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: v.status, note: v.note }) })
      if (!res.ok) throw new Error("تعذر تحديث الحالة")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey })
      if (detailsId) qc.invalidateQueries({ queryKey: ["arbitration", detailsId] })
      toast({ description: "تم تحديث الحالة بنجاح" })
      setStatusId(null)
      setNewStatus("")
      setCloseNote("")
    },
    onError: () => toast({ description: "حدث خطأ أثناء تحديث الحالة" }),
  })

  const uploadDocs = useMutation({
    mutationFn: async (v: { id: string; files: File[] }) => {
      const fd = new FormData()
      v.files.forEach(f => fd.append("files", f))
      const res = await fetch(`/api/dashboard/arbitration/${v.id}/documents`, { method: "POST", body: fd })
      if (!res.ok) throw new Error("تعذر رفع الملفات")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey })
      if (detailsId) qc.invalidateQueries({ queryKey: ["arbitration", detailsId] })
      toast({ description: "تم رفع الملفات بنجاح" })
      setUploadContextId(null)
      setPendingFiles([])
      if (fileInputRef.current) fileInputRef.current.value = ""
    },
    onError: () => toast({ description: "فشل رفع الملفات" }),
  })

  const deleteDoc = useMutation({
    mutationFn: async (v: { arbitrationId: string; docId: string }) => {
      const res = await fetch(`/api/dashboard/arbitration/${v.arbitrationId}/documents/${v.docId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("تعذر حذف الملف")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey })
      if (detailsId) qc.invalidateQueries({ queryKey: ["arbitration", detailsId] })
      toast({ description: "تم حذف الملف بنجاح" })
    },
    onError: () => toast({ description: "فشل حذف الملف" }),
  })

  function exportCsv() {
    const body = { status: statusFilter || undefined, search: search || undefined }
    fetch(`/api/dashboard/arbitration/export`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(async res => {
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "arbitration_export.csv"
      a.click()
      URL.revokeObjectURL(url)
    }).catch(() => toast({ description: "تعذر التصدير" }))
  }

  const meta = listQuery.data?.meta
  const rows = listQuery.data?.data || []
  const start = meta ? (meta.page - 1) * meta.limit + 1 : 0
  const end = meta ? Math.min(meta.page * meta.limit, meta.total) : 0
  const isDateDesc = sort.startsWith("-")
  const hasFilters = statusFilter || search || from || to

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Inbox className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">إجمالي الطلبات</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-slate-600 to-slate-800 bg-clip-text text-transparent">
                    {allCount.data?.meta.total ?? 0}
                  </div>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-l from-slate-500 to-slate-700 rounded-full"></div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">طلبات جديدة</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    {newCount.data?.meta.total ?? 0}
                  </div>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-l from-blue-500 to-blue-600 rounded-full"></div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <AlertCircle className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">قيد المراجعة</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-amber-500 to-orange-600 bg-clip-text text-transparent">
                    {reviewCount.data?.meta.total ?? 0}
                  </div>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-l from-amber-500 to-orange-600 rounded-full"></div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">مكتملة</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    {closedCount.data?.meta.total ?? 0}
                  </div>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-l from-emerald-500 to-teal-600 rounded-full"></div>
            </CardContent>
          </Card>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-l from-[#003366] to-[#00B4D8] bg-clip-text text-transparent">
              طلبات التحكيم
            </h1>
            <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              إدارة ومتابعة جميع طلبات التحكيم
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => listQuery.refetch()}
              className="rounded-xl hover:bg-slate-50 transition-all"
              disabled={listQuery.isFetching}
            >
              <RefreshCcw className={`h-4 w-4 ml-2 ${listQuery.isFetching ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#0096C7] hover:to-[#0077B6] shadow-lg rounded-xl font-semibold" 
              onClick={exportCsv}
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير CSV
            </Button>
          </div>
        </div>

        {/* Main Card */}
        <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50/50">
            <CardTitle className="text-2xl font-bold text-[#003366] flex items-center gap-2">
              <Filter className="h-6 w-6 text-[#00B4D8]" />
              إدارة الطلبات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Filters */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <Select value={statusFilter || "all"} onValueChange={(v) => { setStatusFilter(v === "all" ? "" : v); setPage(1) }}>
                  <SelectTrigger className="rounded-xl bg-white border-slate-200">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="new">🆕 جديد</SelectItem>
                    <SelectItem value="in_review">⏳ قيد المراجعة</SelectItem>
                    <SelectItem value="assigned">👤 مُسند</SelectItem>
                    <SelectItem value="closed">✓ مغلق</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input 
                    placeholder="بحث بالرقم أو الاسم..." 
                    value={search} 
                    onChange={(e) => { setSearch(e.target.value); setPage(1) }} 
                    className="pl-10 rounded-xl bg-white border-slate-200"
                  />
                </div>

                <div className="relative">
                  <Calendar className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <Input 
                    type="date" 
                    value={from} 
                    onChange={(e) => setFrom(e.target.value)} 
                    className="pl-10 rounded-xl bg-white border-slate-200"
                    placeholder="من تاريخ"
                  />
                </div>

                <div className="relative">
                  <Calendar className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <Input 
                    type="date" 
                    value={to} 
                    onChange={(e) => setTo(e.target.value)} 
                    className="pl-10 rounded-xl bg-white border-slate-200"
                    placeholder="إلى تاريخ"
                  />
                </div>

                <Select value={String(limit)} onValueChange={(v) => { setLimit(Number(v)); setPage(1) }}>
                  <SelectTrigger className="rounded-xl bg-white border-slate-200">
                    <SelectValue placeholder="عدد النتائج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 نتائج</SelectItem>
                    <SelectItem value="20">20 نتيجة</SelectItem>
                    <SelectItem value="50">50 نتيجة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 font-medium">الفلاتر النشطة:</span>
                  {statusFilter && (
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      {statusFilter}
                      <X className="h-3 w-3 mr-1 cursor-pointer" onClick={() => setStatusFilter("")} />
                    </Badge>
                  )}
                  {search && (
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      بحث: {search}
                      <X className="h-3 w-3 mr-1 cursor-pointer" onClick={() => setSearch("")} />
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => { setStatusFilter(""); setSearch(""); setFrom(""); setTo("") }}
                    className="text-xs rounded-xl"
                  >
                    مسح الكل
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600 font-medium bg-slate-100 px-4 py-2 rounded-xl">
                  عرض <span className="font-bold text-[#003366]">{rows.length ? start : 0}-{rows.length ? end : 0}</span> من أصل <span className="font-bold text-[#003366]">{meta?.total ?? 0}</span>
                </div>
                {listQuery.isFetching && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="h-4 w-4 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin"></div>
                    جاري التحميل...
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Table */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-l from-slate-50 to-blue-50/30 hover:bg-gradient-to-l">
                      <TableHead className="text-right font-bold text-slate-700">رقم الطلب</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">اسم المرسل</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">نوع القضية</TableHead>
                      <TableHead 
                        className="text-right font-bold text-slate-700 cursor-pointer select-none hover:text-[#00B4D8] transition-colors" 
                        onClick={() => setSort(sort.startsWith("-") ? "createdAt" : "-createdAt")}
                      >
                        <div className="flex items-center gap-2">
                          تاريخ الإنشاء
                          {isDateDesc ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-bold text-slate-700">الحالة</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">محكّم مسؤول</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">آخر تحديث</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((r: Arbitration, idx: number) => (
                      <TableRow 
                        key={r.id} 
                        className={`hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                      >
                        <TableCell className="font-mono text-sm font-semibold text-[#003366]">
                          {r.id.slice(0, 8)}…
                        </TableCell>
                        <TableCell className="font-medium">{r.clientName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-full border-slate-300">
                            {r.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {new Date(r.createdAt).toLocaleDateString('ar-SA', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={r.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {r.assignedTo ? (
                              <>
                                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center text-white text-xs font-bold">
                                  {r.assignedTo.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium">{r.assignedTo}</span>
                              </>
                            ) : (
                              <span className="text-slate-400 text-sm">غير مُسند</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {new Date(r.updatedAt).toLocaleDateString('ar-SA', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all" 
                              onClick={() => setDetailsId(r.id)}
                            >
                              <Eye className="h-4 w-4 ml-1" />
                              عرض
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all" 
                              onClick={() => { setStatusId(r.id); setNewStatus(r.status) }}
                            >
                              <Edit className="h-4 w-4 ml-1" />
                              تعديل
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all" 
                              onClick={() => setUploadContextId(r.id)}
                            >
                              <Upload className="h-4 w-4 ml-1" />
                              رفع
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {rows.length === 0 && !listQuery.isFetching && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <Inbox className="h-16 w-16 text-slate-300" />
                            <div className="text-slate-500 font-medium">لا توجد طلبات حالياً</div>
                            <p className="text-sm text-slate-400">جرّب تغيير الفلاتر أو البحث</p>
                          </div>
                        </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="text-sm text-slate-600 font-medium bg-slate-100 px-4 py-2 rounded-xl">
                الصفحة <span className="font-bold text-[#003366]">{meta?.page || 1}</span> من <span className="font-bold text-[#003366]">{meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1}</span>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  disabled={page <= 1 || listQuery.isFetching} 
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-xl hover:bg-slate-50 font-semibold disabled:opacity-50"
                >
                  السابق
                </Button>
                <div className="flex items-center gap-2">
                  <div className="h-10 px-4 rounded-xl bg-gradient-to-l from-[#003366] to-[#00B4D8] text-white font-bold flex items-center justify-center shadow-lg">
                    {meta?.page || 1}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  disabled={!!meta && page >= Math.ceil(meta.total / meta.limit) || listQuery.isFetching} 
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-xl hover:bg-slate-50 font-semibold disabled:opacity-50"
                >
                  التالي
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!detailsId} onOpenChange={(o) => { if (!o) setDetailsId(null) }}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-0 shadow-2xl">
          <div className="sticky top-0 z-10 bg-gradient-to-l from-[#003366] via-[#00509E] to-[#00B4D8] text-white px-8 py-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">تفاصيل طلب التحكيم</h2>
                <div className="flex items-center gap-3">
                  <p className="text-sm bg-white/20 backdrop-blur px-4 py-1.5 rounded-full font-mono">
                    {detailsQuery.data ? detailsQuery.data.id.slice(0, 12).toUpperCase() : "—"}
                  </p>
                  {detailsQuery.data && <StatusBadge status={detailsQuery.data.status} />}
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            {detailsQuery.isLoading && (
              <div className="space-y-4">
                <div className="h-32 bg-slate-200 rounded-3xl animate-pulse" />
                <div className="h-48 bg-slate-200 rounded-3xl animate-pulse" />
                <div className="h-64 bg-slate-200 rounded-3xl animate-pulse" />
              </div>
            )}
            
            {detailsQuery.data && (
              <div className="space-y-6">
                {/* Info Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <UserCheck className="h-4 w-4 text-[#00B4D8]" />
                          اسم العميل
                        </div>
                        <div className="text-lg font-bold text-[#003366] group-hover:text-[#00B4D8] transition-colors">
                          {detailsQuery.data.clientName}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <FileText className="h-4 w-4 text-[#00B4D8]" />
                          نوع القضية
                        </div>
                        <div className="text-lg font-bold text-[#003366] group-hover:text-[#00B4D8] transition-colors">
                          {detailsQuery.data.type}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Inbox className="h-4 w-4 text-[#00B4D8]" />
                          رقم الطلب
                        </div>
                        <div className="text-sm font-mono font-bold text-[#003366] break-all">
                          {detailsQuery.data.id}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Calendar className="h-4 w-4 text-[#00B4D8]" />
                          تاريخ الإنشاء
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {new Date(detailsQuery.data.createdAt).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Calendar className="h-4 w-4 text-[#00B4D8]" />
                          آخر تحديث
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {new Date(detailsQuery.data.updatedAt).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <UserCheck className="h-4 w-4 text-[#00B4D8]" />
                          محكّم مسؤول
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {detailsQuery.data.assignedTo || (
                            <span className="text-slate-400 text-sm">غير مُسند</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-white">
                  <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        وصف القضية
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-xl hover:bg-slate-100"
                        onClick={() => {
                          if (navigator?.clipboard && detailsQuery.data?.description) {
                            navigator.clipboard.writeText(detailsQuery.data.description)
                            toast({ description: "تم نسخ النص" })
                          }
                        }}
                      >
                        <Copy className="h-4 w-4 ml-1" />
                        نسخ
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose prose-slate max-w-none">
                      <div className="text-base leading-8 text-slate-700 whitespace-pre-wrap">
                        {detailsQuery.data.description || (
                          <span className="text-slate-400 italic">لا يوجد وصف</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>عدد الأحرف: <span className="font-bold text-slate-700">{detailsQuery.data.description?.length || 0}</span></span>
                        <span>عدد الكلمات: <span className="font-bold text-slate-700">{detailsQuery.data.description?.split(/\s+/).filter(Boolean).length || 0}</span></span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-white">
                  <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                          <Folder className="h-5 w-5 text-white" />
                        </div>
                        المستندات المرفقة
                        <Badge className="bg-gradient-to-r from-[#003366] to-[#00B4D8] border-0 text-white">
                          {detailsQuery.data.documents.length}
                        </Badge>
                      </CardTitle>
                      <Button 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl shadow-lg font-semibold"
                        onClick={() => setUploadContextId(detailsQuery.data!.id)}
                      >
                        <Upload className="h-4 w-4 ml-1" />
                        رفع مستند
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {detailsQuery.data.documents.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/50">
                        <Folder className="h-16 w-16 text-slate-300 mb-4" />
                        <div className="text-slate-500 font-medium mb-2">لا توجد مستندات مرفقة</div>
                        <p className="text-sm text-slate-400 mb-4">ابدأ برفع المستندات المتعلقة بهذا الطلب</p>
                        <Button 
                          className="bg-gradient-to-r from-[#003366] to-[#00B4D8] hover:from-[#00509E] hover:to-[#0096C7] rounded-xl"
                          onClick={() => setUploadContextId(detailsQuery.data!.id)}
                        >
                          <Upload className="h-4 w-4 ml-1" />
                          رفع أول مستند
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {detailsQuery.data.documents.map((d) => (
                          <div 
                            key={d.id} 
                            className="group relative rounded-2xl border-2 border-slate-200 p-5 bg-gradient-to-br from-white to-slate-50 hover:shadow-xl hover:scale-[1.02] hover:border-[#00B4D8] transition-all duration-300"
                          >
                            <div className="flex items-start gap-3 mb-4">
                              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <FileText className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[#003366] truncate group-hover:text-[#00B4D8] transition-colors" title={d.name}>
                                  {d.name}
                                </div>
                                {d.createdAt && (
                                  <div className="text-xs text-slate-500 mt-1">
                                    {new Date(d.createdAt).toLocaleDateString('ar-SA', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <a 
                                href={d.url} 
                                download 
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0096C7] text-white font-semibold text-sm hover:shadow-lg transition-all"
                              >
                                <Download className="h-4 w-4" />
                                تحميل
                              </a>
                              <a 
                                href={d.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                              <Button 
                                variant="ghost"
                                size="sm"
                                className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all"
                                onClick={() => {
                                  if (confirm('هل أنت متأكد من حذف هذا المستند؟')) {
                                    deleteDoc.mutate({ arbitrationId: detailsQuery.data!.id, docId: d.id })
                                  }
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200">
                  <Button 
                    className="bg-gradient-to-r from-[#003366] to-[#00B4D8] hover:from-[#00509E] hover:to-[#0096C7] shadow-lg rounded-xl font-semibold"
                    onClick={() => { setStatusId(detailsQuery.data!.id); setNewStatus(detailsQuery.data!.status) }}
                  >
                    <Edit className="h-4 w-4 ml-1" />
                    تغيير الحالة
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-[#00B4D8] text-[#00B4D8] hover:bg-blue-50 rounded-xl font-semibold"
                    onClick={() => setUploadContextId(detailsQuery.data!.id)}
                  >
                    <Upload className="h-4 w-4 ml-1" />
                    رفع مستند
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => setDetailsId(null)}
                    className="rounded-xl hover:bg-slate-100"
                  >
                    إغلاق
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={!!statusId} onOpenChange={(o) => { if (!o) { setStatusId(null); setNewStatus(""); setCloseNote("") } }}>
        <DialogContent className="rounded-3xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#003366] flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Edit className="h-6 w-6 text-white" />
              </div>
              تغيير حالة الطلب
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">اختر الحالة الجديدة</label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-full rounded-xl border-2 border-slate-200">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">🆕 جديد</SelectItem>
                  <SelectItem value="in_review">⏳ قيد المراجعة</SelectItem>
                  <SelectItem value="assigned">👤 مُسند</SelectItem>
                  <SelectItem value="closed">✓ مغلق</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newStatus === "closed" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#00B4D8]" />
                  ملاحظة الإغلاق (اختياري)
                </label>
                <Input 
                  placeholder="أضف ملاحظة حول سبب الإغلاق..." 
                  value={closeNote} 
                  onChange={(e) => setCloseNote(e.target.value)}
                  className="rounded-xl border-2 border-slate-200"
                />
              </div>
            )}

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">ملاحظة هامة</p>
                <p>سيتم إشعار جميع الأطراف المعنية بتغيير الحالة</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => { setStatusId(null); setNewStatus(""); setCloseNote("") }}
              className="rounded-xl hover:bg-slate-50"
            >
              إلغاء
            </Button>
            <Button 
              disabled={!newStatus || updateStatus.isPending} 
              onClick={() => { 
                if (!statusId || !newStatus) return
                updateStatus.mutate({ id: statusId, status: newStatus, note: closeNote || undefined }) 
              }}
              className="bg-gradient-to-r from-[#003366] to-[#00B4D8] hover:from-[#00509E] hover:to-[#0096C7] rounded-xl shadow-lg font-semibold"
            >
              {updateStatus.isPending ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                  حفظ التغييرات
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={!!uploadContextId} onOpenChange={(o) => { if (!o) { setUploadContextId(null); setPendingFiles([]); if (fileInputRef.current) fileInputRef.current.value = "" } }}>
        <DialogContent className="rounded-3xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#003366] flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <UploadCloud className="h-6 w-6 text-white" />
              </div>
              رفع مستندات جديدة
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div
              className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                isDragging 
                  ? "border-[#00B4D8] bg-blue-50 scale-[1.02]" 
                  : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                const files = Array.from(e.dataTransfer.files || [])
                setPendingFiles(files)
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all ${
                  isDragging 
                    ? "bg-[#00B4D8] scale-110" 
                    : "bg-slate-200"
                }`}>
                  <UploadCloud className={`h-8 w-8 ${isDragging ? "text-white" : "text-slate-500"}`} />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-700 mb-1">
                    {isDragging ? "أفلت الملفات هنا" : "اسحب الملفات أو انقر للاختيار"}
                  </div>
                  <div className="text-sm text-slate-500">
                    الأنواع المدعومة: PDF, DOCX, PNG, JPG • الحد الأقصى: 10MB
                  </div>
                </div>
                <label className="cursor-pointer">
                  <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#003366] to-[#00B4D8] text-white font-semibold hover:shadow-lg transition-all">
                    اختر ملفات من جهازك
                  </div>
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    multiple 
                    accept=".pdf,.docx,.png,.jpg,.jpeg" 
                    className="hidden" 
                    onChange={(e) => setPendingFiles(Array.from(e.target.files || []))} 
                  />
                </label>
              </div>
            </div>

            {pendingFiles.length > 0 && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-700">
                    الملفات المحددة ({pendingFiles.length})
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setPendingFiles([])}
                    className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                  >
                    <X className="h-3 w-3 ml-1" />
                    مسح الكل
                  </Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {pendingFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200">
                      <FileText className="h-5 w-5 text-[#00B4D8] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-700 truncate">{file.name}</div>
                        <div className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPendingFiles(files => files.filter((_, i) => i !== idx))}
                        className="shrink-0 h-8 w-8 p-0 hover:bg-rose-50 hover:text-rose-600 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <p className="font-semibold mb-1">تعليمات مهمة</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>تأكد من وضوح المستندات وخلوها من كلمات المرور</li>
                  <li>سيتم رفض الملفات التي تتجاوز الحجم المسموح (10MB)</li>
                  <li>الصيغ المدعومة: PDF, DOCX, PNG, JPG</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => { setUploadContextId(null); setPendingFiles([]); if (fileInputRef.current) fileInputRef.current.value = "" }}
              className="rounded-xl hover:bg-slate-50"
            >
              إلغاء
            </Button>
            <Button 
              disabled={!pendingFiles.length || uploadDocs.isPending} 
              onClick={() => {
                if (!uploadContextId || !pendingFiles.length) return
                uploadDocs.mutate({ id: uploadContextId, files: pendingFiles })
              }}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl shadow-lg font-semibold"
            >
              {uploadDocs.isPending ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  جاري الرفع...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 ml-2" />
                  رفع الملفات ({pendingFiles.length})
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function ArbitrationPage() {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <PageInner />
    </QueryClientProvider>
  )
}