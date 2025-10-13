"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, UserCheck, Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type Member = {
  id: string;
  name: string;
  email: string;
  role: "arbitrator" | "lawyer" | null;
  city: string | null;
  experience: number | null;
  specialization: string | null;
  languages: string[];
  phone: string | null;
  education: string | null;
  certifications: string[];
  status: string;
  createdAt: string;
};

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["arbitrator", "lawyer"]),
  city: z.string().optional(),
  experience: z.coerce.number().int().min(0).max(80).optional(),
  specialization: z.string().optional(),
  languages: z.string().optional(), // comma-separated
  phone: z.string().optional(),
  education: z.string().optional(),
  certifications: z.string().optional(), // comma-separated
});

type FormValues = z.infer<typeof formSchema>;

const editSchema = formSchema.partial({ password: true, role: true });
type EditValues = z.infer<typeof editSchema>;

export default function MembersPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<string>("all");
  const [city, setCity] = useState<string>("");
  const [status, setStatus] = useState<string>("all");

  const query = useMemo(() => {
    const usp = new URLSearchParams();
    if (q) usp.set("q", q);
    if (role && role !== "all") usp.set("role", role);
    if (city) usp.set("city", city);
    if (status && status !== "all") usp.set("status", status);
    return usp.toString();
  }, [q, role, city, status]);

  const { data, isLoading, mutate } = useSWR<{ data: Member[] }>(`/api/members${query ? `?${query}` : ""}`, fetcher);

  const members = data?.data ?? [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6" /> Members Management
          </h1>
          <p className="text-sm text-muted-foreground">إدارة الحسابات للمحكمين والمحامين</p>
        </div>
        <AddMemberDialog onCreated={() => mutate()} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="بحث بالاسم أو البريد" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="الفلترة حسب الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="arbitrator">محكم</SelectItem>
            <SelectItem value="lawyer">محامي</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="الفلترة حسب المدينة" value={city} onChange={(e) => setCity(e.target.value)} />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="active">نشط</SelectItem>
            <SelectItem value="inactive">غير نشط</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم الكامل</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الدور</TableHead>
              <TableHead>المدينة</TableHead>
              <TableHead>الخبرة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-right">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  جاري التحميل...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && members.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  لا توجد نتائج
                </TableCell>
              </TableRow>
            )}
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.role === "arbitrator" ? "محكم" : m.role === "lawyer" ? "محامي" : "-"}</TableCell>
                <TableCell>{m.city || "-"}</TableCell>
                <TableCell>{m.experience ?? "-"}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${m.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>
                    {m.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <EditMemberButton member={m} onUpdated={() => mutate()} />
                  <ToggleStatusButton member={m} onToggled={() => mutate()} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ToggleStatusButton({ member, onToggled }: { member: Member; onToggled: () => void }) {
  const toggling = member.status !== "active";
  const next = toggling ? "active" : "inactive";
  const label = toggling ? "تفعيل" : "إيقاف";
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        const res = await fetch(`/api/members/${member.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: next }),
        });
        if (res.ok) {
          toast.success("تم التحديث");
          onToggled();
        } else {
          toast.error("حدث خطأ");
        }
      }}
    >
      <UserCheck className="h-4 w-4 mr-1" /> {label}
    </Button>
  );
}

function EditMemberButton({ member, onUpdated }: { member: Member; onUpdated: () => void }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<EditValues>({
    defaultValues: {
      name: member.name,
      email: member.email,
      role: (member.role as any) || undefined,
      city: member.city || undefined,
      experience: (member.experience as any) || undefined,
      specialization: member.specialization || undefined,
      languages: member.languages?.join(", ") || undefined,
      phone: member.phone || undefined,
      education: member.education || undefined,
      certifications: member.certifications?.join(", ") || undefined,
      password: "",
    },
    resolver: zodResolver(editSchema),
  });

  useEffect(() => {
    reset({
      name: member.name,
      email: member.email,
      role: (member.role as any) || undefined,
      city: member.city || undefined,
      experience: (member.experience as any) || undefined,
      specialization: member.specialization || undefined,
      languages: member.languages?.join(", ") || undefined,
      phone: member.phone || undefined,
      education: member.education || undefined,
      certifications: member.certifications?.join(", ") || undefined,
      password: "",
    });
  }, [member, reset]);

  const onSubmit = async (values: EditValues) => {
    const payload: any = {
      name: values.name,
      email: values.email,
      role: values.role,
      city: values.city,
      experience: values.experience,
      specialization: values.specialization,
      languages: values.languages ? values.languages.split(",").map((s) => s.trim()).filter(Boolean) : [],
      phone: values.phone,
      education: values.education,
      certifications: values.certifications ? values.certifications.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };
    const res = await fetch(`/api/members/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      toast.success("تم حفظ التعديلات");
      setOpen(false);
      onUpdated();
    } else {
      toast.error("فشل التعديل");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">تعديل</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>تعديل الحساب</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>الاسم الكامل</Label>
            <Input {...register("name")} />
          </div>
          <div>
            <Label>البريد الإلكتروني</Label>
            <Input type="email" {...register("email")} />
          </div>
          <div>
            <Label>الدور</Label>
            <select className="w-full h-9 rounded border px-3" {...register("role")}>
              <option value="">اختر</option>
              <option value="arbitrator">محكم</option>
              <option value="lawyer">محامي</option>
            </select>
          </div>
          <div>
            <Label>المدينة</Label>
            <Input {...register("city")} />
          </div>
          <div>
            <Label>الخبرة (سنوات)</Label>
            <Input type="number" {...register("experience")} />
          </div>
          <div>
            <Label>التخصص</Label>
            <Input {...register("specialization")} />
          </div>
          <div className="md:col-span-2">
            <Label>اللغات (افصل بينها بفاصلة)</Label>
            <Input placeholder="Arabic, English, French" {...register("languages")} />
          </div>
          <div>
            <Label>رقم الهاتف</Label>
            <Input {...register("phone")} />
          </div>
          <div>
            <Label>التعليم</Label>
            <Input {...register("education")} />
          </div>
          <div className="md:col-span-2">
            <Label>الشهادات (افصل بينها بفاصلة)</Label>
            <Textarea rows={3} {...register("certifications")} />
          </div>
          <DialogFooter className="md:col-span-2">
            <Button type="submit">حفظ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddMemberDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      languages: values.languages ? values.languages.split(",").map((s) => s.trim()).filter(Boolean) : [],
      certifications: values.certifications ? values.certifications.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };
    const res = await fetch("/api/members/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      toast.success("تم إنشاء الحساب بنجاح");
      reset();
      setOpen(false);
      onCreated();
    } else if (res.status === 409) {
      toast.error("البريد الإلكتروني مستخدم مسبقًا");
    } else if (res.status === 400) {
      toast.error("البيانات غير كاملة");
    } else {
      toast.error("حدث خطأ أثناء الإنشاء");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" /> إضافة حساب جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إضافة عضو جديد</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>الاسم الكامل</Label>
            <Input {...register("name")} />
          </div>
          <div>
            <Label>البريد الإلكتروني</Label>
            <Input type="email" {...register("email")} />
          </div>
          <div>
            <Label>كلمة المرور</Label>
            <Input type="password" {...register("password")} />
          </div>
          <div>
            <Label>الدور</Label>
            <select className="w-full h-9 rounded border px-3" {...register("role")}>
              <option value="arbitrator">محكم</option>
              <option value="lawyer">محامي</option>
            </select>
          </div>
          <div>
            <Label>المدينة</Label>
            <Input {...register("city")} />
          </div>
          <div>
            <Label>الخبرة (سنوات)</Label>
            <Input type="number" {...register("experience")} />
          </div>
          <div>
            <Label>التخصص</Label>
            <Input {...register("specialization")} />
          </div>
          <div className="md:col-span-2">
            <Label>اللغات (افصل بينها بفاصلة)</Label>
            <Input placeholder="Arabic, English, French" {...register("languages")} />
          </div>
          <div>
            <Label>رقم الهاتف</Label>
            <Input {...register("phone")} />
          </div>
          <div>
            <Label>التعليم</Label>
            <Input {...register("education")} />
          </div>
          <div className="md:col-span-2">
            <Label>الشهادات (افصل بينها بفاصلة)</Label>
            <Textarea rows={3} {...register("certifications")} />
          </div>
          <DialogFooter className="md:col-span-2">
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "يتم الحفظ..." : "حفظ"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
