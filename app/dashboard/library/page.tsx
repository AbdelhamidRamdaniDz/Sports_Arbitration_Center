import { Metadata } from "next"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "لوحة التحكم | المكتبة الرقمية",
  description: "إدارة موارد المكتبة الرقمية (إضافة، تعديل، نشر)",
}

async function createResource(formData: FormData) {
  "use server"
  const title = String(formData.get("title") || "").trim()
  const description = String(formData.get("description") || "").trim()
  const category = String(formData.get("category") || "").trim()
  const url = String(formData.get("url") || "").trim() || null
  const tagsRaw = String(formData.get("tags") || "").trim()
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : []

  if (!title || !category) return

  await prisma.resource.create({
    data: { title, description: description || null, category, url, tags, published: true },
  })

  revalidatePath("/dashboard/library")
  revalidatePath("/services/library")
}

async function togglePublish(id: string, publish: boolean) {
  "use server"
  await prisma.resource.update({ where: { id }, data: { published: publish } })
  revalidatePath("/dashboard/library")
  revalidatePath("/services/library")
}

async function deleteResource(id: string) {
  "use server"
  await prisma.resource.delete({ where: { id } })
  revalidatePath("/dashboard/library")
  revalidatePath("/services/library")
}

export default async function LibraryDashboardPage() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } })
  const categories = [
    { key: "guides", label: "مراجع وأدلة" },
    { key: "templates", label: "نماذج ووثائق" },
    { key: "cases", label: "سوابق وملخصات" },
  ] as const

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Header />

      <section className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-2 text-3xl font-bold text-slate-900">إدارة المكتبة الرقمية</h1>
            <p className="text-slate-600 mb-6">أضف موارد جديدة ونظّمها حسب التصنيف، وتحكّم في حالة النشر.</p>

            {/* Create Form */}
            <form action={createResource} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm mb-8">
              <div>
                <label className="block text-sm text-slate-600 mb-1">العنوان</label>
                <input name="title" required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">التصنيف</label>
                <select name="category" required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">— اختر —</option>
                  {categories.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">الوصف (اختياري)</label>
                <textarea name="description" rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">الرابط (اختياري)</label>
                <input name="url" placeholder="https://..." className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">وسوم (مفصولة بفاصلة)</label>
                <input name="tags" placeholder="تحكيم, وساطة, نماذج" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="rounded-lg bg-emerald-600 text-white px-5 py-2.5 hover:bg-emerald-700">إضافة</button>
              </div>
            </form>

            {/* Resources Table */}
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
              <table className="min-w-full text-right">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold">العنوان</th>
                    <th className="px-4 py-3 text-sm font-semibold">التصنيف</th>
                    <th className="px-4 py-3 text-sm font-semibold">الحالة</th>
                    <th className="px-4 py-3 text-sm font-semibold">تاريخ الإضافة</th>
                    <th className="px-4 py-3 text-sm font-semibold">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {resources.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{r.title}</div>
                        {r.description ? (
                          <div className="text-xs text-slate-600 line-clamp-2 mt-0.5">{r.description}</div>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{r.category}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={r.published ? "text-emerald-700" : "text-slate-500"}>
                          {r.published ? "منشور" : "غير منشور"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{new Date(r.createdAt).toLocaleDateString("ar-DZ")}</td>
                      <td className="px-4 py-3 text-sm">
                        <form action={async () => { 'use server'; await togglePublish(r.id, !r.published) }} className="inline-block mr-2">
                          <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100">
                            {r.published ? "إلغاء النشر" : "نشر"}
                          </button>
                        </form>
                        <form action={async () => { 'use server'; await deleteResource(r.id) }} className="inline-block">
                          <button className="rounded-md border border-red-200 text-red-700 px-3 py-1.5 text-sm hover:bg-red-50">
                            حذف
                          </button>
                        </form>
                        {r.url ? (
                          <a href={r.url} target="_blank" className="inline-block ml-2 text-emerald-700 hover:underline">رابط</a>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
