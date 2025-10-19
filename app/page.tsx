"use client"
import dynamic from "next/dynamic"
import { Headerlanding } from "@/components/headerlanding"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import DevCardEasterEgg from "@/components/DevCardEasterEgg"

const ToolsSection = dynamic(() => import("@/components/home/ToolsSection"), { ssr: false, loading: () => <section className="py-16 md:py-20" /> })
const NewsSection = dynamic(() => import("@/components/home/NewsSection"), { ssr: false, loading: () => <section className="py-16 md:py-20" /> })
const ArbitratorsSection = dynamic(() => import("@/components/home/ArbitratorsSection"), { ssr: false, loading: () => <section className="py-16 md:py-20" /> })
const AchievementsSection = dynamic(() => import("@/components/home/AchievementsSection"), { ssr: false, loading: () => <section className="py-12" /> })
const StatsInfoSection = dynamic(() => import("@/components/home/StatsInfoSection"), { ssr: false, loading: () => <section className="py-16" /> })
const ProcessTimelineSection = dynamic(() => import("@/components/home/ProcessTimelineSection"), { ssr: false, loading: () => <section className="py-16" /> })
const ServicesSection = dynamic(() => import("@/components/home/ServicesSection"), { ssr: false, loading: () => <section className="py-16 md:py-20" /> })
const ProgressBar = dynamic(() => import("@/components/home/ProgressBar"), { ssr: false })
const HeroSection = dynamic(() => import("@/components/home/HeroSection"), { ssr: false, loading: () => <section className="min-h-screen" /> })

export default function HomePage() {



  return (
    <div className="min-h-screen bg-background">
      <ProgressBar />

      <Headerlanding />

      <HeroSection />

      <AchievementsSection />

      <StatsInfoSection />

      <ServicesSection />

      <ToolsSection />

      <ArbitratorsSection />

      <NewsSection />

      <ProcessTimelineSection />

      <ScrollReveal direction="up" delay={200}>
        <CTASection
          title="هل تحتاج إلى خدمات التحكيم الرياضي؟"
          description="نعمل على تشكيل فريق مختص لتقديم خدمات التحكيم والوساطة الرياضية. سيتم استقبال الطلبات والإعلان عن التفاصيل بعد الإطلاق."
          primaryButton={{
            text: "تقديم قضية جديدة",
            href: "/forms",
          }}
          secondaryButton={{
            text: "تواصل معنا",
            href: "/contact",
          }}
          variant="corporate"
        />
      </ScrollReveal>

      <DevCardEasterEgg />

      <Footer />
    </div>
  )
}