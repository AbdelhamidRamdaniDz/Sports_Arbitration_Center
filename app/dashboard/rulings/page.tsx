"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Hash, Trophy, CheckCircle2, AlertCircle, Sparkles, Upload, X } from "lucide-react"

type NotificationType = "success" | "error" | "warning" | "info"

interface Notification {
  id: string
  type: NotificationType
  message: string
}

export default function DashboardRulingsPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    sport: "",
    year: "",
    caseNumber: "",
    decidedAt: "",
    summary: "",
    pdfUrl: "",
  })
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (type: NotificationType, message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { id, type, message }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation feedback
    if (name === "slug" && value.includes(" ")) {
      addNotification("warning", "المعرف (slug) لا يجب أن يحتوي على مسافات")
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Validation
    if (form.slug.includes(" ")) {
      addNotification("error", "المعرف (slug) يحتوي على مسافات. يرجى إزالتها.")
      setLoading(false)
      return
    }

    addNotification("info", "جارٍ حفظ البيانات...")

    try {
      const res = await fetch("/api/rulings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          decidedAt: form.decidedAt,
          summary: form.summary || undefined,
          pdfUrl: form.pdfUrl || undefined,
        }),
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data?.error || "فشل في حفظ الحكم")
      
      addNotification("success", "✓ تم حفظ الحكم بنجاح!")
      setForm({ title: "", slug: "", sport: "", year: "", caseNumber: "", decidedAt: "", summary: "", pdfUrl: "" })
      
      // Show additional success info
      setTimeout(() => {
        addNotification("info", `تم إضافة الحكم: ${data.title || "حكم جديد"}`)
      }, 500)
      
    } catch (err: any) {
      addNotification("error", err?.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-200 text-emerald-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-800"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case "info":
        return <Sparkles className="h-5 w-5 text-blue-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/30 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.02]" aria-hidden="true">
          <defs>
            <pattern id="dashboard-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 32V.5H32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashboard-grid)" />
        </svg>
      </div>

      {/* Notifications Container - Fixed at top right */}
      <div className="fixed top-4 left-4 z-50 space-y-3 max-w-md w-full pointer-events-none">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`pointer-events-auto transform transition-all duration-300 ease-out animate-in slide-in-from-top-5 ${getNotificationStyles(
              notification.type
            )} border-2 rounded-xl p-4 shadow-lg backdrop-blur-sm`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <p className="flex-1 text-sm font-medium">
                {notification.message}
              </p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 mb-6 border border-emerald-200/50 shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">لوحة التحكم</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-l from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              إضافة حكم تحكيم جديد
            </h1>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
              أدخل تفاصيل الحكم التحكيمي الجديد بدقة لإضافته إلى قاعدة البيانات
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-2 border-slate-200/60 shadow-2xl rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-teal-500" />
            
            <CardHeader className="bg-gradient-to-br from-slate-50 to-emerald-50/30 border-b border-slate-200/50 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">بيانات الحكم</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">املأ جميع الحقول المطلوبة</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={onSubmit} className="space-y-8">
                {/* Basic Info Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full" />
                    المعلومات الأساسية
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FileText className="h-4 w-4 text-emerald-600" />
                        عنوان الحكم
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          مطلوب
                        </Badge>
                      </label>
                      <Input 
                        name="title" 
                        value={form.title} 
                        onChange={onChange} 
                        required 
                        className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl h-11 transition-colors duration-300"
                        placeholder="مثال: حكم تحكيم في نزاع تعاقدي"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Hash className="h-4 w-4 text-emerald-600" />
                        المعرف (slug)
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          مطلوب
                        </Badge>
                      </label>
                      <Input 
                        name="slug" 
                        value={form.slug} 
                        onChange={onChange} 
                        required 
                        className={`border-2 ${form.slug.includes(" ") ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-emerald-500"} rounded-xl h-11 transition-colors duration-300`}
                        placeholder="مثال: ruling-2024-01"
                      />
                      {form.slug.includes(" ") && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          لا يجب أن يحتوي على مسافات
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Trophy className="h-4 w-4 text-emerald-600" />
                        الرياضة
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          مطلوب
                        </Badge>
                      </label>
                      <Input 
                        name="sport" 
                        value={form.sport} 
                        onChange={onChange} 
                        placeholder="football" 
                        required 
                        className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl h-11 transition-colors duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        السنة
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          مطلوب
                        </Badge>
                      </label>
                      <Input 
                        name="year" 
                        value={form.year} 
                        onChange={onChange} 
                        type="number" 
                        min={1900} 
                        max={2100} 
                        required 
                        className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl h-11 transition-colors duration-300"
                        placeholder="2024"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Hash className="h-4 w-4 text-emerald-600" />
                        رقم القضية
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          مطلوب
                        </Badge>
                      </label>
                      <Input 
                        name="caseNumber" 
                        value={form.caseNumber} 
                        onChange={onChange} 
                        required 
                        className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl h-11 transition-colors duration-300"
                        placeholder="مثال: 2024/123"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        تاريخ الفصل
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          مطلوب
                        </Badge>
                      </label>
                      <Input 
                        name="decidedAt" 
                        value={form.decidedAt} 
                        onChange={onChange} 
                        type="date" 
                        required 
                        className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl h-11 transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full" />
                    معلومات إضافية
                  </h3>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FileText className="h-4 w-4 text-emerald-600" />
                      ملخص الحكم
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        اختياري
                      </Badge>
                    </label>
                    <Textarea 
                      name="summary" 
                      value={form.summary} 
                      onChange={onChange} 
                      rows={6} 
                      className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl transition-colors duration-300 resize-none"
                      placeholder="أدخل ملخصاً موجزاً عن الحكم التحكيمي..."
                    />
                    <p className="text-xs text-slate-500">
                      {form.summary.length} حرف
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Upload className="h-4 w-4 text-emerald-600" />
                      رابط ملف PDF
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        اختياري
                      </Badge>
                    </label>
                    <Input 
                      name="pdfUrl" 
                      value={form.pdfUrl} 
                      onChange={onChange} 
                      type="url" 
                      className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl h-11 transition-colors duration-300"
                      placeholder="https://example.com/ruling.pdf"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl h-12 px-8 font-semibold"
                      onClick={() => {
                        setForm({ title: "", slug: "", sport: "", year: "", caseNumber: "", decidedAt: "", summary: "", pdfUrl: "" })
                        addNotification("info", "تم إعادة تعيين النموذج")
                      }}
                    >
                      إعادة تعيين
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 rounded-xl h-12 px-8 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          جارٍ الحفظ...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          حفظ الحكم
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Helper Info */}
          <div className="mt-8 p-6 bg-blue-50/50 border-2 border-blue-200/50 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 space-y-2">
                <p className="font-semibold">ملاحظات هامة:</p>
                <ul className="space-y-1 mr-4">
                  <li>• تأكد من صحة جميع البيانات قبل الحفظ</li>
                  <li>• المعرف (slug) يجب أن يكون فريداً ولا يحتوي على مسافات</li>
                  <li>• ملف PDF يجب أن يكون متاحاً عبر رابط مباشر</li>
                  <li>• سيتم إرسال إشعار عند نجاح أو فشل العملية</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}