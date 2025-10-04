import { useCallback, useEffect, useState } from "react"

type FavoriteType = "news" | "press" | "resource" | "video"

export function useFavorites(type: FavoriteType) {
  const key = `media-favs-${type}`
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(key)
    setFavorites(stored ? JSON.parse(stored) : [])
  }, [key])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(updated))
      return updated
    })
  }, [key])

  const getFavorites = useCallback(() => favorites, [favorites])

  return { isFavorite, toggleFavorite, getFavorites, favorites }
}
