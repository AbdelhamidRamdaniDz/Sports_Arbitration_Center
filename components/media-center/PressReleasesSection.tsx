"use client"
import React, { useRef, useEffect, useState } from "react"
import { PressReleaseCard } from "./PressReleaseCard"
import { Skeleton } from "./Skeleton"

interface PressReleaseItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  views?: number
  favorited?: boolean
}

interface PressReleasesSectionProps {
  pressReleases: PressReleaseItem[]
  loading: boolean
  onFavorite?: (id: string) => void
}

export const PressReleasesSection: React.FC<PressReleasesSectionProps> = ({ pressReleases, loading, onFavorite }) => {
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>(undefined)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (focusedIndex !== undefined && cardRefs.current[focusedIndex]) {
      cardRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      setFocusedIndex(Math.max(0, idx - 1))
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      setFocusedIndex(Math.min(pressReleases.length - 1, idx + 1))
    }
  }

  if (loading) {
    return (
      <div className="space-y-8 mb-16">
        <div className="h-8 w-40 mb-4"><Skeleton width="100%" height={32} /></div>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} height={120} className="!rounded-xl" />
        ))}
      </div>
    )
  }
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-corporate-green">البيانات الصحفية</h2>
        <span className="text-xs text-muted-foreground">{pressReleases.length} بيان</span>
      </div>
      <div className="relative border-s-4 border-corporate-green/20 pl-8 space-y-10">
        {pressReleases.map((item, idx) => (
          <PressReleaseCard
            key={item.id}
            item={item}
            onFavorite={onFavorite}
            focused={focusedIndex === idx}
            tabIndex={0}
            ref={el => cardRefs.current[idx] = el}
            onKeyDown={e => handleKeyDown(e, idx)}
          />
        ))}
      </div>
    </section>
  )
}
