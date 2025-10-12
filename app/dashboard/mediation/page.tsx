"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Inbox, FileText, Calendar, AlertCircle, CheckCircle2 } from "lucide-react"

type MedRow = { id: string; name: string; email: string; status: "new" | "in_progress" | "done" | string; createdAt: string; description?: string; documents?: { id?: string; name?: string; url?: string; createdAt?: string }[] }

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "new"
      ? "bg-[#DBEAFE] text-[#3B82F6]"
      : status === "in_progress"
      ? "bg-[#FEF3C7] text-[#F59E0B]"
      : status === "done"
      ? "bg-[#D1FAE5] text-[#10B981]"
      : "bg-gray-100 text-gray-700"
  return <Badge className={`rounded-full px-3 py-1 text-sm ${cls}`}>{status}</Badge>
}

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [openId, setOpenId] = useState<string | null>(null)
  const [sortCreated, setSortCreated] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    if (authStatus === "unauthenticated") router.replace("/login")
  }, [authStatus, router])

  const queryKey = useMemo(() => ["mediation", { statusFilter, search }], [statusFilter, search])

  const list = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetch(`/api/dashboard/mediation?${params.toString()}`)
      if (!res.ok) throw new Error("فشل تحميل البيانات")
      return res.json() as Promise<{ data: MedRow[] }>
    },
  })

  const rows = (list.data?.data || [])
    .filter(r => !search || r.name.includes(search) || r.id.includes(search) || r.email.includes(search))
    .sort((a, b) => (sortCreated === "desc" ? +new Date(b.createdAt) - +new Date(a.createdAt) : +new Date(a.createdAt) - +new Date(b.createdAt)))

  // Stats
  const allCount = rows.length
  const newCount = rows.filter(r => r.status === "new").length
  const inProgressCount = rows.filter(r => r.status === "in_progress").length
  const doneCount = rows.filter(r => r.status === "done").length

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA] p-6 text-right">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-[#64748B]">إجمالي الطلبات</div>
                <div className="text-3xl font-bold text-[#003366]">{allCount}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#003366]/10 text-[#003366] flex items-center justify-center"><Inbox className="h-5 w-5" aria-hidden /></div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-[#64748B]">طلبات جديدة</div>
                <div className="text-3xl font-bold text-[#3B82F6]">{newCount}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center"><FileText className="h-5 w-5" aria-hidden /></div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-[#64748B]">قيد المعالجة</div>
                <div className="text-3xl font-bold text-[#F59E0B]">{inProgressCount}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center"><AlertCircle className="h-5 w-5" aria-hidden /></div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-[#64748B]">منتهية</div>
                <div className="text-3xl font-bold text-[#10B981]">{doneCount}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center"><CheckCircle2 className="h-5 w-5" aria-hidden /></div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#003366]">طلبات الوساطة</h1>
        </div>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>قائمة الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 items-center">
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}>
                <SelectTrigger className="w-40"><SelectValue placeholder="الحالة" /></SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="new">جديدة</SelectItem>
                  <SelectItem value="in_progress">قيد المعالجة</SelectItem>
                  <SelectItem value="done">منتهية</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="h-4 w-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden />
                <Input placeholder="بحث بالرقم أو الاسم أو البريد" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </div>
          </div>
          <div className="text-sm text-[#64748B] mt-2">عرض {rows.length} نتيجة</div>
          <div className="overflow-x-auto mt-4">
            <Table>
              <TableHeader className="bg-[#F8FAFC]">
                <TableRow>
                  <TableHead className="text-right">ID</TableHead>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">البريد</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right cursor-pointer select-none" onClick={() => setSortCreated(sortCreated === "desc" ? "asc" : "desc")}>التاريخ</TableHead>
                  <TableHead className="text-right">تفاصيل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.id} className="hover:bg-[#F5F7FA] transition-colors">
                    <TableCell className="font-mono">{r.id}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="hover:bg-[#F1F5F9]" onClick={() => setOpenId(r.id)}>عرض التفاصيل</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">لا توجد بيانات</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={!!openId} onOpenChange={(o) => { if (!o) setOpenId(null) }}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="sr-only">تفاصيل طلب الوساطة</DialogTitle>
          </DialogHeader>
          {rows.filter(r => r.id === openId).map(r => (
            <div key={r.id}>
              <div className="bg-gradient-to-b from-white to-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#003366]">تفاصيل طلب الوساطة</h2>
                    <p className="mt-2 text-sm text-[#64748B] bg-[#F1F5F9] inline-block px-3 py-1 rounded-full">{r.id}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              </div>

              <div className="px-6 py-5 space-y-5" dir="rtl">
                {/* Info Grid */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-[#94A3B8]" />الاسم</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold group-hover:text-[#003366] transition-colors">{r.name}</div>
                    </div>
                    <div className="group md:border-r md:pr-6 border-[#E2E8F0]">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-[#94A3B8]" />البريد</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold">{r.email}</div>
                    </div>
                    <div className="group">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-[#94A3B8]" />الحالة</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold"><StatusBadge status={r.status} /></div>
                    </div>
                    <div className="group md:border-r md:pr-6 border-[#E2E8F0]">
                      <div className="text-[12px] text-[#64748B] font-medium flex items-center gap-2"><Calendar className="h-4 w-4 text-[#94A3B8]" />تاريخ الإنشاء</div>
                      <div className="text-[16px] text-[#1E293B] font-semibold">{new Date(r.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0]">
                  <h3 className="text-[20px] font-bold text-[#003366] border-b-2 border-[#00B4D8] inline-block pb-1 mb-4">وصف الطلب</h3>
                  <div className="text-[15px] leading-8 text-[#334155] whitespace-pre-wrap" style={{ direction: "rtl", textAlign: "right" }}>{r.description || "—"}</div>
                </div>

                {/* Documents */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Inbox className="h-5 w-5 text-[#003366]" />
                      <h3 className="text-[18px] font-semibold text-[#1E293B]">المستندات</h3>
                      <Badge variant="secondary" className="bg-[#F1F5F9] text-[#003366]">{r.documents?.length || 0}</Badge>
                    </div>
                  </div>
                  {(r.documents?.length || 0) === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center text-[#64748B] py-10 border border-dashed border-[#E2E8F0] rounded-xl">
                      <Inbox className="h-10 w-10 text-[#CBD5E1] mb-3" />
                      <div>لا توجد مستندات مرفقة</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {r.documents!.map((d, idx) => (
                        <div key={d.id || idx} className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="h-5 w-5 text-[#64748B]" />
                            <div className="truncate text-[#003366] font-medium" title={d.name || "وثيقة"}>{d.name || "وثيقة"}</div>
                          </div>
                          <div className="text-sm text-[#64748B]">{d.createdAt ? `تاريخ الرفع: ${new Date(d.createdAt).toLocaleDateString()}` : ""}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 rounded-xl flex flex-col md:flex-row gap-3 md:items-center md:justify-end">
                  <Button variant="ghost" onClick={() => setOpenId(null)}>إغلاق</Button>
                </div>
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  )
}

export default function MediationPage() {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <PageInner />
    </QueryClientProvider>
  )
}
