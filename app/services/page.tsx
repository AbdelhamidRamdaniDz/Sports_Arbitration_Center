import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ServiceCard } from "@/components/service-card"
import { CTASection } from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Gavel,
  GraduationCap,
  Handshake,
  Building,
  Clock,
  Shield,
  Users,
  Award,
  CheckCircle,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Target,
  Zap,
  FileText,
  MessageCircle,
} from "lucide-react"
import { SERVICES } from "@/lib/constants"
import Link from "next/link"

export const metadata: Metadata = {
  title: "خدماتنا | مركز التحكيم الرياضي - حلول قانونية متكاملة",
  description: "مجموعة شاملة من الخدمات المتخصصة في التحكيم والوساطة والتدريب الرياضي مع فريق من الخبراء المعتمدين",
}

export default function ServicesPage() {
  const detailedServices = [
    {
      title: "التحكيم الرياضي",
      description: "خدمات التحكيم المتخصصة في النزاعات الرياضية داخل الجزائر وفق التشريعات الوطنية والمعايير الدولية",
      icon: <Gavel className="h-8 w-8" />,
      benefits: [
        "حل سريع للنزاعات خلال 30-60 يوم",
        "فريق من المحكمين المعتمدين دولياً",
        "قرارات ملزمة ونهائية قابلة للتنفيذ",
        "سرية تامة وحماية للأطراف",
        "تكلفة معقولة مقارنةً بالتقاضي التقليدي",
        "مرونة في الإجراءات والمواعيد",
      ],
      process: [
        "تقديم طلب التحكيم مع الوثائق",
        "تعيين المحكم المتخصص",
        "جلسات الاستماع والمرافعات",
        "إصدار الحكم النهائي",
      ],
      pricing: "تبدأ من 180,000 دج",
      duration: "30-90 يوم",
      color: "green",
      successRate: "95%",
      casesHandled: "500+",
    },
    {
      title: "التدريب والتأهيل",
      description: "برامج تدريبية متخصصة في القانون الرياضي والتحكيم موجهة للإداريين والقانونيين في الجزائر",
      icon: <GraduationCap className="h-8 w-8" />,
      benefits: [
        "برامج معتمدة من المنظمات الدولية",
        "مدربون خبراء في القانون الرياضي",
        "شهادات معترف بها محلياً ودولياً",
        "تدريب عملي على قضايا حقيقية",
        "ورش عمل تفاعلية ومتخصصة",
        "متابعة مستمرة بعد التدريب",
      ],
      process: [
        "التسجيل في البرنامج المناسب",
        "حضور المحاضرات النظرية",
        "التطبيق العملي والتدريب",
        "الاختبار والحصول على الشهادة",
      ],
      pricing: "تبدأ من 25,000 دج",
      duration: "2-6 أسابيع",
      color: "blue",
      successRate: "98%",
      casesHandled: "1200+ متدرب",
    },
    {
      title: "الوساطة القانونية",
      description: "خدمات الوساطة لحل النزاعات الرياضية بطريقة ودية وسريعة داخل الجزائر",
      icon: <Handshake className="h-8 w-8" />,
      benefits: [
        "حلول سريعة خلال 15-30 يوم",
        "تكلفة أقل من التحكيم بنسبة 40%",
        "الحفاظ على العلاقات بين الأطراف",
        "مرونة كاملة في الحلول",
        "سرية مطلقة للمناقشات",
        "نسبة نجاح عالية تصل إلى 87%",
      ],
      process: [
        "طلب الوساطة من جميع الأطراف",
        "تعيين الوسيط المناسب",
        "جلسات الحوار والتفاوض",
        "التوصل إلى اتفاق مرضي",
      ],
      pricing: "تبدأ من 120,000 دج",
      duration: "15-45 يوم",
      color: "orange",
      successRate: "87%",
      casesHandled: "350+",
    },
    {
      title: "القاعات المجهزة",
      description: "قاعات حديثة ومجهزة بالكامل لجلسات التحكيم والوساطة مع أحدث التقنيات",
      icon: <Building className="h-8 w-8" />,
      benefits: [
        "تجهيزات تقنية حديثة ومتطورة",
        "خصوصية تامة وأمان عالي",
        "مواقع متميزة في المدن الرئيسية",
        "خدمات مساندة شاملة",
        "إمكانية الحجز المرن 24/7",
        "دعم تقني متخصص",
      ],
      process: [
        "طلب حجز القاعة المناسبة",
        "تحديد التجهيزات المطلوبة",
        "تأكيد الحجز والدفع",
        "استخدام القاعة مع الدعم",
      ],
      pricing: "تبدأ من 3,000 دج/ساعة",
      duration: "حسب الحاجة",
      color: "purple",
      successRate: "100%",
      casesHandled: "800+ حجز",
    },
  ]

  const whyChooseUs = [
    {
      title: "خبرة 15+ سنة",
      description: "خبرة واسعة في مجال التحكيم الرياضي مع سجل حافل بالنجاحات",
      icon: <Award className="h-6 w-6" />,
      stats: "500+ قضية",
    },
    {
      title: "فريق متخصص",
      description: "نخبة من المحكمين والخبراء المعتمدين دولياً",
      icon: <Users className="h-6 w-6" />,
      stats: "25+ خبير",
    },
    {
      title: "سرعة في الإنجاز",
      description: "حلول سريعة وفعالة للنزاعات بمتوسط 45 يوم",
      icon: <Clock className="h-6 w-6" />,
      stats: "45 يوم متوسط",
    },
    {
      title: "موثوقية عالية",
      description: "معتمد من المنظمات المحلية والدولية",
      icon: <Shield className="h-6 w-6" />,
      stats: "95% نسبة نجاح",
    },
  ]

  const faqs = [
    {
      question: "ما هي مدة إجراءات التحكيم؟",
      answer: "تتراوح مدة التحكيم بين 30-90 يوم حسب تعقيد القضية، وهي أسرع بكثير من التقاضي التقليدي.",
    },
    {
      question: "هل الأحكام الصادرة ملزمة؟",
      answer: "نعم، أحكام التحكيم ملزمة ونهائية وقابلة للتنفيذ وفقاً للقانون الجزائري.",
    },
    {
      question: "ما الفرق بين التحكيم والوساطة؟",
      answer: "التحكيم ينتهي بحكم ملزم، بينما الوساطة تهدف للتوصل لاتفاق ودي بين الأطراف.",
    },
  ]

  const serviceIcons = {
    gavel: <Gavel className="h-6 w-6" />,
    "graduation-cap": <GraduationCap className="h-6 w-6" />,
    handshake: <Handshake className="h-6 w-6" />,
    building: <Building className="h-6 w-6" />,
  }

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        border: "border-green-200",
        bg: "bg-gradient-to-br from-green-50 to-emerald-50",
        badge: "bg-green-100 text-green-700",
        hover: "hover:shadow-green-200/50",
      },
      blue: {
        border: "border-blue-200",
        bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
        badge: "bg-blue-100 text-blue-700",
        hover: "hover:shadow-blue-200/50",
      },
      orange: {
        border: "border-orange-200",
        bg: "bg-gradient-to-br from-orange-50 to-amber-50",
        badge: "bg-orange-100 text-orange-700",
        hover: "hover:shadow-orange-200/50",
      },
      purple: {
        border: "border-purple-200",
        bg: "bg-gradient-to-br from-purple-50 to-pink-50",
        badge: "bg-purple-100 text-purple-700",
        hover: "hover:shadow-purple-200/50",
      },
    }
    return colors[color as keyof typeof colors] || colors.green
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="خدماتنا المتخصصة"
        description="نقدم مجموعة شاملة من الخدمات القانونية المتخصصة في المجال الرياضي بأعلى معايير الجودة والمهنية"
      />

      {/* Stats Banner */}
      <section className="py-12 bg-corporate-green text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">قضية محلولة</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-90">نسبة النجاح</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1200+</div>
              <div className="text-sm opacity-90">متدرب معتمد</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">سنة خبرة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview with Tabs */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="all">جميع الخدمات</TabsTrigger>
              <TabsTrigger value="arbitration">التحكيم</TabsTrigger>
              <TabsTrigger value="training">التدريب</TabsTrigger>
              <TabsTrigger value="mediation">الوساطة</TabsTrigger>
              <TabsTrigger value="facilities">القاعات</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    benefits={service.benefits.slice(0, 3)}
                    icon={serviceIcons[service.icon as keyof typeof serviceIcons]}
                    variant={index === 0 ? "featured" : "default"}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Individual service tabs content would go here */}
          </Tabs>
        </div>
      </section>

      {/* Detailed Services with Enhanced Design */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
              تفاصيل شاملة
            </Badge>
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
              استكشف خدماتنا بالتفصيل
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              معلومات كاملة عن كل خدمة نقدمها مع الأسعار والمدة ونسبة النجاح
            </p>
          </div>

          <div className="space-y-12">
            {detailedServices.map((service, index) => {
              const colorClasses = getColorClasses(service.color)
              return (
                <Card
                  key={index}
                  className={`border-2 ${colorClasses.border} ${colorClasses.bg} hover:shadow-2xl ${colorClasses.hover} transition-all duration-300`}
                >
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Service Info */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-corporate-green text-white shadow-lg">
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-corporate-green mb-2">
                              {service.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {service.description}
                            </p>
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                            <TrendingUp className="h-5 w-5 text-corporate-green" />
                            <div>
                              <div className="text-xs text-muted-foreground block mb-2">
                                نسبة النجاح
                              </div>
                              <div className="font-bold text-corporate-green">{service.successRate}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                            <Target className="h-5 w-5 text-corporate-green" />
                            <div>
                              <div className="text-xs text-muted-foreground block mb-2">
                                القضايا المنجزة
                              </div>
                              <div className="font-bold text-corporate-green">{service.casesHandled}</div>
                            </div>
                          </div>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h4 className="text-lg font-semibold text-corporate-green mb-4 flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            المميزات الرئيسية
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.benefits.map((benefit, benefitIndex) => (
                              <div
                                key={benefitIndex}
                                className="flex items-start gap-2 bg-white/60 p-3 rounded-lg hover:bg-white transition-colors"
                              >
                                <CheckCircle className="h-5 w-5 text-corporate-green flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Process */}
                        <div>
                          <h4 className="text-lg font-semibold text-corporate-green mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            خطوات العمل
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {service.process.map((step, stepIndex) => (
                              <div
                                key={stepIndex}
                                className="relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                              >
                                <div className="flex justify-center mb-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-corporate-green to-emerald-600 text-white text-sm font-bold shadow-lg">
                                    {stepIndex + 1}
                                  </div>
                                </div>
                                <p className="text-xs text-center text-muted-foreground leading-relaxed">
                                  {step}
                                </p>
                                {stepIndex < service.process.length - 1 && (
                                  <div className="hidden lg:block absolute top-1/2 -left-2 w-4 h-0.5 bg-corporate-green/30" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Service Details Sidebar */}
                      <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border-2 border-corporate-green/20 shadow-lg">
                          <h4 className="font-semibold text-corporate-green mb-6 text-lg">
                            تفاصيل الخدمة
                          </h4>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <span className="text-xs text-muted-foreground block mb-2">
                                التكلفة
                              </span>
                              <Badge className={`${colorClasses.badge} text-base px-3 py-1`}>
                                {service.pricing}
                              </Badge>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <span className="text-xs text-muted-foreground block mb-2">
                                المدة المتوقعة
                              </span>
                              <Badge
                                variant="outline"
                                className="border-corporate-green text-corporate-green text-base px-3 py-1"
                              >
                                <Clock className="h-4 w-4 ml-1" />
                                {service.duration}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Link href="/contact" className="block">
                            <Button className="w-full bg-gradient-to-r from-corporate-green to-emerald-600 hover:from-corporate-green/90 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all">
                              طلب الخدمة الآن
                              <ArrowLeft className="mr-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href="/consultation" className="block">
                            <Button
                              variant="outline"
                              className="w-full border-2 border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white transition-all"
                            >
                              استشارة مجانية
                              <Phone className="mr-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-amber-600" />
                            <span className="font-semibold text-amber-900 text-sm">
                              ضمان الجودة
                            </span>
                          </div>
                          <p className="text-xs text-amber-800">
                            نضمن لك خدمة عالية الجودة أو استرجاع كامل المبلغ
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
              تميزنا عن الآخرين
            </Badge>
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
              لماذا تختارنا؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مميزات فريدة تجعلنا الخيار الأول في مجال التحكيم الرياضي بالجزائر
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="group text-center border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-corporate-green to-corporate-green text-corporate-green shadow-lg group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-corporate-green mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <Badge className="bg-corporate-green/10 text-corporate-green">
                    {item.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
                الأسئلة الشائعة
              </Badge>
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
                إجابات على أسئلتك
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-2 hover:border-corporate-green transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-corporate-green mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                لم تجد إجابة لسؤالك؟
              </p>
              <Link href="/contact">
                <Button variant="outline" className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white">
                  اتصل بنا للمزيد من المعلومات
                  <MessageCircle className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Custom Services - Enhanced */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
                خدمات مخصصة
              </Badge>
              <h2 className="text-3xl font-bold text-corporate-green mb-6 md:text-4xl">
                حلول مصممة خصيصاً لك
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                هل تحتاج إلى خدمة مخصصة أو استشارة قانونية متخصصة؟ فريقنا جاهز لتقديم حلول
                مبتكرة تناسب احتياجاتك الخاصة على مدار الساعة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="group bg-white border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Phone className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="font-bold text-corporate-green mb-2 text-lg">اتصل بنا</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    للاستفسارات العاجلة والسريعة
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-corporate-green">+213 21 123 456</p>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      متاح 24/7
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-white border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Mail className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="font-bold text-corporate-green mb-2 text-lg">راسلنا</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    للاستفسارات التفصيلية والوثائق
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-corporate-green break-all">
                      info@sports-arbitration.dz
                    </p>
                    <Badge className="bg-blue-100 text-blue-700 text-xs">
                      رد خلال 24 ساعة
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-white border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Calendar className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="font-bold text-corporate-green mb-2 text-lg">احجز موعد</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    للاستشارات المجانية الشخصية
                  </p>
                  <Link href="/booking">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-corporate-green to-emerald-600 hover:from-corporate-green/90 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all"
                    >
                      احجز الآن مجاناً
                      <ArrowLeft className="mr-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Additional Benefits */}
            <Card className="bg-gradient-to-br from-corporate-green to-emerald-600 text-white border-none shadow-2xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2">30 دقيقة</div>
                    <p className="text-sm opacity-90">استشارة مجانية أولى</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <p className="text-sm opacity-90">سرية وخصوصية</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <p className="text-sm opacity-90">دعم متواصل</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
              خطوات بسيطة
            </Badge>
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
              كيف نعمل معك
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              عملية واضحة وشفافة من البداية حتى النهاية
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "التواصل الأولي",
                  description: "اتصل بنا أو احجز استشارة مجانية",
                  icon: <Phone className="h-6 w-6" />,
                },
                {
                  step: "02",
                  title: "تقييم الحالة",
                  description: "نستمع لك ونقيم احتياجاتك",
                  icon: <FileText className="h-6 w-6" />,
                },
                {
                  step: "03",
                  title: "خطة العمل",
                  description: "نضع خطة مخصصة لقضيتك",
                  icon: <Target className="h-6 w-6" />,
                },
                {
                  step: "04",
                  title: "التنفيذ والمتابعة",
                  description: "نعمل معك حتى تحقيق النتيجة",
                  icon: <CheckCircle className="h-6 w-6" />,
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <Card className="border-2 hover:border-corporate-green transition-all hover:shadow-lg group">
                    <CardContent className="p-6 text-center">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg text-sm">
                        {item.step}
                      </div>
                      <div className="mt-6 mb-4 flex justify-center">
                        <div className="h-12 w-12 rounded-full bg-corporate-green/10 text-corporate-green flex items-center justify-center group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="font-bold text-corporate-green mb-2">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-corporate-green/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="جاهز لبدء رحلتك مع العدالة الرياضية؟"
        description="انضم إلى مئات العملاء الذين وثقوا بخبرتنا في حل نزاعاتهم الرياضية. فريقنا المتخصص جاهز لخدمتك على مدار الساعة."
        primaryButton={{
          text: "ابدأ الآن",
          href: "/forms",
        }}
        secondaryButton={{
          text: "تواصل معنا",
          href: "/contact",
        }}
        variant="corporate"
      />

      <Footer />
    </div>
  )
}