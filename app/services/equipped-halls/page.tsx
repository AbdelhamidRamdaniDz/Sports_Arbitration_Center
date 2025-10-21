import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { CTASection } from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, CheckCircle, Users, Clock, Shield, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "القاعات المجهزة | مركز التحكيم الرياضي",
  description: "قاعات حديثة ومجهزة بالكامل لجلسات التحكيم والوساطة مع تجهيزات تقنية متطورة",
}

export default function EquippedHallsPage() {
  const beneficiaries = [
    "مراكز التحكيم والوساطة",
    "المحامين والمستشارين",
    "الشركات والمؤسسات",
    "الاتحادات الرياضية",
    "المنظمات الدولية",
    "الجهات الحكومية",
  ]

  const features = [
    {
      title: "تجهيزات حديثة",
      description: "تقنيات متطورة وأنظمة صوتية عالية الجودة",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "خصوصية تامة",
      description: "أمان عالي وسرية مطلقة",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "مواقع متميزة",
      description: "في قلب المدن الرئيسية",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "حجز مرن",
      description: "إمكانية الحجز حسب الحاجة",
      icon: <Clock className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="القاعات المجهزة"
        description="قاعات احترافية مجهزة بأحدث التقنيات لضمان أفضل بيئة لجلسات التحكيم والوساطة"
        backgroundImage="/hero-background.webp"
      />

      {/* Service Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white">
                  <Building className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-corporate-green mb-2">قاعات مجهزة بأحدث التقنيات</h2>
                  <Badge className="bg-corporate-green/10 text-corporate-green">تجهيزات متطورة</Badge>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                نوفر قاعات حديثة ومجهزة بالكامل لاستضافة جلسات التحكيم والوساطة والاجتماعات القانونية. قاعاتنا مصممة
                لتوفير بيئة مهنية ومريحة مع أحدث التجهيزات التقنية والأنظمة الصوتية والمرئية عالية الجودة لضمان سير
                الجلسات بأفضل شكل ممكن.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-light-grey rounded-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-corporate-green/10 text-corporate-green">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-corporate-green">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="/modern-equipped-conference-room-with-professional-.jpg"
                alt="القاعات المجهزة للتحكيم"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-corporate-green/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this service for */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">لمن هذه الخدمة؟</h2>
              <p className="text-lg text-muted-foreground">
                القاعات المجهزة متاحة لجميع الجهات التي تحتاج لبيئة مهنية للاجتماعات القانونية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficiaries.map((beneficiary, index) => (
                <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-corporate-green" />
                    </div>
                    <p className="font-medium text-corporate-green">{beneficiary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">خطوات العمل</h2>
              <p className="text-lg text-muted-foreground">عملية بسيطة لحجز القاعة المناسبة لاحتياجاتك</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                "طلب حجز القاعة المناسبة لاحتياجاتك",
                "تحديد التجهيزات والخدمات المطلوبة",
                "تأكيد الحجز وإتمام عملية الدفع",
                "استخدام القاعة مع الدعم التقني",
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white text-xl font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="هل أنت جاهز للبدء؟"
        description="احجز قاعة مجهزة بأحدث التقنيات لضمان نجاح جلساتك القانونية والمهنية"
        primaryButton={{
          text: "اطلب هذه الخدمة الآن",
          href: "/forms",
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
