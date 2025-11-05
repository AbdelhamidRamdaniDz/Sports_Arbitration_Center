"use client"
import React, { useRef, useEffect, useState } from "react"

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

const Skeleton: React.FC<{ width?: string; height?: number; className?: string }> = ({ 
  width = "100%", 
  height = 20, 
  className = "" 
}) => (
  <div 
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
    style={{ width, height: `${height}px` }}
  />
)

// Press Release Card Component
const PressReleaseCard = React.forwardRef<HTMLDivElement, {
  item: PressReleaseItem
  onFavorite?: (id: string) => void
  focused?: boolean
  tabIndex?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
}>(({ item, onFavorite, focused, tabIndex, onKeyDown }, ref) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "تحكيم": "bg-blue-500/10 text-blue-700 border-blue-500/20",
      "وساطة": "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
      "قانوني": "bg-purple-500/10 text-purple-700 border-purple-500/20",
      "default": "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
    return colors[category] || colors.default
  }

  return (
    <div
      ref={ref}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={`group relative transition-all duration-500 ${
        focused ? 'scale-[1.02] z-10' : ''
      }`}
    >
      {/* Timeline Dot */}
      <div className="absolute -right-[42px] top-6 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-125 group-hover:shadow-emerald-500/50" />
      
      {/* Card */}
      <div className="relative rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-md transition-all duration-500 hover:shadow-2xl hover:border-emerald-500/30 hover:-translate-y-1 overflow-hidden">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 blur-sm" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 group-hover:scale-105 ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
              <time className="text-sm text-gray-500 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(item.date).toLocaleDateString('ar-DZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {item.views !== undefined && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{item.views}</span>
                </div>
              )}
              
              {onFavorite && (
                <button
                  onClick={() => onFavorite(item.id)}
                  className={`p-2 rounded-full transition-all duration-300 hover:bg-gray-100 ${
                    item.favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                  aria-label={item.favorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                >
                  <svg className="w-5 h-5" fill={item.favorited ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
            {item.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-5 line-clamp-2">
            {item.excerpt}
          </p>

          {/* Read More Link */}
          <a 
            href={`/press-releases/${item.id}`}
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-all duration-300 group/link"
          >
            <span>اقرأ المزيد</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
})

PressReleaseCard.displayName = "PressReleaseCard"

export const PressReleasesSection: React.FC<PressReleasesSectionProps> = ({ 
  pressReleases, 
  loading, 
  onFavorite 
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>(undefined)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (focusedIndex !== undefined && cardRefs.current[focusedIndex]) {
      cardRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIndex(Math.max(0, idx - 1))
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      setFocusedIndex(Math.min(pressReleases.length - 1, idx + 1))
    }
  }

  if (loading) {
    return (
      <section className="mb-16">
        <div className="mb-8">
          <Skeleton width="200px" height={36} className="mb-4" />
        </div>
        <div className="relative border-r-4 border-emerald-500/20 pr-8 space-y-10">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[42px] top-6 w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
              <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
                <div className="flex gap-3 mb-4">
                  <Skeleton width="80px" height={28} className="rounded-full" />
                  <Skeleton width="120px" height={28} className="rounded-full" />
                </div>
                <Skeleton width="90%" height={32} className="mb-3" />
                <Skeleton width="100%" height={20} className="mb-2" />
                <Skeleton width="80%" height={20} className="mb-5" />
                <Skeleton width="100px" height={24} />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mb-16" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-gray-100">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-2">
            البيانات الصحفية
          </h2>
          <p className="text-gray-600 text-sm">آخر الأخبار والتحديثات</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg">
            {pressReleases.length}
          </div>
          <span className="text-sm text-gray-600">بيان</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-r-4 border-emerald-500/20 pr-8 space-y-10">
        {/* Top gradient fade */}
        <div className="absolute top-0 right-0 w-1 h-20 bg-gradient-to-b from-white to-transparent z-10" />
        
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
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 right-0 w-1 h-20 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* Empty State */}
      {pressReleases.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد بيانات صحفية</h3>
          <p className="text-gray-500">سيتم نشر البيانات الصحفية هنا قريباً</p>
        </div>
      )}
    </section>
  )
}

// Demo Data
const DEMO_DATA: PressReleaseItem[] = [
  {
    id: "1",
    title: "إطلاق منصة التحكيم الإلكتروني الجديدة",
    excerpt: "نعلن بكل فخر عن إطلاق منصتنا الإلكترونية الجديدة للتحكيم والوساطة، والتي تهدف إلى تسهيل إجراءات تسوية النزاعات وتقديم خدمات قانونية متطورة لعملائنا في قطاع الطاقة.",
    date: "2024-11-01",
    category: "تحكيم",
    views: 1234,
    favorited: false
  },
  {
    id: "2",
    title: "توقيع اتفاقية شراكة استراتيجية في قطاع الطاقة المتجددة",
    excerpt: "وقعنا اليوم اتفاقية شراكة مع كبرى الشركات العالمية المتخصصة في الطاقة المتجددة، لتقديم استشارات قانونية متخصصة في عقود FIDIC وPPAs.",
    date: "2024-10-28",
    category: "وساطة",
    views: 892,
    favorited: true
  },
  {
    id: "3",
    title: "ندوة قانونية حول الامتثال والحوكمة في قطاع الطاقة",
    excerpt: "ننظم ندوة قانونية متخصصة حول أطر الامتثال والحوكمة (ESG) في قطاع الطاقة، بمشاركة خبراء دوليين ومحليين.",
    date: "2024-10-15",
    category: "قانوني",
    views: 567,
    favorited: false
  }
]

export default function Demo() {
  const [pressReleases, setPressReleases] = useState<PressReleaseItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setPressReleases(DEMO_DATA)
      setLoading(false)
    }, 2000)
  }, [])

  const handleFavorite = (id: string) => {
    setPressReleases(prev => 
      prev.map(item => 
        item.id === id ? { ...item, favorited: !item.favorited } : item
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/20 p-8">
      <div className="max-w-4xl mx-auto">
        <PressReleasesSection 
          pressReleases={pressReleases}
          loading={loading}
          onFavorite={handleFavorite}
        />
      </div>
    </div>
  )
}