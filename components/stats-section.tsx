import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

interface Stat {
  value: string
  label: string
  description?: string
}

interface StatsSectionProps {
  stats: Stat[]
  title?: string
  description?: string
  className?: string
}

export function StatsSection({ stats, title, description, className }: StatsSectionProps) {
  const parseStatValue = (value: string) => {
    const numericMatch = value.match(/\d+/)
    return numericMatch ? Number.parseInt(numericMatch[0]) : 0
  }

  const getStatSuffix = (value: string) => {
    if (value.includes("+")) return "+"
    if (value.includes("%")) return "%"
    return ""
  }

  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center mb-12">
              {title && <h2 className="text-3xl font-bold text-corporate-green mb-4">{title}</h2>}
              {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} direction="up" delay={300 + index * 100}>
              <Card className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-corporate-green mb-2 group-hover:text-green-700 transition-colors duration-300">
                    <AnimatedCounter
                      end={parseStatValue(stat.value)}
                      suffix={getStatSuffix(stat.value)}
                      duration={2000}
                    />
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1 group-hover:text-corporate-green transition-colors duration-300">
                    {stat.label}
                  </div>
                  {stat.description && <div className="text-sm text-muted-foreground">{stat.description}</div>}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
