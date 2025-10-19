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
import { BarChart3, Mail, Newspaper, Images, Video, Scale, Settings, LogOut, Home, MessageCircle, Handshake, Gavel, Shield, Bell, Plus, Reply, FileText, ImagePlus, RefreshCcw, CalendarDays, TrendingUp, TrendingDown } from "lucide-react"
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
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex flex-col w-80 bg-gradient-to-b from-[#002147] via-[#003366] to-[#002147] text-white shadow-2xl border-l border-white/10 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#00B4D8] via-[#0096C7] to-[#0077B6] flex items-center justify-center shadow-lg shadow-blue-500/30 ring-2 ring-white/20">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg tracking-tight">مركز التحكيم</div>
                <div className="text-xs text-blue-200 font-medium">نظام الإدارة المتكامل</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1.5">
            <div className="text-xs font-semibold text-blue-300 px-3 mb-3 uppercase tracking-wider">القائمة الرئيسية</div>
            <SidebarItem icon={<Home className="h-4 w-4" />} label="الرئيسية" active onClick={() => router.push("/dashboard")} />
            <SidebarItem icon={<Gavel className="h-4 w-4" />} label="طلبات التحكيم" onClick={() => router.push("/dashboard/arbitration")} />
            <SidebarItem icon={<Handshake className="h-4 w-4" />} label="طلبات الوساطة" onClick={() => router.push("/dashboard/mediation")} />
            <SidebarItem icon={<MessageCircle className="h-4 w-4" />} label="الرسائل والاستفسارات" onClick={() => router.push("/dashboard/messages")} />
            <SidebarItem icon={<CalendarDays className="h-4 w-4" />} label="الحجوزات" onClick={() => router.push("/dashboard/bookings")} />
            <SidebarItem icon={<Gavel className="h-4 w-4" />} label="أحكام التحكيم" onClick={() => router.push("/dashboard/rulings")} />
            
            <Separator className="my-4 bg-white/10" />
            
            <div className="text-xs font-semibold text-blue-300 px-3 mb-3 uppercase tracking-wider">المركز الإعلامي</div>
            <SidebarItem icon={<Newspaper className="h-4 w-4" />} label="الأخبار" onClick={() => router.push("/dashboard/news")} />
            <SidebarItem icon={<Images className="h-4 w-4" />} label="الصور" onClick={() => router.push("/dashboard/gallery")} />
            <SidebarItem icon={<Video className="h-4 w-4" />} label="الفيديوهات" onClick={() => router.push("/dashboard/videos")} />
            
            <Separator className="my-4 bg-white/10" />
            
            <div className="text-xs font-semibold text-blue-300 px-3 mb-3 uppercase tracking-wider">التشريعات</div>
            <SidebarItem icon={<FileText className="h-4 w-4" />} label="التشريعات" onClick={() => router.push("/dashboard/regulations")} />
            <SidebarItem icon={<FileText className="h-4 w-4" />} label="التشريعات التجارية" onClick={() => router.push("/dashboard/national-commercial")} />
            <SidebarItem icon={<FileText className="h-4 w-4" />} label="التشريعات الدولية" onClick={() => router.push("/dashboard/international")} />
            
            <Separator className="my-4 bg-white/10" />
            
            <SidebarItem icon={<Shield className="h-4 w-4" />} label="إدارة الأعضاء" onClick={() => router.push("/dashboard/members")} />
            <SidebarItem icon={<Settings className="h-4 w-4" />} label="الإعدادات" onClick={() => router.push("/dashboard/settings")} />
            <SidebarItem icon={<LogOut className="h-4 w-4" />} label="تسجيل الخروج" onClick={() => router.push("/dashboard/logout")} />
          </nav>
        </aside>

        <main className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="lg:hidden h-11 w-11 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center shadow-lg">
                    <Scale className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-l from-[#003366] to-[#00B4D8] bg-clip-text text-transparent">
                      لوحة تحكم التحكيم
                    </h1>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="bg-gradient-to-l from-[#003366] to-[#00B4D8] text-white border-0 shadow-sm text-xs">
                        Super Admin
                      </Badge>
                      <span className="text-xs text-slate-500">• مرحباً بك</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <Input 
                      placeholder="ابحث هنا..." 
                      className="w-64 bg-slate-50/50 border-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-[#00B4D8]/20 transition-all" 
                    />
                  </div>
                  
                  <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="relative h-10 w-10 rounded-xl hover:bg-slate-100 transition-all"
                      >
                        <Bell className="h-5 w-5 text-slate-600" />
                        {overview?.notifications?.length ? (
                          <span className="absolute -top-1 -left-1 h-5 min-w-[20px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-[10px] font-bold leading-5 text-white shadow-lg animate-pulse">
                            {overview.notifications.length}
                          </span>
                        ) : null}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[360px] sm:w-[440px]">
                      <SheetHeader>
                        <SheetTitle className="text-xl font-bold text-[#003366]">الإشعارات</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        <Tabs defaultValue="all">
                          <TabsList className="grid grid-cols-3 bg-slate-100">
                            <TabsTrigger value="all" className="data-[state=active]:bg-white">الكل</TabsTrigger>
                            <TabsTrigger value="unread" className="data-[state=active]:bg-white">غير المقروء</TabsTrigger>
                            <TabsTrigger value="important" className="data-[state=active]:bg-white">مهم</TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                          {(overview?.notifications ?? []).map((n: any) => (
                            <div key={n.id} className="group flex items-start gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50 hover:shadow-md transition-all cursor-pointer">
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-[#003366] line-clamp-2 group-hover:text-[#00B4D8] transition-colors">
                                  {n.title}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">{timeAgo(n.createdAt)}</div>
                              </div>
                              <Badge variant="outline" className="border-[#00B4D8] text-[#00B4D8] shrink-0">
                                {n.type === 'message' ? 'رسالة' : 'خبر'}
                              </Badge>
                            </div>
                          ))}
                          {(!overview?.notifications || overview.notifications.length === 0) && (
                            <div className="text-center py-12">
                              <Bell className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                              <div className="text-sm text-slate-500 font-medium">لا توجد إشعارات جديدة</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-auto p-2 rounded-xl hover:bg-slate-100 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-semibold text-slate-700">{session?.user?.name || "المشرف"}</span>
                            <span className="text-xs text-slate-500">{session?.user?.email}</span>
                          </div>
                          <Avatar className="h-10 w-10 ring-2 ring-[#00B4D8]/20 ring-offset-2">
                            <AvatarImage src={session?.user?.image || undefined} alt="avatar" />
                            <AvatarFallback className="bg-gradient-to-br from-[#003366] to-[#00B4D8] text-white font-bold">SA</AvatarFallback>
                          </Avatar>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[200px]">
                      <DropdownMenuLabel>الحساب</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                        تعديل الملف الشخصي
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-rose-600">
                        تسجيل الخروج
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 max-w-[1800px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {isLoading && (
              <div className="h-1 w-full bg-gradient-to-l from-[#00B4D8] via-[#003366] to-[#00B4D8] rounded-full mb-6 animate-pulse shadow-lg" />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {isLoading ? (
                <>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="rounded-3xl border-0 shadow-lg">
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-1/3 mb-4 rounded-full" />
                        <Skeleton className="h-10 w-1/2 rounded-lg" />
                        <Skeleton className="h-16 w-full mt-4 rounded-xl" />
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
                    gradient="from-violet-500 to-purple-600"
                  />
                  <StatCard
                    title="طلبات الوساطة"
                    value={String(overview?.counts?.mediation ?? 0)}
                    delta={calcDelta(overview?.trend, "mediation")}
                    icon={<Handshake className="h-5 w-5" />}
                    spark={(overview?.trend ?? []).map((t: any) => t.mediation)}
                    onClick={() => router.push("/dashboard/mediation")}
                    gradient="from-emerald-500 to-teal-600"
                  />
                  <StatCard
                    title="الرسائل الجديدة"
                    value={String(overview?.counts?.newMessages ?? 0)}
                    delta={undefined}
                    icon={<Mail className="h-5 w-5" />}
                    spark={undefined}
                    onClick={() => router.push("/dashboard/messages")}
                    gradient="from-amber-500 to-orange-600"
                  />
                  <StatCard
                    title="محتوى المركز الإعلامي"
                    value={String(overview?.counts?.media ?? 0)}
                    delta={undefined}
                    icon={<BarChart3 className="h-5 w-5" />}
                    spark={undefined}
                    onClick={() => router.push("/dashboard/news")}
                    gradient="from-blue-500 to-cyan-600"
                  />
                </>
              )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              <Card className="rounded-3xl border-0 shadow-xl xl:col-span-2 bg-white/80 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle className="text-2xl font-bold text-[#003366]">نظرة عامة</CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                      <UiSelect value={String(range)} onValueChange={(v) => setRange(Number(v) as 7 | 30 | 90)}>
                        <UiSelectTrigger className="h-9 w-36 bg-white border-slate-200 rounded-xl">
                          <UiSelectValue placeholder="آخر 7 أيام" />
                        </UiSelectTrigger>
                        <UiSelectContent>
                          <UiSelectItem value="7">آخر 7 أيام</UiSelectItem>
                          <UiSelectItem value="30">آخر 30 يوم</UiSelectItem>
                          <UiSelectItem value="90">آخر 3 شهور</UiSelectItem>
                        </UiSelectContent>
                      </UiSelect>
                      <Tabs value={chartType} onValueChange={(v) => setChartType(v as any)}>
                        <TabsList className="bg-slate-100">
                          <TabsTrigger value="bar" className="data-[state=active]:bg-white">أعمدة</TabsTrigger>
                          <TabsTrigger value="line" className="data-[state=active]:bg-white">خط</TabsTrigger>
                          <TabsTrigger value="area" className="data-[state=active]:bg-white">مساحة</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => mutate()}
                        className="rounded-xl hover:bg-slate-50 transition-all"
                      >
                        <RefreshCcw className="h-4 w-4 ml-1" /> تحديث
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {error ? (
                    <div className="py-16 text-center">
                      <div className="text-rose-600 font-semibold mb-3 text-lg">حدث خطأ في تحميل البيانات</div>
                      <Button onClick={() => mutate()} className="bg-[#003366] hover:bg-[#003366]/90 rounded-xl">
                        إعادة المحاولة
                      </Button>
                    </div>
                  ) : (
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {(() => {
                          if (chartType === 'bar') {
                            return (
                              <RBarChart data={overview?.trend ?? []}>
                                <XAxis dataKey="date" hide tickMargin={8} />
                                <YAxis hide />
                                <Tooltip 
                                  contentStyle={{ 
                                    direction: "rtl",
                                    borderRadius: "12px",
                                    border: "none",
                                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                                  }} 
                                />
                                <Bar dataKey="arbitration" stackId="a" fill="#003366" radius={[8,8,0,0]} />
                                <Bar dataKey="mediation" stackId="a" fill="#00B4D8" radius={[8,8,0,0]} />
                              </RBarChart>
                            )
                          }
                          if (chartType === 'line') {
                            return (
                              <AreaChart data={overview?.trend ?? []}>
                                <XAxis dataKey="date" hide />
                                <YAxis hide />
                                <Tooltip 
                                  contentStyle={{ 
                                    direction: "rtl",
                                    borderRadius: "12px",
                                    border: "none",
                                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                                  }} 
                                />
                                <Area type="monotone" dataKey="arbitration" stroke="#003366" fill="transparent" strokeWidth={3} />
                                <Area type="monotone" dataKey="mediation" stroke="#00B4D8" fill="transparent" strokeWidth={3} />
                              </AreaChart>
                            )
                          }
                          return (
                            <AreaChart data={overview?.trend ?? []}>
                              <XAxis dataKey="date" hide />
                              <YAxis hide />
                              <Tooltip 
                                contentStyle={{ 
                                  direction: "rtl",
                                  borderRadius: "12px",
                                  border: "none",
                                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                                }} 
                              />
                              <Area type="monotone" dataKey="arbitration" stroke="#003366" fill="#003366" fillOpacity={0.3} strokeWidth={3} />
                              <Area type="monotone" dataKey="mediation" stroke="#00B4D8" fill="#00B4D8" fillOpacity={0.3} strokeWidth={3} />
                            </AreaChart>
                          )
                        })()}
                      </ResponsiveContainer>
                      <div className="flex items-center justify-center gap-6 mt-6 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-[#003366] shadow-lg"></span> 
                          <span className="text-slate-600">تحكيم</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-[#00B4D8] shadow-lg"></span> 
                          <span className="text-slate-600">وساطة</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#003366]">آخر الإشعارات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                  {(overview?.notifications ?? []).map((n: any) => (
                    <NotificationItem key={n.id} title={n.title} time={timeAgo(n.createdAt)} />
                  ))}
                  {(!overview?.notifications || overview.notifications.length === 0) && (
                    <div className="text-center py-8">
                      <Bell className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                      <div className="text-sm text-slate-500">لا توجد إشعارات</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-br from-slate-50 to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#003366]">إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button 
                      className="h-auto py-4 rounded-2xl bg-gradient-to-br from-[#003366] to-[#00509E] hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold" 
                      onClick={() => router.push('/dashboard/news')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Plus className="h-5 w-5" />
                        <span className="text-sm">إضافة خبر جديد</span>
                      </div>
                    </Button>
                    <Button 
                      className="h-auto py-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold" 
                      onClick={() => router.push('/dashboard/messages')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Reply className="h-5 w-5" />
                        <span className="text-sm">الرد على الرسائل</span>
                      </div>
                    </Button>
                    <Button 
                      className="h-auto py-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold" 
                      onClick={() => router.push('/dashboard/arbitration')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span className="text-sm">مراجعة الطلبات</span>
                      </div>
                    </Button>
                    <Button 
                      className="h-auto py-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold" 
                      onClick={() => router.push('/dashboard/gallery')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ImagePlus className="h-5 w-5" />
                        <span className="text-sm">رفع صورة</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle className="text-xl font-bold text-[#003366]">الطلبات الأخيرة</CardTitle>
                    <div className="flex items-center gap-3">
                      <Tabs defaultValue="all">
                        <TabsList className="bg-slate-100">
                          <TabsTrigger value="all" className="data-[state=active]:bg-white">الكل</TabsTrigger>
                          <TabsTrigger value="new" className="data-[state=active]:bg-white">جديد</TabsTrigger>
                          <TabsTrigger value="processing" className="data-[state=active]:bg-white">قيد المعالجة</TabsTrigger>
                          <TabsTrigger value="done" className="data-[state=active]:bg-white">مكتمل</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Button 
                        variant="outline" 
                        onClick={() => router.push('/dashboard/arbitration')}
                        className="rounded-xl hover:bg-slate-50"
                      >
                        عرض المزيد
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                          <Gavel className="h-4 w-4 text-white" />
                        </div>
                        <div className="font-bold text-[#003366]">تحكيم</div>
                      </div>
                      <div className="space-y-3">
                        {(overview?.recent?.arbitration ?? []).map((r: any) => (
                          <div 
                            key={r.id} 
                            className="group flex items-center justify-between rounded-2xl p-4 bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-[#003366] truncate group-hover:text-[#00B4D8] transition-colors">
                                {r.clientName}
                              </div>
                              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                                <span className="truncate">{r.type}</span>
                                <span>•</span>
                                <span>{timeAgo(r.createdAt)}</span>
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-0 shadow-sm shrink-0">
                              {r.status}
                            </Badge>
                          </div>
                        ))}
                        {(!overview?.recent?.arbitration || overview.recent.arbitration.length === 0) && (
                          <div className="text-center py-8 text-sm text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            لا توجد طلبات تحكيم
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <Handshake className="h-4 w-4 text-white" />
                        </div>
                        <div className="font-bold text-[#003366]">وساطة</div>
                      </div>
                      <div className="space-y-3">
                        {(overview?.recent?.mediation ?? []).map((r: any) => (
                          <div 
                            key={r.id} 
                            className="group flex items-center justify-between rounded-2xl p-4 bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-[#003366] truncate group-hover:text-[#00B4D8] transition-colors">
                                {r.clientName}
                              </div>
                              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                                <span className="truncate">{r.email}</span>
                                <span>•</span>
                                <span>{timeAgo(r.createdAt)}</span>
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 shadow-sm shrink-0">
                              {r.status}
                            </Badge>
                          </div>
                        ))}
                        {(!overview?.recent?.mediation || overview.recent.mediation.length === 0) && (
                          <div className="text-center py-8 text-sm text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            لا توجد طلبات وساطة
                          </div>
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
      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? "bg-gradient-to-l from-[#00B4D8] to-[#0096C7] shadow-lg shadow-blue-500/30" 
          : "hover:bg-white/10 hover:shadow-md"
      }`}
    >
      <span className={`text-sm font-medium ${active ? "text-white" : "text-blue-100 group-hover:text-white"}`}>
        {label}
      </span>
      <span className={`${active ? "text-white" : "text-blue-200 group-hover:text-white"} transition-colors`}>
        {icon}
      </span>
    </button>
  )
}

function StatCard({ 
  title, 
  value, 
  icon, 
  delta, 
  spark, 
  onClick,
  gradient = "from-[#003366] to-[#00B4D8]"
}: { 
  title: string
  value: string
  icon: React.ReactNode
  delta?: number
  spark?: number[]
  onClick?: () => void
  gradient?: string
}) {
  const isUp = typeof delta === 'number' ? delta >= 0 : undefined
  return (
    <Card
      onClick={onClick}
      className={`rounded-3xl overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      } bg-white/80 backdrop-blur`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
        <div className="flex-1">
          <CardTitle className="text-sm font-semibold text-slate-600 mb-3">{title}</CardTitle>
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-bold bg-gradient-to-l from-[#003366] to-[#00B4D8] bg-clip-text text-transparent">
              {value}
            </div>
            {typeof delta === 'number' && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                isUp 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-rose-100 text-rose-700'
              }`}>
                {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(delta)}%
              </div>
            )}
          </div>
        </div>
        <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-3">
        {spark && spark.length > 0 && (
          <div className="h-12 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spark.map((v, i) => ({ i, v }))}>
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00B4D8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00B4D8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis hide />
                <XAxis hide dataKey="i" />
                <Area 
                  type="monotone" 
                  dataKey="v" 
                  stroke="#00B4D8" 
                  fill={`url(#gradient-${title})`}
                  strokeWidth={2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          محدث الآن
        </p>
      </CardContent>
    </Card>
  )
}

function NotificationItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl p-4 bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0096C7] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <Bell className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="text-sm font-semibold text-[#003366] line-clamp-2 group-hover:text-[#00B4D8] transition-colors">
          {title}
        </div>
        <div className="text-xs text-slate-500 font-medium">{time}</div>
      </div>
      <Badge className="bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 shadow-sm shrink-0 text-xs">
        جديد
      </Badge>
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