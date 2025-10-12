"use client"

import { useState } from "react"
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Handshake, CheckCircle, User, Users, Calendar } from "lucide-react"
import { toast } from "sonner"

// Simplified validation schema for mediation
const mediationSchema = z.object({
  // Applicant Information
  applicantName: z.string().min(2, "الاسم مطلوب").max(100, "الاسم طويل جداً"),
  applicantEmail: z.string().email("البريد الإلكتروني غير صحيح"),
  applicantPhone: z.string().min(10, "رقم الهاتف مطلوب"),

  // Other Party Information
  otherPartyName: z.string().min(2, "اسم الطرف الآخر مطلوب"),
  otherPartyEmail: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  otherPartyPhone: z.string().min(10, "رقم الهاتف مطلوب").optional().or(z.literal("")),

  // Dispute Information
  disputeType: z.enum(["contract", "disciplinary", "financial", "administrative", "other"], {
    required_error: "يرجى تحديد نوع النزاع",
  }),
  disputeCategory: z.enum(["football", "basketball", "volleyball", "tennis", "swimming", "athletics", "other"], {
    required_error: "يرجى تحديد الرياضة المعنية",
  }),
  disputeDescription: z.string().min(20, "وصف النزاع مطلوب ومفصل"),

  // Mediation Preferences
  preferredDate: z.string().min(1, "التاريخ المفضل مطلوب"),
  preferredTime: z.enum(["morning", "afternoon", "evening"], {
    required_error: "يرجى تحديد الوقت المفضل",
  }),
  sessionType: z.enum(["in-person", "online", "hybrid"], {
    required_error: "يرجى تحديد نوع الجلسة",
  }),
  urgentCase: z.boolean().default(false),

  // Agreements
  allPartiesAgree: z.boolean().refine((val) => val === true, {
    message: "يجب موافقة جميع الأطراف على الوساطة",
  }),
  agreesToTerms: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
})

type MediationFormData = z.infer<typeof mediationSchema>

export default function MediationFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<MediationFormData>({
    resolver: zodResolver(mediationSchema) as Resolver<MediationFormData>,
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      otherPartyName: "",
      otherPartyEmail: "",
      otherPartyPhone: "",
      disputeType: "contract",
      disputeCategory: "football",
      disputeDescription: "",
      preferredDate: "",
      preferredTime: "morning",
      sessionType: "in-person",
      urgentCase: false,
      allPartiesAgree: false,
      agreesToTerms: false,
    },
  })

  const onSubmit: SubmitHandler<MediationFormData> = async (data) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/forms/mediation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any))
        throw new Error(err?.error || "request_failed")
      }

      toast.success("تم تقديم طلب الوساطة بنجاح! سيتم التواصل معك قريباً.")

      // Reset form
      form.reset()
    } catch (error) {
      toast.error("حدث خطأ في تقديم الطلب. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="نموذج طلب الوساطة الرياضية"
        description="نموذج مبسط لطلب خدمات الوساطة لحل النزاعات بطريقة ودية"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal direction="fade" delay={200}>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-corporate-green">
                  <Handshake className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">الوساطة الرياضية</h3>
                    <p className="text-sm text-muted-foreground">حل سريع وودي للنزاعات الرياضية</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <Form {...(form as any)}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
              {/* Applicant Information */}
              <ScrollReveal direction="up" delay={300}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-corporate-green">
                      <User className="h-5 w-5" />
                      معلوماتك الشخصية
                    </CardTitle>
                    <CardDescription>بياناتك كمقدم طلب الوساطة</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control as any}
                      name="applicantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسمك الكامل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control as any}
                        name="applicantEmail"
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
                        control={form.control as any}
                        name="applicantPhone"
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
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Other Party Information */}
              <ScrollReveal direction="up" delay={400}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-corporate-green">
                      <Users className="h-5 w-5" />
                      معلومات الطرف الآخر
                    </CardTitle>
                    <CardDescription>بيانات الطرف الآخر في النزاع</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control as any}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control as any}
                        name="otherPartyEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>البريد الإلكتروني (اختياري)</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control as any}
                        name="otherPartyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رقم الهاتف (اختياري)</FormLabel>
                            <FormControl>
                              <Input placeholder="05xxxxxxxx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Dispute Information */}
              <ScrollReveal direction="up" delay={500}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-corporate-green">
                      <Handshake className="h-5 w-5" />
                      تفاصيل النزاع
                    </CardTitle>
                    <CardDescription>معلومات موجزة عن النزاع المراد حله</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control as any}
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
                        control={form.control as any}
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
                      control={form.control as any}
                      name="disputeDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف موجز للنزاع</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="اشرح النزاع بإيجاز والحل المطلوب..."
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>وصف مختصر يساعد الوسيط على فهم طبيعة النزاع</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Mediation Preferences */}
              <ScrollReveal direction="up" delay={600}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-corporate-green">
                      <Calendar className="h-5 w-5" />
                      تفضيلات الوساطة
                    </CardTitle>
                    <CardDescription>اختر الوقت والطريقة المناسبة للوساطة</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control as any}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>التاريخ المفضل</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control as any}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الوقت المفضل</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الوقت" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="morning">صباحاً (9-12)</SelectItem>
                                <SelectItem value="afternoon">بعد الظهر (1-5)</SelectItem>
                                <SelectItem value="evening">مساءً (6-9)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control as any}
                      name="sessionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نوع الجلسة</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="in-person" id="in-person" />
                                <Label htmlFor="in-person">حضورية (في المركز)</Label>
                              </div>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="online" id="online" />
                                <Label htmlFor="online">عن بُعد (أونلاين)</Label>
                              </div>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="hybrid" id="hybrid" />
                                <Label htmlFor="hybrid">مختلطة (حسب الحاجة)</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as any}
                      name="urgentCase"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>قضية عاجلة</FormLabel>
                            <FormDescription>هل تحتاج هذه القضية لمعالجة عاجلة؟</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Agreements */}
              <ScrollReveal direction="up" delay={700}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-corporate-green">
                      <CheckCircle className="h-5 w-5" />
                      الموافقات المطلوبة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control as any}
                      name="allPartiesAgree"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>موافقة جميع الأطراف</FormLabel>
                            <FormDescription>أؤكد أن جميع أطراف النزاع موافقون على الوساطة</FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as any}
                      name="agreesToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>الموافقة على الشروط والأحكام</FormLabel>
                            <FormDescription>
                              أوافق على{" "}
                              <a href="/terms" className="text-corporate-green underline">
                                شروط وأحكام الوساطة
                              </a>
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Submit Button */}
              <ScrollReveal direction="up" delay={800}>
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="bg-corporate-green hover:bg-corporate-green/90 px-8"
                  >
                    {isSubmitting ? "جاري التقديم..." : "تقديم طلب الوساطة"}
                    <CheckCircle className="mr-2 h-5 w-5" />
                  </Button>
                </div>
              </ScrollReveal>
            </form>
          </Form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
