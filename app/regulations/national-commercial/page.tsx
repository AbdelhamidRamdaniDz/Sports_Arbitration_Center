import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import RegulationsClient from "./RegulationsClient"

export const metadata: Metadata = {
  title: "التشريعات التجارية الوطنية | مركز التحكيم الرياضي",
  description: "القوانين التجارية والمالية المتعلقة بالأنشطة الرياضية والاستثمار في القطاع الرياضي",
}

export default function NationalCommercialRegulationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="التشريعات التجارية الوطنية"
        description="القوانين التجارية والمالية المتعلقة بالأنشطة الرياضية والاستثمار في القطاع الرياضي"
      />

      <RegulationsClient />

      <Footer />
    </div>
  )
}
