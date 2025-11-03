import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

export const metadata: Metadata = {
  title: "الصلح | خدمات تسوية ودية للنزاعات - Tahkeem Tech",
  description:
    "خدمة الصلح لتسوية النزاعات بطريقة ودية وعملية، بمرونة أعلى وتكلفة أقل مع الحفاظ على العلاقات بين الأطراف.",
  openGraph: {
    title: "الصلح | تسوية ودية عادلة",
    description: "حلول صلح مرنة وسريعة للحفاظ على العلاقات وتقليل التكاليف.",
  },
}

export default function ConciliationPage() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Header />

      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <ScrollReveal direction="up" delay={120}>
              <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                الصلح
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={180}>
              <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                مسار ودي لتسوية النزاعات بمرونة عالية وتكلفة أقل، مع الحفاظ على العلاقات وبناء حلول عملية ترضي جميع الأطراف.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={240}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href="/forms">ابدأ طلب صلح</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  <Link href="/services">العودة للخدمات</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {["سرعة الإنجاز","تكلفة أقل","حفاظ على العلاقات"].map((title, i) => (
              <ScrollReveal key={title} direction="up" delay={150 + i * 80}>
                <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    يتيح الصلح الوصول إلى اتفاق عملي ومتوازن بسرعة وبدون تعقيد، وبكلفة أقل من التقاضي.
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
