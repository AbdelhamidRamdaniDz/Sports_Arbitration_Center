import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Handshake, Clock, Users, ArrowLeft, Download, Info, CheckCircle2, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "النماذج الرقمية | مركز التحكيم الرياضي",
  description: "نماذج رقمية لتقديم طلبات التحكيم والوساطة الرياضية بطريقة سهلة وسريعة",
}

export default function FormsPage() {
  const forms = [
    {
      title: "نموذج طلب التحكيم",
      description: "نموذج شامل لتقديم طلب التحكيم في النزاعات الرياضية مع جميع المتطلبات القانونية",
      icon: <FileText className="h-8 w-8" />,
      href: "/forms/arbitration",
      features: [
        "نموذج تفاعلي سهل الاستخدام",
        "إرفاق الوثائق والمستندات",
        "حفظ تلقائي للبيانات",
        "تتبع حالة الطلب",
        "إشعارات فورية",
      ],
      estimatedTime: "15-30 دقيقة",
      requiredDocs: ["هوية مقدم الطلب", "الوثائق المتعلقة بالنزاع", "عقد أو اتفاقية (إن وجدت)"],
      fee: "مجاني",
      color: "green",
      popular: true,
    },
    {
      title: "نموذج طلب الوساطة",
      description: "نموذج مبسط لطلب خدمات الوساطة لحل النزاعات بطريقة ودية وسريعة",
      icon: <Handshake className="h-8 w-8" />,
      href: "/forms/mediation",
      features: [
        "عملية تقديم مبسطة",
        "خيارات مرنة للوساطة",
        "جدولة سريعة للجلسات",
        "تواصل مباشر مع الوسيط",
        "حلول سريعة ومرضية",
      ],
      estimatedTime: "10-20 دقيقة",
      requiredDocs: ["هوية الأطراف", "وصف موجز للنزاع", "موافقة جميع الأطراف"],
      fee: "مجاني",
      color: "blue",
      popular: false,
    },
    {
      title: "نموذج طلب التحكيم التجاري",
      description: "نموذج شامل لتقديم طلب تحكيم في النزاعات التجارية وفق اللوائح المعتمدة",
      icon: <FileText className="h-8 w-8" />,
      href: "/forms/commercial",
      features: [
        "نموذج تفاعلي سهل الاستخدام",
        "إرفاق العقود والمستندات التجارية",
        "حفظ تلقائي للبيانات",
        "تتبع حالة الطلب",
        "إشعارات فورية",
      ],
      estimatedTime: "15-30 دقيقة",
      requiredDocs: ["هوية مقدم الطلب", "العقد/الاتفاقية التجارية", "الوثائق المؤيدة للنزاع"],
      fee: "مجاني",
      color: "green",
      popular: false,
    },
    {
      title: "استشارة مجانية",
      description: "احصل على استشارة أولية مجانية لتقييم حالتك وتوجيهك للخطوات المناسبة",
      icon: <Info className="h-8 w-8" />,
      href: "/forms/free-consultation",
      features: [
        "تقييم أولي للحالة",
        "إجابات على الاستفسارات العامة",
        "توجيه للإجراءات المناسبة",
        "تحديد المستندات المطلوبة",
        "تنسيق موعد للمتابعة عند الحاجة",
      ],
      estimatedTime: "5-10 دقائق",
      requiredDocs: ["معلومات التواصل", "وصف موجز للاستشارة المطلوبة"],
      fee: "مجاني",
      color: "blue",
      popular: false,
    },
  ]

  const steps = [
    {
      number: 1,
      title: "اختر النموذج المناسب",
      description: "حدد نوع الخدمة المطلوبة (تحكيم أو وساطة)",
    },
    {
      number: 2,
      title: "املأ البيانات المطلوبة",
      description: "أدخل جميع المعلومات والتفاصيل بدقة",
    },
    {
      number: 3,
      title: "أرفق الوثائق",
      description: "حمل جميع المستندات والوثائق ذات الصلة",
    },
    {
      number: 4,
      title: "راجع وأرسل",
      description: "راجع البيانات وأرسل الطلب للمعالجة",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/30 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.02]" aria-hidden="true">
          <defs>
            <pattern id="forms-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 32V.5H32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#forms-grid)" />
        </svg>
      </div>
      <Header />
      <PageHeader
        backgroundImage="/hero-background.webp"
        title="النماذج الإلكترونية"
        description="نماذج إلكترونية متطورة وسهلة الاستخدام لتقديم طلبات التحكيم والوساطة"
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 mb-6 border border-emerald-200/50 shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">خدمات رقمية متطورة</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              النماذج المتاحة
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
              اختر النموذج المناسب لنوع الخدمة التي تحتاجها
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {forms.map((form, index) => (
              <Card
                key={index}
                className="group relative border-2 border-slate-200/60 bg-white hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 overflow-hidden hover:-translate-y-1"
              >
                {form.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-gradient-to-l from-emerald-600 to-teal-600 text-white border-none shadow-lg px-3 py-1">
                      <Sparkles className="h-3 w-3 ml-1" />
                      الأكثر طلباً
                    </Badge>
                  </div>
                )}

                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/5 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                <CardHeader className="text-center pb-6 relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                        {form.icon}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-l from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                    {form.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-slate-600">
                    {form.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      مميزات النموذج
                    </h4>
                    <ul className="space-y-3">
                      {form.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 p-4 rounded-xl group-hover:border-emerald-200 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-900">الوقت المطلوب</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{form.estimatedTime}</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-4 rounded-xl group-hover:border-emerald-200 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-900">رسوم التقديم</span>
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold">
                        {form.fee}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-4">الوثائق المطلوبة</h4>
                    <ul className="space-y-2">
                      {form.requiredDocs.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full flex-shrink-0" />
                          <span className="text-slate-600">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 h-12 text-base font-semibold rounded-xl group/btn"
                    >
                      <Link href={form.href}>
                        <span>ابدأ التقديم الآن</span>
                        <ArrowLeft className="mr-2 h-5 w-5 group-hover/btn:-translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="steps-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-emerald-200" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#steps-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              كيفية التقديم
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
              خطوات بسيطة وواضحة لتقديم طلبك بسهولة
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 right-0 w-full h-0.5 bg-gradient-to-l from-emerald-300 to-teal-300 transform translate-x-1/2 -z-10" />
                  )}
                  <Card className="text-center bg-white border-2 border-slate-200/60 shadow-lg hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 h-full hover:-translate-y-2 group">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-500">
                            {step.number}
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-blue-200/60 bg-gradient-to-br from-blue-50 to-cyan-50/50 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-blue-500 to-cyan-500" />
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg">
                        <Info className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">معلومات مهمة</h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "الدقة في البيانات",
                          desc: "تأكد من صحة جميع المعلومات المدخلة لتجنب التأخير في المعالجة",
                        },
                        {
                          title: "الوثائق المطلوبة",
                          desc: "تأكد من إرفاق جميع الوثائق المطلوبة بصيغة واضحة ومقروءة",
                        },
                        {
                          title: "المتابعة",
                          desc: "ستتلقى رسالة تأكيد ورقم مرجعي لتتبع حالة طلبك",
                        },
                        {
                          title: "الدعم",
                          desc: "فريق الدعم متاح للمساعدة في حالة وجود أي استفسارات",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-200/40 hover:border-blue-300 transition-colors duration-300">
                          <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-900">
                            <strong className="font-semibold">{item.title}:</strong> {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="support-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#support-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">تحتاج مساعدة؟</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-light">
              فريق الدعم جاهز لمساعدتك في تعبئة النماذج والإجابة على استفساراتك
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-emerald-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 h-12 px-8 text-base font-semibold rounded-xl group">
                <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                تواصل مع الدعم
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm shadow-xl transition-all duration-300 h-12 px-8 text-base font-semibold rounded-xl group"
              >
                دليل المستخدم
                <Download className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}