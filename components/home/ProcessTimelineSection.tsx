"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Target, MessageSquare, Search, CheckCircle } from "lucide-react"

export default function ProcessTimelineSection() {
  const steps = [
    { step: "01", title: "التواصل الأولي", description: "اتصل بنا أو احجز استشارة مجانية لمدة 30 دقيقة", icon: <MessageSquare className="h-6 w-6" />, color: "from-blue-500 to-cyan-500" },
    { step: "02", title: "تقييم الحالة", description: "نستمع لك ونقيم احتياجاتك بدقة واحترافية", icon: <Search className="h-6 w-6" />, color: "from-purple-500 to-pink-500" },
    { step: "03", title: "خطة العمل", description: "نضع خطة مخصصة ومفصلة لحل قضيتك", icon: <Target className="h-6 w-6" />, color: "from-orange-500 to-amber-500" },
    { step: "04", title: "التنفيذ والمتابعة", description: "نعمل معك خطوة بخطوة حتى تحقيق النتيجة المطلوبة", icon: <CheckCircle className="h-6 w-6" />, color: "from-green-500 to-emerald-500" },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
              <Target className="h-4 w-4 ml-1 inline" />
              عملية واضحة ومنظمة
            </Badge>
            <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
              كيف نعمل معك
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              خطوات بسيطة وواضحة من البداية حتى النهاية
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
                <div className="relative">
                  <Card className="group border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
                    <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-bold shadow-lg text-lg group-hover:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                    <CardContent className="p-6 pt-10 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="h-14 w-14 rounded-xl bg-corporate-green/10 text-corporate-green flex items-center justify-center group-hover:scale-110 group-hover:bg-corporate-green group-hover:text-white transition-all duration-300">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="font-bold text-corporate-green mb-3 text-lg group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-gradient-to-r from-corporate-green/30 to-corporate-green/10 z-10" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
