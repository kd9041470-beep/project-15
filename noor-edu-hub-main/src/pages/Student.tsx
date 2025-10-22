import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Student = () => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented later
    console.log("Student login:", { fullName, birthDate });
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
                  <UserCircle className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl">صفحة التلميذ</CardTitle>
                <CardDescription className="text-base">
                  مرحباً بك في بوابة الطالب. يرجى تسجيل الدخول للوصول إلى معلوماتك الدراسية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-base">الاسم الكامل للطالب</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-base">تاريخ الميلاد (رمز السر)</Label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        className="h-12 pr-10"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    تسجيل الدخول
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

export default Student;
