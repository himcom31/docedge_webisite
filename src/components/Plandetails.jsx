import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Users,
  FileText,
  Receipt,
  CalendarDays,
  BarChart3,
  ShieldCheck,
  MessageCircle,
  Mail,
  IndianRupee,
  Wallet,
  Clock,
  BellRing,
} from "lucide-react";

const API_BASE = "https://software.docedge.in";

const injectStyles = () => {
  if (document.getElementById("pd-styles")) return;
  const s = document.createElement("style");
  s.id = "pd-styles";
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy:    #080e1e;
  --navy-2:  #111827;
  --navy-3:  #1e2a45;
  --indigo:  #4f46e5;
  --violet:  #7c3aed;
  --sky:     #6366f1;
  --text:    #f0f4ff;
  --muted:   rgba(240,244,255,0.52);
  --border:  rgba(255,255,255,0.08);
  --card-bg: rgba(255,255,255,0.035);
  --radius:  16px;
  --serif:   'DM Serif Display', Georgia, serif;
  --sans:    'Inter', system-ui, sans-serif;
}

.pd-page {
  min-height: 100vh;
  background: #f5f6fa;
  font-family: var(--sans);
  color: #111827;
  -webkit-font-smoothing: antialiased;
}

/* ── REVEAL ── */
.pd-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
              transform 0.55s cubic-bezier(0.22,1,0.36,1);
}
.pd-reveal.visible { opacity: 1; transform: translateY(0); }

/* ── HERO ── */
.pd-hero {
  background: var(--navy);
  position: relative;
  overflow: hidden;
}
.pd-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 70% at 70% 40%, rgba(99,102,241,0.22) 0%, transparent 65%),
    radial-gradient(ellipse 40% 50% at 20% 80%, rgba(124,58,237,0.16) 0%, transparent 60%);
  pointer-events: none;
}
.pd-hero-grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 64px 64px;
  pointer-events: none;
}

.pd-hero-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 80px 40px 72px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 56px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.pd-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.6);
  font-size: 12px;
  font-weight: 500;
  padding: 7px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--sans);
  margin-bottom: 28px;
  transition: border-color 0.2s, color 0.2s;
  letter-spacing: 0.01em;
}
.pd-back-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

.pd-plan-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(99,102,241,0.18);
  border: 1px solid rgba(99,102,241,0.35);
  color: #a5b4fc;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 6px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 22px;
}

.pd-hero-title {
  font-family: var(--serif);
  font-size: clamp(34px, 4.5vw, 54px);
  font-weight: 400;
  color: var(--text);
  line-height: 1.12;
  letter-spacing: -0.01em;
  margin-bottom: 18px;
  white-space: pre-line;
}
.pd-hero-title em {
  font-style: italic;
  color: #a5b4fc;
}

.pd-hero-desc {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.75;
  max-width: 440px;
  margin-bottom: 36px;
  font-weight: 400;
}

.pd-hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--indigo);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 13px 28px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  font-family: var(--sans);
  transition: background 0.2s, transform 0.18s, box-shadow 0.18s;
  letter-spacing: 0.01em;
  box-shadow: 0 4px 16px rgba(79,70,229,0.4);
}
.pd-hero-cta:hover {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(79,70,229,0.5);
}

/* ── PRICE CARD ── */
.pd-price-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 32px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(12px);
}
.pd-price-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(165,180,252,0.5), transparent);
}

.pd-price-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}
.pd-price-amount {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
  margin-bottom: 6px;
}
.pd-price-sym {
  font-size: 20px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  margin-top: 10px;
  font-family: var(--sans);
  display: flex;
  align-items: center;
}
.pd-price-num {
  font-family: var(--serif);
  font-size: 60px;
  font-weight: 400;
  color: #fff;
  line-height: 1;
  letter-spacing: -0.02em;
}
.pd-price-per {
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  align-self: flex-end;
  margin-bottom: 8px;
}
.pd-price-sub {
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  margin-bottom: 20px;
  font-weight: 400;
}
.pd-price-divider {
  height: 1px;
  background: rgba(255,255,255,0.07);
  margin-bottom: 16px;
}
.pd-price-chips {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pd-price-chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.09);
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
}
.pd-price-chip-label {
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255,255,255,0.4);
  font-size: 11px;
}
.pd-price-chip.yearly { border-color: rgba(134,239,172,0.2); background: rgba(134,239,172,0.07); }
.pd-price-chip.yearly .pd-price-chip-label { color: rgba(134,239,172,0.5); }
.pd-price-chip.yearly span:first-child { color: #86efac; }
.pd-price-chip-left {
  display: flex;
  align-items: center;
  gap: 7px;
}

/* ── BODY SECTIONS ── */
.pd-section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 40px;
}

.pd-section-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.pd-kicker-line {
  width: 24px;
  height: 1.5px;
  background: var(--indigo);
  flex-shrink: 0;
}
.pd-kicker-text {
  font-size: 11px;
  font-weight: 700;
  color: var(--indigo);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.pd-section-title {
  font-family: var(--serif);
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 400;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 14px;
  line-height: 1.18;
}
.pd-section-sub {
  font-size: 14.5px;
  color: #64748b;
  line-height: 1.75;
  max-width: 520px;
  margin-bottom: 44px;
  font-weight: 400;
}

/* ── PLAN FEATURES ── */
.pd-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}
.pd-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #fff;
  border: 1px solid #e9edf5;
  border-radius: 12px;
  padding: 16px 18px;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.pd-feature-item:hover {
  box-shadow: 0 4px 20px rgba(79,70,229,0.08);
  border-color: #c7d2fe;
}
.pd-feat-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--indigo);
}
.pd-feat-text {
  font-size: 13.5px;
  font-weight: 500;
  color: #334155;
  line-height: 1.5;
}

/* ── SOFTWARE FEATURES ── */
.pd-soft-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.pd-soft-card {
  background: #fff;
  border: 1px solid #e9edf5;
  border-radius: 16px;
  padding: 28px 24px;
  transition: box-shadow 0.25s, transform 0.25s;
}
.pd-soft-card:hover {
  box-shadow: 0 10px 36px rgba(79,70,229,0.09);
  transform: translateY(-3px);
}
.pd-soft-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
.pd-soft-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.pd-soft-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.7;
  font-weight: 400;
}

/* ── DIVIDER ── */
.pd-divider {
  height: 1px;
  background: #e9edf5;
  max-width: 1120px;
  margin: 0 auto;
}

/* ── ADD-ONS ── */
.pd-addons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.pd-addon-card {
  background: #fff;
  border: 1px solid #e9edf5;
  border-radius: 18px;
  overflow: hidden;
}
.pd-addon-header {
  padding: 28px 32px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 16px;
}
.pd-addon-icon {
  width: 48px;
  height: 48px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pd-addon-htitle {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 3px;
  letter-spacing: -0.01em;
}
.pd-addon-hsub {
  font-size: 12.5px;
  color: #94a3b8;
  line-height: 1.5;
  font-weight: 400;
}
.pd-addon-body {
  padding: 24px 32px 28px;
}
.pd-addon-feat-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-bottom: 24px;
}
.pd-addon-feat-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #475569;
  line-height: 1.55;
  font-weight: 400;
}
.pd-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.pd-addon-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--sans);
  border: none;
  transition: opacity 0.2s, transform 0.15s;
  text-decoration: none;
  letter-spacing: 0.01em;
}
.pd-addon-cta:hover { opacity: 0.88; transform: translateY(-1px); }

/* ── BOTTOM CTA ── */
.pd-bottom-cta {
  background: var(--navy);
  padding: 80px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.pd-bottom-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 80% at 50% 60%, rgba(99,102,241,0.18) 0%, transparent 70%);
  pointer-events: none;
}
.pd-bottom-cta-inner { position: relative; z-index: 1; }
.pd-bottom-eyebrow {
  font-size: 11px;
  font-weight: 600;
  color: #818cf8;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 16px;
}
.pd-bottom-cta h2 {
  font-family: var(--serif);
  font-size: clamp(26px, 3.5vw, 42px);
  font-weight: 400;
  color: #fff;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
  line-height: 1.18;
}
.pd-bottom-cta p {
  font-size: 14.5px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 36px;
  font-weight: 400;
}
.pd-bottom-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--indigo);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  font-family: var(--sans);
  box-shadow: 0 4px 20px rgba(79,70,229,0.5);
  transition: background 0.2s, transform 0.18s, box-shadow 0.18s;
  letter-spacing: 0.01em;
}
.pd-bottom-btn:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(79,70,229,0.6);
}

/* ── SKELETON ── */
@keyframes shimmer {
  0% { background-position: -600px 0 }
  100% { background-position: 600px 0 }
}
.pd-skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%);
  background-size: 600px 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .pd-soft-grid { grid-template-columns: repeat(2, 1fr); }
  .pd-addons-grid { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .pd-hero-inner { grid-template-columns: 1fr; padding: 56px 24px 48px; gap: 36px; }
  .pd-price-card { max-width: 340px; }
  .pd-section { padding: 52px 24px; }
  .pd-soft-grid { grid-template-columns: 1fr; }
  .pd-addon-header { padding: 22px 24px; }
  .pd-addon-body { padding: 20px 24px 24px; }
  .pd-bottom-cta { padding: 60px 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .pd-reveal { transition: none; }
}
  `;
  document.head.appendChild(s);
};

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
}
function Reveal({ children, className = "", delay = "0s" }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref} className={`pd-reveal ${className}`} style={{ transitionDelay: delay }}>
      {children}
    </div>
  );
}

// ── Static content ─────────────────────────────────────────────────────────────
const HERO_TITLES = {
  Basic:    "Clinic management,\nsimplified.",
  Pro:      "Everything your\nclinic needs.",
  Advanced: "Built for growing\nclinics.",
};

const SOFTWARE_FEATURES = [
  {
    Icon: Users,
    iconColor: "#7c3aed",
    bg: "#ede9fe",
    title: "Patient Records",
    desc: "Complete medical histories, visit timelines, and symptom tracking — all in one structured profile.",
  },
  {
    Icon: FileText,
    iconColor: "#d97706",
    bg: "#fef3c7",
    title: "Prescriptions",
    desc: "Generate signed, formatted prescriptions in seconds. Exported as PDF or sent directly to patients.",
  },
  {
    Icon: Receipt,
    iconColor: "#16a34a",
    bg: "#dcfce7",
    title: "Billing & GST",
    desc: "GST-compliant invoices, itemized billing, and partial payment tracking — built for Indian clinics.",
  },
  {
    Icon: CalendarDays,
    iconColor: "#2563eb",
    bg: "#dbeafe",
    title: "Appointments",
    desc: "Day-wise scheduling with separate views for walk-ins and bookings, plus no-show tracking.",
  },
  {
    Icon: BarChart3,
    iconColor: "#db2777",
    bg: "#fce7f3",
    title: "Analytics",
    desc: "Revenue trends, peak hours, and top medicines — data that helps you make better decisions.",
  },
  {
    Icon: ShieldCheck,
    iconColor: "#0d9488",
    bg: "#ecfdf5",
    title: "Data Privacy",
    desc: "Every clinic gets an isolated, encrypted database. Your patients' data is never shared or co-mingled.",
  },
];

const WHATSAPP_FEATURES = [
  "Send prescription PDFs to patients on WhatsApp — one click, no downloads needed.",
  "Share invoices over WhatsApp so patients don't need to visit for copies.",
  "Automated appointment reminders reduce no-shows by up to 80%.",
  "Schedule follow-up messages — medicine reminders, checkup alerts, test result notifications.",
  "Send bulk messages for health tips, festival greetings, or clinic updates.",
  "Delivery receipts confirm the prescription actually reached the patient.",
];

const EMAIL_FEATURES = [
  "Send professionally formatted prescription PDFs as email attachments.",
  "Invoice and payment receipts via email — essential for corporate and insurance patients.",
  "Automatic appointment confirmation emails sent immediately after booking.",
  "Share lab reports and test results securely — more private than messaging apps.",
  "Monthly health summaries that improve long-term patient retention.",
  "Custom templates with your clinic's branding and contact details.",
];

// ─────────────────────────────────────────────────────────────────────────────
export default function PlanDetails() {
  const { planId } = useParams();
  const navigate   = useNavigate();

  const [plan,    setPlan]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    injectStyles();
    if (!planId) { setError("Plan not found"); setLoading(false); return; }
    fetch(`${API_BASE}/api/plans/${planId}`)
      .then(r => r.json())
      .then(d => { if (d.success && d.plan) setPlan(d.plan); else setError("Failed to load plan."); })
      .catch(() => setError("Network error. Please try again."))
      .finally(() => setLoading(false));
  }, [planId]);

  const goSignup = () =>
    navigate(`/signup?planId=${planId}&planName=${encodeURIComponent(plan?.name || "")}`);

  const hasMonthly = plan?.monthlyPrice > 0;
  const hasYearly  = plan?.yearlyPrice  > 0;
  const perDay     = plan && !plan.isCurrencyless
    ? plan.yearlyPrice  ? Math.round(plan.yearlyPrice / 365)
    : plan.monthlyPrice ? Math.round(plan.monthlyPrice / 30)
    : null : null;

  const heroTitle = plan ? (HERO_TITLES[plan.name] || `The ${plan.name}\nPlan.`) : "";

  return (
    <div className="pd-page">

      {/* ── HERO ── */}
      <section className="pd-hero">
        <div className="pd-hero-grid-lines" />
        <div className="pd-hero-inner">
          <div className="pd-hero-left">
            <button className="pd-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={13} strokeWidth={2.5} />
              All Plans
            </button>

            {loading ? (
              <>
                <div className="pd-skeleton" style={{ width: 110, height: 26, marginBottom: 22 }} />
                <div className="pd-skeleton" style={{ width: "76%", height: 52, marginBottom: 10 }} />
                <div className="pd-skeleton" style={{ width: "55%", height: 52, marginBottom: 20 }} />
                <div className="pd-skeleton" style={{ width: "65%", height: 18, marginBottom: 8 }} />
                <div className="pd-skeleton" style={{ width: "50%", height: 18 }} />
              </>
            ) : error ? (
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>{error}</p>
            ) : plan && (
              <>
                <div className="pd-plan-badge">
                  <Sparkles size={11} strokeWidth={2.5} color="#a5b4fc" />
                  {plan.name} Plan
                </div>
                <h1 className="pd-hero-title">{heroTitle}</h1>
                <p className="pd-hero-desc">
                  {plan.description ||
                    "Professional clinic management built for the modern Indian practice — paperless, precise, and easy to use."}
                </p>
                <button className="pd-hero-cta" onClick={goSignup}>
                  Get started
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </>
            )}
          </div>

          {!loading && plan && !error && (
            <div className="pd-price-card">
              <p className="pd-price-label">Starting from</p>
              {perDay ? (
                <div className="pd-price-amount">
                  <span className="pd-price-sym">
                    <IndianRupee size={18} strokeWidth={2.5} />
                  </span>
                  <span className="pd-price-num">{perDay}</span>
                  <span className="pd-price-per"> /day</span>
                </div>
              ) : (
                <div style={{ fontSize: 28, fontFamily: "var(--serif)", color: "#fff", margin: "10px 0 6px" }}>
                  Custom pricing
                </div>
              )}
              <p className="pd-price-sub">No hidden charges, ever.</p>
              <div className="pd-price-divider" />
              <div className="pd-price-chips">
                {hasMonthly && (
                  <div className="pd-price-chip">
                    <span className="pd-price-chip-left">
                      <Wallet size={13} strokeWidth={2} color="rgba(255,255,255,0.5)" />
                      ₹{plan.monthlyPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="pd-price-chip-label">
                      <Clock size={11} strokeWidth={2} />
                      per month
                    </span>
                  </div>
                )}
                {hasYearly && (
                  <div className="pd-price-chip yearly">
                    <span className="pd-price-chip-left" style={{ color: "#86efac" }}>
                      <Wallet size={13} strokeWidth={2} color="#86efac" />
                      ₹{plan.yearlyPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="pd-price-chip-label">
                      <BellRing size={11} strokeWidth={2} />
                      per year
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PLAN FEATURES ── */}
      {!loading && plan && (
        <section className="pd-section">
          <Reveal>
            <div className="pd-section-kicker">
              <div className="pd-kicker-line" />
              <span className="pd-kicker-text">What's included</span>
            </div>
            <h2 className="pd-section-title">Everything in the {plan.name} Plan</h2>
            <p className="pd-section-sub">
              All features below are included at no additional cost — no surprises, no upsells.
            </p>
          </Reveal>
          <div className="pd-features-grid">
            {(plan.features || []).map((f, i) => (
              <Reveal key={i} delay={`${i * 0.05}s`}>
                <div className="pd-feature-item">
                  <div className="pd-feat-icon">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="pd-feat-text">{f.text || f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="pd-divider" />

      {/* ── SOFTWARE FEATURES ── */}
      <section className="pd-section">
        <Reveal>
          <div className="pd-section-kicker">
            <div className="pd-kicker-line" />
            <span className="pd-kicker-text">Platform</span>
          </div>
          <h2 className="pd-section-title">Your entire clinic, in one place</h2>
          <p className="pd-section-sub">
            From the first visit to final invoice, DocEdge keeps every part of your practice connected and running smoothly.
          </p>
        </Reveal>
        <div className="pd-soft-grid">
          {SOFTWARE_FEATURES.map(({ Icon, iconColor, bg, title, desc }, i) => (
            <Reveal key={i} delay={`${i * 0.07}s`}>
              <div className="pd-soft-card">
                <div className="pd-soft-icon-wrap" style={{ background: bg }}>
                  <Icon size={22} color={iconColor} strokeWidth={1.75} />
                </div>
                <p className="pd-soft-title">{title}</p>
                <p className="pd-soft-desc">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="pd-divider" />

      {/* ── ADD-ONS ── */}
      <section className="pd-section">
        <Reveal>
          <div className="pd-section-kicker">
            <div className="pd-kicker-line" />
            <span className="pd-kicker-text">Add-ons</span>
          </div>
          <h2 className="pd-section-title">Stay connected with every patient</h2>
          <p className="pd-section-sub">
            Extend DocEdge with communication add-ons that bring prescriptions, invoices, and reminders directly to your patients.
          </p>
        </Reveal>

        <div className="pd-addons-grid">
          {/* WhatsApp */}
          <Reveal delay="0.08s">
            <div className="pd-addon-card">
              <div className="pd-addon-header">
                <div className="pd-addon-icon" style={{ background: "#dcfce7" }}>
                  <MessageCircle size={22} color="#16a34a" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="pd-addon-htitle">WhatsApp Add-on</p>
                  <p className="pd-addon-hsub">Prescriptions, invoices, and reminders — delivered on WhatsApp</p>
                </div>
              </div>
              <div className="pd-addon-body">
                <ul className="pd-addon-feat-list">
                  {WHATSAPP_FEATURES.map((f, i) => (
                    <li key={i}>
                      <span className="pd-check" style={{ background: "#dcfce7" }}>
                        <Check size={10} color="#16a34a" strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/919382555796?text=Hi%2C%20I%20want%20to%20know%20about%20the%20WhatsApp%20Add-on%20for%20DocEdge"
                  target="_blank" rel="noreferrer"
                  className="pd-addon-cta"
                  style={{ background: "#16a34a", color: "#fff" }}
                >
                  <MessageCircle size={15} strokeWidth={2} />
                  Ask us on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* Email */}
          <Reveal delay="0.14s">
            <div className="pd-addon-card">
              <div className="pd-addon-header">
                <div className="pd-addon-icon" style={{ background: "#dbeafe" }}>
                  <Mail size={22} color="#2563eb" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="pd-addon-htitle">Email Add-on</p>
                  <p className="pd-addon-hsub">Professional emails for prescriptions, invoices, and reports</p>
                </div>
              </div>
              <div className="pd-addon-body">
                <ul className="pd-addon-feat-list">
                  {EMAIL_FEATURES.map((f, i) => (
                    <li key={i}>
                      <span className="pd-check" style={{ background: "#dbeafe" }}>
                        <Check size={10} color="#2563eb" strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/919382555796?text=Hi%2C%20I%20want%20to%20know%20about%20the%20Email%20Add-on%20for%20DocEdge"
                  target="_blank" rel="noreferrer"
                  className="pd-addon-cta"
                  style={{ background: "#2563eb", color: "#fff" }}
                >
                  <Mail size={15} strokeWidth={2} />
                  Learn about Email Add-on
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <div className="pd-bottom-cta">
        <div className="pd-bottom-cta-inner">
          <Reveal>
            <p className="pd-bottom-eyebrow">Ready to get started?</p>
            <h2>
              {plan ? `Activate the ${plan.name} Plan` : "Activate your plan"}
            </h2>
            <p>
              {perDay
                ? `Less than ₹${perDay} a day to run a modern, paperless clinic.`
                : "Contact us to find the right plan for your practice."}
            </p>
            <button className="pd-bottom-btn" onClick={goSignup}>
              Create your account
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </Reveal>
        </div>
      </div>

    </div>
  );
}