import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Target, Calendar, Award, Users, Briefcase, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "من نحن | مركز التحكيم الرياضي",
  description: "تعرف على مركز التحكيم الرياضي، رؤيتنا، رسالتنا، وفريق العمل المتخصص في حل النزاعات الرياضية",
}

export default function AboutPage() {
  const boardMembers = [
    {
      name: "د. عبدالله محمد الراشد",
      title: "رئيس مجلس الإدارة",
      experience: "25 سنة في القانون الرياضي",
      education: "دكتوراه في القانون الدولي",
      image: "/professional-arabic-lawyer-portrait.jpg",
    },
    {
      name: "د. نورا أحمد السليم",
      title: "نائب رئيس المجلس",
      experience: "20 سنة في التحكيم التجاري",
      education: "دكتوراه في القانون التجاري",
      image: "/professional-arabic-female-lawyer-portrait.jpg",
    },
    {
      name: "د. محمد سعد الغامدي",
      title: "عضو مجلس الإدارة",
      experience: "18 سنة في القانون الرياضي",
      education: "دكتوراه في إدارة الرياضة",
      image: "/professional-arabic-male-lawyer-portrait.jpg",
    },
    {
      name: "د. فاطمة علي الزهراني",
      title: "عضو مجلس الإدارة",
      experience: "15 سنة في حقوق اللاعبين",
      education: "دكتوراه في القانون الدولي",
      image: "/professional-arabic-female-lawyer-portrait.jpg",
    },
    {
      name: "د. خالد حسن القحطاني",
      title: "عضو مجلس الإدارة",
      experience: "22 سنة في التحكيم الدولي",
      education: "دكتوراه في القانون المقارن",
      image: "/professional-arabic-lawyer-portrait.jpg",
    },
    {
      name: "د. سارة محمد العتيبي",
      title: "عضو مجلس الإدارة",
      experience: "16 سنة في القانون الرياضي",
      education: "دكتوراه في إدارة الأعمال",
      image: "/professional-arabic-female-lawyer-portrait.jpg",
    },
  ]

  const timeline = [
    {
      year: "2009",
      title: "تأسيس المركز",
      description: "تأسيس مركز التحكيم الرياضي كأول مركز متخصص في المملكة",
      milestone: true,
    },
    {
      year: "2012",
      title: "الاعتماد الدولي",
      description: "حصول المركز على الاعتماد من المحكمة الرياضية الدولية",
      milestone: true,
    },
    {
      year: "2015",
      title: "توسيع الخدمات",
      description: "إضافة خدمات الوساطة والتدريب المتخصص",
      milestone: false,
    },
    {
      year: "2018",
      title: "الشراكات الاستراتيجية",
      description: "توقيع اتفاقيات تعاون مع الاتحادات الرياضية المحلية",
      milestone: false,
    },
    {
      year: "2021",
      title: "التحول الرقمي",
      description: "إطلاق منصة التحكيم الإلكتروني المتطورة",
      milestone: true,
    },
    {
      year: "2024",
      title: "التوسع الإقليمي",
      description: "افتتاح فروع جديدة في المنطقة الشرقية والغربية",
      milestone: true,
    },
  ]

  const careers = [
    {
      title: "محكم رياضي معتمد",
      department: "التحكيم",
      type: "دوام كامل",
      location: "الرياض",
      requirements: ["خبرة 5 سنوات في القانون الرياضي", "شهادة في التحكيم", "إجادة اللغة الإنجليزية"],
    },
    {
      title: "مستشار قانوني",
      department: "الاستشارات",
      type: "دوام كامل",
      location: "جدة",
      requirements: ["بكالوريوس قانون", "خبرة 3 سنوات", "مهارات تواصل ممتازة"],
    },
    {
      title: "منسق تدريب",
      department: "التطوير",
      type: "دوام جزئي",
      location: "الدمام",
      requirements: ["خبرة في التدريب", "شهادة في إدارة التدريب", "مرونة في المواعيد"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="من نحن"
        description="مركز متخصص في التحكيم والوساطة الرياضية، نسعى لتحقيق العدالة وحل النزاعات بأعلى معايير المهنية والشفافية"
      />

      {/* Introduction Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-corporate-green">رحلتنا في خدمة العدالة الرياضية</h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  منذ تأسيسنا في عام 2009، نسعى في مركز التحكيم الرياضي إلى أن نكون الخيار الأول والأكثر موثوقية لحل
                  النزاعات الرياضية في المملكة العربية السعودية والمنطقة.
                </p>
                <p>
                  نؤمن بأن الرياضة تحتاج إلى بيئة عادلة وشفافة لتزدهر وتنمو، ولذلك نقدم خدمات التحكيم والوساطة بأعلى
                  المعايير المهنية والأخلاقية، مع الالتزام بالقوانين المحلية والدولية.
                </p>
                <p>
                  فريقنا المتخصص من المحكمين والخبراء القانونيين يعمل بدأب لضمان حصول جميع الأطراف على حقوقهم وحل
                  نزاعاتهم بطريقة سريعة وعادلة.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-corporate-green/10 text-corporate-green border-corporate-green">معتمد دولياً</Badge>
                <Badge className="bg-corporate-green/10 text-corporate-green border-corporate-green">
                  15+ سنة خبرة
                </Badge>
                <Badge className="bg-corporate-green/10 text-corporate-green border-corporate-green">
                  500+ قضية محلولة
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/sports-arbitration-training-workshop.jpg"
                alt="مركز التحكيم الرياضي"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">رؤيتنا ورسالتنا</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نسعى لبناء مستقبل أفضل للرياضة من خلال تحقيق العدالة وحل النزاعات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-corporate-green/20 hover:border-corporate-green transition-colors">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white">
                    <Eye className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-corporate-green">رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  أن نكون المرجع الأول والأكثر موثوقية في التحكيم الرياضي على مستوى المملكة والمنطقة، ونساهم في بناء
                  بيئة رياضية عادلة وشفافة تدعم النمو والتطور المستدام للقطاع الرياضي.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-corporate-green/20 hover:border-corporate-green transition-colors">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white">
                    <Target className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-corporate-green">رسالتنا</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  نقدم خدمات التحكيم والوساطة الرياضية بأعلى معايير الجودة والمهنية، مع الالتزام بالشفافية والعدالة،
                  وتطوير قدرات المحكمين والمختصين في المجال الرياضي لخدمة المجتمع الرياضي.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">رحلتنا عبر السنين</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مسيرة من الإنجازات والتطوير المستمر في خدمة العدالة الرياضية
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute right-1/2 transform translate-x-1/2 w-1 h-full bg-corporate-green/20 hidden md:block" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className={`flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      {/* Timeline dot */}
                      <div className="hidden md:flex absolute right-1/2 transform translate-x-1/2 z-10">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full border-4 border-white ${
                            item.milestone ? "bg-corporate-green" : "bg-corporate-green/60"
                          }`}
                        >
                          {item.milestone && <Award className="h-4 w-4 text-white" />}
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                        <Card className={`${item.milestone ? "border-corporate-green bg-corporate-green/5" : ""}`}>
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <Badge
                                className={`${
                                  item.milestone
                                    ? "bg-corporate-green text-white"
                                    : "bg-corporate-green/10 text-corporate-green"
                                }`}
                              >
                                {item.year}
                              </Badge>
                              {item.milestone && <Award className="h-5 w-5 text-corporate-green" />}
                            </div>
                            <CardTitle className="text-xl text-corporate-green">{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">مجلس الإدارة</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نخبة من الخبراء والمختصين في القانون الرياضي والتحكيم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-corporate-green/20"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-corporate-green text-white p-2 rounded-full">
                        <Briefcase className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="font-bold text-corporate-green text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{member.title}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="h-3 w-3 text-corporate-green" />
                        <span className="text-muted-foreground">{member.experience}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Award className="h-3 w-3 text-corporate-green" />
                        <span className="text-muted-foreground">{member.education}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">الوظائف المتاحة</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              انضم إلى فريقنا المتميز وساهم في تطوير مجال التحكيم الرياضي
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {careers.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-corporate-green">{job.title}</h3>
                        <Badge className="bg-corporate-green/10 text-corporate-green">{job.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">المتطلبات:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-corporate-green rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button className="bg-corporate-green hover:bg-corporate-green/90">
                        <Mail className="mr-2 h-4 w-4" />
                        تقديم طلب
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">لا تجد الوظيفة المناسبة؟</p>
            <Button
              asChild
              variant="outline"
              className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
            >
              <Link href="/contact">
                تواصل معنا للاستفسار
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
