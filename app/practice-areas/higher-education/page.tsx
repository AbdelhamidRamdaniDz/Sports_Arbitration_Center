import { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Scale, Shield, Users, FileText, TrendingUp, CheckCircle, BookOpen, Award, MessageSquare, Clock, Lock, Eye } from 'lucide-react'

// Dynamic Import للـCTA Section
const CTASection = dynamic(() => 
  import("@/components/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl" />
})

// الـMetadata المحسنة للـSEO
export const metadata: Metadata = {
  title: "أمانة المظالم الجامعية | University Ombudsman Service - Tahkeem Tech",
  description:
    "أمانة المظالم الجامعية - خدمة محايدة وآمنة وسرّية من Tahkeem Tech لمعالجة النزاعات الجامعية والشكاوى في الجامعات الجزائرية بعدالة وشفافية.",
  keywords: [
    "أمانة المظالم الجامعية",
    "University Ombudsman",
    "النزاعات الجامعية",
    "شكاوى طلاب",
    "الوساطة الأكاديمية",
    "حماية حقوق الطلبة",
    "تسوية الخلافات الجامعية",
    "Academic Mediation",
    "University Dispute Resolution"
  ],
  openGraph: {
    title: "أمانة المظالم الجامعية | University Ombudsman Service",
    description: "خدمة محايدة وسرّية لمعالجة الشكاوى والنزاعات الجامعية وتعزيز العدالة والشفافية في الجامعات الجزائرية.",
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

export default function HigherEducation() {
  // JSON-LD Structured Data
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
    }
  }

  const features = [
    {
      icon: Shield,
      title: "الحياد والاستقلالية",
      description: "نضمن معالجة عادلة ومستقلة لجميع القضايا دون تحيز"
    },
    {
      icon: Lock,
      title: "السرية التامة",
      description: "جميع المعلومات محمية بسرية تامة وفق أعلى معايير الأمان"
    },
    {
      icon: Clock,
      title: "استجابة سريعة",
      description: "معالجة الشكاوى بكفاءة عالية وفي أقصر وقت ممكن"
    },
    {
      icon: Eye,
      title: "الشفافية",
      description: "إجراءات واضحة وشفافة في كل مرحلة من مراحل المعالجة"
    }
  ]

  const disputeTypes = [
    {
      icon: Users,
      title: "النزاعات الطلابية",
      items: ["السلوك الجامعي", "الإقصاء الأكاديمي", "المشاريع البيداغوجية", "سوء التفاهم"]
    },
    {
      icon: BookOpen,
      title: "خلافات الأستاذ والطالب",
      items: ["التقييم الأكاديمي", "الإشراف على البحوث", "المعاملة الأكاديمية", "الحضور والغياب"]
    },
    {
      icon: Award,
      title: "نزاعات الأساتذة والإدارة",
      items: ["الترقية الأكاديمية", "التعيين والنقل", "الانضباط الإداري", "الحقوق والواجبات"]
    },
    {
      icon: MessageSquare,
      title: "قضايا السلوك الجامعي",
      items: ["التحرش", "التمييز", "سوء المعاملة", "انتهاك الأخلاقيات"]
    }
  ]

  const steps = [
    {
      number: "01",
      title: "تقديم الشكوى",
      description: "قدّم شكواك عبر المنصة الإلكترونية أو زيارة شخصية",
      color: "from-emerald-500 to-teal-500"
    },
    {
      number: "02",
      title: "جمع المعلومات",
      description: "نجمع جميع الوثائق والمعلومات اللازمة من الأطراف",
      color: "from-teal-500 to-cyan-500"
    },
    {
      number: "03",
      title: "التحليل والوساطة",
      description: "تحليل شامل للملف وإجراء جلسات وساطة ودية",
      color: "from-cyan-500 to-blue-500"
    },
    {
      number: "04",
      title: "الحل والمتابعة",
      description: "إصدار التوصيات والمتابعة حتى حل النزاع نهائياً",
      color: "from-blue-500 to-emerald-500"
    }
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
        className="min-h-screen overflow-x-hidden"
        lang="ar"
      >
        {/* Skip to main content */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-corporate-green focus:shadow-lg"
        >
          انتقل إلى المحتوى الرئيسي
        </a>

        {/* خلفية محسّنة */}
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900" />
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-teal-400/15 blur-[140px] animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-emerald-300/10 blur-[100px]" />
          
          <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
            <defs>
              <pattern id="dots-he" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-he)" />
          </svg>

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <Header />

        {/* Hero Section with Background Image */}
        <section 
          id="main-content"
          className="relative overflow-hidden py-20 md:py-28"
          aria-labelledby="hero-title"
        >
            {/* Hero Background Image */}
            <div className="absolute inset-0 -z-10">
            <Image
              src="/univ.jpg"
              alt="University Campus"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-emerald-800/50 to-teal-900/60" />
            </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-5xl text-center text-white">
              <ScrollReveal direction="up" delay={100}>
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-6 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm border border-emerald-400/30">
                    <BookOpen className="w-4 h-4" />
                    منصة رقمية متكاملة
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <h1 
                  id="hero-title"
                  className="mb-3 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-50 to-white drop-shadow-lg"
                >
                  أمانة المظالم الجامعية
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={240}>
                <p className="mb-6 text-2xl font-bold md:text-4xl text-emerald-100">
                  University Ombudsman Service
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed md:text-xl text-white/95 font-medium">
                  خدمة محايدة وآمنة وسرّية لجميع الطلاب والأساتذة والموظفين
                  <br className="mb-3" />
                  Your path to fair, confidential, and effective resolution
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
                      تقديم شكوى الآن
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
                      اعرف المزيد
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </section>

        {/* Features Section - صورة في اليمين */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* النص - في اليسار */}
                <div className="order-2 lg:order-1">
                  <ScrollReveal direction="up" delay={100}>
                    <div className="mb-12">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        لماذا تختار خدماتنا؟
                      </h2>
                      <p className="text-xl text-white/80">
                        نلتزم بأعلى معايير الجودة والاحترافية
                      </p>
                    </div>
                  </ScrollReveal>

                  <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, idx) => (
                      <ScrollReveal key={idx} direction="up" delay={150 + idx * 50}>
                        <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-white/70 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>

                {/* الصورة - في اليمين */}
                <div className="order-1 lg:order-2">
                  <ScrollReveal direction="right" delay={100}>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                      <Image
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
                        alt="Justice and Fairness"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dispute Types Section - صورة في اليسار */}
        <section className="py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* الصورة - في اليسار */}
                <div className="order-1">
                  <ScrollReveal direction="left" delay={100}>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                      <Image
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2087"
                        alt="Academic Mediation"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
                    </div>
                  </ScrollReveal>
                </div>

                {/* النص - في اليمين */}
                <div className="order-2">
                  <ScrollReveal direction="up" delay={100}>
                    <div className="mb-12">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        أنواع النزاعات التي نعالجها
                      </h2>
                      <p className="text-xl text-white/80">
                        تغطية شاملة لجميع القضايا الجامعية
                      </p>
                    </div>
                  </ScrollReveal>

                  <div className="grid md:grid-cols-2 gap-6">
                    {disputeTypes.map((type, idx) => (
                      <ScrollReveal key={idx} direction="up" delay={150 + idx * 75}>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                              <type.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white">
                              {type.title}
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {type.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps - صورة في اليمين */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* النص - في اليسار */}
                <div className="order-2 lg:order-1">
                  <ScrollReveal direction="up" delay={100}>
                    <div className="mb-12">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        مراحل معالجة الشكوى
                      </h2>
                      <p className="text-xl text-white/80">
                        عملية واضحة وشفافة من البداية إلى النهاية
                      </p>
                    </div>
                  </ScrollReveal>

                  <div className="space-y-6">
                    {steps.map((step, idx) => (
                      <ScrollReveal key={idx} direction="up" delay={150 + idx * 75}>
                        <div className="relative group">
                          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-start gap-6">
                              <div className={`text-5xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent flex-shrink-0`}>
                                {step.number}
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                  {step.title}
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>

                {/* الصورة - في اليمين */}
                <div className="order-1 lg:order-2">
                  <ScrollReveal direction="right" delay={100}>
                    <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                      <Image
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
                        alt="Resolution Process"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="هل لديك شكوى أو نزاع جامعي؟"
          description="تواصل معنا الآن للاستفادة من خدمة أمانة المظالم الجامعية. نحن هنا لمساعدتك بسرية وعدالة وفعالية."
          primaryButton={{ text: "تقديم شكوى", href: "/forms" }}
          secondaryButton={{ text: "اتصل بنا", href: "/contact" }}
          variant="gradient-light"
          className="relative"
        />

        <Footer />
      </main>
    </>
  )
}