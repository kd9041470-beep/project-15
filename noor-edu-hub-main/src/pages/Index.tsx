import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Users, Building2, Heart, Target, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const userTypes = [
    {
      icon: UserCircle,
      title: "التلاميذ",
      description: "تابع درجاتك، حضورك، ونتائجك الدراسية",
      path: "/student",
      color: "primary",
    },
    {
      icon: Users,
      title: "الأساتذة",
      description: "أدر الطلاب، أدخل الدرجات، وتابع الأداء",
      path: "/teacher",
      color: "accent",
    },
    {
      icon: Building2,
      title: "الإدارة",
      description: "لوحة تحكم شاملة للإحصائيات والتقارير",
      path: "/admin",
      color: "primary",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]"></div>
        <div className="container relative py-20 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <span className="text-sm font-medium text-primary">منصة تعليمية متكاملة</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                مدرسة النبي اليتيم
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                منصة تعليمية ذكية تربط بين الطالب والأستاذ والإدارة في بيئة رقمية متكاملة
              </p>
              <p className="text-base text-muted-foreground border-r-4 border-accent pr-4 leading-relaxed">
                منصة تعليمية تابعة لجمعية كافل اليتيم لولاية تيارت، تهدف إلى دعم التعليم والتكافل الاجتماعي.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/student">
                  <Button variant="hero" size="lg" className="text-lg">
                    انضم الآن
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="text-lg">
                    اتصل بنا
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-up">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-3xl"></div>
              <img
                src={heroImage}
                alt="طالب أو معلم عربي يحمل كتباً وجهازاً لوحياً"
                className="relative rounded-3xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold md:text-4xl">اختر بوابتك</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ادخل إلى منصتك حسب نوع حسابك وابدأ رحلتك التعليمية
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {userTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Link
                  key={type.path}
                  to={type.path}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-elegant hover:-translate-y-2">
                    <CardHeader className="space-y-4">
                      <div
                        className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl ${
                          type.color === "accent" ? "bg-accent/10" : "bg-primary/10"
                        } transition-all duration-300 group-hover:scale-110`}
                      >
                        <Icon
                          className={`h-10 w-10 ${
                            type.color === "accent" ? "text-accent" : "text-primary"
                          }`}
                        />
                      </div>
                      <CardTitle className="text-2xl text-center">{type.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-base leading-relaxed">
                        {type.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Association Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-3xl font-bold md:text-4xl">عن جمعية كافل اليتيم - تيارت</h2>
            </div>

            <Card className="shadow-elegant animate-fade-in-up">
              <CardContent className="p-8 space-y-6">
                <p className="text-lg leading-relaxed text-foreground">
                  وُلدت جمعية كافل اليتيم من ثُلّة مؤمنة بفعل الخير، سعت إلى خدمة الأيتام والأسر المحتاجة في إطار منظم تأسس سنة 2008، تيمّناً بقول النبي ﷺ: "أنا وكافل اليتيم في الجنة".
                </p>
                <p className="text-lg leading-relaxed text-foreground">
                  بدأت الجمعية ككيان محلي يعتني بـ 37 عائلة تضم 73 يتيماً في بلدية تيارت، ثم توسّع نشاطها في عام 2013 لتغطي كامل تراب ولاية تيارت تحت اسم جمعية كافل اليتيم الولائية، وأصبحت اليوم مؤسسة رائدة في العمل الخيري والتربوي، تجمع بين العطاء والتنمية الإنسانية.
                </p>

                <div className="grid gap-6 md:grid-cols-3 pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">العطاء</h3>
                    <p className="text-sm text-muted-foreground">رعاية الأيتام والأسر المحتاجة</p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                      <Target className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg">الهدف</h3>
                    <p className="text-sm text-muted-foreground">دعم التعليم والتكافل الاجتماعي</p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">الريادة</h3>
                    <p className="text-sm text-muted-foreground">مؤسسة رائدة في العمل الخيري</p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
