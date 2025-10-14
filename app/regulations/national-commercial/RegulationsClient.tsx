"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Search, Calendar, FileText, Filter, Eye } from "lucide-react"

const AREA = "national-commercial"

const CATEGORY_OPTIONS = [
  "جميع الفئات",
  "لوائح تجارية",
  "قوانين الشركات",
  "الاستثمار الرياضي",
  "الرعاية والإعلان",
  "الضرائب والرسوم",
  "حقوق البث",
  "التمويل والحوكمة",
]

export default function RegulationsClient() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const [q, setQ] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORY_OPTIONS[0])

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set("area", AREA)
    params.set("limit", "100")
    if (q.trim()) params.set("q", q.trim())
    if (activeCategory && activeCategory !== CATEGORY_OPTIONS[0]) params.set("category", activeCategory)
    return params.toString()
  }, [q, activeCategory])

  const { data, isLoading } = useSWR<{ data: any[]; meta: any }>(`/api/regulations?${queryString}`, fetcher)
  const documents = data?.data ?? []

  return (
    <>
      {/* Search and Filter */}
      <section className="py-8 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="البحث في الوثائق..."
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  تصفية
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {CATEGORY_OPTIONS.map((category, index) => (
                <Badge
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={index === 0 && activeCategory === CATEGORY_OPTIONS[0] ? "default" : (activeCategory === category ? "default" : "outline")}
                  className={
                    activeCategory === category
                      ? "bg-corporate-green text-white hover:bg-corporate-green/90 cursor-pointer"
                      : "border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white cursor-pointer bg-transparent"
                  }
                >
                  {category}
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
              <h2 className="text-2xl font-bold text-corporate-green">الوثائق المتاحة ({isLoading ? 0 : documents.length})</h2>
              <div className="text-sm text-muted-foreground">مرتبة حسب تاريخ النشر</div>
            </div>

            <div className="space-y-4">
              {isLoading && (
                <div className="text-sm text-muted-foreground">جاري التحميل...</div>
              )}
              {!isLoading && documents.length === 0 && (
                <div className="text-sm text-muted-foreground">لا توجد نتائج مطابقة</div>
              )}
              {documents.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-corporate-green">{doc.title}</h3>
                        </div>
                        {doc.description && (
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{doc.description}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{doc.category || "وثيقة"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{doc.date || ""}</span>
                          </div>
                          <span>•</span>
                          {typeof doc.pages === 'number' && <span>{doc.pages} صفحة</span>}
                          <span>•</span>
                          <span>{doc.size || ""}</span>
                          <span>•</span>
                          <span>{doc.language || ""}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                        {doc.url && (
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="contents">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              معاينة
                            </Button>
                          </a>
                        )}
                        <a href={doc.url || "#"} download className="contents">
                          <Button size="sm" className="bg-corporate-green hover:bg-corporate-green/90">
                            <Download className="mr-2 h-4 w-4" />
                            تحميل PDF
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More (placeholder) */}
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                onClick={() => { /* pagination could be added here */ }}
              >
                تحميل المزيد من الوثائق
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
