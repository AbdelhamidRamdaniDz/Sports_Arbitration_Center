import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CTASection } from "@/components/cta-section"
import { Shield, Scale, FileCheck, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "التحكيم والوساطة العقارية | منصة ثقيم للتسوية البديلة",
  description:
    "منصة إلكترونية متخصصة في التحكيم والوساطة المؤسسية للمنازعات العقارية، مع إدارة شاملة للنزاعات في التطوير والاستثمار وإدارة الأصول.",
  keywords: "تحكيم عقاري, وساطة عقارية, منازعات عقارية, ADR, الجزائر",
  openGraph: {
    title: "التحكيم والوساطة العقارية | ثقيم",
    description: "حلول التسوية البديلة المتخصصة في المنازعات العقارية عبر منصة رقمية متكاملة.",
  },
}

type Stat = {
  value: string
  label: string
  description?: string
}

const REAL_ESTATE_STATS: Stat[] = [
  { value: "$4.5B+", label: "قيمة النزاعات المدارة", description: "عقود تطوير وتمويل" },
  { value: "60k+", label: "وحدة عقارية", description: "محل نزاعات محسومة" },
  { value: "8k+", label: "عقد محكّم سنوياً", description: "بيع، إيجار، إدارة" },
  { value: "1.1k+", label: "نزاع عقاري محسوم", description: "تحكيم ووساطة مؤسسية" },
]

const ARBITRATION_STATS: Stat[] = [
  { value: "87%", label: "معدل التسوية", description: "في المرحلة الأولى" },
  { value: "45", label: "يوم متوسط", description: "لإصدار الحكم التحكيمي" },
  { value: "94%", label: "رضا الأطراف", description: "عن عدالة الإجراءات" },
  { value: "100%", label: "تنفيذ رقمي", description: "إدارة القضايا إلكترونياً" },
]

const TRUST_FEATURES = [
  {
    icon: Shield,
    title: "حيادية مؤسسية",
    description: "هيئات تحكيم محايدة معتمدة وفق المعايير الدولية"
  },
  {
    icon: Scale,
    title: "إجراءات منظمة",
    description: "بروتوكولات تحكيم ووساطة معتمدة ومتوافقة قانونياً"
  },
  {
    icon: FileCheck,
    title: "سرية تامة",
    description: "حماية معلومات الأطراف وسرية الإجراءات والأحكام"
  },
  {
    icon: Building2,
    title: "تخصص عقاري",
    description: "محكمون متخصصون في القانون العقاري والتطوير"
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

export default function RealEstate() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-gray-800">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-5 text-white" aria-hidden>
          <defs>
            <pattern id="dots-re" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-re)" />
        </svg>
      </div>

      <Header />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <ScrollReveal direction="up" delay={150}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                <Shield className="h-4 w-4" />
                <span>منصة تحكيم ووساطة مؤسسية معتمدة</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">التحكيم والوساطة العقارية</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={250}>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl text-white/90">
                منصة إلكترونية متخصصة في إدارة وحسم المنازعات العقارية عبر التحكيم والوساطة المؤسسية. نوفر خدمات التحكيم والوساطة في نزاعات التطوير والاستثمار والتمويل العقاري، إلى جانب الاستشارات القانونية لعقود إدارة الأصول، بما يضمن اليقين القانوني وحماية القيمة عبر دورة حياة الأصل العقاري.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30">
                  <Link href="/forms">تقديم نزاع عقاري</Link>
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">حجم الممارسة العقارية</h2>
              <p className="text-white/80 max-w-2xl mx-auto">مؤشرات النزاعات العقارية المدارة عبر المنصة</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REAL_ESTATE_STATS.map((stat, index) => (
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
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                  <Scale className="h-4 w-4 text-emerald-400" />
                  <span>خدمة أساسية</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">التحكيم والوساطة في النزاعات العقارية</h2>
                <p className="text-white/80 max-w-3xl mx-auto text-lg">
                  نوفر خدمات التحكيم والوساطة المؤسسية المتخصصة في حسم المنازعات العقارية، من نزاعات عقود التطوير والإنشاء إلى نزاعات التمويل وإدارة الأصول، عبر منصة رقمية متكاملة تضمن الشفافية والحيادية والسرعة.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {TRUST_FEATURES.map((feature, index) => (
                <ScrollReveal key={feature.title} direction="up" delay={220 + index * 80}>
                  <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl">
                    <div className="mb-4 inline-flex rounded-xl bg-emerald-500/20 p-3">
                      <feature.icon className="h-6 w-6 text-emerald-400" />
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
                  <p className="text-white/70">كفاءة إدارة وحسم النزاعات العقارية</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {ARBITRATION_STATS.map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="mb-2 text-4xl font-extrabold text-emerald-400">
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
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/10">
                  <Button asChild size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30">
                    <Link href="/forms">تقديم طلب تحكيم</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white/10">
                    <Link href="/about/overview">تفاصيل الخدمة</Link>
                  </Button>
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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-white">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                <span>منصة معتمدة ومرخصة</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">الثقة المؤسسية في إدارة النزاعات</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                تعمل منصة ثقيم وفق أعلى معايير الحيادية والشفافية، مع التزام تام بالسرية المهنية والإجراءات المنظمة. نضمن لجميع الأطراف إجراءات عادلة وفعالة في بيئة رقمية آمنة.
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
        title="إدارة احترافية للنزاعات العقارية"
        description="نقدم حلول التحكيم والوساطة المتخصصة لحماية استثماراتك العقارية وضمان اليقين القانوني في جميع المراحل."
        primaryButton={{ text: "تقديم نزاع", href: "/forms" }}
        secondaryButton={{ text: "الخدمات", href: "/services" }}
        variant="gradient-light"
        className="relative"
      />

      <Footer />
    </main>
  )
}