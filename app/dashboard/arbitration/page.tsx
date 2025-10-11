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
import { FileText, Inbox, UserCheck, Download, Upload, Edit, Trash } from "lucide-react"

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
  const color = status === "new" ? "bg-blue-100 text-blue-700" : status === "in_review" ? "bg-amber-100 text-amber-700" : status === "assigned" ? "bg-purple-100 text-purple-700" : status === "closed" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
  return <Badge className={color}>{status}</Badge>
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

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA] p-6 text-right">
      <div className="max-w-7xl mx-auto space-y-6">
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
                <Input placeholder="بحث بالرقم أو الاسم" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="w-56" />
                <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-40" />
                <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-40" />
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
            <Separator className="my-4" />
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم الطلب</TableHead>
                    <TableHead className="text-right">اسم المرسل</TableHead>
                    <TableHead className="text-right">نوع القضية</TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => setSort(sort.startsWith("-") ? "createdAt" : "-createdAt")}>تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">محكّم مسؤول</TableHead>
                    <TableHead className="text-right">آخر تحديث</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r: Arbitration) => (
                    <TableRow key={r.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono">{r.id.slice(0, 8)}…</TableCell>
                      <TableCell>{r.clientName}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={r.status} /></TableCell>
                      <TableCell>{r.assignedTo || "—"}</TableCell>
                      <TableCell>{new Date(r.updatedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => setDetailsId(r.id)}><FileText className="h-4 w-4 ml-1" />عرض</Button>
                          <Button size="sm" variant="outline" onClick={() => { setStatusId(r.id); setNewStatus(r.status) }}><Edit className="h-4 w-4 ml-1" />حالة</Button>
                          <Button size="sm" variant="outline" onClick={() => setUploadContextId(r.id)}><Upload className="h-4 w-4 ml-1" />رفع</Button>
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
              <div className="text-sm text-muted-foreground">الصفحة {meta?.page || 1} من {meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1}</div>
              <div className="flex gap-2">
                <Button variant="outline" disabled={page <= 1 || listQuery.isFetching} onClick={() => setPage((p) => Math.max(1, p - 1))}>السابق</Button>
                <Button variant="outline" disabled={!!meta && page >= Math.ceil(meta.total / meta.limit) || listQuery.isFetching} onClick={() => setPage((p) => p + 1)}>التالي</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!detailsId} onOpenChange={(o) => { if (!o) setDetailsId(null) }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {detailsQuery.isLoading && <div className="text-muted-foreground">جاري التحميل...</div>}
            {detailsQuery.data && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">العميل</div>
                    <div className="font-medium">{detailsQuery.data.clientName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">النوع</div>
                    <div className="font-medium">{detailsQuery.data.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">الحالة</div>
                    <div><StatusBadge status={detailsQuery.data.status} /></div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">آخر تحديث</div>
                    <div className="font-medium">{new Date(detailsQuery.data.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">الوصف</div>
                  <div className="whitespace-pre-wrap">{detailsQuery.data.description || "—"}</div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">المستندات</div>
                  <div className="space-y-2">
                    {detailsQuery.data.documents.length === 0 && <div className="text-sm text-muted-foreground">لا توجد مستندات</div>}
                    {detailsQuery.data.documents.map((d: { id: string; name: string; url: string }) => (
                      <div key={d.id} className="flex items-center justify-between rounded-lg border p-2">
                        <div className="flex items-center gap-2">
                          <Inbox className="h-4 w-4 text-[#003366]" />
                          <a className="text-[#003366] hover:underline" href={d.url} target="_blank" rel="noreferrer">{d.name}</a>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => deleteDoc.mutate({ arbitrationId: detailsQuery.data!.id, docId: d.id })}><Trash className="h-4 w-4 ml-1" />حذف</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsId(null)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!statusId} onOpenChange={(o) => { if (!o) { setStatusId(null); setNewStatus(""); setCloseNote("") } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تغيير الحالة</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-full"><SelectValue placeholder="اختر الحالة" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new">جديد</SelectItem>
                <SelectItem value="in_review">قيد المراجعة</SelectItem>
                <SelectItem value="assigned">مُسند</SelectItem>
                <SelectItem value="closed">مغلق</SelectItem>
              </SelectContent>
            </Select>
            {newStatus === "closed" && <Input placeholder="ملاحظة إغلاق" value={closeNote} onChange={(e) => setCloseNote(e.target.value)} />}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setStatusId(null); setNewStatus(""); setCloseNote("") }}>إلغاء</Button>
            <Button onClick={() => { if (!statusId || !newStatus) return; updateStatus.mutate({ id: statusId, status: newStatus, note: closeNote || undefined }) }}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!uploadContextId} onOpenChange={(o) => { if (!o) { setUploadContextId(null); if (fileInputRef.current) fileInputRef.current.value = "" } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>رفع مستندات</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.png,.jpg,.jpeg" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setUploadContextId(null); if (fileInputRef.current) fileInputRef.current.value = "" }}>إلغاء</Button>
            <Button onClick={() => {
              if (!uploadContextId || !fileInputRef.current || !fileInputRef.current.files?.length) return
              const files = Array.from(fileInputRef.current.files)
              uploadDocs.mutate({ id: uploadContextId, files })
            }}>رفع</Button>
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
