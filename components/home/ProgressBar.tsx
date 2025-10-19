"use client"

import { useEffect, useRef, useState } from "react"

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let maxScroll = 1
    const computeMax = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }
    computeMax()
    const onResize = () => computeMax()
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const scrolled = window.scrollY
        setProgress((scrolled / maxScroll) * 100)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-corporate-green to-emerald-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
