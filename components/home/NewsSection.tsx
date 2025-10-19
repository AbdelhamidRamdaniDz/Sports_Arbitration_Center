"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Calendar, Clock } from "lucide-react"

export default function NewsSection() {
  const news = [
    {
      title: "سيتم الإعلان لاحقاً",
      excerpt: "جاري التحضير للأخبار والمستجدات وسيتم نشرها بعد الإطلاق",
      date: "-",
      category: "قريباً",
      image: "/placeholder.svg",
      readTime: "-",
      featured: false,
    },
  ]

  const categories = useMemo(() => {
    const cats = Array.from(new Set(news.map((n) => n.category)))
    return ["الكل", ...cats]
  }, [news])

  const [activeCategory, setActiveCategory] = useState<string>("الكل")
  const filteredNews = useMemo(() => {
    if (activeCategory === "الكل") return news
    return news.filter((n) => n.category === activeCategory)
  }, [activeCategory, news])

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
              <Calendar className="h-4 w-4 ml-1 inline" />
              تحديثات التأسيس
            </Badge>
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
              التحديثات القادمة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              سيتم الإعلان عن الأخبار والفعاليات لاحقاً بعد الإطلاق
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <div className="max-w-4xl mx-auto mb-10 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-corporate-green to-emerald-600 text-white border-corporate-green shadow-lg scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-corporate-green/50 hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredNews.map((article, index) => (
            <ScrollReveal key={index} direction="up" delay={400 + index * 100}>
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-corporate-green h-full">
                {article.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-amber-500 text-white shadow-lg animate-pulse">
                      مميز
                    </Badge>
                  </div>
                )}

                <div className="relative overflow-hidden h-48">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={800}
                    height={384}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-corporate-green/90 backdrop-blur-sm text-white border-white/20 transition-all duration-300 group-hover:scale-110">
                    {article.category}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <CardTitle className="text-lg leading-tight group-hover:text-corporate-green transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </CardTitle>

                  <CardDescription className="leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </CardDescription>

                  <div className="flex items-center text-corporate-green font-semibold text-sm mt-4 group-hover:translate-x-2 transition-transform">
                    اقرأ المزيد
                  </div>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={800}>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="border-2 border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white transition-all duration-300 hover:scale-105">
              <Link href="/news">عرض جميع الأخبار والمقالات</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
