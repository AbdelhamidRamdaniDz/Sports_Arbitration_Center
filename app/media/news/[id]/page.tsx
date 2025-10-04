"use client"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import newsData from "@/data/news.json"
import { getCategoryIcon, isNew, formatDate } from "@/components/media-center/helpers"
import Image from "next/image"
import { Calendar, Heart, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/media-center/Skeleton"
import { useFavorites } from "@/hooks/useFavorites"
import { useViewCounter } from "@/hooks/useViewCounter"
import { ShareButton } from "@/components/media-center/ShareButton"

export default function NewsDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState<any | null>(null)
  const { isFavorite, toggleFavorite } = useFavorites("news")
  const { views } = useViewCounter("news", id)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const item = newsData.find((n: any) => n.id === id)
      setNews(item || null)
      setLoading(false)
    }, 800)
  }, [id])

  // Related news (same category, exclude current)
  const related = useMemo(() => {
    if (!news) return []
    return newsData.filter((n: any) => n.category === news.category && n.id !== news.id).slice(0, 3)
  }, [news])

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
  if (!news) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4 text-corporate-green">الخبر غير موجود</h1>
        <button
          className="mt-6 px-6 py-2 bg-corporate-green text-white rounded-md hover:bg-corporate-green/90 transition"
          onClick={() => router.push("/media/news")}
        >
          العودة للأخبار
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
          aria-label="عودة للأخبار"
        >
          <ArrowRight className="h-5 w-5" />
          <span>عودة للأخبار</span>
        </button>
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            priority
          />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              className={`bg-white/80 hover:bg-corporate-green/90 ${isFavorite(news.id) ? "text-white bg-corporate-green" : "text-corporate-green"} rounded-full p-2 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green`}
              aria-label={isFavorite(news.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
              onClick={() => toggleFavorite(news.id)}
            >
              <Heart className={isFavorite(news.id) ? "fill-white" : ""} />
            </button>
            <ShareButton url={`${typeof window !== "undefined" ? window.location.origin : ""}/media/news/${news.id}`} title={news.title} />
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          {getCategoryIcon(news.category)}
          <span className="text-sm font-medium text-corporate-green">{news.category}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 rtl:ml-2 rtl:mr-0">
            <Calendar className="h-4 w-4 inline" />
            {formatDate(news.date)}
          </span>
          {isNew(news.date) && <span className="ml-2 bg-corporate-green text-white text-xs rounded px-2 py-0.5">جديد</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-corporate-green mb-4 mt-2">{news.title}</h1>
        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{news.content || news.excerpt}</p>
        <div className="flex items-center gap-4 mt-2 mb-8">
          <span className="text-xs text-muted-foreground">{views} مشاهدة</span>
        </div>
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-corporate-green mb-4">أخبار ذات صلة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((item: any) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-corporate-green/5" onClick={() => router.push(`/media/news/${item.id}`)}>
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(item.category)}
                    <span className="text-xs font-medium text-corporate-green">{item.category}</span>
                  </div>
                  <div className="font-semibold line-clamp-2">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{formatDate(item.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
