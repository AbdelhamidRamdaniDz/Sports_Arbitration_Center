import { Metadata } from "next"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "لوحة التحكم | البيانات الصحفية",
  description: "إدارة البيانات الصحفية: إضافة وتعديل وحذف وعلامة عاجل",
}

function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]+/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
  return base || `press-${Date.now()}`
}

async function createPressRelease(formData: FormData) {
  "use server"
  const title = String(formData.get("title") || "").trim()
  const excerpt = String(formData.get("excerpt") || "").trim() || null
  const body = String(formData.get("body") || "").trim() || null
  const mainImage = String(formData.get("mainImage") || "").trim() || null
  const urgent = String(formData.get("urgent") || "") === "on"
  if (!title) return

  let slug = slugify(title)
  // ensure unique slug
  const exists = await prisma.news.findUnique({ where: { slug } }).catch(() => null)
  if (exists) slug = `${slug}-${Date.now()}`

  await prisma.news.create({
    data: { title, slug, excerpt, body, mainImage, category: "press", urgent },
  })

  revalidatePath("/dashboard/press-releases")
  revalidatePath("/media/news")
}

async function deletePressRelease(id: string) {
  "use server"
  await prisma.news.delete({ where: { id } })
  revalidatePath("/dashboard/press-releases")
  revalidatePath("/media/news")
}

async function toggleUrgent(id: string, urgent: boolean) {
  "use server"
  await prisma.news.update({ where: { id }, data: { urgent } })
  revalidatePath("/dashboard/press-releases")
  revalidatePath("/media/news")
}

export default async function PressReleasesDashboardPage() {
  const press = await prisma.news.findMany({
    where: { category: { in: ["press", "بيان", "بيان صحفي", "Press", "PressRelease"] } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <section className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-2 text-3xl font-bold text-slate-900">إدارة البيانات الصحفية</h1>
            <p className="text-slate-600 mb-6">أضف بيانًا صحفيًا جديدًا، أو حدّث القائم، أو احذفه.</p>

            {/* Create Form */}
            <form action={createPressRelease} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm mb-8">
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">العنوان</label>
                <input name="title" required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">المقتطف (اختياري)</label>
                <textarea name="excerpt" rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">المحتوى (اختياري)</label>
                <textarea name="body" rows={5} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">الصورة الرئيسية (اختياري)</label>
                <input name="mainImage" placeholder="https://..." className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="flex items-center gap-2">
                <input id="urgent" name="urgent" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <label htmlFor="urgent" className="text-sm text-slate-600">عاجل</label>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="rounded-lg bg-emerald-600 text-white px-5 py-2.5 hover:bg-emerald-700">إضافة</button>
              </div>
            </form>

            {/* Table */}
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
              <table className="min-w-full text-right">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold">العنوان</th>
                    <th className="px-4 py-3 text-sm font-semibold">Slug</th>
                    <th className="px-4 py-3 text-sm font-semibold">عاجل</th>
                    <th className="px-4 py-3 text-sm font-semibold">التاريخ</th>
                    <th className="px-4 py-3 text-sm font-semibold">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {press.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900 line-clamp-2">{p.title}</div>
                        {p.excerpt ? (
                          <div className="text-xs text-slate-600 line-clamp-2 mt-0.5">{p.excerpt}</div>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{p.slug}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={p.urgent ? "text-emerald-700" : "text-slate-500"}>
                          {p.urgent ? "عاجل" : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{new Date(p.createdAt).toLocaleDateString("ar-DZ")}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <form action={async () => { 'use server'; await toggleUrgent(p.id, !p.urgent) }} className="inline-block mr-2">
                          <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100">
                            {p.urgent ? "إلغاء عاجل" : "تعيين عاجل"}
                          </button>
                        </form>
                        <form action={async () => { 'use server'; await deletePressRelease(p.id) }} className="inline-block">
                          <button className="rounded-md border border-red-200 text-red-700 px-3 py-1.5 text-sm hover:bg-red-50">
                            حذف
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


