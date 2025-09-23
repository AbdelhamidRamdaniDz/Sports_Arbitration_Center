"use client"

import { type ReactNode, useState, useEffect } from "react"
import type { UseFormReturn, FieldValues, Path } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { ScrollReveal } from "@/components/scroll-reveal"

export interface FormStep<T extends FieldValues> {
  id: number
  title: string
  description: string
  icon: ReactNode
  fields: Path<T>[]
  component: ReactNode
}

interface MultiStepFormProps<T extends FieldValues> {
  steps: FormStep<T>[]
  form: UseFormReturn<T>
  onSubmit: (data: T) => Promise<void>
  isSubmitting?: boolean
  storageKey?: string
  children?: ReactNode
}

export function MultiStepForm<T extends FieldValues>({
  steps,
  form,
  onSubmit,
  isSubmitting = false,
  storageKey = "multi-step-form-progress",
  children,
}: MultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(1)

  const currentStepData = steps.find((step) => step.id === currentStep)
  const progress = (currentStep / steps.length) * 100

  // Load saved progress on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        try {
          const { step, data } = JSON.parse(saved)
          setCurrentStep(step)
          form.reset(data)
        } catch (error) {
          console.error("Failed to load saved progress:", error)
        }
      }
    }
  }, [storageKey, form])

  // Auto-save progress when step changes
  const saveProgress = (step: number) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          step,
          data: form.getValues(),
        }),
      )
    }
  }

  const validateCurrentStep = async () => {
    const currentFields = currentStepData?.fields || []
    const isValid = await form.trigger(currentFields as any)
    return isValid
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < steps.length) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      saveProgress(newStep)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      saveProgress(newStep)
    }
  }

  const handleSaveProgress = () => {
    saveProgress(currentStep)
    toast.success("تم حفظ التقدم")
  }

  const handleSubmit = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      try {
        await onSubmit(form.getValues())
        // Clear saved progress on successful submission
        if (typeof window !== "undefined") {
          localStorage.removeItem(storageKey)
        }
      } catch (error) {
        console.error("Form submission error:", error)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
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

      {/* Steps Navigation Indicator */}
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

      {/* Current Step Content */}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <ScrollReveal direction="up" delay={400}>
          {currentStepData?.component}
        </ScrollReveal>

        {/* Navigation Buttons */}
        <ScrollReveal direction="up" delay={500}>
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
                onClick={handleSaveProgress}
                className="flex items-center gap-2 bg-transparent"
              >
                <Save className="h-4 w-4" />
                حفظ التقدم
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-corporate-green hover:bg-corporate-green/90 flex items-center gap-2"
                >
                  التالي
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-corporate-green hover:bg-corporate-green/90 flex items-center gap-2"
                >
                  {isSubmitting ? "جاري التقديم..." : "تقديم الطلب"}
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </form>

      {children}
    </div>
  )
}

// Helper hook for managing multi-step form state
export function useMultiStepForm<T extends FieldValues>(
  steps: FormStep<T>[],
  form: UseFormReturn<T>,
  storageKey?: string,
) {
  const [currentStep, setCurrentStep] = useState(1)

  const currentStepData = steps.find((step) => step.id === currentStep)
  const progress = (currentStep / steps.length) * 100

  const validateCurrentStep = async () => {
    const currentFields = currentStepData?.fields || []
    const isValid = await form.trigger(currentFields as any)
    return isValid
  }

  const saveProgress = (step: number) => {
    if (typeof window !== "undefined" && storageKey) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          step,
          data: form.getValues(),
        }),
      )
    }
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < steps.length) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      saveProgress(newStep)
      return true
    }
    return false
  }

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      saveProgress(newStep)
      return true
    }
    return false
  }

  return {
    currentStep,
    setCurrentStep,
    currentStepData,
    progress,
    nextStep,
    prevStep,
    validateCurrentStep,
    saveProgress,
  }
}
