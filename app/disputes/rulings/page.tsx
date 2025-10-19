"use client"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Calendar } from "lucide-react"

export default function RulingsPage() {
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [sport, setSport] = useState<string | undefined>(undefined)
  const [year, setYear] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [facets, setFacets] = useState<{ sports: string[]; years: number[] }>({ sports: [], years: [] })
  const [stats, setStats] = useState<{ total: number; thisYear: number; sportsCount: number; yearsCount: number } | null>(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [limit] = useState(9)
  const [total, setTotal] = useState(0)
  const [rulings, setRulings] = useState<Array<{
    id: string
    title: string
    slug: string
    sport: string
    year: number
    caseNumber: string
    summary?: string | null
    pdfUrl?: string | null
    decidedAt: string
  }>>([])

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350)
    return () => clearTimeout(t)
  }, [searchInput])

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    if (search) params.set("q", search)
    if (sport) params.set("sport", sport)
    if (year) params.set("year", year)
    params.set("page", String(page))
    params.set("limit", String(limit))
    return params.toString()
  }, [search, sport, year, page, limit])

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/rulings${queryString ? `?${queryString}` : ""}`)
        if (!res.ok) throw new Error("فشل في جلب البيانات")
        const data = await res.json()
        if (!ignore) {
          setRulings(data.rulings ?? [])
          setTotal(data.total ?? 0)
          setPages(data.pages ?? 1)
        }
      } catch (e: any) {
        if (!ignore) setError(e?.message ?? "حدث خطأ غير متوقع")
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [queryString])

  // Reset to first page when filters/search change (but not when page itself changes)
  useEffect(() => {
    setPage(1)
  }, [search, sport, year])

  // Fetch facets once
  useEffect(() => {
    let ignore = false
    const run = async () => {
      try {
        const res = await fetch("/api/rulings/facets")
        if (!res.ok) return
        const data = await res.json()
        if (!ignore) setFacets({ sports: data.sports ?? [], years: data.years ?? [] })
      } catch {}
    }
    run()
    return () => { ignore = true }
  }, [])

  // Fetch stats on filters/search
  useEffect(() => {
    let ignore = false
    const run = async () => {
      try {
        const res = await fetch(`/api/rulings/stats${queryString ? `?${queryString}` : ""}`)
        if (!res.ok) return
        const data = await res.json()
        if (!ignore) setStats(data)
      } catch {}
    }
    run()
    return () => { ignore = true }
  }, [queryString])
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f6faf9] to-[#eaf3f0]">
      <Header />
      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* عنوان الصفحة */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-corporate-green mb-2">ملخص أحكام التحكيم</h1>
          <p className="text-lg text-muted-foreground">تصفح وابحث في قاعدة بيانات أحكام التحكيم الرياضي</p>
        </div>
        {/* البحث والتصفية */}
        <Card className="mb-8 rounded-2xl shadow-soft border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-corporate-green">
              <Search className="h-5 w-5" /> البحث والتصفية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="ابحث في الأحكام..."
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  className="rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-corporate-green/30"
                />
              </div>
              <Select onValueChange={(v) => setSport(v)}>
                <SelectTrigger className="rounded-xl bg-gray-50 focus:bg-white">
                  <SelectValue placeholder="نوع الرياضة" />
                </SelectTrigger>
                <SelectContent>
                  {facets.sports.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(v) => setYear(v)}>
                <SelectTrigger className="rounded-xl bg-gray-50 focus:bg-white">
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent>
                  {facets.years.map(y => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {/* الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <Card className="rounded-2xl border-0 bg-gradient-to-br from-corporate-green/10 to-white/80 shadow-soft hover:shadow-lg transition-all group">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-extrabold text-corporate-green mb-2 group-hover:text-trust-blue transition-colors">{stats?.total ?? 0}</div>
              <div className="text-sm text-muted-foreground font-medium">إجمالي الأحكام</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 bg-gradient-to-br from-corporate-green/10 to-white/80 shadow-soft hover:shadow-lg transition-all group">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-extrabold text-corporate-green mb-2 group-hover:text-trust-blue transition-colors">{stats?.thisYear ?? 0}</div>
              <div className="text-sm text-muted-foreground font-medium">أحكام هذا العام</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 bg-gradient-to-br from-corporate-green/10 to-white/80 shadow-soft hover:shadow-lg transition-all group">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-extrabold text-corporate-green mb-2 group-hover:text-trust-blue transition-colors">{stats?.sportsCount ?? 0}</div>
              <div className="text-sm text-muted-foreground font-medium">أنواع الرياضات</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 bg-gradient-to-br from-corporate-green/10 to-white/80 shadow-soft hover:shadow-lg transition-all group">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-extrabold text-corporate-green mb-2 group-hover:text-trust-blue transition-colors">{stats?.yearsCount ?? 0}</div>
              <div className="text-sm text-muted-foreground font-medium">عدد السنوات</div>
            </CardContent>
          </Card>
        </div>
        {/* عرض الأحكام */}
        {error && (
          <div className="text-center text-red-600 mb-6">{error}</div>
        )}
        {loading ? (
          <div className="text-center text-muted-foreground">جارٍ التحميل...</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {rulings.map((item) => (
            <Card key={item.id} className="rounded-2xl border-0 bg-white/95 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary" className="rounded px-2 py-1 text-xs">{item.sport}</Badge>
                      <Badge variant="outline" className="rounded px-2 py-1 text-xs">{item.year}</Badge>
                      <span className="text-xs text-muted-foreground truncate">القضية رقم: {item.caseNumber}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-corporate-green transition-colors">{item.title}</h3>
                    {item.summary && (
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{item.summary}</p>
                    )}
                  </div>
                  <div className="text-right flex flex-col items-end gap-2 min-w-[120px]">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(item.decidedAt).toLocaleDateString("ar-DZ")}</span>
                    </div>
                    {item.pdfUrl && (
                      <Button asChild variant="outline" size="sm" className="rounded-full border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white transition-all">
                        <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 ml-1" /> تحميل الحكم
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
                    <div>
                      <span className="font-medium">المحكم الرئيسي:</span>
                      <span className="text-muted-foreground mr-2">—</span>
                    </div>
                    <div>
                      <span className="font-medium">نوع النزاع:</span>
                      <span className="text-muted-foreground mr-2">—</span>
                    </div>
                    <div>
                      <span className="font-medium">النتيجة:</span>
                      <span className="text-green-600 mr-2">—</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
        {/* الترقيم */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-4"
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
          >
            السابق
          </Button>
          <Button variant="outline" size="sm" className="bg-corporate-green text-white rounded-full px-4 shadow-md" disabled>
            {page}
          </Button>
          {page + 1 <= pages && (
            <Button variant="outline" size="sm" className="rounded-full px-4" onClick={() => setPage(page + 1)}>
              {page + 1}
            </Button>
          )}
          {page + 2 <= pages && (
            <Button variant="outline" size="sm" className="rounded-full px-4" onClick={() => setPage(page + 2)}>
              {page + 2}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-4"
            disabled={page >= pages}
            onClick={() => setPage(p => Math.min(p + 1, pages))}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  )
}
