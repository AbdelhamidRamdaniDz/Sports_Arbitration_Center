"use client"
import { useEffect, useState, useMemo } from "react"
import { PageHeader } from "@/components/page-header"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/media-center/Breadcrumbs"
import { BreakingNewsSection } from "@/components/media-center/BreakingNewsSection"
import { NewsFilters } from "@/components/media-center/NewsFilters"
import { NewsGrid } from "@/components/media-center/NewsGrid"
import { PressReleasesSection } from "@/components/media-center/PressReleasesSection"
import { MediaResourcesSection } from "@/components/media-center/MediaResourcesSection"
import pressReleasesData from "@/data/press-releases.json"
import resourcesData from "@/data/resources.json"

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

const PAGE_SIZE = 8
export default function MediaCenterPage() {
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState<NewsItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>(undefined)
  const [pressLoading, setPressLoading] = useState(true)
  const [pressReleases, setPressReleases] = useState<any[]>([])
  const [pressFavorites, setPressFavorites] = useState<string[]>([])
  const [resourcesLoading, setResourcesLoading] = useState(true)
  const [resources, setResources] = useState<any[]>([])
  const [newsPage, setNewsPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  // Fetch news from public API with filters + pagination
  const fetchPage = async (page: number, category: string, search: string) => {
    const params = new URLSearchParams()
    params.set("page", String(page))
    params.set("limit", String(PAGE_SIZE))
    if (search) params.set("search", search)
    // category filter is client-side in API; extend API later if needed
    const res = await fetch(`/api/media/news?${params.toString()}`)
    if (!res.ok) throw new Error("failed")
    const json = await res.json()
    const rows = (json?.data || []) as any[]
    const storedFavs = JSON.parse(localStorage.getItem("media-favs") || "[]")
    const mapped: NewsItem[] = rows.map((n) => ({
      id: n.id,
      title: n.title,
      excerpt: n.excerpt || "",
      date: n.createdAt || n.date || new Date().toISOString(),
      category: n.category || "عام",
      image: n.mainImage || "/placeholder.jpg",
      featured: !!n.urgent,
      views: n.views || 0,
      favorited: storedFavs.includes(n.id),
    }))
    // apply category filter client-side
    return category ? mapped.filter(m => m.category === category) : mapped
  }

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        setLoading(true)
        const first = await fetchPage(1, selectedCategory, searchTerm)
        if (!cancelled) {
          setNews(first)
          const storedFavs = JSON.parse(localStorage.getItem("media-favs") || "[]")
          setFavorites(storedFavs)
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [selectedCategory, searchTerm])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        setPressLoading(true)
        const res = await fetch('/api/media/press-releases')
        const json = await res.json()
        const rows = (json?.data || []) as any[]
        const storedFavs = JSON.parse(localStorage.getItem("press-favs") || "[]")
        const mapped = rows.map(n => ({
          ...n,
          views: Math.floor(Math.random() * 500) + 50,
          favorited: storedFavs.includes(n.id),
        }))
        if (!cancelled) {
          setPressReleases(mapped)
          setPressFavorites(storedFavs)
        }
      } finally {
        if (!cancelled) setPressLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        setResourcesLoading(true)
        const res = await fetch('/api/media/resources')
        const json = await res.json()
        if (!cancelled) setResources(json?.data || [])
      } finally {
        if (!cancelled) setResourcesLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    setNewsPage(1)
  }, [selectedCategory, searchTerm])

  // Filtered news
  const filteredNews = useMemo(() => {
    let items = news
    if (selectedCategory) items = items.filter(n => n.category === selectedCategory)
    if (searchTerm) {
      const term = searchTerm.trim()
      items = items.filter(n => n.title.includes(term) || n.excerpt.includes(term))
    }
    return items
  }, [news, selectedCategory, searchTerm])

  // Featured/breaking news
  const breakingNews = useMemo(() => news.filter(n => n.featured), [news])

  // Categories
  const categories = useMemo(() => Array.from(new Set(news.map(n => n.category))), [news])

  // Paginated news
  const paginatedNews = useMemo(() => filteredNews.slice(0, newsPage * PAGE_SIZE), [filteredNews, newsPage])
  const hasMoreNews = paginatedNews.length < filteredNews.length

  // Infinite scroll load more
  const handleLoadMoreNews = async () => {
    if (loadingMore || !hasMoreNews) return
    setLoadingMore(true)
    try {
      const nextPage = newsPage + 1
      const next = await fetchPage(nextPage, selectedCategory, searchTerm)
      setNews(prev => [...prev, ...next])
      setNewsPage(nextPage)
    } finally {
      setLoadingMore(false)
    }
  }

  // Handle favorite
  const handleFavorite = (id: string) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, favorited: !n.favorited } : n))
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem("media-favs", JSON.stringify(updated))
      return updated
    })
  }

  // Handle card click (could open modal or route)
  const handleCardClick = (id: string) => {
    window.location.href = `/media/news/${id}`
  }

  const handlePressFavorite = (id: string) => {
    setPressReleases(prev => prev.map(n => n.id === id ? { ...n, favorited: !n.favorited } : n))
    setPressFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem("press-favs", JSON.stringify(updated))
      return updated
    })
  }
  const handlePressCardClick = (id: string) => {
    alert(`عرض تفاصيل البيان: ${id}`)
  }

  const handleResourceTileClick = (id: string) => {
    alert(`عرض تفاصيل المورد: ${id}`)
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 font-sans">
      <Header />
      <main className="min-h-screen">
        <PageHeader
          title="المركز الإعلامي"
          description="آخر الأخبار والفعاليات والموارد الإعلامية لمركز Tahkeem Tech"
        />
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[{ label: "الرئيسية", href: "/" }, { label: "المركز الإعلامي", href: "/media" }]}
            currentLabel="الأخبار"
          />
          <BreakingNewsSection news={breakingNews} loading={loading} />
          <NewsFilters
            categories={categories}
            onFilter={setSelectedCategory}
            onSearch={setSearchTerm}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
          />
          <NewsGrid
            news={paginatedNews}
            loading={loading}
            onFavorite={handleFavorite}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
            pageSize={PAGE_SIZE}
            onLoadMore={handleLoadMoreNews}
            hasMore={hasMoreNews}
            loadingMore={loadingMore}
          />
          <PressReleasesSection
            pressReleases={pressReleases}
            loading={pressLoading}
            onFavorite={handlePressFavorite}
          />
          <MediaResourcesSection
            resources={resources}
            loading={resourcesLoading}
            onTileClick={handleResourceTileClick}
          />
        </div>
        {/* بقية الأقسام (البيانات الصحفية، الموارد الإعلامية) ستضاف لاحقًا */}
        <Footer />
      </main>
    </div>
  )
}
