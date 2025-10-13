"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Trash2, CalendarDays, RefreshCcw, Search } from "lucide-react"

export default function BookingsDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fetcher = (url: string) => fetch(url).then((r) => {
    if (!r.ok) throw new Error("فشل تحميل البيانات")
    return r.json()
  })

  const { data, isLoading, mutate } = useSWR<Array<BookingRow>>("/api/bookings", fetcher)
  const [search, setSearch] = useState("")

  const rows = useMemo(() => {
    const list = data ?? []
    const q = search.trim().toLowerCase()
    if (!q) return list
    return list.filter((b) =>
      [b.name, b.email, b.phone || "", b.city, b.notes || ""].some((v) => (v || "").toLowerCase().includes(q))
    )
  }, [data, search])

  async function remove(id: number) {
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast({ description: "✅ تم حذف الحجز" })
      mutate()
    } catch {
      toast({ description: "❌ فشل حذف الحجز", variant: "destructive" as any })
    }
  }

  return (
    <div dir="rtl" className="text-right min-h-screen bg-[#F5F7FA] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center shadow">
              <CalendarDays className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#003366]">الحجوزات</h1>
              <p className="text-sm text-slate-600">عرض وإدارة جميع الحجوزات</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث بالاسم أو البريد أو المدينة" className="pr-9 w-64" />
            </div>
            <Button variant="outline" onClick={() => mutate()}>
              <RefreshCcw className="w-4 h-4 ml-1" /> تحديث
            </Button>
          </div>
        </div>

        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>قائمة الحجوزات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl overflow-hidden border bg-slate-50">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-white">
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">البريد</TableHead>
                    <TableHead className="text-right">الهاتف</TableHead>
                    <TableHead className="text-right">المدينة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الوقت</TableHead>
                    <TableHead className="text-right">الملاحظات</TableHead>
                    <TableHead className="text-right">إجراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!isLoading && rows.map((b) => (
                    <TableRow key={b.id} className="bg-white/80">
                      <TableCell>{b.name}</TableCell>
                      <TableCell>{b.email}</TableCell>
                      <TableCell>{b.phone || "-"}</TableCell>
                      <TableCell>{cityLabel(b.city)}</TableCell>
                      <TableCell>{new Date(b.date).toLocaleDateString('ar-DZ')}</TableCell>
                      <TableCell>{b.time}</TableCell>
                      <TableCell className="max-w-[320px] truncate" title={b.notes || undefined}>{b.notes || "-"}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="destructive" onClick={() => remove(b.id)} className="h-8">
                          <Trash2 className="w-4 h-4 ml-1" /> حذف
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10 text-slate-500">جاري التحميل...</TableCell>
                    </TableRow>
                  )}
                  {!isLoading && rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10 text-slate-500">لا توجد حجوزات</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
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
