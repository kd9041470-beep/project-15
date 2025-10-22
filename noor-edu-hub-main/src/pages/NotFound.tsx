import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-hero flex items-center justify-center">
        <div className="container py-16">
          <div className="mx-auto max-w-md text-center space-y-8 animate-fade-in-up">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-primary">404</h1>
              <h2 className="text-2xl font-bold">الصفحة غير موجودة</h2>
              <p className="text-lg text-muted-foreground">
                عذراً، الصفحة التي تبحث عنها غير متوفرة
              </p>
            </div>
            <Link to="/">
              <Button variant="hero" size="lg">
                <Home className="h-5 w-5 ml-2" />
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
