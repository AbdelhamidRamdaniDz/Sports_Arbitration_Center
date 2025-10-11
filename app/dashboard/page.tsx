"use client"

import { useEffect } from "react"
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
import { BarChart3, Mail, Newspaper, Images, Video, Scale, Settings, LogOut, Home, MessageCircle, Handshake, Gavel } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { status, data: session } = useSession()

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
            <Separator className="my-3 opacity-40" />
            <SidebarItem icon={<Newspaper className="h-4 w-4" />} label="الأخبار" onClick={() => router.push("/dashboard/news")} />
            <SidebarItem icon={<Images className="h-4 w-4" />} label="الصور" onClick={() => router.push("/dashboard/gallery")} />
            <SidebarItem icon={<Video className="h-4 w-4" />} label="الفيديوهات" onClick={() => router.push("/dashboard/videos")} />
            <Separator className="my-3 opacity-40" />
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
          </header>

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
              <StatCard title="طلبات التحكيم" value="24" icon={<Gavel className="h-5 w-5" />} />
              <StatCard title="طلبات الوساطة" value="13" icon={<Handshake className="h-5 w-5" />} />
              <StatCard title="الرسائل الجديدة" value="8" icon={<Mail className="h-5 w-5" />} />
              <StatCard title="محتوى المركز الإعلامي" value="126" icon={<BarChart3 className="h-5 w-5" />} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="rounded-2xl shadow-md xl:col-span-2">
                <CardHeader>
                  <CardTitle>نظرة عامة</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>مرحبًا بك في لوحة التحكم. يمكنك إدارة طلبات التحكيم والوساطة، متابعة الرسائل، وإدارة المركز الإعلامي.</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle>آخر الإشعارات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <NotificationItem title="طلب تحكيم جديد" time="قبل 10 دقائق" />
                  <NotificationItem title="رسالة واردة" time="قبل ساعة" />
                  <NotificationItem title="تم نشر خبر" time="أمس" />
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

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-transform duration-200 hover:scale-[1.01]">
      <div className="bg-gradient-to-l from-[#003366] to-[#00B4D8] p-0.5">
        <div className="bg-white rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-sm font-medium text-[#003366]">{title}</CardTitle>
            <div className="text-white bg-gradient-to-l from-[#003366] to-[#00B4D8] p-2 rounded-xl shadow-sm">
              {icon}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-[#003366]">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">محدث الآن</p>
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
