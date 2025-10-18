"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Mail, CheckCircle2, Trash2, Search, Inbox, Send, Phone, User, Calendar, MessageSquare, RefreshCcw, Filter, X, Eye, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Msg = { 
  id: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  subject?: string
  message: string
  preferred?: string
  read: boolean
  createdAt: string 
}

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")
  const [filterRead, setFilterRead] = useState<string>("all")

  useEffect(() => {
    if (authStatus === "unauthenticated") router.replace("/login")
  }, [authStatus, router])

  const list = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/messages`)
      if (!res.ok) throw new Error("فشل تحميل البيانات")
      return res.json() as Promise<{ data: Msg[] }>
    },
  })

  const rows = (list.data?.data || [])
    .filter(r => {
      const name = `${r.firstName || ""} ${r.lastName || ""}`.trim()
      const subj = r.subject || ""
      const matchesSearch = !search || name.includes(search) || (r.email || "").includes(search) || subj.includes(search)
      const matchesFilter = filterRead === "all" || (filterRead === "read" && r.read) || (filterRead === "unread" && !r.read)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))

  const current = rows.find(r => r.id === openId)

  const allCount = list.data?.data.length || 0
  const unreadCount = list.data?.data.filter(r => !r.read).length || 0
  const readCount = list.data?.data.filter(r => r.read).length || 0

  const hasFilters = search || filterRead !== "all"

  const markRead = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const res = await fetch(`/api/dashboard/messages/${id}`, { 
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ read }) 
      })
      if (!res.ok) throw new Error('failed')
      return res.json()
    },
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ["messages"] })
      toast({ description: "تم تحديث حالة الرسالة بنجاح" }) 
    },
    onError: () => toast({ description: "حدث خطأ أثناء تحديث الرسالة" })
  })

  const delMsg = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/dashboard/messages/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('failed')
      return res.json()
    },
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ["messages"] })
      setOpenId(null)
      toast({ description: "تم حذف الرسالة بنجاح" }) 
    },
    onError: () => toast({ description: "حدث خطأ أثناء حذف الرسالة" })
  })

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Inbox className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">إجمالي الرسائل</div>
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
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">غير مقروءة</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-rose-500 to-red-600 bg-clip-text text-transparent">
                    {unreadCount}
                  </div>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-l from-rose-500 to-red-600 rounded-full"></div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">مقروءة</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    {readCount}
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
              الرسائل والاستفسارات
            </h1>
            <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              إدارة جميع الرسائل الواردة من المستخدمين
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
              قائمة الرسائل
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Filters */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select value={filterRead} onValueChange={setFilterRead}>
                  <SelectTrigger className="rounded-xl bg-white border-slate-200">
                    <SelectValue placeholder="حالة القراءة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="unread">📧 غير مقروءة</SelectItem>
                    <SelectItem value="read">✓ مقروءة</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input 
                    placeholder="بحث بالاسم أو البريد أو الموضوع..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="pl-10 rounded-xl bg-white border-slate-200"
                  />
                </div>
              </div>

              {hasFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 font-medium">الفلاتر النشطة:</span>
                  {filterRead !== "all" && (
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      {filterRead === "read" ? "مقروءة" : "غير مقروءة"}
                      <X className="h-3 w-3 mr-1 cursor-pointer" onClick={() => setFilterRead("all")} />
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
                    onClick={() => { setFilterRead("all"); setSearch("") }}
                    className="text-xs rounded-xl"
                  >
                    مسح الكل
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600 font-medium bg-slate-100 px-4 py-2 rounded-xl">
                  عرض <span className="font-bold text-[#003366]">{rows.length}</span> رسالة
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
                      <TableHead className="text-right font-bold text-slate-700">الحالة</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">الاسم</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">الموضوع</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">التاريخ</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((r, idx) => {
                      const name = `${r.firstName || ""} ${r.lastName || ""}`.trim() || "بدون اسم"
                      return (
                        <TableRow 
                          key={r.id} 
                          className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} ${!r.read ? 'hover:bg-blue-50' : 'hover:bg-slate-50'}`}
                        >
                          <TableCell>
                            {r.read ? (
                              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 border-0 text-white rounded-full">
                                <CheckCircle2 className="h-3 w-3 ml-1" />
                                مقروء
                              </Badge>
                            ) : (
                              <Badge className="bg-gradient-to-r from-rose-500 to-red-600 border-0 text-white rounded-full animate-pulse">
                                <Mail className="h-3 w-3 ml-1" />
                                غير مقروء
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className={`font-medium ${!r.read ? "font-bold text-[#003366]" : "text-slate-700"}`}>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center text-white text-xs font-bold">
                                {name.charAt(0).toUpperCase()}
                              </div>
                              {name}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">{r.email}</TableCell>
                          <TableCell className="font-medium text-slate-700">
                            {r.subject ? (
                              <span className="line-clamp-1">{r.subject}</span>
                            ) : (
                              <span className="text-slate-400 italic">بدون موضوع</span>
                            )}
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
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all" 
                                onClick={() => {
                                  setOpenId(r.id)
                                  if (!r.read) {
                                    markRead.mutate({ id: r.id, read: true })
                                  }
                                }}
                              >
                                <Eye className="h-4 w-4 ml-1" />
                                عرض
                              </Button>
                              {!r.read && (
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all" 
                                  onClick={() => markRead.mutate({ id: r.id, read: true })}
                                >
                                  <CheckCircle2 className="h-4 w-4 ml-1" />
                                  قراءة
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all" 
                                onClick={() => {
                                  if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
                                    delMsg.mutate(r.id)
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4 ml-1" />
                                حذف
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {rows.length === 0 && !list.isFetching && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <Inbox className="h-16 w-16 text-slate-300" />
                            <div className="text-slate-500 font-medium">لا توجد رسائل</div>
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
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="sr-only">تفاصيل الرسالة</DialogTitle>
          </DialogHeader>
          {current && (
            <>
              <div className="sticky top-0 z-10 bg-gradient-to-l from-[#003366] via-[#00509E] to-[#00B4D8] text-white px-8 py-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">تفاصيل الرسالة</h2>
                    <div className="flex items-center gap-3">
                      {current.read ? (
                        <Badge className="bg-white/20 backdrop-blur text-white border-0">
                          <CheckCircle2 className="h-3 w-3 ml-1" />
                          مقروءة
                        </Badge>
                      ) : (
                        <Badge className="bg-rose-500 text-white border-0 animate-pulse">
                          <Mail className="h-3 w-3 ml-1" />
                          غير مقروءة
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 space-y-6">
                {/* Sender Info Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <User className="h-4 w-4 text-[#00B4D8]" />
                          المرسل
                        </div>
                        <div className="text-lg font-bold text-[#003366] group-hover:text-[#00B4D8] transition-colors">
                          {`${current.firstName || ""} ${current.lastName || ""}`.trim() || "بدون اسم"}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Mail className="h-4 w-4 text-[#00B4D8]" />
                          البريد الإلكتروني
                        </div>
                        <div className="text-lg font-bold text-[#003366] break-all">
                          {current.email}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Phone className="h-4 w-4 text-[#00B4D8]" />
                          رقم الهاتف
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {current.phone || <span className="text-slate-400 text-sm">غير متوفر</span>}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Calendar className="h-4 w-4 text-[#00B4D8]" />
                          تاريخ الإرسال
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {new Date(current.createdAt).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Subject Card */}
                {current.subject && (
                  <Card className="rounded-3xl border-0 shadow-lg bg-white">
                    <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                      <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        الموضوع
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-lg font-semibold text-slate-700">
                        {current.subject}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Message Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-white">
                  <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                    <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      محتوى الرسالة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose prose-slate max-w-none">
                      <div className="text-base leading-8 text-slate-700 whitespace-pre-wrap bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        {current.message}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>عدد الأحرف: <span className="font-bold text-slate-700">{current.message.length}</span></span>
                        <span>عدد الكلمات: <span className="font-bold text-slate-700">{current.message.split(/\s+/).filter(Boolean).length}</span></span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200">
                  <a 
                    href={`mailto:${current.email}?subject=${encodeURIComponent("رد: " + (current.subject || ""))}`}
                    className="inline-flex"
                  >
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-[#003366] to-[#00B4D8] hover:from-[#00509E] hover:to-[#0096C7] shadow-lg rounded-xl font-semibold">
                      <Send className="h-4 w-4 ml-2" />
                      الرد عبر البريد
                    </Button>
                  </a>
                  {!current.read && (
                    <Button 
                      variant="outline"
                      className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl font-semibold"
                      onClick={() => markRead.mutate({ id: current.id, read: true })}
                    >
                      <CheckCircle2 className="h-4 w-4 ml-2" />
                      تعيين كمقروء
                    </Button>
                  )}
                  {current.read && (
                    <Button 
                      variant="outline"
                      className="border-2 border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold"
                      onClick={() => markRead.mutate({ id: current.id, read: false })}
                    >
                      <Clock className="h-4 w-4 ml-2" />
                      تعيين كغير مقروء
                    </Button>
                  )}
                  <Button 
                    variant="ghost"
                    className="hover:bg-rose-50 hover:text-rose-600 rounded-xl font-semibold"
                    onClick={() => {
                      if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
                        delMsg.mutate(current.id)
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف الرسالة
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function MessagesPage() {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <PageInner />
    </QueryClientProvider>
  )
}