"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Leaf, Heart, Handshake, Award, TreePine, Recycle, Globe, Target, TrendingUp } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function CSR() {
  const sdgGoals = [
    { number: 8,desc:"نُسهم في دعم العمل اللائق والنمو الاقتصادي من خلال توفير حلول رقمية مرنة للعدالة البديلة، تُقلل التكاليف وتُحفّز بيئة الأعمال والاستثمار المستدام.", title: "العمل اللائق والنمو الاقتصادي", icon: TrendingUp, color: "from-red-500 to-red-600" },
    { number: 9,desc:"نُعزّز الابتكار والتحول الرقمي عبر تطوير بنية تقنية حديثة تُمكّن من الوصول السريع والعادل لخدمات التحكيم والوساطة الإلكترونية.", title: "الصناعة والابتكار والبنى التحتية", icon: Target, color: "from-orange-500 to-orange-600" },
    { number: 12,desc:"إعادة تدوير الأجهزة الإلكترونية والتخلص الآمن من النفايات الإلكترونية، مع تشجيع تقليل استخدام الورق والاعتماد على الأدوات الرقمية.", title: "الاستهلاك والإنتاج المسؤولين", icon: Recycle, color: "from-yellow-500 to-amber-600" },
    { number: 13,desc:"تقليل السفر والتنقل وخفض الانبعاثات الكربونية من خلال منصة التحكيم الإلكتروني، مما يساهم في حماية البيئة والحد من التأثيرات المناخية.", title: "العمل المناخي", icon: Globe, color: "from-green-600 to-green-700" },
    { number: 16,desc:"نعمل على نشر ثقافة الحلول السلمية والعدالة البديلة، وترسيخ الشفافية والمساواة من خلال إجراءات رقمية آمنة وموثوقة.", title: "السلام والعدل والمؤسسات القوية", icon: Award, color: "from-blue-500 to-blue-600" },
    { number: 17,desc:"نُطوّر شراكات وطنية ودولية لبناء منظومة رقمية مستدامة للعدالة البديلة، تُسهم في تحقيق أهداف التنمية المستدامة وتعزيز الثقة في الحلول القانونية الرقمية.", title: "عقد الشراكات لتحقيق الأهداف", icon: Handshake, color: "from-indigo-500 to-indigo-600" }
  ];

  const initiatives = [
    { icon: Heart, title: "خدمات Pro Bono", desc: "تحكيم مجاني للقضايا الإنسانية" },
    { icon: TreePine, title: "الحملات البيئية", desc: "المشاركة الفعالة في حماية البيئة" },
    { icon: Handshake, title: "المبادرات الخيرية", desc: "دعم الفئات المحتاجة في المجتمع" },
    { icon: Award, title: "الفعاليات التوعوية", desc: "نشر الوعي القانوني والاجتماعي" }
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-corporate-green to-green-700 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/sustainability-hero.webp"
            alt="خلفية الاستدامة والتحكيم"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">المسؤولية الاجتماعية والاستدامة</h1>
            <p className="text-xl text-green-50 max-w-3xl mx-auto leading-relaxed">
              التزامنا بالمساهمة الإيجابية في المجتمع وبناء مستقبل مستدام للأجيال القادمة
            </p>
          </motion.div>
        </div>
      </section>

      {/* المسؤولية الاجتماعية */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-corporate-green/10 mb-6">
              <Users className="h-8 w-8 text-corporate-green" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">التزامنا بالمسؤولية الاجتماعية</h2>
            <div className="w-24 h-1 bg-corporate-green mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg border-none rounded-3xl overflow-hidden h-full bg-gradient-to-br from-white to-green-50">
                <CardContent className="p-8">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      في <strong className="text-corporate-green">منصة CTSA للتحكيم الإلكتروني</strong>، نؤمن بأن دورنا لا يقتصر على تسوية النزاعات، بل يمتد ليشمل المساهمة الإيجابية في خدمة المجتمع وتعزيز العدالة الاجتماعية.
                    </p>
                    <p className="text-lg">
                      نلتزم بالمسؤولية الاجتماعية من خلال مبادرات تطوعية ومجتمعية تهدف إلى دعم الفئات المحتاجة، ونشر الوعي، والمساهمة في تحقيق أهداف التنمية المستدامة.
                    </p>
                    <p className="text-lg">
                      نخصص جهود خبرائنا ومحكمينا لتقديم خدمات تحكيم مجانية (Pro Bono) في القضايا ذات الطابع الإنساني والاجتماعي، انطلاقًا من قناعتنا بأن <strong className="text-corporate-green">العدالة حق للجميع</strong>، ولا ينبغي أن تُقيد بالقدرة المالية.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg border-none rounded-3xl overflow-hidden h-full">
                <CardContent className="p-8">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      كما نشارك في الحملات البيئية، وندعم المبادرات الخيرية، وننظم فعاليات قانونية وتوعوية تخدم المجتمع بمختلف فئاته، مما يعكس قيم العطاء والمسؤولية التي نحرص عليها.
                    </p>
                    <p className="text-lg">
                      من خلال هذه الجهود، نطمح إلى بناء <strong className="text-corporate-green">مجتمع أكثر وعيًا وتضامنًا</strong>، وأن نكون جزءًا فعّالًا من الحل في التحديات الاجتماعية والبيئية، عبر نموذج تحكيم حديث ومسؤول.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* المبادرات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-none rounded-2xl h-full bg-white hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-corporate-green/10 mb-4">
                      <item.icon className="h-7 w-7 text-corporate-green" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* الاستدامة */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-700/10 mb-6">
              <Leaf className="h-8 w-8 text-green-700" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">التزام CTSA بالاستدامة</h2>
            <div className="w-24 h-1 bg-green-700 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-4xl mx-auto">
              يلتزم مركزنا بإحداث أثر إيجابي يتجاوز تسوية النزاعات التقليدية، تماشياً مع رؤية الجزائر 2030 وأهداف الأمم المتحدة للتنمية المستدامة
            </p>
          </motion.div>

          {/* أهداف التنمية المستدامة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-none rounded-2xl overflow-hidden h-full group">
                  <div className={`h-2 bg-gradient-to-r ${goal.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform`}>
                        {goal.number}
                      </div>
                      <div className="flex ">
                        <goal.icon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        <h3 className="text-base px-0.5 font-bold text-gray-900 mb-2 leading-tight">{goal.title}</h3>
                      </div>
                    </div>
                        <h3 className="text-base px-0.5 font-bold text-gray-900 mb-2 leading-tight">{goal.desc}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* تفاصيل الاستدامة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl border-none rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-10">
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <TrendingUp className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">النمو الاقتصادي المستدام</h3>
                          <p className="text-gray-700 leading-relaxed">
                            توفير حلول تحكيم إلكترونية مرنة تقلل التكاليف وتحفز بيئة الأعمال، مع دعم التحول الرقمي وتطوير بنية رقمية تتيح الوصول السريع والعادل للتحكيم.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <Award className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">السلام والعدالة</h3>
                          <p className="text-gray-700 leading-relaxed">
                            نشر ثقافة الحلول السلمية وتعزيز الشفافية والمساواة، مع العمل على تعزيز الشراكات بالتعاون مع الهيئات الوطنية والدولية.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <Globe className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">العمل المناخي</h3>
                          <p className="text-gray-700 leading-relaxed">
                            تقليل السفر والتنقل وخفض الانبعاثات الكربونية من خلال منصة التحكيم الإلكتروني، مما يساهم في حماية البيئة والحد من التأثيرات المناخية.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <Recycle className="h-5 w-5 text-yellow-700" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">الاستهلاك المسؤول</h3>
                          <p className="text-gray-700 leading-relaxed">
                            إعادة تدوير الأجهزة الإلكترونية والتخلص الآمن من النفايات الإلكترونية، مع تشجيع تقليل استخدام الورق والاعتماد على الأدوات الرقمية.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                      <p className="text-gray-800 text-lg leading-relaxed text-center">
                        <strong className="text-green-700">نشجع جميع المستخدمين</strong>، بمن فيهم المحكمون والموظفون، على تبني ممارسات مستدامة إيمانًا منّا بأن التحكيم الإلكتروني ليس فقط وسيلة لتسوية النزاعات، بل أيضًا <strong className="text-green-700">خطوة نحو مستقبل أكثر استدامة ومسؤولية</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}