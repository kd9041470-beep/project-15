import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Lock, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ✅ مسار نسبي لتفادي alias مؤقتًا
import { supabase } from "../supabaseClient";

// نوع السجلّ المتوقع من profiles
type AdminProfileRow = {
  id: string;
  full_name: string;
  role: "admin" | "teacher" | "student";
  secret_code?: string | null;
  birth_date?: string | null; // شكل YYYY-MM-DD
};

function toIsoFromDDMMYYYY(s: string): string | null {
  // "DD/MM/YYYY" -> "YYYY-MM-DD"
  const m = s.trim().match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (!m) return null;
  const dd = m[1].padStart(2, "0");
  const mm = m[2].padStart(2, "0");
  const yyyy = m[3];
  return `${yyyy}-${mm}-${dd}`;
}

function toDDMMYYYYFromIso(iso?: string | null): string | null {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const [, y, mo, d] = m;
  return `${d}/${mo}/${y}`;
}

const Admin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!username.trim() || !password.trim()) {
      setFormError("يرجى إدخال اسم المستخدم والرمز السري");
      return;
    }

    setLoading(true);
    try {
      // ✅ استعلام بسيط بدون Generics مزعجة
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role, secret_code, birth_date")
        .eq("full_name", username.trim())
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error(error);
        setFormError("حدث خطأ أثناء الاتصال بالخادم.");
        return;
      }
      if (!data) {
        setFormError("لا يوجد مستخدم إدارة بهذا الاسم.");
        return;
      }

      // نحوّل النتيجة إلى النوع المتوقع بعد التحقق
      const adminRow = data as AdminProfileRow;

      // تحقق من الرمز
      const input = password.trim();

      const bySecret =
        typeof adminRow.secret_code === "string" &&
        adminRow.secret_code.trim() !== "" &&
        adminRow.secret_code.trim() === input;

      const isoFromInput = toIsoFromDDMMYYYY(input); // لو أدخلت 19/01/2000
      const ddmmyyyyFromDb = toDDMMYYYYFromIso(adminRow.birth_date); // للعرض فقط

      const byBirth =
        (typeof adminRow.birth_date === "string" && adminRow.birth_date === input) || // أدخلت YYYY-MM-DD
        (isoFromInput && adminRow.birth_date === isoFromInput) || // أدخلت DD/MM/YYYY
        (ddmmyyyyFromDb && ddmmyyyyFromDb === input); // مطابقة شكلية

      if (bySecret || byBirth) {
        // نجاح
        window.location.href = "/admin/dashboard"; // عدّل المسار حسب تطبيقك
      } else {
        setFormError("الرمز السري غير صحيح.");
      }
    } catch (err) {
      console.error(err);
      setFormError("تعذر إتمام تسجيل الدخول. حاول مرة أخرى.");
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
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl">صفحة الإدارة</CardTitle>
                <CardDescription className="text-base">
                  مرحباً بك في بوابة الإدارة. يرجى تسجيل الدخول للوصول إلى لوحة التحكم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-base">اسم المستخدم</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="أدخل اسم المستخدم"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="h-12 pr-10"
                        autoComplete="username"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base">الرمز السري</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="أدخل الرمز السري (مثال: 19/01/2000)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 pr-10"
                        autoComplete="current-password"
                      />
                    </div>
                  </div>

                  {formError && (
                    <p className="text-red-600 text-sm text-center">{formError}</p>
                  )}

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "جاري التحقق..." : "تسجيل الدخول"}
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

export default Admin;
