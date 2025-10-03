"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Gavel,
  Trophy,
  User,
  Building2,
  Handshake,
  Globe2,
  ShieldCheck,
  Timer,
  Award,
} from "lucide-react"
import type { JSX } from "react"

export default function SportsArbitrationClient() {
  const beneficiaries: Array<{ title: string; icon: JSX.Element }> = [
    { title: "اللاعبون والمدربون", icon: <User className="h-7 w-7" /> },
    { title: "الأندية والاتحادات", icon: <Trophy className="h-7 w-7" /> },
    { title: "الوكلاء والمستثمرون", icon: <Handshake className="h-7 w-7" /> },
    { title: "الشركات الراعية والإعلام", icon: <Building2 className="h-7 w-7" /> },
    { title: "المنظمات الدولية", icon: <Globe2 className="h-7 w-7" /> },
    { title: "الجهات الحكومية الرياضية", icon: <ShieldCheck className="h-7 w-7" /> },
  ]

  const features = [
    {
      title: "الحياد والنزاهة",
      description: "معايير صارمة واستقلالية كاملة في كل مرحلة",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
      title: "سرعة محسوبة",
      description: "حل النزاعات خلال 30–90 يومًا وفق جداول واضحة",
      icon: <Timer className="h-6 w-6" />,
    },
    {
      title: "خبرة معتمدة",
      description: "محكمون متخصصون في القانون الرياضي الدولي",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "إجراءات شفافة",
      description: "اتصال مستمر وتحديثات دقيقة لأطراف النزاع",
      icon: <Gavel className="h-6 w-6" />,
    },
  ]

  const timeline = [
    { step: 1, title: "طلب التحكيم", desc: "تعبئة الطلب وإرفاق المستندات" },
    { step: 2, title: "تعيين المحكم", desc: "اختيار الخبرة الأنسب للنزاع" },
    { step: 3, title: "جلسات الاستماع", desc: "مرافعات وتبادل مذكرات" },
    { step: 4, title: "الحكم الملزم", desc: "إصدار قرار نهائي قابل للتنفيذ" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/sports-arbitration-training-workshop.jpg"
            alt="التحكيم الرياضي - لقطة احترافية"
            className="h-[68vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent" />
          {/* Decorative shapes */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-corporate-green/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-bl from-corporate-green/20 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative z-10 flex min-h-[60vh] items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-10 w-full"
            >
              <div className="mx-auto max-w-3xl rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-corporate-green/10 px-3 py-1 text-corporate-green">
                  <Gavel className="h-4 w-4" />
                  <span className="text-xs font-medium">خدمة احترافية معتمدة</span>
                </div>
                <h1 className="mb-3 text-3xl font-extrabold leading-tight md:text-5xl">
                  التحكيم الرياضي: سرعة، نزاهة، وموثوقية عالمية
                </h1>
                <p className="mb-6 text-base text-muted-foreground md:text-lg">
                  نحسم نزاعاتك الرياضية بمنهجية دولية وإجراءات شفافة تؤمّن العدالة وسرعة التنفيذ.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.03, boxShadow: "0 0 0 4px rgba(16,185,129,0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    href="/forms/service-request"
                    className="inline-flex items-center justify-center rounded-lg bg-corporate-green px-5 py-3 text-white"
                  >
                    ابدأ الآن
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href="/forms/free-consultation"
                    className="inline-flex items-center justify-center rounded-lg border px-5 py-3"
                  >
                    استشارة أولية مجانية
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-green text-white">
                  <Gavel className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">حلول تحكيم رياضي بمستوى عالمي</h2>
                  <Badge className="mt-2 bg-corporate-green/10 text-corporate-green">موثوقية عالية</Badge>
                </div>
              </div>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                نقدم إطارًا احترافيًا لحسم النزاعات الرياضية وفق القوانين واللوائح الدولية، مع الحفاظ على النزاهة والحياد
                وتسريع الوصول إلى قرار ملزم قابل للتنفيذ.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/services/legal-mediation" className="text-corporate-green underline-offset-4 hover:underline">
                  الوساطة القانونية
                </a>
                <span className="text-muted-foreground">/</span>
                <a href="/services/training" className="text-corporate-green underline-offset-4 hover:underline">
                  برامج التدريب
                </a>
                <span className="text-muted-foreground">/</span>
                <a href="/services/equipped-halls" className="text-corporate-green underline-offset-4 hover:underline">
                  قاعات مجهزة
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/professional-arbitration-meeting-room-with-judges-.jpg"
                alt="جلسة تحكيم"
                className="h-[420px] w-full rounded-xl object-cover shadow-xl"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">لمن نقدّم هذه الخدمة؟</h2>
            <p className="text-lg text-muted-foreground">حلول مخصصة تراعي طبيعة كل جهة في المنظومة الرياضية</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beneficiaries.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card className="group border-none bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-corporate-green/15 text-corporate-green transition group-hover:scale-105">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      حماية مصالحكم وتسريع الإجراءات مع وضوح كامل في المسار.
                    </p>
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
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">رحلة التحكيم</h2>
            <p className="text-lg text-muted-foreground">Timeline واضح يضمن سرعة وشفافية</p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-x-10 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-corporate-green/30 to-transparent md:block" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {timeline.map((t, idx) => (
                <motion.div
                  key={t.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white shadow-lg"
                  >
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

      {/* Features */}
      <section className="bg-gradient-to-b from-background to-light-grey py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">لماذا نحن؟</h2>
            <p className="text-lg text-muted-foreground">قيم راسخة تمنحك الثقة منذ اللحظة الأولى</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/60 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/40">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-corporate-green/10 blur-2xl transition group-hover:scale-125" />
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-corporate-green/15 text-corporate-green">
                    {f.icon}
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Midpage CTA */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: "0 0 0 4px rgba(16,185,129,0.25)" }}
              whileTap={{ scale: 0.98 }}
              href="/forms/service-request"
              className="inline-flex items-center justify-center rounded-lg bg-corporate-green px-5 py-3 text-white"
            >
              احجز بدء الإجراءات
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#benefits"
              className="inline-flex items-center justify-center rounded-lg border px-5 py-3"
            >
              اكتشف المزايا
            </motion.a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="جاهز لحسم نزاعك بثقة؟"
        description="ابدأ إجراءات التحكيم الآن مع فريق يتمتع بخبرة رياضية دولية ومعايير حياد صارمة."
        primaryButton={{ text: "ابدأ الآن", href: "/forms/service-request" }}
        secondaryButton={{ text: "تواصل معنا", href: "/contact" }}
        variant="corporate"
      />

      <Footer />
    </div>
  )
}


