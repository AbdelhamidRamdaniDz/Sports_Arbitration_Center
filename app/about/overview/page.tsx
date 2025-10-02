"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Target, Users, Award, Briefcase, ChevronDown } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { motion } from "framer-motion";
import { useState } from "react";

export default function OverviewPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <Header />

      {/* Page Header */}
      <PageHeader
        title="ملخص المركز"
        description="مركز تحكيم تك (CTSA)، أول منصة رقمية ناشئة في الجزائر للتحكيم التجاري والرياضي، مستقل وموثوق، يقدّم بدائل رقمية لتسوية النزاعات."
      />

      {/* Introduction */}
      <motion.section 
        className="py-16 md:py-20" 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-corporate-green">
              مهمتنا في تعزيز العدالة والشفافية
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              يُعَدّ مركز تحكيم تك (CTSA) أول منصة رقمية ناشئة في الجزائر، متخصصة في تقديم خدمات التحكيم والوسائل البديلة لتسوية النزاعات التجارية والرياضية بشكل مستقل ونزيه، مع التركيز على السرعة والمرونة والموثوقية.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              تربط المنصة الأطراف المتنازعة بنخبة من المحكمين والخبراء القانونيين، لتمكينهم من حل خلافاتهم بكفاءة عالية بعيدًا عن تعقيدات التقاضي التقليدي، وفي بيئة قانونية آمنة وشفافة.
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-corporate-green/10 text-corporate-green border-corporate-green">سرعة ومرونة</Badge>
              <Badge className="bg-corporate-green/10 text-corporate-green border-corporate-green">حيادية وموثوقية</Badge>
              <Badge className="bg-corporate-green/10 text-corporate-green border-corporate-green">تحكيم إلكتروني</Badge>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="inline-block mt-4 px-6 py-3 bg-corporate-green text-white font-bold rounded-lg shadow-lg hover:bg-corporate-green/90 transition-colors"
              href="/register"
            >
              ابدأ التحكيم الآن
            </motion.a>
          </div>
          <div className="relative">
            <img
              src="/cta-arbitration-overview.jpg"
              alt="مركز تحكيم تك"
              className="rounded-xl shadow-lg w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section 
        className="py-16 md:py-20 bg-gradient-to-r from-green-50 via-white to-green-50"
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-corporate-green mb-4 text-center">رؤيتنا ورسالتنا</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            نسعى لأن نكون من أبرز مراكز التحكيم المحلية والإقليمية بحلول 2030، مع الابتكار في الإجراءات وبناء بيئة قانونية آمنة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-corporate-green/20 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white transition-transform duration-300 group-hover:scale-110">
                    <Eye className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-corporate-green">رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  أن نكون مركزًا رائدًا في التحكيم التجاري والرياضي محليًا وإقليميًا، مع بناء شبكة عالمية لدعم الأطراف المختلفة، متماشية مع رؤية الجزائر لتعزيز العدالة والابتكار.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-corporate-green/20 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-corporate-green text-white transition-transform duration-300 group-hover:scale-110">
                    <Target className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-corporate-green">رسالتنا</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  تقديم خدمات التحكيم والوساطة بشكل مستقل وعادل، مع تطوير الإجراءات الرقمية، وبناء بيئة قانونية آمنة تدعم الاستثمار وتعزز الثقة، وفق المعايير الدولية ومبادئ الشريعة الإسلامية.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Goals Section */}
      <motion.section 
        className="py-16 md:py-20 bg-white"
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-corporate-green">أهدافنا</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
              نسعى لتحقيق العدالة والابتكار في التحكيم التجاري والرياضي من خلال مجموعة من الأهداف الاستراتيجية.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Goal Card */}
            {[
              { title: "تحكيم ووساطة عادلة", icon: <Award />, desc: "تقديم خدمات تحكيم ووساطة مستقلة وعادلة تضمن حقوق جميع الأطراف." },
              { title: "نشر ثقافة التحكيم", icon: <Users />, desc: "نشر ثقافة التحكيم كوسيلة بديلة وفعالة لحل النزاعات بشكل سريع وموثوق." },
              { title: "تطوير التحول الرقمي", icon: <Eye />, desc: "تحسين الإجراءات الرقمية في التحكيم لتقديم تجربة فعالة وشفافة لجميع الأطراف." },
              { title: "دعم الاستثمار", icon: <Target />, desc: "تعزيز بيئة قانونية جاذبة للاستثمار من خلال حلول تحكيم فعالة وآمنة." },
              { title: "تأهيل الكفاءات", icon: <Briefcase />, desc: "تطوير وتأهيل الكفاءات في مجالات التحكيم الرياضي والتجاري لتلبية احتياجات السوق." },
              { title: "تعزيز التعاون الدولي", icon: <Award />, desc: "بناء شراكات دولية لتبادل الخبرات وتحسين منظومة التحكيم في الجزائر والمنطقة." },
            ].map((goal, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-2 border-corporate-green/20 hover:-translate-y-2">
                <CardHeader className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-corporate-green text-white transition-transform duration-300 group-hover:scale-110">
                    {goal.icon}
                  </div>
                  <CardTitle className="text-lg text-corporate-green">{goal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{goal.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section 
        className="py-16 md:py-20 bg-green-50"
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-corporate-green mb-4">قيم المركز</h2>
          <p className="text-lg text-muted-foreground mb-6">
            نؤمن بأن الأخلاق المهنية هي الركيزة الأساسية لكل عملية ناجحة في تسوية النزاعات. نلتزم بالنزاهة، الاستقلالية، العدالة، السرية، والشفافية في جميع مراحل التحكيم.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["النزاهة","الاستقلالية","العدالة","السرية","الشفافية"].map((val, i) => (
              <Badge key={i} className="bg-corporate-green/10 text-corporate-green border-corporate-green">{val}</Badge>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16 md:py-20 bg-white"
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-corporate-green mb-8 text-center">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {[
              {
                question: "ما هو مركز تحكيم تك- (CTSA)؟",
                answer: "مركز التحكيم التجاري والرياضي 'تحكيم تك' عبارة عن منصة ذكية ناشئة تقدّم خدمات متخصصة لتسهيل تسوية النزاعات المتعلقة بالتجارة والرياضة من خلال التحكيم أو الوساطة، سواءً إلكترونيًا أو حضوريًا، بشكل مستقل وحيادي وسري.",
              },
              {
                question: "ما هي الخدمات التي يقدّمها مركز تحكيم تك (CTSA)؟",
                answer: (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>السرعة: تحديد جدول الإجراءات لتسوية النزاعات بسرعة.</li>
                    <li>السرية: الحفاظ على المعلومات وحماية الأسرار.</li>
                    <li>الحيادية: تشكيل هيئة محكمين محايدة بالكامل.</li>
                    <li>التكلفة المعقولة: أقل تكلفة من القضاء التقليدي.</li>
                    <li>القرارات النهائية والملزمة قانونيًا.</li>
                  </ul>
                ),
              },
              {
                question: "ما أنواع النزاعات التي يمكن حلها عبر المركز؟",
                answer: (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>النزاعات الرياضية (عقود الرعاية، القضايا التأديبية…)</li>
                    <li>النزاعات التجارية والاقتصادية (العقود، الشركات…)</li>
                    <li>منازعات الإفلاس والتأمين</li>
                    <li>القضايا التجارية الأخرى</li>
                  </ul>
                ),
              },
              {
                question: "من يمكنه إحالة القضية إلى التحكيم الرياضي (CTSA)؟",
                answer: (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>الرياضيون</li>
                    <li>الأندية</li>
                    <li>الاتحادات الرياضية</li>
                    <li>منظمو الفعاليات الرياضية</li>
                    <li>الرعاة</li>
                    <li>شركات التلفزيون</li>
                  </ul>
                ),
              },
              {
                question: "كيف أبدأ استخدام المنصة؟",
                answer: "سجّل حسابك عبر [رابط التسجيل] وابدأ الاستفادة فورًا.",
              },
              {
                question: "هل قرار التحكيم في المركز ملزم قانونيًا لجميع الأطراف؟",
                answer: "نعم، قرارات التحكيم الصادرة عن المركز نهائية وملزمة قانونيًا وفق الأنظمة الجزائرية والدولية.",
              },
            ].map((faq, index) => (
              <Card 
                key={index} 
                className="hover:shadow-2xl transition-all duration-300 border-2 border-corporate-green/20 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <CardHeader className="flex justify-between items-center mb-2">
                  <CardTitle className="text-lg font-bold text-corporate-green">{faq.question}</CardTitle>
                  <ChevronDown 
                    className={`h-6 w-6 transition-transform duration-300 ${openFAQ === index ? "rotate-180" : ""}`} 
                  />
                </CardHeader>
                {openFAQ === index && <CardContent>
                  <CardDescription>{faq.answer}</CardDescription>
                </CardContent>}
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
