"use client"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import pressReleasesData from "@/data/press-releases.json"
import { getCategoryIcon, isNew, formatDate } from "@/components/media-center/helpers"
import { Calendar, Heart, Share2, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/media-center/Skeleton"

export default function PressReleaseDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }
  const [loading, setLoading] = useState(true)
  const [press, setPress] = useState<any | null>(null)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const item = pressReleasesData.find((n: any) => n.id === id)
      setPress(item || null)
      setLoading(false)
    }, 800)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton width="60%" height={32} className="mb-4" />
        <Skeleton width="40%" height={20} className="mb-2" />
        <Skeleton width="100%" height={80} />
      </div>
    )
  }
  if (!press) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4 text-corporate-green">البيان غير موجود</h1>
        <button
          className="mt-6 px-6 py-2 bg-corporate-green text-white rounded-md hover:bg-corporate-green/90 transition"
          onClick={() => router.push("/media/news")}
        >
          العودة للبيانات الصحفية
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
          aria-label="عودة للبيانات الصحفية"
        >
          <ArrowRight className="h-5 w-5" />
          <span>عودة للبيانات الصحفية</span>
        </button>
        <div className="flex items-center gap-2 mb-2">
          {getCategoryIcon(press.category)}
          <span className="text-sm font-medium text-corporate-green">{press.category}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 rtl:ml-2 rtl:mr-0">
            <Calendar className="h-4 w-4 inline" />
            {formatDate(press.date)}
          </span>
          {isNew(press.date) && <span className="ml-2 bg-corporate-green text-white text-xs rounded px-2 py-0.5">جديد</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-corporate-green mb-4 mt-2">{press.title}</h1>
        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{press.excerpt}</p>
        <div className="flex items-center gap-4 mt-2 mb-8">
          <span className="text-xs text-muted-foreground">{press.views ?? 0} مشاهدة</span>
          <button
            className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-2 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green"
            aria-label="إضافة إلى المفضلة"
          >
            <Heart />
          </button>
          <button
            className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-2 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green"
            aria-label="مشاركة البيان"
          >
            <Share2 />
          </button>
        </div>
        {/* يمكن إضافة محتوى موسع هنا لاحقًا */}
      </div>
    </div>
  )
}
