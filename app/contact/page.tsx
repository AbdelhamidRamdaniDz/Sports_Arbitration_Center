import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="تواصل معنا" description="نحن هنا لمساعدتك في جميع استفساراتك القانونية والرياضية" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-corporate-green mb-6">معلومات التواصل</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">الهاتف</h3>
                    <p className="text-muted-foreground">+966 11 123 4567</p>
                    <p className="text-muted-foreground">+966 11 123 4568</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                    <p className="text-muted-foreground">info@sports-arbitration.sa</p>
                    <p className="text-muted-foreground">support@sports-arbitration.sa</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">العنوان</h3>
                    <p className="text-muted-foreground">
                      شارع الملك فهد، حي العليا
                      <br />
                      الرياض 12211، المملكة العربية السعودية
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">ساعات العمل</h3>
                    <p className="text-muted-foreground">الأحد - الخميس: 8:00 ص - 6:00 م</p>
                    <p className="text-muted-foreground">الجمعة - السبت: مغلق</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>أرسل لنا رسالة</CardTitle>
              <CardDescription>سنقوم بالرد على استفسارك في أقرب وقت ممكن</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">الاسم الأول</Label>
                  <Input id="firstName" placeholder="أدخل اسمك الأول" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">اسم العائلة</Label>
                  <Input id="lastName" placeholder="أدخل اسم العائلة" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" placeholder="أدخل رقم هاتفك" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">موضوع الاستفسار</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر موضوع الاستفسار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arbitration">التحكيم</SelectItem>
                    <SelectItem value="mediation">الوساطة</SelectItem>
                    <SelectItem value="training">التدريب</SelectItem>
                    <SelectItem value="consultation">استشارة قانونية</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">الرسالة</Label>
                <Textarea id="message" placeholder="اكتب رسالتك هنا..." className="min-h-[120px]" />
              </div>

              <Button className="w-full bg-corporate-green hover:bg-corporate-green/90">إرسال الرسالة</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
