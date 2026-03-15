import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const initialPatients = [
  { id: 1, name: "Amara Osei", age: 34, gender: "Female", phone: "072 345 6789", status: "Active", condition: "Hypertension", lastVisit: "Mar 5, 2026", address: "12 Bree St, Johannesburg", notes: "Patient on Amlodipine 5mg daily. Blood pressure monitored monthly." },
  { id: 2, name: "Liam Botha", age: 52, gender: "Male", phone: "083 210 0987", status: "Active", condition: "Diabetes Type 2", lastVisit: "Mar 6, 2026", address: "45 Long St, Cape Town", notes: "Metformin 850mg twice daily. HbA1c last checked Feb 2026." },
  { id: 3, name: "Zanele Dlamini", age: 29, gender: "Female", phone: "061 789 1234", status: "Discharged", condition: "Appendectomy", lastVisit: "Feb 28, 2026", address: "8 Rivonia Rd, Sandton", notes: "Post-op recovery complete. Follow-up in 6 weeks." },
  { id: 4, name: "Sipho Mthembu", age: 45, gender: "Male", phone: "079 456 3210", status: "Active", condition: "Pneumonia", lastVisit: "Mar 7, 2026", address: "22 Smith St, Durban", notes: "Amoxicillin course started. Chest X-ray scheduled for Mar 14." },
  { id: 5, name: "Priya Naidoo", age: 38, gender: "Female", phone: "082 567 8901", status: "Pending", condition: "Migraine", lastVisit: "Mar 4, 2026", address: "5 Florida Rd, Durban", notes: "Awaiting MRI results. Sumatriptan prescribed for acute attacks." },
];

const initialAppointments = [
  { id: 1, patient: "Amara Osei", doctor: "Dr. Mensah", time: "09:00", dept: "Cardiology", status: "Scheduled", date: "Mar 7, 2026", notes: "Follow-up ECG review" },
  { id: 2, patient: "Liam Botha", doctor: "Dr. Van Wyk", time: "10:30", dept: "Endocrinology", status: "Completed", date: "Mar 7, 2026", notes: "HbA1c results review" },
  { id: 3, patient: "Sipho Mthembu", doctor: "Dr. Mensah", time: "11:00", dept: "Pulmonology", status: "Scheduled", date: "Mar 7, 2026", notes: "Pneumonia progress check" },
  { id: 4, patient: "Priya Naidoo", doctor: "Dr. Patel", time: "14:00", dept: "Neurology", status: "Cancelled", date: "Mar 7, 2026", notes: "MRI consultation - rescheduling needed" },
  { id: 5, patient: "Thandi Khumalo", doctor: "Dr. Patel", time: "15:30", dept: "General", status: "Scheduled", date: "Mar 7, 2026", notes: "General check-up" },
];

const initialDoctors = [
  { id: 1, name: "Dr. Kwame Mensah", spec: "Cardiology / Pulmonology", patients: 14, status: "On Duty", avatar: "KM", phone: "011 234 5678", email: "k.mensah@medicore.co.za", schedule: "Mon–Fri 08:00–17:00" },
  { id: 2, name: "Dr. Sasha Van Wyk", spec: "Endocrinology", patients: 9, status: "On Duty", avatar: "SV", phone: "011 345 6789", email: "s.vanwyk@medicore.co.za", schedule: "Mon–Thu 09:00–16:00" },
  { id: 3, name: "Dr. Riya Patel", spec: "Neurology", patients: 11, status: "Off Duty", avatar: "RP", phone: "011 456 7890", email: "r.patel@medicore.co.za", schedule: "Tue–Sat 10:00–18:00" },
  { id: 4, name: "Dr. Thabo Sithole", spec: "Surgery", patients: 7, status: "On Duty", avatar: "TS", phone: "011 567 8901", email: "t.sithole@medicore.co.za", schedule: "Mon–Fri 07:00–15:00" },
];

const initialBills = [
  { id: "B-2026-041", patient: "Amara Osei", services: "Consultation + ECG", amount: 1850, status: "Paid", date: "Mar 5" },
  { id: "B-2026-042", patient: "Liam Botha", services: "Lab Tests + Medication", amount: 3200, status: "Pending", date: "Mar 6" },
  { id: "B-2026-043", patient: "Sipho Mthembu", services: "X-Ray + Antibiotics", amount: 2750, status: "Pending", date: "Mar 7" },
  { id: "B-2026-044", patient: "Zanele Dlamini", services: "Surgery + Ward (3d)", amount: 18400, status: "Paid", date: "Feb 28" },
  { id: "B-2026-045", patient: "Priya Naidoo", services: "MRI Scan", amount: 4500, status: "Overdue", date: "Mar 4" },
];

const weekData = [
  { day: "Mon", visits: 42 }, { day: "Tue", visits: 58 }, { day: "Wed", visits: 35 },
  { day: "Thu", visits: 67 }, { day: "Fri", visits: 81 }, { day: "Sat", visits: 29 }, { day: "Sun", visits: 18 },
];
const revenueData = [
  { month: "Oct", rev: 38 }, { month: "Nov", rev: 52 }, { month: "Dec", rev: 44 },
  { month: "Jan", rev: 61 }, { month: "Feb", rev: 57 }, { month: "Mar", rev: 72 },
];
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "patients", label: "Patients", icon: "♟" },
  { id: "appointments", label: "Appointments", icon: "◷" },
  { id: "doctors", label: "Doctors", icon: "✚" },
  { id: "billing", label: "Billing", icon: "◈" },
  { id: "reports", label: "Reports", icon: "▤" },
  { id: "settings", label: "Settings", icon: "◉" },
];
const maxVisits = Math.max(...weekData.map(d => d.visits));
const maxRev = Math.max(...revenueData.map(d => d.rev));

// ─── STYLES ──────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(79,156,249,0.3); border-radius: 10px; }
  .glass { background: rgba(255,255,255,0.22); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.45); box-shadow: 0 8px 32px rgba(79,130,200,0.12); }
  .neu-btn { background: #dce8f5; box-shadow: 5px 5px 10px #b8cde8, -5px -5px 10px #ffffff; border: none; cursor: pointer; transition: all 0.15s ease; font-family: 'Outfit', sans-serif; }
  .neu-btn:hover { box-shadow: 7px 7px 14px #b0c8e5, -7px -7px 14px #ffffff; }
  .neu-btn:active { box-shadow: inset 4px 4px 10px #b8cde8, inset -4px -4px 10px #ffffff; }
  .nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 12px; cursor: pointer; transition: all 0.2s ease; color: #5580a8; font-size: 14px; font-weight: 500; margin-bottom: 4px; }
  .nav-item:hover { background: rgba(79,156,249,0.1); color: #2a60b0; }
  .nav-item.active { background: rgba(79,156,249,0.18); color: #2055c0; font-weight: 600; box-shadow: inset 3px 3px 8px rgba(79,156,249,0.15), inset -2px -2px 6px rgba(255,255,255,0.7); }
  .stat-card { border-radius: 20px; padding: 22px 24px; position: relative; overflow: hidden; transition: transform 0.2s ease; }
  .stat-card:hover { transform: translateY(-3px); }
  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; }
  .badge-scheduled { background: rgba(79,156,249,0.15); color: #2a6fd4; }
  .badge-completed { background: rgba(0,200,150,0.15); color: #00905a; }
  .badge-cancelled { background: rgba(255,100,100,0.15); color: #cc3030; }
  .badge-pending { background: rgba(255,180,50,0.15); color: #b87010; }
  .badge-paid { background: rgba(0,200,150,0.15); color: #00905a; }
  .badge-overdue { background: rgba(255,100,100,0.15); color: #cc3030; }
  .badge-active { background: rgba(0,200,150,0.12); color: #007a50; }
  .badge-discharged { background: rgba(150,150,180,0.15); color: #5055aa; }
  .table-row { transition: background 0.15s ease; border-bottom: 1px solid rgba(100,140,200,0.1); }
  .table-row:hover { background: rgba(79,156,249,0.06); }
  .chart-bar { transition: opacity 0.2s; cursor: default; }
  .chart-bar:hover { opacity: 0.8; }
  .avatar { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: white; flex-shrink: 0; }
  .search-box { background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.6); border-radius: 12px; padding: 8px 16px; font-family: 'Outfit', sans-serif; font-size: 13px; color: #3a5a80; outline: none; width: 240px; backdrop-filter: blur(8px); }
  .search-box::placeholder { color: #8aabcc; }
  .search-box:focus { border-color: rgba(79,156,249,0.5); box-shadow: 0 0 0 3px rgba(79,156,249,0.1); }
  .section-title { font-size: 22px; font-weight: 700; color: #1a3a6a; letter-spacing: -0.02em; }
  .pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
  .fade-in { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
  .modal-overlay { position: fixed; inset: 0; background: rgba(20,40,80,0.35); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
  .modal-box { background: rgba(240,247,255,0.97); border-radius: 24px; padding: 32px; width: 520px; max-width: 95vw; max-height: 85vh; overflow-y: auto; box-shadow: 0 24px 80px rgba(20,60,140,0.25); border: 1px solid rgba(255,255,255,0.8); animation: fadeIn 0.2s ease; }
  .form-label { font-size: 11px; font-weight: 700; color: #7090b0; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; display: block; }
  .form-input { width: 100%; padding: 10px 14px; border-radius: 10px; border: 1.5px solid rgba(79,156,249,0.2); background: rgba(255,255,255,0.7); font-family: 'Outfit', sans-serif; font-size: 13px; color: #1a3a6a; outline: none; transition: border 0.2s; }
  .form-input:focus { border-color: #4F9CF9; box-shadow: 0 0 0 3px rgba(79,156,249,0.1); }
  .form-select { width: 100%; padding: 10px 14px; border-radius: 10px; border: 1.5px solid rgba(79,156,249,0.2); background: rgba(255,255,255,0.7); font-family: 'Outfit', sans-serif; font-size: 13px; color: #1a3a6a; outline: none; }
  .toggle-track { width: 44px; height: 24px; border-radius: 12px; cursor: pointer; transition: background 0.2s; position: relative; flex-shrink: 0; }
  .toggle-thumb { width: 18px; height: 18px; border-radius: 50%; background: white; position: absolute; top: 3px; transition: left 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.15); }
  .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(79,156,249,0.1); }
  .tab-btn { padding: 8px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; font-family: 'Outfit', sans-serif; transition: all 0.15s; }
  .tab-active { background: linear-gradient(135deg,#4F9CF9,#6ED3CF); color: white; box-shadow: 0 4px 14px rgba(79,156,249,0.35); }
  .tab-inactive { background: rgba(255,255,255,0.4); color: #5580a8; }
  .tab-inactive:hover { background: rgba(79,156,249,0.1); }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1a3a6a" }}>{title}</div>
          <button className="neu-btn" onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, fontSize: 16, color: "#7090b0" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
function FormRow({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>{children}</div>;
}
function Field({ label, children, mb = 14 }) {
  return <div style={{ marginBottom: mb }}><label className="form-label">{label}</label>{children}</div>;
}
function PrimaryBtn({ onClick, children, color = "#4F9CF9" }) {
  return (
    <button onClick={onClick} style={{ padding: "11px 24px", borderRadius: 12, background: `linear-gradient(135deg,${color},${color}cc)`, color: "white", border: "none", fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: `0 4px 14px ${color}55` }}>
      {children}
    </button>
  );
}
function StatCard({ label, value, sub, icon, gradient, accent }) {
  return (
    <div className="stat-card glass">
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "0 20px 0 80px", background: gradient, opacity: 0.25 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: "#7090b0", fontWeight: 500, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#1a3a6a", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
          <div style={{ fontSize: 12, color: accent || "#00C896", fontWeight: 600, marginTop: 6 }}>{sub}</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 6px 16px rgba(0,0,0,0.12)" }}>{icon}</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function HMS() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifs, setShowNotifs] = useState(false);
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [bills, setBills] = useState(initialBills);
  const shared = { patients, setPatients, appointments, setAppointments, doctors, setDoctors, bills, setBills };

  const notifications = [
    { id: 1, icon: "📋", title: "New appointment booked", desc: "Thandi Khumalo — Dr. Patel at 15:30", time: "5 min ago", unread: true },
    { id: 2, icon: "💳", title: "Invoice overdue", desc: "B-2026-045 · Priya Naidoo · R 4,500", time: "1 hr ago", unread: true },
    { id: 3, icon: "✅", title: "Appointment completed", desc: "Liam Botha — Dr. Van Wyk", time: "2 hrs ago", unread: true },
    { id: 4, icon: "🩺", title: "Dr. Patel went off duty", desc: "Neurology appointments may need reassigning", time: "3 hrs ago", unread: false },
    { id: 5, icon: "👤", title: "New patient registered", desc: "Priya Naidoo added to the system", time: "Yesterday", unread: false },
  ];

  return (
    <div style={{ fontFamily: "'Outfit','DM Sans',sans-serif", minHeight: "100vh", background: "linear-gradient(135deg,#c8d8f0 0%,#dde8f5 40%,#e8f0fa 70%,#d0e4f2 100%)", display: "flex", overflow: "hidden" }}>
      <style>{CSS}</style>
      <div style={{ position: "fixed", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(79,156,249,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -80, right: -80, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(110,211,207,0.18) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* SIDEBAR */}
      <div className="glass" style={{ width: sidebarOpen ? 230 : 68, minHeight: "100vh", padding: sidebarOpen ? "28px 16px" : "28px 10px", display: "flex", flexDirection: "column", gap: 8, borderRadius: "0 24px 24px 0", transition: "width 0.3s,padding 0.3s", zIndex: 10, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 4px 24px", borderBottom: "1px solid rgba(79,156,249,0.15)" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#4F9CF9,#6ED3CF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, boxShadow: "0 4px 12px rgba(79,156,249,0.4)" }}>✚</div>
          {sidebarOpen && <div><div style={{ fontSize: 15, fontWeight: 800, color: "#1a3a6a" }}>MediCore</div><div style={{ fontSize: 10, color: "#7090b0", fontWeight: 500, letterSpacing: "0.08em" }}>HMS PLATFORM</div></div>}
        </div>
        <nav style={{ flex: 1, marginTop: 8 }}>
          {navItems.map(item => (
            <div key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </nav>
        <div style={{ paddingTop: 16, borderTop: "1px solid rgba(79,156,249,0.15)", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="avatar" style={{ background: "linear-gradient(135deg,#4F9CF9,#4070e0)", width: 36, height: 36, fontSize: 12 }}>AD</div>
          {sidebarOpen && <div><div style={{ fontSize: 12, fontWeight: 600, color: "#1a3a6a" }}>Admin User</div><div style={{ fontSize: 10, color: "#8aabcc" }}>Administrator</div></div>}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
        <div className="glass" style={{ borderRadius: "0 0 20px 0", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button className="neu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ padding: "8px 10px", borderRadius: 10, fontSize: 16 }}>☰</button>
            <div style={{ fontSize: 13, color: "#7090b0" }}>
              <span style={{ color: "#1a3a6a", fontWeight: 600 }}>{navItems.find(n => n.id === active)?.label}</span>
              <span style={{ margin: "0 6px" }}>·</span>
              <span>Saturday, March 7, 2026</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input className="search-box" placeholder="Search patients, doctors…" />

            {/* 🔔 Notifications */}
            <div style={{ position: "relative" }}>
              <button className="neu-btn" onClick={() => setShowNotifs(v => !v)} style={{ padding: "8px 12px", borderRadius: 10, fontSize: 15, position: "relative" }}>
                🔔
                <span style={{ position: "absolute", top: 6, right: 8, width: 7, height: 7, background: "#FF6464", borderRadius: "50%", border: "1.5px solid #dce8f5" }} />
              </button>
              {showNotifs && (
                <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 340, background: "rgba(240,247,255,0.98)", borderRadius: 18, boxShadow: "0 16px 48px rgba(20,60,140,0.2)", border: "1px solid rgba(255,255,255,0.8)", zIndex: 500, overflow: "hidden", backdropFilter: "blur(18px)" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(79,156,249,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1a3a6a" }}>Notifications</div>
                    <span style={{ fontSize: 11, background: "#FF6464", color: "white", padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>{notifications.filter(n => n.unread).length} new</span>
                  </div>
                  <div style={{ maxHeight: 320, overflowY: "auto" }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ display: "flex", gap: 12, padding: "13px 20px", borderBottom: "1px solid rgba(79,156,249,0.08)", background: n.unread ? "rgba(79,156,249,0.04)" : "transparent", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(79,156,249,0.09)"}
                        onMouseLeave={e => e.currentTarget.style.background = n.unread ? "rgba(79,156,249,0.04)" : "transparent"}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(79,156,249,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{n.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: n.unread ? 700 : 500, color: "#1a3a6a", marginBottom: 2 }}>{n.title}</div>
                          <div style={{ fontSize: 11, color: "#7090b0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.desc}</div>
                          <div style={{ fontSize: 10, color: "#aabbd0", marginTop: 3 }}>{n.time}</div>
                        </div>
                        {n.unread && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4F9CF9", flexShrink: 0, marginTop: 6 }} />}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "12px 20px" }}>
                    <button className="neu-btn" onClick={() => setShowNotifs(false)} style={{ padding: "8px 0", borderRadius: 10, fontSize: 12, color: "#4F9CF9", fontWeight: 600, width: "100%" }}>Mark all as read</button>
                  </div>
                </div>
              )}
            </div>

            {/* ⚙ Settings */}
            <button className="neu-btn" onClick={() => { setActive("settings"); setShowNotifs(false); }}
              style={{ padding: "8px 12px", borderRadius: 10, fontSize: 15, boxShadow: active === "settings" ? "inset 4px 4px 10px #b8cde8, inset -4px -4px 10px #ffffff" : undefined }}>⚙</button>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }} className="fade-in" key={active}>
          {active === "dashboard"    && <DashboardView    {...shared} setActive={setActive} />}
          {active === "patients"     && <PatientsView     {...shared} />}
          {active === "appointments" && <AppointmentsView {...shared} />}
          {active === "doctors"      && <DoctorsView      {...shared} />}
          {active === "billing"      && <BillingView      {...shared} />}
          {active === "reports"      && <ReportsView      {...shared} />}
          {active === "settings"     && <SettingsView />}
        </div>
      </div>
    </div>
  );
}

// ─── APPOINTMENT TABLE ────────────────────────────────────────────────────────
function ApptTable({ data, onView, onReschedule, onCancel }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ borderBottom: "2px solid rgba(79,156,249,0.15)" }}>
          {["Patient","Doctor","Department","Time","Status","Actions"].map(h => (
            <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#8aabcc", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(a => (
          <tr key={a.id} className="table-row">
            <td style={{ padding: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="avatar" style={{ background: `hsl(${a.id*60},60%,55%)`, width: 32, height: 32, fontSize: 11, borderRadius: 8 }}>{a.patient.split(" ").map(w=>w[0]).join("")}</div>
                <span style={{ fontWeight: 600, color: "#1a3a6a" }}>{a.patient}</span>
              </div>
            </td>
            <td style={{ padding: "12px", color: "#3a5a80" }}>{a.doctor}</td>
            <td style={{ padding: "12px", color: "#5a7a9a" }}>{a.dept}</td>
            <td style={{ padding: "12px" }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#4F9CF9", fontWeight: 500 }}>{a.time}</span></td>
            <td style={{ padding: "12px" }}><span className={`badge badge-${a.status.toLowerCase()}`}>{a.status}</span></td>
            <td style={{ padding: "12px" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {onView && <button className="neu-btn" onClick={()=>onView(a)} style={{ padding:"5px 10px",borderRadius:8,fontSize:11,color:"#4F9CF9",fontWeight:600 }}>View</button>}
                {a.status==="Scheduled" && onReschedule && <button className="neu-btn" onClick={()=>onReschedule(a)} style={{ padding:"5px 10px",borderRadius:8,fontSize:11,color:"#f08000",fontWeight:600 }}>Reschedule</button>}
                {a.status==="Scheduled" && onCancel && <button className="neu-btn" onClick={()=>onCancel(a.id)} style={{ padding:"5px 10px",borderRadius:8,fontSize:11,color:"#cc3030",fontWeight:600 }}>Cancel</button>}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── BOOK APPOINTMENT MODAL ───────────────────────────────────────────────────
function BookApptModal({ onClose, onSave }) {
  const [f, setF] = useState({ patient:"", doctor:"", dept:"", time:"", date:"", notes:"" });
  const s = k => e => setF(v=>({...v,[k]:e.target.value}));
  return (
    <Modal title="Book New Appointment" onClose={onClose}>
      <FormRow>
        <Field label="Patient Name"><input className="form-input" value={f.patient} onChange={s("patient")} placeholder="Full name" /></Field>
        <Field label="Doctor"><select className="form-select" value={f.doctor} onChange={s("doctor")}><option value="">Select doctor</option><option>Dr. Mensah</option><option>Dr. Van Wyk</option><option>Dr. Patel</option><option>Dr. Sithole</option></select></Field>
      </FormRow>
      <FormRow>
        <Field label="Department"><select className="form-select" value={f.dept} onChange={s("dept")}><option value="">Select dept</option><option>Cardiology</option><option>Endocrinology</option><option>Neurology</option><option>Surgery</option><option>General</option><option>Pulmonology</option></select></Field>
        <Field label="Date"><input className="form-input" type="date" value={f.date} onChange={s("date")} /></Field>
      </FormRow>
      <FormRow><Field label="Time"><input className="form-input" type="time" value={f.time} onChange={s("time")} /></Field></FormRow>
      <Field label="Notes" mb={0}><textarea className="form-input" rows={3} value={f.notes} onChange={s("notes")} placeholder="Optional notes…" style={{ resize:"vertical" }} /></Field>
      <div style={{ display:"flex", gap:10, marginTop:24, justifyContent:"flex-end" }}>
        <button className="neu-btn" onClick={onClose} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Cancel</button>
        <PrimaryBtn onClick={()=>{onSave&&onSave(f);onClose();}}>Book Appointment</PrimaryBtn>
      </div>
    </Modal>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function DashboardView({ patients, appointments, bills, setActive }) {
  const [showBook, setShowBook] = useState(false);
  return (
    <div>
      {showBook && <BookApptModal onClose={()=>setShowBook(false)} />}
      <div style={{ marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <div><div className="section-title">Good morning, Admin 👋</div><div style={{ fontSize:13,color:"#7090b0",marginTop:4 }}>Here's what's happening at MediCore today.</div></div>
        <button className="neu-btn" onClick={()=>setShowBook(true)} style={{ padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,color:"#4F9CF9" }}>+ New Appointment</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <StatCard label="Total Patients" value={patients.length} sub="↑ 12 this week" icon="🫀" gradient="linear-gradient(135deg,#4F9CF9,#6ED3CF)" />
        <StatCard label="Today's Appointments" value={appointments.length} sub={`${appointments.filter(a=>a.status==="Scheduled").length} remaining`} icon="📋" gradient="linear-gradient(135deg,#6ED3CF,#00C896)" />
        <StatCard label="Doctors On Duty" value="9" sub="3 in surgery" icon="🩺" gradient="linear-gradient(135deg,#a78bfa,#7c3aed)" accent="#7c3aed" />
        <StatCard label="Pending Bills" value={`R ${bills.filter(b=>b.status!=="Paid").reduce((s,b)=>s+b.amount,0).toLocaleString()}`} sub={`${bills.filter(b=>b.status!=="Paid").length} invoices due`} icon="💳" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" accent="#ef8030" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:16, marginBottom:24 }}>
        <div className="glass" style={{ borderRadius:20, padding:"22px 24px" }}>
          <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a",marginBottom:4 }}>Patient Visits</div>
          <div style={{ fontSize:12,color:"#8aabcc",marginBottom:20 }}>This week — daily average 47</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:120 }}>
            {weekData.map((d,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div className="chart-bar" style={{ width:"100%", height:`${(d.visits/maxVisits)*100}px`, borderRadius:"8px 8px 4px 4px", background:i===4?"linear-gradient(to top,#4F9CF9,#6ED3CF)":"rgba(79,156,249,0.25)", minHeight:8 }} />
                <div style={{ fontSize:11,color:"#8aabcc",fontWeight:500 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass" style={{ borderRadius:20, padding:"22px 24px" }}>
          <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a",marginBottom:4 }}>Monthly Revenue</div>
          <div style={{ fontSize:12,color:"#8aabcc",marginBottom:6 }}>R 184,500 this month</div>
          <div style={{ fontSize:22,fontWeight:800,color:"#00C896",marginBottom:16 }}>↑ 26%</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:80 }}>
            {revenueData.map((d,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div className="chart-bar" style={{ width:"100%", height:`${(d.rev/maxRev)*70}px`, borderRadius:"6px 6px 3px 3px", background:i===5?"linear-gradient(to top,#00C896,#6ED3CF)":"rgba(0,200,150,0.2)", minHeight:6 }} />
                <div style={{ fontSize:10,color:"#8aabcc" }}>{d.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="glass" style={{ borderRadius:20, padding:"22px 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a" }}>Today's Appointments</div>
          <button className="neu-btn" onClick={()=>setActive("appointments")} style={{ padding:"6px 14px",borderRadius:8,fontSize:12,color:"#4F9CF9",fontWeight:600 }}>View All</button>
        </div>
        <ApptTable data={appointments.slice(0,4)} />
      </div>
    </div>
  );
}

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
function PatientsView({ patients, setPatients }) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [viewPt, setViewPt] = useState(null);
  const [editPt, setEditPt] = useState(null);
  const filtered = patients.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.condition.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {showAdd && <PatientFormModal title="Register New Patient" onClose={()=>setShowAdd(false)} onSave={f=>setPatients(ps=>[...ps,{...f,id:ps.length+1,age:parseInt(f.age),lastVisit:"Mar 7, 2026"}])} />}
      {viewPt && <PatientProfileModal patient={viewPt} onClose={()=>setViewPt(null)} onEdit={()=>{setEditPt(viewPt);setViewPt(null);}} />}
      {editPt && <PatientFormModal title="Edit Patient" initial={editPt} onClose={()=>setEditPt(null)} onSave={f=>setPatients(ps=>ps.map(p=>p.id===editPt.id?{...p,...f,age:parseInt(f.age)}:p))} />}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
        <div><div className="section-title">Patients</div><div style={{ fontSize:13,color:"#7090b0",marginTop:4 }}>{patients.length} total registered patients</div></div>
        <div style={{ display:"flex", gap:10 }}>
          <input className="search-box" placeholder="Search patients…" value={search} onChange={e=>setSearch(e.target.value)} />
          <button className="neu-btn" onClick={()=>setShowAdd(true)} style={{ padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,color:"#4F9CF9" }}>+ Register Patient</button>
        </div>
      </div>
      <div className="glass" style={{ borderRadius:20, padding:"22px 24px" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid rgba(79,156,249,0.15)" }}>
              {["Patient","Age","Gender","Phone","Condition","Last Visit","Status",""].map(h=>(
                <th key={h} style={{ padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#8aabcc",letterSpacing:"0.06em",textTransform:"uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id} className="table-row">
                <td style={{ padding:"14px 12px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <div className="avatar" style={{ background:`hsl(${p.id*70+20},55%,55%)`,width:34,height:34,fontSize:11,borderRadius:9 }}>{p.name.split(" ").map(w=>w[0]).join("")}</div>
                    <span style={{ fontWeight:600,color:"#1a3a6a" }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding:"14px 12px",color:"#3a5a80" }}>{p.age}</td>
                <td style={{ padding:"14px 12px",color:"#5a7a9a" }}>{p.gender}</td>
                <td style={{ padding:"14px 12px",fontFamily:"'DM Mono',monospace",fontSize:12,color:"#5a7a9a" }}>{p.phone}</td>
                <td style={{ padding:"14px 12px",color:"#3a5a80",fontWeight:500 }}>{p.condition}</td>
                <td style={{ padding:"14px 12px",color:"#7090b0",fontSize:12 }}>{p.lastVisit}</td>
                <td style={{ padding:"14px 12px" }}><span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span></td>
                <td style={{ padding:"14px 12px" }}>
                  <div style={{ display:"flex",gap:6 }}>
                    <button className="neu-btn" onClick={()=>setViewPt(p)} style={{ padding:"5px 12px",borderRadius:8,fontSize:11,color:"#4F9CF9",fontWeight:600 }}>View</button>
                    <button className="neu-btn" onClick={()=>setEditPt(p)} style={{ padding:"5px 12px",borderRadius:8,fontSize:11,color:"#5a7a9a" }}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PatientFormModal({ title, initial={}, onClose, onSave }) {
  const [f,setF] = useState({ name:initial.name||"", age:initial.age||"", gender:initial.gender||"Female", phone:initial.phone||"", address:initial.address||"", condition:initial.condition||"", status:initial.status||"Active", notes:initial.notes||"" });
  const s = k => e => setF(v=>({...v,[k]:e.target.value}));
  return (
    <Modal title={title} onClose={onClose}>
      <FormRow><Field label="Full Name"><input className="form-input" value={f.name} onChange={s("name")} placeholder="Full name" /></Field><Field label="Age"><input className="form-input" type="number" value={f.age} onChange={s("age")} placeholder="Age" /></Field></FormRow>
      <FormRow><Field label="Gender"><select className="form-select" value={f.gender} onChange={s("gender")}><option>Female</option><option>Male</option><option>Other</option></select></Field><Field label="Phone"><input className="form-input" value={f.phone} onChange={s("phone")} placeholder="07x xxx xxxx" /></Field></FormRow>
      <Field label="Address"><input className="form-input" value={f.address} onChange={s("address")} placeholder="Street address" /></Field>
      <FormRow><Field label="Condition"><input className="form-input" value={f.condition} onChange={s("condition")} placeholder="Primary condition" /></Field><Field label="Status"><select className="form-select" value={f.status} onChange={s("status")}><option>Active</option><option>Discharged</option><option>Pending</option></select></Field></FormRow>
      <Field label="Medical Notes" mb={0}><textarea className="form-input" rows={3} value={f.notes} onChange={s("notes")} placeholder="Medical history notes…" style={{ resize:"vertical" }} /></Field>
      <div style={{ display:"flex",gap:10,marginTop:24,justifyContent:"flex-end" }}>
        <button className="neu-btn" onClick={onClose} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Cancel</button>
        <PrimaryBtn onClick={()=>{onSave(f);onClose();}}>Save Patient</PrimaryBtn>
      </div>
    </Modal>
  );
}

function PatientProfileModal({ patient, onClose, onEdit }) {
  return (
    <Modal title="Patient Profile" onClose={onClose}>
      <div style={{ display:"flex",gap:16,alignItems:"center",marginBottom:24,padding:"16px 20px",background:"rgba(79,156,249,0.07)",borderRadius:14 }}>
        <div className="avatar" style={{ background:`hsl(${patient.id*70+20},55%,55%)`,width:56,height:56,fontSize:18,borderRadius:14 }}>{patient.name.split(" ").map(w=>w[0]).join("")}</div>
        <div><div style={{ fontSize:18,fontWeight:700,color:"#1a3a6a" }}>{patient.name}</div><div style={{ fontSize:13,color:"#7090b0" }}>{patient.age} yrs · {patient.gender}</div><span className={`badge badge-${patient.status.toLowerCase()}`} style={{ marginTop:6,display:"inline-flex" }}>{patient.status}</span></div>
      </div>
      {[["📞 Phone",patient.phone],["🏠 Address",patient.address],["🩺 Condition",patient.condition],["📅 Last Visit",patient.lastVisit]].map(([l,v])=>(
        <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(79,156,249,0.1)" }}>
          <span style={{ fontSize:13,color:"#8aabcc",fontWeight:600 }}>{l}</span>
          <span style={{ fontSize:13,color:"#1a3a6a",fontWeight:500 }}>{v}</span>
        </div>
      ))}
      <div style={{ marginTop:16 }}>
        <div style={{ fontSize:11,fontWeight:700,color:"#8aabcc",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8 }}>Medical Notes</div>
        <div style={{ fontSize:13,color:"#3a5a80",lineHeight:1.6,background:"rgba(79,156,249,0.05)",padding:"12px 14px",borderRadius:10 }}>{patient.notes}</div>
      </div>
      <div style={{ display:"flex",gap:10,marginTop:24,justifyContent:"flex-end" }}>
        <button className="neu-btn" onClick={onClose} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Close</button>
        <PrimaryBtn onClick={onEdit}>Edit Patient</PrimaryBtn>
      </div>
    </Modal>
  );
}

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
function AppointmentsView({ appointments, setAppointments }) {
  const [showBook, setShowBook] = useState(false);
  const [viewA, setViewA] = useState(null);
  const [reschedA, setReschedA] = useState(null);
  const cancel = id => setAppointments(as=>as.map(a=>a.id===id?{...a,status:"Cancelled"}:a));
  const saveResched = (id,f) => setAppointments(as=>as.map(a=>a.id===id?{...a,...f}:a));
  const saveBook = f => setAppointments(as=>[...as,{id:as.length+1,...f,status:"Scheduled"}]);
  return (
    <div>
      {showBook && <BookApptModal onClose={()=>setShowBook(false)} onSave={saveBook} />}
      {viewA && <Modal title="Appointment Details" onClose={()=>setViewA(null)}>
        {[["Patient",viewA.patient],["Doctor",viewA.doctor],["Department",viewA.dept],["Date",viewA.date],["Time",viewA.time],["Notes",viewA.notes]].map(([l,v])=>(
          <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid rgba(79,156,249,0.1)" }}>
            <span style={{ fontSize:13,color:"#8aabcc",fontWeight:600 }}>{l}</span>
            <span style={{ fontSize:13,color:"#1a3a6a",fontWeight:500 }}>{v}</span>
          </div>
        ))}
        <div style={{ display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid rgba(79,156,249,0.1)" }}><span style={{ fontSize:13,color:"#8aabcc",fontWeight:600 }}>Status</span><span className={`badge badge-${viewA.status.toLowerCase()}`}>{viewA.status}</span></div>
        <div style={{ marginTop:24,display:"flex",justifyContent:"flex-end" }}><button className="neu-btn" onClick={()=>setViewA(null)} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Close</button></div>
      </Modal>}
      {reschedA && <Modal title={`Reschedule — ${reschedA.patient}`} onClose={()=>setReschedA(null)}>
        <ReschedForm appt={reschedA} onSave={f=>{saveResched(reschedA.id,f);setReschedA(null);}} onClose={()=>setReschedA(null)} />
      </Modal>}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24 }}>
        <div><div className="section-title">Appointments</div><div style={{ fontSize:13,color:"#7090b0",marginTop:4 }}>Saturday, March 7, 2026</div></div>
        <button className="neu-btn" onClick={()=>setShowBook(true)} style={{ padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,color:"#4F9CF9" }}>+ Book Appointment</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20 }}>
        {[["Scheduled","#4F9CF9"],["Completed","#00C896"],["Cancelled","#FF6464"]].map(([label,color])=>(
          <div key={label} className="glass" style={{ borderRadius:14,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span style={{ fontSize:13,color:"#5a7a9a",fontWeight:500 }}>{label}</span>
            <span style={{ fontSize:26,fontWeight:800,color }}>{appointments.filter(a=>a.status===label).length}</span>
          </div>
        ))}
      </div>
      <div className="glass" style={{ borderRadius:20,padding:"22px 24px" }}>
        <ApptTable data={appointments} onView={setViewA} onReschedule={setReschedA} onCancel={cancel} />
      </div>
    </div>
  );
}
function ReschedForm({ appt, onSave, onClose }) {
  const [time,setTime] = useState(appt.time);
  const [date,setDate] = useState("");
  const [notes,setNotes] = useState(appt.notes);
  return (
    <>
      <FormRow><Field label="New Date"><input className="form-input" type="date" value={date} onChange={e=>setDate(e.target.value)} /></Field><Field label="New Time"><input className="form-input" type="time" value={time} onChange={e=>setTime(e.target.value)} /></Field></FormRow>
      <Field label="Notes" mb={0}><textarea className="form-input" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} style={{ resize:"vertical" }} /></Field>
      <div style={{ display:"flex",gap:10,marginTop:24,justifyContent:"flex-end" }}>
        <button className="neu-btn" onClick={onClose} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Cancel</button>
        <PrimaryBtn onClick={()=>onSave({time,date,notes})}>Save Changes</PrimaryBtn>
      </div>
    </>
  );
}

// ─── DOCTORS ──────────────────────────────────────────────────────────────────
function DoctorsView({ doctors, setDoctors }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editD, setEditD] = useState(null);
  const [viewSched, setViewSched] = useState(null);
  return (
    <div>
      {showAdd && <DoctorFormModal title="Add Doctor" onClose={()=>setShowAdd(false)} onSave={f=>setDoctors(ds=>[...ds,{...f,id:ds.length+1,patients:0,avatar:f.name.split(" ").filter((_,i)=>i>0).map(w=>w[0]).join("").toUpperCase().slice(0,2)}])} />}
      {editD && <DoctorFormModal title="Edit Doctor" initial={editD} onClose={()=>setEditD(null)} onSave={f=>setDoctors(ds=>ds.map(d=>d.id===editD.id?{...d,...f}:d))} />}
      {viewSched && <DoctorSchedModal doctor={viewSched} onClose={()=>setViewSched(null)} />}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24 }}>
        <div><div className="section-title">Doctors</div><div style={{ fontSize:13,color:"#7090b0",marginTop:4 }}>{doctors.filter(d=>d.status==="On Duty").length} on duty today</div></div>
        <button className="neu-btn" onClick={()=>setShowAdd(true)} style={{ padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,color:"#4F9CF9" }}>+ Add Doctor</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16 }}>
        {doctors.map(d=>(
          <div key={d.id} className="glass" style={{ borderRadius:20,padding:"22px 24px",display:"flex",gap:18,alignItems:"flex-start" }}>
            <div className="avatar" style={{ background:`hsl(${d.id*80+180},55%,50%)`,width:52,height:52,fontSize:16,borderRadius:15 }}>{d.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                <div><div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a" }}>{d.name}</div><div style={{ fontSize:12,color:"#7090b0",marginTop:2 }}>{d.spec}</div></div>
                <span className={`badge ${d.status==="On Duty"?"badge-active":"badge-discharged"}`}>{d.status==="On Duty"&&<span className="pulse" style={{ display:"inline-block",width:6,height:6,background:"#00C896",borderRadius:"50%",marginRight:4 }}/>}{d.status}</span>
              </div>
              <div style={{ display:"flex",gap:16,marginTop:14,alignItems:"center" }}>
                <div style={{ textAlign:"center" }}><div style={{ fontSize:18,fontWeight:800,color:"#4F9CF9" }}>{d.patients}</div><div style={{ fontSize:10,color:"#8aabcc",textTransform:"uppercase",letterSpacing:"0.05em" }}>Patients</div></div>
                <div style={{ height:36,width:1,background:"rgba(79,156,249,0.15)" }}/>
                <button className="neu-btn" onClick={()=>setViewSched(d)} style={{ padding:"6px 14px",borderRadius:9,fontSize:12,color:"#4F9CF9",fontWeight:600 }}>View Schedule</button>
                <button className="neu-btn" onClick={()=>setEditD(d)} style={{ padding:"6px 14px",borderRadius:9,fontSize:12,color:"#5a7a9a" }}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function DoctorFormModal({ title, initial={}, onClose, onSave }) {
  const [f,setF] = useState({ name:initial.name||"", spec:initial.spec||"", phone:initial.phone||"", email:initial.email||"", schedule:initial.schedule||"", status:initial.status||"On Duty" });
  const s = k => e => setF(v=>({...v,[k]:e.target.value}));
  return (
    <Modal title={title} onClose={onClose}>
      <FormRow><Field label="Full Name"><input className="form-input" value={f.name} onChange={s("name")} placeholder="Dr. First Last" /></Field><Field label="Specialization"><input className="form-input" value={f.spec} onChange={s("spec")} placeholder="e.g. Cardiology" /></Field></FormRow>
      <FormRow><Field label="Phone"><input className="form-input" value={f.phone} onChange={s("phone")} placeholder="011 xxx xxxx" /></Field><Field label="Email"><input className="form-input" value={f.email} onChange={s("email")} placeholder="dr@medicore.co.za" /></Field></FormRow>
      <FormRow><Field label="Schedule"><input className="form-input" value={f.schedule} onChange={s("schedule")} placeholder="Mon–Fri 08:00–17:00" /></Field><Field label="Status"><select className="form-select" value={f.status} onChange={s("status")}><option>On Duty</option><option>Off Duty</option></select></Field></FormRow>
      <div style={{ display:"flex",gap:10,marginTop:24,justifyContent:"flex-end" }}>
        <button className="neu-btn" onClick={onClose} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Cancel</button>
        <PrimaryBtn onClick={()=>{onSave(f);onClose();}}>Save Doctor</PrimaryBtn>
      </div>
    </Modal>
  );
}
function DoctorSchedModal({ doctor, onClose }) {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const dayAbbrs = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return (
    <Modal title={`Schedule — ${doctor.name}`} onClose={onClose}>
      <div style={{ display:"flex",gap:16,alignItems:"center",marginBottom:20,padding:"14px 16px",background:"rgba(79,156,249,0.07)",borderRadius:12 }}>
        <div className="avatar" style={{ background:`hsl(${doctor.id*80+180},55%,50%)`,width:48,height:48,fontSize:15,borderRadius:12 }}>{doctor.avatar}</div>
        <div><div style={{ fontWeight:700,color:"#1a3a6a" }}>{doctor.name}</div><div style={{ fontSize:12,color:"#7090b0" }}>{doctor.spec}</div><div style={{ fontSize:12,color:"#4F9CF9",marginTop:4 }}>🕐 {doctor.schedule}</div></div>
      </div>
      {days.map((day,i) => {
        const on = doctor.schedule.includes(dayAbbrs[i]);
        return (
          <div key={day} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(79,156,249,0.08)" }}>
            <span style={{ fontSize:13,color:on?"#1a3a6a":"#aabbcc",fontWeight:on?600:400 }}>{day}</span>
            {on ? <span style={{ fontSize:12,color:"#00905a",background:"rgba(0,200,150,0.1)",padding:"3px 10px",borderRadius:20,fontWeight:600 }}>Available</span> : <span style={{ fontSize:12,color:"#aabbcc" }}>Off</span>}
          </div>
        );
      })}
      <div style={{ marginTop:24,display:"flex",justifyContent:"flex-end" }}><button className="neu-btn" onClick={onClose} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Close</button></div>
    </Modal>
  );
}

// ─── BILLING ──────────────────────────────────────────────────────────────────
function BillingView({ bills, setBills, patients }) {
  const [showCreate, setShowCreate] = useState(false);
  const [viewB, setViewB] = useState(null);
  const markPaid = id => setBills(bs=>bs.map(b=>b.id===id?{...b,status:"Paid"}:b));
  const totalPending = bills.filter(b=>b.status!=="Paid").reduce((s,b)=>s+b.amount,0);
  return (
    <div>
      {showCreate && <CreateBillModal patients={patients} onClose={()=>setShowCreate(false)} onSave={f=>setBills(bs=>[...bs,{id:`B-2026-0${46+bs.length-4}`,patient:f.patient,services:f.services,amount:parseFloat(f.amount)||0,status:"Pending",date:"Mar 7"}])} />}
      {viewB && <Modal title="Invoice Details" onClose={()=>setViewB(null)}>
        <div style={{ background:"linear-gradient(135deg,#4F9CF9,#6ED3CF)",borderRadius:14,padding:"20px 24px",marginBottom:20,color:"white" }}>
          <div style={{ fontSize:12,opacity:0.8,marginBottom:4 }}>Invoice</div>
          <div style={{ fontSize:20,fontWeight:800,fontFamily:"'DM Mono',monospace" }}>{viewB.id}</div>
          <div style={{ fontSize:28,fontWeight:800,marginTop:8 }}>R {viewB.amount.toLocaleString()}</div>
        </div>
        {[["Patient",viewB.patient],["Services",viewB.services],["Date",viewB.date]].map(([l,v])=>(
          <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid rgba(79,156,249,0.1)" }}><span style={{ fontSize:13,color:"#8aabcc",fontWeight:600 }}>{l}</span><span style={{ fontSize:13,color:"#1a3a6a",fontWeight:500 }}>{v}</span></div>
        ))}
        <div style={{ display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid rgba(79,156,249,0.1)" }}><span style={{ fontSize:13,color:"#8aabcc",fontWeight:600 }}>Status</span><span className={`badge badge-${viewB.status.toLowerCase()}`}>{viewB.status}</span></div>
        <div style={{ display:"flex",gap:10,marginTop:24,justifyContent:"flex-end" }}>
          <button className="neu-btn" onClick={()=>setViewB(null)} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Close</button>
          {viewB.status!=="Paid" && <PrimaryBtn color="#00C896" onClick={()=>{markPaid(viewB.id);setViewB(null);}}>Mark as Paid</PrimaryBtn>}
        </div>
      </Modal>}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24 }}>
        <div><div className="section-title">Billing</div><div style={{ fontSize:13,color:"#7090b0",marginTop:4 }}>R {totalPending.toLocaleString()} pending collection</div></div>
        <button className="neu-btn" onClick={()=>setShowCreate(true)} style={{ padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,color:"#4F9CF9" }}>+ Create Bill</button>
      </div>
      <div className="glass" style={{ borderRadius:20,padding:"22px 24px" }}>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
          <thead><tr style={{ borderBottom:"2px solid rgba(79,156,249,0.15)" }}>{["Invoice ID","Patient","Services","Amount","Date","Status",""].map(h=><th key={h} style={{ padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#8aabcc",letterSpacing:"0.06em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>
            {bills.map(b=>(
              <tr key={b.id} className="table-row">
                <td style={{ padding:"14px 12px",fontFamily:"'DM Mono',monospace",fontSize:12,color:"#4F9CF9",fontWeight:500 }}>{b.id}</td>
                <td style={{ padding:"14px 12px",fontWeight:600,color:"#1a3a6a" }}>{b.patient}</td>
                <td style={{ padding:"14px 12px",color:"#5a7a9a" }}>{b.services}</td>
                <td style={{ padding:"14px 12px",fontFamily:"'DM Mono',monospace",fontWeight:700,color:"#1a3a6a" }}>R {b.amount.toLocaleString()}</td>
                <td style={{ padding:"14px 12px",color:"#7090b0",fontSize:12 }}>{b.date}</td>
                <td style={{ padding:"14px 12px" }}><span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span></td>
                <td style={{ padding:"14px 12px" }}>
                  <div style={{ display:"flex",gap:6 }}>
                    <button className="neu-btn" onClick={()=>setViewB(b)} style={{ padding:"5px 10px",borderRadius:8,fontSize:11,color:"#4F9CF9",fontWeight:600 }}>View</button>
                    {b.status!=="Paid" && <button className="neu-btn" onClick={()=>markPaid(b.id)} style={{ padding:"5px 10px",borderRadius:8,fontSize:11,color:"#00C896",fontWeight:600 }}>Mark Paid</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function CreateBillModal({ patients, onClose, onSave }) {
  const [f,setF] = useState({ patient:"", services:"", amount:"" });
  const s = k => e => setF(v=>({...v,[k]:e.target.value}));
  return (
    <Modal title="Create New Bill" onClose={onClose}>
      <Field label="Patient"><select className="form-select" value={f.patient} onChange={s("patient")} style={{ marginBottom:14 }}><option value="">Select patient</option>{patients.map(p=><option key={p.id}>{p.name}</option>)}</select></Field>
      <Field label="Services"><input className="form-input" value={f.services} onChange={s("services")} placeholder="e.g. Consultation + X-Ray" /></Field>
      <Field label="Amount (R)" mb={0}><input className="form-input" type="number" value={f.amount} onChange={s("amount")} placeholder="0.00" /></Field>
      <div style={{ display:"flex",gap:10,marginTop:24,justifyContent:"flex-end" }}>
        <button className="neu-btn" onClick={onClose} style={{ padding:"10px 20px",borderRadius:10,fontSize:13,color:"#7090b0" }}>Cancel</button>
        <PrimaryBtn onClick={()=>{onSave(f);onClose();}}>Create Bill</PrimaryBtn>
      </div>
    </Modal>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function ReportsView({ patients, appointments, bills, doctors }) {
  const [tab, setTab] = useState("overview");
  const totalRevenue = bills.filter(b=>b.status==="Paid").reduce((s,b)=>s+b.amount,0);
  const pending = bills.filter(b=>b.status!=="Paid").reduce((s,b)=>s+b.amount,0);

  return (
    <div>
      <div style={{ marginBottom:24 }}><div className="section-title">Reports</div><div style={{ fontSize:13,color:"#7090b0",marginTop:4 }}>Hospital performance overview</div></div>
      <div style={{ display:"flex",gap:8,marginBottom:24 }}>
        {["overview","patients","revenue","doctors"].map(t=>(
          <button key={t} className={`tab-btn ${tab===t?"tab-active":"tab-inactive"}`} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}
      </div>

      {tab==="overview" && (
        <div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
            <StatCard label="Total Patients" value={patients.length} sub="All time" icon="🫀" gradient="linear-gradient(135deg,#4F9CF9,#6ED3CF)" />
            <StatCard label="Appointments" value={appointments.length} sub="This month" icon="📋" gradient="linear-gradient(135deg,#6ED3CF,#00C896)" />
            <StatCard label="Collected" value={`R ${totalRevenue.toLocaleString()}`} sub="Paid invoices" icon="💰" gradient="linear-gradient(135deg,#00C896,#6ED3CF)" />
            <StatCard label="Pending" value={`R ${pending.toLocaleString()}`} sub="Outstanding" icon="⏳" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" accent="#ef8030" />
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
            {[["Appointment Status",["Scheduled","Completed","Cancelled"],appointments,{"Scheduled":"#4F9CF9","Completed":"#00C896","Cancelled":"#FF6464"}],
              ["Patient Status",["Active","Discharged","Pending"],patients,{"Active":"#00C896","Discharged":"#7c3aed","Pending":"#f59e0b"}]].map(([title,statuses,data,colors])=>(
              <div key={title} className="glass" style={{ borderRadius:20,padding:"22px 24px" }}>
                <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a",marginBottom:16 }}>{title}</div>
                {statuses.map(status=>{
                  const count = data.filter(x=>x.status===status).length;
                  const pct = data.length ? Math.round((count/data.length)*100) : 0;
                  return (
                    <div key={status} style={{ marginBottom:14 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                        <span style={{ fontSize:13,color:"#3a5a80",fontWeight:500 }}>{status}</span>
                        <span style={{ fontSize:13,fontWeight:700,color:colors[status] }}>{count} ({pct}%)</span>
                      </div>
                      <div style={{ height:8,borderRadius:8,background:"rgba(79,156,249,0.1)",overflow:"hidden" }}>
                        <div style={{ height:"100%",width:`${pct}%`,borderRadius:8,background:colors[status] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="patients" && (
        <div className="glass" style={{ borderRadius:20,padding:"22px 24px" }}>
          <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a",marginBottom:18 }}>Patient Report</div>
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
            <thead><tr style={{ borderBottom:"2px solid rgba(79,156,249,0.15)" }}>{["Name","Age","Condition","Status","Last Visit"].map(h=><th key={h} style={{ padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#8aabcc",letterSpacing:"0.06em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
            <tbody>{patients.map(p=>(
              <tr key={p.id} className="table-row">
                <td style={{ padding:"12px",fontWeight:600,color:"#1a3a6a" }}>{p.name}</td>
                <td style={{ padding:"12px",color:"#3a5a80" }}>{p.age}</td>
                <td style={{ padding:"12px",color:"#3a5a80" }}>{p.condition}</td>
                <td style={{ padding:"12px" }}><span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span></td>
                <td style={{ padding:"12px",color:"#7090b0" }}>{p.lastVisit}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {tab==="revenue" && (
        <div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
            <div className="glass" style={{ borderRadius:20,padding:"22px 24px" }}>
              <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a",marginBottom:20 }}>6-Month Revenue Trend</div>
              <div style={{ display:"flex",alignItems:"flex-end",gap:10,height:130 }}>
                {revenueData.map((d,i)=>(
                  <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
                    <div style={{ fontSize:9,color:"#4F9CF9",fontWeight:700 }}>R{d.rev}k</div>
                    <div className="chart-bar" style={{ width:"100%",height:`${(d.rev/maxRev)*100}px`,borderRadius:"6px 6px 3px 3px",background:i===5?"linear-gradient(to top,#4F9CF9,#6ED3CF)":"rgba(79,156,249,0.25)",minHeight:8 }} />
                    <div style={{ fontSize:10,color:"#8aabcc" }}>{d.month}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass" style={{ borderRadius:20,padding:"22px 24px" }}>
              <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a",marginBottom:16 }}>Billing Summary</div>
              {[["Total Billed",bills.reduce((s,b)=>s+b.amount,0),"#1a3a6a"],["Collected",totalRevenue,"#00C896"],["Pending",pending,"#f59e0b"]].map(([l,v,c])=>(
                <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(79,156,249,0.1)" }}>
                  <span style={{ fontSize:13,color:"#7090b0",fontWeight:500 }}>{l}</span>
                  <span style={{ fontSize:15,fontWeight:800,color:c,fontFamily:"'DM Mono',monospace" }}>R {v.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass" style={{ borderRadius:20,padding:"22px 24px" }}>
            <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a",marginBottom:16 }}>All Invoices</div>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
              <thead><tr style={{ borderBottom:"2px solid rgba(79,156,249,0.15)" }}>{["Invoice","Patient","Services","Amount","Status"].map(h=><th key={h} style={{ padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#8aabcc",letterSpacing:"0.06em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
              <tbody>{bills.map(b=>(
                <tr key={b.id} className="table-row">
                  <td style={{ padding:"12px",fontFamily:"'DM Mono',monospace",fontSize:12,color:"#4F9CF9" }}>{b.id}</td>
                  <td style={{ padding:"12px",fontWeight:600,color:"#1a3a6a" }}>{b.patient}</td>
                  <td style={{ padding:"12px",color:"#5a7a9a" }}>{b.services}</td>
                  <td style={{ padding:"12px",fontFamily:"'DM Mono',monospace",fontWeight:700,color:"#1a3a6a" }}>R {b.amount.toLocaleString()}</td>
                  <td style={{ padding:"12px" }}><span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {tab==="doctors" && (
        <div className="glass" style={{ borderRadius:20,padding:"22px 24px" }}>
          <div style={{ fontSize:15,fontWeight:700,color:"#1a3a6a",marginBottom:18 }}>Doctor Report</div>
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
            <thead><tr style={{ borderBottom:"2px solid rgba(79,156,249,0.15)" }}>{["Doctor","Specialization","Patients","Schedule","Status"].map(h=><th key={h} style={{ padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#8aabcc",letterSpacing:"0.06em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
            <tbody>{doctors.map(d=>(
              <tr key={d.id} className="table-row">
                <td style={{ padding:"14px 12px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <div className="avatar" style={{ background:`hsl(${d.id*80+180},55%,50%)`,width:32,height:32,fontSize:11,borderRadius:8 }}>{d.avatar}</div>
                    <span style={{ fontWeight:600,color:"#1a3a6a" }}>{d.name}</span>
                  </div>
                </td>
                <td style={{ padding:"14px 12px",color:"#5a7a9a" }}>{d.spec}</td>
                <td style={{ padding:"14px 12px",fontWeight:700,color:"#4F9CF9" }}>{d.patients}</td>
                <td style={{ padding:"14px 12px",color:"#7090b0",fontSize:12 }}>{d.schedule}</td>
                <td style={{ padding:"14px 12px" }}><span className={`badge ${d.status==="On Duty"?"badge-active":"badge-discharged"}`}>{d.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function Toggle({ on, onToggle }) {
  return (
    <div className="toggle-track" style={{ background:on?"#4F9CF9":"#c5d5e8" }} onClick={onToggle}>
      <div className="toggle-thumb" style={{ left:on?23:3 }} />
    </div>
  );
}

function SettingsView() {
  const [tab, setTab] = useState("general");
  const [saved, setSaved] = useState(false);
  const [s, setS] = useState({
    emailNotifs:true, smsReminders:false, appointmentAlerts:true,
    darkMode:false, compactView:false, autoLogout:true,
    hospitalName:"MediCore Hospital", adminEmail:"admin@medicore.co.za",
    phone:"011 000 1234", address:"1 Health Ave, Johannesburg", timezone:"Africa/Johannesburg",
  });
  const toggle = k => () => setS(v=>({...v,[k]:!v[k]}));
  const set = k => e => setS(v=>({...v,[k]:e.target.value}));
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2500); };

  return (
    <div>
      <div style={{ marginBottom:24 }}><div className="section-title">Settings</div><div style={{ fontSize:13,color:"#7090b0",marginTop:4 }}>Manage your hospital system preferences</div></div>
      <div style={{ display:"flex",gap:8,marginBottom:24 }}>
        {["general","notifications","appearance","security"].map(t=>(
          <button key={t} className={`tab-btn ${tab===t?"tab-active":"tab-inactive"}`} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}
      </div>
      <div className="glass" style={{ borderRadius:20,padding:"28px 32px",maxWidth:640 }}>
        {tab==="general" && (
          <div>
            <div style={{ fontSize:14,fontWeight:700,color:"#1a3a6a",marginBottom:20 }}>Hospital Information</div>
            <Field label="Hospital Name"><input className="form-input" value={s.hospitalName} onChange={set("hospitalName")} /></Field>
            <FormRow><Field label="Admin Email"><input className="form-input" value={s.adminEmail} onChange={set("adminEmail")} /></Field><Field label="Phone"><input className="form-input" value={s.phone} onChange={set("phone")} /></Field></FormRow>
            <Field label="Address"><input className="form-input" value={s.address} onChange={set("address")} /></Field>
            <Field label="Timezone" mb={0}><select className="form-select" value={s.timezone} onChange={set("timezone")}><option>Africa/Johannesburg</option><option>Africa/Lagos</option><option>Africa/Nairobi</option><option>UTC</option></select></Field>
          </div>
        )}
        {tab==="notifications" && (
          <div>
            <div style={{ fontSize:14,fontWeight:700,color:"#1a3a6a",marginBottom:4 }}>Notification Preferences</div>
            <div style={{ fontSize:12,color:"#8aabcc",marginBottom:20 }}>Control how and when you receive alerts</div>
            {[["emailNotifs","Email Notifications","Receive daily summaries and alerts via email"],["smsReminders","SMS Appointment Reminders","Send patients SMS reminders 24hrs before appointments"],["appointmentAlerts","Appointment Alerts","Get notified when appointments are booked or cancelled"]].map(([k,l,d])=>(
              <div key={k} className="setting-row">
                <div><div style={{ fontSize:14,fontWeight:600,color:"#1a3a6a" }}>{l}</div><div style={{ fontSize:12,color:"#8aabcc",marginTop:2 }}>{d}</div></div>
                <Toggle on={s[k]} onToggle={toggle(k)} />
              </div>
            ))}
          </div>
        )}
        {tab==="appearance" && (
          <div>
            <div style={{ fontSize:14,fontWeight:700,color:"#1a3a6a",marginBottom:20 }}>Appearance</div>
            {[["darkMode","Dark Mode","Switch to a darker color scheme"],["compactView","Compact View","Reduce spacing for more content on screen"]].map(([k,l,d])=>(
              <div key={k} className="setting-row">
                <div><div style={{ fontSize:14,fontWeight:600,color:"#1a3a6a" }}>{l}</div><div style={{ fontSize:12,color:"#8aabcc",marginTop:2 }}>{d}</div></div>
                <Toggle on={s[k]} onToggle={toggle(k)} />
              </div>
            ))}
            <div style={{ marginTop:20 }}>
              <div style={{ fontSize:13,fontWeight:700,color:"#1a3a6a",marginBottom:12 }}>Accent Color</div>
              <div style={{ display:"flex",gap:12 }}>
                {["#4F9CF9","#00C896","#7c3aed","#f59e0b","#ef4444"].map(color=>(
                  <div key={color} style={{ width:32,height:32,borderRadius:8,background:color,cursor:"pointer",boxShadow:"0 4px 10px rgba(0,0,0,0.15)",border:"2px solid rgba(255,255,255,0.6)" }} />
                ))}
              </div>
            </div>
          </div>
        )}
        {tab==="security" && (
          <div>
            <div style={{ fontSize:14,fontWeight:700,color:"#1a3a6a",marginBottom:20 }}>Security</div>
            <div className="setting-row">
              <div><div style={{ fontSize:14,fontWeight:600,color:"#1a3a6a" }}>Auto Logout</div><div style={{ fontSize:12,color:"#8aabcc",marginTop:2 }}>Automatically log out after 30 minutes of inactivity</div></div>
              <Toggle on={s.autoLogout} onToggle={toggle("autoLogout")} />
            </div>
            <div style={{ marginTop:20,marginBottom:8,fontSize:13,fontWeight:700,color:"#1a3a6a" }}>Change Password</div>
            <Field label="Current Password"><input className="form-input" type="password" placeholder="••••••••" /></Field>
            <FormRow><Field label="New Password"><input className="form-input" type="password" placeholder="••••••••" /></Field><Field label="Confirm Password"><input className="form-input" type="password" placeholder="••••••••" /></Field></FormRow>
            <div style={{ marginTop:16,padding:"14px 16px",background:"rgba(255,100,100,0.07)",borderRadius:12,border:"1px solid rgba(255,100,100,0.15)" }}>
              <div style={{ fontSize:13,fontWeight:700,color:"#cc3030" }}>Danger Zone</div>
              <div style={{ fontSize:12,color:"#cc3030",opacity:0.8,marginTop:4 }}>These actions are irreversible. Proceed with caution.</div>
              <button className="neu-btn" style={{ marginTop:12,padding:"8px 16px",borderRadius:10,fontSize:12,color:"#cc3030",fontWeight:600 }}>Reset System Data</button>
            </div>
          </div>
        )}
        <div style={{ marginTop:28,display:"flex",alignItems:"center",gap:12 }}>
          <PrimaryBtn onClick={save}>Save Settings</PrimaryBtn>
          {saved && <span style={{ fontSize:13,color:"#00C896",fontWeight:600 }}>✓ Settings saved!</span>}
        </div>
      </div>
    </div>
  );
}
