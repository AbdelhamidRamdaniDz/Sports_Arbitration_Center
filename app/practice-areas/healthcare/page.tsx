import { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { 
  Heart, 
  Shield, 
  Users, 
  FileText, 
  Scale, 
  CheckCircle2,
  AlertCircle,
  Clock,
  Lock,
  TrendingUp,
  Award
} from "lucide-react"

// Dynamic Import للـCTA Section
const CTASection = dynamic(() => 
  import("@/components/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-96 animate-pulse bg-emerald-50 rounded-3xl" />
})

// Metadata محسنة للـSEO
export const metadata: Metadata = {
  title: "Health Care Mediators & Arbitrators | خدمات الوساطة والتحكيم في الصحة - TAHKEEM TECH",
  description:
    "خدمات الوساطة والتحكيم وتسوية النزاعات البديلة في قطاع الصحة من TAHKEEM TECH — أمانة المظالم الصحية، حلول ودية وسرّية وسريعة.",
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
    title: "Health Care Mediators & Arbitrators | TAHKEEM TECH",
    description: "خدمات الوساطة والتحكيم وتسوية النزاعات البديلة في قطاع الصحة من TAHKEEM TECH — أمانة المظالم الصحية.",
    type: "website",
    siteName: "TAHKEEM TECH",
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

export default function Healthcare() {
  // JSON-LD Structured Data
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

  const coreValues = [
    { icon: Scale, title: "الحياد", desc: "محايد تمامًا، مستقل عن الإدارة" },
    { icon: Lock, title: "السرية", desc: "عالية، غالبًا مشفرة" },
    { icon: Clock, title: "سرعة الحل", desc: "سريع نسبيًا، أسابيع إلى أشهر" },
    { icon: TrendingUp, title: "التأثير على السياسات", desc: "توصيات لتطوير النظام" },
    { icon: Award, title: "رضا المرضى", desc: "مرتفع، بسبب الحياد والسرية" }
  ]

  const disputeTypes = [
    {
      icon: AlertCircle,
      title: "انشغالات المرضى",
      desc: "السلوكيات غير اللائقة، سوء الفهم حول المسار العلاجي، عدم الرضا عن الخدمات"
    },
    {
      icon: Users,
      title: "الخلافات بين المريض والطاقم",
      desc: "التقييم الطبي، المتابعة العلاجية، طريقة المعاملة والتواصل"
    },
    {
      icon: FileText,
      title: "نزاعات الأطقم مع الإدارة",
      desc: "التعيينات، الترقيات، ظروف العمل، الإجراءات التأديبية"
    },
    {
      icon: Shield,
      title: "قضايا السلوك المهني",
      desc: "التحرش، التمييز، سوء المعاملة وفق أخلاقيات المهنة"
    }
  ]

  const objectives = [
    "تعزيز الثقة بين المواطنين ومؤسسات الصحة عبر آليات شفافة وفعّالة",
    "تحسين جودة الخدمات الصحية وتقليل النزاعات من خلال حلول سريعة وودّية",
    "حماية حقوق المرضى والممارسين الصحيين وضمان معاملة عادلة للطرفين",
    "تسهيل التواصل وتسوية الخلافات مبكرًا قبل تطورها إلى نزاعات قانونية",
    "تعزيز الحوكمة الرشيدة والشفافية بفضل نظام مستقل لمعالجة الشكاوى",
    "تقديم بيانات وتحليلات دقيقة لدعم الوزارة في اتخاذ قرارات استراتيجية"
  ]

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main 
        dir="rtl" 
        className="min-h-screen overflow-x-hidden text-gray-800"
        lang="ar"
      >
        {/* خلفية ديناميكية */}
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

        {/* Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-corporate-green focus:shadow-lg"
        >
          انتقل إلى المحتوى الرئيسي
        </a>

        <Header />

            {/* Hero Section */}
            <section 
            id="main-content" 
            className="relative overflow-hidden py-8 md:py-12 bg-center bg-cover" 
            style={{ backgroundImage: "url('/healthcare.jpg')" }}
            aria-labelledby="hero-title"
            >
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="mx-5 max-w-5xl text-right text-white ml-auto">
              <ScrollReveal direction="up" delay={100}>
            <div className="mb-6 flex justify-start">
              <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm border border-emerald-400/30">
              قطاع الرعاية الصحية | Healthcare Sector
              </span>
            </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
            <h1 id="hero-title" className="mb-3 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-50 to-white drop-shadow-lg">
              التحكيم والوساطة في القطاع الصحي
            </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={240}>
            <p className="mb-6 text-2xl font-bold md:text-4xl text-emerald-100">
              Healthcare Arbitration and Mediation
            </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
            <p className="mb-10 max-w-3xl text-lg leading-relaxed md:text-xl text-white/95 font-medium">
              نقدم حلول تحكيم ووساطة متخصصة للنزاعات الطبية والإدارية بسرعة وسرية وكفاءة، مع الحفاظ على العلاقات المهنية وتحقيق نتائج عادلة وفعالة.
            </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={360}>
            <div className="flex flex-col items-start justify-start gap-4 sm:flex-row sm:justify-start">
              <Button asChild size="lg" className="group bg-white text-corporate-green hover:bg-emerald-50 shadow-2xl shadow-white/20 transition-all duration-300 hover:scale-105 hover:shadow-white/30 text-lg px-8">
              <Link href="/forms">
                احجز استشارة مجانية
                <span className="ml-2 inline-block transition-transform group-hover:-translate-x-1">→</span>
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

        {/* What is Health Ombudsman */}
        <section className="relative py-16 md:py-24" aria-labelledby="ombudsman-title">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 backdrop-blur-sm mb-6">
                    <Heart className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 id="ombudsman-title" className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
                    ما هو أمين المظالم الصحي؟
                  </h2>
                  <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                    Health Care Mediators & Arbitrators
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <ScrollReveal direction="right" delay={100}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src="/ombudsman-consultation.jpg" 
                      alt="استشارة طبية - أمين المظالم الصحي"
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent" />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={200}>
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
                    <p className="text-lg text-white/90 leading-relaxed mb-6">
                      أمين المظالم الصحي هو خدمة محايدة، آمنة، وسرّية متاحة للمرضى، والأطقم الطبية، والموظفين لمناقشة أي انشغالات أو مشكلات متعلقة بالمنظومة الصحية.
                    </p>
                    <p className="text-lg text-white/90 leading-relaxed">
                      يقوم أمين المظالم بالاستماع دون إصدار أحكام، ويقدّم إرشادات حول السياسات والإجراءات الصحية، ويساعدكم على فهم الخيارات المتاحة، كما يربطكم بالجهات المختصة، ويعمل معكم على وضع خطة بنّاءة لمعالجة مشاكلكم أو إدارة أي نزاع تواجهونه داخل المؤسسة الصحية.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent to-emerald-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-white">
                  الأهداف
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <ScrollReveal direction="right">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full">
                    <img 
                      src="/healthcare-team.jfif" 
                      alt="فريق الرعاية الصحية - أهداف التحكيم الطبي"
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">رؤيتنا</h3>
                      <p className="text-white/90">تعزيز الثقة والشفافية في النظام الصحي</p>
                    </div>
                  </div>
                </ScrollReveal>

                <div className="grid gap-4">
                  {objectives.map((objective, index) => (
                    <ScrollReveal key={index} direction="left" delay={index * 50}>
                      <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                        <p className="text-white/90 text-lg">{objective}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dispute Types */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">
                أنواع النزاعات التي نعالجها
              </h2>
              <p className="text-center text-emerald-100 text-lg mb-12 max-w-2xl mx-auto">
                نقدم حلولًا شاملة لمختلف أنواع النزاعات في القطاع الصحي
              </p>
            </ScrollReveal>

            {/* صورة رئيسية */}
            <ScrollReveal direction="up" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 max-w-5xl mx-auto">
                <img 
                  src="/medical-dispute.jfif" 
                  alt="حل النزاعات الطبية - التحكيم والوساطة"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
                  <h3 className="text-3xl font-bold text-white mb-3">حلول متخصصة لكل نوع من النزاعات</h3>
                  <p className="text-xl text-emerald-100">نساعدك في الوصول إلى حل عادل وسريع</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
              {disputeTypes.map((dispute, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100}>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <dispute.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{dispute.title}</h3>
                        <p className="text-white/80">{dispute.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" delay={400}>
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">نزاعات إضافية نغطيها:</h3>
                  <ul className="grid md:grid-cols-2 gap-3 text-white/90">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>نزاعات الملكية الفكرية للمؤسسات الناشئة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>نزاعات التمويل والمعدات الطبية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>نزاعات التسيير والإدارة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>نزاعات مع الجهات الدافعة (CNAS, CASNOS)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-emerald-900/20 to-transparent">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">
                قيمنا الأساسية
              </h2>
              <p className="text-center text-emerald-100 text-lg mb-12">
                المبادئ التي نلتزم بها في كل خطوة
              </p>
            </ScrollReveal>

            {/* صورة مع overlay */}
            <ScrollReveal direction="up" delay={50}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 max-w-5xl mx-auto">
                <img 
                  src="/trust-handshake.jpg" 
                  alt="الثقة والشفافية - قيمنا في التحكيم الصحي"
                  className="w-full h-[350px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-900/70 to-teal-900/90" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">نعمل بمهنية وحياد تام</h3>
                    <p className="text-xl text-emerald-100">لضمان العدالة والسرية في كل قضية</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {coreValues.map((value, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 80}>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center group">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <value.icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-white/80 text-sm">{value.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">
                مراحل معالجة الشكاوى
              </h2>
              <p className="text-center text-emerald-100 text-lg mb-12">
                عملية واضحة ومنظمة لضمان حل فعال
              </p>
            </ScrollReveal>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
              <ScrollReveal direction="right">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/process-steps.jpg" 
                    alt="مراحل معالجة الشكاوى الطبية"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-emerald-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">خطوات واضحة</h3>
                    </div>
                    <p className="text-white/90">نضمن الشفافية في كل مرحلة من مراحل المعالجة</p>
                  </div>
                </div>
              </ScrollReveal>

              <div className="space-y-6">
                {[
                  "استلام الشكوى عبر المنصة الإلكترونية أو لقاء مباشر",
                  "جمع المعلومات والوثائق الضرورية من الأطراف المعنية",
                  "تحليل الملف وإجراء الوساطة إن لزم الأمر",
                  "إصدار التوصيات أو إحالة القضية للجهات المختصة",
                  "إبلاغ صاحب الشكوى بالنتائج والمتابعة"
                ].map((step, index) => (
                  <ScrollReveal key={index} direction="left" delay={index * 80}>
                    <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-white/90 text-lg">{step}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Vision */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent to-emerald-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img 
                        src="/success-vision.jpg" 
                        alt="نجاح التحكيم الصحي - رؤيتنا المستقبلية"
                        className="w-full h-[450px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent" />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-md rounded-3xl p-10 md:p-12 border border-white/20 shadow-2xl">
                      <div className="w-20 h-20 mb-6 rounded-2xl bg-emerald-500/30 flex items-center justify-center">
                        <TrendingUp className="w-10 h-10 text-emerald-300" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                        مدى النجاح والرؤية
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        تجارب دولية أظهرت أن وجود أنظمة أمين المظالم الصحية يقلل النزاعات القانونية ويحسّن جودة الرعاية ويزيد رضا المرضى.
                      </p>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                        <p className="text-xl font-bold text-emerald-200">
                          رؤيتنا أن نصبح شركة رائدة عالمية في إدارة شكاوى الصحة وتعزيز السلامة والجودة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA */}
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