import React from "react"
import { GalleryVideo } from "./types"
import { VideoCard } from "./VideoCard"
import { VideoGallerySkeleton } from "./VideoGallerySkeleton"

interface VideoGalleryGridProps {
  videos: GalleryVideo[]
  loading: boolean
  onVideoClick: (index: number) => void
  onFavorite: (id: string) => void
  onShare: (id: string) => void
  favorites: string[]
}

export const VideoGalleryGrid: React.FC<VideoGalleryGridProps> = ({
  videos,
  loading,
  onVideoClick,
  onFavorite,
  onShare,
  favorites,
}) => {
  if (loading) {
    return <VideoGallerySkeleton />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={() => onVideoClick(index)}
          onFavorite={() => onFavorite(video.id)}
          onShare={() => onShare(video.id)}
          isFavorite={favorites.includes(video.id)}
        />
      ))}
    </div>
  )
}