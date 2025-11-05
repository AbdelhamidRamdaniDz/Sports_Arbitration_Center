import { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"

// ✅ Dynamic Import للـCTA Section
const CTASection = dynamic(() => 
  import("@/components/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-96 animate-pulse bg-emerald-50 rounded-3xl" />
})

// ✅ الـMetadata المحسنة للـSEO
export const metadata: Metadata = {
  title: "التحكيم والوساطة في الرعاية الصحية | حلول سريعة وفعالة - Tahkeem Tech",
  description:
    "خدمات تحكيم ووساطة متخصصة للنزاعات الطبية والإدارية في القطاع الصحي الجزائري. حلول بديلة سريعة وسرية وفعالة من حيث التكلفة. نحل 92% من النزاعات في 30 يوماً فقط.",
  keywords: [
    "تحكيم طبي الجزائر",
    "وساطة صحية",
    "نزاعات طبية",
    "حلول بديلة للنزاعات الصحية",
    "التحكيم الطبي",
    "أمين مظالم الصحة",
    "شكاوى طبية",
    "نزاعات التأمين الصحي",
    "Medical Arbitration Algeria",
    "Healthcare Mediation",
    "Health Ombudsman",
    "Medical Disputes Resolution"
  ],
  openGraph: {
    title: "التحكيم والوساطة في القطاع الصحي | حلول عادلة وسريعة",
    description: "نساعدك على حل النزاعات الطبية والإدارية بسرعة وسرية عبر التحكيم والوساطة المتخصصة. 92% نسبة التسوية الناجحة.",
    type: "website",
    siteName: "Tahkeem Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "التحكيم والوساطة في الرعاية الصحية",
    description: "حلول سريعة وعادلة للنزاعات الطبية والإدارية في القطاع الصحي"
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ✅ تعريف الأنواع بشكل محسن
type Stat = {
  value: string
  label: string
  description: string
  ariaLabel: string
}

type Service = {
  icon: string
  title: string
  description: string
  highlights?: string[]
}

type HealthUnit = {
  icon: string
  title: string
  titleAr: string
  description: string
}

// ✅ البيانات الثابتة منفصلة (Better Data Organization)
const HC_STATS: Stat[] = [
  { 
    value: "45+", 
    label: "نزاع محلول", 
    description: "في القطاع الصحي",
    ariaLabel: "أكثر من 45 نزاع تم حله بنجاح في القطاع الصحي"
  },
  { 
    value: "92%", 
    label: "نسبة التسوية", 
    description: "عبر الوساطة",
    ariaLabel: "92 بالمائة نسبة النجاح في التسوية عبر الوساطة"
  },
  { 
    value: "30", 
    label: "يوم متوسط", 
    description: "لحل النزاعات",
    ariaLabel: "30 يوماً متوسط المدة لحل النزاعات"
  },
  { 
    value: "15+", 
    label: "مؤسسة صحية", 
    description: "عميل دائم",
    ariaLabel: "أكثر من 15 مؤسسة صحية كعملاء دائمين"
  },
]

const SERVICES: Service[] = [
  {
    icon: "⚖️",
    title: "التحكيم الطبي",
    description: "حل النزاعات بين المؤسسات الصحية والأطراف الأخرى عبر إجراءات تحكيمية محترفة وملزمة قانونياً",
    highlights: ["قرارات ملزمة", "خبراء طبيين", "إجراءات سريعة"]
  },
  {
    icon: "🤝",
    title: "الوساطة الصحية",
    description: "تسوية ودية للخلافات بين المرضى ومقدمي الخدمات الصحية بسرية تامة وبأقل التكاليف",
    highlights: ["سرية تامة", "حلول ودية", "توفير التكاليف"]
  },
  {
    icon: "📋",
    title: "النزاعات التعاقدية",
    description: "حل نزاعات عقود التوريد، الخدمات، والتشغيل بين المستشفيات والموردين والمقاولين",
    highlights: ["عقود التوريد", "عقود الخدمات", "عقود التشغيل"]
  },
  {
    icon: "🏥",
    title: "النزاعات الإدارية",
    description: "معالجة الخلافات الإدارية داخل المؤسسات الصحية وبين الأطباء والإدارة",
    highlights: ["نزاعات العمل", "خلافات إدارية", "حقوق الموظفين"]
  },
  {
    icon: "💼",
    title: "نزاعات التأمين الصحي",
    description: "فض النزاعات بين المؤسسات الصحية وشركات التأمين حول المطالبات والتغطية",
    highlights: ["مطالبات التأمين", "نزاعات التغطية", "تعويضات"]
  },
  {
    icon: "🔒",
    title: "حماية البيانات الصحية",
    description: "حل النزاعات المتعلقة بخرق البيانات الطبية والخصوصية والامتثال للأنظمة",
    highlights: ["خصوصية البيانات", "الامتثال", "الأمن السيبراني"]
  }
]

const HEALTH_UNITS: HealthUnit[] = [
  {
    icon: "🤝",
    title: "Health Mediation",
    titleAr: "الوساطة الصحية",
    description: "تسوية ودية للنزاعات بين المرضى ومقدمي الخدمات الصحية بسرية وفعالية، مع الحفاظ على العلاقات المهنية." 
  },
  {
    icon: "📨",
    title: "Health Grievances Secretariat",
    titleAr: "أمانة شكاوى الصحة",
    description: "استقبال وفرز ومعالجة الشكاوى الصحية وفق إجراءات منظمة، مع ضمان الإحالة والمتابعة والاستجابة في المواعيد المحددة." 
  },
  {
    icon: "⚖️",
    title: "Health Ombudsman",
    titleAr: "أمين مظالم الصحة",
    description: "جهة محايدة مستقلة لحماية حقوق المرضى والعاملين، وتحقيق العدالة الإدارية في القطاع الصحي بعيداً عن التعقيدات القانونية." 
  }
]

const WHY_ADR_BENEFITS = [
  {
    icon: "⚡",
    title: "سرعة في الحل",
    description: "نصف المدة مقارنة بالمحاكم التقليدية"
  },
  {
    icon: "💰",
    title: "توفير التكاليف",
    description: "أقل بكثير من التقاضي التقليدي"
  },
  {
    icon: "🔐",
    title: "سرية تامة",
    description: "حماية السمعة والمعلومات الحساسة"
  },
  {
    icon: "🤝",
    title: "الحفاظ على العلاقات",
    description: "حلول ودية مرضية للطرفين"
  }
]

export default function Healthcare() {
  // ✅ JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "خدمات التحكيم والوساطة في الرعاية الصحية",
    "alternateName": "Healthcare Arbitration and Mediation Services",
    "description": "خدمات تحكيم ووساطة متخصصة للنزاعات الطبية والإدارية في القطاع الصحي",
    "provider": {
      "@type": "Organization",
      "name": "Tahkeem Tech",
      "areaServed": {
        "@type": "Country",
        "name": "Algeria"
      }
    },
    "serviceType": [
      "Medical Arbitration",
      "Healthcare Mediation",
      "Health Ombudsman Services"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": [
        "Healthcare Providers",
        "Patients",
        "Medical Staff",
        "Healthcare Administrators",
        "Insurance Companies"
      ]
    },
    "areaServed": "DZ"
  }

  return (
    <>
      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main 
        dir="rtl" 
        className="min-h-screen overflow-x-hidden text-gray-800"
        lang="ar"
      >
        {/* ✅ خلفية داكنة مماثلة لقطاع الطاقة */}
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900" />
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-teal-400/15 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-emerald-300/10 blur-[100px]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
            <defs>
              <pattern id="dots-health" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-health)" />
          </svg>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* ✅ Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-corporate-green focus:shadow-lg"
        >
          انتقل إلى المحتوى الرئيسي
        </a>

        <Header />

        {/* ✅ Hero */}
        <section id="main-content" className="relative overflow-hidden py-20 md:py-28" aria-labelledby="hero-title">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center text-white">
              <ScrollReveal direction="up" delay={100}>
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm border border-emerald-400/30">
                    قطاع الرعاية الصحية | Healthcare Sector
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <h1 id="hero-title" className="mb-3 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-50 to-white drop-shadow-lg">
                  التحكيم والوساطة في القطاع الصحي
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={240}>
                <p className="mb-6 text-2xl font-bold md:text-4xl text-emerald-100">
                  Healthcare Arbitration and Mediation
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed md:text-xl text-white/95 font-medium">
                  نقدم حلول تحكيم ووساطة متخصصة للنزاعات الطبية والإدارية بسرعة وسرية وكفاءة، مع الحفاظ على العلاقات المهنية وتحقيق نتائج عادلة وفعالة.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={360}>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" className="group bg-white text-corporate-green hover:bg-emerald-50 shadow-2xl shadow-white/20 transition-all duration-300 hover:scale-105 hover:shadow-white/30 text-lg px-8">
                    <Link href="/forms">
                      احجز استشارة مجانية
                      <span className="mr-2 inline-block transition-transform group-hover:translate-x-1">←</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/60 shadow-lg transition-all duration-300 hover:scale-105 text-lg px-8">
                    <Link href="/about/overview">اكتشف خدماتنا</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </section>

        {/* ✅ Stats */}
        <section className="relative py-16 md:py-20" aria-labelledby="stats-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={120}>
              <div className="text-center mb-12">
                <h2 id="stats-title" className="text-3xl md:text-4xl font-extrabold text-transparent mb-4 bg-clip-text bg-gradient-to-l from-white via-emerald-100 to-white">
                  إنجازاتنا في الأرقام
                </h2>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">نتائج ملموسة في حل النزاعات الصحية</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {HC_STATS.map((stat, index) => (
                <ScrollReveal key={stat.label} direction="up" delay={200 + index * 60}>
                  <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 p-8 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 hover:bg-white/20 overflow-hidden" role="article" aria-label={stat.ariaLabel}>
                    <div className="relative">
                      <div className="mb-3 text-5xl font-extrabold text-white drop-shadow-lg">
                        <AnimatedCounter end={parseStatValue(stat.value)} suffix={getStatSuffix(stat.value)} duration={2200} />
                      </div>
                      <div className="mb-2 text-xl font-bold text-white/95">{stat.label}</div>
                      <div className="text-white/80">{stat.description}</div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500 group-hover:w-3/4" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ خدمات الرعاية الصحية */}
        <section className="relative py-20 md:py-28 bg-white/5 backdrop-blur-sm" aria-labelledby="services-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center mb-16">
                <h2 id="services-title" className="text-3xl md:text-5xl font-extrabold text-transparent mb-4 bg-clip-text bg-gradient-to-l from-white via-emerald-100 to-white">
                  خدمات التحكيم والوساطة الصحية
                </h2>
                <p className="text-white/90 text-lg max-w-3xl mx-auto">
                  نغطي أنواع النزاعات في القطاع الصحي بحلول مرنة وفعالة ومهنية
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {SERVICES.map((service, index) => (
                <ScrollReveal key={service.title} direction="up" delay={150 + index * 50}>
                  <article className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full flex flex-col">
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="text-5xl mb-5" aria-hidden="true">{service.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-white/90 leading-relaxed font-normal mb-4 flex-1">{service.description}</p>
                      {service.highlights && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {service.highlights.map((highlight, idx) => (
                            <span key={idx} className="text-xs px-3 py-1 bg-emerald-50/10 text-emerald-100 rounded-full border border-emerald-200/20 font-medium">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ الوحدات الصحية */}
        <section className="relative py-20 md:py-28" aria-labelledby="units-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center mb-16">
                <h2 id="units-title" className="text-3xl md:text-5xl font-extrabold text-transparent mb-4 bg-clip-text bg-gradient-to-l from-white via-emerald-100 to-white">
                  الوحدات الصحية المتخصصة
                </h2>
                <p className="text-white/90 text-lg max-w-3xl mx-auto">
                  منظومة متكاملة لمعالجة الشكاوى والنزاعات الصحية عبر الوساطة وأمانة الشكاوى وأمين المظالم
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {HEALTH_UNITS.map((unit, index) => (
                <ScrollReveal key={unit.title} direction="up" delay={150 + index * 60}>
                  <article className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                    <div className="relative z-10 flex flex-col items-center text-center p-8">
                      <div className="text-5xl mb-4" aria-hidden="true">{unit.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-1">{unit.title}</h3>
                      <p className="text-emerald-100 font-semibold mb-4 text-lg">{unit.titleAr}</p>
                      <p className="text-white/90 leading-relaxed font-normal">{unit.description}</p>
                    </div>
                    <Link href={unit.title === "Health Mediation" ? "/services/legal-mediation" : unit.title === "Health Grievances Secretariat" ? "/services/ombudsman" : "/services/ombudsman"} className="absolute inset-0" aria-label={unit.title} />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ لماذا التحكيم والوساطة؟ (تعمل مع الخلفية الداكنة أصلاً) */}
        <section className="relative py-16 md:py-24" aria-labelledby="why-adr-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up" delay={80}>
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-l from-emerald-600 to-teal-600 relative">
                  <div className="absolute inset-0 opacity-10" aria-hidden="true">
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
                      <h2 id="why-adr-title" className="text-3xl md:text-4xl font-bold text-white mb-6">
                        لماذا التحكيم والوساطة؟
                      </h2>
                      <ul className="space-y-5 text-white" role="list">
                        {WHY_ADR_BENEFITS.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <span className="text-3xl flex-shrink-0" aria-hidden="true">{benefit.icon}</span>
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{benefit.title}</h3>
                              <p className="text-white/90 text-base">{benefit.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="relative w-full aspect-square max-w-sm">
                        <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
                          <svg className="w-48 h-48 text-white/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 1L3 5v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-10h2v5h-2zm0 6h2v2h-2z"/>
                          </svg>
                        </div>
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ✅ CTA */}
        <CTASection
          title="هل لديك نزاع في القطاع الصحي؟"
          description="دعنا نساعدك على إيجاد حل سريع وعادل عبر التحكيم أو الوساطة المتخصصة. استشارة أولية مجانية."
          primaryButton={{ text: "احجز استشارة مجانية", href: "/forms" }}
          secondaryButton={{ text: "جميع الخدمات", href: "/services" }}
          variant="gradient-light"
          className="relative"
        />

        <Footer />
      </main>
    </>
  )
}

// ✅ Helper Functions محسنة
function parseStatValue(value: string): number {
  const cleaned = value.replace(/[+%]/g, "")
  const numericMatch = cleaned.match(/[\d.]+/)
  if (!numericMatch) return 0
  
  const num = parseFloat(numericMatch[0])
  if (value.includes("k") || value.includes("K")) return num * 1000
  if (value.includes("M") || value.includes("m")) return num * 1000000
  return num
}

function getStatSuffix(value: string): string {
  if (value.includes("+")) return "+"
  if (value.includes("%")) return "%"
  return ""
}