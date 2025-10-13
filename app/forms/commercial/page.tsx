"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileText, CheckCircle, User, Building, Scale, Clock, ArrowRight, ArrowLeft, Save, X } from "lucide-react"
import { toast } from "sonner"

const commercialSchema = z.object({
  applicantType: z.enum(["individual", "organization"], { required_error: "يرجى تحديد نوع مقدم الطلب" }),
  fullName: z.string().min(2).max(100),
  nationalId: z.string().min(10).max(15),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(10),
  organizationName: z.string().optional(),
  organizationRegistration: z.string().optional(),
  representativeName: z.string().optional(),
  representativePosition: z.string().optional(),

  disputeType: z.enum(["contract", "financial", "investment", "supply", "other"], { required_error: "يرجى تحديد نوع النزاع" }),
  disputeCategory: z.enum(["construction", "trade", "services", "technology", "logistics", "other"], { required_error: "يرجى تحديد المجال" }),
  disputeTitle: z.string().min(5),
  disputeDescription: z.string().min(50),
  disputeValue: z.string().optional(),
  disputeDate: z.string().min(1),

  otherPartyName: z.string().min(2),
  otherPartyType: z.enum(["individual", "organization"], { required_error: "يرجى تحديد نوع الطرف الآخر" }),
  otherPartyContact: z.string().optional(),
  otherPartyAddress: z.string().min(10),

  arbitratorPreference: z.enum(["any", "specific", "exclude"], { required_error: "يرجى تحديد تفضيل المحكم" }),
  preferredArbitrator: z.string().optional(),
  excludedArbitrator: z.string().optional(),
  arbitrationLanguage: z.enum(["arabic", "english", "both"], { required_error: "يرجى تحديد لغة التحكيم" }),
  urgentCase: z.boolean().default(false),

  hasLegalRepresentation: z.boolean().default(false),
  lawyerName: z.string().optional(),
  lawyerLicense: z.string().optional(),
  lawyerContact: z.string().optional(),

  documentsDescription: z.string().min(20),

  agreesToTerms: z.boolean().refine((v) => v === true, { message: "يجب الموافقة على الشروط والأحكام" }),
  agreesToFees: z.boolean().refine((v) => v === true, { message: "يجب الموافقة على جدول الرسوم" }),
  confirmAccuracy: z.boolean().refine((v) => v === true, { message: "يجب تأكيد صحة المعلومات" }),
})

type CommercialFormData = z.infer<typeof commercialSchema>

export default function CommercialFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const form = useForm<CommercialFormData>({
    resolver: zodResolver(commercialSchema),
    defaultValues: {
      applicantType: "individual",
      urgentCase: false,
      hasLegalRepresentation: false,
      agreesToTerms: false,
      agreesToFees: false,
      confirmAccuracy: false,
      arbitrationLanguage: "arabic",
      arbitratorPreference: "any",
    },
  })

  const { watch, trigger } = form
  const watchedValues = watch()

  const steps = [
    { id: 1, title: "المعلومات الشخصية", description: "بيانات مقدم الطلب", icon: <User className="h-5 w-5" />,
      fields: ["applicantType","fullName","nationalId","email","phone","address","organizationName","organizationRegistration","representativeName","representativePosition"] },
    { id: 2, title: "تفاصيل النزاع", description: "معلومات النزاع التجاري", icon: <Scale className="h-5 w-5" />,
      fields: ["disputeType","disputeCategory","disputeTitle","disputeDescription","disputeValue","disputeDate"] },
    { id: 3, title: "الطرف الآخر", description: "معلومات الطرف المتنازع معه", icon: <Building className="h-5 w-5" />,
      fields: ["otherPartyName","otherPartyType","otherPartyContact","otherPartyAddress"] },
    { id: 4, title: "تفضيلات التحكيم", description: "اختيارات عملية التحكيم", icon: <Clock className="h-5 w-5" />,
      fields: ["arbitratorPreference","preferredArbitrator","excludedArbitrator","arbitrationLanguage","urgentCase","hasLegalRepresentation","lawyerName","lawyerLicense","lawyerContact"] },
    { id: 5, title: "الوثائق والمراجعة", description: "إرفاق الوثائق والمراجعة النهائية", icon: <FileText className="h-5 w-5" />,
      fields: ["documentsDescription","agreesToTerms","agreesToFees","confirmAccuracy"] },
  ]

  const currentStepData = steps.find((s) => s.id === currentStep)
  const progress = (currentStep / steps.length) * 100

  const validateCurrentStep = async () => {
    const currentFields = currentStepData?.fields || []
    const isValid = await trigger(currentFields as any)
    return isValid
  }

  const nextStep = async () => {
    const valid = await validateCurrentStep()
    if (valid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("commercial-form-progress", JSON.stringify({ step: currentStep + 1, data: form.getValues() }))
        } catch {}
      }
    }
  }

  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1) }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
    toast.success(`تم رفع ${files.length} ملف`)
  }

  const removeFile = (i: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))
    toast.info("تم حذف الملف")
  }

  const onSubmit = async (data: CommercialFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/forms/commercial", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      await res.json().catch(() => ({}))
      if (typeof window !== "undefined") {
        try { localStorage.removeItem("commercial-form-progress") } catch {}
      }
      toast.success("تم تقديم طلب التحكيم التجاري بنجاح!")
      form.reset()
      setCurrentStep(1)
      setUploadedFiles([])
    } catch {
      toast.error("حدث خطأ في تقديم الطلب. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const saved = localStorage.getItem("commercial-form-progress")
      if (saved) {
        const { step, data } = JSON.parse(saved)
        setCurrentStep(step)
        form.reset(data)
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader title="نموذج طلب التحكيم التجاري" description="املأ النموذج بدقة لتقديم طلب التحكيم في النزاع التجاري" />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal direction="fade" delay={200}>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-corporate-green">الخطوة {currentStep} من {steps.length}: {currentStepData?.title}</h3>
                  <Badge variant="outline" className="text-corporate-green border-corporate-green">{Math.round(progress)}% مكتمل</Badge>
                </div>
                <Progress value={progress} className="mb-4" />
                <p className="text-sm text-muted-foreground">{currentStepData?.description}</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 space-x-reverse">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${step.id === currentStep ? "bg-corporate-green text-white border-corporate-green" : step.id < currentStep ? "bg-green-100 text-corporate-green border-corporate-green" : "bg-gray-100 text-gray-400 border-gray-300"}`}>
                      {step.id < currentStep ? <CheckCircle className="h-5 w-5" /> : step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-2 transition-all duration-300 ${step.id < currentStep ? "bg-corporate-green" : "bg-gray-300"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green"><User className="h-5 w-5" /> المعلومات الشخصية</CardTitle>
                      <CardDescription>يرجى إدخال بياناتك الشخصية بدقة</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField control={form.control} name="applicantType" render={({ field }) => (
                        <FormItem>
                          <FormLabel>نوع مقدم الطلب</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <div className="flex items-center space-x-2 space-x-reverse"><RadioGroupItem value="individual" id="individual" /><Label htmlFor="individual">فرد</Label></div>
                              <div className="flex items-center space-x-2 space-x-reverse"><RadioGroupItem value="organization" id="organization" /><Label htmlFor="organization">مؤسسة</Label></div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>الاسم الكامل</FormLabel><FormControl><Input placeholder="أدخل الاسم الكامل" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="nationalId" render={({ field }) => (<FormItem><FormLabel>رقم الهوية/السجل</FormLabel><FormControl><Input placeholder="أدخل الرقم" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>البريد الإلكتروني</FormLabel><FormControl><Input type="email" placeholder="example@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>رقم الهاتف</FormLabel><FormControl><Input placeholder="05xxxxxxxx" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>

                      <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>العنوان الكامل</FormLabel><FormControl><Textarea placeholder="أدخل العنوان الكامل مع المدينة والرمز" className="min-h-20" {...field} /></FormControl><FormMessage /></FormItem>)} />

                      {watchedValues.applicantType === "organization" && (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900">معلومات المؤسسة</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="organizationName" render={({ field }) => (<FormItem><FormLabel>اسم المؤسسة</FormLabel><FormControl><Input placeholder="أدخل اسم المؤسسة" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="organizationRegistration" render={({ field }) => (<FormItem><FormLabel>رقم السجل التجاري</FormLabel><FormControl><Input placeholder="رقم السجل" {...field} /></FormControl><FormMessage /></FormItem>)} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="representativeName" render={({ field }) => (<FormItem><FormLabel>اسم المفوض</FormLabel><FormControl><Input placeholder="اسم المفوض" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="representativePosition" render={({ field }) => (<FormItem><FormLabel>منصب المفوض</FormLabel><FormControl><Input placeholder="المنصب" {...field} /></FormControl><FormMessage /></FormItem>)} />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {currentStep === 2 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green"><Scale className="h-5 w-5" /> تفاصيل النزاع</CardTitle>
                      <CardDescription>قدم معلومات مفصلة عن النزاع التجاري</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="disputeType" render={({ field }) => (
                          <FormItem>
                            <FormLabel>نوع النزاع</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="اختر نوع النزاع" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="contract">تعاقدي</SelectItem>
                                <SelectItem value="financial">مالي</SelectItem>
                                <SelectItem value="investment">استثماري</SelectItem>
                                <SelectItem value="supply">توريد</SelectItem>
                                <SelectItem value="other">أخرى</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="disputeCategory" render={({ field }) => (
                          <FormItem>
                            <FormLabel>المجال</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="اختر المجال" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="construction">مقاولات</SelectItem>
                                <SelectItem value="trade">تجارة</SelectItem>
                                <SelectItem value="services">خدمات</SelectItem>
                                <SelectItem value="technology">تقنية</SelectItem>
                                <SelectItem value="logistics">لوجستيات</SelectItem>
                                <SelectItem value="other">أخرى</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="disputeTitle" render={({ field }) => (<FormItem><FormLabel>عنوان النزاع</FormLabel><FormControl><Input placeholder="عنوان مختصر ووصفي" {...field} /></FormControl><FormDescription>اكتب عنواناً واضحاً يلخص طبيعة النزاع</FormDescription><FormMessage /></FormItem>)} />

                      <FormField control={form.control} name="disputeDescription" render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف مفصل للنزاع</FormLabel>
                          <FormControl><Textarea placeholder="اشرح تفاصيل النزاع والأحداث والمطالب..." className="min-h-32" {...field} /></FormControl>
                          <FormDescription>قدّم وصفاً شاملاً يتضمن الأحداث والمطالب والأضرار</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="disputeValue" render={({ field }) => (<FormItem><FormLabel>القيمة المالية (اختياري)</FormLabel><FormControl><Input placeholder="مثال: 100,000 دج" {...field} /></FormControl><FormDescription>إذا كان النزاع يتضمن مطالبة مالية</FormDescription><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="disputeDate" render={({ field }) => (<FormItem><FormLabel>تاريخ حدوث النزاع</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {currentStep === 3 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green"><Building className="h-5 w-5" /> معلومات الطرف الآخر</CardTitle>
                      <CardDescription>معلومات الطرف المتنازع معه</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="otherPartyName" render={({ field }) => (<FormItem><FormLabel>اسم الطرف الآخر</FormLabel><FormControl><Input placeholder="اسم الشخص أو المؤسسة" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="otherPartyType" render={({ field }) => (
                          <FormItem>
                            <FormLabel>نوع الطرف الآخر</FormLabel>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-6 space-x-reverse">
                                <div className="flex items-center space-x-2 space-x-reverse"><RadioGroupItem value="individual" id="other-individual" /><Label htmlFor="other-individual">فرد</Label></div>
                                <div className="flex items-center space-x-2 space-x-reverse"><RadioGroupItem value="organization" id="other-organization" /><Label htmlFor="other-organization">مؤسسة</Label></div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="otherPartyContact" render={({ field }) => (<FormItem><FormLabel>معلومات الاتصال (اختياري)</FormLabel><FormControl><Input placeholder="رقم الهاتف أو البريد الإلكتروني" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="otherPartyAddress" render={({ field }) => (<FormItem><FormLabel>عنوان الطرف الآخر</FormLabel><FormControl><Textarea placeholder="العنوان الكامل" className="min-h-20" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {currentStep === 4 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green"><Clock className="h-5 w-5" /> تفضيلات التحكيم</CardTitle>
                      <CardDescription>اختر ما يناسب قضيتك</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="arbitratorPreference" render={({ field }) => (
                          <FormItem>
                            <FormLabel>تفضيل المحكم</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="اختر التفضيل" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="any">لا يهم</SelectItem>
                                <SelectItem value="specific">محكم محدد</SelectItem>
                                <SelectItem value="exclude">استبعاد محكم</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="arbitrationLanguage" render={({ field }) => (
                          <FormItem>
                            <FormLabel>لغة التحكيم</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="اختر اللغة" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="arabic">العربية</SelectItem>
                                <SelectItem value="english">الإنجليزية</SelectItem>
                                <SelectItem value="both">كلاهما</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="preferredArbitrator" render={({ field }) => (<FormItem><FormLabel>محكم مفضل (اختياري)</FormLabel><FormControl><Input placeholder="الاسم" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="excludedArbitrator" render={({ field }) => (<FormItem><FormLabel>محكم مستبعد (اختياري)</FormLabel><FormControl><Input placeholder="الاسم" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="urgentCase" render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none"><FormLabel>قضية مستعجلة</FormLabel><FormDescription>تطبيق إجراءات مُعجّلة إذا انطبقت الشروط</FormDescription></div>
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="hasLegalRepresentation" render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none"><FormLabel>يمتلك تمثيلاً قانونياً</FormLabel><FormDescription>إضافة بيانات الممثل القانوني</FormDescription></div>
                          </FormItem>
                        )} />
                      </div>

                      {watchedValues.hasLegalRepresentation && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField control={form.control} name="lawyerName" render={({ field }) => (<FormItem><FormLabel>اسم المحامي</FormLabel><FormControl><Input placeholder="الاسم" {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name="lawyerLicense" render={({ field }) => (<FormItem><FormLabel>رقم الرخصة</FormLabel><FormControl><Input placeholder="الرقم" {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name="lawyerContact" render={({ field }) => (<FormItem><FormLabel>بيانات التواصل</FormLabel><FormControl><Input placeholder="الهاتف أو البريد" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {currentStep === 5 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green"><FileText className="h-5 w-5" /> الوثائق والمراجعة</CardTitle>
                      <CardDescription>إرفاق وصف الوثائق والموافقة على الشروط</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField control={form.control} name="documentsDescription" render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف الوثائق</FormLabel>
                          <FormControl><Textarea placeholder="اذكر الوثائق وأرقامها وأهميتها..." className="min-h-32" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-input" />
                          <Button type="button" variant="outline" onClick={() => document.getElementById("file-input")?.click()}>رفع ملفات</Button>
                          {uploadedFiles.length > 0 && <span className="text-sm text-muted-foreground">تم رفع {uploadedFiles.length} ملف</span>}
                        </div>
                        {uploadedFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {uploadedFiles.map((f, i) => (
                              <div key={i} className="px-3 py-1 rounded-full bg-light-grey text-sm flex items-center gap-2">
                                <span className="truncate max-w-[200px]" title={f.name}>{f.name}</span>
                                <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => removeFile(i)}><X className="h-3.5 w-3.5" /></Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <FormField control={form.control} name="agreesToTerms" render={({ field }) => (
                          <FormItem className="flex items-start gap-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1"><FormLabel>الموافقة على الشروط والأحكام</FormLabel><FormDescription>أؤكد قراءتي واطلاعي على الشروط</FormDescription></div></FormItem>
                        )} />
                        <FormField control={form.control} name="agreesToFees" render={({ field }) => (
                          <FormItem className="flex items-start gap-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1"><FormLabel>الموافقة على جدول الرسوم</FormLabel><FormDescription>أوافق على الرسوم المطبقة</FormDescription></div></FormItem>
                        )} />
                        <FormField control={form.control} name="confirmAccuracy" render={({ field }) => (
                          <FormItem className="flex items-start gap-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1"><FormLabel>تأكيد صحة البيانات</FormLabel><FormDescription>أقر بصحة المعلومات المقدمة</FormDescription></div></FormItem>
                        )} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}><ArrowRight className="ml-2 h-4 w-4" /> السابق</Button>
                          <Button type="button" onClick={nextStep} disabled={currentStep === steps.length}>التالي <ArrowLeft className="mr-2 h-4 w-4" /></Button>
                        </div>
                        <Button type="submit" className="bg-corporate-green hover:bg-corporate-green/90" disabled={isSubmitting}>إرسال الطلب</Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {currentStep < steps.length && (
                <div className="flex items-center justify-between">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}><ArrowRight className="ml-2 h-4 w-4" /> السابق</Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => { if (typeof window !== "undefined") { try { localStorage.setItem("commercial-form-progress", JSON.stringify({ step: currentStep, data: form.getValues() })) ; toast.success("تم حفظ التقدم") } catch { toast.error("تعذر الحفظ") } } }}>
                      <Save className="ml-2 h-4 w-4" /> حفظ
                    </Button>
                    <Button type="button" onClick={nextStep}>التالي <ArrowLeft className="mr-2 h-4 w-4" /></Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
