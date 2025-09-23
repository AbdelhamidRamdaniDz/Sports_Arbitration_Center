import type React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn("bg-light-grey border-b", className)}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-corporate-green md:text-4xl lg:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{description}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  )
}
