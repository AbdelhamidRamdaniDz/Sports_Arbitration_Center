import React from "react"

interface GallerySkeletonProps {
  count?: number
}

export const GallerySkeleton: React.FC<GallerySkeletonProps> = ({ count = 12 }) => {
  // Generate random heights for skeletons
  const heights = Array.from({ length: count }, () => 160 + Math.floor(Math.random() * 120))
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full" aria-busy="true" aria-label="جاري التحميل">
      {heights.map((h, i) => (
        <div key={i} className="mb-4 w-full rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" style={{ height: h }} />
      ))}
    </div>
  )
}
