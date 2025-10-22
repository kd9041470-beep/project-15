<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لوحة التلميذ — مدرسة النبي اليتيم</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --g1:#102b5c; --g2:#1f3f79; --g3:#2563eb;
  --ink:#0f172a; --muted:#64748b; --card:#ffffff; --bg:#f7f8fb;
  --accent:#0ea5e9; --ok:#10b981; --abs:#ef4444; --gray:#e5e7eb;
  --shadow:0 14px 34px rgba(2,6,23,.12);
  --r:18px;
}
*{box-sizing:border-box}
body{
  margin:0; font-family:"Tajawal",system-ui; background:var(--bg); color:var(--ink);
  position:relative; overflow-x:hidden;
}
/* floating gray shapes in background */
body::before, body::after{
  content:""; position:fixed; z-index:-1; border-radius:50%;
  background:radial-gradient(circle at 30% 30%, #eef2f7 0%, #f8fafc 60%, transparent 75%);
  filter:blur(2px); opacity:.6;
  animation: drift 20s ease-in-out infinite;
}
body::before{ width:420px; height:420px; top:-120px; left:-80px; animation-delay:0s;}
body::after{ width:560px; height:560px; bottom:-160px; right:-120px; animation-delay:3s;}
@keyframes drift{
  0%,100%{ transform:translate(0,0) rotate(0deg) }
  50%{ transform:translate(30px,-20px) rotate(8deg) }
}

/* Header */
.header{background:linear-gradient(180deg,var(--g1) 0%,var(--g2) 40%,var(--g3) 100%);
  color:#fff; position:sticky; top:0; z-index:50; box-shadow:var(--shadow)}
.nav{max-width:1100px; margin:auto; padding:14px 18px; display:flex; gap:12px; align-items:center}
.logo{display:flex; align-items:center; gap:10px; font-weight:800}
.logo .cap{width:34px;height:34px;border:2px solid #fff;border-radius:50%;display:grid;place-items:center}
.tabs{margin-inline-start:auto; display:flex; gap:12px}
.tab{color:#e5edff; text-decoration:none; padding:8px 12px; border:1px solid rgba(255,255,255,.2); border-radius:999px; font-weight:700}
.tab.active{background:#fff; color:#0f1d3b}

.main{max-width:1100px; margin:auto; padding:22px}

/* Cards & animations */
.card{background:var(--card); border-radius:24px; box-shadow:var(--shadow); padding:22px; margin-bottom:18px; overflow:hidden; position:relative; isolation:isolate}
.card::after{
  content:""; position:absolute; inset:auto -20% -40% auto; width:240px; height:240px; border-radius:50%;
  background:radial-gradient(circle at 30% 30%, #93c5fd3a 0%, transparent 60%);
  transform:rotate(10deg);
}
.section-title{margin:0 0 8px; font-weight:800}

/* Timetable */
.timetable{display:grid; grid-template-columns:140px repeat(5,1fr); gap:8px; font-size:15px}
.timetable .cell{background:#f8fafc; border:1px solid #eef2f7; border-radius:12px; padding:10px; text-align:center}
.timetable .time{background:#eef2ff; color:#1d4ed8; font-weight:800}
.timetable .day{background:#e0e7ff; color:#1d4ed8; font-weight:800}
.legend{display:flex; gap:10px; align-items:center; font-size:13px; color:var(--muted); margin-top:8px}
.dot{width:10px; height:10px; border-radius:50%}

/* Results */
.results-head{display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap}
.metric{background:#f8fafc; border-radius:12px; padding:10px 12px; font-weight:800}
.table-wrap{overflow:auto}
table{width:100%; border-collapse:separate; border-spacing:0 10px}
thead th{font-size:13px; color:#475569; text-align:right; padding:4px 8px}
tbody tr{background:#fff; border-radius:14px; box-shadow:var(--shadow); transition:transform .2s ease, box-shadow .2s ease; animation:fadeUp .4s both}
tbody tr:hover{transform:translateY(-2px); box-shadow:0 14px 32px rgba(2,6,23,.12)}
tbody td{padding:10px 8px; border-top:1px solid #eef2f7; border-bottom:1px solid #eef2f7}
tbody tr td:first-child{border-radius:14px 0 0 14px}
tbody tr td:last-child{border-radius:0 14px 14px 0}
.bar{height:10px; background:#eef2ff; border-radius:999px; overflow:hidden}
.bar > span{display:block; height:100%; width:0%; background:linear-gradient(90deg,var(--g3),var(--accent)); transition:width .8s ease}

/* Absences */
.abs-list{display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px}
.abs-item{background:#f8fafc; border-radius:12px; padding:14px; display:flex; align-items:center; justify-content:space-between}
.badge{display:inline-block; padding:6px 10px; border-radius:999px; font-weight:800; font-size:12px}
.badge.ok{background:#ecfdf5; color:#065f46}
.badge.abs{background:#fee2e2; color:#991b1b}

@keyframes fadeUp{from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:translateY(0)}}
</style>
</head>
<body>
<header class="header">
  <div class="nav">
    <div class="logo"><div class="cap">🎓</div><span>مدرسة النبي اليتيم</span></div>
    <nav class="tabs">
      <a class="tab" href="#">الرئيسية</a>
      <a class="tab active" href="#">صفحة التلميذ</a>
      <a class="tab" href="#">اتصل بنا</a>
    </nav>
  </div>
</header>

<main class="main">

  <!-- Timetable -->
  <section class="card">
    <h2 class="section-title">مواقيت الحصص</h2>
    <div class="timetable" id="tt"></div>
    <div class="legend">
      <span class="dot" style="background:#60a5fa"></span> مواد علمية
      <span class="dot" style="background:#f59e0b"></span> مواد أدبية
      <span class="dot" style="background:#34d399"></span> أنشطة
    </div>
  </section>

  <!-- Results -->
  <section class="card">
    <div class="results-head">
      <h2 class="section-title">نتائجي</h2>
      <div class="metric">المعدل الحالي: <span id="avg">0.00</span> /20</div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>المادة</th><th style="width:120px">العلامة</th><th>المخطط</th><th style="width:120px">التقدير</th></tr></thead>
        <tbody id="resBody"></tbody>
      </table>
    </div>
  </section>

  <!-- Absences -->
  <section class="card">
    <h2 class="section-title">سجلّ الغيابات</h2>
    <div class="abs-list" id="absList"></div>
  </section>

</main>

<script>
// ------- Timetable mock -------
const days = ["الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"];
const slots = ["08:00-09:00","09:10-10:10","10:20-11:20","11:30-12:30","14:00-15:00"];
const plan = {
  "الاثنين":   ["رياضيات","علوم","لغة عربية","رياضيات","تربية بدنية"],
  "الثلاثاء":  ["علوم","فرنسية","اجتماعيات","علوم","نشاط"],
  "الأربعاء":  ["لغة عربية","إنجليزية","رياضيات","علوم","نشاط"],
  "الخميس":    ["رياضيات","علوم","اجتماعيات","لغة عربية","فراغ"],
  "الجمعة":    ["قرآن","رياضيات","فرنسية","علوم","نشاط"]
};
const colors = {
  "رياضيات":"#60a5fa","علوم":"#60a5fa","إنجليزية":"#f59e0b","لغة عربية":"#f59e0b","فرنسية":"#f59e0b","اجتماعيات":"#f59e0b",
  "تربية بدنية":"#34d399","نشاط":"#34d399","قرآن":"#34d399","فراغ":"#d1d5db"
};
const tt = document.getElementById('tt');
// header row
tt.append(el('div','cell time','الحصة \\ اليوم'));
days.forEach(d=>tt.append(el('div','cell day',d)));
// rows
slots.forEach((s,i)=>{
  tt.append(el('div','cell time',s));
  days.forEach(d=>{
    const sub = plan[d][i] || "—";
    const c = colors[sub] || "#e5e7eb";
    const cell = el('div','cell',sub);
    cell.style.borderColor = c; cell.style.background = "#ffffff";
    cell.style.boxShadow = "inset 0 0 0 3px " + c + "22";
    tt.append(cell);
  });
});
function el(tag, cls, txt){ const x=document.createElement(tag); x.className=cls; x.textContent=txt; return x; }

// ------- Results mock -------
const results = [
  {subject:"رياضيات", grade:16.5},
  {subject:"علوم", grade:15},
  {subject:"لغة عربية", grade:13},
  {subject:"إنجليزية", grade:14.5},
  {subject:"فرنسية", grade:12},
  {subject:"اجتماعيات", grade:17}
];
const resBody = document.getElementById('resBody');
results.forEach((r, i)=>{
  const tr=document.createElement('tr');
  tr.style.animationDelay = (i*0.05)+"s";
  tr.innerHTML = `
    <td><b>${r.subject}</b></td>
    <td>${r.grade.toFixed(2)}</td>
    <td><div class="bar"><span style="width:${r.grade/20*100}%"></span></div></td>
    <td>${gradeLabel(r.grade)}</td>`;
  resBody.appendChild(tr);
});
const avg = results.reduce((a,b)=>a+b.grade,0)/results.length;
document.getElementById('avg').textContent = avg.toFixed(2);
function gradeLabel(v){ if(v>=16) return "ممتاز"; if(v>=14) return "جيد جدًا"; if(v>=12) return "جيد"; if(v>=10) return "مقبول"; return "ضعيف"; }

// ------- Absences mock -------
const absences = [
  {date:"2025-09-28", session:"علوم (09:10)", status:"غائب"},
  {date:"2025-10-05", session:"رياضيات (08:00)", status:"حاضر"},
  {date:"2025-10-12", session:"لغة عربية (11:30)", status:"غائب"},
  {date:"2025-10-19", session:"إنجليزية (10:20)", status:"متأخر"}
];
const absList = document.getElementById('absList');
absences.forEach((a,i)=>{
  const item=document.createElement('div');
  item.className="abs-item";
  const badgeClass = a.status==="غائب" ? "badge abs" : "badge ok";
  item.innerHTML = `<div><b>${a.date}</b> — ${a.session}</div><span class="${badgeClass}">${a.status}</span>`;
  item.style.animation = "fadeUp .4s both"; item.style.animationDelay=(i*0.04)+"s";
  absList.appendChild(item);
});
</script>
</body>
</html>
