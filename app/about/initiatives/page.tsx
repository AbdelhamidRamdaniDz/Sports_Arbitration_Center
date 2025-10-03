"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Globe, 
  Trophy, 
  Award, 
  Target, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Calendar,
  Heart,
  BookOpen,
  Zap
} from "lucide-react";

const initiatives = [
  {
    title: "برنامج التحكيم الرياضي",
    description: "دعم الأندية والمنتخبات في تطوير مهارات التحكيم ومراقبة المباريات الرسمية.",
    icon: Trophy,
    type: "رياضي",
    stats: { participants: 1250, success: 95 },
    features: ["تدريب معتمد", "شهادات دولية", "متابعة مستمرة"]
  },
  {
    title: "مبادرة التحكيم القانوني",
    description: "تقديم استشارات قانونية وحل النزاعات التجارية بطريقة عادلة وشفافة.",
    icon: Target,
    type: "قانوني",
    stats: { participants: 890, success: 92 },
    features: ["خبراء متخصصون", "حلول سريعة", "سرية تامة"]
  },
  {
    title: "برنامج التحول الرقمي",
    description: "تمكين الشركاء والمنصات من التحول الرقمي لتسهيل إدارة النزاعات والخدمات.",
    icon: Lightbulb,
    type: "تقني",
    stats: { participants: 2100, success: 98 },
    features: ["أدوات متقدمة", "دعم فني", "تحديثات مستمرة"]
  },
  {
    title: "مبادرات الشمول الاقتصادي",
    description: "تقديم ورش وبرامج لدعم الشركات الصغيرة والمتوسطة وزيادة فرص النمو.",
    icon: Users,
    type: "اجتماعي",
    stats: { participants: 3450, success: 89 },
    features: ["ورش تدريبية", "منح تمويل", "شبكة أعمال"]
  },
];

const achievements = [
  { number: "15K+", label: "مستفيد", icon: Users },
  { number: "500+", label: "برنامج منفذ", icon: Award },
  { number: "95%", label: "نسبة الرضا", icon: Globe },
  { number: "50+", label: "شريك استراتيجي", icon: Award },
];

export default function InitiativesPage() {
  const [animatedNumbers, setAnimatedNumbers] = useState<Record<number, string>>({});

  useEffect(() => {
    achievements.forEach((item, index) => {
      setTimeout(() => {
        const target = parseInt(item.number.replace(/\D/g, ""));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedNumbers(prev => ({
            ...prev,
            [index]: Math.floor(current) + (item.number.includes("+") ? "+" : item.number.includes("%") ? "%" : "")
          }));
        }, 30);
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen bg-light-grey">
      <Header />

      <PageHeader
        title="مبادراتنا وبرامجنا"
        description="نقدم مجموعة من المبادرات والبرامج لدعم التحكيم الرياضي والقانوني، وتعزيز الشمول الرقمي والاقتصادي."
      />

      {/* Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-soft hover-lift border border-gray-200 transition"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 surface-subtle ring-brand">
                  <item.icon className="h-7 w-7 text-corporate-green" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-corporate-green mb-1">
                  {animatedNumbers[index] || "0"}
                </div>
                <div className="text-xs md:text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((item, index) => (
              <Card
                key={index}
                className="relative hover:shadow-xl hover-lift transition-all border border-gray-200 bg-white shadow-soft"
              >
                <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center icon-gradient shadow-soft">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="text-center space-y-2">
                    <CardTitle className="text-xl md:text-2xl font-bold text-corporate-green">{item.title}</CardTitle>
                    <Badge className="bg-corporate-green/10 text-corporate-green border border-corporate-green">
                      {item.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-4">
                  <CardDescription className="text-center text-gray-600 leading-7 md:leading-8 text-sm md:text-base">{item.description}</CardDescription>
                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 hover-lift">
                        <CheckCircle className="h-4 w-4 text-corporate-green" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-corporate-green text-white hover:bg-green-700 hover:shadow-soft">
                    <span>تعرف على المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-corporate-gradient text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <Heart className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl font-extrabold mb-3">انضم إلى مبادراتنا اليوم</h2>
          <p className="mb-8 text-white/90">كن جزءًا من التغيير الإيجابي وساهم في بناء مستقبل أفضل</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-corporate-green hover:bg-gray-100 hover:shadow-soft hover-lift">
              <Zap className="ml-2 h-5 w-5" /> ابدأ رحلتك معنا
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10 hover-lift">
              <BookOpen className="ml-2 h-5 w-5" /> تصفح جميع البرامج
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
