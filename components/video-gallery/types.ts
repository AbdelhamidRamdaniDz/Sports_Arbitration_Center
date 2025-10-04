export interface GalleryVideo {
  id: string
  url: string
  thumbnail: string
  title: string
  alt: string
  duration: number // seconds
  format: string // mp4, webm, etc
  date: string
  category: string
  event?: string
  creator?: string
  location?: string
  quality?: string
  downloads?: number
  views?: number
  blurDataURL?: string
  relatedIds?: string[]
}