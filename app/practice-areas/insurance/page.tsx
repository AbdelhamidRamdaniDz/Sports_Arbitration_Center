import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "التحكيم والوساطة في نزاعات التأمين وإعادة التأمين | CTSA",
  description:
    "مركز تحكيم ووساطة مؤسسي متخصص في نزاعات التأمين وإعادة التأمين، مع خدمات استشارية وتمثيل قانوني أمام مراكز التحكيم والمحاكم.",
  keywords: "تحكيم تأمين, وساطة إعادة تأمين, نزاعات مطالبات, تحكيم مؤسسي, الجزائر",
  openGraph: {
    title: "التحكيم المتخصص في نزاعات التأمين | CTSA",
    description: "حلول تحكيم ووساطة احترافية لنزاعات التأمين وإعادة التأمين بحياد وكفاءة تقنية.",
  },
}

type Stat = {
  value: string
  label: string
  description?: string
}

const INS_STATS: Stat[] = [
  { value: "", label: "ملفات نزاع إعادة تأمين", description: "محلية وعابرة للحدود" },
  { value: "", label: "تسويات تمّت بالوساطة", description: "مطالبات معقدة" },
  { value: "", label: "عقود تحكيم مُدارَة", description: "صياغة وإشراف" },
  { value: "", label: "نزاعات عبر الحدود", description: "تحكيم دولي" },
]

export default function Insurance() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-gray-800">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-corporate-green via-emerald-800 to-emerald-900" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-10 text-white" aria-hidden>
          <defs>
            <pattern id="dots-ins" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-ins)" />
        </svg>
      </div>

      <Header />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <ScrollReveal direction="up" delay={150}>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">التحكيم والوساطة في نزاعات التأمين وإعادة التأمين</h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={220}>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl text-white/90">
                مركز تحكيم ووساطة مؤسسي محايد يقدم خدمات تحكيمية واستشارية متخصصة في نزاعات التأمين وإعادة التأمين، ضمن نطاق أوسع من القطاعات التجارية والاستثمارية.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-corporate-green hover:bg-white/90">
                  <Link href="/forms">ابدأ تقييماً أولياً</Link>
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">مجالات التخصص</h2>
              <p className="text-white/90 max-w-2xl mx-auto">نطاق الخدمات المؤسسية والاستشارية في نزاعات التأمين وإعادة التأمين.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INS_STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={220 + index * 80}>
                <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                  <div className="mb-3 text-lg font-bold text-white">{stat.label}</div>
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
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">التحكيم والوساطة في نزاعات التأمين وإعادة التأمين</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  تتسم نزاعات التأمين وإعادة التأمين بتعقيدات تقنية واكتوارية تتطلب آليات تسوية متخصصة تجمع بين الحياد المؤسسي والفهم العميق لطبيعة المخاطر والتغطيات والمطالبات. سواء تعلق الأمر بنزاعات الاسترداد في إعادة التأمين، أو تفسير شروط الوثائق، أو تقييم المطالبات المعقدة — فإن التحكيم والوساطة توفر بديلاً فعالاً للتقاضي التقليدي.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  يقدم المركز خدمات تحكيم ووساطة مؤسسية محايدة في نزاعات التأمين وإعادة التأمين، إلى جانب خدمات استشارية وتمثيل قانوني أمام مراكز التحكيم والمحاكم، مع التزام صارم بالسرية والحياد والإجراءات المنهجية وقابلية التنفيذ الدولية.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  يعمل المركز أيضاً في قطاعات متخصصة أخرى تشمل النزاعات التجارية، الطاقة، العقارات، الملكية الفكرية، الرياضة، والشركات الناشئة، مما يوفر بيئة تحكيمية شاملة ومتعددة التخصصات.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="mb-16">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">الخدمات المقدمة</h3>
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">التحكيم المؤسسي في نزاعات التأمين وإعادة التأمين</h4>
                    <p className="text-slate-700 leading-relaxed">
                      إدارة إجراءات تحكيمية كاملة في النزاعات المتعلقة بعقود التأمين وإعادة التأمين، بما في ذلك نزاعات الاسترداد، تفسير الشروط، تقييم المطالبات، والنزاعات التجارية بين المؤمنين ومعيدي التأمين. يتم تطبيق قواعد إجرائية صارمة تضمن الحياد والشفافية وقابلية التنفيذ.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">الوساطة في المطالبات واستردادات إعادة التأمين المعقدة</h4>
                    <p className="text-slate-700 leading-relaxed">
                      تسهيل التسوية الودية للنزاعات المتعلقة بالمطالبات المعقدة، استردادات إعادة التأمين، والخلافات التعاقدية، من خلال وسطاء متخصصين يجمعون بين الخبرة القانونية والفهم الاكتواري لطبيعة المخاطر والتغطيات.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">صياغة شروط التحكيم وبروتوكولات تسوية النزاعات</h4>
                    <p className="text-slate-700 leading-relaxed">
                      إعداد شروط تحكيم متخصصة لعقود التأمين وإعادة التأمين، وتصميم بروتوكولات إجرائية لتسوية النزاعات المحتملة، بما يضمن الوضوح القانوني والكفاءة الإجرائية والامتثال للمعايير الدولية.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">إدارة الملفات والتوثيق الإجرائي</h4>
                    <p className="text-slate-700 leading-relaxed">
                      تقديم خدمات إدارة ملفات النزاعات، التوثيق الإجرائي، وتنسيق المراسلات والجلسات، مع ضمان الامتثال للمواعيد والإجراءات المتفق عليها، والحفاظ على السرية الكاملة للمعلومات.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">التمثيل القانوني أمام مراكز التحكيم والمحاكم</h4>
                    <p className="text-slate-700 leading-relaxed">
                      تمثيل الأطراف في نزاعات التأمين وإعادة التأمين أمام مراكز التحكيم المحلية والدولية والمحاكم المختصة، مع إعداد المذكرات القانونية، تقديم الأدلة، والمرافعة الشفوية، بما يعكس فهماً تقنياً عميقاً لطبيعة النزاع.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <div className="mb-16 bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl p-8 md:p-10 border border-slate-200">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">المزايا التخصصية في نزاعات التأمين وإعادة التأمين</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">الخبرة القطاعية في التأمين وإعادة التأمين</h4>
                      <p className="text-slate-700">
                        يوفر المركز خبرة متخصصة في نزاعات التأمين وإعادة التأمين، مع فهم عميق للمصطلحات التقنية، الممارسات القطاعية، والتعقيدات الاكتوارية، ضمن إطار مؤسسي يغطي قطاعات تجارية واستثمارية متعددة.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">الفهم التقني والاكتواري للنزاعات</h4>
                      <p className="text-slate-700">
                        يجمع فريق المحكمين والمستشارين بين الخبرة القانونية والفهم التقني لطبيعة المخاطر، التغطيات، المطالبات، والاستردادات، مما يتيح تقييماً دقيقاً للنزاعات المعقدة.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">الامتثال للمعايير الدولية</h4>
                      <p className="text-slate-700">
                        تطبيق قواعد إجرائية متوافقة مع المعايير الدولية للتحكيم التجاري، مع ضمان قابلية تنفيذ القرارات في الولايات القضائية المختلفة.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">الحياد المؤسسي والسرية الكاملة</h4>
                      <p className="text-slate-700">
                        حوكمة محايدة تضمن استقلالية المحكمين والوسطاء، مع التزام صارم بالسرية التامة لجميع المعلومات والمستندات المتعلقة بالنزاع.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl p-8 md:p-10 text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">ابدأ تقييماً أولياً سرياً</h3>
                <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                  للحصول على تقييم أولي سري لنزاعك في التأمين أو إعادة التأمين، أو لمناقشة خيارات التحكيم والوساطة المتاحة، تواصل مع فريقنا المتخصص.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    <Link href="/forms">طلب تقييم أولي</Link>
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