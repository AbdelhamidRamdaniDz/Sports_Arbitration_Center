import type { NextApiRequest, NextApiResponse } from "next"
import resources from "@/data/resources.json"
import { GalleryPhoto } from "@/components/gallery/types"

export default function handler(req: NextApiRequest, res: NextApiResponse<GalleryPhoto[]>) {
  // Mock metadata for demo
  const photos: GalleryPhoto[] = (resources as any[])
    .filter(r => r.type === "image")
    .map((r, i) => ({
      id: r.id,
      url: r.url,
      thumbnail: r.thumbnail,
      title: r.title,
      alt: r.title,
      width: 800,
      height: 500 + (i % 3) * 100,
      size: 120 * 1024 + i * 1000,
      format: "webp",
      date: r.date,
      category: r.category || "عام",
      event: r.event,
      photographer: r.photographer || "مركز التحكيم الرياضي",
      location: r.location,
      exif: {
        Camera: "Canon EOS 5D Mark IV",
        Lens: "24-70mm f/2.8",
        ISO: "100",
        Exposure: "1/200s",
      },
      downloads: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 500),
      blurDataURL: "/placeholder.jpg",
      relatedIds: [],
    }))
  res.status(200).json(photos)
}
