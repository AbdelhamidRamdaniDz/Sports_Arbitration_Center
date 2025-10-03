// 'use client' يجب أن يكون في أعلى الملف إذا كنت تستخدم Framer Motion أو أي تفاعلات كـ client component
// لا يمكن تصدير metadata من ملف يحمل 'use client'.
// إذا أردت meta لهذه الصفحة، ضعها في layout.tsx أو في ملف منفصل مثل metadata.ts أو page.server.tsx

'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { StatsSection } from "@/components/stats-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Handshake, Users, Shield, Clock, BadgeCheck, Award, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const heroTitle = "الوساطة القانونية الرياضية"
const heroSubtitle = "حلول ودية واحترافية للنزاعات الرياضية، بسرعة وسرية، مع الحفاظ على العلاقات المهنية."

const features = [
  {
    title: "حلول سريعة",
    description: "إنجاز خلال 15-30 يوم فقط",
    icon: <Clock className="h-7 w-7" />,
  },
  {
    title: "تكلفة أقل",
    description: "أوفر من التحكيم التقليدي",
    icon: <Award className="h-7 w-7" />,
  },
  {
    title: "سرية مطلقة",
    description: "حماية تامة للمناقشات",
    icon: <Shield className="h-7 w-7" />,
  },
  {
    title: "نسبة نجاح عالية",
    description: "85% من الحالات تنتهي بنجاح",
    icon: <Users className="h-7 w-7" />,
  },
]

const beneficiaries = [
  { label: "لاعبون", icon: <Users className="h-8 w-8" /> },
  { label: "أندية رياضية", icon: <Handshake className="h-8 w-8" /> },
  { label: "اتحادات رياضية", icon: <BadgeCheck className="h-8 w-8" /> },
  { label: "مستثمرون", icon: <Award className="h-8 w-8" /> },
  { label: "شركات راعية", icon: <Shield className="h-8 w-8" /> },
  { label: "وكلاء", icon: <Users className="h-8 w-8" /> },
]

const steps = [
  { label: "طلب الوساطة من جميع الأطراف", icon: <Handshake className="h-6 w-6" /> },
  { label: "تعيين وسيط متخصص", icon: <BadgeCheck className="h-6 w-6" /> },
  { label: "جلسات الحوار والتفاوض", icon: <Users className="h-6 w-6" /> },
  { label: "اتفاق مرضي للطرفين", icon: <CheckCircle className="h-6 w-6" /> },
]

const stats = [
  { value: "85%", label: "نسبة النجاح", description: "من الحالات تنتهي باتفاق ودي" },
  { value: "30+", label: "يوم لإنجاز النزاع", description: "متوسط مدة إنهاء الوساطة" },
  { value: "100+", label: "عميل موثوق", description: "أندية ولاعبين واتحادات" },
  { value: "100%", label: "سرية تامة", description: "خصوصية وحماية للمعلومات" },
]

export default function LegalMediationPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-corporate-gradient pb-0 pt-8 md:pt-16">
        {/* هندسيات SVG خلفية */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1440 320"><path fill="#1e88e5" fillOpacity="0.2" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8 relative z-10">
          {/* النصوص */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex-1 text-center md:text-right space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-relaxed mb-2">{heroTitle}</h1>
            <h2 className="text-xl md:text-2xl text-white/90 font-medium mb-4">{heroSubtitle}</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <a href="/forms/service-request" className="rounded-lg px-8 py-3 bg-white text-corporate-green font-bold text-lg shadow-soft hover:scale-105 hover:shadow-xl transition-all duration-200 focus:ring-4 ring-brand focus:outline-none">اطلب الخدمة الآن</a>
              <a href="/contact" className="rounded-lg px-8 py-3 bg-corporate-green/80 text-white font-bold text-lg border-2 border-white hover:bg-white hover:text-corporate-green transition-all duration-200 hover:scale-105">تواصل معنا</a>
            </div>
          </motion.div>
          {/* صورة أو فيديو */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="flex-1 flex justify-center items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 bg-white/10 backdrop-blur-lg">
              <img src="/professional-mediation-session-with-people-shaking.jpg" alt="جلسة وساطة رياضية" className="w-full h-[340px] md:h-[420px] object-cover" />
              {/* يمكن استبدال الصورة بفيديو لاحقًا */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* نظرة عامة */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-4">ما هي الوساطة القانونية الرياضية؟</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">الوساطة القانونية هي الحل الأمثل للنزاعات الرياضية، حيث تتيح للأطراف الوصول إلى اتفاق ودي بسرعة وسرية، مع الحفاظ على العلاقات المهنية والتجارية.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {features.map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" delay={300 + idx * 100}>
                <Card className="bg-white/80 surface-subtle border-none shadow-soft hover-lift hover:scale-105 transition-all duration-300 group">
                  <CardContent className="flex flex-col items-center gap-3 p-6">
                    <div className="icon-gradient rounded-full p-3 mb-2 shadow-soft">{feature.icon}</div>
                    <h3 className="font-semibold text-corporate-green text-lg mb-1 group-hover:text-trust-blue transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* المستفيدون */}
      <section className="py-12 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-4">من المستفيد من الوساطة؟</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">خدماتنا موجهة لكل من يسعى لحل نزاع رياضي بشكل ودي واحترافي.</p>
            </div>
          </ScrollReveal>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {beneficiaries.map((b, idx) => (
                <ScrollReveal key={idx} direction="up" delay={300 + idx * 100}>
                  <Card className="bg-white border-none shadow-soft hover-lift hover:scale-105 transition-all duration-300 group">
                    <CardContent className="flex flex-col items-center gap-2 p-6">
                      <div className="icon-gradient rounded-full p-3 mb-2">{b.icon}</div>
                      <span className="font-medium text-corporate-green group-hover:text-trust-blue transition-colors duration-300">{b.label}</span>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
          {/* Carousel للموبايل */}
          <div className="md:hidden mt-6">
            <Carousel>
              <CarouselContent>
                {beneficiaries.map((b, idx) => (
                  <CarouselItem key={idx} className="basis-4/5">
                    <Card className="bg-white border-none shadow-soft hover-lift hover:scale-105 transition-all duration-300 group">
                      <CardContent className="flex flex-col items-center gap-2 p-6">
                        <div className="icon-gradient rounded-full p-3 mb-2">{b.icon}</div>
                        <span className="font-medium text-corporate-green group-hover:text-trust-blue transition-colors duration-300">{b.label}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* خطوات العمل Timeline */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-4">كيف تتم الوساطة؟</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">خطوات عملية منظمة تضمن الوصول إلى أفضل الحلول الودية.</p>
            </div>
          </ScrollReveal>
          <div className="relative max-w-3xl mx-auto">
            <ol className="relative border-s-4 border-corporate-green/30">
              {steps.map((step, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="mb-12 ms-6 flex items-center gap-4"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-corporate-green text-white text-xl font-bold shadow-soft ring-4 ring-brand">
                    {step.icon}
                  </span>
                  <span className="text-lg text-foreground font-medium">{step.label}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* شهادات/إحصائيات */}
      <StatsSection
        stats={stats}
        title="لماذا يثق بنا العملاء؟"
        description="أرقامنا تتحدث عن نجاحنا في حل النزاعات الرياضية ودياً وباحترافية."
        className="bg-white/80 surface-subtle"
      />

      {/* CTA نهائي */}
      <CTASection
        title="ابدأ رحلتك نحو الحل الودي الآن"
        description="تواصل معنا أو اطلب الخدمة مباشرة لتحصل على استشارة مجانية من خبرائنا."
        primaryButton={{
          text: "اطلب الخدمة",
          href: "/forms/service-request",
        }}
        secondaryButton={{
          text: "استشارة مجانية",
          href: "/forms/free-consultation",
        }}
        variant="corporate"
      />
      <Footer />
    </div>
  )
}
