"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Heart } from "lucide-react"
import { getCategoryIcon, isNew, formatDate } from "./helpers"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/useFavorites"
import { ShareButton } from "./ShareButton"

interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  featured: boolean
  views?: number
}

interface NewsCardProps {
  item: NewsItem
  onFavorite?: (id: string) => void // for sync with parent if needed
  focused?: boolean
  tabIndex?: number
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, onFavorite, focused, tabIndex }) => {
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites("news")
  const handleNavigate = () => router.push(`/media/news/${item.id}`)
  return (
    <motion.div
      initial={false}
      animate={focused ? { scale: 1.04, boxShadow: "0 8px 32px rgba(0,77,64,0.10)" } : { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative rounded-xl overflow-hidden shadow-soft bg-white group cursor-pointer transition-all will-change-transform outline-none ${focused ? "ring-2 ring-corporate-green" : ""}`}
      tabIndex={tabIndex ?? 0}
      role="button"
      aria-label={`عرض تفاصيل: ${item.title}`}
      onClick={handleNavigate}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleNavigate()}
    >
      <div className="relative w-full aspect-video">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
          <div className="flex items-center gap-2 mb-2">
            {getCategoryIcon(item.category)}
            <span className="text-xs font-medium text-white/90">{item.category}</span>
            <span className="text-xs text-white/70 flex items-center gap-1 rtl:ml-2 rtl:mr-0">
              <Calendar className="h-4 w-4 inline" />
              {formatDate(item.date)}
            </span>
            {isNew(item.date) && <span className="ml-2 bg-corporate-green text-white text-xs rounded px-2 py-0.5">جديد</span>}
          </div>
          <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg line-clamp-2">{item.title}</h3>
          <p className="text-white/90 line-clamp-2 mb-2 drop-shadow-md">{item.excerpt}</p>
        </div>
        <button
          className={`absolute top-3 left-3 bg-white/80 hover:bg-corporate-green/90 ${isFavorite(item.id) ? "text-white bg-corporate-green" : "text-corporate-green"} rounded-full p-1.5 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green`}
          aria-label={isFavorite(item.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          onClick={e => { e.stopPropagation(); toggleFavorite(item.id); onFavorite?.(item.id) }}
        >
          <Heart className={isFavorite(item.id) ? "fill-white" : ""} />
        </button>
        <div className="absolute top-3 right-3">
          <ShareButton url={`${typeof window !== "undefined" ? window.location.origin : ""}/media/news/${item.id}`} title={item.title} />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-white">
        <span className="text-xs text-muted-foreground">{item.views ?? 0} مشاهدة</span>
      </div>
    </motion.div>
  )
}
