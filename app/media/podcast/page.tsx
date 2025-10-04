"use client"
import { Header } from "@/components/header"
import { Podcast } from "lucide-react"

export default function PodcastPage() {
  return (
    <div>
      <Header />
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 font-sans flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-soft p-8 max-w-lg w-full flex flex-col items-center">
        <Podcast className="h-16 w-16 text-corporate-green mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-corporate-green mb-4">بودكاست المركز</h1>
        <p className="text-muted-foreground mb-6 text-center">قريبًا: حلقات بودكاست المركز ستتوفر هنا مع إمكانية الاستماع والتحميل.</p>
        <button disabled className="bg-corporate-green text-white px-6 py-2 rounded-md opacity-60 cursor-not-allowed">اشترك في البودكاست</button>
      </div>
    </div></div>
  )
}
