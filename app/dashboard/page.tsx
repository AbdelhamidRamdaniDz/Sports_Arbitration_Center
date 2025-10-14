"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { BarChart3, Mail, Newspaper, Images, Video, Scale, Settings, LogOut, Home, MessageCircle, Handshake, Gavel, Shield, Bell, Plus, Reply, FileText, ImagePlus, RefreshCcw, CalendarDays } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select as UiSelect, SelectContent as UiSelectContent, SelectItem as UiSelectItem, SelectTrigger as UiSelectTrigger, SelectValue as UiSelectValue } from "@/components/ui/select"
import {
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts"

export default function DashboardPage() {
  const router = useRouter()
  const { status, data: session } = useSession()

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const [range, setRange] = useState<7 | 30 | 90>(7)
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar')
  const [notifOpen, setNotifOpen] = useState(false)
  const { data: overview, isLoading, error, mutate } = useSWR<any>(`/api/dashboard/overview?range=${range}`, fetcher)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
    if (status === "authenticated") {
      const envAdmin = (process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || 'admin@gmail.com').trim().toLowerCase()
      const emailNorm = session?.user?.email?.trim().toLowerCase()
      if (!emailNorm) return
      const isAdmin = session?.user?.isAdmin || (emailNorm === envAdmin)
      if (!isAdmin) {
        router.replace("/profile")
      }
    }
  }, [status, session, router])

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA] text-right">
      <div className="flex min-h-screen">
        <aside className="hidden md:flex flex-col w-72 bg-[#003366] text-white px-4 py-6 sticky top-0 h-screen">
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold">لوحة تحكم التحكيم</div>
          </div>

          <nav className="space-y-1 text-sm">
            <SidebarItem icon={<Home className="h-4 w-4" />} label="الرئيسية" active onClick={() => router.push("/dashboard")} />
            <SidebarItem icon={<Gavel className="h-4 w-4" />} label="طلبات التحكيم" onClick={() => router.push("/dashboard/arbitration")} />
            <SidebarItem icon={<Handshake className="h-4 w-4" />} label="طلبات الوساطة" onClick={() => router.push("/dashboard/mediation")} />
            <SidebarItem icon={<MessageCircle className="h-4 w-4" />} label="الرسائل والاستفسارات" onClick={() => router.push("/dashboard/messages")} />
            <SidebarItem icon={<CalendarDays className="h-4 w-4" />} label="الحجوزات" onClick={() => router.push("/dashboard/bookings")} />
            <Separator className="my-3 opacity-40" />
            <SidebarItem icon={<Newspaper className="h-4 w-4" />} label="الأخبار" onClick={() => router.push("/dashboard/news")} />
            <SidebarItem icon={<Images className="h-4 w-4" />} label="الصور" onClick={() => router.push("/dashboard/gallery")} />
            <SidebarItem icon={<Video className="h-4 w-4" />} label="الفيديوهات" onClick={() => router.push("/dashboard/videos")} />
            <SidebarItem icon={<FileText className="h-4 w-4" />} label="التشريعات" onClick={() => router.push("/dashboard/regulations")} />
            <SidebarItem icon={<FileText className="h-4 w-4" />} label="التشريعات التجارية" onClick={() => router.push("/dashboard/national-commercial")} />
            <SidebarItem icon={<FileText className="h-4 w-4" />} label="التشريعات الدولية" onClick={() => router.push("/dashboard/international")} />
            <Separator className="my-3 opacity-40" />
            <SidebarItem icon={<Shield className="h-4 w-4" />} label="إدارة الأعضاء" onClick={() => router.push("/dashboard/members")} />
            <SidebarItem icon={<Settings className="h-4 w-4" />} label="الإعدادات" onClick={() => router.push("/dashboard/settings")} />
            <SidebarItem icon={<LogOut className="h-4 w-4" />} label="تسجيل الخروج" onClick={() => router.push("/dashboard/logout")} />
          </nav>
        </aside>

        <main className="flex-1 flex flex-col">
          <header className="w-full bg-gradient-to-l from-[#003366] to-[#00B4D8] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="md:hidden h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl font-semibold">لوحة تحكم التحكيم</h1>
                <Badge variant="secondary" className="text-[#003366]">Super Admin</Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:block w-64">
                  <Input placeholder="ابحث هنا.." className="bg-white/15 border-white/20 placeholder-white/70 text-white" />
                </div>
                <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="relative text-white hover:bg-white/10">
                      <Bell className="h-5 w-5" />
                      {overview?.notifications?.length ? (
                        <span className="absolute -top-1 -left-1 h-5 min-w-5 px-1 rounded-full bg-red-500 text-[10px] leading-5 text-white text-center">
                          {overview.notifications.length}
                        </span>
                      ) : null}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[360px] sm:w-[420px]">
                    <SheetHeader>
                      <SheetTitle>لوحة الإشعارات</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-3">
                      <Tabs defaultValue="all">
                        <TabsList className="grid grid-cols-3">
                          <TabsTrigger value="all">الكل</TabsTrigger>
                          <TabsTrigger value="unread">غير المقروء</TabsTrigger>
                          <TabsTrigger value="important">مهم</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <div className="space-y-2 max-h-[70vh] overflow-auto pr-2">
                        {(overview?.notifications ?? []).map((n: any) => (
                          <div key={n.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="truncate mr-2">
                              <div className="text-sm font-medium text-[#003366] truncate">{n.title}</div>
                              <div className="text-xs text-muted-foreground">{timeAgo(n.createdAt)}</div>
                            </div>
                            <Badge variant="outline" className="border-[#00B4D8] text-[#003366]">{n.type === 'message' ? 'رسالة' : 'خبر'}</Badge>
                          </div>
                        ))}
                        {(!overview?.notifications || overview.notifications.length === 0) && (
                          <div className="text-sm text-muted-foreground">لا توجد إشعارات جديدة</div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end">
                          <span className="text-sm font-medium">{session?.user?.name || "المشرف"}</span>
                          <span className="text-xs opacity-80">{session?.user?.email}</span>
                        </div>
                        <Avatar className="h-9 w-9 ring-2 ring-white/50">
                          <AvatarImage src={session?.user?.image || undefined} alt="avatar" />
                          <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuLabel>الحساب</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/profile")}>تعديل الملف الشخصي</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>تسجيل الخروج</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => router.push("/dashboard")} className="cursor-pointer">الرئيسية</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink>لوحة التحكم</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            {/* Loading bar */}
            {isLoading && <div className="h-0.5 w-full bg-gradient-to-l from-[#00B4D8] to-[#003366] animate-pulse mb-2" />}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
              {isLoading ? (
                <>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="rounded-2xl shadow-md">
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-1/3 mb-4" />
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-8 w-full mt-3" />
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <StatCard
                    title="طلبات التحكيم"
                    value={String(overview?.counts?.arbitration ?? 0)}
                    delta={calcDelta(overview?.trend, "arbitration")}
                    icon={<Gavel className="h-5 w-5" />}
                    spark={(overview?.trend ?? []).map((t: any) => t.arbitration)}
                    onClick={() => router.push("/dashboard/arbitration")}
                  />
                  <StatCard
                    title="طلبات الوساطة"
                    value={String(overview?.counts?.mediation ?? 0)}
                    delta={calcDelta(overview?.trend, "mediation")}
                    icon={<Handshake className="h-5 w-5" />}
                    spark={(overview?.trend ?? []).map((t: any) => t.mediation)}
                    onClick={() => router.push("/dashboard/mediation")}
                  />
                  <StatCard
                    title="الرسائل الجديدة"
                    value={String(overview?.counts?.newMessages ?? 0)}
                    delta={undefined}
                    icon={<Mail className="h-5 w-5" />}
                    spark={undefined}
                    onClick={() => router.push("/dashboard/messages")}
                  />
                  <StatCard
                    title="محتوى المركز الإعلامي"
                    value={String(overview?.counts?.media ?? 0)}
                    delta={undefined}
                    icon={<BarChart3 className="h-5 w-5" />}
                    spark={undefined}
                    onClick={() => router.push("/dashboard/news")}
                  />
                </>
              )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="rounded-2xl shadow-md xl:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>نظرة عامة</CardTitle>
                    <div className="flex items-center gap-2">
                      <UiSelect value={String(range)} onValueChange={(v) => setRange(Number(v) as 7 | 30 | 90)}>
                        <UiSelectTrigger className="h-8 w-32 bg-white">
                          <UiSelectValue placeholder="آخر 7 أيام" />
                        </UiSelectTrigger>
                        <UiSelectContent>
                          <UiSelectItem value="7">آخر 7 أيام</UiSelectItem>
                          <UiSelectItem value="30">آخر 30 يوم</UiSelectItem>
                          <UiSelectItem value="90">آخر 3 شهور</UiSelectItem>
                        </UiSelectContent>
                      </UiSelect>
                      <Tabs value={chartType} onValueChange={(v) => setChartType(v as any)}>
                        <TabsList>
                          <TabsTrigger value="bar">أعمدة</TabsTrigger>
                          <TabsTrigger value="line">خط</TabsTrigger>
                          <TabsTrigger value="area">مساحة</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Button variant="outline" size="sm" onClick={() => mutate()}>
                        <RefreshCcw className="h-4 w-4 mr-1" /> تحديث
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {error ? (
                    <div className="py-10 text-center">
                      <div className="text-rose-600 font-medium mb-2">حدث خطأ في تحميل البيانات</div>
                      <Button onClick={() => mutate()}>إعادة المحاولة</Button>
                    </div>
                  ) : (
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {(() => {
                          if (chartType === 'bar') {
                            return (
                              <RBarChart data={overview?.trend ?? []}>
                                <XAxis dataKey="date" hide tickMargin={8} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ direction: "rtl" }} />
                                <Bar dataKey="arbitration" stackId="a" fill="#003366" radius={[6,6,0,0]} />
                                <Bar dataKey="mediation" stackId="a" fill="#00B4D8" radius={[6,6,0,0]} />
                              </RBarChart>
                            )
                          }
                          if (chartType === 'line') {
                            return (
                              <AreaChart data={overview?.trend ?? []}>
                                <XAxis dataKey="date" hide />
                                <YAxis hide />
                                <Tooltip contentStyle={{ direction: "rtl" }} />
                                <Area type="monotone" dataKey="arbitration" stroke="#003366" fill="transparent" strokeWidth={2} />
                                <Area type="monotone" dataKey="mediation" stroke="#00B4D8" fill="transparent" strokeWidth={2} />
                              </AreaChart>
                            )
                          }
                          return (
                            <AreaChart data={overview?.trend ?? []}>
                              <XAxis dataKey="date" hide />
                              <YAxis hide />
                              <Tooltip contentStyle={{ direction: "rtl" }} />
                              <Area type="monotone" dataKey="arbitration" stroke="#003366" fill="#003366" fillOpacity={0.2} strokeWidth={2} />
                              <Area type="monotone" dataKey="mediation" stroke="#00B4D8" fill="#00B4D8" fillOpacity={0.2} strokeWidth={2} />
                            </AreaChart>
                          )
                        })()}
                      </ResponsiveContainer>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#003366]"></span> تحكيم</div>
                        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#00B4D8]"></span> وساطة</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle>آخر الإشعارات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(overview?.notifications ?? []).map((n: any) => (
                    <NotificationItem key={n.id} title={n.title} time={timeAgo(n.createdAt)} />
                  ))}
                  {(!overview?.notifications || overview.notifications.length === 0) && (
                    <div className="text-sm text-muted-foreground">لا توجد إشعارات</div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle>إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button className="bg-[#003366] hover:bg-[#003366]/90" onClick={() => router.push('/dashboard/news')}>
                      <Plus className="h-4 w-4 mr-1" /> إضافة خبر جديد
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-600/90" onClick={() => router.push('/dashboard/messages')}>
                      <Reply className="h-4 w-4 mr-1" /> الرد على الرسائل
                    </Button>
                    <Button className="bg-amber-600 hover:bg-amber-600/90" onClick={() => router.push('/dashboard/arbitration')}>
                      <FileText className="h-4 w-4 mr-1" /> مراجعة الطلبات
                    </Button>
                    <Button className="bg-pink-600 hover:bg-pink-600/90" onClick={() => router.push('/dashboard/gallery')}>
                      <ImagePlus className="h-4 w-4 mr-1" /> رفع صورة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle>الطلبات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">تصفية:</span>
                      <Tabs defaultValue="all">
                        <TabsList>
                          <TabsTrigger value="all">الكل</TabsTrigger>
                          <TabsTrigger value="new">جديد</TabsTrigger>
                          <TabsTrigger value="processing">قيد المعالجة</TabsTrigger>
                          <TabsTrigger value="done">مكتمل</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    <Button variant="outline" onClick={() => router.push('/dashboard/arbitration')}>
                      عرض المزيد
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-medium mb-2 text-[#003366]">تحكيم</div>
                      <div className="space-y-2">
                        {(overview?.recent?.arbitration ?? []).map((r: any) => (
                          <div key={r.id} className="flex items-center justify-between rounded-xl p-3 bg-white hover:shadow transition">
                            <div>
                              <div className="text-sm font-medium text-[#003366]">{r.clientName}</div>
                              <div className="text-xs text-muted-foreground">{r.type} • {timeAgo(r.createdAt)}</div>
                            </div>
                            <Badge className="bg-[#00B4D8] hover:bg-[#00B4D8]/90">{r.status}</Badge>
                          </div>
                        ))}
                        {(!overview?.recent?.arbitration || overview.recent.arbitration.length === 0) && (
                          <div className="text-sm text-muted-foreground">لا يوجد</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2 text-[#003366]">وساطة</div>
                      <div className="space-y-2">
                        {(overview?.recent?.mediation ?? []).map((r: any) => (
                          <div key={r.id} className="flex items-center justify-between rounded-xl p-3 bg-white hover:shadow transition">
                            <div>
                              <div className="text-sm font-medium text-[#003366]">{r.clientName}</div>
                              <div className="text-xs text-muted-foreground">{r.email} • {timeAgo(r.createdAt)}</div>
                            </div>
                            <Badge className="bg-[#00B4D8] hover:bg-[#00B4D8]/90">{r.status}</Badge>
                          </div>
                        ))}
                        {(!overview?.recent?.mediation || overview.recent.mediation.length === 0) && (
                          <div className="text-sm text-muted-foreground">لا يوجد</div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, onClick, active }: { icon: React.ReactNode; label: string; onClick?: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl transition hover:bg-white/10 ${active ? "bg-white/10" : ""}`}
    >
      <span className="text-sm">{label}</span>
      <span className="opacity-90">{icon}</span>
    </button>
  )
}

function StatCard({ title, value, icon, delta, spark, onClick }: { title: string; value: string; icon: React.ReactNode; delta?: number; spark?: number[]; onClick?: () => void }) {
  const isUp = typeof delta === 'number' ? delta >= 0 : undefined
  return (
    <Card
      onClick={onClick}
      className={`rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-transform duration-200 hover:scale-[1.01] ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="bg-gradient-to-l from-[#003366] to-[#00B4D8] p-0.5">
        <div className="bg-white rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium text-[#003366]">{title}</CardTitle>
              {typeof delta === 'number' && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{isUp ? '+' : ''}{delta}%</span>
              )}
            </div>
            <div className="text-white bg-gradient-to-l from-[#003366] to-[#00B4D8] p-2 rounded-xl shadow-sm">
              {icon}
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <div className="text-3xl font-bold text-[#003366]">{value}</div>
            {spark && spark.length > 0 && (
              <div className="h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spark.map((v, i) => ({ i, v }))}>
                    <YAxis hide />
                    <XAxis hide dataKey="i" />
                    <Area type="monotone" dataKey="v" stroke="#00B4D8" fill="#00B4D8" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
            <p className="text-xs text-muted-foreground">محدث الآن</p>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

function NotificationItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl p-3 bg-white hover:shadow-md transition">
      <div className="space-y-1">
        <div className="text-sm font-medium text-[#003366]">{title}</div>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
      <Badge className="bg-[#00B4D8] hover:bg-[#00B4D8]/90">جديد</Badge>
    </div>
  )
}

function calcDelta(trend?: Array<{ arbitration: number; mediation: number }>, key?: 'arbitration' | 'mediation'): number | undefined {
  if (!trend || !key || trend.length < 2) return undefined
  const prev = trend[trend.length - 2]?.[key] ?? 0
  const curr = trend[trend.length - 1]?.[key] ?? 0
  if (prev === 0 && curr === 0) return 0
  if (prev === 0) return 100
  const pct = Math.round(((curr - prev) / prev) * 100)
  return pct
}

function timeAgo(dateIso: string): string {
  try {
    const d = new Date(dateIso)
    const diffMs = Date.now() - d.getTime()
    const s = Math.floor(diffMs / 1000)
    if (s < 60) return `قبل ${s} ث` 
    const m = Math.floor(s / 60)
    if (m < 60) return `قبل ${m} د`
    const h = Math.floor(m / 60)
    if (h < 24) return `قبل ${h} س`
    const days = Math.floor(h / 24)
    if (days < 7) return `قبل ${days} يوم`
    const weeks = Math.floor(days / 7)
    return `قبل ${weeks} أسبوع`
  } catch {
    return ""
  }
}
