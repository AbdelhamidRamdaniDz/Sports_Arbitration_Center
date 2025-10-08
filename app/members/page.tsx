"use client"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Award, Briefcase, Calendar, MapPin, Star, Phone, Mail, Loader2 } from "lucide-react"
import { getArbitrators, getLawyers, filterMembers } from "@/lib/data"
import type { Arbitrator, Lawyer } from "@/lib/types"

export default function MembersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("arbitrators")
  const [arbitrators, setArbitrators] = useState<Arbitrator[]>([])
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [filters, setFilters] = useState<{ city?: string; specialization?: string; minYears?: number; language?: string }>(
    {},
  )

  useEffect(() => {
    const loadData = async () => {
      try {
        const [arbitratorsData, lawyersData] = await Promise.all([getArbitrators(), getLawyers()])
        setArbitrators(arbitratorsData)
        setLawyers(lawyersData)
      } catch (error) {
        console.error("Error loading members data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const parseYears = (exp: string) => Number.parseInt(exp.match(/\d+/)?.[0] || "0")

  const applyAdvancedFilters = <T extends { location: string; specialization: string; languages: string[]; experience: string }>(
    items: T[],
  ) => {
    return items.filter((m) => {
      if (filters.city && m.location !== filters.city) return false
      if (filters.specialization && m.specialization !== filters.specialization) return false
      if (filters.language && !m.languages.includes(filters.language)) return false
      if (typeof filters.minYears === "number" && parseYears(m.experience) < filters.minYears) return false
      return true
    })
  }

  const filteredArbitrators = useMemo(() => {
    return applyAdvancedFilters(filterMembers(arbitrators, searchTerm))
  }, [arbitrators, searchTerm, filters])

  const filteredLawyers = useMemo(() => {
    return applyAdvancedFilters(filterMembers(lawyers, searchTerm))
  }, [lawyers, searchTerm, filters])

  const MemberCard = ({ member }: { member: Arbitrator | Lawyer }) => {
    const [mounted, setMounted] = useState(false)
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
      const t = setTimeout(() => setMounted(true), 10)
      return () => clearTimeout(t)
    }, [])

    return (
      <Card
        dir="rtl"
        className="group bg-white border border-transparent hover:border-corporate-green/20 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-xl"
      >
        <CardContent
          className={`p-6 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="relative">
            {/* Favorite toggle */}
            <button
              type="button"
              onClick={() => setFavorite((v) => !v)}
              aria-label={favorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
              className="absolute top-0 left-0 -mt-2 -ml-2 z-10 rounded-full p-2 bg-white/80 backdrop-blur shadow hover:shadow-md transition-all"
            >
              <Star className={`h-4 w-4 ${favorite ? "text-yellow-500 fill-current" : "text-muted-foreground"}`} />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar + quick stats */}
              <div className="flex flex-col items-center md:items-start md:min-w-[8rem]">
                <div className="relative mb-4">
                  <div className="w-24 h-24 md:w-24 md:h-24 rounded-full ring-4 ring-corporate-green/15 shadow-[0_0_0_4px_rgba(0,0,0,0.02)] shadow-corporate-green/10 overflow-hidden transition-all group-hover:ring-corporate-green/25 group-hover:shadow-lg">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-corporate-green text-white p-2 rounded-full shadow">
                    <Briefcase className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{member.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{member.cases} قضية</p>
                </div>
              </div>

              {/* Member details */}
              <div className="flex-1 grid grid-cols-1 gap-5">
                {/* Header */}
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-xl font-extrabold text-corporate-green leading-snug">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.title}</p>
                  <Badge className="mt-1 bg-corporate-green/10 text-corporate-green text-xs">{member.specialization}</Badge>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-corporate-green" />
                      <span className="text-muted-foreground">الخبرة: {member.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-corporate-green" />
                      <span className="text-muted-foreground">{member.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-corporate-green" />
                      <span className="text-muted-foreground text-xs">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-corporate-green" />
                      <span className="text-muted-foreground text-xs">{member.email}</span>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">التعليم</p>
                  <p className="text-sm leading-6">{member.education}</p>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">اللغات</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.languages.map((lang: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-[11px] border-corporate-green text-corporate-green bg-transparent"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">الشهادات</p>
                  <div className="space-y-1.5">
                    {member.certifications.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-3.5 w-3.5 text-corporate-green" />
                        <span className="text-xs text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                {member.bio && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">نبذة</p>
                    <p className="text-sm text-muted-foreground leading-7">{member.bio}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    className="bg-corporate-green hover:bg-corporate-green/90"
                    onClick={() => router.push(`/contact/${member.id}`)}
                  >
                    تواصل معي
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                    onClick={() => router.push(`/profile/${member.id}`)}
                  >
                    عرض الملف الشخصي
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-corporate-green" />
            <span className="text-muted-foreground">جاري تحميل البيانات...</span>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="قائمة الأعضاء"
        description="قائمة شاملة بالمحكمين والمحامين المعتمدين والمتخصصين في القانون الرياضي"
      />

      {/* Search and Filter */}
      <section className="py-8 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو التخصص أو المدينة..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
                onClick={() => setAdvancedOpen(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                تصفية متقدمة
              </Button>
            </div>
            {searchTerm && (
              <div className="mt-4 text-sm text-muted-foreground">
                نتائج البحث عن: "{searchTerm}" -
                {activeTab === "arbitrators"
                  ? ` ${filteredArbitrators.length} محكم`
                  : ` ${filteredLawyers.length} محامي`}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Members Tabs */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="arbitrators" className="text-lg">
                المحكمون ({filteredArbitrators.length})
              </TabsTrigger>
              <TabsTrigger value="lawyers" className="text-lg">
                المحامون ({filteredLawyers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="arbitrators" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-corporate-green mb-2">المحكمون المعتمدون</h2>
                <p className="text-muted-foreground">
                  نخبة من المحكمين المتخصصين في القانون الرياضي والمعتمدين محلياً ودولياً
                </p>
              </div>

              <div className="space-y-6">
                {filteredArbitrators.length > 0 ? (
                  filteredArbitrators.map((arbitrator) => <MemberCard key={arbitrator.id} member={arbitrator} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">لا توجد نتائج تطابق البحث</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="lawyers" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-corporate-green mb-2">المحامون المتخصصون</h2>
                <p className="text-muted-foreground">فريق من المحامين المتخصصين في القانون الرياضي والتجاري</p>
              </div>

              <div className="space-y-6">
                {filteredLawyers.length > 0 ? (
                  filteredLawyers.map((lawyer) => <MemberCard key={lawyer.id} member={lawyer} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">لا توجد نتائج تطابق البحث</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Advanced Filter Dialog */}
      <Dialog open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-corporate-green">تصفية متقدمة</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>المدينة</Label>
              <Select
                value={filters.city ?? "__all__"}
                onValueChange={(v) => setFilters((f) => ({ ...f, city: v === "__all__" ? undefined : v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">الكل</SelectItem>
                  {Array.from(new Set([...arbitrators, ...lawyers].map((m) => m.location))).map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>التخصص</Label>
              <Select
                value={filters.specialization ?? "__all__"}
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, specialization: v === "__all__" ? undefined : v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">الكل</SelectItem>
                  {Array.from(new Set([...arbitrators, ...lawyers].map((m) => m.specialization))).map((sp) => (
                    <SelectItem key={sp} value={sp}>
                      {sp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>اللغة</Label>
              <Select
                value={filters.language ?? "__all__"}
                onValueChange={(v) => setFilters((f) => ({ ...f, language: v === "__all__" ? undefined : v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">الكل</SelectItem>
                  {Array.from(new Set([...arbitrators, ...lawyers].flatMap((m) => m.languages))).map((lg) => (
                    <SelectItem key={lg} value={lg}>
                      {lg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>عدد سنوات الخبرة (حد أدنى)</Label>
              <Input
                type="number"
                min={0}
                value={filters.minYears?.toString() || ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, minYears: e.target.value ? Number.parseInt(e.target.value) : undefined }))
                }
                placeholder="مثال: 5"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setFilters({})}>
              مسح
            </Button>
            <Button
              className="bg-corporate-green hover:bg-corporate-green/90"
              onClick={() => setAdvancedOpen(false)}
            >
              تطبيق التصفية
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
