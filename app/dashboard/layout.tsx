"use client"

import { PropsWithChildren } from "react"

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA]">
      {children}
    </div>
  )
}
