import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "تسوية نزاعات الملكية الفكرية | تحكيم ووساطة CTSA",
  description:
    "منصة تحكيم ووساطة متخصصة في تسوية نزاعات الملكية الفكرية: العلامات التجارية، البراءات، حقوق المؤلف، والترخيص محلياً ودولياً.",
  keywords: "نزاعات ملكية فكرية, تحكيم علامات تجارية, وساطة براءات اختراع, نزاعات حقوق مؤلف, تحكيم IP, الجزائر",
  openGraph: {
    title: "تسوية نزاعات الملكية الفكرية | CTSA",
    description: "تحكيم ووساطة احترافية لحل نزاعات الملكية الفكرية بسرعة وسرية وفعالية.",
  },
}

type Stat = {
  value: string
  label: string
  description?: string
}

const IP_STATS: Stat[] = [
  { value: "85", label: "نزاع محلول", description: "عبر التحكيم والوساطة" },
  { value: "45", label: "يوماً متوسط", description: "لإصدار قرار تحكيمي" },
  { value: "98", label: "نسبة التنفيذ", description: "قرارات ملزمة ونافذة" },
  { value: "12", label: "دولة", description: "تغطية قضايا عابرة للحدود" },
]

export default function IntellectualProperty() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-gray-800">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-corporate-green via-emerald-800 to-emerald-900" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-10 text-white" aria-hidden>
          <defs>
            <pattern id="dots-ip" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-ip)" />
        </svg>
      </div>

      <Header />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <ScrollReveal direction="up" delay={150}>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">تسوية نزاعات الملكية الفكرية</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={220}>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl text-white/90">
                منصة تحكيم ووساطة متخصصة في حل النزاعات المتعلقة بالعلامات التجارية، البراءات، حقوق المؤلف، والترخيص — بسرعة وسرية واحترافية، محلياً ودولياً.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-corporate-green hover:bg-white/90">
                  <Link href="/forms">ابدأ تسوية نزاعك</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-corporate-green hover:bg-white hover:text-corporate-green">
                  <Link href="/about/overview">تعرّف على المزيد</Link>
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">مؤشرات الأداء</h2>
              <p className="text-white/90 max-w-2xl mx-auto">أرقام تعكس كفاءة منصة CTSA في تسوية نزاعات الملكية الفكرية.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {IP_STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={220 + index * 80}>
                <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                  <div className="mb-2 text-4xl font-extrabold text-white drop-shadow-sm">
                    <AnimatedCounter end={parseStatValue(stat.value)} suffix={getStatSuffix(stat.value)} duration={2000} />
                  </div>
                  <div className="mb-1 text-lg font-semibold text-white">{stat.label}</div>
                  {stat.description && <div className="text-sm text-white/80">{stat.description}</div>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={150}>
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">تسوية نزاعات الملكية الفكرية عبر التحكيم والوساطة</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  في بيئة تجارية تعتمد على الابتكار والعلامات التجارية، تُعد نزاعات الملكية الفكرية من أكثر القضايا حساسية وتعقيداً. سواء كانت تتعلق بتقليد علامة تجارية، انتهاك براءة اختراع، قرصنة محتوى رقمي، أو نزاع على اتفاقية ترخيص — فإن الحل السريع والسري والفعّال يُصبح ضرورة استراتيجية.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">CTSA</strong> منصة تحكيم ووساطة إلكترونية متخصصة في إدارة وتسوية نزاعات الملكية الفكرية بجميع أنواعها، محلياً ودولياً، دون تقديم خدمات التسجيل أو الإيداع أو الاستشارات القانونية التقليدية.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="mb-16">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">أنواع النزاعات التي نغطيها</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-900 mb-3">نزاعات العلامات التجارية</h4>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>التقليد والتشابه المضلل</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>نزاعات النطاقات الإلكترونية (Domain Disputes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>التعدي التجاري والاستخدام غير المصرح</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>نزاعات الامتياز التجاري (Franchising)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-900 mb-3">نزاعات البراءات والابتكار</h4>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>انتهاك براءات الاختراع</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>نزاعات الملكية المشتركة للابتكار</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>نقل التكنولوجيا والمعرفة الفنية (Know-How)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>النزاعات التجارية حول الابتكارات</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-900 mb-3">نزاعات حقوق المؤلف والمحتوى الرقمي</h4>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>القرصنة الرقمية والنسخ غير المشروع</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>نزاعات البرمجيات والتطبيقات</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>حقوق النشر والتوزيع الرقمي</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>المحتوى الإبداعي والفني</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-900 mb-3">نزاعات الترخيص والعقود التجارية</h4>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>خرق اتفاقيات الترخيص (Licensing)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>نزاعات الإتاوات والمقابل المالي</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>عقود نقل التكنولوجيا والمعرفة</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>النزاعات التجارية المتعلقة بالأصول الفكرية</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <div className="mb-16 bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl p-8 md:p-10 border border-slate-200">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">لماذا التحكيم في نزاعات الملكية الفكرية؟</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  نزاعات الملكية الفكرية تتطلب حلولاً متخصصة تجمع بين السرعة، السرية، والخبرة التقنية. التحكيم والوساطة يوفران بديلاً احترافياً للتقاضي التقليدي، مع مزايا استراتيجية واضحة:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">السرعة والكفاءة</h4>
                      <p className="text-sm text-slate-600">إصدار قرارات ملزمة في أسابيع بدلاً من سنوات</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">السرية التامة</h4>
                      <p className="text-sm text-slate-600">حماية الأسرار التجارية والمعلومات الحساسة</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">الخبرة التقنية</h4>
                      <p className="text-sm text-slate-600">محكمون متخصصون في الملكية الفكرية والتكنولوجيا</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">التنفيذ الدولي</h4>
                      <p className="text-sm text-slate-600">قرارات قابلة للتنفيذ في أكثر من 160 دولة</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="mb-16">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">القيمة المضافة لمنصة CTSA</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">سرعة الإجراءات</h4>
                      <p className="text-slate-700">متوسط 45 يوماً لإصدار قرار تحكيمي نهائي، مقارنة بسنوات في المحاكم التقليدية.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">السرية والحماية</h4>
                      <p className="text-slate-700">جميع الإجراءات سرية بالكامل، مع حماية الأسرار التجارية والمعلومات الحساسة للأطراف.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">الحياد والنزاهة</h4>
                      <p className="text-slate-700">محكمون مستقلون ومحايدون، متخصصون في الملكية الفكرية والتكنولوجيا، بدون تضارب مصالح.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">التنفيذ الدولي</h4>
                      <p className="text-slate-700">قرارات قابلة للتنفيذ في أكثر من 160 دولة وفقاً لاتفاقية نيويورك للتحكيم الدولي.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">المرونة الرقمية</h4>
                      <p className="text-slate-700">منصة إلكترونية متكاملة تتيح إدارة القضايا عن بُعد، مع جلسات افتراضية وتوثيق رقمي آمن.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350}>
              <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl p-8 md:p-10 text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">هل لديك نزاع في الملكية الفكرية؟</h3>
                <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                  سواء كنت شركة، مؤسسة، نادٍ رياضي، مبتكر، أو حامل حقوق — نحن هنا لمساعدتك في تسوية نزاعك بسرعة واحترافية.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    <Link href="/forms">ابدأ طلب التحكيم</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link href="/contact">تواصل معنا</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function parseStatValue(value: string) {
  const cleaned = value.replace(/[$,kM+]/g, "")
  const numericMatch = cleaned.match(/\d+/)
  if (!numericMatch) return 0
  const num = Number.parseInt(numericMatch[0])
  if (value.includes("k")) return num * 1000
  if (value.includes("M")) return num * 1000000
  return num
}

function getStatSuffix(value: string) {
  if (value.includes("+")) return "+"
  if (value.includes("%")) return "%"
  return ""
}