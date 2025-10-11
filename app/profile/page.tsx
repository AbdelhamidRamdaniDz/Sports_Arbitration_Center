'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Headerlanding } from "@/components/headerlanding";
import { User, Mail, Edit3, Save, X, Loader2, CheckCircle2 } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { status } = useSession({ required: true });

  useEffect(() => {
    if (status === "authenticated") fetchProfile();
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile", { credentials: "include" });
      if (!response.ok) {
        if (response.status === 401) router.push("/login");
        throw new Error("فشل في جلب بيانات الملف الشخصي");
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء جلب بيانات الملف الشخصي",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profile.name }),
      });

      if (!res.ok) throw new Error("فشل في تحديث الملف الشخصي");

      toast({
        title: "تم التحديث بنجاح",
        description: "تم حفظ التغييرات على ملفك الشخصي",
      });
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء تحديث الملف الشخصي",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-white" dir="rtl">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-corporate-green mx-auto mb-4" />
          <p className="text-gray-600 font-cairo text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Headerlanding />
      <div
        className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-10 px-4 md:py-20 transition-all"
        dir="rtl"
        style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}
      >
        <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
          {/* العنوان */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">الملف الشخصي</h1>
            <p className="text-gray-500 mt-2">إدارة معلوماتك الشخصية وإعدادات حسابك</p>
          </div>

          {/* البطاقة الرئيسية */}
          <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white/95 backdrop-blur">
            <CardHeader className="bg-corporate-green text-white px-8 py-6 relative">
              <h2 className="text-xl font-bold">معلومات المستخدم</h2>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="absolute left-6 top-6 bg-white/20 hover:bg-white/30 text-white rounded-lg px-4 py-2 transition"
                >
                  <Edit3 className="h-4 w-4 ml-2" />
                  تعديل
                </Button>
              )}
            </CardHeader>

            <CardContent className="p-8">
              {/* الصورة */}
              <div className="flex justify-center -mt-20 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-corporate-green rounded-full blur-lg opacity-30"></div>
                  <Avatar className="relative h-28 w-28 border-4 border-white shadow-xl ring-4 ring-green-200">
                    <AvatarImage src="/placeholder-user.jpg" alt={profile.name} />
                    <AvatarFallback className="text-3xl bg-corporate-green text-white font-bold">
                      {profile.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* الحقول */}
              <div className="space-y-6">
                {/* الاسم */}
                <div>
                  <Label className="flex justify-end items-center gap-2 text-gray-700 font-semibold">
                    <span>الاسم الكامل</span>
                    <User className="h-4 w-4 text-corporate-green" />
                  </Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className={`mt-2 text-right rounded-xl border-2 h-12 ${
                      isEditing
                        ? "border-corporate-green/50 focus:border-corporate-green focus:ring-green-100"
                        : "border-gray-200 bg-gray-50/60"
                    }`}
                  />
                </div>

                {/* البريد */}
                <div>
                  <Label className="flex justify-end items-center gap-2 text-gray-700 font-semibold">
                    <span>البريد الإلكتروني</span>
                    <Mail className="h-4 w-4 text-corporate-green" />
                  </Label>
                  <Input
                    type="email"
                    value={profile.email}
                    disabled
                    className="mt-2 text-right rounded-xl border-2 h-12 border-gray-200 bg-gray-50/60"
                  />
                  <p className="text-sm text-gray-500 mt-1 flex justify-end items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> البريد مؤكد
                  </p>
                </div>
              </div>

              {/* أزرار الحفظ */}
              {isEditing && (
                <div className="flex justify-end gap-3 pt-8 border-t mt-8 border-gray-100">
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      fetchProfile();
                    }}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 rounded-xl"
                  >
                    <X className="h-4 w-4 ml-2" /> إلغاء
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !profile.name}
                    className="bg-corporate-green hover:bg-green-700 text-white rounded-xl"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 ml-2" /> حفظ
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </>
  );
}
