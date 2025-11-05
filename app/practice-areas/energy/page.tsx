import { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import energyStats from "@/data/energy-stats.json"

export const metadata: Metadata = {
  title: "قطاع الطاقة | تحكيم ووساطة في النفط والغاز والطاقة المتجددة",
  description:
    "حلول قانونية متخصصة لقطاع الطاقة تشمل النفط والغاز (Upstream/Downstream) والطاقة المتجددة، صياغة وتفاوض عقود FIDIC وPPAs، والامتثال (ESG)، وتسوية النزاعات عبر الحدود.",
  openGraph: {
    title: "قطاع الطاقة | تحكيم ووساطة",
    description: "حلول مؤسسية لقطاع الطاقة: عقود FIDIC وPPAs، امتثال ESG، وتسوية النزاعات.",
  },
}

// Types matching energy-stats.json
type EnergyStatView = {
  id: string
  title: string
  value: number
  unit: string
  icon: string
}

const CTASection = dynamic(() =>
  import("@/components/cta-section").then(mod => ({ default: mod.CTASection })),
  { loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl" /> }
)

export default function Energy() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "خدمات التحكيم والوساطة لقطاع الطاقة",
    description: "حلول قانونية في النفط والغاز والطاقة المتجددة",
    areaServed: { "@type": "Country", name: "Algeria" },
    serviceType: ["Energy Arbitration", "Energy Mediation"],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main dir="rtl" className="min-h-screen overflow-x-hidden text-gray-800" lang="ar">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-corporate-green focus:shadow-lg"
        >
          انتقل إلى المحتوى الرئيسي
        </a>

        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900" />
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-teal-400/15 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-emerald-300/10 blur-[100px]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
            <defs>
              <pattern id="dots-energy" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-energy)" />
          </svg>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <Header />

        {/* Hero */}
        <section id="main-content" className="relative overflow-hidden py-20 md:py-28" aria-labelledby="hero-title">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center text-white">
              <ScrollReveal direction="up" delay={100}>
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm border border-emerald-400/30">
                    قطاع استراتيجي | Energy Sector
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <h1 id="hero-title" className="mb-3 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-50 to-white drop-shadow-lg">
                  التحكيم والوساطة في قطاع الطاقة
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={240}>
                <p className="mb-6 text-2xl font-bold md:text-4xl text-emerald-100">
                  Energy Arbitration and Mediation Services
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed md:text-xl text-white/95 font-medium">
                  حلول قانونية متخصصة للنفط والغاز والطاقة المتجددة، تشمل صياغة وتفاوض عقود FIDIC وPPAs، أطر الامتثال والحوكمة (ESG)، وإدارة وتسوية النزاعات عبر الهيئات المحلية والدولية.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={360}>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" className="group bg-white text-corporate-green hover:bg-emerald-50 shadow-2xl shadow-white/20 transition-all duration-300 hover:scale-105 hover:shadow-white/30 text-lg px-8">
                    <Link href="/forms">
                      ابدأ استشارة أو طلب إجراء
                      <span className="mr-2 inline-block transition-transform group-hover:translate-x-1">←</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/60 shadow-lg transition-all duration-300 hover:scale-105 text-lg px-8">
                    <Link href="/about/overview">عن الخدمات</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </section>

        {/* Stats (from energy-stats.json) */}
        <section className="relative py-16 md:py-20" aria-labelledby="stats-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={120}>
              <div className="text-center mb-12">
                <h2 id="stats-title" className="text-3xl md:text-4xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white">
                  مؤشرات رئيسية للقطاع
                </h2>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">نظرة رقمية سريعة على قطاع الطاقة</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(energyStats as unknown as EnergyStatView[]).map((stat, index) => (
                <ScrollReveal key={stat.id} direction="up" delay={200 + index * 60}>
                  <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 p-8 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 hover:bg-white/20" role="article" aria-label={`${stat.title}: ${stat.value} ${stat.unit}`}>
                    <div className="relative">
                      <div className="mb-3 text-5xl font-extrabold text-white drop-shadow-lg">
                        <AnimatedCounter end={stat.value} duration={2200} />
                        <span className="ml-2 text-2xl align-middle">{stat.unit}</span>
                      </div>
                      <div className="mb-2 text-xl font-bold text-white/95">{stat.title}</div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500 group-hover:w-3/4" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        {/* من نحن */}
        <section className="relative py-20 md:py-28" aria-labelledby="about-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center mb-16">
                <h2 id="about-title" className="text-3xl md:text-5xl font-extrabold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white">
                  من نحن
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <ScrollReveal direction="right" delay={200}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" 
                    alt="فريق التحكيم والوساطة في قطاع الطاقة"
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white font-bold text-xl">حلول قانونية مؤسسية متكاملة</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={300}>
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                    <p className="text-white/95 text-lg leading-relaxed">
                      جهة تحكيم ووساطة تقدم <span className="font-bold text-emerald-200">حلولاً قانونية مؤسسية لقطاع الطاقة</span>، مع تركيز على تسوية النزاعات التجارية عبر الحدود وصياغة الأطر التعاقدية والتنظيمية وفق أفضل الممارسات.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                    <p className="text-white/95 text-lg leading-relaxed">
                      يشمل نطاق عملنا <span className="font-bold text-emerald-200">upstream/downstream</span> في النفط والغاز، الطاقة المتجددة، عقود الإنشاءات والبنى التحتية وفق نماذج <span className="font-bold text-emerald-200">FIDIC</span>، واتفاقيات شراء الطاقة <span className="font-bold text-emerald-200">PPAs</span>، إضافةً إلى تدقيق المخاطر القانونية (Due Diligence) وبناء أطر الامتثال والحوكمة (ESG وCompliance Framework).
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                    <p className="text-white/95 text-lg leading-relaxed">
                      نُعِد وثائق المناقصات والهياكل التعاقدية، ونوفر دعمًا مهنيًا في إدارة المشاريع والتفاوض وتسوية النزاعات (بما فيها إجراءات <span className="font-bold text-emerald-200">التحكيم الاستثماري ICSID</span> عند الاقتضاء)، مع التزام باللغة المؤسسية والدقة القانونية.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* خدمات قانونية لقطاع الطاقة */}
        <section className="relative py-20 md:py-28 bg-white/5 backdrop-blur-sm" aria-labelledby="services-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center mb-16">
                <h2 id="services-title" className="text-3xl md:text-5xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white">
                  خدمات قانونية لقطاع الطاقة
                </h2>
                <p className="text-white/90 text-lg max-w-3xl mx-auto">
                  صياغة وتفاوض ومراجعة عقود الطاقة (FIDIC, PPAs)، أطر الامتثال والحوكمة (ESG, Compliance)، ودعم تسوية النزاعات عبر الحدود
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* الطاقة المتجددة */}
              <ScrollReveal direction="up" delay={150}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80" 
                      alt="الطاقة المتجددة - الطاقة الشمسية"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30">
                      <span className="text-3xl">☀️</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">الطاقة المتجددة</h3>
                    <p className="text-white/90 leading-relaxed">
                      دعم مشاريع الشمس والرياح والهيدروجين الأخضر عبر إعداد ومراجعة اتفاقيات شراء الطاقة PPAs، هياكل IPP، متطلبات الترخيص والربط بالشبكة، إدارة المخاطر وتوزيعها تعاقدياً، والامتثال التنظيمي والبيئي (ESG/HSE).
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* النفط والغاز */}
              <ScrollReveal direction="up" delay={200}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&q=80" 
                      alt="النفط والغاز - منصة استخراج"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30">
                      <span className="text-3xl">🛢️</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">النفط والغاز</h3>
                    <p className="text-white/90 leading-relaxed">
                      استشارات Upstream/Downstream تشمل عقود الاستكشاف والإنتاج PSCs، اتفاقيات التشغيل المشترك JOAs، النقل والمعالجة وLNG، تسعير الغاز والتصدير، أطر الامتثال عبر الحدود، وتسوية النزاعات التجارية ذات الصلة عبر التحكيم والوساطة.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* البنية التحتية */}
              <ScrollReveal direction="up" delay={250}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80" 
                      alt="البنية التحتية - مشاريع الإنشاءات"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30">
                      <span className="text-3xl">🏗️</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">البنية التحتية</h3>
                    <p className="text-white/90 leading-relaxed">
                      صياغة ومراجعة عقود الإنشاءات والبنى التحتية لقطاع الطاقة وفق نماذج FIDIC (EPC/EPCM)، عقود التشغيل والصيانة O&M، الضمانات والكفالات، آليات المطالبات والتغييرات، وإدارة المخاطر التعاقدية في المشاريع المعقدة.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* التمويل والاستثمار */}
              <ScrollReveal direction="up" delay={300}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80" 
                      alt="التمويل والاستثمار"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30">
                      <span className="text-3xl">📊</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">التمويل والاستثمار</h3>
                    <p className="text-white/90 leading-relaxed">
                      هيكلة تمويل المشروعات Project Finance، التفاوض مع الممولين، حزمة الضمانات والتأمينات، اتفاقيات الاستلام والتوريد Offtake/Supply، شراكات وPPP، وتحليل الجدوى البنكية Bankability مع مراعاة متطلبات الامتثال والحوكمة.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* الامتثال والتنظيم */}
              <ScrollReveal direction="up" delay={350}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" 
                      alt="الامتثال والتنظيم"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30">
                      <span className="text-3xl">🛡️</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">الامتثال والتنظيم</h3>
                    <p className="text-white/90 leading-relaxed">
                      تصميم أطر الامتثال والحوكمة (Compliance Framework وESG)، سياسات HSE والبيئة، التراخيص والرقابة التنظيمية، مكافحة الرشوة والفساد، تدقيق Due Diligence، ومطابقة المتطلبات عبر الولايات القضائية Cross-border Compliance.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* الاستدامة */}
              <ScrollReveal direction="up" delay={400}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&q=80" 
                      alt="الاستدامة البيئية"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30">
                      <span className="text-3xl">🌱</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">الاستدامة</h3>
                    <p className="text-white/90 leading-relaxed">
                      استراتيجيات ESG، تقارير الإفصاح والاستدامة، إدارة مخاطر المناخ وانتقال الطاقة، إشراك أصحاب المصلحة، ومواءمة السياسات مع المعايير الدولية بما يدعم متطلبات المستثمرين والجهات التنظيمية.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* نهجنا المهني */}
        <section className="relative py-20 md:py-28" aria-labelledby="approach-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center mb-16">
                <h2 id="approach-title" className="text-3xl md:text-5xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white">
                  نهجنا المهني
                </h2>
                <p className="text-white/90 text-lg max-w-3xl mx-auto">
                  تكامل قانوني-تقني يركز على عقود FIDIC وPPAs، الامتثال والحوكمة (ESG)، وإدارة المخاطر وتسوية النزاعات عبر الحدود
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <ScrollReveal direction="up" delay={200}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                  <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl p-10 transition-all duration-500 hover:scale-105">
                    <div className="w-16 h-16 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-emerald-300/30 mx-auto">
                      <span className="text-4xl">⚖️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">حوكمة وامتثال</h3>
                    <p className="text-white/90 leading-relaxed text-center">
                      تصميم أطر امتثال وسياسات ESG وإجراءات Compliance Framework بما يدعم إدارة المخاطر والشفافية.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={260}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                  <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl p-10 transition-all duration-500 hover:scale-105">
                    <div className="w-16 h-16 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-emerald-300/30 mx-auto">
                      <span className="text-4xl">📋</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">هندسة تعاقدية</h3>
                    <p className="text-white/90 leading-relaxed text-center">
                      نماذج FIDIC لعقود الإنشاءات والبنية التحتية واتفاقيات شراء الطاقة PPAs وصيغ المشاركة والتشغيل.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={320}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                  <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl p-10 transition-all duration-500 hover:scale-105">
                    <div className="w-16 h-16 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-emerald-300/30 mx-auto">
                      <span className="text-4xl">🤝</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">تسوية نزاعات</h3>
                    <p className="text-white/90 leading-relaxed text-center">
                      وساطة وتحكيم في النزاعات التجارية عبر الحدود، مع الإحالة إلى الآليات المناسبة (بما فيها ICSID عند الاقتضاء).
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          title="هل أنت مستعد للانتقال إلى مستقبل الطاقة المستدامة؟"
          description="تواصل معنا اليوم لمناقشة احتياجاتك واكتشاف كيف يمكننا مساعدتك في تحقيق أهدافك في مجال الطاقة."
          primaryButton={{ text: "تواصل معنا الآن", href: "/forms" }}
          secondaryButton={{ text: "استكشف الخدمات", href: "/services" }}
          variant="gradient-light"
          className="relative"
        />

        <Footer />
      </main>
    </>
  )
}
