import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Video, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function MediaCenterPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="المركز الإعلامي"
        description="آخر الأخبار والفعاليات والموارد الإعلامية لمركز التحكيم الرياضي"
      />

      <div className="container mx-auto px-4 py-12">
        {/* News Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-corporate-green">الأخبار</h2>
            <Button variant="outline" asChild>
              <Link href="/media-center/news">عرض جميع الأخبار</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>15 ديسمبر 2024</span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    مركز التحكيم الرياضي يوقع اتفاقية شراكة مع الاتحاد السعودي لكرة القدم
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    في خطوة مهمة لتطوير قطاع التحكيم الرياضي، وقع مركز التحكيم الرياضي اتفاقية شراكة استراتيجية...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto text-corporate-green">
                    اقرأ المزيد ←
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Press Releases */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-corporate-green">البيانات الصحفية</h2>
            <Button variant="outline" asChild>
              <Link href="/media-center/press-releases">عرض جميع البيانات</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">بيان صحفي</Badge>
                        <span className="text-sm text-muted-foreground">10 ديسمبر 2024</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">إطلاق منصة التحكيم الإلكتروني الجديدة</h3>
                      <p className="text-muted-foreground mb-4">
                        يعلن مركز التحكيم الرياضي عن إطلاق منصة التحكيم الإلكتروني الجديدة التي تهدف إلى تسهيل...
                      </p>
                      <Button variant="ghost" className="p-0 h-auto text-corporate-green">
                        تحميل البيان الكامل ←
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Media Resources */}
        <section>
          <h2 className="text-3xl font-bold text-corporate-green mb-8">الموارد الإعلامية</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green mx-auto mb-4">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">الصور</h3>
                <p className="text-sm text-muted-foreground mb-4">صور عالية الجودة للفعاليات والمرافق</p>
                <Button variant="outline" size="sm">
                  تصفح الصور
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green mx-auto mb-4">
                  <Video className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">الفيديوهات</h3>
                <p className="text-sm text-muted-foreground mb-4">مقاطع فيديو توضيحية وتسجيلات الفعاليات</p>
                <Button variant="outline" size="sm">
                  مشاهدة الفيديوهات
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green mx-auto mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">الشعارات</h3>
                <p className="text-sm text-muted-foreground mb-4">شعارات المركز بصيغ مختلفة</p>
                <Button variant="outline" size="sm">
                  تحميل الشعارات
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green mx-auto mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">التقارير</h3>
                <p className="text-sm text-muted-foreground mb-4">التقارير السنوية والإحصائيات</p>
                <Button variant="outline" size="sm">
                  تحميل التقارير
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
