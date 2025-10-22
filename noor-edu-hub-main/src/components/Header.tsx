import { Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "صفحة التلميذ", path: "/student" },
    { name: "صفحة الأستاذ", path: "/teacher" },
    { name: "صفحة الإدارة", path: "/admin" },
    { name: "اتصل بنا", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40" style={{ background: 'linear-gradient(to bottom, #1E3A8A, #E5E7EB)' }}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
          <GraduationCap className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">مدرسة النبي اليتيم</span>
        </Link>
        
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              } after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname === item.path ? "after:w-full" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
