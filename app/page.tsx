"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Headerlanding } from "@/components/headerlanding"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  Calculator,
  Search,
  Gavel,
  GraduationCap,
  Handshake,
  Building,
  ArrowLeft,
  Calendar,
  Award,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Globe,
  FileCheck,
  MessageSquare,
} from "lucide-react"
import { SERVICES } from "@/lib/constants"
import { useMemo, useState, useEffect, useRef } from "react"
import DevCardEasterEgg from "@/components/DevCardEasterEgg"

export default function HomePage() {
  type Stat = {
    value: string
    label: string
    description: string
    icon: JSX.Element
    trend?: string
  }
const stats: Stat[] = [
  { 
    value: "قريباً", 
    label: "بداية استقبال القضايا", 
    description: "سيتم الإعلان بعد الإطلاق",
    icon: <FileCheck className="h-6 w-6" />,
  },
  { 
    value: "قيد التأسيس", 
    label: "فريق التحكيم", 
    description: "قيد التقييم والاعتماد",
    icon: <Users className="h-6 w-6" />,
  },
  { 
    value: "—", 
    label: "سنوات الخبرة", 
    description: "المركز في مرحلة التأسيس",
    icon: <Award className="h-6 w-6" />,
  },
  { 
    value: "—", 
    label: "تقييم العملاء", 
    description: "لم يبدأ التشغيل بعد",
    icon: <Star className="h-6 w-6" />,
  },
]

  const tools = [
    {
      title: "حاسبة النزاعات",
      description: "احسب تكلفة وتوقيت حل النزاع الرياضي بدقة",
      icon: <Calculator className="h-6 w-6" />,
      href: "/disputes/calculator",
      badge: "جديد",
      color: "blue",
    },
    {
      title: "تتبع القضايا",
      description: "تابع حالة قضيتك وآخر التطورات لحظياً",
      icon: <Search className="h-6 w-6" />,
      href: "/disputes/tracking",
      badge: "مباشر",
      color: "green",
    },
  ]

  const [arbitrators, setArbitrators] = useState<Array<{
    id: string
    name: string
    image?: string | null
    experience: number | null
    specialization: string | null
    city: string | null
  }>>([])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/members?role=arbitrator&status=active')
        if (!res.ok) return
        const json = await res.json()
        if (mounted) setArbitrators(json.data || [])
      } catch {}
    }
    load()
    return () => { mounted = false }
  }, [])

  const news = [
    {
      title: "إطلاق نظام التحكيم الإلكتروني الجديد",
      excerpt: "نظام متطور لإدارة قضايا التحكيم الرياضي بكفاءة عالية وشفافية تامة",
      date: "15 ديسمبر 2024",
      category: "تقنية",
      image: "/modern-digital-arbitration-system.jpg",
      readTime: "5 دقائق",
      featured: true,
    },
    {
      title: "توقيع اتفاقية تعاون مع الاتحاد السعودي لكرة القدم",
      excerpt: "شراكة استراتيجية لتطوير آليات حل النزاعات في كرة القدم السعودية",
      date: "10 ديسمبر 2024",
      category: "شراكات",
      image: "/saudi-football-federation-partnership.jpg",
      readTime: "4 دقائق",
      featured: false,
    },
    {
      title: "ورشة تدريبية حول التحكيم الرياضي الدولي",
      excerpt: "برنامج تدريبي متخصص للمحكمين والقانونيين في مجال الرياضة",
      date: "5 ديسمبر 2024",
      category: "تدريب",
      image: "/sports-arbitration-training-workshop.jpg",
      readTime: "3 دقائق",
      featured: false,
    },
  ]

const achievements = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "إطار قانوني معتمد",
    description: "العمل وفق القوانين الجزائرية والمعايير الدولية للتحكيم",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "منصة تحت التطوير",
    description: "بناء نظام إلكتروني لإدارة القضايا والتحكيم عن بُعد",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "خبراء مؤهلون",
    description: "تعاون مع محكمين ومحامين معتمدين من هيئات رسمية",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "مجالات متعددة",
    description: "خدمات التحكيم والوساطة في التجارة، الاستثمار، العقار، والطاقة",
  },
]


  // News category filters
  const categories = useMemo(() => {
    const cats = Array.from(new Set(news.map((n) => n.category)))
    return ["الكل", ...cats]
  }, [news])
  const [activeCategory, setActiveCategory] = useState<string>("الكل")
  const filteredNews = useMemo(() => {
    if (activeCategory === "الكل") return news
    return news.filter((n) => n.category === activeCategory)
  }, [activeCategory, news])

  // Hero parallax
  const [parallaxY, setParallaxY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        setParallaxY(scrolled * 0.12)
        setScrollProgress((scrolled / maxScroll) * 100)
        rafRef.current && cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const serviceIcons = {
    gavel: <Gavel className="h-6 w-6" />,
    "graduation-cap": <GraduationCap className="h-6 w-6" />,
    handshake: <Handshake className="h-6 w-6" />,
    building: <Building className="h-6 w-6" />,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-corporate-green to-emerald-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Headerlanding />

      {/* Enhanced Hero Section */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <img
            src="/hero-background.jpg"
            alt="خلفية البطل"
            className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateY(${parallaxY * 0.5}px) scale(1.05)` }}
          />
        </div>
        
        {/* Multiple Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-corporate-green via-green-700 to-emerald-900 opacity-90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-5xl mx-auto text-center">
            <ScrollReveal direction="fade" delay={200}>
              <Badge className="mb-6 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 px-6 py-2 text-sm">
                <Sparkles className="h-4 w-4 ml-2 inline" />
                مركز معتمد دولياً للتحكيم الرياضي
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={400}>
              <h1 className="text-4xl font-bold mb-6 md:text-6xl lg:text-7xl leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                حلول التحكيم الرياضي
                <br />
                <span className="bg-gradient-to-r from-green-200 to-emerald-300 bg-clip-text text-transparent">
                  المتخصصة والموثوقة
                </span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={600}>
              <p className="text-xl md:text-2xl mb-10 text-green-50 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                نقدم خدمات التحكيم والوساطة الرياضية بأعلى معايير الجودة والمهنية، مع فريق من الخبراء المعتمدين لضمان
                حلول عادلة وسريعة لجميع النزاعات الرياضية
              </p>
            </ScrollReveal>

            {/* Quick Stats in Hero */}
            <ScrollReveal direction="up" delay={700}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-green-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-corporate-green hover:bg-green-50 text-lg px-10 py-6 h-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group"
                >
                  <Link href="/forms">
                    <span className="relative">
                      تقديم قضية جديدة
                      <ArrowLeft className="mr-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-corporate-green text-lg px-10 py-6 h-auto bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <Link href="/services">
                    استكشف خدماتنا
                    <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Trust Badges */}
            <ScrollReveal direction="up" delay={900}>
              <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
                <div className="flex items-center gap-2 text-sm text-green-100">
                  <CheckCircle className="h-5 w-5" />
                  <span>معتمد دولياً</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-100">
                  <CheckCircle className="h-5 w-5" />
                  <span>500+ قضية محلولة</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-100">
                  <CheckCircle className="h-5 w-5" />
                  <span>98% معدل نجاح</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32">
            <path
              fill="#ffffff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Achievements Strip */}
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

      {/* Enhanced Stats Section */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
                <TrendingUp className="h-4 w-4 ml-1 inline" />
                إنجازاتنا في أرقام
              </Badge>
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
                أرقام تتحدث عن التميز
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                سجل حافل بالنجاحات في خدمة العدالة الرياضية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, idx) => (
                <ScrollReveal key={idx} direction="up" delay={300 + idx * 100}>
                  <Card className="group relative overflow-hidden border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-corporate-green/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                    <CardContent className="p-6 relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                          {stat.icon}
                        </div>
                        {stat.trend && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <TrendingUp className="h-3 w-3 ml-1" />
                            {stat.trend}
                          </Badge>
                        )}
                      </div>
                      <div className="text-4xl font-bold text-corporate-green mb-2 group-hover:scale-110 transition-transform">
                        {stat.value}
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">{stat.description}</div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Enhanced Services Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
                <Zap className="h-4 w-4 ml-1 inline" />
                خدمات متكاملة
              </Badge>
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
                خدماتنا المتخصصة
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                مجموعة شاملة من الخدمات القانونية المتخصصة في المجال الرياضي
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  benefits={service.benefits.slice(0, 3)}
                  icon={serviceIcons[service.icon as keyof typeof serviceIcons]}
                  href="/services"
                  variant={index === 0 ? "featured" : "default"}
                  className="h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={800}>
            <div className="text-center">
              <Link href="/services">
                <Button size="lg" className="bg-gradient-to-r from-corporate-green to-emerald-600 hover:from-corporate-green/90 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  عرض جميع الخدمات
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enhanced Tools Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
                <Calculator className="h-4 w-4 ml-1 inline" />
                أدوات ذكية
              </Badge>
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
                أدوات مساعدة متطورة
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                تقنيات حديثة لتسهيل عملية التحكيم والوساطة
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <ScrollReveal key={index} direction="up" delay={400 + index * 200}>
                <Link href={tool.href}>
                  <Card className={`group relative overflow-hidden border-2 hover:border-corporate-green transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full ${
                    tool.color === 'blue' ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-gradient-to-br from-green-50 to-white'
                  }`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-corporate-green/5 to-transparent rounded-full -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-700" />
                    <CardContent className="p-8 relative">
                      <div className="flex items-start justify-between mb-6">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                          {tool.icon}
                        </div>
                        {tool.badge && (
                          <Badge className="bg-amber-100 text-amber-700 animate-pulse">
                            <Sparkles className="h-3 w-3 ml-1" />
                            {tool.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-corporate-green mb-3 group-hover:text-emerald-700 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-corporate-green font-semibold group-hover:translate-x-2 transition-transform">
                        ابدأ الآن
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Arbitrators Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
                <Users className="h-4 w-4 ml-1 inline" />
                خبراء معتمدون
              </Badge>
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
                فريق المحكمين المتميز
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                نخبة من المحكمين المعتمدين والخبراء في القانون الرياضي الدولي
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {arbitrators.map((arbitrator, index) => (
              <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
                <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-corporate-green">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-corporate-green/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                  <CardContent className="p-6 text-center relative">
                    <div className="relative mb-4 inline-block">
                      <div className="relative">
                        <img
                          src={arbitrator.image || '/placeholder.svg'}
                          alt={arbitrator.name}
                          className="w-24 h-24 rounded-full mx-auto object-cover transition-all duration-300 group-hover:scale-110 ring-4 ring-gray-100 group-hover:ring-corporate-green"
                        />
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-corporate-green mb-1 text-lg group-hover:text-emerald-700 transition-colors">
                      {arbitrator.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{arbitrator.city || 'محكم'}</p>
                    
                    <div className="space-y-2 mb-4" />
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{typeof arbitrator.experience === 'number' ? `${arbitrator.experience} سنة خبرة` : '-'}</span>
                      </div>
                      <p className="text-corporate-green font-medium px-2">
                        {arbitrator.specialization || '-'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={800}>
            <div className="text-center mt-10">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white transition-all duration-300 hover:scale-105"
              >
                <Link href="/members">
                  عرض القائمة الكاملة للمحكمين
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enhanced News Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-corporate-green/10 text-corporate-green">
                <Calendar className="h-4 w-4 ml-1 inline" />
                آخر المستجدات
              </Badge>
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">
                آخر الأخبار والفعاليات
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                تابع آخر التطورات والأخبار في عالم التحكيم الرياضي
              </p>
            </div>
          </ScrollReveal>

          {/* Enhanced Category filters */}
          <ScrollReveal direction="up" delay={300}>
            <div className="max-w-4xl mx-auto mb-10 flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-corporate-green to-emerald-600 text-white border-corporate-green shadow-lg scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-corporate-green/50 hover:scale-105"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredNews.map((article, index) => (
              <ScrollReveal key={index} direction="up" delay={400 + index * 100}>
                <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-corporate-green h-full">
                  {article.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-amber-500 text-white shadow-lg animate-pulse">
                        <Sparkles className="h-3 w-3 ml-1" />
                        مميز
                      </Badge>
                    </div>
                  )}
                  
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-corporate-green/90 backdrop-blur-sm text-white border-white/20 transition-all duration-300 group-hover:scale-110">
                      {article.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight group-hover:text-corporate-green transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </CardTitle>
                    
                    <CardDescription className="leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center text-corporate-green font-semibold text-sm mt-4 group-hover:translate-x-2 transition-transform">
                      اقرأ المزيد
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </div>
                  </CardHeader>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={800}>
            <div className="text-center mt-10">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white transition-all duration-300 hover:scale-105"
              >
                <Link href="/news">
                  عرض جميع الأخبار والمقالات
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Timeline Section */}
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
              {[
                {
                  step: "01",
                  title: "التواصل الأولي",
                  description: "اتصل بنا أو احجز استشارة مجانية لمدة 30 دقيقة",
                  icon: <MessageSquare className="h-6 w-6" />,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  step: "02",
                  title: "تقييم الحالة",
                  description: "نستمع لك ونقيم احتياجاتك بدقة واحترافية",
                  icon: <Search className="h-6 w-6" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  step: "03",
                  title: "خطة العمل",
                  description: "نضع خطة مخصصة ومفصلة لحل قضيتك",
                  icon: <Target className="h-6 w-6" />,
                  color: "from-orange-500 to-amber-500",
                },
                {
                  step: "04",
                  title: "التنفيذ والمتابعة",
                  description: "نعمل معك خطوة بخطوة حتى تحقيق النتيجة المطلوبة",
                  icon: <CheckCircle className="h-6 w-6" />,
                  color: "from-green-500 to-emerald-500",
                },
              ].map((item, index) => (
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

      {/* Enhanced Final CTA Section */}
      <ScrollReveal direction="up" delay={200}>
        <CTASection
          title="هل تحتاج إلى خدمات التحكيم الرياضي؟"
          description="فريقنا من الخبراء المعتمدين جاهز لمساعدتك في حل النزاعات الرياضية بطريقة عادلة وسريعة. ابدأ رحلتك نحو العدالة الرياضية اليوم."
          primaryButton={{
            text: "تقديم قضية جديدة",
            href: "/forms",
          }}
          secondaryButton={{
            text: "تواصل معنا",
            href: "/contact",
          }}
          variant="corporate"
        />
      </ScrollReveal>

      <DevCardEasterEgg />

      <Footer />
    </div>
  )
}