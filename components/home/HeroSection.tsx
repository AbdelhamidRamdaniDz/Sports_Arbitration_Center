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
    <section className="relative text-white overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/hero-background.webp"
          alt="خلفية البطل"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover scale-105 transition-transform duration-700 ease-out will-change-transform"
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

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-white/10 backdrop-blur-sm text-white border-white/20 px-6 py-2 text-sm">
            <Sparkles className="h-4 w-4 ml-2 inline" />
            جارٍ العمل على الاعتماد الدولي
          </Badge>

          <h1 className="text-4xl font-bold mb-6 md:text-6xl lg:text-7xl leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            حلول التحكيم الرياضي
            <br />
            <span className="bg-gradient-to-r from-green-200 to-emerald-300 bg-clip-text text-transparent">
              المتخصصة والموثوقة
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-green-50 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            نعمل على تطوير خدمات التحكيم والوساطة الرياضية بمعايير مهنية عالية، وسيتم إطلاق الخدمات والإعلان عن التفاصيل قريباً
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-corporate-green hover:bg-green-50 text-lg px-10 py-6 h-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group"
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
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-corporate-green text-lg px-10 py-6 ه-auto bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Link href="/services">
                استكشف خدماتنا
                <ArrowRight className="ml-2 h-5 و-5 inline" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
            <div className="flex items-center gap-2 text-sm text-green-100">
              <CheckCircle className="h-5 w-5" />
              <span>جارٍ العمل على الاعتماد الدولي</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-100">
              <CheckCircle className="h-5 w-5" />
              <span>لا توجد قضايا محلولة بعد</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-100">
              <CheckCircle className="h-5 w-5" />
              <span>لا تتوفر إحصاءات حالياً</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32">
          <path
            fill="#ffffff"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  )
}
