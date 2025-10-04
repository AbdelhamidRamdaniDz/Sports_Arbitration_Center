"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { useVideoGallery } from "@/components/video-gallery/useVideoGallery"
import { GalleryVideo } from "@/components/video-gallery/types"
import { VideoGalleryGrid } from "@/components/video-gallery/VideoGalleryGrid"
import { VideoModal } from "@/components/video-gallery/VideoModal"
import { useFavorites } from "@/hooks/useFavorites"
import { ShareButton } from "@/components/media-center/ShareButton"

export default function VideosGalleryPage() {
  const { videos, loading, error } = useVideoGallery()
  const [modalIdx, setModalIdx] = useState<number | null>(null)
  const { favorites, toggleFavorite } = useFavorites("video")
  const [shareId, setShareId] = useState<string | null>(null)

  // Modal accessibility: trap focus, close on Escape, restore focus
  const openModal = (idx: number) => setModalIdx(idx)
  const closeModal = () => setModalIdx(null)
  const handlePrev = () => setModalIdx(i => (i && i > 0 ? i - 1 : i))
  const handleNext = () => setModalIdx(i => (i !== null && i < videos.length - 1 ? i + 1 : i))

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-corporate-green mb-8">معرض الفيديوهات</h1>
        {error && (
          <div className="text-center text-red-600 py-16">حدث خطأ أثناء تحميل الفيديوهات. <button onClick={() => window.location.reload()} className="underline">إعادة المحاولة</button></div>
        )}
        {!loading && videos.length === 0 && !error && (
          <div className="text-center text-muted-foreground py-16">لا توجد فيديوهات متاحة حالياً.</div>
        )}
        <VideoGalleryGrid
          videos={videos}
          loading={loading}
          onVideoClick={openModal}
          onFavorite={toggleFavorite}
          onShare={id => setShareId(id)}
          favorites={favorites}
        />
        {modalIdx !== null && videos[modalIdx] && (
          <VideoModal
            videos={videos}
            index={modalIdx}
            onClose={closeModal}
            onPrev={handlePrev}
            onNext={handleNext}
            onFavorite={() => toggleFavorite(videos[modalIdx].id)}
            onShare={() => setShareId(videos[modalIdx].id)}
            isFavorite={favorites.includes(videos[modalIdx].id)}
          />
        )}
        {/* ShareButton popover can be rendered here if needed for shareId */}
      </div>
    </div>
  )
}
