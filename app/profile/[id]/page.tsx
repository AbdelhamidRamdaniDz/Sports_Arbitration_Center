"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, MapPin, Award, Languages } from "lucide-react"
import { getMemberById } from "@/lib/data"
import type { Arbitrator, Lawyer } from "@/lib/types"

export default function MemberProfilePage() {
  const params = useParams<{ id: string }>()
  const id = params?.id as string
  const router = useRouter()
  const [member, setMember] = useState<Arbitrator | Lawyer | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const { member } = await getMemberById(id)
      setMember(member)
    }
    load()
  }, [id])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader title="الملف الشخصي" description="معلومات تفصيلية عن العضو" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="bg-white">
                <CardContent className="p-6 space-y-4">
                  {member && (
                    <>
                      <div className="flex flex-col items-center text-center gap-3">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-28 h-28 rounded-full object-cover border-4 border-corporate-green/20"
                        />
                        <div>
                          <h2 className="text-xl font-bold text-corporate-green">{member.name}</h2>
                          <p className="text-sm text-muted-foreground">{member.title}</p>
                        </div>
                        <Badge className="bg-corporate-green/10 text-corporate-green text-xs">
                          {member.specialization}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-corporate-green" />
                          <span className="text-muted-foreground">{member.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-corporate-green" />
                          <span className="text-muted-foreground">{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-corporate-green" />
                          <span className="text-muted-foreground">{member.email}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button className="bg-corporate-green hover:bg-corporate-green/90" onClick={() => router.push(`/contact/${member.id}`)}>
                          تواصل معي
                        </Button>
                        <Button variant="outline" onClick={() => router.back()}>رجوع</Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardContent className="p-6 space-y-6">
                  {member ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-corporate-green mb-2">المدينة والخبرة</h3>
                          <p className="text-sm text-muted-foreground">المدينة: {member.location}</p>
                          <p className="text-sm text-muted-foreground">الخبرة: {member.experience}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-corporate-green mb-2">اللغات</h3>
                          <div className="flex flex-wrap gap-2">
                            {member.languages.map((l) => (
                              <Badge key={l} variant="outline" className="border-corporate-green text-corporate-green bg-transparent text-xs">
                                {l}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold text-corporate-green mb-2">الشهادات</h3>
                        <div className="space-y-2">
                          {member.certifications.map((c, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-corporate-green" />
                              <span className="text-sm text-muted-foreground">{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {member.bio && (
                        <>
                          <Separator />
                          <div>
                            <h3 className="font-semibold text-corporate-green mb-2">نبذة</h3>
                            <p className="text-sm text-muted-foreground leading-7">{member.bio}</p>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <p className="text-muted-foreground">جاري التحميل...</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


