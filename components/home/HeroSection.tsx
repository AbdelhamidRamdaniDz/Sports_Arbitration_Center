"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function HeroSection() {
  const [parallaxY, setParallaxY] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setParallaxY(window.scrollY * 0.08)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="relative text-white overflow-hidden h-[500px] md:h-[600px] flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/hero-img.jpg"
          alt="خلفية البطل"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover  transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: `translateY(${parallaxY * 0.5}px) scale(1.05)` }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-corporate-green via-green-700 to-emerald-900 opacity-90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-4 bg-white/10 backdrop-blur-sm text-white border-white/20 px-4 py-1.5 text-xs">
            <Sparkles className="h-4 w-4 ml-2 inline" />
            ترقّبوا إطلاق خدماتنا قريبًا
          </Badge>

          <h1 className="text-3xl font-bold mb-4 md:text-4xl lg:text-5xl leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            حلول التحكيم الرياضي والتجاري
            <br />
            <span className="bg-gradient-to-r from-green-200 to-emerald-300 bg-clip-text text-transparent">
              المتخصصة والموثوقة
            </span>
          </h1>

          <p className="text-base md:text-lg mb-6 text-green-50 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            نطوّر خدمات التحكيم والوساطة بمعايير مهنية رفيعة تضمن العدالة والشفافية والسرعة في تسوية النزاعات الرياضية والتجارية.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="sm"
              className="bg-white text-corporate-green hover:bg-green-50 text-sm px-6 py-2 h-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group"
            >
              <Link href="/forms">
                <span className="relative">
                  تقديم قضية جديدة
                  <ArrowLeft className="mr-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-2 border-white text-white hover:bg-white hover:text-corporate-green text-sm px-6 py-2 h-auto bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Link href="/services">
                استكشف خدماتنا
                <ArrowRight className="ml-2 h-5 و-5 inline" />
              </Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 items-center">
            <div className="flex items-center gap-2 text-xs text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span>جارٍ العمل على الاعتماد الدولي</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span>لا توجد قضايا محلولة بعد</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span>لا تتوفر إحصاءات حالياً</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
