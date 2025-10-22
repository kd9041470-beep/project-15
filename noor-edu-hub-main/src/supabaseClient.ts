import { createClient } from "@supabase/supabase-js";

// القيم من .env (تبدأ بـ VITE_)
const url  = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string; // ← صحّح الاسم هنا

if (!url || !anon) {
  console.warn("⚠️ لم يتم العثور على مفاتيح Supabase في .env");
}

export const supabase = createClient(url, anon);
