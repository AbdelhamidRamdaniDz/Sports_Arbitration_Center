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
import {
  FileText,
  Upload,
  CheckCircle,
  User,
  Building,
  Scale,
  Clock,
  ArrowRight,
  ArrowLeft,
  Save,
  X,
} from "lucide-react"
import { toast } from "sonner"

// Validation schema
const arbitrationSchema = z.object({
  // Personal Information
  applicantType: z.enum(["individual", "organization"], {
    required_error: "يرجى تحديد نوع مقدم الطلب",
  }),
  fullName: z.string().min(2, "الاسم يجب أن يكون أكثر من حرفين").max(100, "الاسم طويل جداً"),
  nationalId: z.string().min(10, "رقم الهوية يجب أن يكون 10 أرقام على الأقل").max(15, "رقم الهوية طويل جداً"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  address: z.string().min(10, "العنوان مطلوب ويجب أن يكون مفصلاً"),

  // Organization details (conditional)
  organizationName: z.string().optional(),
  organizationRegistration: z.string().optional(),
  representativeName: z.string().optional(),
  representativePosition: z.string().optional(),

  // Dispute Information
  disputeType: z.enum(["contract", "disciplinary", "financial", "administrative", "other"], {
    required_error: "يرجى تحديد نوع النزاع",
  }),
  disputeCategory: z.enum(["football", "basketball", "volleyball", "tennis", "swimming", "athletics", "other"], {
    required_error: "يرجى تحديد الرياضة المعنية",
  }),
  disputeTitle: z.string().min(5, "عنوان النزاع مطلوب ويجب أن يكون وصفياً"),
  disputeDescription: z.string().min(50, "وصف النزاع يجب أن يكون مفصلاً (50 حرف على الأقل)"),
  disputeValue: z.string().optional(),
  disputeDate: z.string().min(1, "تاريخ حدوث النزاع مطلوب"),

  // Other Party Information
  otherPartyName: z.string().min(2, "اسم الطرف الآخر مطلوب"),
  otherPartyType: z.enum(["individual", "organization"], {
    required_error: "يرجى تحديد نوع الطرف الآخر",
  }),
  otherPartyContact: z.string().optional(),
  otherPartyAddress: z.string().min(10, "عنوان الطرف الآخر مطلوب"),

  // Arbitration Preferences
  arbitratorPreference: z.enum(["any", "specific", "exclude"], {
    required_error: "يرجى تحديد تفضيل المحكم",
  }),
  preferredArbitrator: z.string().optional(),
  excludedArbitrator: z.string().optional(),
  arbitrationLanguage: z.enum(["arabic", "english", "both"], {
    required_error: "يرجى تحديد لغة التحكيم",
  }),
  urgentCase: z.boolean().default(false),

  // Legal Representation
  hasLegalRepresentation: z.boolean().default(false),
  lawyerName: z.string().optional(),
  lawyerLicense: z.string().optional(),
  lawyerContact: z.string().optional(),

  // Documents and Evidence
  documentsDescription: z.string().min(20, "وصف الوثائق المرفقة مطلوب"),

  // Agreements
  agreesToTerms: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
  agreesToFees: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على جدول الرسوم",
  }),
  confirmAccuracy: z.boolean().refine((val) => val === true, {
    message: "يجب تأكيد صحة المعلومات المقدمة",
  }),
})

type ArbitrationFormData = z.infer<typeof arbitrationSchema>

export default function ArbitrationFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const form = useForm<ArbitrationFormData>({
    resolver: zodResolver(arbitrationSchema),
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
    {
      id: 1,
      title: "المعلومات الشخصية",
      description: "بيانات مقدم الطلب",
      icon: <User className="h-5 w-5" />,
      fields: [
        "applicantType",
        "fullName",
        "nationalId",
        "email",
        "phone",
        "address",
        "organizationName",
        "organizationRegistration",
        "representativeName",
        "representativePosition",
      ],
    },
    {
      id: 2,
      title: "تفاصيل النزاع",
      description: "معلومات النزاع الرياضي",
      icon: <Scale className="h-5 w-5" />,
      fields: ["disputeType", "disputeCategory", "disputeTitle", "disputeDescription", "disputeValue", "disputeDate"],
    },
    {
      id: 3,
      title: "الطرف الآخر",
      description: "معلومات الطرف المتنازع معه في القضية",
      icon: <Building className="h-5 w-5" />,
      fields: ["otherPartyName", "otherPartyType", "otherPartyContact", "otherPartyAddress"],
    },
    {
      id: 4,
      title: "تفضيلات التحكيم",
      description: "اختيارات عملية التحكيم",
      icon: <Clock className="h-5 w-5" />,
      fields: [
        "arbitratorPreference",
        "preferredArbitrator",
        "excludedArbitrator",
        "arbitrationLanguage",
        "urgentCase",
        "hasLegalRepresentation",
        "lawyerName",
        "lawyerLicense",
        "lawyerContact",
      ],
    },
    {
      id: 5,
      title: "الوثائق والمراجعة",
      description: "إرفاق الوثائق والمراجعة النهائية",
      icon: <FileText className="h-5 w-5" />,
      fields: ["documentsDescription", "agreesToTerms", "agreesToFees", "confirmAccuracy"],
    },
  ]

  const currentStepData = steps.find((step) => step.id === currentStep)
  const progress = (currentStep / steps.length) * 100

  const validateCurrentStep = async () => {
    const currentFields = currentStepData?.fields || []
    const isValid = await trigger(currentFields as any)
    return isValid
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      // Auto-save progress
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "arbitration-form-progress",
            JSON.stringify({
              step: currentStep + 1,
              data: form.getValues(),
            }),
          )
        } catch (error) {
          // ignore storage errors
        }
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
    toast.success(`تم رفع ${files.length} ملف بنجاح`)
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    toast.info("تم حذف الملف")
  }

  const onSubmit = async (data: ArbitrationFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/forms/arbitration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any))
        throw new Error(err?.error || "request_failed")
      }
      const json = await res.json().catch(() => ({} as any))

      // Clear saved progress
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("arbitration-form-progress")
        } catch (error) {
          // ignore
        }
      }

      toast.success("تم تقديم طلب التحكيم بنجاح! سيتم التواصل معك قريباً.")

      // Reset form
      form.reset()
      setCurrentStep(1)
      setUploadedFiles([])
    } catch (error) {
      toast.error("حدث خطأ في تقديم الطلب. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Load saved progress on mount (browser only)
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const saved = localStorage.getItem("arbitration-form-progress")
      if (saved) {
        const { step, data } = JSON.parse(saved)
        setCurrentStep(step)
        form.reset(data)
      }
    } catch (error) {
      // ignore parsing/storage errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="نموذج طلب التحكيم الرياضي"
        description="املأ النموذج بدقة لتقديم طلب التحكيم في النزاع الرياضي"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Bar */}
          <ScrollReveal direction="fade" delay={200}>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-corporate-green">
                    الخطوة {currentStep} من {steps.length}: {currentStepData?.title}
                  </h3>
                  <Badge variant="outline" className="text-corporate-green border-corporate-green">
                    {Math.round(progress)}% مكتمل
                  </Badge>
                </div>
                <Progress value={progress} className="mb-4" />
                <p className="text-sm text-muted-foreground">{currentStepData?.description}</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Steps Navigation */}
          <ScrollReveal direction="up" delay={300}>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 space-x-reverse">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        step.id === currentStep
                          ? "bg-corporate-green text-white border-corporate-green"
                          : step.id < currentStep
                            ? "bg-green-100 text-corporate-green border-corporate-green"
                            : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}
                    >
                      {step.id < currentStep ? <CheckCircle className="h-5 w-5" /> : step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                          step.id < currentStep ? "bg-corporate-green" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green">
                        <User className="h-5 w-5" />
                        المعلومات الشخصية
                      </CardTitle>
                      <CardDescription>يرجى إدخال بياناتك الشخصية بدقة</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="applicantType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>نوع مقدم الطلب</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2 space-x-reverse">
                                  <RadioGroupItem value="individual" id="individual" />
                                  <Label htmlFor="individual">فرد</Label>
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                  <RadioGroupItem value="organization" id="organization" />
                                  <Label htmlFor="organization">مؤسسة/نادي</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الاسم الكامل</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل الاسم الكامل" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="nationalId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>رقم الهوية/الإقامة</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل رقم الهوية" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>البريد الإلكتروني</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="example@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>رقم الهاتف</FormLabel>
                              <FormControl>
                                <Input placeholder="05xxxxxxxx" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>العنوان الكامل</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="أدخل العنوان الكامل مع المدينة والرمز البريدي"
                                className="min-h-20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Organization fields - conditional */}
                      {watchedValues.applicantType === "organization" && (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900">معلومات المؤسسة</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="organizationName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>اسم المؤسسة/النادي</FormLabel>
                                  <FormControl>
                                    <Input placeholder="أدخل اسم المؤسسة" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="organizationRegistration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>رقم السجل التجاري</FormLabel>
                                  <FormControl>
                                    <Input placeholder="أدخل رقم السجل" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="representativeName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>اسم المفوض</FormLabel>
                                  <FormControl>
                                    <Input placeholder="اسم المفوض بالتوقيع" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="representativePosition"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>منصب المفوض</FormLabel>
                                  <FormControl>
                                    <Input placeholder="المنصب في المؤسسة" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {/* Step 2: Dispute Information */}
              {currentStep === 2 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green">
                        <Scale className="h-5 w-5" />
                        تفاصيل النزاع
                      </CardTitle>
                      <CardDescription>قدم معلومات مفصلة عن النزاع الرياضي</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="disputeType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نوع النزاع</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر نوع النزاع" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="contract">نزاع تعاقدي</SelectItem>
                                  <SelectItem value="disciplinary">نزاع تأديبي</SelectItem>
                                  <SelectItem value="financial">نزاع مالي</SelectItem>
                                  <SelectItem value="administrative">نزاع إداري</SelectItem>
                                  <SelectItem value="other">أخرى</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="disputeCategory"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الرياضة المعنية</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر الرياضة" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="football">كرة القدم</SelectItem>
                                  <SelectItem value="basketball">كرة السلة</SelectItem>
                                  <SelectItem value="volleyball">كرة الطائرة</SelectItem>
                                  <SelectItem value="tennis">التنس</SelectItem>
                                  <SelectItem value="swimming">السباحة</SelectItem>
                                  <SelectItem value="athletics">ألعاب القوى</SelectItem>
                                  <SelectItem value="other">أخرى</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="disputeTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>عنوان النزاع</FormLabel>
                            <FormControl>
                              <Input placeholder="عنوان مختصر ووصفي للنزاع" {...field} />
                            </FormControl>
                            <FormDescription>اكتب عنواناً واضحاً يلخص طبيعة النزاع</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="disputeDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>وصف مفصل للنزاع</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="اشرح تفاصيل النزاع، الأحداث، والمطالب بشكل مفصل..."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>قدم وصفاً شاملاً يتضمن الأحداث والمطالب والأضرار</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="disputeValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>القيمة المالية للنزاع (اختياري)</FormLabel>
                              <FormControl>
                                <Input placeholder="مثال: 100,000 ريال" {...field} />
                              </FormControl>
                              <FormDescription>إذا كان النزاع يتضمن مطالبة مالية</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="disputeDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>تاريخ حدوث النزاع</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {/* Step 3: Other Party Information */}
              {currentStep === 3 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green">
                        <Building className="h-5 w-5" />
                        معلومات الطرف الآخر
                      </CardTitle>
                      <CardDescription>معلومات الطرف المتنازع معه في القضية</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="otherPartyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>اسم الطرف الآخر</FormLabel>
                              <FormControl>
                                <Input placeholder="اسم الشخص أو المؤسسة" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="otherPartyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نوع الطرف الآخر</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row space-x-6 space-x-reverse"
                                >
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <RadioGroupItem value="individual" id="other-individual" />
                                    <Label htmlFor="other-individual">فرد</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <RadioGroupItem value="organization" id="other-organization" />
                                    <Label htmlFor="other-organization">مؤسسة</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="otherPartyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>معلومات الاتصال (اختياري)</FormLabel>
                            <FormControl>
                              <Input placeholder="رقم الهاتف أو البريد الإلكتروني" {...field} />
                            </FormControl>
                            <FormDescription>إذا كانت متوفرة لديك</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="otherPartyAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>عنوان الطرف الآخر</FormLabel>
                            <FormControl>
                              <Textarea placeholder="العنوان الكامل للطرف الآخر" className="min-h-20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {/* Step 4: Arbitration Preferences */}
              {currentStep === 4 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green">
                        <Clock className="h-5 w-5" />
                        تفضيلات التحكيم
                      </CardTitle>
                      <CardDescription>اختر تفضيلاتك لعملية التحكيم</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="arbitratorPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>تفضيل المحكم</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر تفضيلك" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="any">أي محكم مؤهل</SelectItem>
                                <SelectItem value="specific">محكم محدد</SelectItem>
                                <SelectItem value="exclude">استبعاد محكم معين</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {watchedValues.arbitratorPreference === "specific" && (
                        <FormField
                          control={form.control}
                          name="preferredArbitrator"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>المحكم المفضل</FormLabel>
                              <FormControl>
                                <Input placeholder="اسم المحكم المطلوب" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {watchedValues.arbitratorPreference === "exclude" && (
                        <FormField
                          control={form.control}
                          name="excludedArbitrator"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>المحكم المستبعد</FormLabel>
                              <FormControl>
                                <Input placeholder="اسم المحكم المراد استبعاده" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="arbitrationLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>لغة التحكيم</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر اللغة" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="arabic">العربية</SelectItem>
                                <SelectItem value="english">الإنجليزية</SelectItem>
                                <SelectItem value="both">العربية والإنجليزية</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="urgentCase"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>قضية عاجلة</FormLabel>
                              <FormDescription>هل تتطلب هذه القضية معالجة عاجلة؟</FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasLegalRepresentation"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>لدي تمثيل قانوني</FormLabel>
                              <FormDescription>هل لديك محامي يمثلك في هذه القضية؟</FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      {watchedValues.hasLegalRepresentation && (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900">معلومات المحامي</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="lawyerName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>اسم المحامي</FormLabel>
                                  <FormControl>
                                    <Input placeholder="الاسم الكامل للمحامي" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="lawyerLicense"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>رقم الترخيص</FormLabel>
                                  <FormControl>
                                    <Input placeholder="رقم ترخيص المحاماة" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="lawyerContact"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>معلومات الاتصال</FormLabel>
                                <FormControl>
                                  <Input placeholder="هاتف أو بريد إلكتروني للمحامي" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {/* Step 5: Documents and Review */}
              {currentStep === 5 && (
                <ScrollReveal direction="up" delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-corporate-green">
                        <FileText className="h-5 w-5" />
                        الوثائق والمراجعة النهائية
                      </CardTitle>
                      <CardDescription>الوثائق والمراجعة النهائية</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="documentsDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>وصف الوثائق المرفقة</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="اذكر الوثائق التي ترفقها مع الطلب..."
                                className="min-h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>اذكر جميع الوثائق والأدلة المرفقة</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* File Upload Section */}
                      <div className="space-y-4">
                        <Label>رفع الوثائق</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-corporate-green transition-colors">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("file-upload")?.click()}
                          >
                            اختيار الملفات
                          </Button>
                          <p className="text-xs text-gray-500 mt-2">
                            الصيغ المدعومة: PDF, DOC, DOCX, JPG, PNG (حد أقصى 10 ميجا لكل ملف)
                          </p>
                        </div>

                        {/* Uploaded Files List */}
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2">
                            <Label>الملفات المرفقة ({uploadedFiles.length})</Label>
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-corporate-green" />
                                  <span className="text-sm">{file.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {(file.size / 1024 / 1024).toFixed(1)} MB
                                  </Badge>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Agreements */}
                      <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-900">الموافقات المطلوبة</h4>

                        <FormField
                          control={form.control}
                          name="agreesToTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  أوافق على{" "}
                                  <a href="/terms" className="text-corporate-green underline">
                                    الشروط والأحكام
                                  </a>{" "}
                                  الخاصة بالتحكيم
                                </FormLabel>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="agreesToFees"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  أوافق على{" "}
                                  <a href="/fees" className="text-corporate-green underline">
                                    جدول الرسوم
                                  </a>{" "}
                                  المعتمد
                                </FormLabel>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="confirmAccuracy"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  أؤكد صحة جميع المعلومات المقدمة وأتحمل المسؤولية القانونية عنها
                                </FormLabel>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ArrowRight className="h-4 w-4" />
                  السابق
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        try {
                          localStorage.setItem(
                            "arbitration-form-progress",
                            JSON.stringify({
                              step: currentStep,
                              data: form.getValues(),
                            }),
                          )
                        } catch (error) {
                          // ignore
                        }
                      }
                      toast.success("تم حفظ التقدم")
                    }}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    حفظ التقدم
                  </Button>

                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-corporate-green hover:bg-corporate-green/90"
                    >
                      التالي
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-corporate-green hover:bg-corporate-green/90"
                    >
                      {isSubmitting ? "جاري التقديم..." : "تقديم الطلب"}
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
