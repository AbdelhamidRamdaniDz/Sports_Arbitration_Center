import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import RegulationsClient from "./RegulationsClient"

export const metadata: Metadata = {
  title: "التشريعات الدولية | مركز التحكيم الرياضي",
  description: "المعاهدات والاتفاقيات الدولية والقوانين المعتمدة من المنظمات الرياضية العالمية",
}

export default function InternationalRegulationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="التشريعات الدولية"
        description="المعاهدات والاتفاقيات الدولية والقوانين المعتمدة من المنظمات الرياضية العالمية"
      />

      <RegulationsClient />

      <Footer />
    </div>
  )
}
