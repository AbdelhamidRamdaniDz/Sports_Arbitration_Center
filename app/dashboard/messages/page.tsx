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
import { Mail, CheckCircle2, Trash2, Search } from "lucide-react"

type Msg = { id: string; firstName?: string; lastName?: string; email: string; phone?: string; subject?: string; message: string; preferred?: string; read: boolean; createdAt: string }

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()
  const qc = useQueryClient()
  const { toast } = useToast()
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")

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

  const rows = (list.data?.data || []).filter(r => {
    const name = `${r.firstName || ""} ${r.lastName || ""}`.trim()
    const subj = r.subject || ""
    return !search || name.includes(search) || (r.email || "").includes(search) || subj.includes(search)
  })

  const current = rows.find(r => r.id === openId)

  const markRead = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const res = await fetch(`/api/dashboard/messages/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read }) })
      if (!res.ok) throw new Error('failed')
      return res.json()
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["messages"] }); toast({ description: "✅ تم التحديث" }) },
    onError: () => toast({ description: "❌ فشل التحديث" })
  })

  const delMsg = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/dashboard/messages/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('failed')
      return res.json()
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["messages"] }); toast({ description: "✅ تم الحذف" }) },
    onError: () => toast({ description: "❌ فشل الحذف" })
  })

  return (
    <div dir="rtl" className="text-right min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#003366]">الرسائل</h1>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input placeholder="بحث بالاسم/البريد/الموضوع" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10 h-11 bg-white border-slate-200 shadow-sm rounded-xl" />
          </div>
        </div>

        <Card className="rounded-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>قائمة الرسائل</span>
              <span className="text-xs text-muted-foreground">{rows.length} رسالة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">البريد الإلكتروني</TableHead>
                    <TableHead className="text-right">الموضوع</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map(r => {
                    const name = `${r.firstName || ""} ${r.lastName || ""}`.trim() || "بدون اسم"
                    return (
                      <TableRow key={r.id} className="hover:bg-muted/50">
                        <TableCell>
                          {r.read ? (
                            <Badge variant="secondary" className="rounded-full">مقروء</Badge>
                          ) : (
                            <Badge className="rounded-full">غير مقروء</Badge>
                          )}
                        </TableCell>
                        <TableCell className={!r.read ? "font-semibold text-[#003366]" : undefined}>{name}</TableCell>
                        <TableCell>{r.email}</TableCell>
                        <TableCell>{r.subject || "—"}</TableCell>
                        <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                        <TableCell className="space-x-2 space-x-reverse">
                          <Button variant="outline" size="sm" onClick={() => setOpenId(r.id)}>عرض</Button>
                          {!r.read ? (
                            <Button size="sm" className="bg-[#00B4D8] hover:bg-[#0096C7]" onClick={() => markRead.mutate({ id: r.id, read: true })}><CheckCircle2 className="w-4 h-4 ml-1"/>تعيين كمقروء</Button>
                          ) : (
                            <Button size="sm" variant="secondary" onClick={() => markRead.mutate({ id: r.id, read: false })}>تعيين كغير مقروء</Button>
                          )}
                          <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={() => delMsg.mutate(r.id)}><Trash2 className="w-4 h-4 ml-1"/>حذف</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">لا توجد بيانات</TableCell>
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
              <DialogTitle>عرض الرسالة</DialogTitle>
            </DialogHeader>
            {current && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>المرسل: <span className="text-[#003366]">{`${current.firstName || ""} ${current.lastName || ""}`.trim() || "بدون اسم"}</span></div>
                  <div>البريد: <span className="text-[#003366]">{current.email}</span></div>
                  <div>الهاتف: <span className="text-[#003366]">{current.phone || "—"}</span></div>
                  <div className="col-span-2">الموضوع: <span className="text-[#003366]">{current.subject || "—"}</span></div>
                </div>
                <div className="whitespace-pre-wrap border rounded-lg p-3 bg-slate-50 text-slate-700">{current.message}</div>
              </div>
            )}
            <DialogFooter>
              {current && (
                <a className="inline-flex items-center" href={`mailto:${current.email}?subject=${encodeURIComponent("رد: " + (current.subject || ""))}`}>
                  <Button className="bg-[#00B4D8] hover:bg-[#00B4D8]/90">الرد عبر البريد</Button>
                </a>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
