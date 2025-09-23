import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, Clock, DollarSign, FileText, TrendingUp, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "حاسبة النزاعات | مركز التحكيم الرياضي",
  description: "احسب التكلفة المتوقعة والوقت اللازم لحل النزاع الرياضي",
}

export default function DisputeCalculatorPage() {
  const disputeTypes = [
    {
      type: "عقود اللاعبين",
      estimatedCost: "15,000 - 50,000 ريال",
      estimatedTime: "30 - 60 يوم",
      complexity: "متوسط",
      description: "نزاعات متعلقة بعقود اللاعبين والمستحقات المالية",
    },
    {
      type: "الانتقالات الدولية",
      estimatedCost: "25,000 - 100,000 ريال",
      estimatedTime: "45 - 90 يوم",
      complexity: "عالي",
      description: "نزاعات انتقال اللاعبين بين الأندية المحلية والدولية",
    },
    {
      type: "الرعاية التجارية",
      estimatedCost: "20,000 - 75,000 ريال",
      estimatedTime: "35 - 70 يوم",
      complexity: "متوسط",
      description: "نزاعات عقود الرعاية والشراكات التجارية",
    },
    {
      type: "النزاعات الإدارية",
      estimatedCost: "10,000 - 40,000 ريال",
      estimatedTime: "20 - 45 يوم",
      complexity: "منخفض",
      description: "نزاعات إدارية داخل الأندية والاتحادات",
    },
    {
      type: "حقوق البث",
      estimatedCost: "30,000 - 150,000 ريال",
      estimatedTime: "60 - 120 يوم",
      complexity: "عالي جداً",
      description: "نزاعات حقوق البث التلفزيوني والرقمي",
    },
    {
      type: "التأديب الرياضي",
      estimatedCost: "8,000 - 25,000 ريال",
      estimatedTime: "15 - 30 يوم",
      complexity: "منخفض",
      description: "قضايا التأديب والعقوبات الرياضية",
    },
  ]

  const factors = [
    {
      title: "قيمة النزاع",
      description: "كلما زادت القيمة المالية للنزاع، زادت رسوم التحكيم",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "تعقيد القضية",
      description: "القضايا المعقدة تتطلب وقت أطول وخبرة أكثر تخصصاً",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "عدد الأطراف",
      description: "زيادة عدد الأطراف المتنازعة يؤثر على التكلفة والوقت",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "نوع التحكيم",
      description: "التحكيم السريع أقل تكلفة من التحكيم العادي",
      icon: <Clock className="h-5 w-5" />,
    },
  ]

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "منخفض":
        return "bg-green-100 text-green-800 border-green-200"
      case "متوسط":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "عالي":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "عالي جداً":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="حاسبة النزاعات"
        description="احسب التكلفة المتوقعة والوقت اللازم لحل النزاع بناءً على نوع القضية وتعقيدها"
      />

      {/* Calculator Tool */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-corporate-green/20 mb-8">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white">
                    <Calculator className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-corporate-green">حاسبة تكلفة التحكيم</CardTitle>
                <CardDescription className="text-base">
                  اختر نوع النزاع للحصول على تقدير أولي للتكلفة والوقت المطلوب
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Dispute Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {disputeTypes.map((dispute, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-corporate-green"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg text-corporate-green">{dispute.type}</CardTitle>
                      <Badge className={getComplexityColor(dispute.complexity)}>{dispute.complexity}</Badge>
                    </div>
                    <CardDescription className="text-sm">{dispute.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-light-grey rounded-lg">
                        <div className="flex justify-center mb-2">
                          <DollarSign className="h-5 w-5 text-corporate-green" />
                        </div>
                        <div className="text-sm font-medium text-corporate-green">التكلفة المتوقعة</div>
                        <div className="text-xs text-muted-foreground mt-1">{dispute.estimatedCost}</div>
                      </div>

                      <div className="text-center p-3 bg-light-grey rounded-lg">
                        <div className="flex justify-center mb-2">
                          <Clock className="h-5 w-5 text-corporate-green" />
                        </div>
                        <div className="text-sm font-medium text-corporate-green">الوقت المتوقع</div>
                        <div className="text-xs text-muted-foreground mt-1">{dispute.estimatedTime}</div>
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-corporate-green group-hover:text-white transition-colors bg-corporate-green/10 text-corporate-green hover:bg-corporate-green hover:text-white">
                      احسب التكلفة التفصيلية
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Factors Affecting Cost */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">العوامل المؤثرة على التكلفة</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              فهم العوامل التي تؤثر على تكلفة ووقت التحكيم
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {factors.map((factor, index) => (
              <Card key={index} className="bg-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-corporate-green/10 text-corporate-green flex-shrink-0">
                      {factor.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-corporate-green mb-2">{factor.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{factor.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">ملاحظة مهمة</h3>
                    <div className="text-sm text-blue-800 space-y-2">
                      <p>• التقديرات المعروضة هي تقديرات أولية وقد تختلف التكلفة الفعلية حسب تفاصيل كل قضية</p>
                      <p>• للحصول على تقدير دقيق، يرجى التواصل مع المركز أو تقديم استشارة مجانية</p>
                      <p>• جميع الرسوم تشمل رسوم التحكيم والخدمات الإدارية والقانونية</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
