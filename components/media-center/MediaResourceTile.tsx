"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { getCategoryIcon, isNew, formatDate } from "./helpers"
import { ImageIcon, Video, FileText, BadgeCheck } from "lucide-react"
import { useRouter } from "next/navigation"

interface ResourceItem {
  id: string
  type: string
  title: string
  description: string
  url: string
  thumbnail: string
  date: string
}

function getTypeIcon(type: string) {
  switch (type) {
    case "image": return <ImageIcon className="h-6 w-6 text-corporate-green" aria-label="صورة" />
    case "video": return <Video className="h-6 w-6 text-corporate-green" aria-label="فيديو" />
    case "logo": return <BadgeCheck className="h-6 w-6 text-corporate-green" aria-label="شعار" />
    case "report": return <FileText className="h-6 w-6 text-corporate-green" aria-label="تقرير" />
    default: return <FileText className="h-6 w-6 text-corporate-green" aria-label="مورد" />
  }
}

interface MediaResourceTileProps {
  item: ResourceItem
  focused?: boolean
  tabIndex?: number
}

export const MediaResourceTile: React.FC<MediaResourceTileProps> = ({ item, focused, tabIndex }) => {
  const router = useRouter()
  const handleNavigate = () => router.push(`/media/resources/${item.id}`)
  return (
    <motion.div
      initial={false}
      animate={focused ? { scale: 1.04, boxShadow: "0 8px 32px rgba(0,77,64,0.10)" } : { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative rounded-xl overflow-hidden shadow-soft bg-white group cursor-pointer transition-all will-change-transform outline-none ${focused ? "ring-2 ring-corporate-green" : ""}`}
      tabIndex={tabIndex ?? 0}
      role="button"
      aria-label={`عرض تفاصيل المورد: ${item.title}`}
      onClick={handleNavigate}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleNavigate()}
    >
      <div className="relative w-full aspect-video">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-4">
          <div className="flex items-center gap-2 mb-2">
            {getTypeIcon(item.type)}
            <span className="text-xs font-medium text-white/90">{item.type === "image" ? "صور" : item.type === "video" ? "فيديو" : item.type === "logo" ? "شعار" : "تقرير"}</span>
            <span className="text-xs text-white/70 flex items-center gap-1 rtl:ml-2 rtl:mr-0">
              {formatDate(item.date)}
            </span>
            {isNew(item.date) && <span className="ml-2 bg-corporate-green text-white text-xs rounded px-2 py-0.5">جديد</span>}
          </div>
          <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg line-clamp-2">{item.title}</h3>
          <p className="text-white/90 line-clamp-2 mb-2 drop-shadow-md">{item.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
