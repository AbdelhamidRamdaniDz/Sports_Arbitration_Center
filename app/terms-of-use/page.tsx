import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="الشروط والأحكام" description="شروط وأحكام استخدام موقع وخدمات مركز التحكيم الرياضي" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>قبول الشروط</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                باستخدام موقع مركز التحكيم الرياضي وخدماته، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا
                توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع أو الخدمات.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الخدمات المقدمة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">يقدم مركز التحكيم الرياضي الخدمات التالية:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>خدمات التحكيم في النزاعات الرياضية</li>
                <li>خدمات الوساطة القانونية</li>
                <li>برامج التدريب والتأهيل</li>
                <li>الاستشارات القانونية المتخصصة</li>
                <li>توفير القاعات المجهزة للجلسات</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التزامات المستخدم</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>تقديم معلومات صحيحة ودقيقة</li>
                <li>عدم استخدام الموقع لأغراض غير قانونية</li>
                <li>احترام حقوق الملكية الفكرية</li>
                <li>عدم التدخل في عمل الموقع أو أمانه</li>
                <li>الالتزام بالآداب العامة في التعامل</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الرسوم والدفع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                تختلف رسوم الخدمات حسب نوع الخدمة المطلوبة ومدى تعقيد القضية. سيتم إبلاغك بالرسوم المطلوبة قبل بدء تقديم
                الخدمة.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>جميع الرسوم مستحقة الدفع مقدماً</li>
                <li>لا يتم رد الرسوم إلا في حالات استثنائية</li>
                <li>قد تطبق رسوم إضافية للخدمات الطارئة</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>السرية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                يلتزم مركز التحكيم الرياضي بالحفاظ على سرية جميع المعلومات والوثائق المتعلقة بالقضايا والعملاء. لن يتم
                الكشف عن أي معلومات إلا بموافقة كتابية من العميل أو بأمر من المحكمة المختصة.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إخلاء المسؤولية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                لا يتحمل مركز التحكيم الرياضي مسؤولية أي أضرار مباشرة أو غير مباشرة قد تنتج عن استخدام الموقع أو
                الخدمات، باستثناء ما ينص عليه القانون صراحة.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>القانون المطبق</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية، وتختص المحاكم السعودية بالنظر في أي نزاع قد
                ينشأ عن استخدام الموقع أو الخدمات.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تعديل الشروط</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                يحتفظ مركز التحكيم الرياضي بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار المستخدمين بأي
                تغييرات مهمة عبر الموقع أو البريد الإلكتروني.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
