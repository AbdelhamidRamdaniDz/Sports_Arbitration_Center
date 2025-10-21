import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "الشركات الناشئة | تحكيم ووساطة وحلول قانونية في الجزائر",
  description:
    "مركز وساطة وتحكيم يقدم حلولاً قانونية داعمة للشركات الناشئة وروّاد الأعمال: الهيكلة القانونية، عقود وشراكات، تسوية النزاعات، الامتثال، الصفقات عبر الحدود، وحماية الملكية الفكرية.",
  keywords: "الشركات الناشئة, بيئة الشركات الناشئة, الهيكلة القانونية, تسوية النزاعات, الامتثال, الصفقات عبر الحدود, حماية الملكية الفكرية, الجزائر, وساطة, تحكيم",
  openGraph: {
    title: "الشركات الناشئة | حلول تحكيم ووساطة للشركات الناشئة",
    description:
      "خدمات مؤسسية للشركات الناشئة في الجزائر: هيكلة قانونية، عقود وشراكات، امتثال، وتسوية النزاعات.",
  },
}

type Stat = {
  value: string
  label: string
  description?: string
}

const STARTUP_STATS: Stat[] = [
  { value: "1200+", label: "شركة ناشئة", description: "مسجلة خلال السنوات الأخيرة" },
  { value: "$350M+", label: "استثمارات", description: "رؤوس أموال وتمويلات مُعلنة" },
  { value: "18k+", label: "فرصة عمل", description: "وظائف مباشرة وغير مباشرة" },
  { value: "25+", label: "حاضنات ومسرعات", description: "عبر مختلف الولايات" },
]

export default function Startups() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-gray-800">
      {/* Page Background: blue → purple gradient + subtle patterns */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-corporate-green via-emerald-800 to-emerald-900" />
        {/* soft glows */}
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
        {/* grid pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-10 text-white" aria-hidden>
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <ScrollReveal direction="up" delay={150}>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">
                حلول الوساطة والتحكيم للشركات الناشئة في الجزائر
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={220}>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl text-white/90">
                جهة مؤسسية للوساطة والتحكيم تقدّم دعماً قانونياً للشركات الناشئة وروّاد الأعمال: الهيكلة القانونية، صياغة العقود والشراكات، تسوية النزاعات، الامتثال، الصفقات عبر الحدود، وحماية الملكية الفكرية — دون أن نكون حاضنة أو مسرّعة أو جهة تمويل.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-corporate-green hover:bg-white/90">
                  <Link href="/forms">احجز استشارة قانونية</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-corporate-green hover:bg-white hover:text-corporate-green">
                  <Link href="/about/overview">تعرّف على المزيد</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section - glassmorphism cards + hover */}
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={150}>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">مؤشرات بيئة الشركات الناشئة</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                بيانات عامة عن بيئة الشركات الناشئة في الجزائر تُستخدم كمرجع سياقي لدعم القرارات القانونية والتعاقدية.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STARTUP_STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={220 + index * 80}>
                <div
                  className="group rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl"
                >
                  <div className="mb-2 text-4xl font-extrabold text-white drop-shadow-sm">
                    <AnimatedCounter end={parseStatValue(stat.value)} suffix={getStatSuffix(stat.value)} duration={2000} />
                  </div>
                  <div className="mb-1 text-lg font-semibold text-white">{stat.label}</div>
                  {stat.description && (
                    <div className="text-sm text-white/80">{stat.description}</div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="حلول قانونية ووساطة للشركات الناشئة"
        description="هيكلة قانونية وعقود وشراكات، تسوية النزاعات، والامتثال بما يدعم نموّ شركتك دون ادعاء برامج احتضان أو تمويل."
        primaryButton={{ text: "احجز استشارة قانونية", href: "/forms" }}
        secondaryButton={{ text: "نطاق الخدمات", href: "/services" }}
        variant="gradient-light"
        className="relative"
      />

      <Footer />
    </main>
  )
}

function parseStatValue(value: string) {
  const numericMatch = value.replace(/[$,kM+]/g, "").match(/\d+/)
  if (!numericMatch) return 0
  const num = Number.parseInt(numericMatch[0])
  if (value.includes("k")) return num * 1000
  if (value.includes("M")) return num * 1000000
  return num
}

function getStatSuffix(value: string) {
  if (value.includes("+")) return "+"
  if (value.includes("%")) return "%"
  if (value.includes("$")) return ""
  return ""
}