import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "التأمين وإعادة التأمين | حلول قانونية موثوقة",
  description:
    "استشارات وهيكلة عقود التأمين وإعادة التأمين، إدارة المطالبات والنزاعات، والامتثال التنظيمي في الجزائر.",
  keywords: "تأمين, إعادة تأمين, مطالبات, امتثال, الجزائر",
  openGraph: {
    title: "قطاع التأمين في الجزائر | إدارة المخاطر",
    description: "حلول قانونية لتقليل المخاطر وتعزيز الثقة بين المؤمنين والمؤمن لهم.",
  },
}

type Stat = {
  value: string
  label: string
  description?: string
}

const INS_STATS: Stat[] = [
  { value: "45+", label: "شركة تأمين", description: "محلية ودولية" },
  { value: "$1.2B+", label: "أقساط سنوية", description: "سوق التأمين" },
  { value: "78%", label: "نسبة التسوية", description: "مطالبات مُغلقة" },
  { value: "900+", label: "نزاع سنوي", description: "مطالبات وتعويضات" },
]

export default function Insurance() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-gray-800">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-corporate-green via-emerald-800 to-emerald-900" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-10 text-white" aria-hidden>
          <defs>
            <pattern id="dots-ins" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-ins)" />
        </svg>
      </div>

      <Header />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <ScrollReveal direction="up" delay={150}>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">التأمين وإعادة التأمين</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={220}>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl text-white/90">
                ندعم شركات التأمين والمؤمن لهم بهندسة المنتجات، إدارة المطالبات، وتسوية
                النزاعات وفق أفضل الممارسات والضوابط.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-corporate-green hover:bg-white/90">
                  <Link href="/forms">ابدأ استشارة</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-corporate-green hover:bg-white hover:text-corporate-green">
                  <Link href="/about/overview">تعرّف على المزيد</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={150}>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">مؤشرات رئيسية</h2>
              <p className="text-white/90 max-w-2xl mx-auto">أرقام مختصرة عن قطاع التأمين.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INS_STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={220 + index * 80}>
                <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                  <div className="mb-2 text-4xl font-extrabold text-white drop-shadow-sm">
                    <AnimatedCounter end={parseStatValue(stat.value)} suffix={getStatSuffix(stat.value)} duration={2000} />
                  </div>
                  <div className="mb-1 text-lg font-semibold text-white">{stat.label}</div>
                  {stat.description && <div className="text-sm text-white/80">{stat.description}</div>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="عقود واضحة، مخاطر أقل"
        description="نساعدك على صياغة العقود، إدارة المطالبات، وتسوية النزاعات بكفاءة."
        primaryButton={{ text: "تواصل معنا", href: "/forms" }}
        secondaryButton={{ text: "الخدمات", href: "/services" }}
        variant="gradient-light"
        className="relative"
      />

      <Footer />
    </main>
  )
}

function parseStatValue(value: string) {
  const cleaned = value.replace(/[$,kM+]/g, "")
  const numericMatch = cleaned.match(/\d+/)
  if (!numericMatch) return 0
  const num = Number.parseInt(numericMatch[0])
  if (value.includes("k")) return num * 1000
  if (value.includes("M")) return num * 1000000
  return num
}

function getStatSuffix(value: string) {
  if (value.includes("+")) return "+"
  if (value.includes("%")) return "%"
  return ""
}