import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { CTASection } from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, CheckCircle, Users, Clock, Shield, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "التدريب والتأهيل | مركز التحكيم الرياضي",
  description: "برامج تدريبية متخصصة في القانون الرياضي والتحكيم مع شهادات معترف بها محلياً ودولياً",
}

export default function TrainingPage() {
  const beneficiaries = [
    "المحامين والمستشارين القانونيين",
    "المحكمين والوسطاء الجدد",
    "موظفي الاتحادات الرياضية",
    "إداريي الأندية الرياضية",
    "الطلاب والباحثين",
    "المهتمين بالقانون الرياضي",
  ]

  const features = [
    {
      title: "برامج معتمدة",
      description: "معترف بها من المنظمات الدولية",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "مدربون خبراء",
      description: "نخبة من المتخصصين في القانون الرياضي",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "تدريب عملي",
      description: "تطبيق على قضايا حقيقية",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "مرونة في المواعيد",
      description: "برامج مسائية ونهاية الأسبوع",
      icon: <Clock className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="التدريب والتأهيل"
        description="برامج تدريبية شاملة لإعداد جيل جديد من المتخصصين في القانون الرياضي والتحكيم"
      />

      {/* Service Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-corporate-green mb-2">برامج التدريب المتخصصة</h2>
                  <Badge className="bg-corporate-green/10 text-corporate-green">شهادات معتمدة</Badge>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                نقدم برامج تدريبية شاملة ومتخصصة في مجال القانون الرياضي والتحكيم، مصممة لإعداد كوادر مؤهلة قادرة على
                التعامل مع تعقيدات النزاعات الرياضية الحديثة. برامجنا معتمدة من المنظمات الدولية وتجمع بين النظرية
                والتطبيق العملي.
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
                src="/professional-training-session-with-instructor-teac.jpg"
                alt="برامج التدريب والتأهيل"
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
                برامج التدريب مصممة لمختلف المستويات والتخصصات في القطاع الرياضي
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
              <p className="text-lg text-muted-foreground">رحلة تعليمية منظمة للحصول على أفضل النتائج</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                "التسجيل في البرنامج التدريبي المناسب",
                "حضور المحاضرات النظرية والتفاعلية",
                "التطبيق العملي والتدريب الميداني",
                "الاختبار النهائي والحصول على الشهادة",
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
        description="انضم إلى برامجنا التدريبية المتخصصة واحصل على شهادة معتمدة في القانون الرياضي والتحكيم"
        primaryButton={{
          text: "اطلب هذه الخدمة الآن",
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
