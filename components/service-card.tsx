import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  description: string
  benefits?: string[]
  href?: string
  icon?: React.ReactNode
  className?: string
  variant?: "default" | "featured"
}

export function ServiceCard({
  title,
  description,
  benefits = [],
  href,
  icon,
  className,
  variant = "default",
}: ServiceCardProps) {
  const CardWrapper = href ? Link : "div"
  const cardProps = href ? { href } : {}

  return (
    <CardWrapper {...cardProps}>
      <Card
        className={cn(
          "group h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:scale-105",
          variant === "featured" &&
            "border-corporate-green bg-gradient-to-br from-white to-green-50 hover:from-green-50 hover:to-green-100",
          href && "cursor-pointer",
          className,
        )}
      >
        <CardHeader className="space-y-4">
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-corporate-green/10 text-corporate-green group-hover:bg-corporate-green group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              {icon}
            </div>
          )}
          <div>
            <CardTitle className="text-xl font-bold text-corporate-green group-hover:text-green-700 transition-all duration-300 group-hover:translate-x-1">
              {title}
            </CardTitle>
            <CardDescription className="mt-2 text-base leading-relaxed group-hover:text-foreground transition-colors duration-300">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        {benefits.length > 0 && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Check className="h-4 w-4 text-corporate-green flex-shrink-0 group-hover:text-green-700 transition-colors duration-300" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {href && (
              <Button
                variant="outline"
                className="w-full group-hover:bg-corporate-green group-hover:text-white group-hover:border-corporate-green transition-all duration-300 bg-transparent hover:shadow-md"
              >
                اعرف المزيد
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            )}
          </CardContent>
        )}
      </Card>
    </CardWrapper>
  )
}
