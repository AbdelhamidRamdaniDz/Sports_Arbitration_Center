import React, { useEffect } from "react"
import { GalleryVideo } from "./types"
import { X, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"

interface VideoModalProps {
  videos: GalleryVideo[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onFavorite: () => void
  onShare: () => void
  isFavorite: boolean
}

export const VideoModal: React.FC<VideoModalProps> = ({
  videos,
  index,
  onClose,
  onPrev,
  onNext,
  onFavorite,
  onShare,
  isFavorite,
}) => {
  const video = videos[index]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onNext()
      if (e.key === "ArrowRight") onPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, onNext, onPrev])

  if (!video) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-corporate-green z-10 bg-white/10 rounded-full p-1"
          onClick={onClose}
          aria-label="إغلاق"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="aspect-video w-full rounded-xl overflow-hidden">
          <iframe
            src={video.url.replace("watch?v=", "embed/")}
            title={video.title}
            className="w-full h-full rounded-xl"
            allowFullScreen
          />
        </div>
        
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-corporate-green">{video.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{video.category} • {video.date}</p>
            {video.creator && <p className="text-sm text-gray-500 dark:text-gray-400">المصور: {video.creator}</p>}
            {video.location && <p className="text-sm text-gray-500 dark:text-gray-400">الموقع: {video.location}</p>}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onFavorite}
              className={`bg-white dark:bg-gray-800 hover:bg-corporate-green/90 hover:text-white ${
                isFavorite ? "text-red-500" : "text-gray-500"
              } rounded-full p-2 shadow transition-colors`}
              aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
              <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={onShare}
              className="bg-white dark:bg-gray-800 hover:bg-corporate-green/90 hover:text-white text-gray-500 rounded-full p-2 shadow transition-colors"
              aria-label="مشاركة"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {index > 0 && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-2 shadow transition-colors"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="السابق"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
        
        {index < videos.length - 1 && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-2 shadow transition-colors"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="التالي"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  )
}