import type { Metadata } from "next"
import TrainingClient from "./client"

export const metadata: Metadata = {
  title: "التدريب والتأهيل | مركز التحكيم الرياضي",
  description: "برامج تدريبية متخصصة في القانون الرياضي والتحكيم مع شهادات معترف بها محلياً ودولياً",
}

export default function TrainingPage() {
  return <TrainingClient />
}
