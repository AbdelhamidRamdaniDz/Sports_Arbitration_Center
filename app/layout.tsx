import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
})

export const metadata: Metadata = {
  title: "مركز التحكيم الرياضي | Sports Arbitration Center",
  description: "مركز متخصص في التحكيم والوساطة الرياضية - Specialized center for sports arbitration and mediation",
  generator: "v0.app",
  keywords: ["تحكيم رياضي", "وساطة", "قانون رياضي", "sports arbitration", "mediation", "sports law"],
  authors: [{ name: "Sports Arbitration Center" }],
  openGraph: {
    title: "مركز التحكيم الرياضي",
    description: "مركز متخصص في التحكيم والوساطة الرياضية",
    type: "website",
    locale: "ar_SA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${tajawal.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
