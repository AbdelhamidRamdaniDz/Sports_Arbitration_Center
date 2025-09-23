import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LegalNoticesPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="الإشعارات القانونية" description="إشعارات قانونية مهمة وحقوق الملكية الفكرية" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>حقوق الطبع والنشر</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والشعارات والتصاميم، محمية بموجب قوانين
                حقوق الطبع والنشر في المملكة العربية السعودية والقوانين الدولية. لا يجوز نسخ أو توزيع أو نشر أي جزء من
                هذا المحتوى دون إذن كتابي مسبق من مركز التحكيم الرياضي.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>العلامات التجارية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "مركز التحكيم الرياضي" وشعار المركز هما علامتان تجاريتان مسجلتان. جميع العلامات التجارية الأخرى المذكورة
                في هذا الموقع هي ملك لأصحابها المعنيين.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إخلاء المسؤولية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                يُقدم المحتوى في هذا الموقع لأغراض إعلامية فقط ولا يشكل استشارة قانونية. لا يتحمل مركز التحكيم الرياضي أي
                مسؤولية عن:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>دقة أو اكتمال المعلومات المقدمة</li>
                <li>أي أضرار قد تنتج عن استخدام هذا الموقع</li>
                <li>انقطاع الخدمة أو الأخطاء التقنية</li>
                <li>محتوى المواقع الخارجية المرتبطة</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الروابط الخارجية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                قد يحتوي هذا الموقع على روابط لمواقع خارجية. هذه الروابط مقدمة للراحة فقط ولا تعني موافقة مركز التحكيم
                الرياضي على محتوى هذه المواقع. نحن غير مسؤولين عن محتوى أو سياسات الخصوصية للمواقع الخارجية.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الامتثال للقوانين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                يخضع هذا الموقع وجميع خدماته لقوانين المملكة العربية السعودية. أي نزاع قد ينشأ عن استخدام هذا الموقع
                يخضع لاختصاص المحاكم السعودية المختصة.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تحديث الإشعارات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                يحتفظ مركز التحكيم الرياضي بالحق في تحديث هذه الإشعارات القانونية في أي وقت دون إشعار مسبق. يُنصح بمراجعة
                هذه الصفحة بانتظام للاطلاع على أي تغييرات.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التواصل للشؤون القانونية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                لأي استفسارات قانونية أو مخاوف بشأن حقوق الطبع والنشر، يرجى التواصل معنا على:
              </p>
              <div className="mt-4 space-y-1">
                <p>البريد الإلكتروني: legal@sports-arbitration.sa</p>
                <p>الهاتف: +966 11 123 4567</p>
                <p>العنوان: شارع الملك فهد، حي العليا، الرياض 12211</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
