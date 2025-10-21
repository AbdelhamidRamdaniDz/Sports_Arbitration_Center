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
    <div className="min-h-screen bg-white">
      {/* Subtle Professional Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-100/50 rounded-full blur-3xl" />
      </div>

      <Header />
      <PageHeader
        backgroundImage="/hero-background.webp"
        title="النماذج الإلكترونية"
        description="نماذج إلكترونية متطورة وسهلة الاستخدام لتقديم طلبات التحكيم والوساطة"
      />

      {/* Forms Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 mb-6 border border-slate-200">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-700 tracking-wide uppercase">خدمات رقمية احترافية</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              النماذج المتاحة
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              اختر النموذج المناسب لنوع الخدمة التي تحتاجها
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {forms.map((form, index) => (
              <Card
                key={index}
                className="group relative border border-slate-200 bg-white hover:shadow-lg transition-all duration-300"
              >
                {form.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-emerald-600 text-white border-none px-3 py-1 text-xs font-medium">
                      الأكثر طلباً
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm group-hover:bg-emerald-700 transition-colors duration-300">
                      {form.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    {form.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-slate-600">
                    {form.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-3 text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      مميزات النموذج
                    </h4>
                    <ul className="space-y-2">
                      {form.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-emerald-600 mt-0.5">•</span>
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-slate-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-600" />
                        <span className="text-xs font-medium text-slate-900">الوقت المطلوب</span>
                      </div>
                      <p className="text-xs text-slate-600">{form.estimatedTime}</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FileText className="h-3.5 w-3.5 text-slate-600" />
                        <span className="text-xs font-medium text-slate-900">رسوم التقديم</span>
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
                        {form.fee}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-3 text-sm">الوثائق المطلوبة</h4>
                    <ul className="space-y-2">
                      {form.requiredDocs.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-emerald-600 mt-0.5">•</span>
                          <span className="text-slate-600">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Button
                      asChild
                      className="w-full bg-slate-900 hover:bg-emerald-700 text-white transition-colors duration-300 h-11 text-sm font-medium"
                    >
                      <Link href={form.href}>
                        <span>ابدأ التقديم الآن</span>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>

                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 md:py-28 bg-slate-50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              كيفية التقديم
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              خطوات بسيطة وواضحة لتقديم طلبك بسهولة
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 right-0 w-full h-px bg-slate-300 transform translate-x-1/2" />
                  )}
                  <Card className="text-center bg-white border border-slate-200 hover:shadow-md transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white text-lg font-bold">
                          {step.number}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Card className="border border-slate-200 bg-white shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-900" />
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <Info className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">معلومات مهمة</h3>
                    <div className="space-y-3">
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
                        <div key={idx} className="flex items-start gap-3 bg-slate-50 rounded-lg p-4 border border-slate-100">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700">
                            <strong className="font-semibold text-slate-900">{item.title}:</strong> {item.desc}
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

      {/* Support CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-right">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6 border border-white/20">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-white/90 tracking-wide">دعم فني متخصص</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">هل تحتاج إلى مساعدة؟</h2>
                <p className="text-base text-slate-300 leading-relaxed">
                  فريقنا من الخبراء القانونيين جاهز لمساعدتك في تعبئة النماذج والإجابة على جميع استفساراتك المتعلقة بإجراءات التحكيم
                </p>
              </div>

              <div className="space-y-4">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 text-right">
                        <h3 className="font-semibold text-white mb-1">تواصل مع فريق الدعم</h3>
                        <p className="text-sm text-slate-300">متاح من الأحد إلى الخميس</p>
                      </div>
                      <Button asChild className="bg-white text-slate-900 hover:bg-slate-100 h-9 px-6 text-sm font-medium group-hover:scale-105 transition-transform">
                        <Link href="/contact">اتصل الآن</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                        <Download className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 text-right">
                        <h3 className="font-semibold text-white mb-1">دليل المستخدم</h3>
                        <p className="text-sm text-slate-300">إرشادات شاملة لتعبئة النماذج</p>
                      </div>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-white/5 h-9 px-6 text-sm font-medium group-hover:scale-105 transition-transform">
                        تحميل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-slate-400">خدمة العملاء</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">15 دقيقة</div>
                  <div className="text-sm text-slate-400">متوسط وقت الرد</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-slate-400">نسبة رضا العملاء</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}