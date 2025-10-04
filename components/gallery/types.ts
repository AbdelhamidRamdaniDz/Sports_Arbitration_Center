export interface GalleryPhoto {
  id: string
  url: string
  thumbnail: string
  title: string
  alt: string
  width: number
  height: number
  size: number // bytes
  format: string // webp, jpg, etc
  date: string
  category: string
  event?: string
  photographer?: string
  location?: string
  exif?: Record<string, string>
  downloads?: number
  views?: number
  blurDataURL?: string
  relatedIds?: string[]
}
