"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminRulingsRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/dashboard/rulings")
  }, [router])
  return null
}
