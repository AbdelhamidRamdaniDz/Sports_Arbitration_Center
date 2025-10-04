import useSWR from "swr"
import { GalleryPhoto } from "./types"

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error("Network error")
  return res.json()
})

export function usePhotoGallery() {
  const { data, error, isLoading, mutate } = useSWR<GalleryPhoto[]>("/api/photos", fetcher, { revalidateOnFocus: false })
  return {
    photos: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}
