"use client"
import React, { useRef, useEffect, useState, Suspense } from "react"
import { Skeleton } from "./Skeleton"
const MediaResourceTile = React.lazy(() => import("./MediaResourceTile").then(m => ({ default: m.MediaResourceTile })))

interface ResourceItem {
  id: string
  type: string
  title: string
  description: string
  url: string
  thumbnail: string
  date: string
}

interface MediaResourcesSectionProps {
  resources: ResourceItem[]
  loading: boolean
  onTileClick?: (id: string) => void
}

export const MediaResourcesSection: React.FC<MediaResourcesSectionProps> = ({ resources, loading, onTileClick }) => {
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>(undefined)
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (focusedIndex !== undefined && tileRefs.current[focusedIndex]) {
      tileRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      setFocusedIndex(Math.max(0, idx - 1))
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      setFocusedIndex(Math.min(resources.length - 1, idx + 1))
    }
  }

  if (loading) {
    return (
      <div className="mb-16">
        <div className="h-8 w-40 mb-4"><Skeleton width="100%" height={32} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} height={180} className="!rounded-xl" />
          ))}
        </div>
      </div>
    )
  }
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-corporate-green">الموارد الإعلامية</h2>
        <span className="text-xs text-muted-foreground">{resources.length} مورد</span>
      </div>
      <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"><Skeleton height={180} className="!rounded-xl" /><Skeleton height={180} className="!rounded-xl" /><Skeleton height={180} className="!rounded-xl" /><Skeleton height={180} className="!rounded-xl" /></div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((item, idx) => (
            <MediaResourceTile
              key={item.id}
              item={item}
              onClick={onTileClick}
              focused={focusedIndex === idx}
              tabIndex={0}
              ref={el => tileRefs.current[idx] = el}
              onKeyDown={e => handleKeyDown(e, idx)}
            />
          ))}
        </div>
      </Suspense>
    </section>
  )
}
