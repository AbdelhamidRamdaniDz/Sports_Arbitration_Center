import React from "react"
import Image from "next/image"
import { GalleryVideo } from "./types"
import { formatDate, isNew } from "@/components/media-center/helpers"
import { PlayCircle, Heart, Share2 } from "lucide-react"

interface VideoCardProps {
  video: GalleryVideo
  onClick: () => void
  onFavorite: () => void
  onShare: () => void
  isFavorite: boolean
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, onFavorite, onShare, isFavorite }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-soft bg-white group cursor-pointer transition-all hover-lift outline-none">
      <div 
        className="relative w-full aspect-video" 
        onClick={onClick} 
        tabIndex={0} 
        role="button" 
        aria-label={`تشغيل: ${video.title}`}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick()}
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          placeholder="blur"
          blurDataURL={video.blurDataURL || "/placeholder.jpg"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-lg font-bold text-white mb-1 drop-shadow-lg line-clamp-2">{video.title}</h2>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <span>{formatDate(video.date)}</span>
            {isNew(video.date) && <span className="ml-2 bg-corporate-green text-white text-xs rounded px-2 py-0.5">جديد</span>}
          </div>
        </div>
        <button 
          className="absolute top-3 left-3 bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-1.5 shadow transition-colors" 
          aria-label="تشغيل الفيديو"
        >
          <PlayCircle className="h-5 w-5" />
        </button>
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onFavorite(); }} 
            className={`bg-white/80 hover:bg-corporate-green/90 hover:text-white ${isFavorite ? 'text-red-500' : 'text-gray-500'} rounded-full p-1.5 shadow transition-colors`}
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onShare(); }} 
            className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-gray-500 rounded-full p-1.5 shadow transition-colors"
            aria-label="مشاركة"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 bg-corporate-green text-white text-xs px-2 py-1 rounded-tr-md">
        {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
      </div>
    </div>
  )
}