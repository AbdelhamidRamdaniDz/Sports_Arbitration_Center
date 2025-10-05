"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, Target, Users, Award, Briefcase, TrendingUp, Shield, Zap, Globe2, Scale, Sparkles } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function OverviewPage() {
  const goals = [
    { 
      title: "تحكيم ووساطة عادلة", 
      icon: Award, 
      desc: "تقديم خدمات تحكيم ووساطة مستقلة وعادلة تضمن حقوق جميع الأطراف.",
      color: "from-blue-500 to-blue-600"
    },
    { 
      title: "نشر ثقافة التحكيم", 
      icon: Users, 
      desc: "نشر ثقافة التحكيم كوسيلة بديلة وفعالة لحل النزاعات بشكل سريع وموثوق.",
      color: "from-purple-500 to-purple-600"
    },
    { 
      title: "تطوير التحول الرقمي", 
      icon: Zap, 
      desc: "تحسين الإجراءات الرقمية في التحكيم لتقديم تجربة فعالة وشفافة لجميع الأطراف.",
      color: "from-orange-500 to-orange-600"
    },
    { 
      title: "دعم الاستثمار", 
      icon: TrendingUp, 
      desc: "تعزيز بيئة قانونية جاذبة للاستثمار من خلال حلول تحكيم فعالة وآمنة.",
      color: "from-green-500 to-green-600"
    },
    { 
      title: "تأهيل الكفاءات", 
      icon: Briefcase, 
      desc: "تطوير وتأهيل الكفاءات في مجالات التحكيم الرياضي والتجاري لتلبية احتياجات السوق.",
      color: "from-indigo-500 to-indigo-600"
    },
    { 
      title: "تعزيز التعاون الدولي", 
      icon: Globe2, 
      desc: "بناء شراكات دولية لتبادل الخبرات وتحسين منظومة التحكيم في الجزائر والمنطقة.",
      color: "from-teal-500 to-teal-600"
    },
  ];

  const features = [
    { icon: Zap, text: "سرعة ومرونة" },
    { icon: Shield, text: "حيادية وموثوقية" },
    { icon: Scale, text: "تحكيم إلكتروني" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-corporate-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">أول منصة رقمية للتحكيم في الجزائر</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              مركز تحكيم تك <span className="text-green-200">(CTSA)</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-50 leading-relaxed mb-8">
              مركز مستقل وموثوق، يقدّم بدائل رقمية لتسوية النزاعات التجارية والرياضية بشكل عادل وسريع
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
                >
                  <feature.icon className="h-5 w-5" />
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Introduction Section */}
      <motion.section 
        className="py-20" 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-corporate-green/10 px-4 py-2 rounded-full">
                <Scale className="h-5 w-5 text-corporate-green" />
                <span className="text-sm font-bold text-corporate-green">مهمتنا في تعزيز العدالة والشفافية</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                نحو تحكيم <span className="text-corporate-green">أسرع وأكثر عدالة</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  يُعَدّ مركز تحكيم تك (CTSA) <strong className="text-corporate-green">أول منصة رقمية ناشئة في الجزائر</strong>، متخصصة في تقديم خدمات التحكيم والوسائل البديلة لتسوية النزاعات التجارية والرياضية بشكل مستقل ونزيه، مع التركيز على السرعة والمرونة والموثوقية.
                </p>
                <p className="text-lg">
                  تربط المنصة الأطراف المتنازعة بنخبة من المحكمين والخبراء القانونيين، لتمكينهم من حل خلافاتهم بكفاءة عالية بعيدًا عن تعقيدات التقاضي التقليدي، وفي بيئة قانونية آمنة وشفافة.
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-corporate-green text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                href="/forms"
              >
                <span>ابدأ التحكيم الآن</span>
                <Sparkles className="h-5 w-5" />
              </motion.a>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/cta-arbitration-overview.jpg"
                  alt="مركز تحكيم تك"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-corporate-green/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-corporate-green rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">الأمان والموثوقية</h3>
                        <p className="text-sm text-gray-600">بيئة قانونية آمنة ومحمية</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-corporate-green/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50"
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-corporate-green/10 mb-6">
              <Target className="h-8 w-8 text-corporate-green" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">رؤيتنا ورسالتنا</h2>
            <div className="w-24 h-1 bg-corporate-green mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نسعى لأن نكون من أبرز مراكز التحكيم المحلية والإقليمية بحلول 2030، مع الابتكار في الإجراءات وبناء بيئة قانونية آمنة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 border-none rounded-3xl overflow-hidden group bg-gradient-to-br from-white to-blue-50">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-6">
                    <motion.div 
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Eye className="h-10 w-10" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">رؤيتنا</CardTitle>
                  <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </CardHeader>
                <CardContent className="text-center px-8 pb-8">
                  <CardDescription className="text-base text-gray-700 leading-relaxed">
                    أن نكون مركزًا <strong className="text-blue-600">رائدًا في التحكيم التجاري والرياضي</strong> محليًا وإقليميًا، مع بناء شبكة عالمية لدعم الأطراف المختلفة، متماشية مع رؤية الجزائر لتعزيز العدالة والابتكار.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 border-none rounded-3xl overflow-hidden group bg-gradient-to-br from-white to-green-50">
                <div className="h-2 bg-gradient-to-r from-corporate-green to-green-600"></div>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-6">
                    <motion.div 
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-corporate-green to-green-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Target className="h-10 w-10" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">رسالتنا</CardTitle>
                  <div className="w-16 h-1 bg-corporate-green mx-auto rounded-full"></div>
                </CardHeader>
                <CardContent className="text-center px-8 pb-8">
                  <CardDescription className="text-base text-gray-700 leading-relaxed">
                    تقديم خدمات التحكيم والوساطة بشكل <strong className="text-corporate-green">مستقل وعادل</strong>، مع تطوير الإجراءات الرقمية، وبناء بيئة قانونية آمنة تدعم الاستثمار وتعزز الثقة، وفق المعايير الدولية ومبادئ الشريعة الإسلامية.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Goals Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-corporate-green/10 mb-6">
              <Award className="h-8 w-8 text-corporate-green" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">أهدافنا الاستراتيجية</h2>
            <div className="w-24 h-1 bg-corporate-green mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نسعى لتحقيق العدالة والابتكار في التحكيم التجاري والرياضي من خلال مجموعة من الأهداف الاستراتيجية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-none rounded-3xl overflow-hidden group cursor-pointer">
                  <div className={`h-2 bg-gradient-to-r ${goal.color}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${goal.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <goal.icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900 leading-tight group-hover:text-corporate-green transition-colors">
                          {goal.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {goal.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 bg-corporate-green">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">هل أنت مستعد لبدء التحكيم؟</h2>
            <p className="text-xl text-green-50 mb-8 leading-relaxed">
              انضم إلى منصتنا الآن واستفد من خدمات التحكيم الإلكتروني السريعة والموثوقة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-corporate-green font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                href="/forms"
              >
                <span>سجّل الآن</span>
                <Sparkles className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all"
                href="/contact"
              >
                <span>تواصل معنا</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}