"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { GraduationCap, Users, Award, Shield, LayoutGrid, Handshake, ChevronRight } from "lucide-react"
import type { JSX } from "react"

export default function TrainingClient() {
  const features: Array<{ title: string; desc: string; icon: JSX.Element }> = [
    { title: "نخبة من الخبراء", desc: "برامج يشرف عليها أكاديميون وخبراء ممارسون في المجالين القانوني والتقني", icon: <Users className="h-6 w-6" /> },
    { title: "شهادات مهنية معتمدة", desc: "توثيق رسمي للمهارات المكتسبة يعزز قابلية التوظيف", icon: <Award className="h-6 w-6" /> },
    { title: "تطبيق عملي", desc: "ورشات عمل تطبيقية ومحتوى علمي موجّه", icon: <Shield className="h-6 w-6" /> },
    { title: "تحول رقمي", desc: "مواكبة أحدث مستجدات الممارسة القانونية الحديثة", icon: <LayoutGrid className="h-6 w-6" /> },
  ]

  const beneficiaries = [
    { title: "طلبة القانون", icon: <GraduationCap className="h-7 w-7" /> },
    { title: "الباحثون القانونيون", icon: <Award className="h-7 w-7" /> },
    { title: "المهنيون في التحكيم", icon: <Handshake className="h-7 w-7" /> },
    { title: "المحامون والمستشارون", icon: <Users className="h-7 w-7" /> },
    { title: "المحكمون والوسطاء", icon: <Shield className="h-7 w-7" /> },
    { title: "المهتمون بالعدالة الرقمية", icon: <LayoutGrid className="h-7 w-7" /> },
  ]

  const timeline = [
    { step: 1, title: "التسجيل", desc: "اختر البرنامج وسجّل بياناتك" },
    { step: 2, title: "التعلّم", desc: "محاضرات تفاعلية ومواد رقمية" },
    { step: 3, title: "الممارسة", desc: "تطبيق عملي ودراسات حالة" },
    { step: 4, title: "الاعتماد", desc: "اختبار وشهادة معتمدة" },
  ]

  const containerVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.08 } } }
  const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/training.jpg" alt="قاعة تدريب احترافية" className="h-[64vh] w-full object-cover" />
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
                  <span className="text-xs font-medium">Tahkeem Tech Academy</span>
                </div>
                <h1 className="mb-3 text-3xl font-extrabold leading-tight md:text-5xl">أكاديمية تحكيم تيك: جيل جديد... مستقبل قانوني مشرق</h1>
                <p className="mb-6 text-base text-muted-foreground md:text-lg">الذراع الأكاديمي لمشروع Tahkeem Tech، نُعدّ جيلًا جديدًا من المتخصصين في التحكيم والوساطة وتسوية النزاعات عبر مقاربة علمية تطبيقية تواكب التحولات الرقمية.</p>
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

      {/* Vision */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mx-auto max-w-5xl text-center">
            <motion.h2 variants={itemVariants} className="mb-2 text-2xl font-bold text-corporate-green md:text-3xl">رؤيتنا</motion.h2>
            <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">أن نصبح أكاديمية رائدة ومنصة مرجعية في مجال التحكيم وتسوية المنازعات، معتمدة على الابتكار والجودة لتقديم حلول موثوقة على المستويين الوطني والإقليمي</motion.p>
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
                  <h2 className="text-2xl font-bold md:text-3xl">مجالات التكوين</h2>
                  <Badge className="mt-2 bg-corporate-green/10 text-corporate-green">أكاديمية متخصصة</Badge>
                </div>
              </div>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">نقدم برامج تدريبية متخصصة وورشات عمل تطبيقية تهدف إلى تأهيل جيل جديد وفقًا للتشريعات الوطنية والمعايير الدولية، انسجامًا مع رؤية الجزائر 2030 للتحول الرقمي.</p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-corporate-green" />
                  <p className="text-sm font-medium">التحكيم التجاري والرياضي</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-corporate-green" />
                  <p className="text-sm font-medium">الوساطة وتسوية النزاعات البديلة</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-corporate-green" />
                  <p className="text-sm font-medium">العدالة الرقمية والتكنولوجيا القانونية (LegalTech)</p>
                </div>
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
            <h2 className="mb-3 text-3xl font-bold text-corporate-green md:text-4xl">ميزات الأكاديمية</h2>
            <p className="text-lg text-muted-foreground">نجمع بين المعرفة النظرية والتطبيق العملي في بيئة تعليمية حديثة.</p>
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
            <p className="text-lg text-muted-foreground">نخدم احتياجات مهنيين وطلاب في المنظومة القانونية.</p>
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
            <p className="text-lg text-muted-foreground">رحلتك التعليمية في أربع خطوات واضحة.</p>
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

      {/* Final CTA */}
      <CTASection
        title="انضم إلى جيل جديد من المتخصصين"
        description="ابدأ رحلتك الأكاديمية في التحكيم والوساطة وتسوية النزاعات مع أكاديمية تحكيم تيك"
        primaryButton={{ text: "سجّل الآن", href: "/forms" }}
        secondaryButton={{ text: "تعرف على البرامج", href: "/services" }}
        variant="corporate"
      />

      <Footer />
    </div>
  )
}