import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import RegulationsClient from "./RegulationsClient"

export const metadata: Metadata = {
  title: "التشريعات الرياضية الوطنية | مركز التحكيم الرياضي",
  description: "مجموعة شاملة من القوانين واللوائح الرياضية المعتمدة في المملكة العربية السعودية",
}

export default async function NationalSportsRegulationsPage() {
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
