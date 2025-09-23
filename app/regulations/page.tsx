import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Globe, Building, Scale, ArrowLeft, Download, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "اللوائح والتشريعات | مركز التحكيم الرياضي",
  description: "مجموعة شاملة من التشريعات الرياضية الوطنية والتجارية والدولية",
}

export default function RegulationsPage() {
  const regulationCategories = [
    {
      title: "التشريعات الرياضية الوطنية",
      description: "مجموعة شاملة من القوانين واللوائح الرياضية المعتمدة في المملكة العربية السعودية",
      icon: <Building className="h-8 w-8" />,
      href: "/regulations/national-sports",
      documentCount: 25,
      lastUpdated: "ديسمبر 2024",
      highlights: [
        "قانون الرياضة السعودي الجديد",
        "لوائح الاتحادات الرياضية",
        "أنظمة الأندية المحترفة",
        "قوانين مكافحة المنشطات",
      ],
      color: "green",
    },
    {
      title: "التشريعات التجارية الوطنية",
      description: "القوانين التجارية والمالية المتعلقة بالأنشطة الرياضية والاستثمار في القطاع الرياضي",
      icon: <Scale className="h-8 w-8" />,
      href: "/regulations/national-commercial",
      documentCount: 18,
      lastUpdated: "نوفمبر 2024",
      highlights: ["قانون الشركات الرياضية", "أنظمة الاستثمار الرياضي", "لوائح الرعاية التجارية", "قوانين حقوق البث"],
      color: "blue",
    },
    {
      title: "التشريعات الدولية",
      description: "المعاهدات والاتفاقيات الدولية والقوانين المعتمدة من المنظمات الرياضية العالمية",
      icon: <Globe className="h-8 w-8" />,
      href: "/regulations/international",
      documentCount: 32,
      lastUpdated: "ديسمبر 2024",
      highlights: [
        "قوانين الفيفا والاتحاد الآسيوي",
        "لوائح المحكمة الرياضية الدولية",
        "اتفاقيات التحكيم الدولي",
        "معايير الحوكمة الرياضية",
      ],
      color: "purple",
    },
  ]

  const recentUpdates = [
    {
      title: "تحديث قانون الرياضة السعودي",
      category: "التشريعات الوطنية",
      date: "15 ديسمبر 2024",
      description: "تحديثات جديدة على قانون الرياضة تشمل أحكام الاحتراف والاستثمار",
      type: "تحديث",
    },
    {
      title: "لوائح جديدة للأندية المحترفة",
      category: "التشريعات الرياضية",
      date: "10 ديسمبر 2024",
      description: "إصدار لوائح جديدة تنظم عمل الأندية المحترفة والحوكمة المالية",
      type: "جديد",
    },
    {
      title: "تحديث قوانين الفيفا 2024",
      category: "التشريعات الدولية",
      date: "5 ديسمبر 2024",
      description: "آخر تحديثات قوانين الفيفا المتعلقة بانتقال اللاعبين",
      type: "تحديث",
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: "text-green-600",
        }
      case "blue":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: "text-blue-600",
        }
      case "purple":
        return {
          bg: "bg-purple-50",
          border: "border-purple-200",
          text: "text-purple-800",
          icon: "text-purple-600",
        }
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-800",
          icon: "text-gray-600",
        }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="اللوائح والتشريعات"
        description="مجموعة شاملة من التشريعات والقوانين الرياضية المحلية والدولية المتاحة للتحميل والمراجعة"
      />

      {/* Main Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">فئات التشريعات</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              استعرض وحمل التشريعات والقوانين المنظمة للأنشطة الرياضية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {regulationCategories.map((category, index) => {
              const colors = getColorClasses(category.color)
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-corporate-green"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full ${colors.bg} ${colors.icon} group-hover:bg-corporate-green group-hover:text-white transition-colors`}
                      >
                        {category.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-corporate-green group-hover:text-corporate-green/80 transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-corporate-green" />
                        <span className="text-muted-foreground">{category.documentCount} وثيقة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-corporate-green" />
                        <span className="text-muted-foreground">{category.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-corporate-green">أهم الوثائق:</h4>
                      <ul className="space-y-1">
                        {category.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-corporate-green rounded-full flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      asChild
                      className="w-full group-hover:bg-corporate-green group-hover:text-white transition-colors bg-corporate-green/10 text-corporate-green hover:bg-corporate-green hover:text-white"
                    >
                      <Link href={category.href}>
                        استعراض الوثائق
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">آخر التحديثات</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              تابع آخر التحديثات والإضافات على التشريعات والقوانين
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {recentUpdates.map((update, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          className={
                            update.type === "جديد"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-blue-100 text-blue-800 border-blue-200"
                          }
                        >
                          {update.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{update.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-corporate-green mb-1">{update.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{update.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{update.date}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">كيفية استخدام الوثائق</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              إرشادات مهمة لاستخدام والاستفادة من التشريعات المتاحة
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-corporate-green mb-2">اختر الفئة المناسبة</h3>
              <p className="text-muted-foreground">حدد نوع التشريع المطلوب حسب طبيعة القضية أو الاستفسار</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-corporate-green mb-2">استعرض الوثائق</h3>
              <p className="text-muted-foreground">تصفح قائمة الوثائق المتاحة واقرأ الوصف لكل وثيقة</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-corporate-green mb-2">حمل واستخدم</h3>
              <p className="text-muted-foreground">حمل الوثائق بصيغة PDF واستخدمها كمرجع قانوني</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="border-yellow-200 bg-yellow-50 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-900 mb-2">تنبيه قانوني مهم</p>
                    <p className="text-yellow-800">
                      جميع الوثائق المتاحة هي للاطلاع والمرجعية فقط. للحصول على استشارة قانونية مخصصة، يرجى التواصل مع
                      المركز أو أحد المحامين المعتمدين.
                    </p>
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
