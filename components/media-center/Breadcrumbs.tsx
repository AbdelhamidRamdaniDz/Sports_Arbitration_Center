import Link from "next/link"
import React from "react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  currentLabel: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, currentLabel }) => (
  <nav className="mb-6" aria-label="مسار التنقل">
    <ol className="flex flex-row-reverse gap-2 text-sm text-muted-foreground rtl:flex-row-reverse" dir="rtl">
      {items.map((item, idx) => (
        <li key={item.label} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:underline focus-visible:ring-2 focus-visible:ring-corporate-green rounded px-1" aria-label={`انتقل إلى ${item.label}`}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          <span aria-hidden="true" className="mx-1 select-none">/</span>
        </li>
      ))}
      <li className="font-bold text-corporate-green" aria-current="page">{currentLabel}</li>
    </ol>
  </nav>
)
