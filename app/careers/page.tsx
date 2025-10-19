"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Briefcase, Search, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function CareersPage() {
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="min-h-screen bg-light-grey flex flex-col relative overflow-hidden">
      <Header />
      <main className="flex-grow">
        {/* decorative gradient blob */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-corporate-gradient opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-corporate-gradient opacity-10 blur-3xl" />

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl icon-gradient shadow-soft">
                <Briefcase className="h-10 w-10" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-2xl md:text-3xl font-extrabold text-corporate-green mb-4"
            >
              لا توجد وظائف متاحة حالياً
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-700 leading-7 md:leading-8 mb-10"
            >
              نبحث دائماً عن المواهب المتميزة. كن من الأوائل الذين ينضمون إلينا عند فتح الفرص الجديدة،
              أو أرسل سيرتك الذاتية الآن لنأخذك في الاعتبار عند توفر الشواغر.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                disabled
                className="bg-corporate-green text-white hover:bg-green-700 hover:shadow-soft hover-lift"
                onClick={() => (window.location.href = "/jobs")}
              >
                <Search className="ml-2 h-4 w-4" />
                تصفح فرص أخرى قريبًا
              </Button>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button disabled className="bg-white text-corporate-green border border-corporate-green hover:bg-corporate-green/10 hover-lift">
                    <UploadCloud className="ml-2 h-4 w-4" /> رفع السيرة الذاتية
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg p-6">
                  <DialogHeader className="text-right">
                    <DialogTitle className="text-xl font-bold text-corporate-green">
                      أرسل سيرتك الذاتية
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 text-sm mt-1">
                      ارفع ملف سيرتك الذاتية بصيغة PDF أو DOCX. سنقوم بمراجعتها والتواصل عند توفر الشواغر.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <Card className="shadow-soft border border-gray-200">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <UploadCloud className="h-4 w-4 text-corporate-green" />
                          <span className="text-sm">اختر الملف</span>
                        </div>
                        <div className="grid gap-2 text-right">
                          <Label htmlFor="cv" className="text-sm">الملف</Label>
                          <Input
                            id="cv"
                            ref={fileRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                          />
                          <p className="text-xs text-gray-500">الحد الأقصى 5MB — الصيغ المقبولة: PDF, DOC, DOCX.</p>
                        </div>
                        <Progress value={0} className="h-2" />
                      </CardContent>
                    </Card>
                  </div>

                  <DialogFooter className="flex w-full justify-end gap-3">
                    <Button
                      disabled
                      variant="outline"
                      onClick={() => setOpen(false)}
                      className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                    >
                      إغلاق
                    </Button>
                    <Button
                      disabled
                      className="bg-corporate-green text-white hover:bg-green-700"
                      title="سيتم تفعيل الإرسال لاحقاً"
                    >
                      إرسال
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
