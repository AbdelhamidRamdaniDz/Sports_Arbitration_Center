import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Handshake, Clock, Users, ArrowLeft, Download, Info } from "lucide-react"

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

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-200 bg-green-50"
      case "blue":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="النماذج الإلكترونية"
        description="نماذج إلكترونية متطورة وسهلة الاستخدام لتقديم طلبات التحكيم والوساطة الرياضية"
      />

      {/* Forms Cards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">النماذج المتاحة</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اختر النموذج المناسب لنوع الخدمة التي تحتاجها
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {forms.map((form, index) => (
              <Card
                key={index}
                className={`border-2 ${getColorClasses(form.color)} bg-white hover:shadow-xl transition-all duration-300`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white">
                      {form.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-corporate-green mb-2">{form.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{form.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-corporate-green mb-3">مميزات النموذج:</h4>
                    <ul className="space-y-2">
                      {form.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-corporate-green rounded-full flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-light-grey p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-corporate-green" />
                        <span className="text-sm font-medium text-corporate-green">الوقت المطلوب</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{form.estimatedTime}</p>
                    </div>

                    <div className="bg-light-grey p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-corporate-green" />
                        <span className="text-sm font-medium text-corporate-green">رسوم التقديم</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">{form.fee}</Badge>
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h4 className="font-semibold text-corporate-green mb-3">الوثائق المطلوبة:</h4>
                    <ul className="space-y-1">
                      {form.requiredDocs.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 bg-corporate-green rounded-full flex-shrink-0" />
                          <span className="text-muted-foreground">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button asChild className="w-full bg-corporate-green hover:bg-corporate-green/90">
                      <Link href={form.href}>
                        ابدأ التقديم الآن
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      تحميل النموذج PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">كيفية التقديم</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">خطوات بسيطة وواضحة لتقديم طلبك بسهولة</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="text-center bg-white border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-corporate-green text-white text-xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="font-bold text-corporate-green mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Info className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-4">معلومات مهمة</h3>
                    <div className="space-y-3 text-blue-800">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                        <p className="text-sm">
                          <strong>الدقة في البيانات:</strong> تأكد من صحة جميع المعلومات المدخلة لتجنب التأخير في
                          المعالجة
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                        <p className="text-sm">
                          <strong>الوثائق المطلوبة:</strong> تأكد من إرفاق جميع الوثائق المطلوبة بصيغة واضحة ومقروءة
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                        <p className="text-sm">
                          <strong>المتابعة:</strong> ستتلقى رسالة تأكيد ورقم مرجعي لتتبع حالة طلبك
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                        <p className="text-sm">
                          <strong>الدعم:</strong> فريق الدعم متاح للمساعدة في حالة وجود أي استفسارات
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-corporate-green mb-4">تحتاج مساعدة؟</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              فريق الدعم جاهز لمساعدتك في تعبئة النماذج والإجابة على استفساراتك
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-corporate-green hover:bg-corporate-green/90">
                <Users className="mr-2 h-4 w-4" />
                تواصل مع الدعم
              </Button>
              <Button
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
              >
                دليل المستخدم
                <Download className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
