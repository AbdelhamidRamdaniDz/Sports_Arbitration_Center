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
import newsData from "@/data/news.json"
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

  // Simulate async fetch with skeleton
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      // Add mock views and favorited state
      const storedFavs = JSON.parse(localStorage.getItem("media-favs") || "[]")
      setNews(newsData.map((n, i) => ({
        ...n,
        views: Math.floor(Math.random() * 1000) + 100,
        favorited: storedFavs.includes(n.id),
      })))
      setFavorites(storedFavs)
      setLoading(false)
    }, 1200)
  }, [])

  useEffect(() => {
    setPressLoading(true)
    setTimeout(() => {
      const storedFavs = JSON.parse(localStorage.getItem("press-favs") || "[]")
      setPressReleases(pressReleasesData.map((n: any) => ({
        ...n,
        views: Math.floor(Math.random() * 500) + 50,
        favorited: storedFavs.includes(n.id),
      })))
      setPressFavorites(storedFavs)
      setPressLoading(false)
    }, 1200)
  }, [])

  useEffect(() => {
    setResourcesLoading(true)
    setTimeout(() => {
      setResources(resourcesData)
      setResourcesLoading(false)
    }, 1200)
  }, [])

  // Reset page on filter/search change
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
  const handleLoadMoreNews = () => {
    if (loadingMore || !hasMoreNews) return
    setLoadingMore(true)
    setTimeout(() => {
      setNewsPage(p => p + 1)
      setLoadingMore(false)
    }, 800)
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
    // For now, just alert
    alert(`عرض تفاصيل الخبر: ${id}`)
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
          description="آخر الأخبار والفعاليات والموارد الإعلامية لمركز التحكيم الرياضي"
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
