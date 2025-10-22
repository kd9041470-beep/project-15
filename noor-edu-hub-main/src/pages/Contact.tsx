import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented later
    console.log("Contact form:", formData);
    toast.success("تم إرسال رسالتك بنجاح!");
    setFormData({ fullName: "", email: "", message: "" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-hero">
        <div className="container py-16">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl font-bold md:text-5xl">اتصل بنا</h1>
              <p className="text-lg text-muted-foreground">
                نحن هنا للإجابة على أسئلتكم واستفساراتكم
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 animate-fade-in-up">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">أرسل لنا رسالة</CardTitle>
                  <CardDescription>
                    املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-base">الاسم الكامل</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base">الرسالة</Label>
                      <Textarea
                        id="message"
                        placeholder="اكتب رسالتك هنا..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="min-h-[150px] resize-none"
                      />
                    </div>
                    <Button type="submit" variant="accent" size="lg" className="w-full">
                      <Send className="h-5 w-5 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl">معلومات التواصل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">العنوان</h3>
                        <p className="text-muted-foreground">تيارت، الجزائر</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">رقم الهاتف</h3>
                        <p className="text-muted-foreground" dir="ltr">+213 XX XX XX XX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                        <p className="text-muted-foreground">contact@kafil-tiaret.org</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl">تابعنا على</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                        aria-label="فيسبوك"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                        aria-label="انستغرام"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                        aria-label="يوتيوب"
                      >
                        <Youtube className="h-6 w-6" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl">موقعنا على الخريطة</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="aspect-video w-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102726.45382948873!2d1.2374939!3d35.3710166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x127edb51e6e0c5bb%3A0x40288e2f6c7d3c0!2sTiaret%2C%20Algeria!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="خريطة موقع الجمعية"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
