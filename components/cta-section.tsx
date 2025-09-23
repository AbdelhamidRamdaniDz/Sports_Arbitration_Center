import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

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
  variant?: "default" | "corporate"
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  className,
  variant = "default",
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-20",
        variant === "corporate" ? "bg-corporate-green text-white" : "bg-light-grey",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={cn(
              "text-3xl font-bold mb-6 md:text-4xl lg:text-5xl",
              variant === "corporate" ? "text-white" : "text-corporate-green",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "text-lg leading-relaxed mb-8 md:text-xl",
              variant === "corporate" ? "text-white/90" : "text-muted-foreground",
            )}
          >
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className={cn(
                "text-lg px-8 py-3",
                variant === "corporate"
                  ? "bg-white text-corporate-green hover:bg-white/90"
                  : "bg-corporate-green text-white hover:bg-corporate-green/90",
              )}
            >
              <Link href={primaryButton.href}>
                {primaryButton.text}
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>

            {secondaryButton && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className={cn(
                  "text-lg px-8 py-3",
                  variant === "corporate"
                    ? "border-white text-white hover:bg-white hover:text-corporate-green"
                    : "border-corporate-green text-corporate-green hover:bg-corporate-green hover:text-white",
                )}
              >
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
