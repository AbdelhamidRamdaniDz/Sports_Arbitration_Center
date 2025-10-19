"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Shield, Clock, Target, Globe } from "lucide-react"

export default function AchievementsSection() {
  const achievements = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "إطار قانوني قيد الإعداد",
      description: "مواءمة مع القوانين الجزائرية والمعايير الدولية قيد المراجعة",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "منصة تحت التطوير",
      description: "جاري بناء نظام إلكتروني لإدارة القضايا والتحكيم عن بُعد",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "فريق قيد التشكيل",
      description: "جارٍ التواصل مع محكمين ومحامين لتكوين فريق مختص",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "نطاقات خدمة مستهدفة",
      description: "التحكيم والوساطة في التجارة، الاستثمار، العقار والطاقة قيد التخطيط",
    },
  ]

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-white border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, idx) => (
            <ScrollReveal key={idx} direction="up" delay={200 + idx * 100}>
              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-bold text-corporate-green mb-1">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
