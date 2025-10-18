"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Trash2, CalendarDays, RefreshCcw, Search, Clock, MapPin, User, Mail, Phone, FileText, Calendar, Inbox } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function BookingsDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fetcher = (url: string) => fetch(url).then((r) => {
    if (!r.ok) throw new Error("فشل تحميل البيانات")
    return r.json()
  })

  const { data, isLoading, mutate } = useSWR<Array<BookingRow>>("/api/bookings", fetcher)
  const [search, setSearch] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(null)

  const rows = useMemo(() => {
    const list = data ?? []
    const q = search.trim().toLowerCase()
    if (!q) return list
    return list.filter((b) =>
      [b.name, b.email, b.phone || "", b.city, b.notes || ""].some((v) => (v || "").toLowerCase().includes(q))
    )
  }, [data, search])

  const stats = useMemo(() => {
    const total = data?.length || 0
    const today = new Date().toISOString().split('T')[0]
    const todayCount = data?.filter(b => b.date.startsWith(today)).length || 0
    const upcoming = data?.filter(b => new Date(b.date) > new Date()).length || 0
    return { total, today: todayCount, upcoming }
  }, [data])

  async function remove(id: number) {
    if (!confirm('هل أنت متأكد من حذف هذا الحجز؟')) return
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast({ description: "تم حذف الحجز بنجاح" })
      setSelectedBooking(null)
      mutate()
    } catch {
      toast({ description: "حدث خطأ أثناء حذف الحجز", variant: "destructive" as any })
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <CalendarDays className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">إجمالي الحجوزات</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-slate-600 to-slate-800 bg-clip-text text-transparent">
                    {stats.total}
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
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">حجوزات اليوم</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    {stats.today}
                  </div>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-l from-blue-500 to-blue-600 rounded-full"></div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-600 mb-1">حجوزات قادمة</div>
                  <div className="text-4xl font-bold bg-gradient-to-l from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    {stats.upcoming}
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
              إدارة الحجوزات
            </h1>
            <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              عرض وإدارة جميع الحجوزات
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="ابحث بالاسم أو البريد..." 
                className="pr-10 w-full sm:w-64 rounded-xl bg-white border-slate-200"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => mutate()}
              className="rounded-xl hover:bg-slate-50"
              disabled={isLoading}
            >
              <RefreshCcw className={`w-4 h-4 ml-1 ${isLoading ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
          </div>
        </div>

        {/* Main Card */}
        <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50/50">
            <CardTitle className="text-2xl font-bold text-[#003366] flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-[#00B4D8]" />
              قائمة الحجوزات
              <Badge className="bg-gradient-to-r from-[#003366] to-[#00B4D8] border-0 text-white ml-2">
                {rows.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-l from-slate-50 to-blue-50/30 hover:bg-gradient-to-l">
                      <TableHead className="text-right font-bold text-slate-700">الاسم</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">الهاتف</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">المدينة</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">التاريخ</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">الوقت</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!isLoading && rows.map((b, idx) => (
                      <TableRow 
                        key={b.id} 
                        className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50 cursor-pointer`}
                        onClick={() => setSelectedBooking(b)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center text-white text-xs font-bold">
                              {b.name.charAt(0).toUpperCase()}
                            </div>
                            {b.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">{b.email}</TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {b.phone || <span className="text-slate-400 italic">غير متوفر</span>}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-full border-slate-300">
                            <MapPin className="h-3 w-3 ml-1" />
                            {cityLabel(b.city)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-semibold text-slate-700">
                          {new Date(b.date).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-white rounded-full">
                            <Clock className="h-3 w-3 ml-1" />
                            {b.time}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all" 
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBooking(b)
                              }}
                            >
                              <FileText className="h-4 w-4 ml-1" />
                              عرض
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all" 
                              onClick={(e) => {
                                e.stopPropagation()
                                remove(b.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4 ml-1" />
                              حذف
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {isLoading && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin"></div>
                            <div className="text-slate-500">جاري التحميل...</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {!isLoading && rows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <Inbox className="h-16 w-16 text-slate-300" />
                            <div className="text-slate-500 font-medium">لا توجد حجوزات</div>
                            <p className="text-sm text-slate-400">جرّب تغيير البحث</p>
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
      <Dialog open={!!selectedBooking} onOpenChange={(o) => { if (!o) setSelectedBooking(null) }}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="sr-only">تفاصيل الحجز</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <>
              <div className="sticky top-0 z-10 bg-gradient-to-l from-[#003366] via-[#00509E] to-[#00B4D8] text-white px-8 py-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">تفاصيل الحجز</h2>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-white/20 backdrop-blur text-white border-0">
                        <Calendar className="h-3 w-3 ml-1" />
                        حجز رقم #{selectedBooking.id}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 space-y-6">
                {/* Client Info Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                  <CardHeader className="border-b border-slate-200">
                    <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                      <User className="h-5 w-5 text-[#00B4D8]" />
                      معلومات العميل
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <User className="h-4 w-4 text-[#00B4D8]" />
                          الاسم الكامل
                        </div>
                        <div className="text-lg font-bold text-[#003366] group-hover:text-[#00B4D8] transition-colors">
                          {selectedBooking.name}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Mail className="h-4 w-4 text-[#00B4D8]" />
                          البريد الإلكتروني
                        </div>
                        <div className="text-lg font-bold text-[#003366] break-all">
                          {selectedBooking.email}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Phone className="h-4 w-4 text-[#00B4D8]" />
                          رقم الهاتف
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {selectedBooking.phone || <span className="text-slate-400 text-sm">غير متوفر</span>}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <MapPin className="h-4 w-4 text-[#00B4D8]" />
                          المدينة
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {cityLabel(selectedBooking.city)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Details Card */}
                <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                  <CardHeader className="border-b border-slate-200">
                    <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-[#00B4D8]" />
                      تفاصيل الموعد
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Calendar className="h-4 w-4 text-[#00B4D8]" />
                          التاريخ
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {new Date(selectedBooking.date).toLocaleDateString('ar-SA', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Clock className="h-4 w-4 text-[#00B4D8]" />
                          الوقت
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {selectedBooking.time}
                        </div>
                      </div>

                      <div className="space-y-2 group md:col-span-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Calendar className="h-4 w-4 text-[#00B4D8]" />
                          تاريخ الإنشاء
                        </div>
                        <div className="text-lg font-bold text-[#003366]">
                          {new Date(selectedBooking.createdAt).toLocaleDateString('ar-SA', {
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

                {/* Notes Card */}
                {selectedBooking.notes && (
                  <Card className="rounded-3xl border-0 shadow-lg bg-white">
                    <CardHeader className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                      <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        ملاحظات إضافية
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="prose prose-slate max-w-none">
                        <div className="text-base leading-8 text-slate-700 whitespace-pre-wrap bg-slate-50 rounded-2xl p-6 border border-slate-200">
                          {selectedBooking.notes}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200">
                  <Button 
                    variant="ghost"
                    className="hover:bg-rose-50 hover:text-rose-600 rounded-xl font-semibold"
                    onClick={() => remove(selectedBooking.id)}
                  >
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف الحجز
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedBooking(null)}
                    className="rounded-xl hover:bg-slate-50 font-semibold"
                  >
                    إغلاق
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

type BookingRow = {
  id: number
  name: string
  email: string
  phone: string | null
  city: string
  date: string
  time: string
  notes: string | null
  createdAt: string
}

function cityLabel(v: string) {
  if (v === "__algiers__") return "الجزائر"
  if (v === "oran") return "وهران"
  if (v === "constantine") return "قسنطينة"
  if (v === "annaba") return "عنابة"
  return v
}