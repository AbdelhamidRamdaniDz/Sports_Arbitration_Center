"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Download, Heart, Share2, Copy } from "lucide-react"
import { GalleryPhoto } from "./types"

interface PhotoCardProps {
  photo: GalleryPhoto
  onClick: () => void
  onFavorite: () => void
  onShare: () => void
  isFavorite: boolean
  loading?: boolean
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick, onFavorite, onShare, isFavorite, loading }) => {
  if (loading) {
    return <div className="rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse w-full mb-4" style={{ height: 220 }} />
  }
  return (
    <motion.div
      whileHover={{ scale: 1.025, boxShadow: "0 8px 32px rgba(0,77,64,0.10)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative mb-4 rounded-xl overflow-hidden shadow-soft bg-white group cursor-pointer outline-none hover-lift"
      tabIndex={0}
      role="button"
      aria-label={`عرض: ${photo.title}`}
      onClick={onClick}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <Image
        src={photo.thumbnail}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        quality={85}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        placeholder={photo.blurDataURL ? "blur" : undefined}
        blurDataURL={photo.blurDataURL}
        className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
        style={{ aspectRatio: `${photo.width}/${photo.height}` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-white/80">{photo.format.toUpperCase()}</span>
          <span className="text-xs text-white/80">{(photo.size / 1024).toFixed(0)} KB</span>
          <span className="text-xs text-white/80">{photo.width}×{photo.height}</span>
          <span className="text-xs text-white/80">{photo.downloads ?? 0} تحميل</span>
        </div>
        <h2 className="text-lg font-bold text-white mb-1 drop-shadow-lg line-clamp-2">{photo.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={e => { e.stopPropagation(); onShare(); }} aria-label="مشاركة" className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-1.5 shadow transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
          <button onClick={e => { e.stopPropagation(); onFavorite(); }} aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"} className={`bg-white/80 hover:bg-corporate-green/90 ${isFavorite ? "text-white bg-corporate-green" : "text-corporate-green"} rounded-full p-1.5 shadow transition-colors`}>
            <Heart className={isFavorite ? "fill-white" : ""} />
          </button>
          <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(photo.url); }} aria-label="نسخ الرابط" className="bg-white/80 hover:bg-corporate-green/90 text-corporate-green rounded-full p-1.5 shadow transition-colors">
            <Copy className="h-4 w-4" />
          </button>
          <a href={photo.url} download className="bg-white/80 hover:bg-corporate-green/90 text-corporate-green rounded-full p-1.5 shadow transition-colors" aria-label="تحميل الصورة" onClick={e => e.stopPropagation()}>
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>
      {/* علامة مائية */}
      <div className="absolute bottom-2 left-2 text-xs text-white/70 select-none pointer-events-none">© مركز التحكيم الرياضي</div>
    </motion.div>
  )
}
