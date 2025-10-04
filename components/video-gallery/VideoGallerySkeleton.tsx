import React from "react"

interface VideoGallerySkeletonProps {
  count?: number
}

export const VideoGallerySkeleton: React.FC<VideoGallerySkeletonProps> = ({ count = 12 }) => {
  // Generate random heights for skeletons
  const heights = Array.from({ length: count }, () => 160 + Math.floor(Math.random() * 120))
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full" aria-busy="true" aria-label="جاري التحميل">
      {heights.map((h, i) => (
        <div key={i} className="mb-4 w-full rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" style={{ height: h }} />
      ))}
    </div>
  )
}