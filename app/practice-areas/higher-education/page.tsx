import { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"

// ✅ Dynamic Import للـCTA Section (تحسين الأداء)
const CTASection = dynamic(() => 
  import("@/components/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl" />
})

// ✅ الـMetadata المحسنة للـSEO
export const metadata: Metadata = {
  title: "التعليم العالي | أمانة المظالم والوساطة الأكاديمية - Tahkeem Tech",
  description:
    "منصة Tahkeem Tech الرقمية لمعالجة النزاعات الأكاديمية عبر أمانة المظالم والوساطة في الجامعات الجزائرية. ضمان العدالة الإدارية وحماية حقوق الطلبة والأساتذة مع تعزيز الحوكمة والشفافية.",
  keywords: [
    "التعليم العالي الجزائر",
    "أمانة المظالم الجامعية",
    "الوساطة الأكاديمية",
    "حل النزاعات الجامعية",
    "الحوكمة الجامعية",
    "حقوق الطلبة",
    "شكاوى جامعية",
    "Higher Education Algeria",
    "University Ombudsman",
    "Academic Mediation"
  ],
  openGraph: {
    title: "التعليم العالي في الجزائر | أمانة المظالم والوساطة الأكاديمية",
    description: "حلول رقمية احترافية لمعالجة الشكاوى والنزاعات في الجامعات بما يعزّز الحوكمة والشفافية وجودة الخدمات الأكاديمية.",
    type: "website",
    siteName: "Tahkeem Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "التعليم العالي | أمانة المظالم والوساطة الأكاديمية",
    description: "منصة رقمية متكاملة لحل النزاعات الأكاديمية وتعزيز الحوكمة الجامعية"
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ✅ تعريف الأنواع بشكل أفضل
type Stat = {
  value: string
  label: string
  description: string
  ariaLabel: string
}

type SpecializedUnit = {
  title: string
  titleAr: string
  description: string
  icon: string
}

// ✅ البيانات الثابتة منفصلة (Data Layer Separation)
const HE_STATS: Stat[] = [
  {
    value: "105+",
    label: "جامعة ومؤسسة",
    description: "عبر مختلف ولايات الوطن",
    ariaLabel: "أكثر من 105 جامعة ومؤسسة تعليمية عبر مختلف ولايات الجزائر"
  },
  {
    value: "1.7M+",
    label: "طالب وطالبة",
    description: "مسجّلون في البرامج الأكاديمية",
    ariaLabel: "أكثر من 1.7 مليون طالب وطالبة مسجلون في البرامج الأكاديمية"
  },
  {
    value: "22k+",
    label: "بحث علمي سنوياً",
    description: "منشورات ومؤتمرات وأطروحات",
    ariaLabel: "أكثر من 22 ألف بحث علمي سنوياً من منشورات ومؤتمرات وأطروحات"
  },
  {
    value: "600+",
    label: "شراكة صناعية",
    description: "لنقل التكنولوجيا والابتكار",
    ariaLabel: "أكثر من 600 شراكة صناعية لنقل التكنولوجيا والابتكار"
  },
]

const SPECIALIZED_UNITS: SpecializedUnit[] = [
  {
    title: "Sports Arbitration Unit",
    titleAr: "وحدة التحكيم الرياضي",
    description: "معالجة النزاعات الرياضية الجامعية وفق الأطر القانونية",
    icon: "⚽"
  },
  {
    title: "Ombudsman Office",
    titleAr: "مكتب أمين المظالم",
    description: "حماية الحقوق الأكاديمية ومعالجة الشكاوى بنزاهة",
    icon: "⚖️"
  },
  {
    title: "Mediation Unit",
    titleAr: "وحدة الوساطة",
    description: "الوساطة الأكاديمية والحلول الودية للنزاعات",
    icon: "🤝"
  },
]

export default function HigherEducation() {
  // ✅ JSON-LD Structured Data للـSEO المحسّن
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": "خدمة أمانة المظالم والوساطة الأكاديمية",
    "alternateName": "University Dispute Resolution Service",
    "description": "منصة رقمية لمعالجة النزاعات الأكاديمية في الجامعات الجزائرية",
    "provider": {
      "@type": "GovernmentOrganization",
      "name": "Tahkeem Tech",
      "areaServed": {
        "@type": "Country",
        "name": "Algeria"
      }
    },
    "serviceType": "Academic Dispute Resolution",
    "audience": {
      "@type": "Audience",
      "audienceType": ["Students", "Faculty", "Academic Staff", "University Administration"]
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "http://localhost:3000/practice-areas/higher-education"
    }
  }

  return (
    <>
      {/* ✅ Structured Data للـSEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main 
        dir="rtl" 
        className="min-h-screen overflow-x-hidden text-gray-800"
        lang="ar"
      >
        {/* ✅ Skip to main content للـAccessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-corporate-green focus:shadow-lg"
        >
          انتقل إلى المحتوى الرئيسي
        </a>

        {/* ✅ خلفية محسّنة مع تأثيرات أنعم */}
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          {/* التدرج الأساسي */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900" />
          
          {/* تأثيرات الإضاءة المحسّنة */}
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-teal-400/15 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-emerald-300/10 blur-[100px]" />
          
          {/* النقاط الخلفية */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
            <defs>
              <pattern id="dots-he" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-he)" />
          </svg>

          {/* Grid overlay للعمق */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <Header />

        {/* ✅ Hero Section محسّن */}
        <section 
          id="main-content"
          className="relative overflow-hidden py-20 md:py-28"
          aria-labelledby="hero-title"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center text-white">
              <ScrollReveal direction="up" delay={100}>
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm border border-emerald-400/30">
                    منصة رقمية متكاملة
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <h1 
                  id="hero-title"
                  className="mb-3 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-50 to-white drop-shadow-lg"
                >
                  التعليم العالي في الجزائر
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={240}>
                <p className="mb-6 text-2xl font-bold md:text-4xl text-emerald-100">
                  University Dispute Resolution Service
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed md:text-xl text-white/95 font-medium">
                  يُعدّ قطاع التعليم العالي والبحث العلمي ركيزة أساسية للتنمية في الجزائر، إذ يشكّل قلب بناء مجتمع المعرفة وتأهيل الكفاءات لمواجهة تحديات المستقبل. ورغم أهميته، يواجه القطاع تحديات إدارية وتنظيمية كبيرة، أبرزها معالجة الشكاوى وحماية حقوق الطلبة والأساتذة والإداريين.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={360}>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button 
                    asChild 
                    size="lg" 
                    className="group bg-white text-corporate-green hover:bg-emerald-50 shadow-2xl shadow-white/20 transition-all duration-300 hover:scale-105 hover:shadow-white/30 text-lg px-8"
                  >
                    <Link href="/forms">
                      تقديم شكوى/طلب وساطة
                      <span className="mr-2 inline-block transition-transform group-hover:translate-x-1">←</span>
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/60 shadow-lg transition-all duration-300 hover:scale-105 text-lg px-8"
                  >
                    <Link href="/about/overview">
                      عن الخدمة
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* ✅ خط فاصل ديناميكي */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </section>

        {/* ✅ Stats Section محسّن */}
        <section 
          className="relative py-16 md:py-20"
          aria-labelledby="stats-title"
        >
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={120}>
              <div className="text-center mb-12">
                <h2 
                  id="stats-title"
                  className="text-3xl md:text-4xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white"
                >
                  مؤشرات رئيسية
                </h2>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                  لقطة سريعة لأثر التعليم العالي والبحث العلمي في الجزائر
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {HE_STATS.map((stat, index) => (
                <ScrollReveal key={stat.label} direction="up" delay={200 + index * 60}>
                  <div 
                    className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 p-8 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 hover:bg-white/20"
                    role="article"
                    aria-label={stat.ariaLabel}
                  >
                    {/* تأثير الإضاءة عند الـHover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/0 to-teal-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
                    
                    <div className="relative">
                      <div className="mb-3 text-5xl font-extrabold text-white drop-shadow-lg">
                        <AnimatedCounter 
                          end={parseStatValue(stat.value)} 
                          suffix={getStatSuffix(stat.value)} 
                          duration={2200} 
                        />
                      </div>
                      <div className="mb-2 text-xl font-bold text-white/95">
                        {stat.label}
                      </div>
                      <div className="text-sm text-white/75 leading-relaxed">
                        {stat.description}
                      </div>
                    </div>

                    {/* خط سفلي ديناميكي */}
                    <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500 group-hover:w-3/4" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ About Section محسّن */}
        <section 
          className="relative py-16 md:py-20"
          aria-labelledby="about-title"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <ScrollReveal direction="up" delay={150}>
                <article className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 p-10 md:p-14 backdrop-blur-md shadow-2xl overflow-hidden">
                  {/* تأثيرات خلفية ديناميكية */}
                  <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
                  
                  <div className="relative">
                    <h2 
                      id="about-title"
                      className="text-3xl md:text-4xl font-extrabold text-white mb-6 text-center bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white"
                    >
                      أمانة المظالم والوساطة الأكاديمية
                    </h2>
                    
                    <div className="space-y-6 text-white/95 text-lg leading-relaxed md:text-xl">
                      <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-300 first-letter:mr-1 first-letter:float-right">
                        يُعدّ قطاع التعليم العالي والبحث العلمي من أهم ركائز التنمية في الجزائر، إذ يشكّل قلب بناء مجتمع المعرفة وتأهيل الكفاءات لمواجهة تحديات المستقبل. ورغم أهميته، يواجه القطاع تحديات إدارية وتنظيمية كبيرة، أبرزها معالجة الشكاوى وحماية حقوق الطلبة والأساتذة والإداريين.
                      </p>
                      
                      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-6" />
                      
                      <p>
                        في هذا السياق، تُقدّم منصة <strong className="text-emerald-300">Tahkeem Tech</strong> حلاً رقمياً مبتكرًا لمعالجة النزاعات عبر أمانة المظالم والوساطة الأكاديمية، بما يضمن العدالة الإدارية، ويعزّز الحوكمة الرشيدة، ويرتقي بجودة الخدمات الجامعية، متماشياً مع القوانين الوطنية وأخلاقيات الحياة الجامعية، ورؤية الجزائر 2030 نحو رقمنة المؤسسات وترسيخ الشفافية وتطوير منظومة التعليم العالي والبحث العلمي.
                      </p>
                    </div>
                    
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
                      <Button 
                        asChild 
                        size="lg" 
                        className="group bg-emerald-500 text-white hover:bg-emerald-600 shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 text-lg px-8"
                      >
                        <Link href="/forms">
                          ابدأ الإجراء الآن
                          <span className="mr-2 inline-block transition-transform group-hover:translate-x-1">←</span>
                        </Link>
                      </Button>
                      <Button 
                        asChild 
                        size="lg" 
                        variant="outline" 
                        className="border-2 border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/50 shadow-lg transition-all duration-300 text-lg px-8"
                      >
                        <Link href="/about/overview">
                          التفاصيل والإطار القانوني
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* ✅ Specialized Units محسّن */}
        <section 
          className="relative py-16 md:py-20"
          aria-labelledby="units-title"
        >
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={120}>
              <div className="text-center mb-12">
                <h2 
                  id="units-title"
                  className="text-3xl md:text-4xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white"
                >
                  الوحدات المتخصصة
                </h2>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                  خدمات متكاملة لمعالجة النزاعات بكافة أشكالها
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {SPECIALIZED_UNITS.map((unit, index) => (
                <ScrollReveal key={unit.title} direction="up" delay={200 + index * 80}>
                  <article 
                    className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 p-8 text-center backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white/40 hover:bg-white/20 overflow-hidden"
                    aria-label={`${unit.titleAr}: ${unit.description}`}
                  >
                    {/* تأثير الإضاءة */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-teal-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
                    
                    <div className="relative">
                      {/* الأيقونة */}
                      <div className="mb-4 text-6xl transition-transform duration-500 group-hover:scale-110">
                        {unit.icon}
                      </div>
                      
                      {/* العنوان بالإنجليزية */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-emerald-200">
                        {unit.title}
                      </h3>
                      
                      {/* العنوان بالعربية */}
                      <p className="text-lg font-semibold text-white/90 mb-3">
                        {unit.titleAr}
                      </p>
                      
                      {/* الوصف */}
                      <p className="text-sm text-white/75 leading-relaxed">
                        {unit.description}
                      </p>
                    </div>

                    {/* خط سفلي ديناميكي */}
                    <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500 group-hover:w-3/4" />
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ CTA Section */}
        <CTASection
          title="ارتقِ بالبحث العلمي والشراكات"
          description="نساعد الجامعات ومراكز البحث على صياغة اتفاقيات، حماية الملكية الفكرية، وتمويل المشاريع البحثية الاستراتيجية."
          primaryButton={{ text: "تواصل معنا", href: "/forms" }}
          secondaryButton={{ text: "استكشف الخدمات", href: "/services" }}
          variant="gradient-light"
          className="relative"
        />

        <Footer />
      </main>
    </>
  )
}

// ✅ Helper Functions محسّنة
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