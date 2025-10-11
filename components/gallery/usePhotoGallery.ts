import useSWR from "swr"
import { GalleryPhoto } from "./types"

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error("Network error")
  return res.json()
})

export function usePhotoGallery() {
  const { data, error, isLoading, mutate } = useSWR<{ data: Array<{ id: string; url: string; caption?: string | null; createdAt?: string }> }>(
    "/api/media/photos?limit=100",
    fetcher,
    { revalidateOnFocus: false }
  )

  const photos: GalleryPhoto[] = (data?.data || []).map((p) => {
    const ext = p.url.split(".").pop()?.toLowerCase() || "jpg"
    return {
      id: p.id,
      url: p.url,
      thumbnail: p.url,
      title: p.caption || "",
      alt: p.caption || "",
      width: 1200,
      height: 800,
      size: 0,
      format: ext,
      date: p.createdAt || new Date().toISOString(),
      category: "",
    }
  })

  return {
    photos,
    loading: isLoading,
    error,
    refetch: mutate,
  }
}
