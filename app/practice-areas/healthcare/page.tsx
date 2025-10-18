import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "التحكيم والوساطة في الرعاية الصحية | حلول سريعة وفعالة",
  description:
    "خدمات تحكيم ووساطة متخصصة للنزاعات الطبية والإدارية في القطاع الصحي. حلول بديلة سريعة وسرية.",
  keywords: "تحكيم طبي, وساطة صحية, نزاعات طبية, الجزائر, حلول بديلة",
  openGraph: {
    title: "التحكيم والوساطة في القطاع الصحي | حلول عادلة وسريعة",
    description: "نساعدك على حل النزاعات الطبية والإدارية بسرعة وسرية عبر التحكيم والوساطة المتخصصة.",
  },
}

type Stat = {
  value: string
  label: string
  description?: string
}

const HC_STATS: Stat[] = [
  { value: "45+", label: "نزاع محل", description: "في القطاع الصحي" },
  { value: "92%", label: "نسبة التسوية", description: "عبر الوساطة" },
  { value: "30", label: "يوم متوسط", description: "لحل النزاعات" },
  { value: "15+", label: "مؤسسة صحية", description: "عميل دائم" },
]

type Service = {
  icon: string
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    icon: "⚖️",
    title: "التحكيم الطبي",
    description: "حل النزاعات بين المؤسسات الصحية والأطراف الأخرى عبر إجراءات تحكيمية محترفة وملزمة قانونياً"
  },
  {
    icon: "🤝",
    title: "الوساطة الصحية",
    description: "تسوية ودية للخلافات بين المرضى ومقدمي الخدمات الصحية بسرية تامة وبأقل التكاليف"
  },
  {
    icon: "📋",
    title: "النزاعات التعاقدية",
    description: "حل نزاعات عقود التوريد، الخدمات، والتشغيل بين المستشفيات والموردين والمقاولين"
  },
  {
    icon: "🏥",
    title: "النزاعات الإدارية",
    description: "معالجة الخلافات الإدارية داخل المؤسسات الصحية وبين الأطباء والإدارة"
  },
  {
    icon: "💼",
    title: "نزاعات التأمين الصحي",
    description: "فض النزاعات بين المؤسسات الصحية وشركات التأمين حول المطالبات والتغطية"
  },
  {
    icon: "🔒",
    title: "حماية البيانات الصحية",
    description: "حل النزاعات المتعلقة بخرق البيانات الطبية والخصوصية والامتثال للأنظمة"
  }
]

export default function Healthcare() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/15 to-emerald-400/15 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
          <defs>
            <pattern id="healthcare-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 32V.5H32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#healthcare-grid)" />
        </svg>
      </div>

      <Header />

      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <ScrollReveal direction="up" delay={100}>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 mb-6 border border-emerald-200/50 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-700">التحكيم والوساطة في القطاع الصحي</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={150}>
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
                  حلول بديلة للنزاعات
                  <span className="block mt-2 bg-gradient-to-l from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    في القطاع الصحي
                  </span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={200}>
                <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl md:text-2xl font-light">
                  نقدم خدمات تحكيم ووساطة متخصصة لحل النزاعات الطبية والإدارية بسرعة وسرية وبأقل التكاليف،
                  مع الحفاظ على العلاقات المهنية بين جميع الأطراف.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={250}>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                  <Button 
                    asChild 
                    size="lg" 
                    className="group relative overflow-hidden bg-gradient-to-l from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 px-8 py-6 text-base font-semibold rounded-xl"
                  >
                    <Link href="/forms">
                      <span className="relative z-10">احجز استشارة مجانية</span>
                      <div className="absolute inset-0 bg-gradient-to-l from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300 px-8 py-6 text-base font-semibold rounded-xl shadow-sm hover:shadow-md"
                  >
                    <Link href="/about/overview">اكتشف خدماتنا</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={300}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 mt-12">
                <div className="aspect-video bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0">
                    <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="hero-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1" fill="currentColor" className="text-emerald-600" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center justify-center gap-6 p-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                      <svg className="w-16 h-16 md:w-20 md:h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-10h2v5h-2zm0 6h2v2h-2z"/>
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">التحكيم والوساطة الاحترافية</h3>
                      <p className="text-slate-600 text-sm md:text-base">حلول عادلة وسريعة للنزاعات الطبية</p>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                إنجازاتنا في الأرقام
              </h2>
              <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-light">
                نتائج ملموسة في حل النزاعات الصحية
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {HC_STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={150 + index * 70}>
                <div className="group relative rounded-2xl bg-white border border-slate-200/60 p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <div className="mb-3 text-4xl md:text-5xl font-bold bg-gradient-to-l from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 inline-block">
                      <AnimatedCounter 
                        end={parseStatValue(stat.value)} 
                        suffix={getStatSuffix(stat.value)} 
                        duration={2000} 
                      />
                    </div>
                    <div className="mb-2 text-lg md:text-xl font-semibold text-slate-800">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-sm text-slate-500 font-light">
                        {stat.description}
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                خدمات التحكيم والوساطة
              </h2>
              <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto font-light">
                نغطي جميع أنواع النزاعات في القطاع الصحي بحلول مرنة وفعالة
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={service.title} direction="up" delay={150 + index * 60}>
                <div className="group relative rounded-2xl bg-white border border-slate-200/60 p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-500 inline-block">
                      {service.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={100}>
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-l from-emerald-600 to-teal-600 relative">
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  </svg>
                </div>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-8 p-10 md:p-16">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      لماذا التحكيم والوساطة؟
                    </h2>
                    <ul className="space-y-4 text-white/90">
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">⚡</span>
                        <span className="text-lg">سرعة في الحل - نصف المدة مقارنة بالمحاكم التقليدية</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">💰</span>
                        <span className="text-lg">توفير التكاليف - أقل بكثير من التقاضي</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🔐</span>
                        <span className="text-lg">سرية تامة - حماية السمعة والمعلومات الحساسة</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🤝</span>
                        <span className="text-lg">الحفاظ على العلاقات - حلول ودية مرضية للطرفين</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="relative w-full aspect-square max-w-sm">
                      <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <svg className="w-48 h-48 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection
        title="هل لديك نزاع في القطاع الصحي؟"
        description="دعنا نساعدك على إيجاد حل سريع وعادل عبر التحكيم أو الوساطة المتخصصة"
        primaryButton={{ text: "احجز استشارة", href: "/forms" }}
        secondaryButton={{ text: "جميع الخدمات", href: "/services" }}
        variant="gradient-light"
        className="relative"
      />

      <Footer />
    </main>
  )
}

function parseStatValue(value: string) {
  const cleaned = value.replace(/[$,kM+]/g, "")
  const numericMatch = cleaned.match(/\d+(\.\d+)?/)
  if (!numericMatch) return 0
  const num = Number.parseFloat(numericMatch[0])
  if (value.includes("k")) return num * 1000
  if (value.includes("M")) return num * 1000000
  return num
}

function getStatSuffix(value: string) {
  if (value.includes("+")) return "+"
  if (value.includes("%")) return "%"
  return ""
}