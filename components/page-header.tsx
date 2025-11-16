import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
  backgroundImage?: string
  variant?: "default" | "gradient" | "minimal"
}

export function PageHeader({ 
  title, 
  description, 
  className, 
  children,
  backgroundImage,
  variant = "default"
}: PageHeaderProps) {
  const getVariantClasses = () => {
    if (backgroundImage) {
      return "bg-slate-900"
    }
    
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white"
      case "minimal":
        return "bg-white"
      default:
        return "bg-gradient-to-br from-slate-50 to-emerald-50/30"
    }
  }

  const hasBackgroundImage = !!backgroundImage
  const textColorClass = hasBackgroundImage || variant === "gradient" 
    ? "text-white drop-shadow-lg" 
    : "bg-gradient-to-l from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent"

  return (
    <div className={cn("relative overflow-hidden border-b border-slate-200/50", getVariantClasses(), className)}>
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt="خلفية الصفحة"
              fill
              priority
              sizes="100vw"
              className="object-cover scale-100 transition-transform duration-700 ease-out will-change-transform"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-emerald-900/70 to-teal-900/80 z-0" />
        </>
      )}

      {/* Background Pattern (only if no image) */}
      {!backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
            <defs>
              <pattern id="header-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M0 32V.5H32" fill="none" stroke="currentColor" strokeWidth="0.5" className={variant === "gradient" ? "text-white" : "text-emerald-600"} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#header-grid)" />
          </svg>
        </div>
      )}

      {/* Decorative Background Elements (only if no image) */}
      {!backgroundImage && (
        <>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/15 to-emerald-400/15 rounded-full blur-3xl -z-10" />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={cn(
            "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl mb-6",
            textColorClass
          )}>
            {title}
          </h1>
          
          {description && (
            <p className={cn(
              "text-lg md:text-xl lg:text-2xl leading-relaxed font-light max-w-3xl mx-auto",
              hasBackgroundImage || variant === "gradient" 
                ? "text-white/95 drop-shadow-md" 
                : "text-slate-600"
            )}>
              {description}
            </p>
          )}
          
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>

      {/* Bottom Gradient Overlay (only with background image) */}
      {backgroundImage && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-0" />
      )}

      {/* Bottom Border Line */}
      {(variant === "gradient" || backgroundImage) && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      )}
    </div>
  )
}