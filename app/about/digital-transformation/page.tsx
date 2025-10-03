"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users, Globe, Handshake, Cpu, Leaf } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DigitalTransformationPage() {
  return (
    <div className="min-h-screen bg-light-grey flex flex-col">
      <Header />

      <PageHeader
        title="التحول الرقمي"
        description="منصة CTSA للتحكيم الإلكتروني: التزامنا بالمسؤولية الاجتماعية، الاستدامة، والتحول الرقمي."
      />

      <main className="flex-grow">
        {/* المسؤولية الاجتماعية */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-2 md:order-1"
              >
                <Card className="shadow-soft hover-lift border border-gray-200 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-corporate-green text-2xl font-extrabold">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-corporate-green/10">
                        <Users className="h-5 w-5 text-corporate-green" />
                      </span>
                      التزامنا بالمسؤولية الاجتماعية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="leading-7 text-gray-700 space-y-4">
                    <p>
                      في منصة CTSA للتحكيم الإلكتروني، نؤمن بأن دورنا لا يقتصر على تسوية النزاعات،
                      بل يمتد ليشمل المساهمة الإيجابية في خدمة المجتمع وتعزيز العدالة الاجتماعية.
                    </p>
                    <p>
                      نلتزم بتقديم خدمات تحكيم مجانية (Pro Bono) في القضايا ذات الطابع الإنساني والاجتماعي،
                      والمشاركة في الحملات البيئية والخيرية، وتنظيم فعاليات قانونية وتوعوية تخدم المجتمع بمختلف فئاته.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-1 md:order-2"
              >
                <div className="overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src="/professional-mediation-session-with-people-shaking.jpg"
                    alt="المسؤولية الاجتماعية"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-out hover:scale-105"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* الاستدامة */}
        <section className="py-16 bg-light-grey">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-1"
              >
                <div className="overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src="/modern-equipped-conference-room-with-professional-.jpg"
                    alt="الاستدامة"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-out hover:scale-105"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-2"
              >
                <Card className="shadow-soft hover-lift border border-gray-200 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-green-700 text-2xl font-extrabold">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-700/10">
                        <Leaf className="h-5 w-5 text-green-700" />
                      </span>
                      التزام CTSA بالإستدامة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="leading-7 text-gray-700 space-y-4">
                    <p>
                      نلتزم في CTSA بالمساهمة في رؤية الجزائر 2030 وأهداف التنمية المستدامة
                      عبر التحول الرقمي وتقليل التكاليف وخفض الانبعاثات الكربونية.
                    </p>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>دعم العمل اللائق والنمو الاقتصادي (الهدف 8)</li>
                      <li>دعم الصناعة والابتكار والبنية التحتية (الهدف 9)</li>
                      <li>تعزيز السلام والعدل والمؤسسات القوية (الهدف 16)</li>
                      <li>العمل المناخي وتقليل الانبعاثات (الهدف 13)</li>
                      <li>الاستهلاك والإنتاج المسؤولان (الهدف 12)</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* شركاؤنا */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-2 md:order-1"
              >
                <Card className="shadow-soft hover-lift border border-gray-200 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-corporate-green text-2xl font-extrabold">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-corporate-green/10">
                        <Handshake className="h-5 w-5 text-corporate-green" />
                      </span>
                      شركاؤنا
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="leading-7 text-gray-700 space-y-4">
                    <p>
                      في CTSA نؤمن بأن التعاون هو حجر الزاوية لبناء مستقبل فعال في التحكيم الإلكتروني.
                      نتعاون مع الجامعات، الهيئات القانونية والرياضية، والمنصات التقنية لخلق منظومة حديثة ومستدامة.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-1 md:order-2"
              >
                <div className="overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src="/saudi-football-federation-partnership.jpg"
                    alt="الشراكات"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-out hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* التحول الرقمي */}
        <section className="py-16 bg-light-grey">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-1"
              >
                <div className="overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src="/modern-digital-arbitration-system.jpg"
                    alt="التحول الرقمي"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-out hover:scale-105"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-2"
              >
                <Card className="shadow-soft hover-lift border border-gray-200 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-blue-700 text-2xl font-extrabold">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-700/10">
                        <Globe className="h-5 w-5 text-blue-700" />
                      </span>
                      التحول الرقمي
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="leading-7 text-gray-700 space-y-4">
                    <p>
                      تمثل CTSA خطوة رائدة في دعم التحول الرقمي للقطاع القضائي والرياضي في الجزائر،
                      بما يتماشى مع رؤية الجزائر 2030 لرقمنة الخدمات وتعزيز الشفافية.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* الابتكار والذكاء الاصطناعي */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-2 md:order-1"
              >
                <Card className="shadow-soft hover-lift border border-gray-200 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-purple-700 text-2xl font-extrabold">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-700/10">
                        <Cpu className="h-5 w-5 text-purple-700" />
                      </span>
                      الابتكار والذكاء الاصطناعي
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="leading-7 text-gray-700 space-y-4">
                    <p>
                      نعتبر الذكاء الاصطناعي ركيزة أساسية لمواكبة التحول الرقمي في الجزائر،
                      وقد بدأنا بالفعل بتطبيق روبوت محادثة قانوني (Legal Chatbot) يقدم استشارات سريعة
                      ويوجه المستخدمين داخل المنصة، كخطوة أولى نحو عدالة ذكية وفعالة.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-1 md:order-2"
              >
                <div className="overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src="/professional-arbitration-meeting-room-with-judges-.jpg"
                    alt="الذكاء الاصطناعي"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-out hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
