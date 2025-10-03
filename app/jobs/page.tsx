"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Calendar } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-light-grey flex flex-col relative overflow-hidden">
      <Header />

      <PageHeader
        title="الوظائف المتاحة"
        description="قريبًا سننشر فرص عمل جديدة. تابعنا وكن من أوائل المتقدمين."
      />

      <main className="flex-grow">
        {/* decorative gradient blob */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-corporate-gradient opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-corporate-gradient opacity-10 blur-3xl" />

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl icon-gradient shadow-soft">
                <Search className="h-10 w-10" />
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-2xl md:text-3xl font-extrabold text-corporate-green mb-4"
            >
              لا توجد فرص متاحة حالياً
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-700 leading-7 md:leading-8 mb-10"
            >
              نعمل على تجهيز شواغر جديدة. يرجى العودة لاحقاً، أو تابع قنواتنا الرسمية لمعرفة المستجدات.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-corporate-green text-white hover:bg-green-700 hover:shadow-soft hover-lift"
                onClick={() => (window.location.href = "/careers")}
              >
                <Calendar className="ml-2 h-4 w-4" />
                عُد إلى صفحة الوظائف
              </Button>
              <Button
                variant="outline"
                className="border-corporate-green text-corporate-green hover:bg-corporate-green/10 hover-lift"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                تصفح رأس الصفحة
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


