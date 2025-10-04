import useSWR from "swr"
import { GalleryVideo } from "./types"

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error("Network error")
  return res.json()
})

export function useVideoGallery() {
  const { data, error, isLoading, mutate } = useSWR<GalleryVideo[]>("/api/videos", fetcher, { revalidateOnFocus: false })
  return {
    videos: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}