"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  UserPlus, 
  UserCheck, 
  Shield, 
  Search, 
  Filter,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Calendar,
  TrendingUp,
  Users,
  Star,
  Edit,
  Trash2,
  Eye,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type Member = {
  id: string;
  name: string;
  email: string;
  role: "arbitrator" | "lawyer" | null;
  image?: string | null;
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
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  role: z.enum(["arbitrator", "lawyer"]),
  image: z
    .union([z.string().url(), z.string().startsWith("/")])
    .optional(),
  city: z.string().optional(),
  experience: z.coerce.number().int().min(0).max(80).optional(),
  specialization: z.string().optional(),
  languages: z.string().optional(),
  phone: z.string().optional(),
  education: z.string().optional(),
  certifications: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const editSchema = formSchema.partial({ password: true, role: true });
type EditValues = z.infer<typeof editSchema>;

export default function MembersPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<string>("all");
  const [city, setCity] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

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

  // Statistics
  const stats = useMemo(() => {
    const total = members.length;
    const arbitrators = members.filter(m => m.role === "arbitrator").length;
    const lawyers = members.filter(m => m.role === "lawyer").length;
    const active = members.filter(m => m.status === "active").length;
    const avgExperience = members.reduce((acc, m) => acc + (m.experience || 0), 0) / (total || 1);

    return { total, arbitrators, lawyers, active, avgExperience: avgExperience.toFixed(1) };
  }, [members]);

  const clearFilters = () => {
    setQ("");
    setRole("all");
    setCity("");
    setStatus("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto p-6 space-y-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-corporate-green to-emerald-600 text-white flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-corporate-green tracking-tight">
                  إدارة الأعضاء
                </h1>
                <p className="text-sm text-muted-foreground">
                  إدارة حسابات المحكمين والمحامين المعتمدين
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              تصدير
            </Button>
            <AddMemberDialog onCreated={() => mutate()} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-2 hover:border-corporate-green transition-all hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">إجمالي الأعضاء</p>
                  <p className="text-2xl font-bold text-corporate-green">{stats.total}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-corporate-green transition-all hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">المحكمون</p>
                  <p className="text-2xl font-bold text-corporate-green">{stats.arbitrators}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-corporate-green transition-all hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">المحامون</p>
                  <p className="text-2xl font-bold text-corporate-green">{stats.lawyers}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-corporate-green transition-all hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الحسابات النشطة</p>
                  <p className="text-2xl font-bold text-corporate-green">{stats.active}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-corporate-green transition-all hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">متوسط الخبرة</p>
                  <p className="text-2xl font-bold text-corporate-green">{stats.avgExperience}</p>
                  <p className="text-xs text-muted-foreground">سنة</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="border-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-corporate-green" />
                <CardTitle className="text-lg">الفلاتر والبحث</CardTitle>
              </div>
              {(q || role !== "all" || city || status !== "all") && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  مسح الفلاتر
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="relative lg:col-span-2">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pr-10" 
                  placeholder="بحث بالاسم أو البريد الإلكتروني..." 
                  value={q} 
                  onChange={(e) => setQ(e.target.value)} 
                />
              </div>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأدوار</SelectItem>
                  <SelectItem value="arbitrator">محكم</SelectItem>
                  <SelectItem value="lawyer">محامي</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="المدينة" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
              />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* View Mode Tabs */}
        <div className="flex items-center justify-between">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="table" className="gap-2">
                <FileText className="h-4 w-4" />
                جدول
              </TabsTrigger>
              <TabsTrigger value="cards" className="gap-2">
                <Users className="h-4 w-4" />
                بطاقات
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="text-sm text-muted-foreground">
            عرض {members.length} من {stats.total} عضو
          </div>
        </div>

        {/* Content */}
        {viewMode === "table" ? (
          <Card className="border-2">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold">العضو</TableHead>
                    <TableHead className="font-bold">معلومات الاتصال</TableHead>
                    <TableHead className="font-bold">الدور</TableHead>
                    <TableHead className="font-bold">الموقع</TableHead>
                    <TableHead className="font-bold">الخبرة</TableHead>
                    <TableHead className="font-bold">الحالة</TableHead>
                    <TableHead className="text-right font-bold">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-12 w-12 rounded-full border-4 border-corporate-green border-t-transparent animate-spin" />
                          <p className="text-muted-foreground">جاري التحميل...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {!isLoading && members.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">لا توجد نتائج</p>
                            <p className="text-sm text-muted-foreground">جرّب تعديل معايير البحث</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {members.map((m) => (
                    <TableRow key={m.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                            <AvatarImage src={m.image || undefined} alt={m.name} />
                            <AvatarFallback className="bg-gradient-to-br from-corporate-green to-emerald-600 text-white">
                              {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{m.name}</p>
                            {m.specialization && (
                              <p className="text-xs text-muted-foreground">{m.specialization}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span>{m.email}</span>
                          </div>
                          {m.phone && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span>{m.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          m.role === "arbitrator" 
                            ? "border-purple-200 bg-purple-50 text-purple-700" 
                            : "border-orange-200 bg-orange-50 text-orange-700"
                        }>
                          {m.role === "arbitrator" ? (
                            <><Award className="h-3 w-3 ml-1" /> محكم</>
                          ) : (
                            <><Briefcase className="h-3 w-3 ml-1" /> محامي</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {m.city ? (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>{m.city}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {m.experience ? (
                          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                            {m.experience} سنة
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          m.status === "active" 
                            ? "bg-green-100 text-green-700 hover:bg-green-100" 
                            : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                        }>
                          {m.status === "active" ? (
                            <><CheckCircle className="h-3 w-3 ml-1" /> نشط</>
                          ) : (
                            <><XCircle className="h-3 w-3 ml-1" /> غير نشط</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedMember(m)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <EditMemberButton member={m} onUpdated={() => mutate()} />
                          <ToggleStatusButton member={m} onToggled={() => mutate()} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <div className="col-span-full flex justify-center py-12">
                <div className="h-12 w-12 rounded-full border-4 border-corporate-green border-t-transparent animate-spin" />
              </div>
            )}
            {!isLoading && members.length === 0 && (
              <div className="col-span-full flex flex-col items-center gap-3 py-12">
                <AlertCircle className="h-16 w-16 text-gray-400" />
                <p className="text-muted-foreground">لا توجد نتائج</p>
              </div>
            )}
            {members.map((m) => (
              <MemberCard key={m.id} member={m} onView={() => setSelectedMember(m)} onUpdate={() => mutate()} />
            ))}
          </div>
        )}

        {/* Member Detail Dialog */}
        {selectedMember && (
          <MemberDetailDialog
            member={selectedMember}
            open={!!selectedMember}
            onClose={() => setSelectedMember(null)}
            onUpdate={() => mutate()}
          />
        )}
      </div>
    </div>
  );
}

function MemberCard({ member, onView, onUpdate }: { member: Member; onView: () => void; onUpdate: () => void }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-corporate-green">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Avatar className="h-16 w-16 ring-4 ring-gray-100 group-hover:ring-corporate-green transition-all">
            <AvatarImage src={member.image || undefined} alt={member.name} />
            <AvatarFallback className="bg-gradient-to-br from-corporate-green to-emerald-600 text-white text-lg">
              {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <Badge className={
            member.status === "active" 
              ? "bg-green-100 text-green-700" 
              : "bg-gray-200 text-gray-700"
          }>
            {member.status === "active" ? "نشط" : "غير نشط"}
          </Badge>
        </div>

        <h3 className="font-bold text-lg text-corporate-green mb-1 group-hover:text-emerald-700 transition-colors">
          {member.name}
        </h3>
        
        <Badge variant="outline" className={`mb-3 ${
          member.role === "arbitrator" 
            ? "border-purple-200 bg-purple-50 text-purple-700" 
            : "border-orange-200 bg-orange-50 text-orange-700"
        }`}>
          {member.role === "arbitrator" ? "محكم" : "محامي"}
        </Badge>

        {member.specialization && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {member.specialization}
          </p>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{member.email}</span>
          </div>
          {member.city && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{member.city}</span>
            </div>
          )}
          {member.experience && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{member.experience} سنة خبرة</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1 gap-2">
            <Eye className="h-4 w-4" />
            عرض
          </Button>
          <EditMemberButton member={member} onUpdated={onUpdate} />
          <ToggleStatusButton member={member} onToggled={onUpdate} />
        </div>
      </CardContent>
    </Card>
  );
}

function MemberDetailDialog({ member, open, onClose, onUpdate }: { 
  member: Member; 
  open: boolean; 
  onClose: () => void;
  onUpdate: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-corporate-green flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-corporate-green">
              <AvatarImage src={member.image || undefined} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-corporate-green to-emerald-600 text-white">
                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {member.name}
          </DialogTitle>
          <DialogDescription>
            عرض تفاصيل العضو المحدد ومعلوماته.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-corporate-green" />
                  <Label className="text-sm font-semibold">البريد الإلكتروني</Label>
                </div>
                <p className="text-sm">{member.email}</p>
              </CardContent>
            </Card>

            {member.phone && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-corporate-green" />
                    <Label className="text-sm font-semibold">رقم الهاتف</Label>
                  </div>
                  <p className="text-sm">{member.phone}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-corporate-green" />
                  <Label className="text-sm font-semibold">الدور</Label>
                </div>
                <Badge className={
                  member.role === "arbitrator"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-orange-100 text-orange-700"
                }>
                  {member.role === "arbitrator" ? "محكم" : "محامي"}
                </Badge>
              </CardContent>
            </Card>

            {member.city && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-corporate-green" />
                    <Label className="text-sm font-semibold">المدينة</Label>
                  </div>
                  <p className="text-sm">{member.city}</p>
                </CardContent>
              </Card>
            )}

            {member.experience && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-corporate-green" />
                    <Label className="text-sm font-semibold">سنوات الخبرة</Label>
                  </div>
                  <p className="text-sm">{member.experience} سنة</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-corporate-green" />
                  <Label className="text-sm font-semibold">تاريخ الانضمام</Label>
                </div>
                <p className="text-sm">{new Date(member.createdAt).toLocaleDateString('ar-DZ')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Professional Info */}
          {(member.specialization || member.education) && (
            <div className="space-y-4">
              {member.specialization && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-corporate-green" />
                      <Label className="text-sm font-semibold">التخصص</Label>
                    </div>
                    <p className="text-sm">{member.specialization}</p>
                  </CardContent>
                </Card>
              )}

              {member.education && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="h-4 w-4 text-corporate-green" />
                      <Label className="text-sm font-semibold">التعليم</Label>
                    </div>
                    <p className="text-sm">{member.education}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Languages */}
          {member.languages && member.languages.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-4 w-4 text-corporate-green" />
                  <Label className="text-sm font-semibold">اللغات</Label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.languages.map((lang, idx) => (
                    <Badge key={idx} variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certifications */}
          {member.certifications && member.certifications.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4 text-corporate-green" />
                  <Label className="text-sm font-semibold">الشهادات والاعتمادات</Label>
                </div>
                <div className="space-y-2">
                  {member.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <EditMemberButton member={member} onUpdated={onUpdate} />
            <ToggleStatusButton member={member} onToggled={onUpdate} />
            <Button variant="outline" onClick={onClose} className="flex-1">
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ToggleStatusButton({ member, onToggled }: { member: Member; onToggled: () => void }) {
  const [loading, setLoading] = useState(false);
  const toggling = member.status !== "active";
  const next = toggling ? "active" : "inactive";
  const label = toggling ? "تفعيل" : "إيقاف";
  
  return (
    <Button
      variant={toggling ? "default" : "outline"}
      size="sm"
      className={toggling ? "bg-green-600 hover:bg-green-700 gap-2" : "gap-2"}
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/members/${member.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: next }),
          });
          if (res.ok) {
            toast.success(toggling ? "تم تفعيل الحساب بنجاح" : "تم إيقاف الحساب");
            onToggled();
          } else {
            toast.error("حدث خطأ أثناء التحديث");
          }
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <UserCheck className="h-4 w-4" />
      )}
      {label}
    </Button>
  );
}

function EditMemberButton({ member, onUpdated }: { member: Member; onUpdated: () => void }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting, errors } } = useForm<EditValues>({
    defaultValues: {
      name: member.name,
      email: member.email,
      role: (member.role as any) || undefined,
      image: member.image || undefined,
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
  const [uploading, setUploading] = useState(false);
  const imageUrl = watch("image");

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      const json = await res.json();
      if (res.ok && json.url) {
        setValue("image", json.url as any, { shouldDirty: true, shouldTouch: true });
        toast.success("تم رفع الصورة بنجاح");
      } else {
        toast.error("فشل رفع الصورة");
      }
    } catch {
      toast.error("حدث خطأ أثناء رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    reset({
      name: member.name,
      email: member.email,
      role: (member.role as any) || undefined,
      image: member.image || undefined,
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
      image: values.image,
      city: values.city,
      experience: values.experience,
      specialization: values.specialization,
      languages: values.languages ? values.languages.split(",").map((s) => s.trim()).filter(Boolean) : [],
      phone: values.phone,
      education: values.education,
      certifications: values.certifications ? values.certifications.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };
    
    if (values.password) {
      payload.password = values.password;
    }

    const res = await fetch(`/api/members/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (res.ok) {
      toast.success("تم حفظ التعديلات بنجاح");
      setOpen(false);
      onUpdated();
    } else {
      const data = await res.json();
      toast.error(data.error || "فشل التعديل");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="h-4 w-4" />
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-corporate-green">
            <Settings className="h-5 w-5" />
            تعديل معلومات العضو
          </DialogTitle>
          <DialogDescription>
            تعديل بيانات العضو وحفظ التغييرات.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الاسم الكامل *</Label>
                <Input {...register("name")} />
                {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني *</Label>
                <Input type="email" {...register("email")} />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور (اتركها فارغة إذا لم ترد تغييرها)</Label>
                <Input type="password" {...register("password")} placeholder="••••••••" />
                {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input {...register("phone")} placeholder="+213 XXX XXX XXX" />
              </div>
            </CardContent>
          </Card>

          {/* Profile Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">الصورة الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {imageUrl && (
                  <Avatar className="h-20 w-20 ring-4 ring-gray-100">
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-corporate-green to-emerald-600 text-white">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1 space-y-2">
                  <Label>رفع صورة جديدة</Label>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={onFileChange} 
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    الحجم الأقصى: 5 ميجابايت. الأنواع المدعومة: JPG, PNG, GIF
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>أو أدخل رابط الصورة</Label>
                <Input placeholder="https://example.com/avatar.jpg" {...register("image")} />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">المعلومات المهنية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الدور</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" {...register("role")}>
                  <option value="">اختر الدور</option>
                  <option value="arbitrator">محكم</option>
                  <option value="lawyer">محامي</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>المدينة</Label>
                <Input {...register("city")} placeholder="الجزائر، وهران، قسنطينة..." />
              </div>
              <div className="space-y-2">
                <Label>سنوات الخبرة</Label>
                <Input type="number" min="0" max="80" {...register("experience")} />
              </div>
              <div className="space-y-2">
                <Label>التخصص</Label>
                <Input {...register("specialization")} placeholder="القانون الرياضي، التحكيم التجاري..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>التعليم</Label>
                <Input {...register("education")} placeholder="دكتوراه في القانون - جامعة الجزائر" />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">معلومات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>اللغات (افصل بينها بفاصلة)</Label>
                <Input 
                  {...register("languages")} 
                  placeholder="العربية, الإنجليزية, الفرنسية" 
                />
                <p className="text-xs text-muted-foreground">مثال: العربية, الإنجليزية, الفرنسية</p>
              </div>
              <div className="space-y-2">
                <Label>الشهادات والاعتمادات (افصل بينها بفاصلة)</Label>
                <Textarea 
                  rows={3} 
                  {...register("certifications")} 
                  placeholder="شهادة التحكيم الدولي, عضو نقابة المحامين..."
                />
                <p className="text-xs text-muted-foreground">
                  اكتب كل شهادة أو اعتماد وافصل بينها بفاصلة
                </p>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || uploading}
              className="bg-gradient-to-r from-corporate-green to-emerald-600 hover:from-corporate-green/90 hover:to-emerald-700"
            >
              {isSubmitting || uploading ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-2" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 ml-2" />
                  حفظ التعديلات
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddMemberDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting, errors }, setValue, watch } = useForm<FormValues>({
    defaultValues: { role: "arbitrator" as any },
    resolver: zodResolver(formSchema),
  });
  const [uploading, setUploading] = useState(false);
  const imageUrl = watch("image");

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      const json = await res.json();
      if (res.ok && json.url) {
        setValue("image", json.url as any, { shouldDirty: true, shouldTouch: true });
        toast.success("تم رفع الصورة بنجاح");
      } else {
        toast.error("فشل رفع الصورة");
      }
    } catch {
      toast.error("حدث خطأ أثناء رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      image: values.image,
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
      toast.error("البريد الإلكتروني مستخدم مسبقاً");
    } else if (res.status === 400) {
      toast.error("البيانات غير كاملة أو غير صحيحة");
    } else {
      toast.error("حدث خطأ أثناء إنشاء الحساب");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-corporate-green to-emerald-600 hover:from-corporate-green/90 hover:to-emerald-700 gap-2 shadow-lg">
          <UserPlus className="h-4 w-4" />
          إضافة عضو جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-corporate-green">
            <Sparkles className="h-5 w-5" />
            إضافة عضو جديد
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            أضف محكم أو محامي جديد إلى النظام
          </p>
          <DialogDescription>
            إنشاء حساب عضو جديد وإدخال معلوماته الأساسية والمهنية.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الاسم الكامل *</Label>
                <Input {...register("name")} placeholder="أحمد محمد السعيد" />
                {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني *</Label>
                <Input type="email" {...register("email")} placeholder="ahmed@example.com" />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور *</Label>
                <Input type="password" {...register("password")} placeholder="••••••••" />
                {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input {...register("phone")} placeholder="+213 XXX XXX XXX" />
              </div>
            </CardContent>
          </Card>

          {/* Profile Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">الصورة الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {imageUrl && (
                  <Avatar className="h-20 w-20 ring-4 ring-gray-100">
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-corporate-green to-emerald-600 text-white text-lg">
                      عضو
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1 space-y-2">
                  <Label>رفع صورة</Label>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={onFileChange} 
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    الحجم الأقصى: 5 ميجابايت. الأنواع المدعومة: JPG, PNG, GIF
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>أو أدخل رابط الصورة</Label>
                <Input placeholder="https://example.com/avatar.jpg" {...register("image")} />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">المعلومات المهنية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الدور *</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" {...register("role")}>
                  <option value="arbitrator">محكم</option>
                  <option value="lawyer">محامي</option>
                </select>
                {errors.role && <p className="text-xs text-red-600">{errors.role.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>المدينة</Label>
                <Input {...register("city")} placeholder="الجزائر، وهران، قسنطينة..." />
              </div>
              <div className="space-y-2">
                <Label>سنوات الخبرة</Label>
                <Input type="number" min="0" max="80" {...register("experience")} placeholder="15" />
              </div>
              <div className="space-y-2">
                <Label>التخصص</Label>
                <Input {...register("specialization")} placeholder="القانون الرياضي الدولي" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>التعليم</Label>
                <Input {...register("education")} placeholder="دكتوراه في القانون - جامعة الجزائر" />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">معلومات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>اللغات (افصل بينها بفاصلة)</Label>
                <Input 
                  {...register("languages")} 
                  placeholder="العربية, الإنجليزية, الفرنسية" 
                />
                <p className="text-xs text-muted-foreground">مثال: العربية, الإنجليزية, الفرنسية</p>
              </div>
              <div className="space-y-2">
                <Label>الشهادات والاعتمادات (افصل بينها بفاصلة)</Label>
                <Textarea 
                  rows={3} 
                  {...register("certifications")} 
                  placeholder="شهادة التحكيم الدولي من المحكمة الرياضية الدولية, عضو نقابة المحامين..."
                />
                <p className="text-xs text-muted-foreground">
                  اكتب كل شهادة أو اعتماد وافصل بينها بفاصلة
                </p>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || uploading}
              className="bg-gradient-to-r from-corporate-green to-emerald-600 hover:from-corporate-green/90 hover:to-emerald-700"
            >
              {isSubmitting || uploading ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-2" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 ml-2" />
                  إنشاء الحساب
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}