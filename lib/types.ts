export interface Member {
  id: string
  name: string
  title: string
  specialization: string
  experience: string
  education: string
  languages: string[]
  location: string
  rating: number
  cases: number
  certifications: string[]
  image: string
  phone: string
  email: string
  bio?: string
  achievements?: string[]
}

export interface Arbitrator extends Member {
  type: "arbitrator"
  internationalCertifications?: string[]
  casTypes?: string[]
}

export interface Lawyer extends Member {
  type: "lawyer"
  barAssociation?: string
  practiceAreas?: string[]
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: "news" | "announcement" | "event" | "regulation"
  image: string
  tags: string[]
  featured?: boolean
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  featured?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  pricing?: {
    basic: number
    premium: number
    enterprise: number
  }
  duration?: string
  requirements?: string[]
}

export interface Regulation {
  id: string
  title: string
  description: string
  category: "national-sports" | "national-commercial" | "international"
  fileUrl: string
  fileSize: string
  lastUpdated: string
  version: string
  language: "ar" | "en" | "both"
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  serviceType?: string
  preferredContact?: "phone" | "email" | "whatsapp"
}

export interface ArbitrationForm {
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  respondentName: string
  respondentEmail?: string
  disputeType: string
  disputeDescription: string
  requestedAmount?: number
  urgency: "normal" | "urgent" | "emergency"
  documents?: File[]
  preferredArbitrator?: string
  preferredLanguage: "ar" | "en"
}
