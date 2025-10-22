// src/pages/Teacher.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/supabaseClient"; // تأكد من المسار الصحيح

function normalizeName(s: string) {
  return s.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
}

const Teacher = () => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const name = normalizeName(fullName);
      if (!name || !birthDate) throw new Error("يرجى إدخال الاسم وتاريخ الميلاد");

      // ابحث عن الأستاذ في جدول teachers
      const { data, error } = await supabase
        .from("teachers")
        .select("id, full_name, subject")
        .eq("full_name", name)
        .eq("birth_date", birthDate) // لو لم يكن لديك هذا العمود احذفه من الشرط
        .limit(1);

      if (error) throw error;
      if (!data || data.length === 0) {
        setErrorMsg("لا يوجد أستاذ بهذا الاسم أو التاريخ");
        return;
      }

      // نجاح → اذهب للوحة الأستاذ
      // يمكنك تمرير teacherId عبر الاستعلام أو حالة تخزين
      const teacherId = data[0].id;
      navigate(`/teacher/dashboard?tid=${teacherId}`);
    } catch (err: any) {
      setErrorMsg(err.message ?? "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-hero">
        <div className="container py-16">
          <div className="mx-auto max-w-md animate-fade-in-up">
            <Card className="shadow-elegant">
              <CardHeader className="space-y-4 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                  <Users className="h-12 w-12 text-accent" />
                </div>
                <CardTitle className="text-3xl">صفحة الأستاذ</CardTitle>
                <CardDescription className="text-base">
                  مرحباً بك في بوابة الأستاذ. يرجى تسجيل الدخول لإدارة الطلاب والدروس
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="teacherName" className="text-base">الاسم الكامل للأستاذ</Label>
                    <Input
                      id="teacherName"
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacherBirthDate" className="text-base">تاريخ الميلاد (رمز السر)</Label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="teacherBirthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        className="h-12 pr-10"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="text-red-600 text-sm">{errorMsg}</div>
                  )}

                  <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
                    {loading ? "جارٍ التحقق..." : "تسجيل الدخول"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Teacher;
