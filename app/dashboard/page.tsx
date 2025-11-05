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
import { 
  BarChart3, Mail, Newspaper, Images, Video, Scale, Settings, LogOut, 
  Home, MessageCircle, Handshake, Gavel, Shield, Bell, Plus, Reply, 
  FileText, ImagePlus, RefreshCcw, CalendarDays, TrendingUp, TrendingDown, 
  BookOpen, PanelLeft, Search, Activity, Clock, Sparkles, Zap, 
  ArrowUpRight, Loader2, Menu
} from "lucide-react"
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
import { 
  Select as UiSelect, 
  SelectContent as UiSelectContent, 
  SelectItem as UiSelectItem, 
  SelectTrigger as UiSelectTrigger, 
  SelectValue as UiSelectValue 
} from "@/components/ui/select"
import {
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts"

export default function DashboardPage() {
  const router = useRouter()
  const { status, data: session } = useSession()

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const [range, setRange] = useState<7 | 30 | 90>(7)
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('area')
  const [notifOpen, setNotifOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { data: overview, isLoading, error, mutate } = useSWR<any>(
    `/api/dashboard/overview?range=${range}`, 
    fetcher,
    { refreshInterval: 30000 } // Auto refresh every 30 seconds
  )

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

  const stats = [
    { 
      id: 'arbitration',
      title: "طلبات التحكيم", 
      value: String(overview?.counts?.arbitration ?? 0),
      delta: calcDelta(overview?.trend, "arbitration"),
      icon: <Gavel className="h-5 w-5" />,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      bgPattern: "from-violet-500/10 to-fuchsia-500/5",
      route: "/dashboard/arbitration"
    },
    { 
      id: 'mediation',
      title: "طلبات الوساطة", 
      value: String(overview?.counts?.mediation ?? 0),
      delta: calcDelta(overview?.trend, "mediation"),
      icon: <Handshake className="h-5 w-5" />,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgPattern: "from-emerald-500/10 to-cyan-500/5",
      route: "/dashboard/mediation"
    },
    { 
      id: 'messages',
      title: "الرسائل الجديدة", 
      value: String(overview?.counts?.newMessages ?? 0),
      delta: undefined,
      icon: <Mail className="h-5 w-5" />,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      bgPattern: "from-amber-500/10 to-red-500/5",
      route: "/dashboard/messages"
    },
    { 
      id: 'media',
      title: "محتوى المركز الإعلامي", 
      value: String(overview?.counts?.media ?? 0),
      delta: undefined,
      icon: <BarChart3 className="h-5 w-5" />,
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      bgPattern: "from-blue-500/10 to-purple-500/5",
      route: "/dashboard/news"
    },
  ]

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-teal-400/5 via-cyan-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Enhanced Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col bg-gradient-to-b from-[#001529] via-[#002147] to-[#001529] text-white shadow-2xl border-l border-white/10 sticky top-0 h-screen overflow-hidden transition-all duration-500 ease-in-out ${sidebarOpen ? 'w-80' : 'w-20'}`}
        >
          {/* Sidebar Header */}
          <div className={`border-b border-white/10 backdrop-blur-xl ${sidebarOpen ? 'p-6' : 'p-4'} transition-all duration-300`}>
            <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8] to-[#0096C7] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 animate-pulse transition-opacity"></div>
                  <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-[#00B4D8] via-[#0096C7] to-[#0077B6] flex items-center justify-center shadow-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all">
                    <Scale className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className={`${sidebarOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                  <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                    مركز التحكيم
                    <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                  </div>
                  <div className="text-xs text-blue-200/80 font-medium">نظام الإدارة المتكامل</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-xl hover:bg-white/10 transition-all duration-300 ${sidebarOpen ? 'h-10 w-10' : 'h-9 w-9'}`}
                onClick={() => setSidebarOpen((v) => !v)}
              >
                <PanelLeft className={`h-5 w-5 text-white transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`} />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
            <div className={`text-xs font-semibold text-blue-300/80 ${sidebarOpen ? 'px-3 mb-3' : 'px-0 mb-2'} uppercase tracking-wider transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              القائمة الرئيسية
            </div>
            <SidebarItem collapsed={!sidebarOpen} icon={<Home className="h-4 w-4" />} label="الرئيسية" active onClick={() => router.push("/dashboard")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<Gavel className="h-4 w-4" />} label="طلبات التحكيم" onClick={() => router.push("/dashboard/arbitration")} badge={overview?.counts?.arbitration > 0 ? String(overview.counts.arbitration) : undefined} />
            <SidebarItem collapsed={!sidebarOpen} icon={<Handshake className="h-4 w-4" />} label="طلبات الوساطة" onClick={() => router.push("/dashboard/mediation")} badge={overview?.counts?.mediation > 0 ? String(overview.counts.mediation) : undefined} />
            <SidebarItem collapsed={!sidebarOpen} icon={<MessageCircle className="h-4 w-4" />} label="الرسائل والاستفسارات" onClick={() => router.push("/dashboard/messages")} badge={overview?.counts?.newMessages > 0 ? String(overview.counts.newMessages) : undefined} highlight={overview?.counts?.newMessages > 0} />
            <SidebarItem collapsed={!sidebarOpen} icon={<CalendarDays className="h-4 w-4" />} label="الحجوزات" onClick={() => router.push("/dashboard/bookings")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<Gavel className="h-4 w-4" />} label="أحكام التحكيم" onClick={() => router.push("/dashboard/rulings")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<BookOpen className="h-4 w-4" />} label="المكتبة الرقمية" onClick={() => router.push("/dashboard/library")} />
            
            <Separator className="my-4 bg-white/10" />
            
            <div className={`text-xs font-semibold text-blue-300/80 ${sidebarOpen ? 'px-3 mb-3' : 'px-0 mb-2'} uppercase tracking-wider transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              المركز الإعلامي
            </div>
            <SidebarItem collapsed={!sidebarOpen} icon={<Newspaper className="h-4 w-4" />} label="الأخبار" onClick={() => router.push("/dashboard/news")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<Images className="h-4 w-4" />} label="الصور" onClick={() => router.push("/dashboard/gallery")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<Video className="h-4 w-4" />} label="الفيديوهات" onClick={() => router.push("/dashboard/videos")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<Newspaper className="h-4 w-4" />} label="البيانات الصحفية" onClick={() => router.push("/dashboard/press-releases")} />
            
            <Separator className="my-4 bg-white/10" />
            
            <div className={`text-xs font-semibold text-blue-300/80 ${sidebarOpen ? 'px-3 mb-3' : 'px-0 mb-2'} uppercase tracking-wider transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              التشريعات
            </div>
            <SidebarItem collapsed={!sidebarOpen} icon={<FileText className="h-4 w-4" />} label="التشريعات" onClick={() => router.push("/dashboard/regulations")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<FileText className="h-4 w-4" />} label="التشريعات التجارية" onClick={() => router.push("/dashboard/national-commercial")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<FileText className="h-4 w-4" />} label="التشريعات الدولية" onClick={() => router.push("/dashboard/international")} />
            
            <Separator className="my-4 bg-white/10" />
            
            <SidebarItem collapsed={!sidebarOpen} icon={<Shield className="h-4 w-4" />} label="إدارة الأعضاء" onClick={() => router.push("/dashboard/members")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<Settings className="h-4 w-4" />} label="الإعدادات" onClick={() => router.push("/dashboard/settings")} />
            <SidebarItem collapsed={!sidebarOpen} icon={<LogOut className="h-4 w-4" />} label="تسجيل الخروج" onClick={() => signOut()} />
          </nav>

          {/* User Profile in Sidebar */}
          {sidebarOpen && (
            <div className="border-t border-white/10 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                <Avatar className="h-10 w-10 ring-2 ring-[#00B4D8]/30 ring-offset-2 ring-offset-[#001529] group-hover:ring-[#00B4D8]/50 transition-all">
                  <AvatarImage src={session?.user?.image || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-[#003366] to-[#00B4D8] text-white font-bold">
                    {session?.user?.name?.substring(0, 2) || "SA"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{session?.user?.name || "المشرف"}</div>
                  <div className="text-xs text-blue-200/70 truncate">{session?.user?.email}</div>
                </div>
                <LogOut className="h-4 w-4 text-blue-200/50 group-hover:text-red-400 transition-colors" />
              </div>
            </div>
          )}
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="right" className="w-80 bg-gradient-to-b from-[#001529] via-[#002147] to-[#001529] text-white border-r border-white/10 p-0">
            <SheetHeader className="border-b border-white/10 p-6">
              <SheetTitle className="flex items-center gap-3 text-white">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center shadow-lg">
                  <Scale className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">مركز التحكيم</div>
                  <div className="text-xs text-blue-200/80 font-normal">نظام الإدارة المتكامل</div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="px-4 py-6 space-y-1.5 overflow-y-auto h-[calc(100vh-8rem)]">
              <SidebarItem collapsed={false} icon={<Home className="h-4 w-4" />} label="الرئيسية" active onClick={() => { router.push("/dashboard"); setMobileMenuOpen(false); }} />
              <SidebarItem collapsed={false} icon={<Gavel className="h-4 w-4" />} label="طلبات التحكيم" onClick={() => { router.push("/dashboard/arbitration"); setMobileMenuOpen(false); }} />
              <SidebarItem collapsed={false} icon={<Handshake className="h-4 w-4" />} label="طلبات الوساطة" onClick={() => { router.push("/dashboard/mediation"); setMobileMenuOpen(false); }} />
              <SidebarItem collapsed={false} icon={<MessageCircle className="h-4 w-4" />} label="الرسائل" onClick={() => { router.push("/dashboard/messages"); setMobileMenuOpen(false); }} />
              <Separator className="my-4 bg-white/10" />
              <SidebarItem collapsed={false} icon={<Settings className="h-4 w-4" />} label="الإعدادات" onClick={() => { router.push("/dashboard/settings"); setMobileMenuOpen(false); }} />
              <SidebarItem collapsed={false} icon={<LogOut className="h-4 w-4" />} label="تسجيل الخروج" onClick={() => signOut()} />
            </nav>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Enhanced Header */}
          <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-2xl border-b border-slate-200/60 shadow-lg shadow-slate-200/50">
            <div className="max-w-[112.5rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-10 w-10 rounded-xl hover:bg-slate-100"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>

                  <div className="lg:hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#00B4D8] rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-[#003366] to-[#00B4D8] flex items-center justify-center shadow-lg">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-l from-[#003366] via-[#00509E] to-[#00B4D8] bg-clip-text text-transparent flex items-center gap-2">
                      لوحة تحكم التحكيم
                      <Activity className="h-5 w-5 text-emerald-500 animate-pulse" />
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-gradient-to-l from-[#003366] to-[#00B4D8] text-white border-0 shadow-md text-xs font-semibold">
                        Super Admin
                      </Badge>
                      <span className="hidden sm:flex text-xs text-slate-500 items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date().toLocaleDateString('ar-DZ', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Enhanced Search */}
                  <div className="hidden md:block relative group">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#00B4D8] transition-colors pointer-events-none" />
                    <Input 
                      placeholder="ابحث في النظام..." 
                      className="w-64 pr-10 bg-slate-50/80 border-slate-200/60 placeholder:text-slate-400 focus:ring-2 focus:ring-[#00B4D8]/30 focus:border-[#00B4D8]/50 transition-all rounded-xl shadow-sm hover:shadow-md" 
                    />
                  </div>
                  
                  {/* Notifications */}
                  <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="relative h-10 w-10 rounded-xl hover:bg-slate-100 transition-all group"
                      >
                        <Bell className="h-5 w-5 text-slate-600 group-hover:text-[#00B4D8] transition-colors" />
                        {overview?.notifications?.length > 0 && (
                          <>
                            <span className="absolute -top-1 -left-1 h-5 min-w-[1.25rem] px-1.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-[0.625rem] font-bold leading-5 text-white shadow-lg animate-bounce">
                              {overview.notifications.length}
                            </span>
                            <span className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-rose-500/30 animate-ping"></span>
                          </>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[22.5rem] sm:w-[27.5rem]">
                      <SheetHeader>
                        <SheetTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                          <Bell className="h-5 w-5" />
                          الإشعارات
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        <Tabs defaultValue="all">
                          <TabsList className="grid grid-cols-3 bg-slate-100 rounded-xl">
                            <TabsTrigger value="all" className="data-[state=active]:bg-white rounded-lg">الكل</TabsTrigger>
                            <TabsTrigger value="unread" className="data-[state=active]:bg-white rounded-lg">غير المقروء</TabsTrigger>
                            <TabsTrigger value="important" className="data-[state=active]:bg-white rounded-lg">مهم</TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <div className="space-y-3 max-h-[calc(100vh-12.5rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                          {(overview?.notifications ?? []).map((n: any) => (
                            <div key={n.id} className="group flex items-start gap-3 rounded-2xl border border-slate-200 p-4 hover:bg-gradient-to-br hover:from-slate-50 hover:to-blue-50/30 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-[#003366] line-clamp-2 group-hover:text-[#00B4D8] transition-colors">
                                  {n.title}
                                </div>
                                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {timeAgo(n.createdAt)}
                                </div>
                              </div>
                              <Badge variant="outline" className="border-[#00B4D8] text-[#00B4D8] shrink-0 rounded-lg">
                                {n.type === 'message' ? 'رسالة' : 'خبر'}
                              </Badge>
                            </div>
                          ))}
                          {(!overview?.notifications || overview.notifications.length === 0) && (
                            <div className="text-center py-16">
                              <div className="relative inline-block">
                                <div className="absolute inset-0 bg-slate-200 rounded-full blur-xl opacity-30"></div>
                                <Bell className="relative h-16 w-16 text-slate-300 mx-auto mb-4" />
                              </div>
                              <div className="text-sm text-slate-500 font-medium">لا توجد إشعارات جديدة</div>
                              <div className="text-xs text-slate-400 mt-1">ستظهر الإشعارات هنا عند وصولها</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-auto p-2 rounded-xl hover:bg-slate-100 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-[#00B4D8] transition-colors">
                              {session?.user?.name || "المشرف"}
                            </span>
                            <span className="text-xs text-slate-500">{session?.user?.email}</span>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#00B4D8] rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <Avatar className="relative h-10 w-10 ring-2 ring-[#00B4D8]/20 ring-offset-2 group-hover:ring-[#00B4D8]/40 transition-all">
                              <AvatarImage src={session?.user?.image || undefined} alt="avatar" />
                              <AvatarFallback className="bg-gradient-to-br from-[#003366] to-[#00B4D8] text-white font-bold">
                                {session?.user?.name?.substring(0, 2) || "SA"}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[12.5rem] rounded-xl border-slate-200/60 shadow-xl">
                      <DropdownMenuLabel className="text-[#003366]">الحساب</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer rounded-lg hover:bg-slate-50">
                        تعديل الملف الشخصي
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer rounded-lg hover:bg-rose-50 text-rose-600">
                        تسجيل الخروج
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 max-w-[112.5rem] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Loading Bar */}
            {isLoading && (
              <div className="h-1 w-full bg-gradient-to-l from-[#00B4D8] via-[#003366] to-[#00B4D8] rounded-full mb-6 shadow-lg overflow-hidden">
                <div className="h-full w-1/2 bg-white/30 animate-pulse"></div>
              </div>
            )}

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {isLoading ? (
                <>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="rounded-3xl border-0 shadow-lg overflow-hidden">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-6 w-2/3 rounded-full" />
                          <Skeleton className="h-14 w-14 rounded-2xl" />
                        </div>
                        <Skeleton className="h-12 w-1/2 rounded-lg" />
                        <Skeleton className="h-16 w-full rounded-xl" />
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                stats.map((stat) => (
                  <Card
                    key={stat.id}
                    onMouseEnter={() => setHoveredCard(stat.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => router.push(stat.route)}
                    className={`group rounded-3xl overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br ${stat.bgPattern} backdrop-blur-sm ${
                      hoveredCard === stat.id ? 'scale-105 -translate-y-2' : ''
                    }`}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
                      <div className="flex-1 space-y-3">
                        <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                          {stat.title}
                          <Zap className="h-3 w-3 text-amber-500 animate-pulse" />
                        </CardTitle>
                        <div className="flex items-baseline gap-3">
                          <div className={`text-4xl font-bold bg-gradient-to-l ${stat.gradient} bg-clip-text text-transparent transition-all duration-300 ${
                            hoveredCard === stat.id ? 'scale-110' : ''
                          }`}>
                            {stat.value}
                          </div>
                          {typeof stat.delta === 'number' && (
                            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              stat.delta >= 0 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-rose-100 text-rose-700'
                            }`}>
                              {stat.delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {Math.abs(stat.delta)}%
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`relative transition-all duration-500 ${hoveredCard === stat.id ? 'scale-110 rotate-6' : ''}`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                        <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                          <div className="text-white">{stat.icon}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-3">
                      {/* Mini Sparkline */}
                      {overview?.trend && overview.trend.length > 0 && (
                        <div className="h-12 -mx-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={(overview?.trend ?? []).map((t: any, i: number) => ({ 
                              i, 
                              v: stat.id === 'arbitration' ? t.arbitration : stat.id === 'mediation' ? t.mediation : 0 
                            }))}>
                              <defs>
                                <linearGradient id={`gradient-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={
                                    stat.gradient.includes('violet') ? '#8b5cf6' : 
                                    stat.gradient.includes('emerald') ? '#10b981' : 
                                    stat.gradient.includes('amber') ? '#f59e0b' : '#3b82f6'
                                  } stopOpacity={0.4} />
                                  <stop offset="100%" stopColor={
                                    stat.gradient.includes('violet') ? '#8b5cf6' : 
                                    stat.gradient.includes('emerald') ? '#10b981' : 
                                    stat.gradient.includes('amber') ? '#f59e0b' : '#3b82f6'
                                  } stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <YAxis hide />
                              <XAxis hide dataKey="i" />
                              <Area 
                                type="monotone" 
                                dataKey="v" 
                                stroke={
                                  stat.gradient.includes('violet') ? '#8b5cf6' : 
                                  stat.gradient.includes('emerald') ? '#10b981' : 
                                  stat.gradient.includes('amber') ? '#f59e0b' : '#3b82f6'
                                }
                                fill={`url(#gradient-${stat.id})`}
                                strokeWidth={2} 
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          محدث الآن
                        </p>
                        <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-[#00B4D8] transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Main Chart and Recent Notifications */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Enhanced Chart Card */}
              <Card className="rounded-3xl border-0 shadow-xl xl:col-span-2 bg-white/80 backdrop-blur overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle className="text-2xl font-bold text-[#003366] flex items-center gap-2">
                      نظرة عامة
                      <Activity className="h-5 w-5 text-emerald-500 animate-pulse" />
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                      <UiSelect value={String(range)} onValueChange={(v) => setRange(Number(v) as 7 | 30 | 90)}>
                        <UiSelectTrigger className="h-9 w-36 bg-white border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                          <UiSelectValue placeholder="آخر 7 أيام" />
                        </UiSelectTrigger>
                        <UiSelectContent className="rounded-xl">
                          <UiSelectItem value="7" className="rounded-lg">آخر 7 أيام</UiSelectItem>
                          <UiSelectItem value="30" className="rounded-lg">آخر 30 يوم</UiSelectItem>
                          <UiSelectItem value="90" className="rounded-lg">آخر 3 شهور</UiSelectItem>
                        </UiSelectContent>
                      </UiSelect>
                      <Tabs value={chartType} onValueChange={(v) => setChartType(v as any)}>
                        <TabsList className="bg-slate-100 rounded-xl">
                          <TabsTrigger value="bar" className="data-[state=active]:bg-white rounded-lg">أعمدة</TabsTrigger>
                          <TabsTrigger value="line" className="data-[state=active]:bg-white rounded-lg">خط</TabsTrigger>
                          <TabsTrigger value="area" className="data-[state=active]:bg-white rounded-lg">مساحة</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => mutate()}
                        disabled={isLoading}
                        className="rounded-xl hover:bg-slate-50 transition-all"
                      >
                        <RefreshCcw className={`h-4 w-4 ml-1 ${isLoading ? 'animate-spin' : ''}`} /> 
                        تحديث
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {error ? (
                    <div className="py-16 text-center">
                      <div className="relative inline-block mb-4">
                        <div className="absolute inset-0 bg-rose-200 rounded-full blur-xl opacity-30"></div>
                        <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto">
                          <AlertCircle className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="text-rose-600 font-semibold mb-3 text-lg">حدث خطأ في تحميل البيانات</div>
                      <p className="text-sm text-slate-500 mb-4">تعذر الاتصال بالخادم، يرجى المحاولة مرة أخرى</p>
                      <Button 
                        onClick={() => mutate()} 
                        className="bg-gradient-to-l from-[#003366] to-[#00B4D8] hover:opacity-90 rounded-xl shadow-lg"
                      >
                        <RefreshCcw className="h-4 w-4 ml-2" />
                        إعادة المحاولة
                      </Button>
                    </div>
                  ) : isLoading ? (
                    <div className="h-80 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <Loader2 className="h-12 w-12 text-[#00B4D8] animate-spin mx-auto" />
                        <p className="text-sm text-slate-500 font-medium">جاري تحميل البيانات...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {(() => {
                          if (chartType === 'bar') {
                            return (
                              <RBarChart data={overview?.trend ?? []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis 
                                  dataKey="date" 
                                  stroke="#94a3b8" 
                                  fontSize={12}
                                  tickMargin={8}
                                />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip 
                                  contentStyle={{ 
                                    direction: "rtl",
                                    borderRadius: "16px",
                                    border: "none",
                                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                                    padding: "12px"
                                  }}
                                  cursor={{ fill: 'rgba(0, 180, 216, 0.1)' }}
                                />
                                <Bar dataKey="arbitration" stackId="a" fill="#003366" radius={[8,8,0,0]} />
                                <Bar dataKey="mediation" stackId="a" fill="#00B4D8" radius={[8,8,0,0]} />
                              </RBarChart>
                            )
                          }
                          if (chartType === 'line') {
                            return (
                              <AreaChart data={overview?.trend ?? []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis 
                                  dataKey="date" 
                                  stroke="#94a3b8" 
                                  fontSize={12}
                                  tickMargin={8}
                                />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip 
                                  contentStyle={{ 
                                    direction: "rtl",
                                    borderRadius: "16px",
                                    border: "none",
                                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                                    padding: "12px"
                                  }}
                                  cursor={{ stroke: '#00B4D8', strokeWidth: 2 }}
                                />
                                <Area type="monotone" dataKey="arbitration" stroke="#003366" fill="transparent" strokeWidth={3} dot={{ fill: '#003366', r: 4 }} />
                                <Area type="monotone" dataKey="mediation" stroke="#00B4D8" fill="transparent" strokeWidth={3} dot={{ fill: '#00B4D8', r: 4 }} />
                              </AreaChart>
                            )
                          }
                          return (
                            <AreaChart data={overview?.trend ?? []}>
                              <defs>
                                <linearGradient id="colorArbitration" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#003366" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#003366" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorMediation" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#00B4D8" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                              <XAxis 
                                dataKey="date" 
                                stroke="#94a3b8" 
                                fontSize={12}
                                tickMargin={8}
                              />
                              <YAxis stroke="#94a3b8" fontSize={12} />
                              <Tooltip 
                                contentStyle={{ 
                                  direction: "rtl",
                                  borderRadius: "16px",
                                  border: "none",
                                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                                  padding: "12px"
                                }}
                                cursor={{ stroke: '#00B4D8', strokeWidth: 2 }}
                              />
                              <Area type="monotone" dataKey="arbitration" stroke="#003366" fill="url(#colorArbitration)" strokeWidth={3} />
                              <Area type="monotone" dataKey="mediation" stroke="#00B4D8" fill="url(#colorMediation)" strokeWidth={3} />
                            </AreaChart>
                          )
                        })()}
                      </ResponsiveContainer>
                      <div className="flex items-center justify-center gap-6 mt-6 text-sm font-medium">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#003366]/10 hover:bg-[#003366]/20 transition-colors cursor-pointer">
                          <span className="h-3 w-3 rounded-full bg-[#003366] shadow-lg"></span> 
                          <span className="text-slate-700">تحكيم</span>
                          <Badge className="bg-[#003366] text-white border-0 text-xs">
                            {overview?.counts?.arbitration ?? 0}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B4D8]/10 hover:bg-[#00B4D8]/20 transition-colors cursor-pointer">
                          <span className="h-3 w-3 rounded-full bg-[#00B4D8] shadow-lg"></span> 
                          <span className="text-slate-700">وساطة</span>
                          <Badge className="bg-[#00B4D8] text-white border-0 text-xs">
                            {overview?.counts?.mediation ?? 0}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced Notifications Card */}
              <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    آخر الإشعارات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
                  {isLoading ? (
                    <>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="rounded-2xl p-4 bg-slate-50 space-y-3">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {(overview?.notifications ?? []).map((n: any) => (
                        <NotificationItem key={n.id} title={n.title} time={timeAgo(n.createdAt)} type={n.type} />
                      ))}
                      {(!overview?.notifications || overview.notifications.length === 0) && (
                        <div className="text-center py-12">
                          <div className="relative inline-block">
                            <div className="absolute inset-0 bg-slate-200 rounded-full blur-xl opacity-30"></div>
                            <Bell className="relative h-12 w-12 text-slate-300 mx-auto mb-3" />
                          </div>
                          <div className="text-sm text-slate-500 font-medium">لا توجد إشعارات</div>
                          <div className="text-xs text-slate-400 mt-1">ستظهر الإشعارات الجديدة هنا</div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  إجراءات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    className="h-auto py-6 rounded-2xl bg-gradient-to-br from-[#003366] to-[#00509E] hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold group" 
                    onClick={() => router.push('/dashboard/news')}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Plus className="h-6 w-6" />
                      </div>
                      <span className="text-sm">إضافة خبر جديد</span>
                    </div>
                  </Button>
                  <Button 
                    className="h-auto py-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold group" 
                    onClick={() => router.push('/dashboard/messages')}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Reply className="h-6 w-6" />
                      </div>
                      <span className="text-sm">الرد على الرسائل</span>
                    </div>
                  </Button>
                  <Button 
                    className="h-auto py-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold group" 
                    onClick={() => router.push('/dashboard/arbitration')}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="text-sm">مراجعة الطلبات</span>
                    </div>
                  </Button>
                  <Button 
                    className="h-auto py-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold group" 
                    onClick={() => router.push('/dashboard/gallery')}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <ImagePlus className="h-6 w-6" />
                      </div>
                      <span className="text-sm">رفع صورة</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur overflow-hidden">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    الطلبات الأخيرة
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <Tabs defaultValue="all">
                      <TabsList className="bg-slate-100 rounded-xl">
                        <TabsTrigger value="all" className="data-[state=active]:bg-white rounded-lg text-xs sm:text-sm">الكل</TabsTrigger>
                        <TabsTrigger value="new" className="data-[state=active]:bg-white rounded-lg text-xs sm:text-sm">جديد</TabsTrigger>
                        <TabsTrigger value="processing" className="data-[state=active]:bg-white rounded-lg text-xs sm:text-sm">قيد المعالجة</TabsTrigger>
                        <TabsTrigger value="done" className="data-[state=active]:bg-white rounded-lg text-xs sm:text-sm">مكتمل</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button 
                      variant="outline" 
                      onClick={() => router.push('/dashboard/arbitration')}
                      className="rounded-xl hover:bg-slate-50 text-xs sm:text-sm"
                    >
                      عرض المزيد
                      <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="rounded-2xl p-4 bg-slate-50 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Arbitration Requests */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg blur opacity-50"></div>
                          <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <Gavel className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="font-bold text-[#003366]">تحكيم</div>
                        <Badge className="mr-auto bg-violet-100 text-violet-700 border-0">
                          {overview?.recent?.arbitration?.length ?? 0}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {(overview?.recent?.arbitration ?? []).map((r: any) => (
                          <div 
                            key={r.id} 
                            className="group flex items-center justify-between rounded-2xl p-4 bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:shadow-lg hover:scale-[1.02] hover:border-violet-200 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-[#003366] truncate group-hover:text-violet-600 transition-colors">
                                {r.clientName}
                              </div>
                              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                                <span className="truncate">{r.type}</span>
                                <span>•</span>
                                <Clock className="h-3 w-3" />
                                <span>{timeAgo(r.createdAt)}</span>
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-0 shadow-sm shrink-0 mr-3">
                              {r.status}
                            </Badge>
                          </div>
                        ))}
                        {(!overview?.recent?.arbitration || overview.recent.arbitration.length === 0) && (
                          <div className="text-center py-12 text-sm text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <Gavel className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                            لا توجد طلبات تحكيم
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mediation Requests */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg blur opacity-50"></div>
                          <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Handshake className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="font-bold text-[#003366]">وساطة</div>
                        <Badge className="mr-auto bg-emerald-100 text-emerald-700 border-0">
                          {overview?.recent?.mediation?.length ?? 0}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {(overview?.recent?.mediation ?? []).map((r: any) => (
                          <div 
                            key={r.id} 
                            className="group flex items-center justify-between rounded-2xl p-4 bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:shadow-lg hover:scale-[1.02] hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-[#003366] truncate group-hover:text-emerald-600 transition-colors">
                                {r.clientName}
                              </div>
                              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                                <span className="truncate">{r.email}</span>
                                <span>•</span>
                                <Clock className="h-3 w-3" />
                                <span>{timeAgo(r.createdAt)}</span>
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 shadow-sm shrink-0 mr-3">
                              {r.status}
                            </Badge>
                          </div>
                        ))}
                        {(!overview?.recent?.mediation || overview.recent.mediation.length === 0) && (
                          <div className="text-center py-12 text-sm text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <Handshake className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                            لا توجد طلبات وساطة
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <footer className="mt-auto border-t border-slate-200/60 bg-white/50 backdrop-blur-xl">
            <div className="max-w-[112.5rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Scale className="h-4 w-4 text-[#00B4D8]" />
                  <span className="font-semibold">مركز التحكيم</span>
                  <span>©</span>
                  <span>{new Date().getFullYear()}</span>
                  <span>جميع الحقوق محفوظة</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    النظام يعمل بشكل طبيعي
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>الإصدار 2.0.0</span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

// Enhanced Sidebar Item Component
function SidebarItem({ 
  icon, 
  label, 
  onClick, 
  active, 
  collapsed, 
  badge,
  highlight 
}: { 
  icon: React.ReactNode
  label: string
  onClick?: () => void
  active?: boolean
  collapsed?: boolean
  badge?: string
  highlight?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
        active 
          ? "bg-gradient-to-l from-[#00B4D8] to-[#0096C7] shadow-lg shadow-blue-500/30" 
          : "hover:bg-white/10 hover:shadow-md"
      }`}
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
    >
      {/* Animated background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-l from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${active ? 'hidden' : ''}`}></div>
      
      <div className="relative flex items-center gap-3">
        <span className={`${active ? "text-white" : "text-blue-200 group-hover:text-white"} transition-colors duration-300`}>
          {icon}
        </span>
        {!collapsed && (
          <span className={`text-sm font-medium ${active ? "text-white" : "text-blue-100 group-hover:text-white"} transition-colors duration-300`}>
            {label}
          </span>
        )}
      </div>
      
      {!collapsed && badge && (
        <Badge className={`${
          highlight 
            ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white animate-pulse" 
            : active 
              ? "bg-white/20 text-white" 
              : "bg-white/10 text-blue-100 group-hover:bg-white/20"
        } border-0 text-xs font-bold transition-all duration-300 shadow-sm`}>
          {badge}
        </Badge>
      )}
    </button>
  )
}

// Enhanced Notification Item Component
function NotificationItem({ 
  title, 
  time,
  type 
}: { 
  title: string
  time: string
  type?: string
}) {
  const getTypeConfig = (type?: string) => {
    switch(type) {
      case 'message':
        return { 
          icon: <MessageCircle className="h-5 w-5 text-white" />, 
          gradient: "from-amber-500 to-orange-600",
          badge: "رسالة"
        }
      case 'arbitration':
        return { 
          icon: <Gavel className="h-5 w-5 text-white" />, 
          gradient: "from-violet-500 to-purple-600",
          badge: "تحكيم"
        }
      case 'mediation':
        return { 
          icon: <Handshake className="h-5 w-5 text-white" />, 
          gradient: "from-emerald-500 to-teal-600",
          badge: "وساطة"
        }
      default:
        return { 
          icon: <Bell className="h-5 w-5 text-white" />, 
          gradient: "from-blue-500 to-cyan-600",
          badge: "خبر"
        }
    }
  }

  const config = getTypeConfig(type)

  return (
    <div className="group flex items-start gap-3 rounded-2xl p-4 bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:shadow-lg hover:scale-[1.02] hover:border-blue-200 transition-all duration-300 cursor-pointer">
      <div className="relative shrink-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity`}></div>
        <div className={`relative h-10 w-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {config.icon}
        </div>
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="text-sm font-semibold text-[#003366] line-clamp-2 group-hover:text-[#00B4D8] transition-colors">
          {title}
        </div>
        <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {time}
        </div>
      </div>
      <Badge className={`bg-gradient-to-br ${config.gradient} hover:opacity-90 border-0 shadow-sm shrink-0 text-xs`}>
        {config.badge}
      </Badge>
    </div>
  )
}

// Helper function to calculate delta
function calcDelta(trend?: Array<{ arbitration: number; mediation: number }>, key?: 'arbitration' | 'mediation'): number | undefined {
  if (!trend || !key || trend.length < 2) return undefined
  const prev = trend[trend.length - 2]?.[key] ?? 0
  const curr = trend[trend.length - 1]?.[key] ?? 0
  if (prev === 0 && curr === 0) return 0
  if (prev === 0) return 100
  const pct = Math.round(((curr - prev) / prev) * 100)
  return pct
}

// Helper function for time ago
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
    if (weeks < 4) return `قبل ${weeks} أسبوع`
    const months = Math.floor(days / 30)
    if (months < 12) return `قبل ${months} شهر`
    return `قبل ${Math.floor(months / 12)} سنة`
  } catch {
    return ""
  }
}