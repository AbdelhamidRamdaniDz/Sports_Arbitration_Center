import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ServiceCard } from "@/components/service-card"
import { CTASection } from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { SERVICES } from "@/lib/constants"

export const metadata: Metadata = {
  title: "خدماتنا | مركز التحكيم الرياضي",
  description: "مجموعة شاملة من الخدمات المتخصصة في التحكيم والوساطة والتدريب الرياضي",
}

export default function ServicesPage() {
  const detailedServices = [
    {
      title: "التحكيم الرياضي",
      description: "خدمات التحكيم المتخصصة في النزاعات الرياضية بجميع أنواعها",
      icon: <Gavel className="h-8 w-8" />,
      benefits: [
        "حل سريع للنزاعات خلال 30-60 يوم",
        "فريق من المحكمين المعتمدين دولياً",
        "قرارات ملزمة ونهائية",
        "سرية تامة وحماية للأطراف",
        "تكلفة أقل من المحاكم التقليدية",
        "مرونة في الإجراءات والمواعيد",
      ],
      process: [
        "تقديم طلب التحكيم مع الوثائق",
        "تعيين المحكم المتخصص",
        "جلسات الاستماع والمرافعات",
        "إصدار الحكم النهائي",
      ],
      pricing: "تبدأ من 15,000 ريال",
      duration: "30-90 يوم",
      color: "green",
    },
    {
      title: "التدريب والتأهيل",
      description: "برامج تدريبية متخصصة في القانون الرياضي والتحكيم",
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
      pricing: "تبدأ من 5,000 ريال",
      duration: "2-6 أسابيع",
      color: "blue",
    },
    {
      title: "الوساطة القانونية",
      description: "خدمات الوساطة لحل النزاعات بطريقة ودية وسريعة",
      icon: <Handshake className="h-8 w-8" />,
      benefits: [
        "حلول سريعة خلال 15-30 يوم",
        "تكلفة أقل من التحكيم التقليدي",
        "الحفاظ على العلاقات بين الأطراف",
        "مرونة كاملة في الحلول",
        "سرية مطلقة للمناقشات",
        "نسبة نجاح عالية تصل إلى 85%",
      ],
      process: [
        "طلب الوساطة من جميع الأطراف",
        "تعيين الوسيط المناسب",
        "جلسات الحوار والتفاوض",
        "التوصل إلى اتفاق مرضي",
      ],
      pricing: "تبدأ من 8,000 ريال",
      duration: "15-45 يوم",
      color: "orange",
    },
    {
      title: "القاعات المجهزة",
      description: "قاعات حديثة ومجهزة بالكامل لجلسات التحكيم والوساطة",
      icon: <Building className="h-8 w-8" />,
      benefits: [
        "تجهيزات تقنية حديثة ومتطورة",
        "خصوصية تامة وأمان عالي",
        "مواقع متميزة في المدن الرئيسية",
        "خدمات مساندة شاملة",
        "إمكانية الحجز المرن",
        "دعم تقني متخصص",
      ],
      process: ["طلب حجز القاعة المناسبة", "تحديد التجهيزات المطلوبة", "تأكيد الحجز والدفع", "استخدام القاعة مع الدعم"],
      pricing: "تبدأ من 500 ريال/ساعة",
      duration: "حسب الحاجة",
      color: "purple",
    },
  ]

  const whyChooseUs = [
    {
      title: "خبرة 15+ سنة",
      description: "خبرة واسعة في مجال التحكيم الرياضي",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "فريق متخصص",
      description: "نخبة من المحكمين والخبراء المعتمدين",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "سرعة في الإنجاز",
      description: "حلول سريعة وفعالة للنزاعات",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "موثوقية عالية",
      description: "معتمد من المنظمات المحلية والدولية",
      icon: <Shield className="h-6 w-6" />,
    },
  ]

  const serviceIcons = {
    gavel: <Gavel className="h-6 w-6" />,
    "graduation-cap": <GraduationCap className="h-6 w-6" />,
    handshake: <Handshake className="h-6 w-6" />,
    building: <Building className="h-6 w-6" />,
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-200 bg-green-50"
      case "blue":
        return "border-blue-200 bg-blue-50"
      case "orange":
        return "border-orange-200 bg-orange-50"
      case "purple":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="خدماتنا المتخصصة"
        description="نقدم مجموعة شاملة من الخدمات القانونية المتخصصة في المجال الرياضي بأعلى معايير الجودة والمهنية"
      />

      {/* Services Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">تفاصيل الخدمات</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              معلومات شاملة عن كل خدمة نقدمها مع التفاصيل والأسعار
            </p>
          </div>

          <div className="space-y-12">
            {detailedServices.map((service, index) => (
              <Card key={index} className={`border-2 ${getColorClasses(service.color)} bg-white`}>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Service Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-corporate-green mb-2">{service.title}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-corporate-green mb-4">المميزات الرئيسية:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-corporate-green flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process */}
                      <div>
                        <h4 className="text-lg font-semibold text-corporate-green mb-4">خطوات العمل:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {service.process.map((step, stepIndex) => (
                            <div key={stepIndex} className="text-center">
                              <div className="flex justify-center mb-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-corporate-green text-white text-sm font-bold">
                                  {stepIndex + 1}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-lg border">
                        <h4 className="font-semibold text-corporate-green mb-4">تفاصيل الخدمة</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">التكلفة:</span>
                            <Badge className="bg-corporate-green/10 text-corporate-green">{service.pricing}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">المدة المتوقعة:</span>
                            <Badge
                              variant="outline"
                              className="border-corporate-green text-corporate-green bg-transparent"
                            >
                              {service.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full bg-corporate-green hover:bg-corporate-green/90">
                          طلب الخدمة الآن
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                        >
                          استشارة مجانية
                          <Phone className="mr-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">لماذا تختارنا؟</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مميزات تجعلنا الخيار الأول في مجال التحكيم الرياضي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-corporate-green/10 text-corporate-green">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-corporate-green mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Custom Services */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-corporate-green mb-6 md:text-4xl">خدمات مخصصة</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              هل تحتاج إلى خدمة مخصصة أو استشارة قانونية متخصصة؟ فريقنا جاهز لتقديم حلول مبتكرة تناسب احتياجاتك الخاصة
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-corporate-green mx-auto mb-3" />
                  <h3 className="font-bold text-corporate-green mb-2">اتصل بنا</h3>
                  <p className="text-sm text-muted-foreground mb-3">للاستفسارات العاجلة</p>
                  <p className="text-sm font-medium">+966 11 123 4567</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-corporate-green mx-auto mb-3" />
                  <h3 className="font-bold text-corporate-green mb-2">راسلنا</h3>
                  <p className="text-sm text-muted-foreground mb-3">للاستفسارات التفصيلية</p>
                  <p className="text-sm font-medium">info@sports-arbitration.sa</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-corporate-green mx-auto mb-3" />
                  <h3 className="font-bold text-corporate-green mb-2">احجز موعد</h3>
                  <p className="text-sm text-muted-foreground mb-3">للاستشارات المجانية</p>
                  <Button size="sm" className="bg-corporate-green hover:bg-corporate-green/90 text-xs px-4 py-1">
                    احجز الآن
                  </Button>
                </CardContent>
              </Card>
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
