"use client"
import React, { useState } from "react"
import { Share2, Copy, Twitter, Linkedin, MessageCircle } from "lucide-react"

interface ShareButtonProps {
  url: string
  title: string
  className?: string
}

export const ShareButton: React.FC<ShareButtonProps> = ({ url, title, className }) => {
  const [open, setOpen] = useState(false)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {}
    } else {
      setOpen(o => !o)
    }
  }
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    alert("تم نسخ الرابط!")
    setOpen(false)
  }
  return (
    <div className={`relative inline-block ${className || ""}`}>
      <button
        className="bg-white/80 hover:bg-corporate-green/90 hover:text-white text-corporate-green rounded-full p-2 shadow transition-colors focus-visible:ring-2 focus-visible:ring-corporate-green"
        aria-label="مشاركة"
        onClick={handleShare}
      >
        <Share2 />
      </button>
      {open && (
        <div className="absolute z-50 top-12 right-0 bg-white border rounded-lg shadow-lg p-3 flex flex-col gap-2 min-w-[180px] rtl:right-0 rtl:left-auto">
          <button onClick={handleCopy} className="flex items-center gap-2 text-corporate-green hover:underline">
            <Copy className="h-4 w-4" /> نسخ الرابط
          </button>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-corporate-green hover:underline">
            <Twitter className="h-4 w-4" /> تويتر
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-corporate-green hover:underline">
            <Linkedin className="h-4 w-4" /> لينكدإن
          </a>
          <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-corporate-green hover:underline">
            <MessageCircle className="h-4 w-4" /> واتساب
          </a>
        </div>
      )}
    </div>
  )
}
