"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { User, Scale, Building, Clock, FileText } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

export function PersonalInfoStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-corporate-green">
          <User className="h-5 w-5" />
          المعلومات الشخصية
        </CardTitle>
        <CardDescription>بيانات مقدم طلب التحكيم</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <FormField
          control={form.control}
          name="fullName"
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
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهوية/الإقامة</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input placeholder="المدينة، المنطقة" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.watch("applicantType") === "organization" && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-corporate-green">بيانات المؤسسة</h4>
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المؤسسة/النادي</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم المؤسسة" {...field} />
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
                    <Input placeholder="رقم السجل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <Input placeholder="المدير العام، الرئيس، إلخ" {...field} />
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
  )
}

export function DisputeInfoStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-corporate-green">
          <Scale className="h-5 w-5" />
          تفاصيل النزاع
        </CardTitle>
        <CardDescription>معلومات مفصلة عن النزاع الرياضي</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
                    <SelectItem value="transfer">نزاع انتقالات</SelectItem>
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
                <Input placeholder="عنوان مختصر للنزاع" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disputeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف تفصيلي للنزاع</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="اشرح النزاع بالتفصيل، الأحداث، التواريخ المهمة، والمطالب..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>يرجى تقديم وصف شامل ومفصل للنزاع مع ذكر جميع الوقائع والتواريخ المهمة</FormDescription>
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
                <FormLabel>القيمة المالية للنزاع (ريال سعودي)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
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
  )
}

export function OtherPartyStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-corporate-green">
          <Building className="h-5 w-5" />
          معلومات الطرف الآخر
        </CardTitle>
        <CardDescription>بيانات الطرف المتنازع معه في القضية</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الطرف" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="individual">فرد</SelectItem>
                  <SelectItem value="club">نادي رياضي</SelectItem>
                  <SelectItem value="federation">اتحاد رياضي</SelectItem>
                  <SelectItem value="company">شركة</SelectItem>
                  <SelectItem value="agent">وكيل رياضي</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otherPartyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>معلومات التواصل</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="رقم الهاتف، البريد الإلكتروني، أو أي معلومات تواصل متاحة..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormDescription>أي معلومات تواصل متاحة للطرف الآخر</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otherPartyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان</FormLabel>
              <FormControl>
                <Textarea placeholder="العنوان الكامل للطرف الآخر..." className="min-h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

export function ArbitrationPreferencesStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-corporate-green">
          <Clock className="h-5 w-5" />
          تفضيلات التحكيم
        </CardTitle>
        <CardDescription>اختيارات وتفضيلات عملية التحكيم</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
                  <SelectItem value="panel">لجنة تحكيم</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("arbitratorPreference") === "specific" && (
          <FormField
            control={form.control}
            name="preferredArbitrator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المحكم المفضل</FormLabel>
                <FormControl>
                  <Input placeholder="اسم المحكم" {...field} />
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
                <FormDescription>هل تحتاج هذه القضية لمعالجة عاجلة؟</FormDescription>
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
                <FormLabel>لديك تمثيل قانوني</FormLabel>
                <FormDescription>هل لديك محامي أو مستشار قانوني؟</FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("hasLegalRepresentation") && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-corporate-green">بيانات المحامي/المستشار</h4>
            <FormField
              control={form.control}
              name="lawyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المحامي</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم المحامي الكامل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="lawyerContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>معلومات التواصل</FormLabel>
                    <FormControl>
                      <Input placeholder="هاتف أو بريد إلكتروني" {...field} />
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
  )
}

export function DocumentsReviewStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-corporate-green">
          <FileText className="h-5 w-5" />
          الوثائق والمراجعة النهائية
        </CardTitle>
        <CardDescription>إرفاق الوثائق والموافقة على الشروط</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="documentsDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف الوثائق المرفقة</FormLabel>
              <FormControl>
                <Textarea placeholder="اذكر الوثائق التي ترفقها مع الطلب..." className="min-h-24" {...field} />
              </FormControl>
              <FormDescription>قائمة بالوثائق والمستندات المرفقة مع طلب التحكيم</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h4 className="font-medium text-corporate-green">الموافقات المطلوبة</h4>

          <FormField
            control={form.control}
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
                    <a href="/terms-of-use" className="text-corporate-green underline" target="_blank" rel="noreferrer">
                      شروط وأحكام التحكيم
                    </a>
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreesToFees"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>الموافقة على الرسوم</FormLabel>
                  <FormDescription>أوافق على دفع رسوم التحكيم وفقاً لجدول الرسوم المعتمد</FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmAccuracy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>تأكيد صحة البيانات</FormLabel>
                  <FormDescription>أؤكد أن جميع المعلومات المقدمة صحيحة ودقيقة</FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
