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

type Inq = { id: string; name: string; email: string; subject: string; type: string; body: string; createdAt: string; replies: { id: string; message: string }[] }

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string>("")

  useEffect(() => {
    if (authStatus === "unauthenticated") router.replace("/login")
  }, [authStatus, router])

  const list = useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/inquiries`)
      if (!res.ok) throw new Error("فشل تحميل البيانات")
      return res.json() as Promise<{ data: Inq[] }>
    },
  })

  const filtered = (list.data?.data || [])
    .filter(r => !search || r.name.includes(search) || r.email.includes(search) || r.subject.includes(search))
    .filter(r => !typeFilter || r.type === typeFilter)

  const current = filtered.find(r => r.id === openId)

  return (
    <div dir="rtl" className="text-right">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold text-[#003366]">الاستفسارات</h1>
        <div className="flex items-center gap-2">
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v === "all" ? "" : v)}>
            <SelectTrigger className="w-40"><SelectValue placeholder="نوع الاستفسار" /></SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="تحكيم">تحكيم</SelectItem>
              <SelectItem value="وساطة">وساطة</SelectItem>
              <SelectItem value="عام">عام</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="بحث بالاسم/البريد/الموضوع" value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
        </div>
      </div>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>قائمة الاستفسارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="text-right">الموضوع</TableHead>
                  <TableHead className="text-right">نوع الاستفسار</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">عرض</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(r => (
                  <TableRow key={r.id} className="hover:bg-muted/50">
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.subject}</TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                    <TableCell><Button variant="outline" size="sm" onClick={() => setOpenId(r.id)}>عرض الاستفسار</Button></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
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
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>عرض الاستفسار</DialogTitle>
          </DialogHeader>
          {current && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>المرسل: <span className="text-[#003366]">{current.name}</span></div>
                <div>البريد: <span className="text-[#003366]">{current.email}</span></div>
                <div className="col-span-2">الموضوع: <span className="text-[#003366]">{current.subject}</span></div>
                <div className="col-span-2">النوع: <span className="text-[#003366]">{current.type}</span></div>
              </div>
              <div className="whitespace-pre-wrap border rounded-lg p-3 bg-slate-50 text-slate-700">{current.body}</div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">الردود السابقة</div>
                <div className="space-y-2">
                  {current.replies?.length ? current.replies.map(rep => (
                    <div key={rep.id} className="border rounded-lg p-2 bg-white">{rep.message}</div>
                  )) : <div className="text-sm text-muted-foreground">لا توجد ردود</div>}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {current && (
              <a className="inline-flex items-center" href={`mailto:${current.email}?subject=${encodeURIComponent("رد: " + current.subject)}`}>
                <Button className="bg-[#00B4D8] hover:bg-[#00B4D8]/90">الرد عبر البريد</Button>
              </a>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function InquiriesPage() {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <PageInner />
    </QueryClientProvider>
  )
}
