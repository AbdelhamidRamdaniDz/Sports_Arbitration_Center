import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { prisma } from "@/lib/prisma"

type LibraryItem = {
  id: string
  title: string
  description: string | null
  category: string
  url: string | null
  tags: string[]
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export const metadata: Metadata = {
  title: "مكتبة رقمية | موارد قانونية ومعرفية - Tahkeem Tech",
  description:
    "مكتبة رقمية تضم موارد قانونية ومعرفية في التحكيم والوساطة والحوكمة. تصفح الأدلة والنماذج والمراجع بسهولة وسرعة.",
  openGraph: {
    title: "المكتبة الرقمية | موارد موثوقة",
    description: "مراجع وأدلة ونماذج عملية في التحكيم والوساطة ومجالات الممارسة المختلفة.",
  },
}

const CATEGORIES: { icon: string; title: string; description: string; href: string }[] = [
  { icon: "📚", title: "مراجع وأدلة", description: "كتب وأدلة مهنية في التحكيم والوساطة والحوكمة.", href: "/services/library#guides" },
  { icon: "🧾", title: "نماذج ووثائق", description: "نماذج اتفاقيات، مذكرات، لوائح وإجراءات.", href: "/services/library#templates" },
  { icon: "⚖️", title: "سوابق وملخصات", description: "ملخصات أحكام وسوابق ذات صلة بمجالات الممارسة.", href: "/services/library#cases" },
]

export default async function LibraryPage() {
  const db = prisma as any
  const resources: LibraryItem[] = await db.resource.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  const guides: LibraryItem[] = resources.filter((r) => r.category === "guides")
  const templates: LibraryItem[] = resources.filter((r) => r.category === "templates")
  const casesItems: LibraryItem[] = resources.filter((r) => r.category === "cases")

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Header />

      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <ScrollReveal direction="up" delay={100}>
              <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                المكتبة الرقمية
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={160}>
              <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                منصة معرفية موّحدة تضم أفضل الموارد المهنية: مراجع، نماذج عملية، وملخصات أحكام لدعم عملك القانوني والإداري.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={220}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href="#guides">تصفح الموارد</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  <Link href="/forms">طلب مورد مخصص</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {CATEGORIES.map((cat, i) => (
              <ScrollReveal key={cat.title} direction="up" delay={140 + i * 70}>
                <article className="group relative rounded-2xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-transparent to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="text-5xl mb-4" aria-hidden="true">{cat.icon}</div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                      {cat.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <Link href={cat.href} className="absolute inset-0" aria-label={cat.title} />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" className="relative py-12 md:py-16 bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">مراجع وأدلة</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={140}>
              {guides.length ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc pr-6 text-slate-700">
                  {guides.map((g: LibraryItem) => (
                    <li key={g.id} className="marker:text-emerald-600">
                      {g.url ? (
                        <a href={g.url} target="_blank" className="hover:underline text-emerald-700">{g.title}</a>
                      ) : (
                        <span className="text-slate-800">{g.title}</span>
                      )}
                      {g.description ? (
                        <div className="text-slate-600 text-sm mt-1">{g.description}</div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">لا توجد موارد متاحة حالياً في هذا القسم.</p>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="templates" className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">نماذج ووثائق</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={140}>
              {templates.length ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc pr-6 text-slate-700">
                  {templates.map((t: LibraryItem) => (
                    <li key={t.id} className="marker:text-emerald-600">
                      {t.url ? (
                        <a href={t.url} target="_blank" className="hover:underline text-emerald-700">{t.title}</a>
                      ) : (
                        <span className="text-slate-800">{t.title}</span>
                      )}
                      {t.description ? (
                        <div className="text-slate-600 text-sm mt-1">{t.description}</div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">لا توجد موارد متاحة حالياً في هذا القسم.</p>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="cases" className="relative py-12 md:py-16 bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">سوابق وملخصات</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={140}>
              {casesItems.length ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc pr-6 text-slate-700">
                  {casesItems.map((c: LibraryItem) => (
                    <li key={c.id} className="marker:text-emerald-600">
                      {c.url ? (
                        <a href={c.url} target="_blank" className="hover:underline text-emerald-700">{c.title}</a>
                      ) : (
                        <span className="text-slate-800">{c.title}</span>
                      )}
                      {c.description ? (
                        <div className="text-slate-600 text-sm mt-1">{c.description}</div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">لا توجد موارد متاحة حالياً في هذا القسم.</p>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up" delay={100}>
            <div className="inline-flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-3">
              <span className="text-slate-700">تحتاج مورداً غير موجود؟</span>
              <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/forms">اطلبه الآن</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
