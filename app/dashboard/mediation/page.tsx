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
import { Search, Inbox, FileText, Calendar, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, RefreshCcw, Download, Eye, X, Filter } from "lucide-react"
import { Separator } from "@/components/ui/separator"

type MedRow = { 
  id: string
  name: string
  email: string
  status: "new" | "in_progress" | "done" | string
  createdAt: string
  description?: string
  documents?: { id?: string; name?: string; url?: string; createdAt?: string }[] 
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    new: { bg: "bg-gradient-to-r from-blue-500 to-blue-600", text: "text-white", label: "جديدة", icon: "🆕" },
    in_progress: { bg: "bg-gradient-to-r from-amber-500 to-orange-600", text: "text-white", label: "قيد المعالجة", icon: "⏳" },
    done: { bg: "bg-gradient-to-r from-emerald-500 to-teal-600", text: "text-white", label: "منتهية", icon: "✓" },
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

  const allCount = rows.length
  const newCount = rows.filter(r => r.status === "new").length
  const inProgressCount = rows.filter(r => r.status === "in_progress").length
  const doneCount = rows.filter(r => r.status === "done").length
  const hasFilters = statusFilter || search

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
                    {allCount}
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
                    {newCount}
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
                  <div className="text-sm font-semibold text-slate-600 mb-1">قيد المعالجة</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-amber-500 to-orange-600 bg-clip-text text-transparent">
                    {inProgressCount}
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
                  <div className="text-sm font-semibold text-slate-600 mb-1">منتهية</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    {doneCount}
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
              طلبات الوساطة
            </h1>
            <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              إدارة ومتابعة جميع طلبات الوساطة
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => list.refetch()}
            className="rounded-xl hover:bg-slate-50 transition-all"
            disabled={list.isFetching}
          >
            <RefreshCcw className={`h-4 w-4 ml-2 ${list.isFetching ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
        </div>

        {/* Main Card */}
        <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50/50">
            <CardTitle className="text-2xl font-bold text-[#003366] flex items-center gap-2">
              <Filter className="h-6 w-6 text-[#00B4D8]" />
              قائمة الطلبات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Filters */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Select value={statusFilter || "all"} onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}>
                  <SelectTrigger className="rounded-xl bg-white border-slate-200">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="new">🆕 جديدة</SelectItem>
                    <SelectItem value="in_progress">⏳ قيد المعالجة</SelectItem>
                    <SelectItem value="done">✓ منتهية</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative md:col-span-2">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input 
                    placeholder="بحث بالرقم أو الاسم أو البريد..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="pl-10 rounded-xl bg-white border-slate-200"
                  />
                </div>
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
                    onClick={() => { setStatusFilter(""); setSearch("") }}
                    className="text-xs rounded-xl"
                  >
                    مسح الكل
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600 font-medium bg-slate-100 px-4 py-2 rounded-xl">
                  عرض <span className="font-bold text-[#003366]">{rows.length}</span> نتيجة
                </div>
                {list.isFetching && (
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
                      <TableHead className="text-right font-bold text-slate-700">الاسم</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">الحالة</TableHead>
                      <TableHead 
                        className="text-right font-bold text-slate-700 cursor-pointer select-none hover:text-[#00B4D8] transition-colors" 
                        onClick={() => setSortCreated(sortCreated === "desc" ? "asc" : "desc")}
                      >
                        <div className="flex items-center gap-2">
                          تاريخ الإنشاء
                          {sortCreated === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-bold text-slate-700">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((r, idx) => (
                      <TableRow 
                        key={r.id} 
                        className={`hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                      >
                        <TableCell className="font-mono text-sm font-semibold text-[#003366]">
                          {r.id.slice(0, 8)}…
                        </TableCell>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell className="text-sm text-slate-600">{r.email}</TableCell>
                        <TableCell>
                          <StatusBadge status={r.status} />
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {new Date(r.createdAt).toLocaleDateString('ar-SA', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-semibold" 
                            onClick={() => setOpenId(r.id)}
                          >
                            <Eye className="h-4 w-4 ml-1" />
                            عرض التفاصيل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {rows.length === 0 && !list.isFetching && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12">
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
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!openId} onOpenChange={(o) => { if (!o) setOpenId(null) }}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="sr-only">تفاصيل طلب الوساطة</DialogTitle>
          </DialogHeader>
          {rows.filter(r => r.id === openId).map(r => (
            <div key={r.id}>
              <div className="sticky top-0 z-10 bg-gradient-to-l from-[#003366] via-[#00509E] to-[#00B4D8] text-white px-8 py-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">تفاصيل طلب الوساطة</h2>
                    <div className="flex items-center gap-3">
                      <p className="text-sm bg-white/20 backdrop-blur px-4 py-1.5 rounded-full font-mono">
                        {r.id.slice(0, 12).toUpperCase()}
                      </p>
                      <StatusBadge status={r.status} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 space-y-6">
                {/* Info Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <FileText className="h-4 w-4 text-[#00B4D8]" />
                          الاسم الكامل
                        </div>
                        <div className="text-lg font-bold text-[#003366] group-hover:text-[#00B4D8] transition-colors">
                          {r.name}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <FileText className="h-4 w-4 text-[#00B4D8]" />
                          البريد الإلكتروني
                        </div>
                        <div className="text-lg font-bold text-[#003366] break-all">
                          {r.email}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Inbox className="h-4 w-4 text-[#00B4D8]" />
                          رقم الطلب
                        </div>
                        <div className="text-sm font-mono font-bold text-[#003366] break-all">
                          {r.id}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Calendar className="h-4 w-4 text-[#00B4D8]" />
                          تاريخ الإنشاء
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {new Date(r.createdAt).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>

                      <div className="space-y-2 group md:col-span-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <CheckCircle2 className="h-4 w-4 text-[#00B4D8]" />
                          حالة الطلب
                        </div>
                        <div>
                          <StatusBadge status={r.status} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-white">
                  <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                    <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      وصف الطلب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose prose-slate max-w-none">
                      <div className="text-base leading-8 text-slate-700 whitespace-pre-wrap">
                        {r.description || (
                          <span className="text-slate-400 italic">لا يوجد وصف متاح</span>
                        )}
                      </div>
                    </div>
                    {r.description && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>عدد الأحرف: <span className="font-bold text-slate-700">{r.description.length}</span></span>
                          <span>عدد الكلمات: <span className="font-bold text-slate-700">{r.description.split(/\s+/).filter(Boolean).length}</span></span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Documents Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-white">
                  <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                    <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <Inbox className="h-5 w-5 text-white" />
                      </div>
                      المستندات المرفقة
                      <Badge className="bg-gradient-to-r from-[#003366] to-[#00B4D8] border-0 text-white">
                        {r.documents?.length || 0}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {(r.documents?.length || 0) === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/50">
                        <Inbox className="h-16 w-16 text-slate-300 mb-4" />
                        <div className="text-slate-500 font-medium mb-2">لا توجد مستندات مرفقة</div>
                        <p className="text-sm text-slate-400">لم يتم إرفاق أي مستندات مع هذا الطلب</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {r.documents!.map((d, idx) => (
                          <div 
                            key={d.id || idx} 
                            className="group relative rounded-2xl border-2 border-slate-200 p-5 bg-gradient-to-br from-white to-slate-50 hover:shadow-xl hover:scale-[1.02] hover:border-[#00B4D8] transition-all duration-300"
                          >
                            <div className="flex items-start gap-3 mb-4">
                              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <FileText className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[#003366] truncate group-hover:text-[#00B4D8] transition-colors" title={d.name || "وثيقة"}>
                                  {d.name || "وثيقة"}
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

                            {d.url && (
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
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <Button 
                    variant="ghost"
                    onClick={() => setOpenId(null)}
                    className="rounded-xl hover:bg-slate-100 font-semibold"
                  >
                    إغلاق
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>
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