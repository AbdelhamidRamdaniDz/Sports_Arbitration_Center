import { useEffect, useState } from "react"

type ViewType = "news" | "press" | "resource"

export function useViewCounter(type: ViewType, id: string) {
  const key = `media-views-${type}`
  const [views, setViews] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined" || !id) return
    const allViews = JSON.parse(localStorage.getItem(key) || "{}")
    const current = allViews[id] || 0
    setViews(current)
    // Increment on mount
    allViews[id] = current + 1
    setViews(allViews[id])
    localStorage.setItem(key, JSON.stringify(allViews))
  }, [key, id])

  return { views }
}
