import arbitratorsData from "@/data/arbitrators.json"
import lawyersData from "@/data/lawyers.json"
import newsData from "@/data/news.json"
import type { Arbitrator, Lawyer, NewsItem } from "./types"

export async function getArbitrators(): Promise<Arbitrator[]> {
  // Simulate API delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 100))
  return arbitratorsData as Arbitrator[]
}

export async function getLawyers(): Promise<Lawyer[]> {
  // Simulate API delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 100))
  return lawyersData as Lawyer[]
}

export async function getNews(): Promise<NewsItem[]> {
  // Simulate API delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 100))
  return newsData as NewsItem[]
}

export async function getFeaturedNews(): Promise<NewsItem[]> {
  const news = await getNews()
  return news.filter((item) => item.featured).slice(0, 3)
}

export async function getArbitratorById(id: string): Promise<Arbitrator | null> {
  const arbitrators = await getArbitrators()
  return arbitrators.find((arb) => arb.id === id) || null
}

export async function getLawyerById(id: string): Promise<Lawyer | null> {
  const lawyers = await getLawyers()
  return lawyers.find((lawyer) => lawyer.id === id) || null
}

export async function getMemberById(
  id: string,
): Promise<{ member: Arbitrator | Lawyer | null; type: "arbitrator" | "lawyer" | null }> {
  const [arb, law] = await Promise.all([getArbitratorById(id), getLawyerById(id)])
  if (arb) return { member: arb, type: "arbitrator" }
  if (law) return { member: law, type: "lawyer" }
  return { member: null, type: null }
}

// Search and filter utilities
export function filterMembers<T extends { name: string; specialization: string; location: string }>(
  members: T[],
  searchTerm: string,
): T[] {
  if (!searchTerm.trim()) return members

  const term = searchTerm.toLowerCase()
  return members.filter(
    (member) =>
      member.name.toLowerCase().includes(term) ||
      member.specialization.toLowerCase().includes(term) ||
      member.location.toLowerCase().includes(term),
  )
}

export function sortMembersByRating<T extends { rating: number }>(members: T[]): T[] {
  return [...members].sort((a, b) => b.rating - a.rating)
}

export function sortMembersByExperience<T extends { experience: string }>(members: T[]): T[] {
  return [...members].sort((a, b) => {
    const aYears = Number.parseInt(a.experience.match(/\d+/)?.[0] || "0")
    const bYears = Number.parseInt(b.experience.match(/\d+/)?.[0] || "0")
    return bYears - aYears
  })
}
