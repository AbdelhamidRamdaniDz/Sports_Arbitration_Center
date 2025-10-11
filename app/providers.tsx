'use client';

import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { SessionProvider } from "next-auth/react"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        {children}
      </Suspense>
      <Analytics />
    </SessionProvider>
  )
}