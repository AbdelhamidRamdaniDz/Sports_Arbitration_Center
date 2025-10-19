"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Calculator, Sparkles, Zap } from "lucide-react"

export default function ToolsSection() {
  const tools = [
    {
      title: "حاسبة النزاعات",
      description: "الميزة قيد التطوير وسيتم إتاحتها بعد الإطلاق",
      icon: <Calculator className="h-6 w-6" />,
      href: "/disputes/calculator",
      badge: "قريباً",
      color: "blue" as const,
    },
    {
      title: "تتبع القضايا",
      description: "سيُتاح تتبع القضايا بعد الإطلاق الرسمي",
      icon: <Calculator className="h-6 w-6" />,
      href: "/disputes/tracking",
      badge: "قريباً",
      color: "green" as const,
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
              <Calculator className="h-4 w-4 ml-1 inline" />
              أدوات ذكية
            </Badge>
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
              أدوات مساعدة متطورة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              تقنيات حديثة لتسهيل عملية التحكيم والوساطة
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tools.map((tool, index) => (
            <ScrollReveal key={index} direction="up" delay={400 + index * 200}>
              <Link href={tool.href}>
                <Card className={`group relative overflow-hidden border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full ${
                  tool.color === 'blue' ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-gradient-to-br from-green-50 to-white'
                }`}>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-corporate-green/5 to-transparent rounded-full -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-700" />
                  <CardContent className="p-8 relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        {tool.icon}
                      </div>
                      {tool.badge && (
                        <Badge className="bg-amber-100 text-amber-700 animate-pulse">
                          <Sparkles className="h-3 w-3 ml-1" />
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-corporate-green mb-3 group-hover:text-emerald-700 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-corporate-green font-semibold group-hover:translate-x-2 transition-transform">
                      قريباً
                      <Zap className="mr-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
