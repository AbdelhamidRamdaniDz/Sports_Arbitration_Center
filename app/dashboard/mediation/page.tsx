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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

type MedRow = { id: string; name: string; email: string; status: string; createdAt: string; description?: string; documents?: any[] }

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [openId, setOpenId] = useState<string | null>(null)

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

  const rows = (list.data?.data || []).filter(r => !search || r.name.includes(search) || r.id.includes(search) || r.email.includes(search))

  return (
    <div dir="rtl" className="text-right">
      <div className="flex items-center justify-between mb-4">
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
              <Input placeholder="بحث" value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">ID</TableHead>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">البريد</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">تفاصيل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono">{r.id}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.status === "new" ? "جديدة" : r.status === "in_progress" ? "قيد المعالجة" : "منتهية"}</TableCell>
                    <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => setOpenId(r.id)}>عرض التفاصيل</Button>
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

      <Sheet open={!!openId} onOpenChange={(o) => { if (!o) setOpenId(null) }}>
        <SheetContent side="left" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>تفاصيل الطلب</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-3">
            {rows.filter(r => r.id === openId).map(r => (
              <div key={r.id} className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">الوصف</div>
                  <div>{r.description || "—"}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">المرفقات</div>
                  <div className="text-sm text-muted-foreground">—</div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-600/90">قبول الطلب</Button>
                  <Button variant="destructive">رفض الطلب</Button>
                  <Button className="bg-[#00B4D8] hover:bg-[#00B4D8]/90">إرسال رد</Button>
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
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
