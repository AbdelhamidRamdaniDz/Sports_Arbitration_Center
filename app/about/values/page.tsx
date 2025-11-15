"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, ShieldCheck, Eye, Lock, Landmark, Star, Sparkles, Award, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle, Users, BookOpen } from "lucide-react"

export default function ValuesPage() {
  const values = [
    { 
      title: "النزاهة", 
      icon: <Scale className="h-8 w-8" />, 
      desc: "نلتزم بالحياد التام والعدل في جميع عمليات التحكيم، ونضع الأمانة فوق كل اعتبار.",
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50"
    },
    { 
      title: "الاستقلالية", 
      icon: <ShieldCheck className="h-8 w-8" />, 
      desc: "نمارس عملنا باستقلالية تامة بعيدًا عن أي ضغوط خارجية، ونحافظ على موضوعيتنا في كل قرار.",
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    { 
      title: "العدالة", 
      icon: <Landmark className="h-8 w-8" />, 
      desc: "تحقيق العدالة بين جميع الأطراف وفق القوانين والمعايير الدولية، دون تمييز أو تحيّز.",
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    { 
      title: "السرية", 
      icon: <Lock className="h-8 w-8" />, 
      desc: "حماية سرية الأطراف والمعلومات في جميع مراحل التحكيم، وضمان خصوصية كل نزاع.",
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    { 
      title: "الشفافية", 
      icon: <Eye className="h-8 w-8" />, 
      desc: "الالتزام بالوضوح والإفصاح في كل إجراء وقرار، وبناء الثقة مع جميع الأطراف.",
      gradient: "from-indigo-400 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50"
    },
  ]

  const stats = [
    { icon: <Award className="h-6 w-6" />, label: "سنوات الخبرة", value: "1+" },
    { icon: <Users className="h-6 w-6" />, label: "عميل راضٍ", value: "5+" },
    { icon: <CheckCircle className="h-6 w-6" />, label: "قضية محلولة", value: "10+" },
    { icon: <TrendingUp className="h-6 w-6" />, label: "نسبة النجاح", value: "98%" },
  ]

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <Header />

      {/* Hero Section المحسّن */}
      <section className="relative overflow-hidden">
        {/* خلفية متحركة */}
        <div className="absolute inset-0 bg-gradient-to-br from-corporate-green/5 via-corporate-gold/5 to-green-100/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-corporate-gold/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-corporate-green/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* النص */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 text-right"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-corporate-gold/10 border border-corporate-gold/30 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="h-4 w-4 text-corporate-gold" />
                <span className="text-sm font-semibold text-corporate-green">قيمنا الجوهرية</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-l from-corporate-green via-corporate-green to-corporate-gold mb-6 leading-tight">
                قيم المركز
              </h1>
              
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                في <span className="font-bold text-corporate-green">مركز تحكيم تك (CTSA)</span>، نؤمن أن القيم الأخلاقية ليست مجرد شعارات، بل هي الأساس الذي يُبنى عليه كل قرار وكل إجراء في تسوية النزاعات. التزامنا بالنزاهة، الاستقلالية، العدالة، السرية، والشفافية هو ما يمنح عملاءنا الثقة والطمأنينة.
              </p>

              {/* إحصائيات سريعة */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-corporate-green to-corporate-gold/80 text-white mb-2 shadow-lg">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-corporate-green">{stat.value}</div>
                    <div className="text-xs text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* الصورة */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-corporate-gold/20 to-corporate-green/20 rounded-3xl blur-2xl"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white bg-white transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/value.png"
                  alt="اجتماع قانوني احترافي"
                  width={1200}
                  height={500}
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-corporate-green/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* بطاقات القيم المحسّنة */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-corporate-green mb-4">
              المبادئ التي نعمل بها
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              خمس قيم أساسية تشكل هويتنا وتوجه كل قراراتنا
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                variants={{ 
                  hidden: { opacity: 0, y: 50, scale: 0.9 }, 
                  visible: { opacity: 1, y: 0, scale: 1 } 
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative"
              >
                {/* خلفية متوهجة */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${val.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                {/* البطاقة */}
                <div className={`relative bg-gradient-to-br ${val.bgGradient} rounded-3xl p-8 shadow-lg border-2 border-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col`}>
                  {/* الأيقونة */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${val.gradient} text-white shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {val.icon}
                    </div>
                  </div>

                  {/* المحتوى */}
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-3xl font-black text-corporate-green mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-corporate-green group-hover:to-corporate-gold transition-all duration-300">
                      {val.title}
                    </h3>
                    <p className="text-base text-slate-700 leading-relaxed flex-1">
                      {val.desc}
                    </p>
                    
                    {/* نجمة ذهبية */}
                    <div className="mt-6 flex justify-center">
                      <Star className="h-6 w-6 text-corporate-gold fill-corporate-gold opacity-0 group-hover:opacity-100 transform group-hover:rotate-180 transition-all duration-500" />
                    </div>
                  </div>

                  {/* رقم القيمة */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <span className="text-lg font-black text-corporate-green">{idx + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* صورة العدالة المحسّنة */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-corporate-gold/30 to-corporate-green/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
            <Image
              src="/modern-digital-arbitration-system.jpg"
              alt="نظام التحكيم الرقمي الحديث"
              width={1200}
              height={500}
              className="w-full h-[280px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-corporate-green/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-lg font-bold text-corporate-green">التكنولوجيا في خدمة العدالة</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* اقتباس ملهم محسّن */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* خلفية متوهجة */}
          <div className="absolute inset-0 bg-gradient-to-r from-corporate-gold/20 via-corporate-green/20 to-corporate-gold/20 rounded-3xl blur-3xl"></div>
          
          {/* البطاقة */}
          <div className="relative bg-gradient-to-br from-white via-green-50/50 to-amber-50/50 rounded-3xl shadow-2xl p-10 md:p-16 border-2 border-white">
            {/* علامات الاقتباس */}
            <div className="absolute top-8 right-8 text-8xl text-corporate-gold/20 font-serif leading-none">"</div>
            <div className="absolute bottom-8 left-8 text-8xl text-corporate-gold/20 font-serif leading-none">"</div>
            
            {/* المحتوى */}
            <div className="relative z-10 text-center">
              <blockquote className="text-2xl md:text-3xl font-bold bg-clip-text bg-gradient-to-l from-corporate-green via-corporate-green to-corporate-gold mb-8 leading-relaxed text-black">
                الاحترافية ليست خيارًا، بل التزام راسخ ينعكس في كل قرار نتخذه وكل نزاع نسهم في حله
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gradient-to-l from-corporate-gold to-transparent"></div>
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-corporate-gold" />
                  <span className="text-xl font-black text-corporate-green">مركز تحكيم تك</span>
                </div>
                <div className="h-px w-16 bg-gradient-to-r from-corporate-gold to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}