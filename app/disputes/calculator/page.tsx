import type { Metadata } from "next"
import Client from "./Client"

export const metadata: Metadata = {
  title: "حاسبة النزاعات | مركز التحكيم الرياضي",
  description: "احسب التكلفة المتوقعة والوقت اللازم لحل النزاع الرياضي",
}

export default function DisputeCalculatorPage() {
  return <Client />
}
