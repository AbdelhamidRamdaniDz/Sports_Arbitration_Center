import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="سياسة الخصوصية" description="نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>مقدمة</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p>
                يلتزم مركز التحكيم الرياضي بحماية خصوصية المستخدمين وضمان أمان بياناتهم الشخصية. تحدد هذه السياسة كيفية
                جمع واستخدام وحماية المعلومات التي نحصل عليها من خلال موقعنا الإلكتروني وخدماتنا.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المعلومات التي نجمعها</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">المعلومات الشخصية</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>الاسم الكامل</li>
                  <li>عنوان البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>العنوان</li>
                  <li>معلومات الهوية عند الضرورة</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">معلومات الاستخدام</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>عنوان IP</li>
                  <li>نوع المتصفح</li>
                  <li>صفحات الموقع المزارة</li>
                  <li>وقت ومدة الزيارة</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>كيفية استخدام المعلومات</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>تقديم الخدمات المطلوبة</li>
                <li>التواصل معك بخصوص طلباتك</li>
                <li>تحسين جودة خدماتنا</li>
                <li>إرسال التحديثات والإشعارات المهمة</li>
                <li>الامتثال للمتطلبات القانونية</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>حماية المعلومات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                نتخذ إجراءات أمنية صارمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الكشف. نستخدم
                تقنيات التشفير المتقدمة وأنظمة الحماية الحديثة لضمان أمان بياناتك.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>حقوقك</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>الحق في الوصول إلى بياناتك الشخصية</li>
                <li>الحق في تصحيح البيانات غير الصحيحة</li>
                <li>الحق في حذف بياناتك</li>
                <li>الحق في تقييد معالجة بياناتك</li>
                <li>الحق في نقل بياناتك</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تحديث السياسة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إشعارك بأي تغييرات مهمة عبر البريد الإلكتروني أو من خلال
                إشعار على موقعنا.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التواصل معنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على:
              </p>
              <div className="mt-4 space-y-1">
                <p>البريد الإلكتروني: privacy@sports-arbitration.sa</p>
                <p>الهاتف: +966 11 123 4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
