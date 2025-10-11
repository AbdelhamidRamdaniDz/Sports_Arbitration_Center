"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/login" })
  }, [])

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <div className="text-[#003366]">تسجيل الخروج...</div>
    </div>
  )
}
