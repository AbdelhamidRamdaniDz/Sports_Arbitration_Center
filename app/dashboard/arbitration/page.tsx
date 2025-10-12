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
import { FileText, Inbox, UserCheck, Download, Upload, Edit, Trash, Calendar, Folder, Copy, Eye, Search, ChevronUp, ChevronDown, AlertCircle, CheckCircle2, UploadCloud, Info } from "lucide-react"

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
  const cls =
    status === "new"
      ? "bg-[#DBEAFE] text-[#3B82F6]"
      : status === "in_review"
      ? "bg-[#FEF3C7] text-[#F59E0B]"
      : status === "assigned"
      ? "bg-[#EDE9FE] text-[#8B5CF6]"
      : status === "closed"
      ? "bg-[#D1FAE5] text-[#10B981]"
      : "bg-gray-100 text-gray-700"
  return <Badge className={`rounded-full px-3 py-1 text-sm ${cls}`}>{status}</Badge>
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

  // Stats counts (using meta.total)
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
      toast({ description: "تم رفع الملفات" })
      setUploadContextId(null)
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
      toast({ description: "تم حذف الملف" })
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

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA] p-6 text-right">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-[#64748B]">إجمالي الطلبات</div>
                <div className="text-3xl font-bold text-[#003366]">{allCount.data?.meta.total ?? 0}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#003366]/10 text-[#003366] flex items-center justify-center"><Inbox className="h-5 w-5" aria-hidden /></div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-[#64748B]">طلبات جديدة</div>
                <div className="text-3xl font-bold text-[#3B82F6]">{newCount.data?.meta.total ?? 0}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center"><FileText className="h-5 w-5" aria-hidden /></div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-[#64748B]">قيد المراجعة</div>
                <div className="text-3xl font-bold text-[#F59E0B]">{reviewCount.data?.meta.total ?? 0}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center"><AlertCircle className="h-5 w-5" aria-hidden /></div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-[#64748B]">مكتملة</div>
                <div className="text-3xl font-bold text-[#10B981]">{closedCount.data?.meta.total ?? 0}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center"><CheckCircle2 className="h-5 w-5" aria-hidden /></div>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#003366]">طلبات التحكيم</h1>
          <div className="flex items-center gap-2">
            <Button className="bg-[#00B4D8] hover:bg-[#00B4D8]/90" onClick={exportCsv}><Download className="h-4 w-4 ml-2" />تصدير CSV</Button>
          </div>
        </div>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>إدارة الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2 items-center">
                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "all" ? "" : v); setPage(1) }}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="الحالة" /></SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="new">جديد</SelectItem>
                    <SelectItem value="in_review">قيد المراجعة</SelectItem>
                    <SelectItem value="assigned">مُسند</SelectItem>
                    <SelectItem value="closed">مغلق</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-56">
                  <Search className="h-4 w-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden />
                  <Input placeholder="بحث بالرقم أو الاسم" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="pl-9" />
                </div>
                <div className="relative w-40">
                  <Calendar className="h-4 w-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden />
                  <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="pl-9" />
                </div>
                <div className="relative w-40">
                  <Calendar className="h-4 w-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden />
                  <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="pl-9" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={String(limit)} onValueChange={(v) => { setLimit(Number(v)); setPage(1) }}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="حجم الصفحة" /></SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-[#64748B] mt-2">عرض {rows.length ? start : 0}-{rows.length ? end : 0} من أصل {meta?.total ?? 0}</div>
            <Separator className="my-4" />
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#F8FAFC]">
                  <TableRow>
                    <TableHead className="text-right">رقم الطلب</TableHead>
                    <TableHead className="text-right">اسم المرسل</TableHead>
                    <TableHead className="text-right">نوع القضية</TableHead>
                    <TableHead className="text-right cursor-pointer select-none" onClick={() => setSort(sort.startsWith("-") ? "createdAt" : "-createdAt")}>تاريخ الإنشاء {isDateDesc ? <ChevronDown className="inline h-4 w-4 ml-1" /> : <ChevronUp className="inline h-4 w-4 ml-1" />}</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">محكّم مسؤول</TableHead>
                    <TableHead className="text-right">آخر تحديث</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r: Arbitration) => (
                    <TableRow key={r.id} className="hover:bg-[#F5F7FA] transition-colors">
                      <TableCell className="font-mono">{r.id.slice(0, 8)}…</TableCell>
                      <TableCell>{r.clientName}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={r.status} /></TableCell>
                      <TableCell>{r.assignedTo || "—"}</TableCell>
                      <TableCell>{new Date(r.updatedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="hover:bg-[#F1F5F9]" onClick={() => setDetailsId(r.id)}><FileText className="h-4 w-4 ml-1" />عرض</Button>
                          <Button size="sm" variant="outline" className="hover:bg-[#F1F5F9]" onClick={() => { setStatusId(r.id); setNewStatus(r.status) }}><Edit className="h-4 w-4 ml-1" />حالة</Button>
                          <Button size="sm" variant="outline" className="hover:bg-[#F1F5F9]" onClick={() => setUploadContextId(r.id)}><Upload className="h-4 w-4 ml-1" />رفع</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground">لا توجد بيانات</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-[#64748B]">الصفحة {meta?.page || 1} من {meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1}</div>
              <div className="flex gap-2 items-center">
                <Button variant="outline" disabled={page <= 1 || listQuery.isFetching} onClick={() => setPage((p) => Math.max(1, p - 1))}>السابق</Button>
                <div className="text-sm text-[#003366] font-medium">{meta?.page || 1}</div>
                <Button variant="outline" disabled={!!meta && page >= Math.ceil(meta.total / meta.limit) || listQuery.isFetching} onClick={() => setPage((p) => p + 1)}>التالي</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!detailsId} onOpenChange={(o) => { if (!o) setDetailsId(null) }}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="sr-only">تفاصيل طلب التحكيم</DialogTitle>
          </DialogHeader>
          <div className="bg-gradient-to-b from-white to-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#003366]">تفاصيل طلب التحكيم</h2>
                <p className="mt-2 text-sm text-[#64748B] bg-[#F1F5F9] inline-block px-3 py-1 rounded-full">
                  {detailsQuery.data ? detailsQuery.data.id.slice(0, 12).toUpperCase() : "—"}
                </p>
              </div>
              {detailsQuery.data && <StatusBadge status={detailsQuery.data.status} />}
            </div>
          </div>
          <div className="px-6 py-5 space-y-5">
            {detailsQuery.isLoading && (
              <div className="space-y-3">
                <div className="h-24 bg-[#E2E8F0] rounded-2xl animate-pulse" />
                <div className="h-40 bg-[#E2E8F0] rounded-2xl animate-pulse" />
              </div>
            )}
            {detailsQuery.data && (
              <div className="space-y-5" dir="rtl">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><UserCheck className="h-4 w-4 text-[#94A3B8]" />اسم العميل</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold group-hover:text-[#003366] transition-colors">{detailsQuery.data.clientName}</div>
                    </div>
                    <div className="group md:border-r md:pr-6 border-[#E2E8F0]">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-[#94A3B8]" />نوع القضية</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold group-hover:text-[#003366] transition-colors">{detailsQuery.data.type}</div>
                    </div>
                    <div className="group">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><Inbox className="h-4 w-4 text-[#94A3B8]" />رقم الطلب</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold">{detailsQuery.data.id}</div>
                    </div>
                    <div className="group md:border-r md:pr-6 border-[#E2E8F0]">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><Calendar className="h-4 w-4 text-[#94A3B8]" />تاريخ الإنشاء</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold">{new Date(detailsQuery.data.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="group">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><Calendar className="h-4 w-4 text-[#94A3B8]" />آخر تحديث</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold">{new Date(detailsQuery.data.updatedAt).toLocaleString()}</div>
                    </div>
                    <div className="group md:border-r md:pr-6 border-[#E2E8F0]">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><UserCheck className="h-4 w-4 text-[#94A3B8]" />محكّم مسؤول</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold">{detailsQuery.data.assignedTo || "—"}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0] relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[20px] font-bold text-[#003366] border-b-2 border-[#00B4D8] inline-block pb-1">وصف القضية</h3>
                    <Button variant="ghost" size="sm" aria-label="نسخ النص" onClick={() => { if (navigator?.clipboard) navigator.clipboard.writeText(detailsQuery.data!.description || "") }}>
                      <Copy className="h-4 w-4 text-[#64748B]" />
                    </Button>
                  </div>
                  <div className="text-[15px] leading-8 text-[#334155] font-normal whitespace-pre-wrap" style={{ direction: "rtl", textAlign: "right" }}>
                    {detailsQuery.data.description && detailsQuery.data.description.length > 300 ? (
                      <>
                        {detailsQuery.data.description.slice(0, 300)}{""}
                        <span className="select-none">{detailsQuery.data.description.length > 300 ? "…" : ""}</span>
                        <span className="block mt-3">
                          <Button variant="outline" size="sm" onClick={() => window.alert(detailsQuery.data!.description)} aria-label="عرض كامل">عرض كامل</Button>
                        </span>
                      </>
                    ) : (
                      detailsQuery.data.description || "—"
                    )}
                  </div>
                  <div className="mt-3 text-[12px] text-[#94A3B8]">عدد الأحرف: {detailsQuery.data.description?.length || 0}</div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-[#003366]" />
                      <h3 className="text-[18px] font-semibold text-[#1E293B]">المستندات المرفقة</h3>
                      <Badge variant="secondary" className="bg-[#F1F5F9] text-[#003366]">{detailsQuery.data.documents.length}</Badge>
                    </div>
                    <Button variant="outline" onClick={() => setUploadContextId(detailsQuery.data!.id)} aria-label="إضافة مستند">+ إضافة مستند</Button>
                  </div>
                  {detailsQuery.data.documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center text-[#64748B] py-10 border border-dashed border-[#E2E8F0] rounded-xl">
                      <Folder className="h-10 w-10 text-[#CBD5E1] mb-3" />
                      <div className="mb-2">لا توجد مستندات مرفقة حالياً</div>
                      <Button onClick={() => setUploadContextId(detailsQuery.data!.id)} aria-label="إضافة أول مستند">+ إضافة أول مستند</Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {detailsQuery.data.documents.map((d: { id: string; name: string; url: string; createdAt?: string }) => (
                        <div key={d.id} className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-[2px]">
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="h-5 w-5 text-[#64748B]" />
                            <div className="truncate text-[#003366] font-medium" title={d.name}>{d.name}</div>
                          </div>
                          <div className="text-sm text-[#64748B] space-y-1 mb-4">
                            {d.createdAt && <div>تاريخ الرفع: {new Date(d.createdAt).toLocaleDateString()}</div>}
                          </div>
                          <div className="flex items-center gap-2">
                            <a className="px-2.5 py-1.5 rounded-md text-white bg-[#00B4D8] hover:opacity-90 text-sm" href={d.url} download aria-label="تحميل">تحميل</a>
                            <a className="px-2.5 py-1.5 rounded-md text-[#64748B] border border-[#E2E8F0] text-sm" href={d.url} target="_blank" rel="noreferrer" aria-label="معاينة"><Eye className="inline h-4 w-4 ml-1" />معاينة</a>
                            <Button variant="outline" size="sm" className="text-[#EF4444] border-[#FEE2E2]" onClick={() => deleteDoc.mutate({ arbitrationId: detailsQuery.data!.id, docId: d.id })} aria-label="حذف"><Trash className="h-4 w-4 ml-1" />حذف</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 rounded-xl flex flex-col md:flex-row gap-3 md:items-center md:justify-end">
                  <Button className="bg-gradient-to-tr from-[#00B4D8] to-[#0096C7] text-white shadow-lg" onClick={() => { setStatusId(detailsQuery.data!.id); setNewStatus(detailsQuery.data!.status) }} aria-label="تغيير الحالة">تغيير الحالة</Button>
                  <Button variant="outline" className="border-2 border-[#00B4D8] text-[#00B4D8]" onClick={() => setUploadContextId(detailsQuery.data!.id)} aria-label="رفع مستند">رفع مستند</Button>
                  <Button variant="ghost" onClick={() => setDetailsId(null)} aria-label="إغلاق">إغلاق</Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!statusId} onOpenChange={(o) => { if (!o) { setStatusId(null); setNewStatus(""); setCloseNote("") } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#00B4D8]" />تغيير الحالة</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-full"><SelectValue placeholder="اختر الحالة" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new">🟦 جديد</SelectItem>
                <SelectItem value="in_review">🟧 قيد المراجعة</SelectItem>
                <SelectItem value="assigned">🟪 مُسند</SelectItem>
                <SelectItem value="closed">🟩 مغلق</SelectItem>
              </SelectContent>
            </Select>
            <div className={`transition-all ${newStatus === "closed" ? "max-h-24 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
              <Input placeholder="ملاحظة إغلاق" value={closeNote} onChange={(e) => setCloseNote(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setStatusId(null); setNewStatus(""); setCloseNote("") }}>إلغاء</Button>
            <Button disabled={!newStatus || updateStatus.isPending} onClick={() => { if (!statusId || !newStatus) return; updateStatus.mutate({ id: statusId, status: newStatus, note: closeNote || undefined }) }}>{updateStatus.isPending ? "جاري الحفظ..." : "حفظ"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!uploadContextId} onOpenChange={(o) => { if (!o) { setUploadContextId(null); setPendingFiles([]); if (fileInputRef.current) fileInputRef.current.value = "" } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><UploadCloud className="h-5 w-5 text-[#00B4D8]" />رفع مستندات</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${isDragging ? "border-[#00B4D8] bg-[#F0FDFF]" : "border-[#E2E8F0]"}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false)
                const files = Array.from(e.dataTransfer.files || [])
                setPendingFiles(files)
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="h-8 w-8 text-[#00B4D8]" />
                <div className="text-[#475569]">اسحب الملفات هنا أو انقر للاختيار</div>
                <div className="text-sm text-[#64748B]">الأنواع المدعومة: PDF, DOCX, PNG, JPG • الحد الأقصى: 10MB</div>
                <label className="mt-2 inline-block px-3 py-1.5 rounded-md border border-[#E2E8F0] text-[#003366] cursor-pointer hover:bg-[#F8FAFC]">
                  اختر ملفات
                  <input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.png,.jpg,.jpeg" className="hidden" onChange={(e) => setPendingFiles(Array.from(e.target.files || []))} />
                </label>
              </div>
            </div>
            {pendingFiles.length > 0 && (
              <div className="text-sm text-[#64748B]">
                سيتم رفع {pendingFiles.length} ملف
              </div>
            )}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 flex items-start gap-2">
              <Info className="h-4 w-4 text-[#00B4D8] mt-0.5" />
              <div className="text-sm text-[#475569]">تأكد من وضوح المستندات وخلوها من كلمات المرور. سيتم رفض الملفات التي تتجاوز الحجم المسموح.</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setUploadContextId(null); setPendingFiles([]); if (fileInputRef.current) fileInputRef.current.value = "" }}>إلغاء</Button>
            <Button disabled={!pendingFiles.length || uploadDocs.isPending} onClick={() => {
              if (!uploadContextId || !pendingFiles.length) return
              uploadDocs.mutate({ id: uploadContextId, files: pendingFiles })
            }}>{uploadDocs.isPending ? "جاري الرفع..." : "رفع"}</Button>
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
