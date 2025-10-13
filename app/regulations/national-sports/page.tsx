import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Search, Calendar, FileText, Filter, Eye } from "lucide-react"
import { prisma } from "@/lib/prisma"
import RegulationsClient from "./RegulationsClient"

export const metadata: Metadata = {
  title: "التشريعات الرياضية الوطنية | مركز التحكيم الرياضي",
  description: "مجموعة شاملة من القوانين واللوائح الرياضية المعتمدة في المملكة العربية السعودية",
}

type Doc = {
  id: string
  area: string
  title: string
  description: string | null
  category: string | null
  date: string | null
  pages: number | null
  size: string | null
  language: string | null
  url: string
}

export default async function NationalSportsRegulationsPage() {
  const documents: Doc[] = await (prisma as any).regulation.findMany({
    where: { area: "national-sports" },
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  const categories: string[] = []

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="التشريعات الرياضية الوطنية"
        description="مجموعة شاملة من القوانين واللوائح الرياضية المعتمدة في المملكة العربية السعودية"
      />

      <RegulationsClient />

      <Footer />
    </div>
  )
}
