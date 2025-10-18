import type { Arbitrator, Lawyer, NewsItem } from "./types"

async function fetchMembers(params: Record<string, string>): Promise<any[]> {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`/api/members?${qs}`, { cache: "no-store" })
  if (!res.ok) throw new Error("failed_members_fetch")
  const json = await res.json()
  return Array.isArray(json.data) ? json.data : []
}

function toExperienceString(exp?: number | null): string {
  if (typeof exp === "number") return `${exp} سنة خبرة`
  return "-"
}

export async function getArbitrators(): Promise<Arbitrator[]> {
  const data = await fetchMembers({ role: "arbitrator", status: "active" })
  return data.map((u: any) => ({
    id: u.id,
    type: "arbitrator",
    name: u.name,
    title: "محكم",
    specialization: u.specialization || "-",
    experience: toExperienceString(u.experience),
    education: u.education || "-",
    languages: Array.isArray(u.languages) ? u.languages : [],
    location: u.city || "-",
    rating: 0,
    cases: 0,
    certifications: Array.isArray(u.certifications) ? u.certifications : [],
    image: u.image || "/placeholder.svg",
    phone: u.phone || "-",
    email: u.email,
  })) as Arbitrator[]
}

export async function getLawyers(): Promise<Lawyer[]> {
  const data = await fetchMembers({ role: "lawyer", status: "active" })
  return data.map((u: any) => ({
    id: u.id,
    type: "lawyer",
    name: u.name,
    title: "محامي",
    specialization: u.specialization || "-",
    experience: toExperienceString(u.experience),
    education: u.education || "-",
    languages: Array.isArray(u.languages) ? u.languages : [],
    location: u.city || "-",
    rating: 0,
    cases: 0,
    certifications: Array.isArray(u.certifications) ? u.certifications : [],
    image: u.image || "/placeholder.svg",
    phone: u.phone || "-",
    email: u.email,
  })) as Lawyer[]
}

export async function getNews(): Promise<NewsItem[]> {
  // Keep existing news JSON behavior (if present) by lazy import to avoid bundling
  const mod = await import("@/data/news.json")
  return (mod.default as NewsItem[]) || []
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
