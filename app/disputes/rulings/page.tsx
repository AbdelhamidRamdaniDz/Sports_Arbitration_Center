"use client"
import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Calendar } from "lucide-react"

export default function RulingsPage() {
  const [search, setSearch] = useState("")
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f6faf9] to-[#eaf3f0]">
      <Header />
      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* عنوان الصفحة */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-corporate-green mb-2">ملخص أحكام التحكيم</h1>
          <p className="text-lg text-muted-foreground">تصفح وابحث في قاعدة بيانات أحكام التحكيم الرياضي</p>
        </div>
        {/* البحث والتصفية */}
        <Card className="mb-8 rounded-2xl shadow-soft border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-corporate-green">
              <Search className="h-5 w-5" /> البحث والتصفية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="ابحث في الأحكام..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-corporate-green/30"
                />
              </div>
              <Select>
                <SelectTrigger className="rounded-xl bg-gray-50 focus:bg-white">
                  <SelectValue placeholder="نوع الرياضة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">كرة القدم</SelectItem>
                  <SelectItem value="basketball">كرة السلة</SelectItem>
                  <SelectItem value="volleyball">كرة الطائرة</SelectItem>
                  <SelectItem value="tennis">التنس</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="rounded-xl bg-gray-50 focus:bg-white">
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {/* الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {[
            { value: "247", label: "إجمالي الأحكام" },
            { value: "89", label: "أحكام 2024" },
            { value: "15", label: "أنواع الرياضات" },
            { value: "95%", label: "معدل التنفيذ" },
          ].map((stat, i) => (
            <Card key={i} className="rounded-2xl border-0 bg-gradient-to-br from-corporate-green/10 to-white/80 shadow-soft hover:shadow-lg transition-all group">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-extrabold text-corporate-green mb-2 group-hover:text-trust-blue transition-colors">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* عرض الأحكام */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {[1, 2, 3, 4, 5].map((item) => (
            <Card key={item} className="rounded-2xl border-0 bg-white/95 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary" className="rounded px-2 py-1 text-xs">كرة القدم</Badge>
                      <Badge variant="outline" className="rounded px-2 py-1 text-xs">2024</Badge>
                      <span className="text-xs text-muted-foreground truncate">القضية رقم: SAC-2024-{item.toString().padStart(3, "0")}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-corporate-green transition-colors">نزاع حول انتقال لاعب بين ناديين سعوديين</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">قضية تتعلق بانتقال لاعب كرة قدم من نادي إلى آخر وخلاف حول المستحقات المالية والشروط التعاقدية...</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2 min-w-[120px]">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>15 نوفمبر 2024</span>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white transition-all">
                      <Download className="h-4 w-4 ml-1" /> تحميل الحكم
                    </Button>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
                    <div>
                      <span className="font-medium">المحكم الرئيسي:</span>
                      <span className="text-muted-foreground mr-2">د. أحمد محمد السعيد</span>
                    </div>
                    <div>
                      <span className="font-medium">نوع النزاع:</span>
                      <span className="text-muted-foreground mr-2">مالي - تعاقدي</span>
                    </div>
                    <div>
                      <span className="font-medium">النتيجة:</span>
                      <span className="text-green-600 mr-2">تم التسوية</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* الترقيم */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button variant="outline" size="sm" className="rounded-full px-4" disabled>
            السابق
          </Button>
          <Button variant="outline" size="sm" className="bg-corporate-green text-white rounded-full px-4 shadow-md">
            1
          </Button>
          <Button variant="outline" size="sm" className="rounded-full px-4">2</Button>
          <Button variant="outline" size="sm" className="rounded-full px-4">3</Button>
          <Button variant="outline" size="sm" className="rounded-full px-4">التالي</Button>
        </div>
      </div>
    </div>
  )
}
