import type { Metadata } from "next"
import CommercialArbitrationClient from "./client"

export const metadata: Metadata = {
  title: "التحكيم التجاري | مركز التحكيم",
  description: "حلول تحكيم تجاري احترافية لفض النزاعات التجارية بعناية وسرعة وحياد تام",
}

export default function CommercialArbitrationPage() {
  return <CommercialArbitrationClient />
}
