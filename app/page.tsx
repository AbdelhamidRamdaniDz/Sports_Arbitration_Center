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
import { Calculator, Search, Gavel, GraduationCap, Handshake, Building, ArrowLeft, Calendar, Award } from "lucide-react"
import { SERVICES } from "@/lib/constants"
import { useMemo, useState, useEffect, useRef } from "react"
import DevCardEasterEgg from "@/components/DevCardEasterEgg"

export default function HomePage() {
  const stats = [
    { value: "500+", label: "قضية محلولة", description: "نزاعات رياضية" },
    { value: "50+", label: "محكم معتمد", description: "خبراء متخصصون" },
    { value: "15+", label: "سنة خبرة", description: "في التحكيم الرياضي" },
    { value: "98%", label: "رضا العملاء", description: "معدل النجاح" },
  ]

  const tools = [
    {
      title: "حاسبة النزاعات",
      description: "احسب تكلفة وتوقيت حل النزاع الرياضي",
      icon: <Calculator className="h-6 w-6" />,
      href: "/disputes/calculator",
    },
    {
      title: "تتبع القضايا",
      description: "تابع حالة قضيتك وآخر التطورات",
      icon: <Search className="h-6 w-6" />,
      href: "/disputes/tracking",
    },
  ]

  const arbitrators = [
    {
      name: "د. أحمد محمد السعيد",
      title: "رئيس المحكمين",
      experience: "20 سنة خبرة",
      specialization: "القانون الرياضي الدولي",
      image: "/professional-arabic-lawyer-portrait.jpg",
    },
    {
      name: "د. فاطمة عبدالله النور",
      title: "محكم معتمد",
      experience: "15 سنة خبرة",
      specialization: "نزاعات الأندية الرياضية",
      image: "/professional-arabic-female-lawyer-portrait.jpg",
    },
    {
      name: "د. محمد علي الزهراني",
      title: "محكم دولي",
      experience: "18 سنة خبرة",
      specialization: "التحكيم التجاري الرياضي",
      image: "/professional-arabic-male-lawyer-portrait.jpg",
    },
    {
      name: "د. سارة حسن القحطاني",
      title: "محكم معتمد",
      experience: "12 سنة خبرة",
      specialization: "حقوق اللاعبين",
      image: "/professional-arabic-female-lawyer-portrait.jpg",
    },
  ]

  const news = [
    {
      title: "إطلاق نظام التحكيم الإلكتروني الجديد",
      excerpt: "نظام متطور لإدارة قضايا التحكيم الرياضي بكفاءة عالية وشفافية تامة",
      date: "15 ديسمبر 2024",
      category: "تقنية",
      image: "/modern-digital-arbitration-system.jpg",
    },
    {
      title: "توقيع اتفاقية تعاون مع الاتحاد السعودي لكرة القدم",
      excerpt: "شراكة استراتيجية لتطوير آليات حل النزاعات في كرة القدم السعودية",
      date: "10 ديسمبر 2024",
      category: "شراكات",
      image: "/saudi-football-federation-partnership.jpg",
    },
    {
      title: "ورشة تدريبية حول التحكيم الرياضي الدولي",
      excerpt: "برنامج تدريبي متخصص للمحكمين والقانونيين في مجال الرياضة",
      date: "5 ديسمبر 2024",
      category: "تدريب",
      image: "/sports-arbitration-training-workshop.jpg",
    },
  ]

  // News category filters (UI-only)
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
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setParallaxY(window.scrollY * 0.12)
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
      <Headerlanding />

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hero-background.webp"
            alt="خلفية البطل"
            className="w-full h-full object-cover scale-105 md:scale-100 transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateY(${parallaxY * 0.5}px) scale(1.05)` }}
          />
        </div>
        {/* Green gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-br from-corporate-green to-green-800 opacity-90 mix-blend-multiply" />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="fade" delay={200}>
              <Badge className="mb-6 bg-black/30 text-white border-white/30 hover:bg-black/40 transition-all duration-300 hover:scale-105">
                مركز معتمد للتحكيم الرياضي
              </Badge>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400}>
              <h1 className="text-4xl font-bold mb-6 md:text-5xl lg:text-6xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                حلول التحكيم الرياضي
                <br />
                <span className="text-green-200">المتخصصة والموثوقة</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={600}>
              <p className="text-xl mb-8 text-green-100 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                نقدم خدمات التحكيم والوساطة الرياضية بأعلى معايير الجودة والمهنية، مع فريق من الخبراء المعتمدين لضمان
                حلول عادلة وسريعة لجميع النزاعات الرياضية
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-corporate-green hover:bg-green-50 text-lg px-8 py-3 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover-lift"
                >
                  <Link href="/forms">
                    تقديم قضية جديدة
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-corporate-green text-lg px-8 py-3 bg-transparent transition-transform duration-300 hover:scale-105 hover:shadow-lg hover-lift"
                >
                  <Link href="/services">استكشف خدماتنا</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <ScrollReveal direction="up" delay={200}>
        <StatsSection
          stats={stats}
          title="أرقام تتحدث عن التميز"
          description="إنجازاتنا في خدمة العدالة الرياضية"
          className="bg-light-grey"
        />
      </ScrollReveal>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">خدماتنا المتخصصة</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                نقدم مجموعة شاملة من الخدمات القانونية المتخصصة في المجال الرياضي
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  benefits={service.benefits}
                  icon={serviceIcons[service.icon as keyof typeof serviceIcons]}
                  href="/services"
                  variant={index === 0 ? "featured" : "default"}
                  className="transition-transform duration-300 hover:scale-105 hover:shadow-lg hover-lift"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">أدوات مساعدة</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                أدوات رقمية متطورة لتسهيل عملية التحكيم والوساطة
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <ScrollReveal key={index} direction="up" delay={400 + index * 200}>
                <ServiceCard
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                  className="bg-white border-2 hover:border-corporate-green transition-transform duration-300 hover:scale-105 hover:shadow-lg hover-lift"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Arbitrators Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">فريق المحكمين</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                نخبة من المحكمين المعتمدين والخبراء في القانون الرياضي
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {arbitrators.map((arbitrator, index) => (
              <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
                <Card className="group hover:shadow-lg transition-transform duration-300 hover:scale-105 hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <img
                        src={arbitrator.image || "/placeholder.svg"}
                        alt={arbitrator.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover transition-transform duration-300 group-hover:scale-110 ring-2 ring-transparent group-hover:ring-corporate-green"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-corporate-green text-white p-1 rounded-full transition-transform duration-300 group-hover:scale-110">
                        <Award className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="font-bold text-corporate-green mb-1 transition-colors duration-300 group-hover:text-green-700">
                      {arbitrator.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{arbitrator.title}</p>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{arbitrator.experience}</p>
                      <p className="text-xs text-corporate-green font-medium">{arbitrator.specialization}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={800}>
            <div className="text-center mt-8">
              <Button
                asChild
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent transition-all duration-300 hover:scale-105"
              >
                <Link href="/members">
                  عرض القائمة الكاملة
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-corporate-green mb-4 md:text-4xl">آخر الأخبار</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                تابع آخر التطورات والأخبار في عالم التحكيم الرياضي
              </p>
            </div>
          </ScrollReveal>

          {/* Category filters */}
          <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 border ${
                  activeCategory === cat
                    ? "bg-corporate-green text-white border-corporate-green"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article, index) => (
              <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
                <Card className="group hover:shadow-lg transition-transform duration-300 overflow-hidden hover:scale-105 hover-lift">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-corporate-green text-white transition-all duration-300 group-hover:scale-105">
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-corporate-green transition-colors duration-300">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{article.excerpt}</CardDescription>
                  </CardHeader>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={800}>
            <div className="text-center mt-8">
              <Button
                asChild
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent transition-all duration-300 hover:scale-105"
              >
                <Link href="/news">
                  عرض جميع الأخبار
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA Section */}
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
