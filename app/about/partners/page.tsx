"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Trophy, Award, Handshake, Target } from "lucide-react";
import { motion } from "framer-motion";

// بيانات الشركاء
const partners = [
  {
    name: "اتصالات الجزائر",
    type: "شركة",
    logo: "/partners/اتصالات-الجزائر.jpg",
    description: "شريك استراتيجي في البنية التحتية الرقمية.",
    category: "technology"
  },
  {
    name: "المنتخب الوطني الجزائري",
    type: "منتخب رياضي",
    logo: "/partners/المنتخب-الوطني.webp",
    description: "تعاون في التحكيم الرياضي وبرامج التدريب.",
    category: "sports"
  },
  {
    name: "منصة X الرقمية",
    type: "منصة رقمية",
    logo: "/partners/platform-x.jpg",
    description: "شريك تقني لدعم خدمات التحكيم الإلكتروني.",
    category: "technology"
  },
  {
    name: "شركة Y للاستشارات القانونية",
    type: "شركة",
    logo: "/partners/ycg-yemencg-com-company.jpeg",
    description: "تقديم استشارات قانونية متخصصة لدعم النزاعات.",
    category: "legal"
  },
];

// إحصائيات
const stats = [
  {
    icon: Users,
    value: "30+",
    label: "شريك تجاري",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Globe,
    value: "10+",
    label: "مؤسسة دولية",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Trophy,
    value: "5+",
    label: "أندية رياضية",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
];

// الفوائد
const benefits = [
  {
    icon: Handshake,
    title: "شراكات استراتيجية",
    description: "نبني علاقات طويلة الأمد مع شركائنا لتحقيق الأهداف المشتركة"
  },
  {
    icon: Target,
    title: "تكامل الخبرات",
    description: "نجمع بين خبرات متنوعة لتقديم حلول شاملة ومتطورة"
  },
  {
    icon: Award,
    title: "التميز والجودة",
    description: "نلتزم بأعلى معايير الجودة في جميع تعاوناتنا"
  }
];

// إعدادات Framer Motion
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="شركاؤنا"
        description="نفتخر بالتعاون مع مجموعة من الشركات والمنصات والمنتخبات الرياضية لدعم التحكيم الرياضي والتجاري."
      />

      {/* Stats Section */}
      <motion.section
        className="py-16 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                variants={fadeUp}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-corporate-green/10 to-transparent rounded-bl-full"></div>
                <div className={`${stat.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="relative">
                  <h3 className="text-4xl font-bold text-corporate-green mb-2">{stat.value}</h3>
                  <p className="text-lg text-gray-600 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-4">
              لماذا نتعاون؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نؤمن بقوة التعاون والشراكات في تحقيق النجاح المشترك
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-xl hover:bg-green-50 transition-all duration-300 group"
                variants={fadeUp}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-corporate-green to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <benefit.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-corporate-green mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partners Grid */}
      <motion.section
        className="py-16 md:py-20 bg-gradient-to-b from-white to-green-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-4">
              شركاؤنا المتميزون
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نبني شبكة من الشركاء المحليين والدوليين لدعم خدماتنا في التحكيم التجاري والرياضي، ونؤمن بالتعاون لتعزيز الجودة والشفافية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-corporate-green bg-white"
                variants={fadeUp}
                transition={{ delay: index * 0.15 }}
              >
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-corporate-green/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-corporate-green/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative h-24 w-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 group-hover:from-corporate-green group-hover:to-green-600 transition-all duration-300 shadow-md group-hover:shadow-xl">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-14 w-14 object-contain group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <CardTitle className="text-lg text-corporate-green group-hover:text-green-700 transition-colors">
                      {partner.name}
                    </CardTitle>
                    <Badge className="bg-corporate-green/10 text-corporate-green border-corporate-green group-hover:bg-corporate-green group-hover:text-white transition-colors">
                      {partner.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {partner.description}
                  </CardDescription>
                </CardContent>

                {/* Bottom decoration */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-corporate-green/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-16 bg-gradient-to-br from-corporate-green to-green-700 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Handshake className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            هل ترغب في أن تكون شريكاً لنا؟
          </h2>
          <p className="text-xl mb-8 text-green-50 leading-relaxed">
            نرحب بالتعاون مع المؤسسات والشركات التي تشاركنا رؤيتنا في تطوير خدمات التحكيم
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-corporate-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            تواصل معنا للشراكة
          </a>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
