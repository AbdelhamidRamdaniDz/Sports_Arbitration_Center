import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Calculator, Clock, Shield, TrendingUp, ArrowLeft, Lock, Eye, Play } from "lucide-react"

export const metadata: Metadata = {
  title: "النزاعات والأحكام | مركز التحكيم الرياضي",
  description: "أدوات متطورة لتتبع القضايا، استعراض أحكام التحكيم، وحساب تكاليف النزاعات الرياضية",
}

export default function DisputesPage() {
  const tools = [
    {
      title: "تتبع القضايا",
      description: "تابع حالة قضيتك وآخر التطورات في الوقت الفعلي مع نظام التتبع المتطور",
      icon: <Search className="h-8 w-8" />,
      href: "/disputes/tracking",
      features: ["تتبع مباشر للقضية", "إشعارات فورية", "تحديثات الحالة", "تاريخ المراسلات", "المواعيد القادمة"],
      requiresLogin: true,
      color: "blue",
    },
    {
      title: "ملخص أحكام التحكيم",
      description: "استعرض قاعدة بيانات شاملة لأحكام التحكيم السابقة والسوابق القضائية",
      icon: <FileText className="h-8 w-8" />,
      href: "/disputes/rulings",
      features: ["قاعدة بيانات شاملة", "بحث متقدم", "تصنيف حسب النوع", "تحليل الاتجاهات", "تحميل الوثائق"],
      requiresLogin: false,
      color: "green",
    },
    {
      title: "حاسبة النزاعات",
      description: "احسب التكلفة المتوقعة والوقت اللازم لحل النزاع بناءً على نوع القضية وتعقيدها",
      icon: <Calculator className="h-8 w-8" />,
      href: "/disputes/calculator",
      features: ["حساب التكلفة", "تقدير المدة الزمنية", "مقارنة الخيارات", "تقرير مفصل", "توصيات مخصصة"],
      requiresLogin: false,
      color: "orange",
    },
  ]

  const recentRulings = [
    {
      id: "ARB-2024-001",
      title: "نزاع عقد لاعب مع نادي الهلال",
      category: "عقود اللاعبين",
      date: "15 ديسمبر 2024",
      status: "مكتمل",
      summary: "حكم لصالح اللاعب بدفع المستحقات المالية المتأخرة",
      amount: "500,000 ريال",
    },
    {
      id: "ARB-2024-002",
      title: "نزاع انتقال لاعب دولي",
      category: "الانتقالات",
      date: "10 ديسمبر 2024",
      status: "مكتمل",
      summary: "تسوية ودية بين الأندية المعنية",
      amount: "1,200,000 ريال",
    },
    {
      id: "ARB-2024-003",
      title: "نزاع تجاري بين راعي ونادي",
      category: "الرعاية التجارية",
      date: "5 ديسمبر 2024",
      status: "مكتمل",
      summary: "إلغاء العقد مع تعويض جزئي",
      amount: "800,000 ريال",
    },
  ]

  const stats = [
    { label: "القضايا المحلولة", value: "500+", icon: <Shield className="h-6 w-6" /> },
    { label: "متوسط وقت الحل", value: "45 يوم", icon: <Clock className="h-6 w-6" /> },
    { label: "معدل النجاح", value: "98%", icon: <TrendingUp className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="النزاعات والأحكام"
        description="أدوات متطورة وشاملة لإدارة النزاعات الرياضية، تتبع القضايا، واستعراض الأحكام السابقة"
      />

      {/* Stats Section */}
      <section className="py-12 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-corporate-green/10 text-corporate-green">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-corporate-green mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">أدوات إدارة النزاعات</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مجموعة متكاملة من الأدوات الرقمية المتطورة لخدمة جميع أطراف النزاع
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-corporate-green bg-white"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green/10 text-corporate-green group-hover:bg-corporate-green group-hover:text-white transition-colors">
                      {tool.icon}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-xl text-corporate-green group-hover:text-corporate-green/80 transition-colors">
                      {tool.title}
                    </CardTitle>
                    {tool.requiresLogin && (
                      <Lock className="h-4 w-4 text-muted-foreground" title="يتطلب تسجيل الدخول" />
                    )}
                  </div>
                  <CardDescription className="text-base leading-relaxed">{tool.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-corporate-green">المميزات الرئيسية:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-corporate-green rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    asChild
                    className="w-full group-hover:bg-corporate-green group-hover:text-white transition-colors bg-corporate-green/10 text-corporate-green hover:bg-corporate-green hover:text-white"
                  >
                    <Link href={tool.href}>
                      {tool.requiresLogin ? "تسجيل الدخول للوصول" : "ابدأ الآن"}
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Rulings Preview */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">أحكام حديثة</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              استعرض آخر الأحكام الصادرة من مركز التحكيم الرياضي
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {recentRulings.map((ruling, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-corporate-green/10 text-corporate-green text-xs">{ruling.id}</Badge>
                        <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 text-xs">
                          {ruling.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-corporate-green mb-1">{ruling.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>{ruling.category}</span>
                        <span>•</span>
                        <span>{ruling.date}</span>
                        <span>•</span>
                        <span className="font-medium text-corporate-green">{ruling.amount}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{ruling.summary}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
            >
              <Link href="/disputes/rulings">
                عرض جميع الأحكام
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">كيف تعمل عملية التحكيم؟</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              خطوات واضحة ومبسطة لفهم عملية التحكيم الرياضي
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white text-2xl font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-corporate-green mb-2">تقديم الطلب</h3>
                <p className="text-muted-foreground">
                  قدم طلب التحكيم مع الوثائق المطلوبة عبر النماذج الرقمية أو زيارة المركز
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white text-2xl font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold text-corporate-green mb-2">تعيين المحكم</h3>
                <p className="text-muted-foreground">يتم تعيين محكم متخصص حسب نوع النزاع وتحديد جدولة الجلسات</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white text-2xl font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-corporate-green mb-2">إصدار الحكم</h3>
                <p className="text-muted-foreground">بعد دراسة القضية وسماع الأطراف، يصدر الحكم النهائي الملزم</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-corporate-green hover:bg-corporate-green/90 text-lg px-8 py-3">
              <Link href="/forms">
                ابدأ عملية التحكيم
                <Play className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
