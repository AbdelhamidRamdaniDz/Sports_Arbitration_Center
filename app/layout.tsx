import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Trade - Sports Arbitration Center",
  description: "مركز متخصص في التحكيم والوساطة - Specialized center for arbitration and mediation",
  keywords: ["تحكيم رياضي", "وساطة", "قانون رياضي", "sports arbitration", "mediation", "sports law"],
  authors: [{ name: "Sports Arbitration Center" }],
  openGraph: {
    title: "مركز التحكيم والوساطة",
    description: "مركز متخصص في التحكيم والوساطة",
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}