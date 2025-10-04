import { Megaphone, Handshake, GraduationCap, FileText, Award, Calendar, Users } from "lucide-react"
import React from "react"

export function getCategoryIcon(category: string) {
  switch (category) {
    case "إعلانات":
      return <Megaphone className="h-4 w-4 text-corporate-green" aria-label="إعلان" />
    case "شراكات":
      return <Handshake className="h-4 w-4 text-corporate-green" aria-label="شراكة" />
    case "تدريب":
      return <GraduationCap className="h-4 w-4 text-corporate-green" aria-label="تدريب" />
    case "لوائح":
      return <FileText className="h-4 w-4 text-corporate-green" aria-label="لائحة" />
    case "إنجازات":
      return <Award className="h-4 w-4 text-corporate-green" aria-label="إنجاز" />
    case "فعاليات":
      return <Users className="h-4 w-4 text-corporate-green" aria-label="فعالية" />
    default:
      return <Calendar className="h-4 w-4 text-corporate-green" aria-label="خبر" />
  }
}

export function isNew(dateStr: string) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  return diff <= 7
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
