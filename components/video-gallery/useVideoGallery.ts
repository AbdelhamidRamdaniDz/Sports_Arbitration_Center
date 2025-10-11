import useSWR from "swr"
import { GalleryVideo } from "./types"

type MediaVideosResponse = { data: Array<any>; meta: { page: number; limit: number; total: number } }

const fetcher = async (url: string): Promise<GalleryVideo[]> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Network error")
  const json: MediaVideosResponse = await res.json()
  const rows = json.data || []
  const toGallery = (v: any): GalleryVideo => {
    const createdAt = v.createdAt || v.date || new Date().toISOString()
    const type = v.type || "youtube"
    const format = type === "mp4" ? "mp4" : "youtube"
    const title = v.title || ""
    return {
      id: v.id,
      url: v.url,
      thumbnail: v.thumbnail || "/placeholder.jpg",
      title,
      alt: title,
      duration: typeof v.duration === "number" ? v.duration : 0,
      format,
      date: typeof createdAt === "string" ? createdAt : new Date(createdAt).toISOString(),
      category: type,
      event: v.event,
      creator: v.creator,
      location: v.location,
      quality: v.quality,
      downloads: v.downloads,
      views: v.views,
      blurDataURL: v.blurDataURL,
      relatedIds: Array.isArray(v.relatedIds) ? v.relatedIds : [],
    }
  }
  return rows.map(toGallery)
}

export function useVideoGallery() {
  const { data, error, isLoading, mutate } = useSWR<GalleryVideo[]>("/api/media/videos", fetcher, { revalidateOnFocus: false })
  return {
    videos: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}