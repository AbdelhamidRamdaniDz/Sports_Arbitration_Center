import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Search, Calendar, FileText, Filter, Eye, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "التشريعات الدولية | مركز التحكيم الرياضي",
  description: "المعاهدات والاتفاقيات الدولية والقوانين المعتمدة من المنظمات الرياضية العالمية",
}

export default function InternationalRegulationsPage() {
  const documents = [
    {
      title: "قوانين الفيفا 2024",
      description: "آخر تحديثات قوانين الاتحاد الدولي لكرة القدم المتعلقة بانتقال اللاعبين والتحكيم",
      category: "FIFA",
      date: "ديسمبر 2024",
      pages: 156,
      size: "4.2 MB",
      language: "عربي/إنجليزي",
      isNew: true,
      organization: "FIFA",
    },
    {
      title: "لوائح المحكمة الرياضية الدولية (CAS)",
      description: "القوانين واللوائح المنظمة لعمل المحكمة الرياضية الدولية",
      category: "CAS",
      date: "نوفمبر 2024",
      pages: 89,
      size: "3.1 MB",
      language: "إنجليزي/فرنسي",
      isNew: false,
      organization: "CAS",
    },
    {
      title: "اتفاقيات التحكيم الدولي",
      description: "المعاهدات والاتفاقيات الدولية المتعلقة بالتحكيم في النزاعات الرياضية",
      category: "التحكيم الدولي",
      date: "أكتوبر 2024",
      pages: 67,
      size: "2.8 MB",
      language: "متعدد اللغات",
      isNew: false,
      organization: "IOC",
    },
    {
      title: "معايير الحوكمة الرياضية الدولية",
      description: "المعايير والمبادئ الدولية للحوكمة والشفافية في المؤسسات الرياضية",
      category: "الحوكمة",
      date: "سبتمبر 2024",
      pages: 45,
      size: "2.0 MB",
      language: "إنجليزي",
      isNew: false,
      organization: "IOC",
    },
    {
      title: "قوانين الاتحاد الآسيوي لكرة القدم",
      description: "اللوائح والقوانين المعتمدة من الاتحاد الآسيوي لكرة القدم",
      category: "AFC",
      date: "أغسطس 2024",
      pages: 78,
      size: "2.9 MB",
      language: "عربي/إنجليزي",
      isNew: false,
      organization: "AFC",
    },
    {
      title: "اتفاقية مكافحة المنشطات العالمية",
      description: "الاتفاقية الدولية لمكافحة المنشطات في الرياضة (WADA)",
      category: "مكافحة المنشطات",
      date: "يوليو 2024",
      pages: 92,
      size: "3.3 MB",
      language: "متعدد اللغات",
      isNew: false,
      organization: "WADA",
    },
    {
      title: "قوانين الاتحاد الدولي لألعاب القوى",
      description: "القوانين والتشريعات المعتمدة من الاتحاد الدولي لألعاب القوى",
      category: "World Athletics",
      date: "يونيو 2024",
      pages: 134,
      size: "3.8 MB",
      language: "إنجليزي",
      isNew: false,
      organization: "World Athletics",
    },
  ]

  const organizations = ["جميع المنظمات", "FIFA", "CAS", "IOC", "AFC", "WADA", "World Athletics"]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="التشريعات الدولية"
        description="المعاهدات والاتفاقيات الدولية والقوانين المعتمدة من المنظمات الرياضية العالمية"
      />

      {/* Search and Filter */}
      <section className="py-8 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="البحث في التشريعات الدولية..." className="pr-10" />
              </div>
              <Button
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
              >
                <Filter className="mr-2 h-4 w-4" />
                تصفية
              </Button>
            </div>

            {/* Organizations Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              {organizations.map((org, index) => (
                <Badge
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className={
                    index === 0
                      ? "bg-corporate-green text-white hover:bg-corporate-green/90 cursor-pointer"
                      : "border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white cursor-pointer bg-transparent"
                  }
                >
                  {org}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents List */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-corporate-green">الوثائق المتاحة ({documents.length})</h2>
              <div className="text-sm text-muted-foreground">مرتبة حسب تاريخ النشر</div>
            </div>

            <div className="space-y-4">
              {documents.map((doc, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-corporate-green">{doc.title}</h3>
                          {doc.isNew && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">جديد</Badge>
                          )}
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                            <Globe className="mr-1 h-3 w-3" />
                            {doc.organization}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{doc.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{doc.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{doc.date}</span>
                          </div>
                          <span>•</span>
                          <span>{doc.pages} صفحة</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.language}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          معاينة
                        </Button>
                        <Button size="sm" className="bg-corporate-green hover:bg-corporate-green/90">
                          <Download className="mr-2 h-4 w-4" />
                          تحميل PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
