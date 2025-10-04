"use client"
import React from "react"
import { motion } from "framer-motion"
import { getCategoryIcon, isNew, formatDate } from "./helpers"
import { FileText, Heart, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface PressReleaseItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  views?: number
  favorited?: boolean
}

interface PressReleaseCardProps {
  item: PressReleaseItem
  onFavorite?: (id: string) => void
  focused?: boolean
  tabIndex?: number
}

export const PressReleaseCard: React.FC<PressReleaseCardProps> = ({ item, onFavorite, focused, tabIndex }) => {
  const router = useRouter()
  const handleNavigate = () => router.push(`/media/press-releases/${item.id}`)
  return (
    <motion.div
      initial={false}
      animate={focused ? { scale: 1.04, boxShadow: "0 8px 32px rgba(0,77,64,0.10)" } : { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative bg-white rounded-xl shadow-soft p-6 flex flex-col md:flex-row gap-6 hover-lift transition-all will-change-transform outline-none cursor-pointer ${focused ? "ring-2 ring-corporate-green" : ""}`}
      tabIndex={tabIndex ?? 0}
      role="button"
      aria-label={`عرض تفاصيل البيان: ${item.title}`}
      onClick={handleNavigate}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleNavigate()}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green shrink-0">
        {getCategoryIcon(item.category) || <FileText className="h-6 w-6" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-corporate-green">{item.category}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 rtl:ml-2 rtl:mr-0">
            {formatDate(item.date)}
          </span>
          {isNew(item.date) && <span className="ml-2 bg-corporate-green text-white text-xs rounded px-2 py-0.5">جديد</span>}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{item.excerpt}</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-muted-foreground">{item.views ?? 0} مشاهدة</span>
          <button
            className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-1.5 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green"
            aria-label={item.favorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            onClick={e => { e.stopPropagation(); onFavorite?.(item.id) }}
          >
            <Heart className={item.favorited ? "fill-corporate-green" : ""} />
          </button>
          <button
            className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-1.5 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green"
            aria-label="مشاركة البيان"
            onClick={e => { e.stopPropagation(); /* share logic */ }}
          >
            <Share2 />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
