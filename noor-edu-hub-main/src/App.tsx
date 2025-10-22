import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** أنماط الصفحة (ضمنية) */
const css = `
:root{
  --g1:#102b5c; --g2:#1f3f79; --g3:#2563eb;
  --ink:#0f172a; --muted:#64748b; --card:#ffffff; --bg:#f7f8fb;
  --accent:#0ea5e9; --shadow:0 14px 34px rgba(2,6,23,.12);
}
*{box-sizing:border-box}
.page{
  background:var(--bg); color:var(--ink); min-height:100vh; position:relative; overflow-x:hidden;
}
.page:before,.page:after{
  content:""; position:fixed; z-index:-1; border-radius:50%;
  background:radial-gradient(circle at 30% 30%, #e5e7eb 0%, #f1f5f9 60%, transparent 70%);
  filter:blur(2px); opacity:.6; animation:drift 18s ease-in-out infinite;
}
.page:before{ width:420px;height:420px; top:-120px; left:-80px }
.page:after{ width:540px;height:540px; bottom:-160px; right:-120px; animation-delay:3s }
@keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-20px)}}

.main{max-width:1100px; margin:auto; padding:22px}

.big-card{
  position:relative; background:var(--card); border-radius:24px; padding:28px;
  box-shadow:var(--shadow); overflow:hidden; isolation:isolate;
  animation:floaty 6s ease-in-out infinite;
}
.big-card:before{
  content:""; position:absolute; inset:-40% -20% auto auto; height:240px; width:240px;
  background:radial-gradient(circle at 30% 30%, #93c5fd55, transparent 60%); transform:rotate(12deg);
}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

.hint{color:var(--muted); margin:6px 0 14px}
.btn{
  background:linear-gradient(90deg,var(--g3),var(--accent)); color:#fff; border:none; border-radius:12px;
  padding:12px 16px; font-weight:800; cursor:pointer; box-shadow:var(--shadow); transition:transform .12s ease
}
.btn:active{transform:scale(.98)}
.btn.big{font-size:22px; padding:14px 22px; min-width:240px}
.field{
  display:flex; gap:12px; flex-wrap:wrap; background:#f0f4ff; border-radius:14px; padding:12px; align-items:center
}
.field input{
  flex:1 1 260px; padding:14px 16px; border-radius:12px; border:1px solid #e5e7eb; outline:none; font-size:18px
}
.field input:focus{border-color:var(--g3); box-shadow:0 0 0 4px rgba(37,99,235,.12)}

.panel{margin-top:16px; border-radius:16px; background:#fff; box-shadow:var(--shadow); overflow:hidden; max-height:0; transition:max-height .5s ease}
.panel.open{max-height:640px}
.list{list-style:none; margin:0; padding:0; max-height:640px; overflow:auto}
.item{
  display:grid; grid-template-columns:1fr 140px 140px; gap:12px; padding:14px 16px; border-bottom:1px solid #eef2f7;
  animation:fadeUp .5s ease both;
}
.item .name{font-weight:800; font-size:22px}
.item input.score{
  width:100%; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-align:center; font-size:18px
}
.badge{display:inline-block; padding:6px 10px; border-radius:999px; font-weight:800; font-size:12px}
.badge.ok{background:#ecfdf5; color:#065f46}
@keyframes fadeUp{from{opacity:0; transform:translateY(18px)} to{opacity:1; transform:translateY(0)}}

.abs-card{margin-top:22px; background:#fff; border-radius:24px; box-shadow:var(--shadow); padding:22px}
.abs-toolbar{display:flex; gap:12px; align-items:center; margin-bottom:10px}
.abs-wrap{border:1px dashed #c7d2fe; border-radius:16px; padding:12px}
.abs-list{display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; animation:fadeUp .5s ease both}
.student{
  background:#f8fafc; padding:16px; border-radius:12px; font-weight:800; font-size:18px; text-align:center; cursor:pointer;
  transition:transform .1s ease, background .2s ease, color .2s ease, box-shadow .2s ease
}
.student:hover{transform:translateY(-2px); box-shadow:0 10px 22px rgba(2,6,23,.08)}
.student.absent{background:#fee2e2; color:#991b1b; outline:2px solid #fecaca}

footer.page-foot{color:var(--muted); text-align:center; padding:18px}
`;

type Row = { id: string; name: string };

const DEMO_STUDENTS = [
  "خالد جلاب","سميرة بن علي","عبد الرحمن قلال","مريم بوعلام","يوسف براهيمي",
  "آية قادري","محمد أمين تومي","شهد منصوري","نور الهدى رحماني","أمين مقراني","إسراء رياحي"
];

export default function Teacher() {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState<string | number>("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [showAbs, setShowAbs] = useState(false);
  const [absent, setAbsent] = useState<Set<string>>(new Set());

  const rows: Row[] = useMemo(
    () => DEMO_STUDENTS.map((n, i) => ({ id: String(i + 1), name: n })),
    []
  );

  const filtered = useMemo(
    () => rows.filter(r => r.name.includes(search.trim())),
    [rows, search]
  );

  const toggleAbsent = (id: string) => {
    setAbsent(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const applyGrade = () => {
    const val = Number(grade);
    if (!Number.isFinite(val) || val < 0 || val > 20) {
      alert("من فضلك أدخل نقطة صحيحة بين 0 و 20");
      return;
    }
    // لاحقًا: استبدل هذا بإدراج فعلي في Supabase لطلاب القائمة المصفّاة
    alert(`تم تعيين النقطة ${val} إلى ${filtered.length} تلميذًا (بيانات عرض).`);
  };

  return (
    <div className="page" dir="rtl">
      <style>{css}</style>

      <Header />

      <main className="main">
        {/* بطاقة النقاط الكبيرة */}
        <section className="big-card">
          <h2 style={{ margin: "0 0 6px" }}>إضافة النقاط بسرعة</h2>
          <div className="hint">اكتب اسم التلميذ أو اختره من القائمة — ثم حدِّد النقطة.</div>

          <div className="field">
            <input
              placeholder="ابحث بالاسم… (مثال: خالد، سميرة)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type="number"
              min={0}
              max={20}
              step={0.25}
              placeholder="النقطة /20"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
            <button className="btn big" onClick={() => setPanelOpen((v) => !v)}>
              {panelOpen ? "إخفاء القائمة" : "عرض القائمة"}
            </button>
            <button className="btn big" onClick={applyGrade}>
              تطبيق النقطة
            </button>
          </div>

          <div className={`panel ${panelOpen ? "open" : ""}`}>
            <ul className="list">
              {filtered.map((r, idx) => (
                <li className="item" key={r.id} style={{ animationDelay: `${idx * 0.04}s` }}>
                  <div className="name">{r.name}</div>
                  <input className="score" type="number" min={0} max={20} step={0.25} placeholder="/20" />
                  <span className="badge ok">جاهز</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* الغيابات */}
        <section className="abs-card">
          <h2 style={{ margin: "0 0 6px" }}>تسجيل الغيابات</h2>
          <div className="abs-toolbar">
            <button className="btn big" onClick={() => setShowAbs((s) => !s)}>
              {showAbs ? "إخفاء القائمة" : "عرض القائمة"}
            </button>
            <div style={{ color: "var(--muted)" }}>انقر على اسم التلميذ لتبديل الحالة (غائب/حاضر).</div>
          </div>

          <div className="abs-wrap">
            <div className="abs-list" style={{ display: showAbs ? "grid" : "none" }}>
              {rows.map((r, idx) => (
                <div
                  key={r.id}
                  className={`student ${absent.has(r.id) ? "absent" : ""}`}
                  onClick={() => toggleAbsent(r.id)}
                  style={{ animationDelay: `${idx * 0.03}s` }}
                >
                  {r.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <footer className="page-foot">© لوحة الأستاذ — تصميم متحرك موسّع</footer>
    </div>
  );
}
