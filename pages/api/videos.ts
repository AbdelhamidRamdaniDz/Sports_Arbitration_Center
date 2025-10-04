import type { NextApiRequest, NextApiResponse } from "next"
import resources from "@/data/resources.json"
import { GalleryVideo } from "@/components/video-gallery/types"

export default function handler(req: NextApiRequest, res: NextApiResponse<GalleryVideo[]>) {
  // Filter videos from resources
  const videos: GalleryVideo[] = (resources as any[])
    .filter(r => r.type === "video")
    .map((r, i) => ({
      id: r.id,
      url: r.url,
      thumbnail: r.thumbnail,
      title: r.title,
      alt: r.title,
      duration: 120 + (i % 5) * 30, // Mock duration in seconds
      format: "mp4",
      date: r.date,
      category: r.category || "عام",
      event: r.event,
      creator: r.photographer || "مركز التحكيم الرياضي",
      location: r.location,
      quality: "HD",
      downloads: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 500),
      blurDataURL: "/placeholder.jpg",
      relatedIds: [],
    }))
  res.status(200).json(videos)
}