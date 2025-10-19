"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Clock, Users } from "lucide-react"

export default function ArbitratorsSection() {
  const [arbitrators, setArbitrators] = useState<Array<{
    id: string
    name: string
    image?: string | null
    experience: number | null
    specialization: string | null
    city: string | null
  }>>([])

  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let mounted = true
    let observed = false
    const load = async () => {
      try {
        const res = await fetch('/api/members?role=arbitrator&status=active')
        if (!res.ok) return
        const json = await res.json()
        if (mounted) setArbitrators(json.data || [])
      } catch {}
    }
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const el = sectionRef.current
      if (el) {
        const io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !observed) {
            observed = true
            load()
            io.disconnect()
          }
        }, { rootMargin: '200px' })
        io.observe(el)
        return () => { mounted = false; io.disconnect() }
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
              <Users className="h-4 w-4 ml-1 inline" />
              قائمة المحكمين
            </Badge>
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
              قائمة المحكمين قيد الإعداد
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              سيتم نشر القائمة والتفاصيل المهنية بعد اكتمال إجراءات الاعتماد
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {arbitrators.map((arbitrator, index) => (
            <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-corporate-green">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-corporate-green/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-6 text-center relative">
                  <div className="relative mb-4 inline-block">
                    <div className="relative">
                      <Image
                        src={arbitrator.image || '/placeholder.svg'}
                        alt={arbitrator.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full mx-auto object-cover transition-all duration-300 group-hover:scale-110 ring-4 ring-gray-100 group-hover:ring-corporate-green"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-corporate-green mb-1 text-lg group-hover:text-emerald-700 transition-colors">
                    {arbitrator.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{arbitrator.city || 'محكم'}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{typeof arbitrator.experience === 'number' ? `${arbitrator.experience} سنة خبرة` : '-'}</span>
                    </div>
                    <p className="text-corporate-green font-medium px-2">
                      {arbitrator.specialization || '-'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={800}>
          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Link href="/members">عرض القائمة الكاملة للمحكمين</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
