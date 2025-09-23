"use client"
import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Award, Briefcase, Calendar, MapPin, Star, Phone, Mail, Loader2 } from "lucide-react"
import { getArbitrators, getLawyers, filterMembers } from "@/lib/data"
import type { Arbitrator, Lawyer } from "@/lib/types"

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("arbitrators")
  const [arbitrators, setArbitrators] = useState<Arbitrator[]>([])
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)

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

  const filteredArbitrators = useMemo(() => {
    return filterMembers(arbitrators, searchTerm)
  }, [arbitrators, searchTerm])

  const filteredLawyers = useMemo(() => {
    return filterMembers(lawyers, searchTerm)
  }, [lawyers, searchTerm])

  const MemberCard = ({ member, type }: { member: Arbitrator | Lawyer; type: "arbitrator" | "lawyer" }) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image and Basic Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative mb-4">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-corporate-green/20"
              />
              <div className="absolute -bottom-2 -right-2 bg-corporate-green text-white p-2 rounded-full">
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

          {/* Member Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-corporate-green mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{member.title}</p>
              <Badge className="bg-corporate-green/10 text-corporate-green text-xs">{member.specialization}</Badge>
            </div>

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

            <div>
              <p className="text-xs text-muted-foreground mb-2">التعليم:</p>
              <p className="text-sm">{member.education}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">اللغات:</p>
              <div className="flex flex-wrap gap-1">
                {member.languages.map((lang: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs border-corporate-green text-corporate-green bg-transparent"
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">الشهادات:</p>
              <div className="space-y-1">
                {member.certifications.map((cert: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="h-3 w-3 text-corporate-green" />
                    <span className="text-xs text-muted-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {member.bio && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">نبذة:</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="bg-corporate-green hover:bg-corporate-green/90">
                تواصل معي
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white bg-transparent"
              >
                عرض الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

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
                  filteredArbitrators.map((arbitrator) => (
                    <MemberCard key={arbitrator.id} member={arbitrator} type="arbitrator" />
                  ))
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
                  filteredLawyers.map((lawyer) => <MemberCard key={lawyer.id} member={lawyer} type="lawyer" />)
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

      <Footer />
    </div>
  )
}
