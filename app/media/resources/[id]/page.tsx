"use client"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import resourcesData from "@/data/resources.json"
import { isNew, formatDate } from "@/components/media-center/helpers"
import Image from "next/image"
import { Calendar, Heart, Share2, ArrowRight, ImageIcon, Video, FileText, BadgeCheck } from "lucide-react"
import { Skeleton } from "@/components/media-center/Skeleton"

function getTypeIcon(type: string) {
  switch (type) {
    case "image": return <ImageIcon className="h-6 w-6 text-corporate-green" aria-label="صورة" />
    case "video": return <Video className="h-6 w-6 text-corporate-green" aria-label="فيديو" />
    case "logo": return <BadgeCheck className="h-6 w-6 text-corporate-green" aria-label="شعار" />
    case "report": return <FileText className="h-6 w-6 text-corporate-green" aria-label="تقرير" />
    default: return <FileText className="h-6 w-6 text-corporate-green" aria-label="مورد" />
  }
}

export default function ResourceDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }
  const [loading, setLoading] = useState(true)
  const [resource, setResource] = useState<any | null>(null)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const item = resourcesData.find((n: any) => n.id === id)
      setResource(item || null)
      setLoading(false)
    }, 800)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton width="100%" height={320} className="mb-8 !rounded-2xl" />
        <Skeleton width="60%" height={32} className="mb-4" />
        <Skeleton width="40%" height={20} className="mb-2" />
        <Skeleton width="100%" height={80} />
      </div>
    )
  }
  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4 text-corporate-green">المورد غير موجود</h1>
        <button
          className="mt-6 px-6 py-2 bg-corporate-green text-white rounded-md hover:bg-corporate-green/90 transition"
          onClick={() => router.push("/media/news")}
        >
          العودة للموارد الإعلامية
        </button>
      </div>
    )
  }
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button
          className="flex items-center gap-2 mb-6 text-corporate-green hover:underline focus-visible:ring-2 focus-visible:ring-corporate-green rounded px-2"
          onClick={() => router.back()}
          aria-label="عودة للموارد الإعلامية"
        >
          <ArrowRight className="h-5 w-5" />
          <span>عودة للموارد الإعلامية</span>
        </button>
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          {resource.type === "video" ? (
            <iframe
              src={resource.url.replace("watch?v=", "embed/")}
              title={resource.title}
              className="w-full h-full rounded-2xl"
              allowFullScreen
            />
          ) : (
            <Image
              src={resource.thumbnail}
              alt={resource.title}
              fill
              className="object-cover object-center"
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
              priority
            />
          )}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-2 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green"
              aria-label="إضافة إلى المفضلة"
            >
              <Heart />
            </button>
            <button
              className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-2 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green"
              aria-label="مشاركة المورد"
            >
              <Share2 />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          {getTypeIcon(resource.type)}
          <span className="text-sm font-medium text-corporate-green">{resource.type === "image" ? "صور" : resource.type === "video" ? "فيديو" : resource.type === "logo" ? "شعار" : "تقرير"}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 rtl:ml-2 rtl:mr-0">
            <Calendar className="h-4 w-4 inline" />
            {formatDate(resource.date)}
          </span>
          {isNew(resource.date) && <span className="ml-2 bg-corporate-green text-white text-xs rounded px-2 py-0.5">جديد</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-corporate-green mb-4 mt-2">{resource.title}</h1>
        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{resource.description}</p>
        <div className="flex items-center gap-4 mt-2 mb-8">
          <span className="text-xs text-muted-foreground">{resource.views ?? 0} مشاهدة</span>
        </div>
        {/* زر تحميل أو معاينة إضافية حسب النوع يمكن إضافته لاحقًا */}
      </div>
    </div>
  )
}
