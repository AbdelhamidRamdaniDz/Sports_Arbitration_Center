"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ChevronDown, HelpCircle, MessageCircle, Shield, Clock, Scale, CheckCircle } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "ما هو مركز تحكيم تك- (CTSA)؟",
      answer: "مركز التحكيم التجاري والرياضي 'تحكيم تك' عبارة عن منصة ذكية ناشئة تقدّم خدمات متخصصة لتسهيل تسوية النزاعات المتعلقة بالتجارة والرياضة من خلال التحكيم أو الوساطة، سواءً إلكترونيًا أو حضوريًا، بشكل مستقل وحيادي وسري.",
      icon: HelpCircle,
    },
    {
      question: "ما هي الخدمات التي يقدّمها مركز تحكيم تك (CTSA)؟",
      answer: (
        <ul className="list-none mt-3 space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-corporate-green mt-1 flex-shrink-0" />
            <div><span className="font-semibold text-corporate-green">السرعة:</span> يتيح التحكيم تحديد جدول الإجراءات بما يتناسب مع ظروف الأطراف لتسوية النزاعات بسرعة.</div>
          </li>
          <li className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-corporate-green mt-1 flex-shrink-0" />
            <div><span className="font-semibold text-corporate-green">السرية:</span> الحفاظ على سرية المعلومات التجارية والمالية، وحماية أسرار الأطراف.</div>
          </li>
          <li className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-corporate-green mt-1 flex-shrink-0" />
            <div><span className="font-semibold text-corporate-green">الحيادية:</span> تشكيل هيئة محكمين محايدة بالكامل لتقليل أي احتمال للتحيز.</div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-corporate-green mt-1 flex-shrink-0" />
            <div><span className="font-semibold text-corporate-green">التكلفة المعقولة:</span> خفض التكاليف مقارنة بالطرق القضائية التقليدية.</div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-corporate-green mt-1 flex-shrink-0" />
            <div><span className="font-semibold text-corporate-green">القرارات النهائية والملزمة:</span> أحكام التحكيم نهائية وملزمة ويتم تنفيذها قانونيًا.</div>
          </li>
        </ul>
      ),
      icon: MessageCircle,
    },
    {
      question: "ما أنواع النزاعات التي يمكن حلها عبر مركز تحكيم تك (CTSA)؟",
      answer: (
        <ul className="list-none mt-3 space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-corporate-green rounded-full mt-2 flex-shrink-0"></div>
            <div>النزاعات الرياضية (عقود الرعاية، القضايا التأديبية، قضايا المنشطات…)</div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-corporate-green rounded-full mt-2 flex-shrink-0"></div>
            <div>النزاعات التجارية والاقتصادية (العقود، الشركات، الاستثمار…)</div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-corporate-green rounded-full mt-2 flex-shrink-0"></div>
            <div>منازعات الإفلاس والتأمين</div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-corporate-green rounded-full mt-2 flex-shrink-0"></div>
            <div>القضايا ذات الطابع التجاري الأخرى</div>
          </li>
        </ul>
      ),
      icon: Scale,
    },
    {
      question: "من يمكنه إحالة القضية إلى التحكيم الرياضي (CTSA)؟",
      answer: (
        <p className="text-muted-foreground">
          يحق لأي فرد أو كيان قانوني اللجوء إلى خدمات المركز، بما في ذلك: الرياضيون، الأندية، الاتحادات الرياضية، منظمو الفعاليات الرياضية، الرعاة، وشركات التلفزيون.
        </p>
      ),
      icon: HelpCircle,
    },
    {
      question: "كيف أبدأ استخدام المنصة؟",
      answer: (
        <p className="text-muted-foreground">
          سجّل حسابك عبر <a href="/register" className="text-corporate-green underline font-semibold hover:text-corporate-green/80 transition-colors">رابط التسجيل</a>، واتبع الخطوات البسيطة لإنشاء حسابك والبدء في الاستفادة من خدمات المنصة فورًا.
        </p>
      ),
      icon: MessageCircle,
    },
    {
      question: "هل قرار التحكيم في المركز ملزم قانونيًا لجميع الأطراف؟",
      answer: "نعم، قرارات التحكيم الصادرة عن المركز نهائية وملزمة، ويتم تنفيذها وفقًا للقوانين والأنظمة الجزائرية والدولية المعمول بها.",
      icon: CheckCircle,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "حماية كاملة",
      description: "سرية تامة لجميع المعلومات",
    },
    {
      icon: Clock,
      title: "سرعة في الإجراءات",
      description: "حل النزاعات في وقت قياسي",
    },
    {
      icon: Scale,
      title: "عدالة وحياد",
      description: "محكمون مستقلون ومحايدون",
    },
    {
      icon: CheckCircle,
      title: "أحكام ملزمة",
      description: "قرارات نهائية قابلة للتنفيذ",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 md:py-28 overflow-hidden"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-corporate-green/10 via-transparent to-corporate-green/5"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-corporate-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-corporate-green/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-corporate-green/10 rounded-full mb-6">
              <HelpCircle className="w-10 h-10 text-corporate-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-corporate-green mb-6">
              الأسئلة الشائعة
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              إجابات شاملة على جميع استفساراتكم حول مركز تحكيم تك للتحكيم التجاري والرياضي
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="text-center p-6 h-full hover:shadow-xl transition-all duration-300 border-2 border-corporate-green/10 hover:border-corporate-green/30 bg-white">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-green/10 rounded-full mb-4 group-hover:bg-corporate-green/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-corporate-green" />
                  </div>
                  <h3 className="text-lg font-bold text-corporate-green mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16 md:py-20 bg-white"
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="hover:shadow-2xl transition-all duration-300 border-2 border-corporate-green/20 cursor-pointer overflow-hidden group hover:border-corporate-green/40"
                    onClick={() => toggleFAQ(index)}
                  >
                    <CardHeader className="flex flex-row justify-between items-center pb-3">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-corporate-green/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-corporate-green/20 transition-colors">
                          <Icon className="w-5 h-5 text-corporate-green" />
                        </div>
                        <CardTitle className="text-lg font-bold text-corporate-green text-right flex-1">
                          {faq.question}
                        </CardTitle>
                      </div>
                      <ChevronDown 
                        className={`h-6 w-6 transition-transform duration-300 text-corporate-green flex-shrink-0 mr-2 ${
                          openFAQ === index ? "rotate-180" : ""
                        }`} 
                      />
                    </CardHeader>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0 pb-6 px-6">
                          <div className="pr-14 text-right">
                            <CardDescription className="text-base leading-relaxed">
                              {faq.answer}
                            </CardDescription>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-corporate-green/5 to-corporate-green/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Card className="p-12 border-2 border-corporate-green/20 bg-white shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-green/10 rounded-full mb-6">
                <MessageCircle className="w-8 h-8 text-corporate-green" />
              </div>
              <h2 className="text-3xl font-bold text-corporate-green mb-4">
                لم تجد إجابة لسؤالك؟
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                فريقنا المتخصص جاهز للإجابة على جميع استفساراتكم ومساعدتكم في أي وقت
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-corporate-green text-white font-semibold rounded-lg hover:bg-corporate-green/90 transition-all shadow-lg hover:shadow-xl"
                >
                  تواصل معنا
                </motion.a>
                <motion.a
                  href="/forms"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-corporate-green text-corporate-green font-semibold rounded-lg hover:bg-corporate-green hover:text-white transition-all"
                >
                  سجّل الآن
                </motion.a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}