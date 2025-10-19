"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TrendingUp, Award, Star, Users, FileCheck } from "lucide-react"

export default function StatsInfoSection() {
  const stats = [
    { value: "قريباً", label: "بداية استقبال القضايا", description: "سيتم الإعلان بعد الإطلاق", icon: <FileCheck className="h-6 w-6" /> },
    { value: "قيد التأسيس", label: "فريق التحكيم", description: "قيد التقييم والاعتماد", icon: <Users className="h-6 w-6" /> },
    { value: "—", label: "سنوات الخبرة", description: "المركز في مرحلة التأسيس", icon: <Award className="h-6 w-6" /> },
    { value: "—", label: "تقييم العملاء", description: "لم يبدأ التشغيل بعد", icon: <Star className="h-6 w-6" /> },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
            <TrendingUp className="h-4 w-4 ml-1 inline" />
            المرحلة الحالية
          </Badge>
          <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
            معلومات المرحلة التأسيسية
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            سيتم تحديث هذه الأرقام والبيانات بعد الإطلاق
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} direction="up" delay={300 + idx * 100}>
              <Card className="group relative overflow-hidden border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-corporate-green/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-corporate-green mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
