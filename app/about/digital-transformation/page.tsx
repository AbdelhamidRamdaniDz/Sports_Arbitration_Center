"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users, Globe, Handshake, Cpu, Leaf, Zap, Shield, TrendingUp, Award, CheckCircle, Target, Rocket, Brain, LineChart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DigitalTransformationPage() {
  const stats = [
    { icon: Zap, value: "100%", label: "رقمنة العمليات" },
    { icon: Shield, value: "99.9%", label: "أمان البيانات" },
    { icon: TrendingUp, value: "70%", label: "تسريع الإجراءات" },
    { icon: Award, value: "24/7", label: "خدمة مستمرة" },
  ];

  const visionPoints = [
    {
      icon: Target,
      title: "رؤية الجزائر 2030",
      description: "التوافق التام مع الأهداف الوطنية للتحول الرقمي وتطوير الخدمات الإلكترونية"
    },
    {
      icon: Globe,
      title: "ريادة إقليمية",
      description: "جعل الجزائر مركزًا رائدًا في التحكيم الإلكتروني على مستوى شمال إفريقيا والشرق الأوسط"
    },
    {
      icon: Rocket,
      title: "ابتكار مستمر",
      description: "الاستثمار في التقنيات الحديثة وتطوير الحلول الذكية لخدمة العدالة"
    },
    {
      icon: Users,
      title: "تمكين المستخدمين",
      description: "توفير منصة سهلة الاستخدام تخدم جميع الأطراف من رياضيين ومستثمرين وشركات"
    }
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: "روبوت محادثة قانوني ذكي",
      description: "مساعد افتراضي متاح على مدار الساعة لتقديم استشارات فورية وإجابة الاستفسارات القانونية"
    },
    {
      icon: LineChart,
      title: "تحليل البيانات الذكي",
      description: "تحليل القضايا والسوابق لتقديم رؤى دقيقة وتوقعات مبنية على البيانات"
    },
    {
      icon: CheckCircle,
      title: "أتمتة الإجراءات",
      description: "تبسيط العمليات الإدارية وتسريع معالجة الطلبات بدقة وكفاءة عالية"
    },
    {
      icon: Shield,
      title: "أمان معزز بالذكاء الاصطناعي",
      description: "حماية متقدمة للبيانات والمعلومات الحساسة باستخدام تقنيات الأمن السيبراني الذكية"
    }
  ];

  const benefits = [
    "تقليل الوقت والتكلفة في إجراءات التحكيم",
    "الوصول للخدمة من أي مكان وفي أي وقت",
    "الشفافية الكاملة في جميع مراحل التحكيم",
    "توثيق إلكتروني آمن ومعتمد قانونيًا",
    "تقليل الأخطاء البشرية من خلال الأتمتة",
    "دعم متعدد اللغات لخدمة جميع المستخدمين"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-corporate-green">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ai-arbitration-hero.webp"
            alt="خلفية الذكاء الاصطناعي والتحكيم"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              التحول الرقمي
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              منصة CTSA للتحكيم الإلكتروني: الذكاء الاصطناعي، الابتكار، والتحول الرقمي نحو عدالة ذكية مستدامة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-corporate-green font-bold rounded-full hover:bg-green-50 transition-all shadow-xl"
              >
                اكتشف المزيد
              </motion.button>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center"
              >
                تواصل معنا
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 border-2 border-green-100 hover:border-corporate-green transition-all hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-corporate-green rounded-full mb-4">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-corporate-green mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-grow">
        {/* التحول الرقمي */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-corporate-green mb-4">التحول الرقمي الشامل</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نقود ثورة رقمية في قطاع العدالة والتحكيم متماشية مع رؤية الجزائر 2030
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-2xl border-2 border-green-100 hover:border-corporate-green/50 rounded-3xl overflow-hidden transition-all">
                  <div className="bg-corporate-green p-6">
                    <CardTitle className="flex items-center gap-3 text-white text-2xl font-extrabold">
                      <span className="inline-flex w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center">
                        <Globe className="h-6 w-6 text-white" />
                      </span>
                      التحول الرقمي
                    </CardTitle>
                  </div>
                  <CardContent className="p-8 bg-white">
                    <div className="text-gray-600 leading-7 space-y-4">
                      <p>
                        تمثل منصتنا خطوة رائدة في دعم التحول الرقمي للقطاع القضائي والرياضي في الجزائر،
                        متماشية مع رؤية الجزائر 2030 التي تهدف إلى رقمنة الخدمات العامة وتعزيز الابتكار التكنولوجي.
                      </p>
                      <p>
                        نطمح إلى تعزيز الكفاءة محليًا وإقليميًا لتصبح الجزائر نموذجًا في العدالة البديلة الرقمية.
                      </p>
                      <div className="pt-4 space-y-3">
                        {benefits.slice(0, 3).map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-corporate-green mt-1 flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-corporate-green/20 rounded-3xl blur-2xl"></div>
                  <Image
                    src="/ai-generated-digital-transformation.webp"
                    alt="التحول الرقمي"
                    width={1200}
                    height={800}
                    className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Points Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-corporate-green mb-4">رؤيتنا الاستراتيجية</h2>
              <p className="text-xl text-gray-600">أهدافنا الطموحة لمستقبل رقمي متطور</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {visionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-6 border-2 border-green-100 hover:border-corporate-green hover:shadow-xl transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-corporate-green rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <point.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-corporate-green mb-2">{point.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* الابتكار والذكاء الاصطناعي */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-corporate-green mb-4">الابتكار والذكاء الاصطناعي</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نستخدم أحدث تقنيات الذكاء الاصطناعي لتحقيق عدالة رقمية أكثر دقة وموضوعية
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-corporate-green/20 rounded-3xl blur-2xl"></div>
                  <Image
                    src="/ai-generated-digital-transformation.webp"
                    alt="الذكاء الاصطناعي"
                    width={1200}
                    height={800}
                    className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2"
              >
                <Card className="shadow-2xl border-2 border-green-100 hover:border-corporate-green/50 rounded-3xl overflow-hidden transition-all">
                  <div className="bg-corporate-green p-6">
                    <CardTitle className="flex items-center gap-3 text-white text-2xl font-extrabold">
                      <span className="inline-flex w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center">
                        <Cpu className="h-6 w-6 text-white" />
                      </span>
                      الذكاء الاصطناعي
                    </CardTitle>
                  </div>
                  <CardContent className="p-8 bg-white">
                    <div className="text-gray-600 leading-7 space-y-4">
                      <p>
                        ندمج الذكاء الاصطناعي في التحكيم الإلكتروني عبر روبوت محادثة قانوني ذكي (Legal Chatbot)،
                        يقدّم استشارات سريعة ويوجه المستخدمين، كخطوة أولى نحو عدالة رقمية أكثر دقة وموضوعية.
                      </p>
                      <p>
                        يُعتبر هذا الابتكار بداية لإطلاق أدوات متقدمة مستقبلًا، بما ينسجم مع التحول الرقمي في الجزائر ورؤية 2030.
                      </p>
                      <div className="pt-4 space-y-3">
                        {benefits.slice(3).map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-corporate-green mt-1 flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Features Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-corporate-green mb-4">مميزات الذكاء الاصطناعي</h2>
              <p className="text-xl text-gray-600">تقنيات متقدمة لخدمة أفضل</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-8 border-2 border-green-100 hover:border-corporate-green hover:shadow-xl transition-all group">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-green rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-corporate-green mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-corporate-green relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                انضم إلى مستقبل التحكيم الرقمي
              </h2>
              <p className="text-xl text-white/90 mb-8">
                كن جزءًا من التحول الرقمي في قطاع العدالة والتحكيم في الجزائر
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-corporate-green font-bold rounded-full hover:bg-green-50 transition-all shadow-xl"
                >
                  ابدأ الآن
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all"
                >
                  اعرف المزيد
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}