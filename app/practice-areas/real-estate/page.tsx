import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CTASection } from "@/components/cta-section"
import { Shield, Scale, FileCheck, Building2, Award, Users, Clock, TrendingUp, CheckCircle2, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "التحكيم والوساطة العقارية | منصة ثقيم للتسوية البديلة",
  description:
    "منصة إلكترونية متخصصة في التحكيم والوساطة المؤسسية للمنازعات العقارية، مع إدارة شاملة للنزاعات في التطوير والاستثمار وإدارة الأصول.",
  keywords: "تحكيم عقاري, وساطة عقارية, منازعات عقارية, ADR, الجزائر",
  openGraph: {
    title: "التحكيم والوساطة العقارية | ثقيم",
    description: "حلول التسوية البديلة المتخصصة في المنازعات العقارية عبر منصة رقمية متكاملة.",
  },
}

type Stat = {
  value: string
  label: string
  description?: string
  icon?: any
  color?: string
}

const REAL_ESTATE_STATS: Stat[] = [
  { 
    value: "100%", 
    label: "منصة رقمية متكاملة", 
    description: "إدارة إلكترونية كاملة",
    icon: TrendingUp,
    color: "emerald"
  },
  { 
    value: "24/7", 
    label: "متاحة على مدار الساعة", 
    description: "خدمة مستمرة",
    icon: Building2,
    color: "blue"
  },
  { 
    value: "3", 
    label: "أنواع نزاعات عقارية", 
    description: "تطوير، تمويل، إدارة",
    icon: FileCheck,
    color: "purple"
  },
  { 
    value: "10+", 
    label: "محكم ووسيط معتمد", 
    description: "متخصصون في العقار",
    icon: Award,
    color: "amber"
  },
]

const ARBITRATION_STATS: Stat[] = [
  { value: "45", label: "يوم متوسط", description: "لإصدار الحكم التحكيمي" },
  { value: "100%", label: "رقمية بالكامل", description: "إدارة القضايا إلكترونياً" },
  { value: "3", label: "مراحل واضحة", description: "من التقديم للحكم" },
  { value: "24/7", label: "دعم مستمر", description: "متابعة على مدار الساعة" },
]

const TRUST_FEATURES = [
  {
    icon: Shield,
    title: "حيادية مؤسسية",
    description: "هيئات تحكيم محايدة معتمدة وفق المعايير الدولية",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Scale,
    title: "إجراءات منظمة",
    description: "بروتوكولات تحكيم ووساطة معتمدة ومتوافقة قانونياً",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileCheck,
    title: "سرية تامة",
    description: "حماية معلومات الأطراف وسرية الإجراءات والأحكام",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Building2,
    title: "تخصص عقاري",
    description: "محكمون متخصصون في القانون العقاري والتطوير",
    gradient: "from-amber-500 to-orange-500"
  }
]

const PROCESS_STEPS = [
  {
    number: "01",
    title: "تقديم الطلب",
    description: "تقديم طلب التحكيم أو الوساطة إلكترونياً عبر المنصة مع المستندات المطلوبة"
  },
  {
    number: "02",
    title: "تشكيل الهيئة",
    description: "اختيار وتعيين المحكمين أو الوسطاء المتخصصين في المجال العقاري"
  },
  {
    number: "03",
    title: "الإجراءات",
    description: "عقد الجلسات والاستماع للأطراف وفحص المستندات والأدلة"
  },
  {
    number: "04",
    title: "الحكم والتنفيذ",
    description: "إصدار الحكم التحكيمي أو اتفاق الوساطة ومتابعة التنفيذ"
  }
]

const BENEFITS = [
  "توفير الوقت والتكاليف مقارنة بالقضاء التقليدي",
  "سرية كاملة لجميع الإجراءات والمعلومات",
  "مرونة في اختيار المحكمين والإجراءات",
  "سرعة في إصدار الأحكام وتنفيذها",
  "تخصص في المجال العقاري والقانون العقاري",
  "إدارة إلكترونية كاملة للقضايا"
]

function extractNumericValue(value: string): number {
  const cleaned = value.replace(/[$,kMB+%]/g, "")
  const match = cleaned.match(/[\d.]+/)
  if (!match) return 0
  
  const baseNumber = parseFloat(match[0])
  
  if (value.includes("B")) return baseNumber * 1_000_000_000
  if (value.includes("M")) return baseNumber * 1_000_000
  if (value.includes("k")) return baseNumber * 1_000
  
  return baseNumber
}

function extractSuffix(value: string): string {
  if (value.includes("+")) return "+"
  if (value.includes("%")) return "%"
  return ""
}

const getColorClasses = (color: string) => {
  const colors = {
    emerald: "from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30",
    blue: "from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30",
    purple: "from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30",
    amber: "from-amber-500/20 to-orange-500/20 group-hover:from-amber-500/30 group-hover:to-orange-500/30"
  }
  return colors[color as keyof typeof colors] || colors.emerald
}

export default function RealEstate() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-gray-800">
      {/* Enhanced Background with Animated Gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 h-[800px] w-[800px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.03] text-white" aria-hidden>
          <defs>
            <pattern id="dots-re" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-re)" />
        </svg>
      </div>

      <Header />

      {/* Enhanced Hero Section */}
      <section 
        className="relative overflow-hidden py-20 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/real-estate.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-5xl text-center text-white">
            <ScrollReveal direction="up" delay={100}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm backdrop-blur-xl shadow-2xl">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="font-medium">منصة تحكيم ووساطة مؤسسية معتمدة</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={150}>
              <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-emerald-200">
                التحكيم والوساطة العقارية
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed md:text-xl lg:text-2xl text-white/90 font-light">
                منصة إلكترونية متخصصة في إدارة وحسم المنازعات العقارية عبر التحكيم والوساطة المؤسسية. نوفر خدمات التحكيم والوساطة في نزاعات التطوير والاستثمار والتمويل العقاري، بما يضمن اليقين القانوني وحماية القيمة عبر دورة حياة الأصل العقاري.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={250}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-2xl shadow-emerald-500/40 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                  <Link href="/forms">
                    تقديم نزاع عقاري
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white/40 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                  <Link href="/about/overview">عن المنصة</Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Trust Indicators */}
            <ScrollReveal direction="up" delay={300}>
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>منصة رقمية متكاملة</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>إجراءات منظمة وواضحة</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>فريق متخصص في العقار</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center mb-14">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm text-white backdrop-blur-md">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>الإنجازات والأرقام</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100">
                حجم الممارسة العقارية
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">مؤشرات النزاعات العقارية المدارة عبر المنصة</p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {REAL_ESTATE_STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={150 + index * 50}>
                <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-emerald-500/20 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(stat.color || 'emerald')} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Icon */}
                  <div className="relative mb-4 inline-flex rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-4 ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon && <stat.icon className="h-8 w-8 text-white" />}
                  </div>
                  
                  {/* Value */}
                  <div className="relative mb-3 text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                    <AnimatedCounter 
                      end={extractNumericValue(stat.value)} 
                      suffix={extractSuffix(stat.value)} 
                      duration={2500} 
                    />
                  </div>
                  
                  {/* Label */}
                  <div className="relative mb-2 text-xl font-bold text-white/90">{stat.label}</div>
                  
                  {/* Description */}
                  {stat.description && (
                    <div className="relative text-sm text-white/60 font-medium">{stat.description}</div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Trust Features Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center mb-16">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm text-white backdrop-blur-md">
                  <Scale className="h-4 w-4 text-blue-400" />
                  <span>خدمة أساسية</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  التحكيم والوساطة في النزاعات العقارية
                </h2>
                <p className="text-white/70 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed">
                  نوفر خدمات التحكيم والوساطة المؤسسية المتخصصة في حسم المنازعات العقارية، من نزاعات عقود التطوير والإنشاء إلى نزاعات التمويل وإدارة الأصول، عبر منصة رقمية متكاملة تضمن الشفافية والحيادية والسرعة.
                </p>
              </div>
            </ScrollReveal>

            {/* Features Grid with Enhanced Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {TRUST_FEATURES.map((feature, index) => (
                <ScrollReveal key={feature.title} direction="up" delay={150 + index * 50}>
                  <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
                    {/* Animated Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`} />
                    
                    {/* Icon with Gradient */}
                    <div className={`relative mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="relative mb-3 text-xl font-bold text-white group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="relative text-sm text-white/70 leading-relaxed group-hover:text-white/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Enhanced Performance Metrics Card */}
            <ScrollReveal direction="up" delay={300}>
              <div className="relative rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-10 md:p-14 backdrop-blur-2xl shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
                
                <div className="relative">
                  <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm text-white backdrop-blur-md">
                      <Award className="h-4 w-4 text-emerald-400" />
                      <span>التزامنا بالجودة</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">معايير الخدمة المستهدفة</h3>
                    <p className="text-white/60 text-lg">التزامنا بتقديم خدمة احترافية وسريعة</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {ARBITRATION_STATS.map((stat, index) => (
                      <div key={stat.label} className="text-center group">
                        <div className="mb-3 text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:scale-110 transition-transform duration-300">
                          <AnimatedCounter 
                            end={extractNumericValue(stat.value)} 
                            suffix={extractSuffix(stat.value)} 
                            duration={2500} 
                          />
                        </div>
                        <div className="mb-2 text-lg font-bold text-white">{stat.label}</div>
                        {stat.description && (
                          <div className="text-sm text-white/60">{stat.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-white/10">
                    <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-2xl shadow-emerald-500/40 px-8 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                      <Link href="/forms">
                        تقديم طلب تحكيم
                        <ArrowLeft className="mr-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-2 border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 px-8 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                      <Link href="/about/overview">تفاصيل الخدمة</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Process Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm text-white backdrop-blur-md">
                <Clock className="h-4 w-4 text-purple-400" />
                <span>خطوات العمل</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                كيف تعمل منصة ثقيم؟
              </h2>
              <p className="text-white/70 max-w-3xl mx-auto text-lg">
                عملية بسيطة ومنظمة لحسم نزاعك العقاري بكل احترافية
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {PROCESS_STEPS.map((step, index) => (
              <ScrollReveal key={step.number} direction="up" delay={150 + index * 50}>
                <div className="relative group">
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full">
                    {/* Step Number */}
                    <div className="mb-6 text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                      {step.number}
                    </div>
                    
                    {/* Title */}
                    <h3 className="mb-4 text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Connector Line (hidden on last item) */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent -translate-y-1/2" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* New Benefits Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal direction="up" delay={100}>
              <div className="rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-10 md:p-14 backdrop-blur-2xl shadow-2xl">
                <div className="text-center mb-12">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm text-white backdrop-blur-md">
                    <Award className="h-4 w-4 text-amber-400" />
                    <span>المزايا الرئيسية</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    لماذا تختار التحكيم والوساطة؟
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {BENEFITS.map((benefit, index) => (
                    <ScrollReveal key={index} direction="up" delay={150 + index * 50}>
                      <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                        </div>
                        <p className="text-white/80 leading-relaxed">{benefit}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enhanced Trust Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={100}>
            <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/20 bg-gradient-to-br from-slate-800/90 via-slate-900/80 to-slate-800/90 p-10 md:p-16 text-center backdrop-blur-2xl shadow-2xl overflow-hidden relative">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm text-white backdrop-blur-md shadow-lg">
                  <FileCheck className="h-5 w-5 text-emerald-400" />
                  <span className="font-semibold">منصة معتمدة ومرخصة</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                  الثقة المؤسسية في إدارة النزاعات
                </h2>
                
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
                  تعمل منصة ثقيم وفق أعلى معايير الحيادية والشفافية، مع التزام تام بالسرية المهنية والإجراءات المنظمة. نضمن لجميع الأطراف إجراءات عادلة وفعالة في بيئة رقمية آمنة.
                </p>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                  <div className="flex items-center gap-2 text-white/70">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-medium">حماية البيانات</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Scale className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium">حيادية تامة</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Users className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-medium">فريق متخصص</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Award className="h-5 w-5 text-amber-400" />
                    <span className="text-sm font-medium">جودة عالية</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-white/90 shadow-2xl px-10 py-6 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105">
                    <Link href="/forms">
                      ابدأ إجراءات التحكيم
                      <ArrowLeft className="mr-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                    <Link href="/about/accreditation">الاعتمادات والتراخيص</Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <CTASection
        title="إدارة احترافية للنزاعات العقارية"
        description="نقدم حلول التحكيم والوساطة المتخصصة لحماية استثماراتك العقارية وضمان اليقين القانوني في جميع المراحل."
        primaryButton={{ text: "تقديم نزاع", href: "/forms" }}
        secondaryButton={{ text: "الخدمات", href: "/services" }}
        variant="gradient-light"
        className="relative"
      />

      <Footer />
    </main>
  )
}