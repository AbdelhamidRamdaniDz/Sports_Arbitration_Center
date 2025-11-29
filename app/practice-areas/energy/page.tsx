import { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

export const metadata: Metadata = {
  title: "قطاع الطاقة | تحكيم ووساطة في النفط والغاز والطاقة المتجددة",
  description:
    "خدمات التحكيم، الوساطة، وتسوية المنازعات البديلة (ADR Hybrid & ODR) في قطاع الطاقة والمرافق الأساسية، مقدمة من TSAC.",
  openGraph: {
    title: "الطاقة والمرافق | تحكيم ووساطة",
    description: "خدمات التحكيم، الوساطة، وتسوية المنازعات البديلة (ADR Hybrid & ODR) في قطاع الطاقة والمرافق الأساسية.",
  },
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
        <section
          id="main-content"
          className="relative overflow-hidden py-10 md:py-14 bg-center bg-cover"
          style={{ backgroundImage: "url('/eng.jpg')" }}
          aria-labelledby="hero-title"
        >
          <div className="absolute inset-0 bg-black/50" aria-hidden />
          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-5xl text-center text-white">
              <ScrollReveal direction="up" delay={100}>
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm border border-emerald-400/30">
                    الطاقة والمرافق | Energy & Utilities
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <h1 id="hero-title" className="mb-3 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-50 to-white drop-shadow-lg">
                   الطاقة والمرافق
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={240}>
                <p className="mb-6 text-2xl font-bold md:text-4xl text-emerald-100">
                  Energy & Utilities ADR Services
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed md:text-xl text-white/95 font-medium">
                  خدمات التحكيم، الوساطة، وتسوية المنازعات البديلة (ADR Hybrid & ODR) في قطاع الطاقة والمرافق الأساسية، مقدمة من TSAC.
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


        {/* CTA */}
        {/* من نحن */}
        <section className="relative py-20 md:py-28" aria-labelledby="about-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center mb-16">
                <h2 id="about-title" className="text-3xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white">
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
                      يشكل قطاع الطاقة في الجزائر ركيزة أساسية للتنمية الاقتصادية، بفضل موارده الطبيعية الهائلة في مجالات النفط والغاز والطاقات المتجددة. وتماشيًا مع رؤية الجزائر لعام 2030، تسعى الدولة إلى تطوير هذا القطاع عبر تنويع مصادر الطاقة، وتشجيع الابتكار التكنولوجي، وتنمية الكفاءات الوطنية.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                    <p className="text-white/95 text-lg leading-relaxed">
                      وفي هذا الإطار، يقدم <span className="font-bold text-emerald-200">مركز TAHKEEM – TECH</span> آلية فعالة لتسوية النزاعات التي قد تنشأ في القطاع الطاقوي، سواء بين المؤسسات الوطنية أو بين المستثمرين المحليين والأجانب.
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
                <h2 id="services-title" className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white">
                  مجالات الممارسة في الطاقة والمرافق
                </h2>
                <p className="text-white/90 text-lg max-w-3xl mx-auto">
                  يقدّم المركز خدمات التحكيم والوساطة والتسوية البديلة للنزاعات (ADR Hybrid & ODR) في مختلف المجالات المرتبطة بقطاع الطاقة
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* 1. توزيع ونقل */}
              <ScrollReveal direction="up" delay={150}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30 mb-6">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">النقل والتوزيع</h3>
                    <p className="text-white/90 leading-relaxed">
                      توزيع، ونقل، وتنظيم النفط، والغاز الطبيعي، والكهرباء.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* 2. إنشاء وتشغيل */}
              <ScrollReveal direction="up" delay={200}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30 mb-6">
                      <span className="text-3xl">🏗️</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">الإنشاء والتشغيل</h3>
                    <p className="text-white/90 leading-relaxed">
                      إنشاء وتشغيل خطوط الأنابيب والمنشآت الطاقوية، بما في ذلك مشاريع الطاقة المتجددة (الشمسية، والرياح، والمائية).
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* 3. إنهاء العقود */}
              <ScrollReveal direction="up" delay={250}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30 mb-6">
                      <span className="text-3xl">📄</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">العقود والامتيازات</h3>
                    <p className="text-white/90 leading-relaxed">
                      إنهاء عقود الإيجار واتفاقيات الامتياز.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* 4. حقوق الامتياز */}
              <ScrollReveal direction="up" delay={300}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30 mb-6">
                      <span className="text-3xl">�</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">التراخيص</h3>
                    <p className="text-white/90 leading-relaxed">
                      حقوق الامتياز والترخيص.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* 5. عقود المنتجات */}
              <ScrollReveal direction="up" delay={350}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30 mb-6">
                      <span className="text-3xl">🤝</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">الخدمات والمنتجات</h3>
                    <p className="text-white/90 leading-relaxed">
                      عقود المنتجات والخدمات.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* 6. ملكية الموارد */}
              <ScrollReveal direction="up" delay={400}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30 mb-6">
                      <span className="text-3xl">🛢️</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">الموارد الطبيعية</h3>
                    <p className="text-white/90 leading-relaxed">
                      ملكية موارد النفط والغاز.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* 7. استكشاف وإنتاج */}
              <ScrollReveal direction="up" delay={450}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30 mb-6">
                      <span className="text-3xl">⚙️</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">الاستكشاف والإنتاج</h3>
                    <p className="text-white/90 leading-relaxed">
                      عمليات الاستكشاف والإنتاج واتفاقيات شراء الطاقة.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* 8. قضايا أخرى */}
              <ScrollReveal direction="up" delay={500}>
                <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 overflow-hidden h-full">
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-300/30 mb-6">
                      <span className="text-3xl">⚖️</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">قضايا تجارية</h3>
                    <p className="text-white/90 leading-relaxed">
                      وغيرها من القضايا التجارية والتعاقدية المرتبطة بقطاع الطاقة.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* رؤيتنا الاستراتيجية */}
        <section className="relative py-20 md:py-28" aria-labelledby="vision-title">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center mb-16">
                <h2 id="vision-title" className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white via-emerald-100 to-white">
                  رؤيتنا الاستراتيجية
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <div className="max-w-4xl mx-auto">
              <ScrollReveal direction="up" delay={200}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                  <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md shadow-xl p-10 transition-all duration-500 hover:scale-105">
                    <p className="text-white/95 text-lg md:text-xl leading-relaxed text-center font-medium">
                      من خلال هذه الخدمات، يسعى المركز إلى ترسيخ ثقافة التحكيم والوساطة كخيار استراتيجي يسهم في تعزيز النجاعة الاقتصادية، وجذب الاستثمارات، ودعم التحول الطاقوي والرقمي الذي تطمح إليه الجزائر في أفق 2030. كما يسعى TSAC من خلال تقديم حلول قانونية حديثة وبيئة رقمية آمنة، إلى دعم المؤسسات الوطنية الكبرى، مثل سوناطراك وسونلغاز، في تبني آليات جزائرية مبتكرة لتسوية النزاعات، بما يعزز الثقة، ويقلّل التكاليف، ويكرّس السيادة القانونية في إطار التحول الرقمي الذي تطمح إليه الجزائر.
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
