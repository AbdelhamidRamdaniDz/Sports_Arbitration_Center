import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Search, Calendar, FileText, Filter, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "التشريعات التجارية الوطنية | مركز التحكيم الرياضي",
  description: "القوانين التجارية والمالية المتعلقة بالأنشطة الرياضية والاستثمار في القطاع الرياضي",
}

export default function NationalCommercialRegulationsPage() {
  const documents = [
    {
      title: "قانون الشركات الرياضية",
      description: "القوانين المنظمة لتأسيس وإدارة الشركات الرياضية والاستثمار في القطاع",
      category: "قوانين الشركات",
      date: "نوفمبر 2024",
      pages: 38,
      size: "2.1 MB",
      language: "عربي",
      isNew: true,
    },
    {
      title: "أنظمة الاستثمار الرياضي",
      description: "اللوائح والأنظمة المنظمة للاستثمار في المشاريع والمنشآت الرياضية",
      category: "الاستثمار",
      date: "أكتوبر 2024",
      pages: 42,
      size: "2.3 MB",
      language: "عربي",
      isNew: false,
    },
    {
      title: "لوائح الرعاية التجارية",
      description: "القوانين المنظمة لعقود الرعاية والشراكات التجارية في المجال الرياضي",
      category: "الرعاية التجارية",
      date: "سبتمبر 2024",
      pages: 28,
      size: "1.6 MB",
      language: "عربي",
      isNew: false,
    },
    {
      title: "قوانين حقوق البث",
      description: "التشريعات المتعلقة بحقوق البث التلفزيوني والرقمي للأحداث الرياضية",
      category: "حقوق البث",
      date: "أغسطس 2024",
      pages: 35,
      size: "1.9 MB",
      language: "عربي/إنجليزي",
      isNew: false,
    },
    {
      title: "نظام التمويل الرياضي",
      description: "الأنظمة المنظمة لتمويل الأندية والمشاريع الرياضية",
      category: "التمويل",
      date: "يوليو 2024",
      pages: 31,
      size: "1.7 MB",
      language: "عربي",
      isNew: false,
    },
    {
      title: "لائحة الملكية الفكرية الرياضية",
      description: "القوانين المتعلقة بحماية الملكية الفكرية في المجال الرياضي",
      category: "الملكية الفكرية",
      date: "يونيو 2024",
      pages: 26,
      size: "1.4 MB",
      language: "عربي",
      isNew: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="التشريعات التجارية الوطنية"
        description="القوانين التجارية والمالية المتعلقة بالأنشطة الرياضية والاستثمار في القطاع الرياضي"
      />

      {/* Search and Filter */}
      <section className="py-8 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="البحث في الوثائق التجارية..." className="pr-10" />
              </div>
              <Button
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
              >
                <Filter className="mr-2 h-4 w-4" />
                تصفية
              </Button>
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
