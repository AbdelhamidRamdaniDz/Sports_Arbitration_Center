"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { GraduationCap, Users, Clock, Shield, Award, LayoutGrid, Handshake, ChevronRight } from "lucide-react"
import type { JSX } from "react"

export default function TrainingClient() {
  const features: Array<{ title: string; desc: string; icon: JSX.Element }> = [
    { title: "اعتماد معترف به", desc: "شهادات مقبولة محليًا ودوليًا", icon: <Award className="h-6 w-6" /> },
    { title: "خبرة مدربين", desc: "نخبة مرخصة في القانون الرياضي", icon: <Users className="h-6 w-6" /> },
    { title: "تطبيق عملي", desc: "ورش وقضايا واقعية وتمارين", icon: <Shield className="h-6 w-6" /> },
    { title: "مرونة المواعيد", desc: "مسائي وعطلات نهاية الأسبوع", icon: <Clock className="h-6 w-6" /> },
  ]

  const beneficiaries = [
    { title: "المحامون والمستشارون", icon: <Handshake className="h-7 w-7" /> },
    { title: "المحكمون والوسطاء الجدد", icon: <Award className="h-7 w-7" /> },
    { title: "موظفو الاتحادات", icon: <LayoutGrid className="h-7 w-7" /> },
    { title: "إداريّو الأندية", icon: <Users className="h-7 w-7" /> },
    { title: "الطلاب والباحثون", icon: <GraduationCap className="h-7 w-7" /> },
    { title: "المهتمون بالقانون الرياضي", icon: <Shield className="h-7 w-7" /> },
  ]

  const timeline = [
    { step: 1, title: "التسجيل", desc: "اختر البرنامج وسجّل بياناتك" },
    { step: 2, title: "التعلّم", desc: "محاضرات تفاعلية ومواد رقمية" },
    { step: 3, title: "الممارسة", desc: "تطبيق عملي ودراسات حالة" },
    { step: 4, title: "الاعتماد", desc: "اختبار وشهادة معتمدة" },
  ]

  const stats = [
    { value: "1,200+", label: "خريج" },
    { value: "96%", label: "نسبة نجاح" },
    { value: "8+", label: "جهات اعتماد" },
  ]

  const containerVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.08 } } }
  const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/sports-arbitration-training-workshop.jpg" alt="قاعة تدريب احترافية" className="h-[64vh] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-corporate-green/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-bl from-corporate-green/20 to-transparent blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="relative z-10 flex min-h-[56vh] items-end">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="mb-10 w-full">
              <div className="mx-auto max-w-3xl rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-corporate-green/10 px-3 py-1 text-corporate-green">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-xs font-medium">برامج تدريبية معتمدة</span>
                </div>
                <h1 className="mb-3 text-3xl font-extrabold leading-tight md:text-5xl">التدريب والتأهيل: اعتماد، خبرة، وتطبيق عملي</h1>
                <p className="mb-6 text-base text-muted-foreground md:text-lg">طوّر مسارك في القانون الرياضي مع برامج مرنة تجمع بين التعلم التفاعلي والتطبيق الواقعي.</p>
                <div className="flex flex-wrap items-center gap-3">
                  <motion.a whileHover={{ scale: 1.04, boxShadow: "0 0 0 4px rgba(16,185,129,0.25)" }} whileTap={{ scale: 0.98 }} href="/forms" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-corporate-green to-teal-500 px-5 py-3 text-white">
                    ابدأ الآن
                    <ChevronRight className="mr-2 h-5 w-5 -scale-x-100 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="/forms" className="inline-flex items-center justify-center rounded-lg border px-5 py-3">
                    اطلب استشارة
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-light-grey py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl grid-cols-3 items-center gap-4 text-center">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <div className="text-2xl font-extrabold text-corporate-green">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mx-auto max-w-5xl text-center">
            <motion.h2 variants={itemVariants} className="mb-2 text-2xl font-bold text-corporate-green md:text-3xl">جهات الاعتماد</motion.h2>
            <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-2xl text-muted-foreground">نفتخر بشراكات مع جهات دولية تمنح شهاداتنا وزنًا مهنيًا.</motion.p>
            <div className="grid grid-cols-2 items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-4">
              {[
                "/partners/platform-x.jpg",
                "/partners/ycg-yemencg-com-company.jpeg",
                "/saudi-football-federation-partnership.jpg",
                "/partners/اتصالات-الجزائر.jpg",
              ].map((src, i) => (
                <motion.div key={i} variants={itemVariants} className="flex items-center justify-center">
                  <img src={src} alt="اعتماد" className="h-12 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div variants={itemVariants}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-green text-white">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">برامج تدريبية بمستوى مؤسسي</h2>
                  <Badge className="mt-2 bg-corporate-green/10 text-corporate-green">اعتماد وشراكات</Badge>
                </div>
              </div>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">نقدّم تجربة تعلم شاملة تجمع بين الجلسات التفاعلية والتطبيق العملي؛ نصمم مسارات تلائم احتياجات المهنيين والطلاب.</p>
              <div className="flex flex-wrap gap-3">
                <a href="/services/sports-arbitration" className="text-corporate-green underline-offset-4 hover:underline">التحكيم الرياضي</a>
                <span className="text-muted-foreground">/</span>
                <a href="/services/legal-mediation" className="text-corporate-green underline-offset-4 hover:underline">الوساطة القانونية</a>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <img src="/professional-training-session-with-instructor-teac.jpg" alt="جلسة تدريب" className="h-[420px] w-full rounded-xl object-cover shadow-xl" />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-b from-background to-light-grey py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl font-bold text-corporate-green md:text-4xl">المزايا</h2>
            <p className="text-lg text-muted-foreground">قيمنا: الاعتماد، الخبرة، التطبيق العملي، المرونة.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((f, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: idx * 0.05 }}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/60 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/40">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-corporate-green/10 blur-2xl transition group-hover:scale-125" />
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-corporate-green/15 text-corporate-green">{f.icon}</div>
                  <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl font-bold text-corporate-green md:text-4xl">الفئات المستفيدة</h2>
            <p className="text-lg text-muted-foreground">نخدم احتياجات مهنيين وطلاب في المنظومة الرياضية.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beneficiaries.map((b, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: idx * 0.05 }}>
                <Card className="group border-none bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-corporate-green/15 text-corporate-green transition group-hover:scale-105">{b.icon}</div>
                    </div>
                    <p className="font-medium text-corporate-green">{b.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl font-bold text-corporate-green md:text-4xl">خطوات التدريب</h2>
            <p className="text-lg text-muted-foreground">Timeline تفاعلي يوضح رحلتك في البرنامج.</p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-x-10 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-corporate-green/30 to-transparent md:block" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {timeline.map((t, idx) => (
                <motion.div key={t.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: idx * 0.06 }} className="text-center">
                  <motion.div whileHover={{ scale: 1.05 }} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white shadow-lg">
                    <span className="text-xl font-bold">{t.step}</span>
                  </motion.div>
                  <h4 className="mb-1 font-semibold">{t.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.a whileHover={{ scale: 1.04, boxShadow: "0 0 0 4px rgba(16,185,129,0.25)" }} whileTap={{ scale: 0.98 }} href="/forms" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-corporate-green to-teal-500 px-5 py-3 text-white">
              سجّل الآن
              <ChevronRight className="mr-2 h-5 w-5 -scale-x-100 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="/contact" className="inline-flex items-center justify-center rounded-lg border px-5 py-3">
              تواصل معنا
            </motion.a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="انطلق في مسارك المهني بثقة"
        description="اختر برنامجك، تعلم بمرونة، واحصل على شهادة معتمدة تفتح لك آفاقًا جديدة."
        primaryButton={{ text: "ابدأ الآن", href: "/forms" }}
        secondaryButton={{ text: "اكتشف البرامج", href: "/services" }}
        variant="corporate"
      />

      <Footer />
    </div>
  )
}


