import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Calendar } from "lucide-react"

export default function RulingsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="ملخص أحكام التحكيم" description="تصفح وابحث في قاعدة بيانات أحكام التحكيم الرياضي" />

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              البحث والتصفية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input placeholder="ابحث في الأحكام..." />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="نوع الرياضة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">كرة القدم</SelectItem>
                  <SelectItem value="basketball">كرة السلة</SelectItem>
                  <SelectItem value="volleyball">كرة الطائرة</SelectItem>
                  <SelectItem value="tennis">التنس</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-corporate-green mb-2">247</div>
              <div className="text-sm text-muted-foreground">إجمالي الأحكام</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-corporate-green mb-2">89</div>
              <div className="text-sm text-muted-foreground">أحكام 2024</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-corporate-green mb-2">15</div>
              <div className="text-sm text-muted-foreground">أنواع الرياضات</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-corporate-green mb-2">95%</div>
              <div className="text-sm text-muted-foreground">معدل التنفيذ</div>
            </CardContent>
          </Card>
        </div>

        {/* Rulings List */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <Card key={item} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">كرة القدم</Badge>
                      <Badge variant="outline">2024</Badge>
                      <span className="text-sm text-muted-foreground">
                        القضية رقم: SAC-2024-{item.toString().padStart(3, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">نزاع حول انتقال لاعب بين ناديين سعوديين</h3>
                    <p className="text-muted-foreground mb-4">
                      قضية تتعلق بانتقال لاعب كرة قدم من نادي إلى آخر وخلاف حول المستحقات المالية والشروط التعاقدية...
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>15 نوفمبر 2024</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      تحميل الحكم
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">المحكم الرئيسي:</span>
                      <span className="text-muted-foreground mr-2">د. أحمد محمد السعيد</span>
                    </div>
                    <div>
                      <span className="font-medium">نوع النزاع:</span>
                      <span className="text-muted-foreground mr-2">مالي - تعاقدي</span>
                    </div>
                    <div>
                      <span className="font-medium">النتيجة:</span>
                      <span className="text-green-600 mr-2">تم التسوية</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="outline" disabled>
            السابق
          </Button>
          <Button variant="outline" className="bg-corporate-green text-white">
            1
          </Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">التالي</Button>
        </div>
      </div>
    </div>
  )
}
