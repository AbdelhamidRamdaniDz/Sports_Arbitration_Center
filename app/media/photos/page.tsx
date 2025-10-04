"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { usePhotoGallery } from "@/components/gallery/usePhotoGallery"
import { GalleryPhoto } from "@/components/gallery/types"
import { GalleryMasonry } from "@/components/media-gallery/GalleryMasonry"
import { LightboxModal } from "@/components/media-gallery/LightboxModal"
import { useFavorites } from "@/hooks/useFavorites"
import { ShareButton } from "@/components/media-center/ShareButton"

export default function PhotosGalleryPage() {
  const { photos, loading, error } = usePhotoGallery()
  const [modalIdx, setModalIdx] = useState<number | null>(null)
  const { favorites, toggleFavorite } = useFavorites("resource")
  const [shareId, setShareId] = useState<string | null>(null)

  // Modal accessibility: trap focus, close on Escape, restore focus (to be improved)
  const openModal = (idx: number) => setModalIdx(idx)
  const closeModal = () => setModalIdx(null)
  const handlePrev = () => setModalIdx(i => (i && i > 0 ? i - 1 : i))
  const handleNext = () => setModalIdx(i => (i !== null && i < photos.length - 1 ? i + 1 : i))

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-corporate-green mb-8">معرض الصور</h1>
        {error && (
          <div className="text-center text-red-600 py-16">حدث خطأ أثناء تحميل الصور. <button onClick={() => window.location.reload()} className="underline">إعادة المحاولة</button></div>
        )}
        {!loading && photos.length === 0 && !error && (
          <div className="text-center text-muted-foreground py-16">لا توجد صور متاحة حالياً.</div>
        )}
        <GalleryMasonry
          photos={photos}
          loading={loading}
          onPhotoClick={openModal}
          onFavorite={toggleFavorite}
          onShare={id => setShareId(id)}
          favorites={favorites}
        />
        {modalIdx !== null && photos[modalIdx] && (
          <LightboxModal
            photos={photos}
            index={modalIdx}
            onClose={closeModal}
            onPrev={handlePrev}
            onNext={handleNext}
            onFavorite={() => toggleFavorite(photos[modalIdx].id)}
            onShare={() => setShareId(photos[modalIdx].id)}
            isFavorite={favorites.includes(photos[modalIdx].id)}
          />
        )}
        {/* ShareButton popover can be rendered here if needed for shareId */}
      </div>
    </div>
  )
}
