"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function PageInner() {
  const router = useRouter()
  const { status: authStatus } = useSession()

  useEffect(() => { if (authStatus === "unauthenticated") router.replace("/login") }, [authStatus, router])

  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/settings`)
      if (!res.ok) throw new Error("فشل تحميل الإعدادات")
      return res.json() as Promise<{ data: { account: any; site: any } }>
    }
  })

  const [accountForm, setAccountForm] = useState({ name: "", phone: "" })
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" })
  const [siteForm, setSiteForm] = useState({ siteTitle: "", siteDescription: "", contactEmail: "", facebook: "", x: "", instagram: "" })

  useEffect(() => {
    if (settings.data?.data) {
      const { account, site } = settings.data.data
      setAccountForm({ name: account.name || "", phone: account.phone || "" })
      setSiteForm({
        siteTitle: site.siteTitle || "",
        siteDescription: site.siteDescription || "",
        contactEmail: site.contactEmail || "",
        facebook: site.socials?.facebook || "",
        x: site.socials?.x || "",
        instagram: site.socials?.instagram || "",
      })
    }
  }, [settings.data])

  const saveAccount = useMutation({
    mutationFn: async () => {
      await new Promise(r => setTimeout(r, 500))
      return { ok: true }
    }
  })

  const savePassword = useMutation({
    mutationFn: async () => {
      if (!passwordForm.next || passwordForm.next !== passwordForm.confirm) throw new Error("كلمة المرور غير متطابقة")
      await new Promise(r => setTimeout(r, 500))
      return { ok: true }
    }
  })

  const saveSite = useMutation({
    mutationFn: async () => {
      await new Promise(r => setTimeout(r, 500))
      return { ok: true }
    }
  })

  return (
    <div dir="rtl" className="text-right">
      <h1 className="text-2xl font-semibold text-[#003366] mb-4">الإعدادات</h1>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>إعدادات النظام</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" dir="rtl">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="account">الحساب</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="site">الموقع</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="pt-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">الاسم</div>
                  <Input value={accountForm.name} onChange={(e) => setAccountForm(prev => ({ ...prev, name: e.target.value }))} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">الهاتف</div>
                  <Input value={accountForm.phone} onChange={(e) => setAccountForm(prev => ({ ...prev, phone: e.target.value }))} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-[#00B4D8] hover:bg-[#00B4D8]/90" onClick={() => saveAccount.mutate()}>حفظ</Button>
              </div>
            </TabsContent>

            <TabsContent value="security" className="pt-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">كلمة المرور الحالية</div>
                  <Input type="password" value={passwordForm.current} onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">كلمة المرور الجديدة</div>
                  <Input type="password" value={passwordForm.next} onChange={(e) => setPasswordForm(prev => ({ ...prev, next: e.target.value }))} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">تأكيد كلمة المرور</div>
                  <Input type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-[#00B4D8] hover:bg-[#00B4D8]/90" onClick={() => savePassword.mutate()}>تغيير</Button>
              </div>
            </TabsContent>

            <TabsContent value="site" className="pt-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">عنوان الموقع</div>
                  <Input value={siteForm.siteTitle} onChange={(e) => setSiteForm(prev => ({ ...prev, siteTitle: e.target.value }))} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">البريد للتواصل</div>
                  <Input value={siteForm.contactEmail} onChange={(e) => setSiteForm(prev => ({ ...prev, contactEmail: e.target.value }))} />
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-muted-foreground mb-1">وصف الموقع</div>
                  <Input value={siteForm.siteDescription} onChange={(e) => setSiteForm(prev => ({ ...prev, siteDescription: e.target.value }))} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Facebook</div>
                  <Input value={siteForm.facebook} onChange={(e) => setSiteForm(prev => ({ ...prev, facebook: e.target.value }))} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">X</div>
                  <Input value={siteForm.x} onChange={(e) => setSiteForm(prev => ({ ...prev, x: e.target.value }))} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Instagram</div>
                  <Input value={siteForm.instagram} onChange={(e) => setSiteForm(prev => ({ ...prev, instagram: e.target.value }))} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-[#00B4D8] hover:bg-[#00B4D8]/90" onClick={() => saveSite.mutate()}>حفظ</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SettingsPage() {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <PageInner />
    </QueryClientProvider>
  )
}
