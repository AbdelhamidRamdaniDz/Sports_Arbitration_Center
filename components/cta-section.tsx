"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CTASectionProps {
  title: string
  description: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  className?: string
  variant?: "default" | "corporate" | "gradient-light" | "gradient-dark"
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  className,
  variant = "default",
}: CTASectionProps) {
  const baseGradients = {
    default:
      "from-white via-white to-light-grey",
    corporate:
      "from-[#0b2f24] via-[#0b2f24] to-[#0b2f24]",
    "gradient-light":
      "from-white via-[#f8fafb] to-[#eef2f6]",
    "gradient-dark":
      "from-[#0b2f24] via-[#0e3a2c] to-[#0b2f24]",
  } as const

  const isCorporate = variant === "corporate" || variant === "gradient-dark"

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className={cn("relative overflow-hidden py-16 md:py-20", className)}>
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          `from-0% via-60% to-100%`,
          isCorporate ? baseGradients["gradient-dark"] : baseGradients[variant] ?? baseGradients.default,
        )}
      />

      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft radial glows */}
        <div className={cn("absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl", isCorporate ? "bg-emerald-500/20" : "bg-corporate-green/15")} />
        <div className={cn("absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl", isCorporate ? "bg-teal-400/20" : "bg-emerald-300/20")} />
        {/* subtle geometric svg pattern */}
        <svg className="absolute inset-x-0 top-0 h-full w-full opacity-[0.08]" aria-hidden>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className={cn(isCorporate ? "text-white" : "text-corporate-green")} />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className={cn("relative z-10 mx-auto max-w-4xl text-center", isCorporate ? "text-white" : "text-corporate-green")}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className={cn("mb-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl", isCorporate ? "text-white" : "text-corporate-green")}
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={cn("mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl", isCorporate ? "text-white/90" : "text-muted-foreground")}
          >
            {description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.05 }}>
              <Button
                asChild
                size="lg"
                className={cn(
                  "group text-lg px-8 py-3",
                  isCorporate
                    ? "bg-white text-corporate-green hover:bg-white/90"
                    : "bg-gradient-to-r from-corporate-green to-teal-500 text-white hover:from-corporate-green/90 hover:to-teal-500/90",
                )}
              >
                <Link href={primaryButton.href}>
                  <span className="inline-flex items-center gap-2">
                    {primaryButton.text}
                    <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  </span>
                </Link>
              </Button>
            </motion.div>

            {secondaryButton && (
              <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.12 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className={cn(
                    "group text-lg px-8 py-3",
                    isCorporate
                      ? "border-white text-corporate-green hover:bg-white hover:text-corporate-green"
                      : "border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white",
                  )}
                >
                  <Link href={secondaryButton.href}>
                    <span className="inline-flex items-center gap-2">
                      {secondaryButton.text}
                      <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
