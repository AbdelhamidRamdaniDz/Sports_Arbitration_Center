"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Zap, Gavel, GraduationCap, Handshake, Building, ArrowLeft } from "lucide-react"
import { SERVICES } from "@/lib/constants"

export default function ServicesSection() {
  const serviceIcons = {
    gavel: <Gavel className="h-6 w-6" />,
    "graduation-cap": <GraduationCap className="h-6 w-6" />,
    handshake: <Handshake className="h-6 w-6" />,
    building: <Building className="h-6 w-6" />,
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
              <Zap className="h-4 w-4 ml-1 inline" />
              خدمات متكاملة
            </Badge>
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
              خدماتنا المتخصصة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مجموعة شاملة من الخدمات القانونية المتخصصة في المجال الرياضي
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SERVICES.map((service, index) => (
            <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
              <ServiceCard
                title={service.title}
                description={service.description}
                benefits={service.benefits.slice(0, 3)}
                icon={serviceIcons[service.icon as keyof typeof serviceIcons]}
                href="/services"
                variant={index === 0 ? "featured" : "default"}
                className="h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={800}>
          <div className="text-center">
            <Link href="/services">
              <Button size="lg" className="bg-gradient-to-r from-corporate-green to-emerald-600 hover:from-corporate-green/90 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                عرض جميع الخدمات
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
