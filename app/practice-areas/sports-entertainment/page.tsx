import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CTASection } from "@/components/cta-section"
import { Shield, Scale, Trophy, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "التحكيم والوساطة الرياضية | منصة ثقيم للتسوية البديلة",
  description:
    "منصة إلكترونية متخصصة في التحكيم والوساطة المؤسسية للنزاعات الرياضية والترفيهية: عقود اللاعبين، الرعايات، حقوق البث، والفعاليات.",
  keywords: "تحكيم رياضي, وساطة رياضية, نزاعات رياضية, ADR, الجزائر",
  openGraph: {
    title: "التحكيم والوساطة الرياضية | ثقيم",
    description: "حلول التسوية البديلة المتخصصة في المنازعات الرياضية والترفيهية عبر منصة رقمية متكاملة.",
  },
}

type Stat = {
  value: string
  label: string
  description?: string
}

const SE_STATS: Stat[] = [
  { value: "80+", label: "نزاع سنوي محسوم", description: "عقود وفعاليات" },
  { value: "$60M+", label: "قيمة النزاعات المدارة", description: "رعايات وحقوق بث" },
  { value: "900+", label: "عقد محكّم", description: "لاعبين ومدربين ووكلاء" },
  { value: "120+", label: "نزاع حقوق بث", description: "قنوات ومنصات رقمية" },
]

const ARBITRATION_STATS: Stat[] = [
  { value: "92%", label: "معدل التسوية", description: "في مرحلة الوساطة" },
  { value: "38", label: "يوم متوسط", description: "لإصدار الحكم التحكيمي" },
  { value: "96%", label: "رضا الأطراف", description: "عن حيادية الإجراءات" },
  { value: "100%", label: "إدارة رقمية", description: "إجراءات إلكترونية كاملة" },
]

const TRUST_FEATURES = [
  {
    icon: Shield,
    title: "حيادية مطلقة",
    description: "محكمون متخصصون في القانون الرياضي والعقود الترفيهية"
  },
  {
    icon: Scale,
    title: "عدالة الإجراءات",
    description: "بروتوكولات تحكيم ووساطة معتمدة دولياً ومحلياً"
  },
  {
    icon: Trophy,
    title: "تخصص رياضي",
    description: "خبرة في نزاعات اللاعبين والأندية والوكلاء والرعاة"
  },
  {
    icon: FileText,
    title: "سرية تامة",
    description: "حماية سمعة الأطراف وسرية المعلومات التجارية"
  }
]

function extractNumericValue(value: string): number {
  const cleaned = value.replace(/[$,kMB+%]/g, "")
  const match = cleaned.match(/[\d.]+/)
  if (!match) return 0
  
  const baseNumber = parseFloat(match[0])
  
  if (value.includes("B")) return baseNumber * 1_000_000_000
  if (value.includes("M")) return baseNumber * 1_000_000
  if (value.includes("k")) return baseNumber * 1_000
  
  return baseNumber
}

function extractSuffix(value: string): string {
  if (value.includes("+")) return "+"
  if (value.includes("%")) return "%"
  return ""
}

export default function SportsEntertainment() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-gray-800">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-5 text-white" aria-hidden>
          <defs>
            <pattern id="dots-se" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-se)" />
        </svg>
      </div>

      <Header />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <ScrollReveal direction="up" delay={150}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                <Shield className="h-4 w-4" />
                <span>منصة تحكيم ووساطة رياضية معتمدة</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">التحكيم والوساطة الرياضية والترفيهية</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={250}>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl text-white/90">
                منصة إلكترونية متخصصة في إدارة وحسم المنازعات الرياضية والترفيهية عبر التحكيم والوساطة المؤسسية. نوفر خدمات التحكيم والوساطة في نزاعات عقود اللاعبين والمدربين، الرعايات التجارية، حقوق البث، وتنظيم الفعاليات الرياضية والترفيهية.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30">
                  <Link href="/forms">تقديم نزاع رياضي</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20">
                  <Link href="/about/overview">عن المنصة</Link>
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">حجم الممارسة الرياضية</h2>
              <p className="text-white/80 max-w-2xl mx-auto">مؤشرات النزاعات الرياضية والترفيهية المدارة عبر المنصة</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SE_STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={220 + index * 80}>
                <div className="group rounded-2xl border border-white/20 bg-white/5 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl">
                  <div className="mb-2 text-4xl font-extrabold text-white drop-shadow-sm">
                    <AnimatedCounter 
                      end={extractNumericValue(stat.value)} 
                      suffix={extractSuffix(stat.value)} 
                      duration={2000} 
                    />
                  </div>
                  <div className="mb-1 text-lg font-semibold text-white">{stat.label}</div>
                  {stat.description && <div className="text-sm text-white/70">{stat.description}</div>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal direction="up" delay={150}>
              <div className="text-center mb-12">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                  <Scale className="h-4 w-4 text-orange-400" />
                  <span>خدمة أساسية</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">التحكيم والوساطة في النزاعات الرياضية</h2>
                <p className="text-white/80 max-w-3xl mx-auto text-lg">
                  نوفر خدمات التحكيم والوساطة المؤسسية المتخصصة في حسم المنازعات الرياضية والترفيهية، من نزاعات عقود اللاعبين والوكلاء إلى نزاعات الرعايات التجارية وحقوق البث وتنظيم الفعاليات، عبر منصة رقمية متكاملة تضمن الحيادية والسرعة والسرية.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {TRUST_FEATURES.map((feature, index) => (
                <ScrollReveal key={feature.title} direction="up" delay={220 + index * 80}>
                  <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl">
                    <div className="mb-4 inline-flex rounded-xl bg-orange-500/20 p-3">
                      <feature.icon className="h-6 w-6 text-orange-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{feature.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" delay={400}>
              <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-10 backdrop-blur-md shadow-2xl">
                <div className="mb-8 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">مؤشرات الأداء التحكيمي</h3>
                  <p className="text-white/70">كفاءة إدارة وحسم النزاعات الرياضية والترفيهية</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {ARBITRATION_STATS.map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="mb-2 text-4xl font-extrabold text-orange-400">
                        <AnimatedCounter 
                          end={extractNumericValue(stat.value)} 
                          suffix={extractSuffix(stat.value)} 
                          duration={2000} 
                        />
                      </div>
                      <div className="mb-1 text-base font-semibold text-white">{stat.label}</div>
                      {stat.description && <div className="text-sm text-white/60">{stat.description}</div>}
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="mb-6 text-center">
                    <h4 className="text-lg font-semibold text-white mb-3">نطاق التحكيم والوساطة الرياضية</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
                      <div className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>نزاعات عقود اللاعبين والمدربين والوكلاء</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>نزاعات الرعايات التجارية والتسويق الرياضي</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>نزاعات حقوق البث والنشر الإعلامي</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>نزاعات تنظيم الفعاليات والبطولات الرياضية</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30">
                      <Link href="/forms">تقديم طلب تحكيم</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white/10">
                      <Link href="/about/overview">تفاصيل الخدمة</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={150}>
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 md:p-12 text-center backdrop-blur-md shadow-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-white">
                <Trophy className="h-4 w-4 text-orange-400" />
                <span>منصة معتمدة ومرخصة</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">الحيادية والشفافية في إدارة النزاعات الرياضية</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                تعمل منصة ثقيم وفق أعلى معايير الحيادية والشفافية في إدارة النزاعات الرياضية والترفيهية، مع التزام تام بالسرية المهنية وحماية سمعة الأطراف. نضمن إجراءات عادلة وفعالة في بيئة رقمية آمنة.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-white/90 shadow-lg">
                  <Link href="/forms">ابدأ إجراءات التحكيم</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white/10">
                  <Link href="/about/accreditation">الاعتمادات والتراخيص</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        title="إدارة احترافية للنزاعات الرياضية والترفيهية"
        description="نقدم حلول التحكيم والوساطة المتخصصة لحماية حقوقك التجارية والعقدية في القطاع الرياضي والترفيهي."
        primaryButton={{ text: "تقديم نزاع", href: "/forms" }}
        secondaryButton={{ text: "الخدمات", href: "/services" }}
        variant="gradient-light"
        className="relative"
      />

      <Footer />
    </main>
  )
}