import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Image as ImageIcon, Video, Mic, BookOpen, Megaphone, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "المركز الإعلامي | مركز التحكيم الرياضي",
  description:
    "بوابة الأخبار والمواد الإعلامية الخاصة بالتحكيم الرياضي في الجزائر: أخبار، صور، فيديوهات، بودكاست، ومواد إعلامية.",
}

export default async function MediaPage() {
  const sections = [
    {
      title: "الأخبار",
      description: "آخر المستجدات المتعلقة بالتحكيم الرياضي في الجزائر",
      href: "/media/news",
      icon: <Newspaper className="h-6 w-6" />,
      badge: "محدّث يوميًا",
      image: "/professional-training-session-with-instructor-teac.jpg",
    },
    {
      title: "معرض الصور",
      description: "صور من فعاليات وجلسات ومؤتمرات المركز",
      href: "/media/photos",
      icon: <ImageIcon className="h-6 w-6" />,
      badge: "صور عالية الجودة",
      image: "/professional-arbitration-meeting-room-with-judges-.jpg",
    },
    {
      title: "معرض الفيديوهات",
      description: "مقاطع مرئية توثق نشاطات المركز واللقاءات",
      href: "/media/videos",
      icon: <Video className="h-6 w-6" />,
      badge: "صيغة HD",
      image: "/modern-digital-arbitration-system.jpg",
    },
    {
      title: "البودكاست",
      description: "حوارات صوتية حول قضايا وتحولات قطاع الرياضة والقانون",
      href: "/media/podcast",
      icon: <Mic className="h-6 w-6" />,
      badge: "حلقات دورية",
      image: "/professional-mediation-session-with-people-shaking.jpg",
    },
    {
      title: "الموارد الإعلامية",
      description: "شعارات وملفات ودلائل الاستخدام لوسائل الإعلام",
      href: "/media/resources",
      icon: <BookOpen className="h-6 w-6" />,
      badge: "تحميل مباشر",
      image: "/placeholder.jpg",
    },
    {
      title: "البيانات الصحفية",
      description: "جميع البيانات والتصريحات الرسمية الصادرة عن المركز",
      href: "/media/press-releases",
      icon: <Megaphone className="h-6 w-6" />,
      badge: "إصدارات رسمية",
      image: "/professional-legal-consultation-meeting-with-lawye.jpg",
    },
  ] as const

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[260px] md:h-[360px]">
          <Image src="/hero-background.webp" alt="المركز الإعلامي" fill priority className="object-cover" />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-center gap-4">
            <Badge className="bg-corporate-green/90 text-white text-xs">بوابة إعلامية</Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">المركز الإعلامي</h1>
            <p className="max-w-2xl text-sm md:text-base text-white/90 leading-relaxed">
              منصة رسمية لنشر الأخبار والمواد المرئية والصوتية والموارد الإعلامية الخاصة بمركز التحكيم الرياضي في الجزائر.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/media/news" className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-md bg-corporate-green px-4 py-2 text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  أحدث الأخبار
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/media/videos" className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-md bg-white/90 text-corporate-green px-4 py-2 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  المواد المرئية
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sections.map((s, idx) => (
              <Link key={idx} href={s.href} className="group block">
                <Card className="overflow-hidden bg-white border-0 shadow hover:shadow-xl transition-shadow">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* gradient overlay over image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {/* badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-corporate-green/90 text-white text-[11px]">{s.badge}</Badge>
                    </div>
                    {/* hover overlay button */}
                    <div className="pointer-events-none absolute inset-0 flex items-end justify-start p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 text-corporate-green px-3 py-1.5 text-xs shadow">
                        عرض المزيد
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-corporate-green mb-2">
                      {/* decorative icon */}
                      {s.icon}
                      <h3 className="text-lg font-bold">{s.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-6">{s.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


