import type { Metadata } from "next"
import SportsArbitrationClient from "./client"

export const metadata: Metadata = {
  title: "التحكيم الرياضي | مركز التحكيم الرياضي",
  description: "خدمات التحكيم المتخصصة في النزاعات الرياضية بجميع أنواعها مع فريق من المحكمين المعتمدين دولياً",
}

export default function SportsArbitrationPage() {
  return <SportsArbitrationClient />
}
