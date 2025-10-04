"use client"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X, ArrowLeft, ArrowRight, Download, Heart, Share2, Copy, Info } from "lucide-react"
import { GalleryPhoto } from "./types"

interface LightboxModalProps {
  photos: GalleryPhoto[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onFavorite: () => void
  onShare: () => void
  isFavorite: boolean
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ photos, index, onClose, onPrev, onNext, onFavorite, onShare, isFavorite }) => {
  const [zoom, setZoom] = useState(1)
  const [showInfo, setShowInfo] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const current = photos[index]

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, onPrev, onNext])

  // Preload next image
  useEffect(() => {
    if (photos[index + 1]) {
      const img = new window.Image()
      img.src = photos[index + 1].url
    }
  }, [index, photos])

  // Swipe navigation (basic)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    if (dx > 60) onPrev()
    if (dx < -60) onNext()
    touch.current = null
  }

  // Pinch/zoom (basic double tap)
  const handleDoubleClick = () => setZoom(z => (z === 1 ? 2 : 1))

  // Fallback image
  const [imgError, setImgError] = useState(false)

  // Bottom sheet for mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={current.title}
        onClick={onClose}
        dir="rtl"
      >
        <motion.div
          className={`relative bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 sm:mx-auto flex flex-col items-center ${isMobile ? 'pb-safe' : ''}`}
          initial={{ scale: 0.98, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.98, y: 40 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="absolute top-3 left-3 z-10 bg-white/80 hover:bg-corporate-green/90 text-corporate-green rounded-full p-2 shadow focus-visible:ring-2 focus-visible:ring-corporate-green" onClick={onClose} aria-label="إغلاق">
            <X className="h-6 w-6" />
          </button>
          {/* Prev/Next */}
          {index > 0 && (
            <button className="absolute top-1/2 right-3 z-10 bg-white/80 hover:bg-corporate-green/90 text-corporate-green rounded-full p-2 shadow -translate-y-1/2" onClick={onPrev} aria-label="السابق">
              <ArrowRight className="h-6 w-6" />
            </button>
          )}
          {index < photos.length - 1 && (
            <button className="absolute top-1/2 left-3 z-10 bg-white/80 hover:bg-corporate-green/90 text-corporate-green rounded-full p-2 shadow -translate-y-1/2" onClick={onNext} aria-label="التالي">
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          {/* Image */}
          <div
            className="w-full flex justify-center items-center select-none"
            style={{ touchAction: "pan-y" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
          >
            <Image
              ref={imgRef}
              src={imgError ? current.thumbnail : current.url}
              alt={current.alt}
              width={current.width}
              height={current.height}
              quality={95}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              placeholder={current.blurDataURL ? "blur" : undefined}
              blurDataURL={current.blurDataURL}
              className="rounded-xl max-h-[70vh] w-auto h-auto object-contain bg-black/10"
              style={{ transform: `scale(${zoom})`, transition: "transform 0.3s" }}
              onError={() => setImgError(true)}
              draggable={false}
            />
          </div>
          {/* Info/Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 px-4 py-3">
            <div className="flex items-center gap-2">
              <button onClick={onShare} aria-label="مشاركة" className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-2 shadow">
                <Share2 className="h-5 w-5" />
              </button>
              <button onClick={onFavorite} aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"} className={`bg-white/80 hover:bg-corporate-green/90 ${isFavorite ? "text-white bg-corporate-green" : "text-corporate-green"} rounded-full p-2 shadow`}>
                <Heart className={isFavorite ? "fill-white" : ""} />
              </button>
              <button onClick={() => { navigator.clipboard.writeText(current.url); }} aria-label="نسخ الرابط" className="bg-white/80 hover:bg-corporate-green/90 text-corporate-green rounded-full p-2 shadow">
                <Copy className="h-5 w-5" />
              </button>
              <a href={current.url} download className="bg-white/80 hover:bg-corporate-green/90 text-corporate-green rounded-full p-2 shadow" aria-label="تحميل الصورة">
                <Download className="h-5 w-5" />
              </a>
              <button onClick={() => setShowInfo(i => !i)} aria-label="معلومات الصورة" className="bg-white/80 hover:bg-corporate-green/90 text-corporate-green rounded-full p-2 shadow">
                <Info className="h-5 w-5" />
              </button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 sm:mt-0">
              {current.photographer && <span className="ml-2">المصور: {current.photographer}</span>}
              <span className="ml-2">{current.date}</span>
              <span className="ml-2">{current.width}×{current.height}px</span>
              <span className="ml-2">{(current.size / 1024).toFixed(0)} KB</span>
              <span className="ml-2">{current.format.toUpperCase()}</span>
            </div>
          </div>
          {/* EXIF/metadata */}
          <AnimatePresence>
            {showInfo && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="w-full px-4 pb-4">
                <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-700 dark:text-gray-200">
                  <div className="mb-2 font-bold text-corporate-green">معلومات الصورة (EXIF)</div>
                  {current.exif ? (
                    <ul className="grid grid-cols-2 gap-2">
                      {Object.entries(current.exif).map(([k, v]) => (
                        <li key={k}><span className="font-semibold">{k}:</span> {v}</li>
                      ))}
                    </ul>
                  ) : (
                    <div>لا توجد بيانات EXIF متاحة.</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
