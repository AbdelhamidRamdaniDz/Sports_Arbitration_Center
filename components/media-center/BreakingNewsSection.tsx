"use client"
import React from "react"
import { Skeleton } from "./Skeleton"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { getCategoryIcon, isNew, formatDate } from "./helpers"
import { useRouter } from "next/navigation"

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

interface BreakingNewsSectionProps {
  news: NewsItem[]
  loading: boolean
}

export const BreakingNewsSection: React.FC<BreakingNewsSectionProps> = ({ news, loading }) => {
  const router = useRouter()
  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 mb-10">
        <Skeleton width="100%" height="100%" className="!rounded-2xl" />
      </div>
    )
  }
  if (!news.length) return null
  // For now, just show the first featured as highlight (carousel can be added later)
  const item = news[0]
  const handleNavigate = () => router.push(`/media/news/${item.id}`)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative rounded-2xl overflow-hidden shadow-soft bg-white mb-10 group cursor-pointer will-change-transform"
      tabIndex={0}
      role="button"
      aria-label={`عرض تفاصيل: ${item.title}`}
      onClick={handleNavigate}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleNavigate()}
    >
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            {getCategoryIcon(item.category)}
            <span className="text-xs font-medium text-white/90">{item.category}</span>
            <span className="text-xs text-white/70 flex items-center gap-1 rtl:ml-2 rtl:mr-0">
              <Calendar className="h-4 w-4 inline" />
              {formatDate(item.date)}
            </span>
            {isNew(item.date) && <span className="ml-2 bg-corporate-green text-white text-xs rounded px-2 py-0.5">جديد</span>}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">{item.title}</h2>
          <p className="text-white/90 line-clamp-2 mb-4 drop-shadow-md">{item.excerpt}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs text-white/80">{item.views ?? 0} مشاهدة</span>
            {/* Share buttons can be added here */}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
