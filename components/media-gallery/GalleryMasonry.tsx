"use client"
import React, { useEffect, useRef, useState } from "react"
import { GalleryPhoto } from "./types"
import { PhotoCard } from "./PhotoCard"
import { GallerySkeleton } from "./GallerySkeleton"

interface GalleryMasonryProps {
  photos: GalleryPhoto[]
  loading: boolean
  onPhotoClick: (idx: number) => void
  onFavorite: (id: string) => void
  onShare: (id: string) => void
  favorites: string[]
  pageSize?: number
}

export const GalleryMasonry: React.FC<GalleryMasonryProps> = ({ photos, loading, onPhotoClick, onFavorite, onShare, favorites, pageSize = 16 }) => {
  const [page, setPage] = useState(1)
  const [displayed, setDisplayed] = useState<GalleryPhoto[]>([])
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setDisplayed(photos.slice(0, page * pageSize))
  }, [photos, page, pageSize])

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && displayed.length < photos.length) {
          setPage(p => p + 1)
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [displayed.length, photos.length])

  if (loading) return <GallerySkeleton count={pageSize * 2} />
  if (!photos.length) return <div className="text-center text-muted-foreground py-16">لا توجد صور متاحة حالياً.</div>

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full">
      {displayed.map((photo, idx) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onClick={() => onPhotoClick(idx)}
          onFavorite={() => onFavorite(photo.id)}
          onShare={() => onShare(photo.id)}
          isFavorite={favorites.includes(photo.id)}
        />
      ))}
      <div ref={loaderRef} className="h-8 w-full" />
    </div>
  )
}
