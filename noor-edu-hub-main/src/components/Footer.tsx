import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "صفحة التلميذ", path: "/student" },
    { name: "صفحة الأستاذ", path: "/teacher" },
    { name: "صفحة الإدارة", path: "/admin" },
    { name: "اتصل بنا", path: "/contact" },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">مدرسة النبي اليتيم</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              منصة تعليمية ذكية تابعة لجمعية كافل اليتيم لولاية تيارت، تهدف إلى دعم التعليم والتكافل الاجتماعي.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
                aria-label="فيسبوك"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
                aria-label="انستغرام"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
                aria-label="يوتيوب"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">خريطة الموقع</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات التواصل</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">تيارت، الجزائر</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground" dir="ltr">+213 XX XX XX XX</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">contact@kafil-tiaret.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            حقوق النشر © {currentYear} مدرسة النبي اليتيم - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
