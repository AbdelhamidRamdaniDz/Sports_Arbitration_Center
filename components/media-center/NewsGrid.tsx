"use client"
import React, { useRef, useEffect, useCallback } from "react"
import { NewsCard } from "./NewsCard"
import { Skeleton } from "./Skeleton"

interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  featured: boolean
  views?: number
  favorited?: boolean
}

interface NewsGridProps {
  news: NewsItem[]
  loading: boolean
  onFavorite?: (id: string) => void
  focusedIndex?: number
  setFocusedIndex?: (idx: number) => void
  pageSize?: number
  onLoadMore?: () => void
  hasMore?: boolean
  loadingMore?: boolean
}

export const NewsGrid: React.FC<NewsGridProps> = ({ news, loading, onFavorite, focusedIndex, setFocusedIndex, pageSize = 8, onLoadMore, hasMore, loadingMore }) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (focusedIndex !== undefined && cardRefs.current[focusedIndex]) {
      cardRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (!setFocusedIndex) return
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      setFocusedIndex(Math.max(0, idx - 1))
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      setFocusedIndex(Math.min(news.length - 1, idx + 1))
    }
  }

  // Infinite scroll logic
  useEffect(() => {
    if (!hasMore || !onLoadMore) return
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          onLoadMore()
        }
      },
      { rootMargin: "200px" }
    )
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current)
    }
  }, [hasMore, onLoadMore, news.length])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {Array.from({ length: pageSize }).map((_, idx) => (
          <Skeleton key={idx} height={240} className="!rounded-xl" />
        ))}
      </div>
    )
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-corporate-green">جميع الأخبار</h2>
        <span className="text-xs text-muted-foreground">{news.length} خبر</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {news.map((item, idx) => (
          <NewsCard
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
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center items-center py-6">
          {loadingMore ? (
            <div className="flex gap-4 w-full max-w-2xl">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} height={120} className="!rounded-xl flex-1" />
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">تحميل المزيد...</span>
          )}
        </div>
      )}
    </div>
  )
}
